import { Ricochet, SemiRicochet } from "../Globals/RicochetOrientation.js";
import addHandlePieceSelect from "./addHandlePieceSelect.js";

export default function handleRotate(piece, dir) {
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
  //Ricochet Orientation
  console.log("before");
  console.log(piece.orientation);
  if (piece.type === "Ricochet") {
    if (piece.orientation === Ricochet.type1) {
      piece.orientation = Ricochet.type2;
    } else if (piece.orientation === Ricochet.type2) {
      piece.orientation = Ricochet.type1;
    }
  }

  if (piece.type === "SemiRicochet") {
    if (dir === "right") {
      switch (piece.orientation) {
        case SemiRicochet.type1:
          piece.orientation = SemiRicochet.type2;
          break;
        case SemiRicochet.type2:
          piece.orientation = SemiRicochet.type3;
          break;
        case SemiRicochet.type3:
          piece.orientation = SemiRicochet.type4;
          break;
        case SemiRicochet.type4:
          piece.orientation = SemiRicochet.type1;
          break;
      }
    } else if (dir === "left") {
      switch (piece.orientation) {
        case SemiRicochet.type1:
          piece.orientation = SemiRicochet.type4;
          break;
        case SemiRicochet.type2:
          piece.orientation = SemiRicochet.type1;
          break;
        case SemiRicochet.type3:
          piece.orientation = SemiRicochet.type2;
          break;
        case SemiRicochet.type4:
          piece.orientation = SemiRicochet.type3;
          break;
      }
    }
  }

  console.log("after");
  console.log(piece.orientation);

  if (!gameOver) addHandlePieceSelect(piece.player === 1 ? 2 : 1);
  console.log(piece.classList);
  const dests = document.querySelectorAll(".validDest");
  dests.forEach((c) => (c.onclick = null));
  dests.forEach((dest) => {
    dest.classList.remove("validDest");
  });
}
