import handlePieceSelect from "./handlePieceSelect.js";

export default function addHandlePieceSelect(player) {
  const playerPieces = document.querySelectorAll(`.piece.player${player}`);
  const controller = new AbortController();
  const otherPieces = document.querySelectorAll(
    `.piece.player${player === 1 ? 2 : 1}`
  );
  playerPieces.forEach((p) =>
    p.addEventListener(
      "click",
      (e) => {
        handlePieceSelect(e.srcElement, player);
        controller.abort();
      },
      {
        once: true,
        signal: controller.signal,
      }
    )
  );
  return controller;
}
