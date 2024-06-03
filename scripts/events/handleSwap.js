import handleMovePiece from "./handleMovePiece.js";
import pieceHover from "./pieceHover.js";

export default function handleSwap(piece) {
  const pieces = Array.from(document.querySelectorAll(".piece"));
  const prevValidDest = document.querySelectorAll(".validDest");
  const swapAudio = document.querySelector("#swapAudio");
  swapAudio.pause();
  swapAudio.currenTime = 0;
  swapAudio.play();
  prevValidDest.forEach((d) => {
    d.onclick = null;
    d.classList.remove("validDest");
  });
  pieces.forEach((p) => {
    p.onclick = null;

    if (p.type === "Cannon") {
      p.removeEventListener("mouseenter", pieceHover);
      p.classList.remove("turn");
      return;
    }
    p.addEventListener("mouseenter", pieceHover);
    const cell = p.parentElement;
    cell.classList.add("validDest");
    cell.onclick = (e) => {
      handleMovePiece(piece, e.srcElement, piece.classList[1], true);
    };
  });
}
