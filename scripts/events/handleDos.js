import { Ricochet, SemiRicochet } from "../Globals/RicochetOrientation.js";
import { players } from "../Globals/players.js";
import writeHistory from "../render/writeHistory.js";
import addHandlePieceSelect from "./addHandlePieceSelect.js";
export default function handleDos(do_) {
  const settings = JSON.parse(localStorage.getItem("settings"));
  const gameHistory = JSON.parse(localStorage.getItem("gameHistory"));
  let doIndex = localStorage.getItem("doIndex");
  let player_;

  if (do_ === "undo") {
    doIndex++;
    console.log(`DoIndex->index : ${gameHistory.length - (doIndex + 1)}`);
    const round = gameHistory[gameHistory.length - (doIndex + 1)];
    if (!round) return;
    writeHistory("Undo");
    console.log(round);

    for (let i = 0; i < 2; i++) {
      const player = structuredClone(round[`player${i + 1}`]);
      const spellPlayer = structuredClone(round.pieceSpells[`player${i + 1}`]);
      console.log(players);
      players[i].pieces.forEach((p) => {
        if (settings.spells) {
          if (spellPlayer.hasOwnProperty(p)) {
            let piece = document.querySelector(`.${p}.player${i + 1}`);
            piece.spell = spellPlayer[p];
            piece.classList.remove(
              "goThruAnimate",
              "destroyAnimate",
              "shieldAnimate"
            );
            piece.classList.add(`${piece.spell}Animate`);
          }
        }
        if (player.hasOwnProperty(p)) {
          if (p === "Ricochet" || p === "SemiRicochet") {
            console.log(p);
            const newCell = document.querySelector(
              `[data-row='${player[p].location[0]}'][data-col='${player[p].location[1]}']`
            );
            let piece = document.querySelector(`.${p}.player${i + 1}`);
            if (!piece) {
              piece = document.createElement("div");
              piece.type = p;
              piece.player = i + 1;
              piece.classList.add("piece", p, `player${i + 1}`);
              newCell.append(piece);
            }
            piece.orientation = player[p].orientation;
            if (piece.type === "Ricochet") {
              switch (piece.orientation) {
                case Ricochet.type1:
                  piece.style.transform = "rotate(0deg)";
                  break;
                case Ricochet.type2:
                  piece.style.transform = "rotate(90deg)";
                  break;
              }
            } else if (piece.type === "SemiRicochet") {
              switch (piece.orientation) {
                case SemiRicochet.type1:
                  piece.style.transform = "rotate(0deg)";
                  break;
                case SemiRicochet.type2:
                  piece.style.transform = "rotate(90deg)";
                  break;
                case SemiRicochet.type3:
                  piece.style.transform = "rotate(180deg)";
                  break;
                case SemiRicochet.type4:
                  piece.style.transform = "rotate(270deg)";
                  break;
              }
            }
            !player_ && piece.classList.contains("turn") //figuring the player out
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
        }
      });
    }
    const spells = structuredClone(round.spells);
    localStorage.setItem("spells", JSON.stringify(spells));
    console.log(player_);
    localStorage.setItem("doIndex", doIndex);
    const prevInterval = JSON.parse(localStorage.getItem("timer")).interval;
    clearInterval(prevInterval);
    addHandlePieceSelect(player_, false);
  } else {
    doIndex--;
    if (doIndex === -1) return;
    writeHistory("Redo");
    console.log(`DoIndex->index : ${gameHistory.length - (doIndex + 1)}`);
    const round = gameHistory[gameHistory.length - (doIndex + 1)];
    if (!round) return;
    console.log(round);

    for (let i = 0; i < 2; i++) {
      const player = structuredClone(round[`player${i + 1}`]);
      const spellPlayer = structuredClone(round.pieceSpells[`player${i + 1}`]);
      console.log(player);
      console.log(players);
      players[i].pieces.forEach((p) => {
        if (settings.spells) {
          if (spellPlayer.hasOwnProperty(p)) {
            let piece = document.querySelector(`.${p}.player${i + 1}`);
            piece.spell = spellPlayer[p];
            piece.classList.remove(
              "goThruAnimate",
              "destroyAnimate",
              "shieldAnimate"
            );
            piece.classList.add(`${piece.spell}Animate`);
          }
        }
        if (player.hasOwnProperty(p)) {
          if (p === "Ricochet" || p === "SemiRicochet") {
            console.log(p);
            const newCell = document.querySelector(
              `[data-row='${player[p].location[0]}'][data-col='${player[p].location[1]}']`
            );
            let piece = document.querySelector(`.${p}.player${i + 1}`);
            if (!piece) {
              // piece = document.createElement("div");
              // piece.type = p;
              // piece.player = i + 1;
              // piece.classList.add("piece", p, `player${i + 1}`);
              // newCell.append(piece);
            }
            piece.orientation = player[p].orientation;
            if (piece.type === "Ricochet") {
              switch (piece.orientation) {
                case Ricochet.type1:
                  piece.style.transform = "rotate(0deg)";
                  break;
                case Ricochet.type2:
                  piece.style.transform = "rotate(90deg)";
                  break;
              }
            } else if (piece.type === "SemiRicochet") {
              switch (piece.orientation) {
                case SemiRicochet.type1:
                  piece.style.transform = "rotate(0deg)";
                  break;
                case SemiRicochet.type2:
                  piece.style.transform = "rotate(90deg)";
                  break;
                case SemiRicochet.type3:
                  piece.style.transform = "rotate(180deg)";
                  break;
                case SemiRicochet.type4:
                  piece.style.transform = "rotate(270deg)";
                  break;
              }
            }
            !player_ && piece.classList.contains("turn") //figuring the player out
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
        }
      });
    }
    const spells = structuredClone(round.spells);
    localStorage.setItem("spells", JSON.stringify(spells));
    console.log(player_);
    localStorage.setItem("doIndex", doIndex);
    const prevInterval = JSON.parse(localStorage.getItem("timer")).interval;
    clearInterval(prevInterval);
    addHandlePieceSelect(player_, false);
  }
}
