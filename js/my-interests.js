window.addEventListener('load', function() {
   //spotify
    const clientId    = 'be048f75bbd84b31836ab5a04c6a1d54';
    const redirectUri = 'http://127.0.0.1:5500/my-interests.html'; 
    const scopes      = 'user-top-read';
    const authEndpoint= 'https://accounts.spotify.com/authorize';

    function getSpotifyAuthUrl() {
        return `${authEndpoint}?client_id=${clientId}` +
               `&redirect_uri=${encodeURIComponent(redirectUri)}` +
               `&scope=${encodeURIComponent(scopes)}` +
               `&response_type=token`;
    }

    function getAccessTokenFromUrl() {
        const hash = window.location.hash;
        if (!hash) return null;
        return new URLSearchParams(hash.substring(1)).get('access_token');
    }

    let spotifyAccessToken = getAccessTokenFromUrl();
    if (spotifyAccessToken) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (!spotifyAccessToken) {
        window.location = getSpotifyAuthUrl();
        return;
    } else {
        fetchSpotifyData(spotifyAccessToken);
    }

    function fetchSpotifyData(token) {
        const spotifyContent = document.getElementById('spotifyContent');
        if (!spotifyContent) {
            console.error('No element with id "spotifyContent" found.');
            return;
        }
        spotifyContent.innerHTML = '';

        const artistsSection = document.createElement('section');
        artistsSection.innerHTML = '<h3>Favori Sanatcilerim</h3>' +
                                   '<div id="artistsList" class="artists-list"></div>';

        const tracksSection  = document.createElement('section');
        tracksSection.innerHTML  = '<br /><h3>Favori Sarkilarim</h3>' +
                                   '<div id="tracksList" class="tracks-list"></div>';

        spotifyContent.appendChild(artistsSection);
        spotifyContent.appendChild(tracksSection);

        // Top Artists
        fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
        .then(data => {
            const list = document.getElementById('artistsList');
            (data.items||[]).forEach(artist => {
                const div = document.createElement('div');
                div.classList.add('artist-card');
                if (artist.images?.length) {
                    const img = document.createElement('img');
                    img.src = artist.images[0].url;
                    img.alt = artist.name;
                    div.appendChild(img);
                }
                const info = document.createElement('div');
                const h4   = document.createElement('h4');
                h4.textContent = artist.name;
                info.appendChild(h4);
                const p    = document.createElement('p');
                p.textContent = `${artist.genres?.[0]||'Artist'} — popularity ${artist.popularity}/100`;
                info.appendChild(p);
                div.appendChild(info);
                list.appendChild(div);
            });
        })
        .catch(console.error);

        // Top Tracks
        fetch('https://api.spotify.com/v1/me/top/tracks?limit=8', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
        .then(data => {
            const list = document.getElementById('tracksList');
            (data.items||[]).forEach(track => {
                const div = document.createElement('div');
                div.classList.add('track-card');
                if (track.album?.images?.length) {
                    const img = document.createElement('img');
                    img.src = track.album.images[0].url;
                    img.alt = track.name;
                    div.appendChild(img);
                }
                const info = document.createElement('div');
                const h4   = document.createElement('h4');
                h4.textContent = track.name;
                info.appendChild(h4);
                ['By: '+ track.artists.map(a=>a.name).join(', '),
                 'Album: '+ track.album.name,
                 'Released: '+ (track.album.release_date.split('-')[0]||'Unknown')]
                 .forEach(txt => {
                     const p = document.createElement('p');
                     p.textContent = txt;
                     info.appendChild(p);
                 });
                if (track.preview_url) {
                    const pc = document.createElement('div');
                    const pl = document.createElement('p');
                    pl.textContent = 'Preview:';
                    pc.appendChild(pl);
                    const audio = document.createElement('audio');
                    audio.controls = true;
                    audio.src = track.preview_url;
                    pc.appendChild(audio);
                    info.appendChild(pc);
                }
                div.appendChild(info);
                list.appendChild(div);
            });
        })
        .catch(console.error);
    }

  
    //movie
    const TMDB_API_KEY = '6b24286b57939fa21089f2fce7c5e6fc'; 
    const TMDB_API_BASE = 'https://api.themoviedb.org/3';

    function fetchMovieData() {
        fetch(`${TMDB_API_BASE}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
            .then(response => response.json())
            .then(data => {
                const moviesList = document.getElementById('moviesList');
                const movies = data.results.slice(0, 6); 
                movies.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card');
                    
                    movieCard.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                             alt="${movie.title}">
                        <div class="movie-info">
                            <h4>${movie.title}</h4>
                            <p class="movie-rating">★ ${movie.vote_average.toFixed(1)}/10</p>
                            <p>${movie.release_date.split('-')[0]}</p>
                            <p>${movie.overview.substring(0, 100)}...</p>
                        </div>
                    `;
                    
                    moviesList.appendChild(movieCard);
                });
            })
            .catch(console.error);
    }

    
        fetchMovieData();
    
});
