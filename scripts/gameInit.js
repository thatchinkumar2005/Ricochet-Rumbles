import { players } from "./Globals/players.js";
import addHandlePieceSelect from "./events/addHandlePieceSelect.js";
import handleDos from "./events/handleDos.js";
import handlePause from "./events/handlePause.js";

export default function gameInit(initialPlayer, gameOver) {
  if (!gameOver) {
    const gameStartAudio = document.querySelector("#gameStartAudio");
    gameStartAudio.pause();
    gameStartAudio.currentTime = 0;
    gameStartAudio.play();
    addHandlePieceSelect(initialPlayer, gameOver);

    localStorage.setItem("players", JSON.stringify(players));

    const restartButton = document.querySelector("#restart");
    restartButton.addEventListener("click", () => {
      document.location.reload();
    });

    const undoButton = document.querySelector("#undo");
    undoButton.addEventListener("click", () => {
      handleDos("undo");
    });

    const redoButton = document.querySelector("#redo");
    redoButton.addEventListener("click", () => {
      handleDos("redo");
    });
    localStorage.setItem("doIndex", 0);

    const settings = JSON.parse(localStorage.getItem("settings"));
    if (!settings.spells) {
      const spells = document.querySelector(".spells");
      spells.style.setProperty("visibility", "hidden");
    }
    if (!settings.history) {
      const history = document.querySelector(".spells");
      history.style.setProperty("visibility", "hidden");
    }
  }
}
