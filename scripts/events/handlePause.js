import addHandlePieceSelect from "./addHandlePieceSelect.js";
import pieceHover from "./pieceHover.js";

export default function handlePause() {
  const timer = JSON.parse(localStorage.getItem("timer"));
  const timerDisplay = document.querySelector("#timer");
  const pieces = document.querySelectorAll(".piece");
  const dests = document.querySelectorAll(".validDest");
  const controlls = document.querySelector("#controlls");

  const pauseAudio = document.querySelector("#pause_audio");
  pauseAudio.pause();
  pauseAudio.currentTime = 0;
  pauseAudio.play();

  if (timer.isPaused) {
    let time = timer.pauseTime;
    console.log(time);
    const player = timer.curPlayer;
    const interval = setInterval(() => {
      time = time - 1000;
      timerDisplay.innerHTML = new Date(time).toISOString().slice(11, 19);
      if (time <= 0) {
        clearInterval(interval);
        console.log(interval);
        addHandlePieceSelect(player === 1 ? 2 : 1, true, true);
      }
    }, 1000);
    localStorage.setItem(
      "timer",
      JSON.stringify({
        interval,
        isPaused: false,
        curPlayer: player,
        pauseTime: 0,
      })
    );

    const pause = document.querySelector("#pause");
    pause.style.backgroundImage = "url('../Assets/Pause.png')";
    timerDisplay.style.color = "beige";

    addHandlePieceSelect(player, false, false, false);
  } else {
    clearInterval(timer.interval);
    let pauseTimeStr = timerDisplay.innerHTML;
    pauseTimeStr = pauseTimeStr.split(":");
    console.log(pauseTimeStr);
    let pauseTime =
      (Number(pauseTimeStr[0]) * 60 * 60 +
        Number(pauseTimeStr[1]) * 60 +
        Number(pauseTimeStr[2])) *
      1000;
    console.log(pauseTime);
    const player = timer.curPlayer;

    localStorage.setItem(
      "timer",
      JSON.stringify({
        interval: null,
        isPaused: true,
        curPlayer: player,
        pauseTime,
      })
    );

    pieces.forEach((p) => {
      p.onclick = null;
      p.classList.remove("turn");
      p.removeEventListener("mouseenter", pieceHover);
    });

    dests.forEach((d) => {
      d.onclick = null;
      d.classList.remove("validDest");
    });

    controlls.innerHTML = "";

    const pause = document.querySelector("#pause");
    pause.style.backgroundImage = "url('../Assets/Play.png')";
    timerDisplay.style.color = "grey";
  }
}
