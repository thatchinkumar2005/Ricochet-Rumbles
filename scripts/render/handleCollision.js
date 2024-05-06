import moveBullet from "./Bullet.js";

export default function handleCollision(piece) {
  let gameOver, absorbed, ricochet;
  let prevDir;
  console.log(piece);
  const Absorb = ["Tank", "Cannon"];
  const type = piece.type;
  console.log(Absorb.includes(type));
  if (Absorb.includes(type)) {
    absorbed = true;
    console.log("Absorbed");
    const bullet = document.querySelector(".bullet");
    bullet.remove();
  } else if (type === "Titan") {
    gameOver = true;
    console.log("GameOVer");
    const cell = piece.parentElement;
    const bullet = document.querySelector(".bullet");
    cell.removeChild(bullet);
  }

  if (type === "Ricochet") {
    ricochet = true;
    const bullet = document.querySelector(".bullet");
    prevDir = bullet.dir_;
    bullet.remove();
    const cell = piece.parentElement;
    const srcLocation = [
      Number(cell.getAttribute("data-row")),
      Number(cell.getAttribute("data-col")),
    ];
    let orientation = piece.orientation;
    orientation = Array.from(orientation);
    orientation = orientation.map((i) => Number(i));
    const index = orientation.indexOf(prevDir);
    console.log(index);
    let dir;
    switch (index) {
      case 0:
        dir = orientation[2];
        break;
      case 1:
        dir = orientation[3];
        break;
      case 2:
        dir = orientation[0];
        break;
      case 3:
        dir = orientation[1];
    }
    moveBullet(gameOver, dir, srcLocation);
  }

  return { gameOver, absorbed, ricochet };
}