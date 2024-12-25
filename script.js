const API_URL = 'https://synaxbots.shop/Spotify/index.php'; // Your API endpoint

// Fetch music data from the API
async function fetchMusic() {
    const query = document.getElementById('search').value;
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log('API Response:', data); // Debugging: Inspect API response

        if (data && data.results && data.results.length > 0) {
            displayMusic(data.results);
        } else {
            alert('No songs found!');
        }
    } catch (error) {
        console.error('Error fetching music:', error);
        alert('Failed to fetch music. Please try again.');
    }
}

// Display the list of songs in the UI
function displayMusic(songs) {
    const musicList = document.getElementById('music-list');
    musicList.innerHTML = ''; // Clear previous results

    songs.forEach(song => {
        // Check if a valid preview URL exists
        if (!song.preview_url) {
            console.warn('Missing preview_url for song:', song);
            return;
        }

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

// Play the selected song
function playMusic(url) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = url;
    audioPlayer.style.display = 'block';
    audioPlayer.play();
}
