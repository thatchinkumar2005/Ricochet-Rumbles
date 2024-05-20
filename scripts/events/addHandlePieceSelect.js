import { settings } from "../Globals/settings.js";
import handlePause from "./handlePause.js";
import handlePieceSelect from "./handlePieceSelect.js";
import pieceHover from "./pieceHover.js";

export default function addHandlePieceSelect(
  player,
  gameOver,
  timeUp = false,
  setTimer = true
) {
  const playerPieces = document.querySelectorAll(`.piece.player${player}`);
  const otherPieces = document.querySelectorAll(
    `.piece.player${player === 1 ? 2 : 1}`
  );
  const pieces = document.querySelectorAll(".piece");
  //turn card
  //timer

  if (!gameOver) {
    //timer
    if (setTimer) {
      let time = settings.timerDuration;
      const timer = document.querySelector("#timer");
      const interval = setInterval(() => {
        time = time - 1000;
        timer.innerHTML = new Date(time).toISOString().slice(11, 19);
        if (time <= 0) {
          timeUp = true;
          console.log(timeUp);
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
    }

    //turn Card
    const turnCard = document.querySelector(".turnCard");
    turnCard.innerHTML = `Player ${player}'s turn`;

    //events
    playerPieces.forEach((p) => {
      p.onclick = (e) => {
        handlePieceSelect(e.srcElement);
      };
      p.addEventListener("mouseenter", pieceHover);
      p.classList.add("turn");
    });
    otherPieces.forEach((p) => {
      p.onclick = null;
      p.classList.remove("turn");
      p.removeEventListener("mouseenter", pieceHover);
    });
  } else {
    const turnCard = document.querySelector(".turnCard");
    const pauseButton = document.querySelector("#pause");
    const dests = document.querySelector(".validDest");
    const gameOverAudio = document.querySelector("#gameover_audio");
    gameOverAudio.pause();
    gameOverAudio.currentTime = 0;
    gameOverAudio.play();
    alert("gameOver");
    if (timeUp) {
      console.log("hello");
      turnCard.innerHTML = `Player ${player === 1 ? 2 : 1} Lost`;
    } else {
      turnCard.innerHTML = `Player ${player} Lost`;
    }
    pieces.forEach((p) => {
      p.onclick = null;
      p.classList.remove("turn");
    });
    pauseButton.removeEventListener("click", handlePause);
    pieces.forEach((p) => {
      p.removeEventListener("mouseenter", pieceHover);
    });
    const restart = document.querySelector("#restart");
    restart.innerHTML = "Restart";
    restart.classList.add("restart");
    restart.onclick = () => {
      document.location.reload();
    };
    if (dests)
      dests.forEach((d) => {
        d.onclick = null;
        d.classList.remove("validDest");
      });
  }
}
