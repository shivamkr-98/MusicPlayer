const API_URL = 'https://synaxbots.shop/Spotify/index.php';

async function fetchMusic() {
    const query = document.getElementById('search').value;
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data && data.results) {
            displayMusic(data.results);
        } else {
            alert('No songs found!');
        }
    } catch (error) {
        console.error('Error fetching music:', error);
        alert('Failed to fetch music. Please try again.');
    }
}

function displayMusic(songs) {
    const musicList = document.getElementById('music-list');
    musicList.innerHTML = ''; // Clear previous results

    songs.forEach(song => {
        const trackDiv = document.createElement('div');
        trackDiv.className = 'track';

        const trackName = document.createElement('span');
        trackName.textContent = song.title || 'Unknown Song';

        const playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.onclick = () => playMusic(song.preview_url);

        trackDiv.appendChild(trackName);
        trackDiv.appendChild(playButton);
        musicList.appendChild(trackDiv);
    });
}

function playMusic(url) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = url;
    audioPlayer.style.display = 'block';
    audioPlayer.play();
}
