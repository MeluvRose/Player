let player;
let songId;
let done = false;
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const rangeVolume = document.getElementById("volume");
const btnPlay = document.getElementById("play");
const btnPause = document.getElementById("pause");
const btnStop = document.getElementById("stop");
const btnMute = document.getElementById("mute");

// Load the IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
songId = document.getElementById("player").dataset.songId;

global.onYouTubeIframeAPIReady = function () {
  console.log("api is roaded", songId);

  player = new YT.Player("player", {
    videoId: songId,
    playerVars: {
      playersinline: 1,
      autoplay: 0,
      controls: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
  console.log(player.songId);
};

const handleTimeUpdate = () => {
  const total = player.getDuration();
  const current = player.getCurrentTime();
  const timeDif = (current / total) * 100;

  timeline.value = timeDif;
  totalTime.innerText = new Date(total * 1000).toISOString().slice(14, 19);
  currentTime.innerText = new Date(current * 1000).toISOString().slice(14, 19);
};

const onPlayerReady = () => {
  player.seekTo(0, true); // 영상의 시간을 0초로 이동시킨다.
};

const onPlayerStateChange = (event) => {
  if (event.data == YT.PlayerState.PLAYING) {
    let mytimer;
    mytimer = setInterval(handleTimeUpdate, 1000);
  }
};

const playVideo = () => {
  const playerState = player.getPlayerState();

  if (playerState === 5) return player.seekTo(0, true);
  player.playVideo();
};

const pauseVideo = () => {
  player.pauseVideo();
};

const stopVideo = () => {
  player.stopVideo();
};

const volumeChange = (event) => {
  player.setVolume(event.target.value);
};

const volumeMute = (event) => {
  const isMuted = player.isMuted();

  if (!isMuted) player.mute();
  else player.unMute();
  event.target.innerText = !isMuted ? "UnMute" : "Mute";
};

function currentTimeSlide() {
  player.currentTimeSliding = true;
}

function currentTimeChange(event) {
  player.currentTimeSliding = false;
  player.seekTo((event.target.value * player.getDuration()) / 100, true);
}

timeline.addEventListener("input", currentTimeSlide);
timeline.addEventListener("change", currentTimeChange);
rangeVolume.addEventListener("change", volumeChange);
btnPlay.addEventListener("click", playVideo);
btnPause.addEventListener("click", pauseVideo);
btnStop.addEventListener("click", stopVideo);
btnMute.addEventListener("click", volumeMute);
