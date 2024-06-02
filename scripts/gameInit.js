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

    const undoButton = document.querySelector("#undo");
    undoButton.addEventListener("click", () => {
      handleDos("undo");
    });

    const redoButton = document.querySelector("#redo");
    redoButton.addEventListener("click", () => {
      handleDos("redo");
    });
    localStorage.setItem("doIndex", 0);

    const { history, spells } = JSON.parse(localStorage.getItem("settings"));
    if (!spells) {
      document.querySelector(".spells").remove();
    } else {
      localStorage.setItem(
        "spells",
        JSON.stringify({
          player1: ["goThru", "destroy", "shield"],
          player2: ["goThru", "destroy", "shield"],
        })
      );
      localStorage.setItem(
        "spellHistory",
        JSON.stringify([
          {
            player1: {
              SemiRicochet: null,
              Ricochet: null,
              Titan: null,
              Tank: null,
              Cannon: null,
            },
            player2: {
              SemiRicochet: null,
              Ricochet: null,
              Titan: null,
              Tank: null,
              Cannon: null,
            },
          },
        ])
      );
    }
    if (!history) {
      document.querySelector(".history").remove();
    }

    addHandlePieceSelect(initialPlayer, gameOver);
  }
}
