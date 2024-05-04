import addHandlePieceSelect from "./events/addHandlePieceSelect.js";

export default function gameInit(initialPlayer, gameOver) {
  if (!gameOver) addHandlePieceSelect(initialPlayer, gameOver);
}
