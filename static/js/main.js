document.addEventListener('DOMContentLoaded', () => {
    // Copy Code Button
    document.querySelectorAll('pre').forEach((pre) => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerText = 'Kopyala';
        
        button.addEventListener('click', () => {
            const code = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.innerText = 'Kopyalandı!';
                setTimeout(() => {
                    button.innerText = 'Kopyala';
                }, 2000);
            });
        });
        
        // Position the button
        pre.style.position = 'relative';
        button.style.position = 'absolute';
        button.style.top = '0.5rem';
        button.style.right = '0.5rem';
        button.style.padding = '0.25rem 0.5rem';
        button.style.background = 'rgba(255, 255, 255, 0.1)';
        button.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        button.style.borderRadius = '4px';
        button.style.color = '#fff';
        button.style.cursor = 'pointer';
        button.style.fontSize = '0.8rem';
        
        pre.appendChild(button);
    });

    // Lazy Loading Images
    const images = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }

    // Search Functionality
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let searchIndex = null;

    if (searchInput && searchResults) {
        searchInput.addEventListener('focus', async () => {
            if (!searchIndex) {
                try {
                    let response = await fetch('/search_index.js');
                    if (!response.ok) response = await fetch('/search_index.tr.js');
                    if (!response.ok) throw new Error('Search index not found');
                    const scriptContent = await response.text();
                    const script = document.createElement('script');
                    script.textContent = scriptContent;
                    document.body.appendChild(script);
                    
                    setTimeout(() => {
                        if (window.searchIndex) {
                            searchIndex = elasticlunr.Index.load(window.searchIndex);
                        }
                    }, 100);
                } catch (e) {
                    console.error('Failed to load search index:', e);
                }
            }
        });

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.trim();
            if (!term || !searchIndex) {
                searchResults.style.display = 'none';
                return;
            }

            const results = searchIndex.search(term, {
                fields: { title: {boost: 2}, body: {boost: 1} },
                expand: true
            });

            if (results.length > 0) {
                searchResults.innerHTML = results.slice(0, 5).map(result => {
                    const doc = searchIndex.documentStore.getDoc(result.ref);
                    return `
                        <a href="${doc.id}" style="display: block; padding: 0.5rem; color: #fff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <div style="font-weight: bold; font-size: 0.9rem;">${doc.title}</div>
                        </a>
                    `;
                }).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div style="padding: 0.5rem; color: #aaa; font-size: 0.9rem;">Sonuç bulunamadı</div>';
                searchResults.style.display = 'block';
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    // Online Section: Istanbul clock + presence
    const istanbulTimeEl = document.getElementById('istanbul-time');
    const presenceStatusEl = document.getElementById('presence-status');
    const fediringTimeEl = document.getElementById('fediring-time');

    const updateIstanbulClock = () => {
        const now = new Date();
        if (istanbulTimeEl) {
            const formatter = new Intl.DateTimeFormat('tr-TR', {
                timeZone: 'Europe/Istanbul',
                hour: '2-digit',
                minute: '2-digit',
            });
            istanbulTimeEl.textContent = formatter.format(now);
        }

        if (fediringTimeEl) {
            const parts = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Europe/Istanbul',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).formatToParts(now);

            const get = (type) => parts.find(p => p.type === type)?.value || '';
            const day = get('day');
            const month = get('month').toUpperCase();
            const year = get('year');
            const hour = get('hour');
            const minute = get('minute');

            fediringTimeEl.textContent = `${day} ${month} ${year}, ${hour}:${minute} (GMT+3)`;
        }

        if (presenceStatusEl) {
            const hourStr = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Europe/Istanbul',
                hour: '2-digit',
                hour12: false,
            }).format(now);
            const hour = Number(hourStr);

            // Simple heuristic: late night = AFK, otherwise IDLE
            presenceStatusEl.textContent = (hour >= 1 && hour < 8) ? 'AFK' : 'IDLE';
        }
    };

    updateIstanbulClock();
    setInterval(updateIstanbulClock, 1000);

    // Online Section: Spotify now playing / last played
    const spotifyTitleEl = document.getElementById('spotify-title');
    const spotifyArtistEl = document.getElementById('spotify-artist');
    const spotifyStatusEl = document.getElementById('spotify-status');
    const spotifyCoverEl = document.getElementById('spotify-cover');
    const spotifyLinkEl = document.getElementById('spotify-link');

    const renderSpotify = (data) => {
        if (!spotifyTitleEl || !spotifyStatusEl) return;

        if (!data || data.ok === false) {
            spotifyTitleEl.textContent = 'Spotify bağlanamadı';
            if (spotifyArtistEl) spotifyArtistEl.textContent = '';
            spotifyStatusEl.textContent = 'Şu an veri alınamıyor';
            if (spotifyLinkEl) spotifyLinkEl.style.display = 'none';
            return;
        }

        spotifyTitleEl.textContent = data.title || 'Bilinmeyen parça';
        if (spotifyArtistEl) spotifyArtistEl.textContent = data.artist || '';

        const statusText = data.isPlaying ? 'Şu an çalıyor' : 'Son çalınan';
        spotifyStatusEl.textContent = statusText;

        if (spotifyCoverEl && data.albumImageUrl) {
            spotifyCoverEl.style.backgroundImage = `url('${data.albumImageUrl}')`;
        }

        if (spotifyLinkEl && data.songUrl) {
            spotifyLinkEl.href = data.songUrl;
            spotifyLinkEl.style.display = 'inline-flex';
        } else if (spotifyLinkEl) {
            spotifyLinkEl.style.display = 'none';
        }
    };

    const fetchSpotify = async () => {
        if (!spotifyTitleEl) return;
        try {
            const response = await fetch('/api/now-playing', { cache: 'no-store' });
            const json = await response.json();
            renderSpotify(json);
        } catch (e) {
            renderSpotify({ ok: false });
        }
    };

    fetchSpotify();
    setInterval(fetchSpotify, 30000);
});
