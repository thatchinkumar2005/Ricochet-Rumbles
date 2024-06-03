import moveBullet from "../render/Bullet.js";
import writeHistory from "../render/writeHistory.js";
import addHandlePieceSelect from "./addHandlePieceSelect.js";
import handlePause from "./handlePause.js";
import pieceHover from "./pieceHover.js";

export default async function handleMovePiece(
  piece,
  newCell,
  player,
  swap = false
) {
  const isBot = localStorage.getItem("bot");

  if (isBot == 1) {
    if (player === "player1") {
      writeHistory(
        ` Bot ${swap ? "swapped" : "moved"} ${piece.type} to (${
          swap
            ? newCell.parentElement.getAttribute("data-row")
            : newCell.getAttribute("data-row")
        }, ${
          swap
            ? newCell.parentElement.getAttribute("data-col")
            : newCell.getAttribute("data-col")
        }) from (${piece.parentElement.getAttribute(
          "data-row"
        )}, ${piece.parentElement.getAttribute("data-col")})`
      );
    } else {
      writeHistory(
        ` Player ${swap ? "swapped" : "moved"} ${piece.type} to (${
          swap
            ? newCell.parentElement.getAttribute("data-row")
            : newCell.getAttribute("data-row")
        }, ${
          swap
            ? newCell.parentElement.getAttribute("data-col")
            : newCell.getAttribute("data-col")
        }) from (${piece.parentElement.getAttribute(
          "data-row"
        )}, ${piece.parentElement.getAttribute("data-col")})`
      );
    }
  } else {
    writeHistory(
      `Player ${player} ${swap ? "swapped" : "moved"} ${piece.type} to (${
        swap
          ? newCell.parentElement.getAttribute("data-row")
          : newCell.getAttribute("data-row")
      }, ${
        swap
          ? newCell.parentElement.getAttribute("data-col")
          : newCell.getAttribute("data-col")
      }) from (${piece.parentElement.getAttribute(
        "data-row"
      )}, ${piece.parentElement.getAttribute("data-col")})`
    );
  }
  //audio
  const placePieceAudio = document.querySelector("#swapAudio");
  placePieceAudio.pause();
  placePieceAudio.currentTime = 0;
  placePieceAudio.play();

  //history
  //if i is the turn, then ith index in gamehistory represents board pieces position after ith turn player moves. i is even => player 2, i is odd => player 1
  const gameHistory = JSON.parse(localStorage.getItem("gameHistory"));
  const doIndex = localStorage.getItem("doIndex");
  if (doIndex > 0) {
    gameHistory.splice(gameHistory.length - doIndex, doIndex);
    localStorage.setItem("doIndex", 0);
  }
  const turn = gameHistory.length;
  console.log(turn);

  const prevRound = gameHistory[turn - 1];
  if (player === "player2") {
    let round;
    const player2 = structuredClone(prevRound.player2);
    const player1 = structuredClone(prevRound.player1);
    const spells = structuredClone(prevRound.spells);
    const pieceSpells = structuredClone(prevRound.pieceSpells);

    if (swap) {
      player2[piece.type].location = [
        Number(newCell.parentElement.getAttribute("data-row")),
        Number(newCell.parentElement.getAttribute("data-col")),
      ];
      if (newCell.player === 1) {
        if (newCell.type === "Ricochet" || newCell.type === "SemiRicochet") {
          player1[newCell.type].location = [
            Number(piece.parentElement.getAttribute("data-row")),
            Number(piece.parentElement.getAttribute("data-col")),
          ];
        } else {
          player1[newCell.type] = [
            Number(piece.parentElement.getAttribute("data-row")),
            Number(piece.parentElement.getAttribute("data-col")),
          ];
        }
      } else {
        if (newCell.type === "Ricochet" || newCell.type === "SemiRicochet") {
          player2[newCell.type].location = [
            Number(piece.parentElement.getAttribute("data-row")),
            Number(piece.parentElement.getAttribute("data-col")),
          ];
        } else {
          player2[newCell.type] = [
            Number(piece.parentElement.getAttribute("data-row")),
            Number(piece.parentElement.getAttribute("data-col")),
          ];
        }
      }

      round = { player1, player2, spells, pieceSpells };
    } else {
      if (piece.type === "Ricochet" || piece.type === "SemiRicochet") {
        player2[piece.type].location = [
          Number(newCell.getAttribute("data-row")),
          Number(newCell.getAttribute("data-col")),
        ];

        console.log(player2[piece.type].location);
      } else {
        player2[piece.type] = [
          Number(newCell.getAttribute("data-row")),
          Number(newCell.getAttribute("data-col")),
        ];
      }
      round = { player1, player2, spells, pieceSpells };
    }
    gameHistory.push(round);
  } else {
    let round;
    const player2 = structuredClone(prevRound.player2);
    const player1 = structuredClone(prevRound.player1);
    const spells = structuredClone(prevRound.spells);
    const pieceSpells = structuredClone(prevRound.pieceSpells);
    if (swap) {
      player1[piece.type].location = [
        Number(newCell.parentElement.getAttribute("data-row")),
        Number(newCell.parentElement.getAttribute("data-col")),
      ];
      if (newCell.player === 2) {
        if (newCell.type === "Ricochet" || newCell.type === "SemiRicochet") {
          player2[newCell.type].location = [
            Number(piece.parentElement.getAttribute("data-row")),
            Number(piece.parentElement.getAttribute("data-col")),
          ];
        } else {
          player2[newCell.type] = [
            Number(piece.parentElement.getAttribute("data-row")),
            Number(piece.parentElement.getAttribute("data-col")),
          ];
        }
      } else {
        if (newCell.type === "Ricochet" || newCell.type === "SemiRicochet") {
          player1[newCell.type].location = [
            Number(piece.parentElement.getAttribute("data-row")),
            Number(piece.parentElement.getAttribute("data-col")),
          ];
        } else {
          player1[newCell.type] = [
            Number(piece.parentElement.getAttribute("data-row")),
            Number(piece.parentElement.getAttribute("data-col")),
          ];
        }
      }

      round = { player1, player2, spells, pieceSpells };
    } else {
      if (piece.type === "Ricochet" || piece.type === "SemiRicochet") {
        player1[piece.type].location = [
          Number(newCell.getAttribute("data-row")),
          Number(newCell.getAttribute("data-col")),
        ];
      } else {
        player1[piece.type] = [
          Number(newCell.getAttribute("data-row")),
          Number(newCell.getAttribute("data-col")),
        ];
      }
      round = { player1, player2, spells, pieceSpells };
    }
    gameHistory.push(round);
  }
  localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
  console.log(gameHistory);

  //clearing the controlls
  const controlls = document.querySelector("#controlls");
  controlls.innerHTML = "";

  if (!swap) {
    piece.remove();
    newCell.appendChild(piece);
  } else {
    const targetPiece = newCell;
    const newCell_ = targetPiece.parentElement;
    const oldCell = piece.parentElement;
    console.log(piece);
    console.log(newCell_);
    console.log(oldCell);
    targetPiece.remove();
    piece.remove();
    oldCell.appendChild(targetPiece);
    newCell_.appendChild(piece);
  }
  const prevDest = document.querySelectorAll(".validDest");
  prevDest.forEach((dest) => {
    dest.onclick = null;
    dest.classList.remove("validDest");
  });

  const allPieces = document.querySelectorAll(".piece");
  allPieces.forEach((p) => {
    p.removeEventListener("mouseenter", pieceHover);
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

  if (piece.player !== 1 && isBot == 1) {
    setTimeout(() => {
      addHandlePieceSelect(player === "player1" ? 2 : 1, gameOver); //recursive call
    }, 1000);
  } else {
    addHandlePieceSelect(player === "player1" ? 2 : 1, gameOver); //recursive call
  }
}
