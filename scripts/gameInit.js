import addHandlePieceSelect from "./events/addHandlePieceSelect.js";
import handlePause from "./events/handlePause.js";

export default function gameInit(initialPlayer, gameOver) {
  if (!gameOver) {
    addHandlePieceSelect(initialPlayer, gameOver);
  }
}
