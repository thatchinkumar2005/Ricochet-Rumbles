import { settings } from "../Globals/settings.js";

const form = document.querySelector("form");

form.elements.namedItem("time").defaultValue = 1;
form.elements.namedItem("speed").defaultValue = 5;

const button = document.querySelector("button");
const queries = new URLSearchParams(document.location.search);
const mode = queries.mode;

button.addEventListener("click", () => {
  localStorage.setItem(
    "settings",
    JSON.stringify({
      timeDuration: Number(form.elements.namedItem("time").value),
      bulletSpeed: 750 / form.elements.namedItem("time").value,
      spells: form.elements.namedItem("spells").checked,
      history: form.elements.namedItem("history").checked,
    })
  );
  document.location.replace(
    `${mode === "2player" ? "/twoPlayer.html" : "/bot.html"}`
  );
});
