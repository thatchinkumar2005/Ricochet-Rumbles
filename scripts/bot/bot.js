import { pieces as Pieces } from "../Globals/players.js";

export default function bot() {
  const settings = JSON.parse(localStorage.getItem("settings"));
  let possibilities = !settings.spells
    ? ["Move", "Rotate", "Swap"]
    : ["Move", "Rotate", "Swap", "Spell"];

  const outCome =
    possibilities[Math.round(Math.random() * (possibilities.length - 1))];

  console.log(outCome);
  const pieces = document.querySelectorAll(".piece");
  if (outCome === "Move") {
    let randomPiece = Pieces[Math.round(Math.random() * (Pieces.length - 1))];
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

    pieces.forEach((p) => (p.onclick = null));
  } else if (outCome === "Rotate") {
    const pieceType = ["SemiRicochet", "Ricochet"][
      Math.round(Math.random() * 2)
    ];
    const piece = document.querySelector(`.player1.${pieceType}`);
    setTimeout(() => {
      piece.click();
    }, 500);

    const dir = ["left", "right"][Math.round(Math.random() * 2)];
    const btn = document.querySelector(`.btn.${dir}`);
    btn.click();
    pieces.forEach((p) => (p.onclick = null));
  } else if (outCome === "Swap") {
    const piece = document.querySelector(`.player1.Ricochet`);
    piece.click();
    const btn = document.querySelector(".btn.swap");
    btn.click();
    const pieces = document.querySelectorAll(".piece");
    let select;
    while (select.type === "Cannon") {
      select = pieces[Math.round(Math.random() * (pieces.length - 1))];
      console.log(select);
    }
    setTimeout(() => {
      select.click();
    });
    pieces.forEach((p) => (p.onclick = null));
  } else if (outCome === "Spell") {
    const spells = document.querySelectorAll(".spell");
    const spell = spells[Math.round(Math.random() * spells.length)];
    spell.click();

    const pieces = document.querySelectorAll(".piece");
    let select;

    if (spell.type === "destroy") {
      while (select.type === "Cannon" || select.type === "Titan") {
        select = pieces[Math.round(Math.random() * pieces.length)];
      }
    } else {
      select = pieces[Math.round(Math.random() * pieces.length)];
    }

    setTimeout(() => {
      select.click();
    });
    pieces.forEach((p) => (p.onclick = null));
  }
}
