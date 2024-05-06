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
    case 1:
      console.log("no orientation change");
    case 2:
      bullet.classList.add("bullet_right");
    case 3:
      bullet.classList.add("bullet_left");
  }

  const path = dir === 0 || dir === 1 ? 0 : 1; //path : either row(0) or column(1)
  const pathAction = dir % 2 === 0 ? "add" : "sub";

  const initialLocation = [];
  if (pathAction === "add") {
    initialLocation[path] = srcLocation[path]++;
  }
  if (pathAction === "sub") {
    initialLocation[path] = srcLocation[path]--;
  }

  const initialCell = document.querySelector(
    `[data-row='${initialLocation[0]}'][data-col='${initialLocation[1]}']`
  );
  console.log(initialCell);
  initialCell.appendChild(bullet);

  let currentLocation = initialLocation;

  // while (!gameOver && !absorbed) {
  //   await sleep(250);
  //   player === 1 ? currentLocation[0]++ : currentLocation[0]--;
  //   if (currentLocation[0] > 7 || currentLocation[0] < 0) {
  //     break;
  //   }
  //   const newCell = document.querySelector(
  //     `[data-row='${currentLocation[0]}'][data-col='${currentLocation[1]}']`
  //   );

  //   newCell.appendChild(bullet);
  //   if (newCell.firstElementChild?.classList.contains("piece")) {
  //     let data = handleCollision(newCell.firstChild);
  //     gameOver = data.gameOver;
  //     absorbed = data.absorbed;
  //   }
  //   if (currentLocation[0] == 7 || currentLocation[0] == 0) {
  //     await sleep(250);
  //     console.log(true);
  //     const bullet = document.querySelector(".bullet");
  //     newCell.removeChild(bullet);
  //   }
  //   await sleep(125);
  // }

  // if (gameOver) {
  //   alert("GameOver");
  // }
}
