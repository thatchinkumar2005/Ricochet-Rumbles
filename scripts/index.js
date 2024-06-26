import gameInit from "./gameInit.js";
import placeCells from "./render/placeCells.js";
import placePieces from "./render/placePieces.js";

let initialPlayer = 1;
let gameOver = false;

placeCells();
placePieces();
const turnCard = document.querySelector(".turnCard");
turnCard.innerHTML = `Player ${initialPlayer}'s turn`;

localStorage.setItem("bot", 0);

gameInit(initialPlayer, gameOver);
