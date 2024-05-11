export default function Timer(player) {
  let time = settings.timerDuration;
  const timer = document.querySelector("#timer");
  const interval = setInterval(() => {
    time = time - 1000;
    timer.innerHTML = new Date(time).toISOString().slice(11, 19);
    if (time === 0) {
      const timer = addHandlePieceSelect(player === 1 ? 2 : 1, true);
      clearInterval(interval);
    }
  }, 1000);
  return interval;
}
