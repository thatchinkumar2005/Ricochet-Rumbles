import handleMovePiece from "./handleMovePiece.js";

export default function handleSwap(piece) {
  const pieces = Array.from(document.querySelectorAll(".piece"));
  const prevValidDest = document.querySelectorAll(".validDest");
  prevValidDest.forEach((d) => {
    d.onclick = null;
    d.classList.remove("validDest");
  });
  pieces.forEach((p) => {
    p.onclick = null;
    const cell = p.parentElement;
    cell.classList.add("validDest");
    cell.onclick = (e) => {
      handleMovePiece(piece, e.srcElement, piece.classList[1], true);
    };
  });
}
