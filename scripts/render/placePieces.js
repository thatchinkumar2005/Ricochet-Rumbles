import addHandlePieceSelect from "../events/addHandlePieceSelect.js";
import handlePieceSelect from "../events/handlePieceSelect.js";

export default function placePieces(players) {
  const piecesLocations = {
    player1: {},
    player2: {},
  };
  function getCoordinates(initial_row, final_row) {
    const locations = [];

    while (locations.length < 5) {
      const row = Math.floor(
        Math.random() * (final_row - initial_row) + initial_row
      );
      const col = Math.floor(Math.random() * 8);
      const location = [row, col];
      const location_string = locations.map((location) => String(location));
      if (location_string.indexOf(String(location)) === -1) {
        locations.push(location);
      }
    }
    return locations;
  }

  const player1Pieces = players[0].pieces;
  const player1Locations = getCoordinates(0, 3);
  for (let i = 0; i < 5; i++) {
    const cell = document.querySelector(
      `[data-row='${player1Locations[i][0]}'][data-col='${player1Locations[i][1]}']`
    );
    const piece = document.createElement("div");
    piece.type = player1Pieces[i];
    piece.classList.add("piece", "player1", player1Pieces[i]);
    piece.player = 1;
    cell.appendChild(piece);
    Object.defineProperty(piecesLocations.player1, player1Pieces[i], {
      value: player1Locations[i],
      enumerable: true,
      writable: true,
    });
  }

  const player2Pieces = players[1].pieces;
  const player2Locations = getCoordinates(5, 7);
  for (let i = 0; i < 5; i++) {
    const cell = document.querySelector(
      `[data-row='${player2Locations[i][0]}'][data-col='${player2Locations[i][1]}']`
    );
    const piece = document.createElement("div");
    piece.type = player1Pieces[i];
    piece.player = 2;
    piece.classList.add("piece", "player2", player2Pieces[i]);
    cell.appendChild(piece);
    Object.defineProperty(piecesLocations.player2, player2Pieces[i], {
      value: player2Locations[i],
      enumerable: true,
      writable: true,
    });
  }
  const gameHistory = [];
  gameHistory.push(piecesLocations);
  console.log(gameHistory);
  localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
}
