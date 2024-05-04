import addHandlePieceSelect from "./addHandlePieceSelect.js";

export default function handleRotate(piece, dir, gameOver) {
  if (!piece.style.transform) {
    if (dir === "left") {
      piece.style.transform = "rotate(-90deg)";
    } else if (dir === "right") {
      piece.style.transform = "rotate(90deg)";
    }
  } else {
    const prevAngle = Number(piece.style.transform.match(/-?\d*\.{0,1}\d/)[0]);

    const newAngle = prevAngle + (dir === "left" ? -90 : 90);
    piece.style.transform = `rotate(${newAngle}deg)`.toString();
  }
  if (!gameOver) addHandlePieceSelect(piece.player === 1 ? 2 : 1);
  console.log(piece.classList);
  const dests = document.querySelectorAll(".validDest");
  dests.forEach((c) => (c.onclick = null));
  dests.forEach((dest) => {
    dest.classList.remove("validDest");
  });
}
