export default function placeCells() {
  const board = document.querySelector("#board");
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.classList.add("cell");
      board.appendChild(cell);
    }
  }
}
