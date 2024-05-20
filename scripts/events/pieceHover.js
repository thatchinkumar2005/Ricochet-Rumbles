export default function pieceHover() {
  const hoverAudio = document.querySelector("#hover_audio");
  hoverAudio.pause();
  hoverAudio.currentTime = 0;
  hoverAudio.play();
  console.log("hover");
}
