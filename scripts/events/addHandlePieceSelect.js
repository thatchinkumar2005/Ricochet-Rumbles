import { pieces as Pieces } from "../Globals/players.js";
import bot from "../bot/bot.js";
import placeSpells from "../render/placeSpells.js";
import writeHistory from "../render/writeHistory.js";
import handleDos from "./handleDos.js";
import handlePause from "./handlePause.js";
import handlePieceSelect from "./handlePieceSelect.js";
import handleSpellClick from "./handleSpellClick.js";
import pieceHover from "./pieceHover.js";

export default function addHandlePieceSelect(
  player,
  gameOver,
  timeUp = false,
  setTimer = true
) {
  const settings = JSON.parse(localStorage.getItem("settings"));
  console.log(settings);
  const isBot = localStorage.getItem("bot");

  const playerPieces = document.querySelectorAll(`.piece.player${player}`);
  const otherPieces = document.querySelectorAll(
    `.piece.player${player === 1 ? 2 : 1}`
  );
  const pieces = document.querySelectorAll(".piece");
  const pause = document.querySelector("#pause");

  if (settings.undo_redo) {
    const undoButton = document.querySelector("#undo");
    undoButton.onclick = () => {
      handleDos("undo");
    };

    const redoButton = document.querySelector("#redo");
    redoButton.onclick = () => {
      handleDos("redo");
    };
  }

  pieces.forEach((p) => {
    p.onclick = null;
    p.classList.remove("turn");
    p.removeEventListener("mouseenter", pieceHover);
  });

  const prevDests = document.querySelectorAll(".validDest");
  prevDests.forEach((p) => {
    p.classList.remove("validDest");
    p.onclick = null;
  });

  if (!gameOver) {
    //timer
    if (setTimer) {
      let time = settings.timerDuration * 60000;
      console.log(time);
      const timer = document.querySelector("#timer");
      const interval = setInterval(() => {
        time = time - 1000;
        timer.innerHTML = new Date(time).toISOString().slice(11, 19);
        if (time <= 0) {
          timeUp = true;
          console.log(timeUp);
          clearInterval(interval);
          console.log(interval);
          addHandlePieceSelect(player === 1 ? 2 : 1, true, true);
        }
      }, 1000);
      localStorage.setItem(
        "timer",
        JSON.stringify({
          interval,
          isPaused: false,
          curPlayer: player,
          pauseTime: 0,
        })
      );
    }

    //turn Card
    if (isBot == 1) {
      const turnCard = document.querySelector(".turnCard");
      turnCard.innerHTML = `${player == 1 ? "Bot's" : "Player's"} turn`;
    } else {
      const turnCard = document.querySelector(".turnCard");
      turnCard.innerHTML = `Player ${player}'s turn`;
    }

    //events
    pause.addEventListener("click", handlePause);
    playerPieces.forEach((p) => {
      p.onclick = (e) => {
        handlePieceSelect(e.srcElement);
      };
      p.addEventListener("mouseenter", pieceHover); //audio on hover event
      p.classList.add("turn");
    });
    if (settings.spells) {
      placeSpells(player);
    }
  } else {
    const turnCard = document.querySelector(".turnCard");
    const pauseButton = document.querySelector("#pause");
    const dests = document.querySelectorAll(".validDest");
    const controlls = document.querySelector("#controlls");

    const spells = document.querySelectorAll(".spell");
    spells.forEach((s) => s.removeEventListener("click", handleSpellClick));

    const gameOverAudio = document.querySelector("#gameover_audio");
    gameOverAudio.pause();
    gameOverAudio.currentTime = 0;
    gameOverAudio.play();
    alert("gameOver");
    if (timeUp) {
      console.log("hello");
      if (isBot == 1) {
        if (player == 2) {
          writeHistory(`Bot Lost by losing Time`);
          turnCard.innerHTML = `Bot Lost`;
        } else {
          writeHistory(`Player Lost by losing Time`);
          turnCard.innerHTML = `Player Lost`;
        }
      } else {
        writeHistory(`Player ${player === 1 ? 2 : 1} Lost by losing Time`);
        turnCard.innerHTML = `Player ${player === 1 ? 2 : 1} Lost`;
      }
    } else {
      if (isBot == 1) {
        if (player == 1) {
          writeHistory(`Bot Lost. Titan took a hit.`);
          turnCard.innerHTML = `Bot Lost.`;
        } else {
          writeHistory(`Player Lost. Titan took a hit.`);
          turnCard.innerHTML = `Player Lost.`;
        }
      } else {
        writeHistory(`Player ${player} Lost. Titan took a hit.`);
        turnCard.innerHTML = `Player ${player} Lost.`;
      }
    }
    pieces.forEach((p) => {
      p.onclick = null;
      p.classList.remove(
        "turn",
        "goThruAnimate",
        "destroyAnimate",
        "swapAnimate",
        "shieldAnimate"
      );
    });
    pauseButton.removeEventListener("click", handlePause);
    pieces.forEach((p) => {
      p.removeEventListener("mouseenter", pieceHover);
    });
    const restart = document.querySelector("#restartGameOver");
    restart.innerHTML = "Restart";
    restart.classList.add("restart");
    restart.onclick = () => {
      document.location.reload();
    };
    const replay = document.querySelector("#replayGameOver");
    replay.innerHTML = "Replay";
    replay.classList.add("restart");
    replay.onclick = () => {
      document.location.replace("/replay.html");
    };
    if (dests) {
      console.log(dests);
      Array.from(dests).forEach((d) => {
        d.onclick = null;
        d.classList.remove("validDest");
      });
    }
    controlls.innerHTML = "";
  }

  //bot
  if (player === 1 && isBot == 1) {
    console.log("hello");
    let randomPiece = Pieces[Math.round(Math.random() * (Pieces.length - 1))];
    console.log(randomPiece);
    let piece = document.querySelector(`.player1.${randomPiece}`);
    if (!piece) {
      let randomPiece;
      randomPiece = Pieces.splice(Pieces.indexOf(randomPiece), 1)[
        Math.round(Math.random() * (Pieces.length - 1))
      ];
      let piece = document.querySelector(`.player1.${randomPiece}`);
    }
    piece.click();
    pieces.forEach((p) => (p.onclick = null));
  }
}
