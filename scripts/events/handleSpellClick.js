import handleApplySpell from "./handleApplySpell.js";
import handlePause from "./handlePause.js";
import pieceHover from "./pieceHover.js";

export default async function handleSpellClick(e) {
  const spell = e.srcElement;
  if (!spell.type) return;

  const pause = document.querySelector("#pause");
  pause.removeEventListener("click", handlePause);
  let pieces;

  const prevDests = document.querySelectorAll(".validDest");
  prevDests.forEach((d) => {
    console.log(d);
    d.classList.remove("validDest");
    d.onclick = null;
  });

  pieces = document.querySelectorAll(".piece");
  pieces.forEach((p) => {
    p.onclick = null;
    p.removeEventListener("mouseenter", pieceHover);
    p.addEventListener("mouseenter", pieceHover);
  });

  const clickAudio = document.querySelector("#click_audio");
  clickAudio.pause();
  clickAudio.currentTime = 0;
  clickAudio.play();

  switch (spell.type) {
    case "goThru":
      pieces = document.querySelectorAll(".piece");
      console.log("gothru");
      pieces.forEach((p) => {
        p.parentElement.classList.add("validDest");
        p.onclick = (e) => {
          handleApplySpell(p, spell);
        };
      });

      break;

    case "destroy":
      pieces = document.querySelectorAll(".piece");
      console.log("destroy");
      pieces.forEach((p) => {
        if (p.type === "Titan" || p.type === "Cannon") return;
        p.parentElement.classList.add("validDest");
        p.onclick = (e) => {
          handleApplySpell(p, spell);
        };
      });
      break;

    case "shield":
      pieces = document.querySelectorAll(".piece");
      console.log("shield");
      pieces.forEach((p) => {
        p.parentElement.classList.add("validDest");
        p.onclick = (e) => {
          handleApplySpell(p, spell);
        };
      });

      break;
    case "swap":
      pieces = document.querySelectorAll(".piece");
      console.log("shield");
      pieces.forEach((p) => {
        if (p.type === "Cannon") return;
        p.parentElement.classList.add("validDest");
        p.onclick = (e) => {
          handleApplySpell(p, spell);
        };
      });
      break;
  }
}
