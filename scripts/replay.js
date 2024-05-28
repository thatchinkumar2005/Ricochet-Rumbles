import { pieces } from "./Globals/players.js";
import moveBullet from "./render/Bullet.js";
import placeCells from "./render/placeCells.js";
const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

function handleReplay() {
  document.location.reload();
}

const replayButton = document.querySelector("#restart");
replayButton.onclick = handleReplay;

async function replay() {
  const history = JSON.parse(localStorage.getItem("gameHistory"));
  placeCells();
  let gameOver = false;
  let index = 0;
  const turnCard = document.querySelector(".turnCard");
  while (!gameOver) {
    await sleep(800);
    let player = index % 2 === 0 ? 2 : 1;
    turnCard.innerHTML = `Player ${player}'s turn`;
    const pos = Array.from(history)[index];
    const previousPieces = document.querySelectorAll(".piece");
    console.log(previousPieces);
    if (previousPieces) Array.from(previousPieces).forEach((p) => p.remove());
    for (let i = 0; i < 2; i++) {
      const player = structuredClone(pos[`player${i + 1}`]);
      console.log(pieces);
      pieces.forEach((p) => {
        if (player.hasOwnProperty(p)) {
          const piece = document.createElement("div");
          piece.player = i + 1;
          piece.type = p;
          piece.classList.add("piece", `player${i + 1}`, p);
          if (p === "SemiRicochet" || p === "Ricochet") {
            const cell = document.querySelector(
              `[data-row = '${player[p].location[0]}'][data-col = '${player[p].location[1]}']`
            );
            piece.orientation = player[p].orientation;
            cell.appendChild(piece);
          } else {
            const cell = document.querySelector(
              `[data-row = '${player[p][0]}'][data-col = '${player[p][1]}']`
            );
            cell.appendChild(piece);
          }
        }
      });
    }
    const Cannon = document.querySelector(`.piece.Cannon.player${player}`);
    const Cannon_Cell = Cannon.parentElement;
    let cannonLocation = [
      Number(Cannon_Cell.getAttribute("data-row")),
      Number(Cannon_Cell.getAttribute("data-col")),
    ];
    const dir = player === 1 ? 0 : 1;
    console.log(cannonLocation);
    console.log(dir);
    await sleep(250);
    if (index !== 0) gameOver = await moveBullet(dir, cannonLocation, player);
    index++;
    if (gameOver) {
      alert("GameOver");
      const replay = document.querySelector("#newGame");
      replay.innerHTML = "New Game";
      replay.classList.add("restart");
      replay.onclick = () => {
        document.location.replace("http://127.0.0.1:5500/index.html");
      };
    }
  }
}

replay();
