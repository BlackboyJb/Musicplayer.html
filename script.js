const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const previousBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector("#audio");
const Progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

//songs//

const songs = [
    "Drink Wine", "Denver",
    "Last Last",
    "Location",
    "Jimmy Cooks", "Pride is the Devil",
    "Who Told u",
    "Essence",
    "Loyalty",
    "soso"
]

//// keep track of songs////

let songIndex = 0;

////INTIALIZING SONG IN DOM///

loadSong(songs[songIndex])

///update song details///

function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}



/////Play & Pause song//////
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause');

    audio.play();
}
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
    playBtn.querySelector('i.fa-solid').classList.add('fa-play');

    audio.pause();
}

////event listner///
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong()
    }
    else {
        playSong()
    }

})




////// backward & next song//////
function prevsong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong();
}

function nextsong() {
    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong();

}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100;
    Progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const ClickX = e.offsetX;
    const duration = audio.duration

    audio.currentTime = (ClickX / width) * duration;
}


////change song////
previousBtn.addEventListener('click', prevsong);
nextBtn.addEventListener('click', nextsong)



/////song progresss//////

audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)


audio.addEventListener('ended', nextsong);






