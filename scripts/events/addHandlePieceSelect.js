import { settings } from "../Globals/settings.js";
import handlePieceSelect from "./handlePieceSelect.js";

export default function addHandlePieceSelect(player, gameOver, timeUp = false) {
  const playerPieces = document.querySelectorAll(`.piece.player${player}`);
  const otherPieces = document.querySelectorAll(
    `.piece.player${player === 1 ? 2 : 1}`
  );
  //turn card
  //timer

  const pieces = document.querySelectorAll(".piece");
  if (!gameOver) {
    //timer
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
    localStorage.setItem("interval", interval);

    //turn Card
    const turnCard = document.querySelector(".turnCard");
    turnCard.innerHTML = `Player ${player}'s turn`;

    //events
    playerPieces.forEach((p) => {
      p.onclick = (e) => {
        handlePieceSelect(e.srcElement);
      };
      p.classList.add("turn");
    });
    otherPieces.forEach((p) => {
      p.onclick = null;
      p.classList.remove("turn");
    });
  } else {
    alert("gameOver");
    const turnCard = document.querySelector(".turnCard");
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
    const restart = document.querySelector("#restart");
    restart.innerHTML = "Restart";
    restart.classList.add("restart");
    restart.onclick = () => {
      document.location.reload();
    };
  }
}
