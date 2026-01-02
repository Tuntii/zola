# Zola

This directory is a brief example of a Zola site that can be deployed to Vercel with zero configuration.

## Deploy Your Own

Deploy your own Zola project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/zola&template=zola)

_Live Example: https://zola-template.vercel.app_

### Deploying From Your Terminal

You can deploy your new Zola project with a single command from your terminal using [Vercel CLI](https://vercel.com/download):

```shell
$ vercel
```

### Spotify (Online section)

Ana sayfadaki **Online** bölümünde Spotify “şu an çalıyor / son çalınan” kartı için Vercel Serverless endpoint'i kullanılır: `/api/now-playing`.

Vercel Project Environment Variables:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

Refresh token şu scope’lara sahip olmalı:

- `user-read-currently-playing`
- `user-read-recently-played`
