import moveBullet from "../render/Bullet.js";

export default async function handleCollision(piece) {
  let gameOver = false,
    absorbed = false,
    ricochet = false,
    semiRicochetBroken = false;
  let prevDir;
  console.log(piece);
  const Absorb = ["Tank", "Cannon"];
  const type = piece.type;
  const collisionAudio = document.querySelector("#collision_audio");
  collisionAudio.pause();
  collisionAudio.currentTime = 0;
  collisionAudio.play();
  console.log(Absorb.includes(type));
  if (Absorb.includes(type)) {
    absorbed = true;
    console.log("Absorbed");
    const bullet = document.querySelector(".bullet");
    bullet.remove();
    return { gameOver, absorbed, ricochet, semiRicochetBroken };
  } else if (type === "Titan") {
    const bullet = document.querySelector(".bullet");
    gameOver = bullet.player !== piece.player;
    console.log(gameOver);
    bullet.remove();
    return { gameOver, absorbed, ricochet, semiRicochetBroken };
  } else {
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
      gameOver = await moveBullet(dir, srcLocation, bullet.player); //recursive call
    } else if (type === "SemiRicochet") {
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
      console.log(orientation);
      const index = orientation.indexOf(prevDir);
      let dir;
      console.log(index);
      switch (index) {
        case 0:
          dir = orientation[2];
          break;
        case 1:
          dir = orientation[3];
          break;
        default:
          ricochet = false;
          semiRicochetBroken = true;
          console.log("Semiricochet broken");
          piece.remove();
          const semiRicochetBreakAudio = document.querySelector(
            "#semiRicochetBreakAudio"
          );
          semiRicochetBreakAudio.pause();
          semiRicochetBreakAudio.currentTime = 0;
          semiRicochetBreakAudio.play();
          return { gameOver, absorbed, ricochet, semiRicochetBroken };
      }

      gameOver = await moveBullet(dir, srcLocation, bullet.player); //recursive call
    }
  }
  return { gameOver, absorbed, ricochet, semiRicochetBroken };
}
