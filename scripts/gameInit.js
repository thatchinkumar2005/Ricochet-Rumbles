import addHandlePieceSelect from "./events/addHandlePieceSelect.js";
import handleDos from "./events/handleDos.js";
import handlePause from "./events/handlePause.js";

export default function gameInit(initialPlayer, gameOver) {
  if (!gameOver) {
    addHandlePieceSelect(initialPlayer, gameOver);

    const restartButton = document.querySelector("#restart");
    restartButton.addEventListener("click", () => {
      document.location.reload();
    });

    const undoButton = document.querySelector("#undo");
    undoButton.addEventListener("click", () => {
      handleDos("undo");
    });
    localStorage.setItem("doIndex", 0);
  }
}
