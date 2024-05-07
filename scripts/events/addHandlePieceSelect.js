import handlePieceSelect from "./handlePieceSelect.js";

export default function addHandlePieceSelect(player, gameOver) {
  const playerPieces = document.querySelectorAll(`.piece.player${player}`);
  const otherPieces = document.querySelectorAll(
    `.piece.player${player === 1 ? 2 : 1}`
  );
  const pieces = document.querySelectorAll(".piece");
  if (!gameOver) {
    playerPieces.forEach((p) => {
      p.onclick = (e) => {
        handlePieceSelect(e.srcElement, gameOver);
      };
      p.classList.add("turn");
    });
    otherPieces.forEach((p) => {
      p.onclick = null;
      p.classList.remove("turn");
    });
  } else {
    alert("GameOver");
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
