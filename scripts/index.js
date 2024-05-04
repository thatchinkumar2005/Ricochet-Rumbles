import gameInit from "./gameInit.js";
import placeCells from "./render/placeCells.js";
import placePieces from "./render/placePieces.js";

let initialPlayer = 1;
let gameOver = false;
const players = [
  {
    player: 1,
    pieces: ["Titan", "Tank", "Ricochet", "SemiRicochet", "Cannon"],
  },
  {
    player: 2,
    pieces: ["Titan", "Tank", "Ricochet", "SemiRicochet", "Cannon"],
  },
];

placeCells();
placePieces(players, initialPlayer);
const turnCard = document.querySelector(".turnCard");
turnCard.innerHTML = `Player ${initialPlayer}'s turn`;

gameInit(initialPlayer, gameOver);
