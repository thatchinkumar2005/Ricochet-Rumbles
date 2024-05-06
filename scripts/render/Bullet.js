import handleCollision from "./handleCollision.js";

export default async function moveBullet(gameOver, dir, srcLocation) {
  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
  let absorbed = false;
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  switch (dir) {
    case 0:
      bullet.classList.add("bullet_top");
      bullet.dir_ = 0;
      break;
    case 1:
      console.log("no orientation change");
      bullet.dir_ = 1;
      break;
    case 2:
      bullet.classList.add("bullet_right");
      bullet.dir_ = 2;
      break;
    case 3:
      bullet.classList.add("bullet_left");
      bullet.dir_ = 3;
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
  initialCell.appendChild(bullet);

  let currentLocation = initialLocation;
  let outOfBound = currentLocation[path] > 7 || currentLocation[path] < 0;
  let ricochet = false;

  while (!gameOver && !absorbed && !outOfBound && !ricochet) {
    await sleep(250);
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
      let data = handleCollision(newCell.firstChild);
      gameOver = data.gameOver;
      absorbed = data.absorbed;
      ricochet = data.ricochet;
    }
    if (currentLocation[path] == 7 || currentLocation[path] == 0) {
      await sleep(250);
      console.log(true);
      const bullet = document.querySelector(".bullet");
      if (bullet) bullet.remove();
    }
    await sleep(125);
  }
}