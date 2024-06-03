import moveBullet from "../render/Bullet.js";
import writeHistory from "../render/writeHistory.js";
import addHandlePieceSelect from "./addHandlePieceSelect.js";
import handlePause from "./handlePause.js";
import pieceHover from "./pieceHover.js";

export default async function handleApplySpell(p, spell) {
  const magicAudio = document.querySelector("#magicAudio");

  const isBot = localStorage.getItem("bot");
  const history = JSON.parse(localStorage.getItem("gameHistory"));
  const prevRound = history[history.length - 1];
  const newRound = structuredClone(prevRound);
  const pieces = document.querySelectorAll(".piece");

  const Cannon = document.querySelector(`.piece.Cannon.player${spell.player}`);
  const Cannon_Cell = Cannon.parentElement;
  let cannonLocation = [
    Number(Cannon_Cell.getAttribute("data-row")),
    Number(Cannon_Cell.getAttribute("data-col")),
  ];

  const pause = document.querySelector("#pause");
  pause.removeEventListener("click", handlePause);
  const prevInterval = JSON.parse(localStorage.getItem("timer")).interval; //getting the previous timer interval

  const dir = spell.player === 1 ? 0 : 1;

  //audio
  magicAudio.pause();
  magicAudio.currentTime = 0;
  magicAudio.play();

  //write History
  if (isBot == 1) {
    if (spell.player == 1) {
      writeHistory(`Bot applied ${spell.type} to ${p.type}`);
    } else {
      writeHistory(`Player applied ${spell.type} to ${p.type}`);
    }
  } else {
    writeHistory(`Player ${spell.player} applied ${spell.type} to ${p.type}`);
  }

  p.spell = spell.type; //apply spell
  const spells = JSON.parse(localStorage.getItem("spells"));
  spells[`player${spell.player}`].splice(
    spells[`player${spell.player}`].indexOf(spell.type),
    1
  );
  localStorage.setItem("spells", JSON.stringify(spells));
  newRound.spells = spells;
  newRound.pieceSpells[`player${p.player}`][p.type] = spell.type;
  console.log(newRound);
  history.push(newRound);
  console.log(history);
  localStorage.setItem("gameHistory", JSON.stringify(history));
  console.log(newRound);
  p.classList.remove("goThruAnimate", "destroyAnimate", "shieldAnimate");
  p.classList.add(`${spell.type}Animate`);
  pieces.forEach((p) => {
    p.onclick = null;
    p.parentElement.classList.remove("validDest");
  }); //remove other listners
  clearInterval(Number(prevInterval)); //removing previous timer interval
  pieces.forEach((p) => p.removeEventListener("mouseenter", pieceHover));

  const gameOver = await moveBullet(dir, cannonLocation, spell.player);
  addHandlePieceSelect(spell.player === 1 ? 2 : 1, gameOver); //switching player
  console.log(gameOver);
}
