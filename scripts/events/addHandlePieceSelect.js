import handlePieceSelect from "./handlePieceSelect.js";

export default function addHandlePieceSelect(player, gameOver) {
  const playerPieces = document.querySelectorAll(`.piece.player${player}`);
  const otherPieces = document.querySelectorAll(
    `.piece.player${player === 1 ? 2 : 1}`
  );
  playerPieces.forEach((p) => {
    p.onclick = (e) => {
      handlePieceSelect(e.srcElement, gameOver);
    };
    p.classList.add("turn");
    console.log(p.classList);
  });
  otherPieces.forEach((p) => {
    p.onclick = null;
    p.classList.remove("turn");
  });
}
