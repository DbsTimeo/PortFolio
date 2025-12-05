const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const coverImg = document.getElementById('coverImg');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const playlistDiv = document.getElementById('playlist');

// **Facilement modifiable : ajoute tes chansons ici**
const tracks = [
  {
    title: "Somewhere I Belong",
    artist: "Linkin Park",
    src: "../Sounds/SmIBl.mp3",
    cover: "../Images/meteora.jpg"
  },
  {
    title: "Lost",
    artist: "Linkin Park",
    src: "../Sounds/lost.mp3",
    cover: "../Images/lost.jpg"
  },
  {
    title: "The Emptiness Machine",
    artist: "Linkin Park",
    src: "../Sounds/TEM.mp3",
    cover: "../Images/fromzero.jpg"
  }
];

let currentTrack = 0;

// Afficher playlist
function updatePlaylist() {
  playlistDiv.innerHTML = "";
  tracks.forEach((track, index) => {
    const div = document.createElement('div');
    div.textContent = track.title;
    div.addEventListener('click', () => {
      loadTrack(index);
      playTrack();
    });
    playlistDiv.appendChild(div);
  });
}
updatePlaylist();

// Charger une chanson
function loadTrack(index) {
  currentTrack = index;
  const track = tracks[index];
  audio.src = track.src;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  coverImg.src = track.cover;
  updateActivePlaylist();
}

function updateActivePlaylist() {
  const items = playlistDiv.querySelectorAll('div');
  items.forEach((item, i) => {
    item.classList.toggle('active', i === currentTrack);
  });
}

// Jouer / pause
function playTrack() {
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseTrack() {
  audio.pause();
  playBtn.textContent = "▶";
}

playBtn.addEventListener('click', () => {
  if (audio.paused) playTrack();
  else pauseTrack();
});

// Changer de chanson
prevBtn.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
});

nextBtn.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
});

// Barre de progression
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + "%";
});

progressContainer.addEventListener('click', e => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

// Charger première chanson
loadTrack(currentTrack);