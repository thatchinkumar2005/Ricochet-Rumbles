import addHandlePieceSelect from "./events/addHandlePieceSelect.js";
import handlePause from "./events/handlePause.js";

export default function gameInit(initialPlayer, gameOver) {
  if (!gameOver) {
    addHandlePieceSelect(initialPlayer, gameOver);
    const pauseButton = document.querySelector("#pause");
    console.log(pauseButton);
    pauseButton.addEventListener("click", () => {
      handlePause();
    });
  }
}
