import { settings } from "../Globals/settings.js";
import { pieces as Pieces } from "../Globals/players.js";
import writeHistory from "../render/writeHistory.js";
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
  const pause = document.querySelector("#pause");

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
    pause.addEventListener("click", handlePause);
    playerPieces.forEach((p) => {
      p.onclick = (e) => {
        handlePieceSelect(e.srcElement);
      };
      p.addEventListener("mouseenter", pieceHover); //audio on hover event
      p.classList.add("turn");
    });
  } else {
    const turnCard = document.querySelector(".turnCard");
    const pauseButton = document.querySelector("#pause");
    const dests = document.querySelectorAll(".validDest");
    const controlls = document.querySelector("#controlls");

    const gameOverAudio = document.querySelector("#gameover_audio");
    gameOverAudio.pause();
    gameOverAudio.currentTime = 0;
    gameOverAudio.play();
    alert("gameOver");
    if (timeUp) {
      console.log("hello");
      turnCard.innerHTML = `Player ${player === 1 ? 2 : 1} Lost`;
      writeHistory(`Player ${player === 1 ? 2 : 1} Lost by losing Time`);
    } else {
      turnCard.innerHTML = `Player ${player} Lost`;
      writeHistory(`Player ${player} Lost. Titan took a hit`);
    }
    pieces.forEach((p) => {
      p.onclick = null;
      p.classList.remove("turn");
    });
    pauseButton.removeEventListener("click", handlePause);
    pieces.forEach((p) => {
      p.removeEventListener("mouseenter", pieceHover);
    });
    const restart = document.querySelector("#restartGameOver");
    restart.innerHTML = "Restart";
    restart.classList.add("restart");
    restart.onclick = () => {
      document.location.reload();
    };
    const replay = document.querySelector("#replayGameOver");
    replay.innerHTML = "Replay";
    replay.classList.add("restart");
    replay.onclick = () => {
      document.location.replace("/replay.html");
    };
    if (dests) {
      console.log(dests);
      Array.from(dests).forEach((d) => {
        d.onclick = null;
        d.classList.remove("validDest");
      });
    }
    controlls.innerHTML = "";
  }

  //bot
  const isBot = localStorage.getItem("bot");
  if (player === 1 && isBot == 1) {
    console.log("hello");
    const randomPiece = Pieces[Math.round(Math.random() * (Pieces.length - 1))];
    console.log(randomPiece);
    const piece = document.querySelector(`.player1.${randomPiece}`);
    piece.click();

    pieces.forEach((p) => (p.onclick = null));
  }
}
