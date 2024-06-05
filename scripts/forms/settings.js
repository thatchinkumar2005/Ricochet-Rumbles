import { settings } from "../Globals/settings.js";

const form = document.querySelector("form");

form.elements.namedItem("time").defaultValue = 1;

const button = document.querySelector("button");
const queries = new URLSearchParams(document.location.search);
const mode = queries.get("mode");
console.log(mode);

form.elements.namedItem("spells").checked = true;
form.elements.namedItem("history").checked = true;
form.elements.namedItem("undo_redo").checked = true;
form.elements.namedItem("tankBullet").checked;

button.addEventListener("click", () => {
  localStorage.setItem(
    "settings",
    JSON.stringify({
      timerDuration: Number(form.elements.namedItem("time").value),
      spells: form.elements.namedItem("spells").checked,
      history: form.elements.namedItem("history").checked,
      undo_redo: form.elements.namedItem("undo_redo").checked,
      tankBullet: form.elements.namedItem("tankBullet").checked,
    })
  );
  if (mode == "2player") {
    document.location.replace("/twoPlayer.html");
  } else if (mode == "bot") {
    document.location.replace("/bot.html");
  }
});
