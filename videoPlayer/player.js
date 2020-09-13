document.addEventListener("DOMContentLoaded", function() { initializeMediaPlayer(); }, false);

var mediaPlayer;
var progressBar;
var playPause;
var progress;
var player;

function loadVideo() {
    for (var i = 0; i < arguments.length; i++) {
        var fileType = arguments[i].split('.').pop();

        if (canPlayVideo(fileType)) {
            pause();
            resetPlayer();
            mediaPlayer.src = arguments[i];
            mediaPlayer.load();
            break;
        }
    }
}

function canPlayVideo(ext) {
    return mediaPlayer.canPlayType('video/' + ext) != '';
}

function initializeMediaPlayer() {
    player = document.getElementById('player');
    mediaPlayer = document.getElementById('video');
    progress = document.getElementById('progress');
    playPause = document.getElementById('play-pause');
    progressBar = document.getElementById('progress-bar');
    mediaPlayer.loop = false;
    mediaPlayer.controls = false;
    mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
    mediaPlayer.addEventListener('ended', pause, false);
}

function handleFullscreen(element) {
    if (isFullScreen()) {
        element.classList.remove('fa-compress-arrows-alt');
        element.classList.add('fa-expand-arrows');
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    } else {
        element.classList.add('fa-compress-arrows-alt');
        element.classList.remove('fa-expand-arrows');
        if (player.requestFullscreen) player.requestFullscreen();
        else if (player.mozRequestFullScreen) player.mozRequestFullScreen();
        else if (player.webkitRequestFullScreen) player.webkitRequestFullScreen();
        else if (player.msRequestFullscreen) player.msRequestFullscreen();
    }
}

function isFullScreen() {
    return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
}

function skipTo(event) {
    var time = Math.floor(event.offsetX * mediaPlayer.duration / progressBar.offsetWidth);
    mediaPlayer.currentTime = time;
}

function updateProgressBar() {
    var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
    progress.style.width = percentage + '%';
}

function changeVolume(value) {
    mediaPlayer.volume = value / 100;
}

function toggleSound(btn) {
    if (mediaPlayer.muted) {
        btn.classList.remove('fa-volume-mute');
        btn.classList.add('fa-volume');
    } else {
        btn.classList.remove('fa-volume');
        btn.classList.add('fa-volume-mute');
    }

    mediaPlayer.muted = !mediaPlayer.muted;
}

function resetPlayer() {
    progress.style.width = 0;
    mediaPlayer.currentTime = 0;
}

function pause() {
    playPause.classList.remove('fa-pause');
    playPause.classList.add('fa-play');
    player.classList.remove('hover-toggler');
    mediaPlayer.pause();
}

function play() {
    playPause.classList.remove('fa-play');
    playPause.classList.add('fa-pause');
    player.classList.add('hover-toggler');
    mediaPlayer.play();
}

function togglePlayPause() {
    if (mediaPlayer.paused || mediaPlayer.ended) {
        play();
    } else {
        pause();
    }
}