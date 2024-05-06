export default function handleCollision(piece) {
  let gameOver, absorbed;
  console.log(piece);
  const Absorb = ["Tank", "Ricochet", "SemiRicochet", "Cannon"];
  const type = piece.type;
  console.log(Absorb.includes(type));
  if (Absorb.includes(type)) {
    absorbed = true;
    console.log("Absorbed");
    const cell = piece.parentElement;
    const bullet = document.querySelector(".bullet");
    cell.removeChild(bullet);
  } else {
    gameOver = true;
    console.log("GameOVer");
    const cell = piece.parentElement;
    const bullet = document.querySelector(".bullet");
    cell.removeChild(bullet);
  }
  return { gameOver, absorbed };
}
