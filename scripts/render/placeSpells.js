import handleSpellClick from "../events/handleSpellClick.js";

export default function placeSpells(player) {
  const spells = JSON.parse(localStorage.getItem("spells"));
  const playerSpells = spells[`player${player}`];
  const spellsDiv = document.querySelector(".spells");
  spellsDiv.innerHTML = "<h2>Spells<h2/>";
  playerSpells.forEach((s) => {
    const spell = document.createElement("div");
    spell.classList.add("spell", s);
    spell.innerHTML = `<p class="spellText">${s}<p/>`;
    spell.style.setProperty("background-image", `url('../../Assets/${s}.png')`);
    spell.style.setProperty("background-size", "cover");
    spell.style.setProperty("background-repeat", "no-repeat");
    spellsDiv.appendChild(spell);

    spell.type = s;
    spell.player = player;

    spell.addEventListener("click", handleSpellClick);
  });

  const history = JSON.parse(localStorage.getItem("gameHistory"));
  history[0].spells = JSON.parse(localStorage.getItem("spells"));
  localStorage.setItem("gameHistory", JSON.stringify(history));
}
