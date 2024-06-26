import { settings } from "../Globals/settings.js";
import handleCollision from "../events/handleCollision.js";

export default async function moveBullet(
  dir,
  srcLocation,
  player,
  replay = false
) {
  let ricochet = false;
  let absorbed = false;
  let gameOver = false;
  let semiRicochetBroken = false;
  let cont = true;
  let { bulletSpeed } = JSON.parse(localStorage.getItem("settings"));
  bulletSpeed = Number(bulletSpeed);

  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
  const bullet = document.createElement("div");
  bullet.player = player;
  bullet.classList.add("bullet");
  bullet.dir_ = dir;
  switch (dir) {
    case 0:
      bullet.classList.add("bullet_top");
      break;
    case 1:
      console.log("no orientation change");
      break;
    case 2:
      bullet.classList.add("bullet_right");
      break;
    case 3:
      bullet.classList.add("bullet_left");
      break;
  }

  const path = dir === 0 || dir === 1 ? 0 : 1; //path : either row(0) or column(1)
  const pathAction = dir % 2 === 0 ? "add" : "sub";
  console.log(srcLocation);

  const initialLocation = [];
  if (pathAction === "add") {
    console.log("happened");
    initialLocation[path] = srcLocation[path] + 1;
    initialLocation[path === 0 ? 1 : 0] = srcLocation[path === 0 ? 1 : 0];
  }
  if (pathAction === "sub") {
    initialLocation[path] = srcLocation[path] - 1;
    initialLocation[path === 0 ? 1 : 0] = srcLocation[path === 0 ? 1 : 0];
  }
  console.log(initialLocation);

  const initialCell = document.querySelector(
    `[data-row='${initialLocation[0]}'][data-col='${initialLocation[1]}']`
  );
  console.log(initialCell);
  if (initialCell) {
    initialCell.appendChild(bullet);
    if (initialCell.firstElementChild?.classList.contains("piece")) {
      let data = await handleCollision(initialCell.firstChild);
      gameOver = data.gameOver;
      absorbed = data.absorbed;
      ricochet = data.ricochet;
    }
  }

  let currentLocation = initialLocation;
  if (currentLocation[path] == 7 || currentLocation[path] == 0) {
    await sleep(bulletSpeed);
    const bullet = document.querySelector(".bullet");
    if (bullet) bullet.remove();
  }

  while (!gameOver && !absorbed && !ricochet && !semiRicochetBroken && cont) {
    //loop to move the bullet
    await sleep(bulletSpeed);
    // player === 1 ? currentLocation[0]++ : currentLocation[0]--;
    if (pathAction === "add") {
      currentLocation[path]++;
    } else if (pathAction === "sub") {
      currentLocation[path]--;
    }
    if (currentLocation[path] > 7 || currentLocation[path] < 0) {
      break;
    }
    const newCell = document.querySelector(
      `[data-row='${currentLocation[0]}'][data-col='${currentLocation[1]}']`
    );
    newCell.appendChild(bullet);
    if (newCell.firstElementChild?.classList.contains("piece")) {
      let data = await handleCollision(newCell.firstChild, replay);
      gameOver = data.gameOver;
      absorbed = data.absorbed;
      ricochet = data.ricochet;
      semiRicochetBroken = data.semiRicochetBroken;
      cont = data.cont;
      console.log(data);
    }
    if (currentLocation[path] == 7 || currentLocation[path] == 0) {
      await sleep(bulletSpeed);
      console.log(true);
      const bullet = document.querySelector(".bullet");
      if (bullet) bullet.remove();
    }
    await sleep(bulletSpeed / 2);
  }
  return gameOver;
}
