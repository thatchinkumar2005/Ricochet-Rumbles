import addHandlePieceSelect from "./addHandlePieceSelect.js";
import handlePieceSelect from "./handlePieceSelect.js";

export default function handleMovePiece(piece, newCell, player, gameOver) {
  console.log(piece);
  const prevCell = piece.parentElement;

  //clearing the controlls
  const controlls = document.querySelector("#controlls");
  controlls.innerHTML = "";

  prevCell.innerHTML = "";
  newCell.appendChild(piece);
  const prevDest = document.querySelectorAll(".validDest");
  prevDest.forEach((dest) => {
    dest.classList.remove("validDest");
  });
  newCell.firstElementChild.addEventListener("click", handlePieceSelect);
  if (!gameOver) addHandlePieceSelect(player === "player1" ? 2 : 1); //recursive call
}
