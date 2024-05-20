import moveBullet from "../render/Bullet.js";
import addHandlePieceSelect from "./addHandlePieceSelect.js";
import handlePause from "./handlePause.js";

export default async function handleMovePiece(piece, newCell, player) {
  //history
  //if i is the turn, then ith index in gamehistory represents board pieces position after ith turn player moves. i is even => player 2, i is odd => player 1
  const gameHistory = JSON.parse(localStorage.getItem("gameHistory"));
  const turn = gameHistory.length;
  console.log(turn);
  const prevRound = gameHistory[turn - 1];

  if (turn % 2 === 0) {
    const player2 = { ...prevRound.player2 };
    player2[piece.type] = [
      Number(newCell.getAttribute("data-row")),
      Number(newCell.getAttribute("data-col")),
    ];
    const round = { player1: prevRound.player1, player2 };
    gameHistory.push(round);
  } else {
    const player1 = { ...prevRound.player1 };
    player1[piece.type] = [
      Number(newCell.getAttribute("data-row")),
      Number(newCell.getAttribute("data-col")),
    ];
    const round = { player1, player2: prevRound.player2 };
    gameHistory.push(round);
  }
  localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
  console.log(gameHistory);

  const prevCell = piece.parentElement;

  //clearing the controlls
  const controlls = document.querySelector("#controlls");
  controlls.innerHTML = "";

  piece.remove();
  newCell.appendChild(piece);
  const prevDest = document.querySelectorAll(".validDest");
  prevDest.forEach((dest) => {
    dest.classList.remove("validDest");
  });

  //Bullet mech
  const Cannon = document.querySelector(`.piece.Cannon.player${piece.player}`);
  const Cannon_Cell = Cannon.parentElement;
  let cannonLocation = [
    Number(Cannon_Cell.getAttribute("data-row")),
    Number(Cannon_Cell.getAttribute("data-col")),
  ];

  const pause = document.querySelector("#pause");
  pause.removeEventListener("click", handlePause);
  const prevInterval = JSON.parse(localStorage.getItem("timer")).interval; //getting the previous timer interval
  clearInterval(Number(prevInterval)); //removing previous timer interval

  const dir = player === "player1" ? 0 : 1;
  let gameOver = await moveBullet(dir, cannonLocation, piece.player);
  console.log(gameOver);

  addHandlePieceSelect(player === "player1" ? 2 : 1, gameOver); //recursive call
}
