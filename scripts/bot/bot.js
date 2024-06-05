import { pieces as Pieces, pieces } from "../Globals/players.js";

export default function bot() {
  const settings = JSON.parse(localStorage.getItem("settings"));
  let possibilities = ["move", "rotate", "swap"];
  if (settings.spells) {
    possibilities.push("spells");
  }
  const outCome =
    possibilities[Math.floor(Math.random() * possibilities.length)];

  if (outCome === "move") {
    let randomPiece = Pieces[Math.floor(Math.random() * Pieces.length)];
    console.log(randomPiece);
    let piece = document.querySelector(`.player1.${randomPiece}`);
    if (!piece) {
      let randomPiece;
      randomPiece = Pieces.splice(Pieces.indexOf(randomPiece), 1)[
        Math.round(Math.random() * (Pieces.length - 1))
      ];
      let piece = document.querySelector(`.player1.${randomPiece}`);
    }
    piece.click();
    const dests = document.querySelectorAll(".validDest");
    const dest = dests[Math.floor(Math.random() * dests.length)];

    setTimeout(() => {
      dest.click();
    }, 500);
  } else if (outCome === "rotate") {
    const pieceType = ["Ricochet", "SemiRicochet"][
      Math.floor(Math.random() * 2)
    ];
    const piece = document.querySelector(`.player1.${pieceType}`);
    piece.click();

    const dir = ["left", "right"][Math.floor(Math.random() * 2)];

    const btn = document.querySelector(`.btn.${dir}`);

    setTimeout(() => {
      btn.click();
    }, 500);
  } else if (outCome === "swap") {
    const ricochet = document.querySelector(".Ricochet.player1");
    ricochet.click();
    const swapBtn = document.querySelector(".btn.swap");
    setTimeout(() => {
      swapBtn.click();
    }, 400);
    const pieces = document.querySelectorAll(".piece");
    let piece = pieces[Math.floor(Math.random() * pieces.length)];
    console.log(piece);
    piece.click();
  }
}
