import moveBullet from "../render/Bullet.js";
import addHandlePieceSelect from "./addHandlePieceSelect.js";
import handlePause from "./handlePause.js";

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
  clearInterval(Number(prevInterval)); //removing previous timer interval

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
  pieces.forEach((p) => (p.onclick = null));

  switch (spell.type) {
    case "goThru":
      pieces = document.querySelectorAll(".piece");
      console.log("gothru");
      pieces.forEach((p) => {
        p.parentElement.classList.add("validDest");
        p.onclick = async () => {
          p.spell = spell.type;
          pieces.forEach((p) => {
            p.onclick = null;
            p.parentElement.classList.remove("validDest");
          });
          gameOver = await moveBullet(dir, cannonLocation, spell.player);
          addHandlePieceSelect(spell.player === 1 ? 2 : 1, gameOver);
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
      break;
    case "destroy":
      pieces = document.querySelectorAll(".piece");
      console.log("destroy");
      pieces.forEach((p) => {
        if (p.type === "Titan" || p.type === "Cannon") return;
        p.parentElement.classList.add("validDest");
        p.onclick = async () => {
          p.spell = spell.type;
          pieces.forEach((p) => {
            p.onclick = null;
            p.parentElement.classList.remove("validDest");
          });
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
      break;
    case "shield":
      pieces = document.querySelectorAll(".piece");
      console.log("shield");
      pieces.forEach((p) => {
        p.parentElement.classList.add("validDest");
        p.onclick = async () => {
          p.spell = spell.type;
          pieces.forEach((p) => {
            p.onclick = null;
            p.parentElement.classList.remove("validDest");
          });
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
      break;
  }
  const history = JSON.parse(localStorage.getItem("gameHistory"));
  const prevRound = history[history.length - 1];
  const newRound = structuredClone(prevRound);
  newRound.spells = spells;
  console.log(newRound);
  history.push(newRound);
  console.log(history);
  localStorage.setItem("gameHistory", JSON.stringify(history));
}
