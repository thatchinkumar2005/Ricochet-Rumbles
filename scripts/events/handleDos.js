import { players } from "../Globals/players.js";
import addHandlePieceSelect from "./addHandlePieceSelect.js";
export default function handleDos(do_) {
  const gameHistory = JSON.parse(localStorage.getItem("gameHistory"));
  let doIndex = localStorage.getItem("doIndex");
  let player_;

  if (do_ === "undo") {
    doIndex++;
    console.log(`THIS : ${gameHistory.length - (doIndex + 1)}`);
    const round = gameHistory[gameHistory.length - (doIndex + 1)];
    if (!round) return;
    console.log(round);

    for (let i = 0; i < 2; i++) {
      const player = structuredClone(round[`player${i + 1}`]);
      console.log(players);
      players[i].pieces.forEach((p) => {
        if (p === "Ricochet" || p === "SemiRicochet") {
          console.log(p);
          const newCell = document.querySelector(
            `[data-row='${player[p].location[0]}'][data-col='${player[p].location[1]}']`
          );
          const piece = document.querySelector(`.${p}.player${i + 1}`);
          !player_ && piece.classList.contains("turn")
            ? (player_ = i + 1 === 1 ? 2 : 1)
            : null;
          console.log(piece);
          piece.remove();
          newCell.append(piece);
        } else {
          console.log(p);
          const newCell = document.querySelector(
            `[data-row='${player[p][0]}'][data-col='${player[p][1]}']`
          );
          const piece = document.querySelector(`.${p}.player${i + 1}`);
          console.log(piece);
          piece.remove();
          newCell.append(piece);
        }
      });
    }
    console.log(player_);
    localStorage.setItem("doIndex", doIndex);
    const prevInterval = JSON.parse(localStorage.getItem("timer")).interval;
    clearInterval(prevInterval);
    addHandlePieceSelect(player_, false);
  } else {
    if (doIndex === -1) return;
    doIndex--;
    const round = gameHistory[gameHistory.length - (doIndex + 1)];
    console.log(round);
    localStorage.setItem("doIndex", doIndex);
  }
}
