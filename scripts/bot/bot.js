import { pieces as Pieces, pieces } from "../Globals/players.js";

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export default async function bot() {
  const settings = JSON.parse(localStorage.getItem("settings"));
  let possibilities = ["move", "rotate", "swap"];
  const outCome =
    possibilities[Math.floor(Math.random() * possibilities.length)];

  console.log(outCome);

  if (outCome === "move") {
    let randomPiece = Pieces[Math.floor(Math.random() * Pieces.length)];
    console.log(randomPiece);
    let piece = document.querySelector(`.player1.${randomPiece}`);
    if (!piece) {
      randomPiece = Pieces.splice(Pieces.indexOf(randomPiece), 1)[
        Math.round(Math.random() * (Pieces.length - 1))
      ];
      piece = document.querySelector(`.player1.${randomPiece}`);
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

    btn.click();
  } else if (outCome === "swap") {
    const ricochet = document.querySelector(".Ricochet.player1");
    ricochet.click();
    const swapBtn = document.querySelector(".btn.swap");
    swapBtn.click();
    const pieces = document.querySelectorAll(".piece");
    let piece = pieces[Math.floor(Math.random() * pieces.length)];
    while (piece.type === "Cannon") {
      piece = pieces[Math.floor(Math.random() * pieces.length)]; // <--- Change: Reassigning `piece` instead of redeclaring it
    }
    console.log(piece);
    setTimeout(() => {
      piece.click();
    }, 500);
  }
}
