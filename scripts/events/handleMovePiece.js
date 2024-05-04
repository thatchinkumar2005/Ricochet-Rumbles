import addHandlePieceSelect from "./addHandlePieceSelect.js";
import handlePieceSelect from "./handlePieceSelect.js";

export default function handleMovePiece(piece, newCell, player, gameOver) {
  //history
  //if i is the turn, then ith index in gamehistory represents board pieces position after ith turn player moves. i is even => player 2, i is odd => player 1
  const gameHistory = JSON.parse(localStorage.getItem("gameHistory"));
  const turn = gameHistory.length;
  console.log(turn);
  const prevRound = gameHistory[turn - 1];

  if (turn % 2 === 0) {
    console.log("player2");
    const player2 = { ...prevRound.player2 };
    player2[piece.type] = [
      Number(newCell.getAttribute("data-row")),
      Number(newCell.getAttribute("data-col")),
    ];
    const round = { player1: prevRound.player1, player2 };
    gameHistory.push(round);
  } else {
    console.log("player1");
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

  prevCell.innerHTML = "";
  newCell.appendChild(piece);
  const prevDest = document.querySelectorAll(".validDest");
  prevDest.forEach((dest) => {
    dest.classList.remove("validDest");
  });
  newCell.firstElementChild.addEventListener("click", handlePieceSelect);
  if (!gameOver) addHandlePieceSelect(player === "player1" ? 2 : 1); //recursive call
}
