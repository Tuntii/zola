// Vercel Serverless Function: /api/now-playing
// Requires env vars:
// - SPOTIFY_CLIENT_ID
// - SPOTIFY_CLIENT_SECRET
// - SPOTIFY_REFRESH_TOKEN
// Scopes on refresh token should include:
// - user-read-currently-playing
// - user-read-recently-played

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_CURRENTLY_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

function getBasicAuth() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}

async function getAccessToken() {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const basicAuth = getBasicAuth();

  if (!refreshToken || !basicAuth) {
    return { accessToken: null, error: 'missing_spotify_env' };
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    return { accessToken: null, error: `token_exchange_failed:${response.status}:${text}` };
  }

  const json = await response.json();
  return { accessToken: json.access_token, error: null };
}

function pickTrack(item) {
  if (!item) return null;

  const title = item.name;
  const artist = Array.isArray(item.artists) ? item.artists.map(a => a.name).join(', ') : '';
  const album = item.album?.name ?? '';
  const albumImageUrl = item.album?.images?.[0]?.url ?? null;
  const songUrl = item.external_urls?.spotify ?? null;

  return { title, artist, album, albumImageUrl, songUrl };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');

  try {
    const { accessToken, error } = await getAccessToken();
    if (!accessToken) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, error, isPlaying: false }));
      return;
    }

    // 1) Currently playing
    const currentlyPlaying = await fetch(SPOTIFY_CURRENTLY_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (currentlyPlaying.status === 204) {
      // 2) Fallback to recently played
      const recentlyPlayed = await fetch(SPOTIFY_RECENTLY_PLAYED_ENDPOINT, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!recentlyPlayed.ok) {
        const text = await recentlyPlayed.text().catch(() => '');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: false, error: `recently_played_failed:${recentlyPlayed.status}:${text}`, isPlaying: false }));
        return;
      }

      const json = await recentlyPlayed.json();
      const item = json?.items?.[0];
      const track = pickTrack(item?.track);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          ok: true,
          isPlaying: false,
          playedAt: item?.played_at ?? null,
          ...track,
        })
      );
      return;
    }

    if (!currentlyPlaying.ok) {
      const text = await currentlyPlaying.text().catch(() => '');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, error: `currently_playing_failed:${currentlyPlaying.status}:${text}`, isPlaying: false }));
      return;
    }

    const json = await currentlyPlaying.json();
    const track = pickTrack(json?.item);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        ok: true,
        isPlaying: Boolean(json?.is_playing),
        ...track,
      })
    );
  } catch (e) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: false, error: 'unexpected_error', message: String(e), isPlaying: false }));
  }
};
