import moveBullet from "../render/Bullet.js";
import writeHistory from "../render/writeHistory.js";

export default async function handleCollision(piece, replay) {
  let gameOver = false,
    absorbed = false,
    ricochet = false,
    semiRicochetBroken = false,
    cont = true;

  const collisionAudio = document.querySelector("#collision_audio");
  collisionAudio.pause();
  collisionAudio.currentTime = 0;
  collisionAudio.play();

  const settings = JSON.parse(localStorage.getItem("settings"));
  const gameHistory = JSON.parse(localStorage.getItem("gameHistory"));

  if (piece.spell && settings.spells) {
    console.log(piece.spell);
    if (piece.spell === "goThru") {
      writeHistory(`Bullet went through ${piece.type}`);

      piece.spell = null;
      piece.classList.remove("goThruAnimate");
      if (!replay) {
        gameHistory[gameHistory.length - 1].pieceSpells[
          `player${piece.player}`
        ][piece.type] = null;
        localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
      }

      return { gameOver, absorbed, ricochet, semiRicochetBroken, cont };
    } else if (piece.spell === "destroy") {
      cont = false;
      writeHistory(`Bullet destroyed ${piece.type}`);
      piece.remove();
      const bullet = document.querySelector(".bullet");
      bullet.remove();
      if (!replay) {
        delete gameHistory[gameHistory.length - 1][`player${piece.player}`][
          piece.type
        ];
        delete gameHistory[gameHistory.length - 1].pieceSpells[
          `player${piece.player}`
        ][piece.type];
        localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
      }
      const semiRicochetBreakAudio = document.querySelector(
        "#semiRicochetBreakAudio"
      );
      semiRicochetBreakAudio.pause();
      semiRicochetBreakAudio.currentTime = 0;
      semiRicochetBreakAudio.play();
      piece.classList.remove("destroyAnimate");
      return { gameOver, absorbed, ricochet, semiRicochetBroken, cont };
    } else if (piece.spell === "shield") {
      absorbed = true;
      piece.spell = null;
      const bullet = document.querySelector(".bullet");
      bullet.remove();
      piece.classList.remove("shieldAnimate");
      if (!replay) {
        gameHistory[gameHistory.length - 1].pieceSpells[
          `player${piece.player}`
        ][piece.type] = null;
      }
      return { gameOver, absorbed, ricochet, semiRicochetBroken, cont };
    } else if (piece.spell === "swap") {
      cont = false;
      piece.spell = null;
      piece.classList.remove("swapAnimate");
      const bullet = document.querySelector(".bullet");
      bullet.remove();
      const playerPiece = document.querySelector(
        `.player${piece.player}.${piece.type}`
      );
      const otherPiece = document.querySelector(
        `.player${piece.player === 1 ? 2 : 1}.${piece.type}`
      );
      const playerCell = playerPiece.parentElement;
      const otherCell = otherPiece.parentElement;
      playerPiece.remove();
      otherPiece.remove();
      playerCell.appendChild(otherPiece);
      otherCell.appendChild(playerPiece);

      //history
      if (!replay) {
        gameHistory[gameHistory.length - 1].pieceSpells[
          `player${piece.player}`
        ][piece.type] = null;

        if (piece.type === "Ricochet" || piece.type === "SemiRicochet") {
          gameHistory[gameHistory.length - 1][`player${playerPiece.player}`][
            playerPiece.type
          ].location = [
            Number(otherCell.getAttribute("data-row")),
            Number(otherCell.getAttribute("data-col")),
          ];
          gameHistory[gameHistory.length - 1][`player${otherPiece.player}`][
            otherPiece.type
          ].location = [
            Number(playerCell.getAttribute("data-row")),
            Number(playerCell.getAttribute("data-col")),
          ];
        } else {
          gameHistory[gameHistory.length - 1][`player${playerPiece.player}`][
            playerPiece.type
          ] = [
            Number(otherCell.getAttribute("data-row")),
            Number(otherCell.getAttribute("data-col")),
          ];
          gameHistory[gameHistory.length - 1][`player${otherPiece.player}`][
            otherPiece.type
          ] = [
            Number(playerCell.getAttribute("data-row")),
            Number(playerCell.getAttribute("data-col")),
          ];
        }
      }
      localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
      return { gameOver, absorbed, ricochet, semiRicochetBroken, cont };
    }
  }
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
    return { gameOver, absorbed, ricochet, semiRicochetBroken, cont };
  } else if (type === "Titan") {
    const bullet = document.querySelector(".bullet");
    gameOver = bullet.player !== piece.player;
    console.log(gameOver);
    bullet.remove();
    return { gameOver, absorbed, ricochet, semiRicochetBroken, cont };
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
          if (!replay) {
            const gameHistory = JSON.parse(localStorage.getItem("gameHistory"));
            delete gameHistory[gameHistory.length - 1][`player${piece.player}`][
              "SemiRicochet"
            ];
            if (settings.spells) {
              delete gameHistory[gameHistory.length - 1].pieceSpells[
                `player${piece.player}`
              ]["SemiRicochet"];
            }
            localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
          }
          return { gameOver, absorbed, ricochet, semiRicochetBroken, cont };
      }

      gameOver = await moveBullet(dir, srcLocation, bullet.player); //recursive call
    }
  }
  return { gameOver, absorbed, ricochet, semiRicochetBroken, cont };
}
