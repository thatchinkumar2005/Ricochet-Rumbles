import handleCollision from "./handleCollision.js";

export default async function moveBullet(gameOver, player) {
  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
  let absorbed = false;
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  if (player == 1) bullet.classList.add("revolve");

  const Cannon = document.querySelector(`.piece.Cannon.player${player}`);
  const Cannon_Cell = Cannon.parentElement;
  let initialLocation = [
    Number(Cannon_Cell.getAttribute("data-row")),
    Number(Cannon_Cell.getAttribute("data-col")),
  ];
  if (player === 1) initialLocation[0]++;
  if (player === 2) initialLocation[0]--;

  const initialCell = document.querySelector(
    `[data-row='${initialLocation[0]}'][data-col='${initialLocation[1]}']`
  );
  console.log(initialCell);
  initialCell.appendChild(bullet);

  let currentLocation = initialLocation;

  while (!gameOver && !absorbed) {
    await sleep(250);
    player === 1 ? currentLocation[0]++ : currentLocation[0]--;
    if (currentLocation[0] > 7 || currentLocation[0] < 0) {
      break;
    }
    const newCell = document.querySelector(
      `[data-row='${currentLocation[0]}'][data-col='${currentLocation[1]}']`
    );

    newCell.appendChild(bullet);
    if (newCell.firstElementChild?.classList.contains("piece")) {
      let data = handleCollision(newCell.firstChild);
      gameOver = data.gameOver;
      absorbed = data.absorbed;
    }
    if (currentLocation[0] == 7 || currentLocation[0] == 0) {
      await sleep(250);
      console.log(true);
      const bullet = document.querySelector(".bullet");
      newCell.removeChild(bullet);
    }
    await sleep(125);
  }
}
