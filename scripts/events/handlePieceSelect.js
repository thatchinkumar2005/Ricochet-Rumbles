import handleMovePiece from "./handleMovePiece.js";
import handleRotate from "./handleRotate.js";
import handleSwap from "./handleSwap.js";

export default function handlePieceSelect(pieceElement) {
  const validDest = [];
  const cell = pieceElement?.parentElement;
  const row = Number(cell.getAttribute("data-row"));
  const col = Number(cell.getAttribute("data-col"));
  // const controller = new AbortController();

  //clearing previous validDest classes to remove the highlighted boxes and event handlers
  const prevDest = document.querySelectorAll(".validDest");
  prevDest.forEach((dest) => {
    dest.classList.remove("validDest"); //remove highlights
    dest.onclick = null; //remove eventHandlers
  });

  //clearing the controlls
  const controlls = document.querySelector("#controlls");
  controlls.innerHTML = "";

  if (
    pieceElement.type === "Ricochet" ||
    pieceElement.type === "SemiRicochet"
  ) {
    const controlls = document.querySelector("#controlls");

    //left Rotate btn
    const RotateLeftButton = document.createElement("div");
    RotateLeftButton.onclick = (e) => {
      handleRotate(pieceElement, "left");
      RotateLeftButton.onclick = null;
      RotateRightButton.onclick = null;
    };
    RotateLeftButton.classList.add("btn", "left");
    RotateLeftButton.innerHTML =
      "<img src='Assets/RotateLeft.png' class='btnimg'/>";
    controlls.appendChild(RotateLeftButton);

    //Right Rotate btn
    const RotateRightButton = document.createElement("div");
    RotateRightButton.onclick = (e) => {
      handleRotate(pieceElement, "right");
      RotateRightButton.onclick = null;
      RotateLeftButton.onclick = null;
    };
    RotateRightButton.classList.add("btn", "right");
    RotateRightButton.innerHTML =
      "<img src='Assets/RotateRight.png' class='btnimg'/>";
    controlls.appendChild(RotateRightButton);

    if (pieceElement.type === "Ricochet") {
      const swapButton = document.createElement("div");
      swapButton.classList.add("btn", "swap");
      swapButton.onclick = () => {
        handleSwap(pieceElement);
      };
      swapButton.innerHTML = "<img src='Assets/SwapIcon.png' class='btnimg'/>";
      controlls.appendChild(swapButton);
    }
  }

  //finding the valid dest cells for a the piece
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const target_row = pieceElement.type === "Cannon" ? row : row + i; //cannon in base position only!
      const target_col = col + j;
      if (
        target_row > 7 ||
        target_row < 0 ||
        target_col > 7 ||
        target_col < 0
      ) {
        continue;
      } else {
        const cell = document.querySelector(
          `[data-row='${target_row}'][data-col='${target_col}']`
        );
        //checking for pieces in valid dest cells and making them invalid
        if (cell?.firstElementChild?.classList.contains("piece")) {
          continue;
        } else {
          validDest.push([target_row, target_col]);
          cell.classList.add("validDest");

          //with Event Listeners instead of Event Handlers
          // cell.addEventListener(
          //   "click",
          //   (e) => {
          //     handleMovePiece(piece, e.srcElement, pieceElement.classList[1]);
          //     controller.abort();
          //     const turnCard = document.querySelector(".turnCard");
          //     turnCard.innerHTML = `Player ${player === 1 ? 2 : 1}'s turn`;
          //   },
          //   {
          //     signal: controller.signal,
          //   }
          // );

          //with event handlers
          cell.onclick = (e) => {
            const dests = document.querySelectorAll(".validDest");
            dests.forEach((c) => (c.onclick = null));
            handleMovePiece(
              pieceElement,
              e.srcElement,
              pieceElement.classList[1]
            );
            console.log(dests);
          };
        }
      }
    }
  }
  const clickAudio = document.querySelector("#click_audio");
  clickAudio.pause();
  clickAudio.currentTime = 0;
  clickAudio.play();

  //bot
  // const isBot = localStorage.getItem("bot");

  // if (pieceElement.player === 1 && isBot == 1) {
  //   setTimeout(() => {
  //     const validDests = document.querySelectorAll(".validDest");
  //     const dest =
  //       validDests[Math.round(Math.random() * (validDests.length - 1))];
  //     console.log(dest);
  //     dest.click();
  //   }, 500);
  // }
}
