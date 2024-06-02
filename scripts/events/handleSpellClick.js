import moveBullet from "../render/Bullet.js";
import writeHistory from "../render/writeHistory.js";
import addHandlePieceSelect from "./addHandlePieceSelect.js";
import handlePause from "./handlePause.js";
import pieceHover from "./pieceHover.js";

export default async function handleSpellClick(e) {
  const spell = e.srcElement;
  if (!spell.type) return;

  let gameOver = false;

  const Cannon = document.querySelector(`.piece.Cannon.player${spell.player}`);
  const Cannon_Cell = Cannon.parentElement;
  let cannonLocation = [
    Number(Cannon_Cell.getAttribute("data-row")),
    Number(Cannon_Cell.getAttribute("data-col")),
  ];

  const pause = document.querySelector("#pause");
  pause.removeEventListener("click", handlePause);
  const prevInterval = JSON.parse(localStorage.getItem("timer")).interval; //getting the previous timer interval

  const dir = e.srcElement.player === 1 ? 0 : 1;
  let pieces, spells;

  const prevDests = document.querySelectorAll(".validDest");
  console.log(prevDests);
  prevDests.forEach((d) => {
    d.classList.remove("validDest");
    d.firstElementChild.onclick = null;
    d.onclick = null;
  });

  pieces = document.querySelectorAll(".piece");
  pieces.forEach((p) => {
    p.onclick = null;
    p.removeEventListener("mouseenter", pieceHover);
    p.addEventListener("mouseenter", pieceHover);
  });

  const magicAudio = document.querySelector("#magicAudio");
  const clickAudio = document.querySelector("#click_audio");
  clickAudio.pause();
  clickAudio.currentTime = 0;
  clickAudio.play();

  const isBot = localStorage.getItem("bot");

  const spellHistory = JSON.parse(localStorage.getItem("spellHistory"));
  const prevSpellRound = spellHistory[spellHistory.length - 1];
  const newSpellRound = structuredClone(prevSpellRound);
  const history = JSON.parse(localStorage.getItem("gameHistory"));
  const prevRound = history[history.length - 1];
  const newRound = structuredClone(prevRound);

  switch (spell.type) {
    case "goThru":
      pieces = document.querySelectorAll(".piece");
      console.log("gothru");
      pieces.forEach((p) => {
        p.parentElement.classList.add("validDest");
        p.onclick = async (e) => {
          //audio
          magicAudio.pause();
          magicAudio.currentTime = 0;
          magicAudio.play();

          if (isBot == 1) {
            if (spell.player == 1) {
              writeHistory(`Bot applied ${spell.type} to ${e.srcElement.type}`);
            } else {
              writeHistory(
                `Player applied ${spell.type} to ${e.srcElement.type}`
              );
            }
          } else {
            writeHistory(
              `Player ${spell.player} applied ${spell.type} to ${e.srcElement.type}`
            );
          }

          p.spell = spell.type; //apply spell
          e.srcElement.classList.remove(
            "goThruAnimate",
            "destroyAnimate",
            "shieldAnimate"
          );
          p.classList.add("goThruAnimate");
          newSpellRound[`player${spell.player}`][p.type] = spell.type;
          spellHistory.push(newSpellRound);
          localStorage.setItem("spellHistory", JSON.stringify(spellHistory));
          console.log(spellHistory);
          pieces.forEach((p) => {
            p.onclick = null;
            p.parentElement.classList.remove("validDest");
          }); //remove other listners
          clearInterval(Number(prevInterval)); //removing previous timer interval
          pieces.forEach((p) =>
            p.removeEventListener("mouseenter", pieceHover)
          );

          gameOver = await moveBullet(dir, cannonLocation, spell.player);
          addHandlePieceSelect(spell.player === 1 ? 2 : 1, gameOver); //switching player
          console.log(gameOver);
        };
      });

      //spells LS
      spells = JSON.parse(localStorage.getItem("spells"));
      spells[`player${e.srcElement.player}`].splice(
        spells[`player${e.srcElement.player}`].indexOf(spell.type),
        1
      );
      localStorage.setItem("spells", JSON.stringify(spells));
      newRound.spells = spells;
      console.log(newRound);
      history.push(newRound);
      console.log(history);
      localStorage.setItem("gameHistory", JSON.stringify(history));
      break;
    case "destroy":
      pieces = document.querySelectorAll(".piece");
      console.log("destroy");
      pieces.forEach((p) => {
        if (p.type === "Titan" || p.type === "Cannon") return;
        p.parentElement.classList.add("validDest");
        p.onclick = async (e) => {
          //audio
          magicAudio.pause();
          magicAudio.currentTime = 0;
          magicAudio.play();

          if (isBot == 1) {
            if (spell.player == 1) {
              writeHistory(`Bot applied ${spell.type} to ${e.srcElement.type}`);
            } else {
              writeHistory(
                `Player applied ${spell.type} to ${e.srcElement.type}`
              );
            }
          } else {
            writeHistory(
              `Player ${spell.player} applied ${spell.type} to ${e.srcElement.type}`
            );
          }

          p.spell = spell.type;
          p.classList.remove(
            "goThruAnimate",
            "destroyAnimate",
            "shieldAnimate"
          );
          p.classList.add("destroyAnimate");
          newSpellRound[`player${spell.player}`][p.type] = spell.type;
          spellHistory.push(newSpellRound);
          localStorage.setItem("spellHistory", JSON.stringify(spellHistory));
          pieces.forEach((p) => {
            p.onclick = null;
            p.parentElement.classList.remove("validDest");
          });
          pieces.forEach((p) =>
            p.removeEventListener("mouseenter", pieceHover)
          );

          clearInterval(Number(prevInterval)); //removing previous timer interval
          gameOver = await moveBullet(dir, cannonLocation, spell.player);
          addHandlePieceSelect(spell.player === 1 ? 2 : 1, gameOver);
          console.log(gameOver);
        };
      });
      spells = JSON.parse(localStorage.getItem("spells"));
      spells[`player${e.srcElement.player}`].splice(
        spells[`player${e.srcElement.player}`].indexOf(spell.type),
        1
      );
      localStorage.setItem("spells", JSON.stringify(spells));
      newRound.spells = spells;
      console.log(newRound);
      history.push(newRound);
      console.log(history);
      localStorage.setItem("gameHistory", JSON.stringify(history));
      break;
    case "shield":
      pieces = document.querySelectorAll(".piece");
      console.log("shield");
      pieces.forEach((p) => {
        p.parentElement.classList.add("validDest");
        p.onclick = async (e) => {
          //audio
          magicAudio.pause();
          magicAudio.currentTime = 0;
          magicAudio.play();

          if (isBot == 1) {
            if (spell.player == 1) {
              writeHistory(`Bot applied ${spell.type} to ${e.srcElement.type}`);
            } else {
              writeHistory(
                `Player applied ${spell.type} to ${e.srcElement.type}`
              );
            }
          } else {
            writeHistory(
              `Player ${spell.player} applied ${spell.type} to ${e.srcElement.type}`
            );
          }

          p.spell = spell.type;
          p.classList.remove(
            "goThruAnimate",
            "destroyAnimate",
            "shieldAnimate"
          );
          p.classList.add("shieldAnimate");
          newSpellRound[`player${spell.player}`][p.type] = spell.type;
          spellHistory.push(newSpellRound);
          localStorage.setItem("spellHistory", JSON.stringify(spellHistory));
          pieces.forEach((p) => {
            p.onclick = null;
            p.parentElement.classList.remove("validDest");
          });
          clearInterval(Number(prevInterval)); //removing previous timer interval
          pieces.forEach((p) =>
            p.removeEventListener("mouseenter", pieceHover)
          );

          gameOver = await moveBullet(dir, cannonLocation, spell.player);
          addHandlePieceSelect(spell.player === 1 ? 2 : 1, gameOver);
          console.log(gameOver);
        };
      });
      spells = JSON.parse(localStorage.getItem("spells"));
      spells[`player${e.srcElement.player}`].splice(
        spells[`player${e.srcElement.player}`].indexOf(spell.type),
        1
      );
      localStorage.setItem("spells", JSON.stringify(spells));
      newRound.spells = spells;
      console.log(newRound);
      history.push(newRound);
      console.log(history);
      localStorage.setItem("gameHistory", JSON.stringify(history));

      break;
  }
}
