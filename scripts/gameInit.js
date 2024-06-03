import { Ricochet, SemiRicochet } from "./Globals/RicochetOrientation.js";
import { players } from "./Globals/players.js";
import addHandlePieceSelect from "./events/addHandlePieceSelect.js";
import handleDos from "./events/handleDos.js";
import handlePause from "./events/handlePause.js";
import placeSpells from "./render/placeSpells.js";

export default function gameInit(initialPlayer, gameOver) {
  if (!gameOver) {
    const gameStartAudio = document.querySelector("#gameStartAudio");
    gameStartAudio.pause();
    gameStartAudio.currentTime = 0;
    gameStartAudio.play();

    localStorage.setItem("players", JSON.stringify(players));

    const restartButton = document.querySelector("#restart");
    restartButton.addEventListener("click", () => {
      document.location.reload();
    });
    localStorage.setItem("doIndex", 0);

    const { history, spells, undo_redo } = JSON.parse(
      localStorage.getItem("settings")
    );
    if (!spells) {
      document.querySelector(".spells").remove();
    } else {
      localStorage.setItem(
        "spells",
        JSON.stringify({
          player1: ["goThru", "destroy", "swap", "shield"],
          player2: ["goThru", "destroy", "swap", "shield"],
        })
      );
    }
    if (!history) {
      document.querySelector(".history").remove();
    }

    if (!undo_redo) {
      const undo = document.querySelector("#undo");
      const redo = document.querySelector("#redo");
      undo.remove();
      redo.remove();
    }

    addHandlePieceSelect(initialPlayer, gameOver);
  }
}
