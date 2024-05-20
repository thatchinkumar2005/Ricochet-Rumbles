export default function handlePause() {
  const timer = JSON.parse(localStorage.getItem("timer"));
  const timerDisplay = document.querySelector("#timer");

  if (timer.isPaused) {
    let time = timer.pauseTime;
    console.log(time);
    const player = timer.curPlayer;
    const interval = setInterval(() => {
      time = time - 1000;
      timerDisplay.innerHTML = new Date(time).toISOString().slice(11, 19);
      if (time <= 0) {
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
  } else {
    clearInterval(timer.interval);
    let pauseTimeStr = timerDisplay.innerHTML;
    pauseTimeStr = pauseTimeStr.split(":");
    console.log(pauseTimeStr);
    let pauseTime =
      (Number(pauseTimeStr[0]) * 60 * 60 +
        Number(pauseTimeStr[1]) * 60 +
        Number(pauseTimeStr[2])) *
      1000;
    console.log(pauseTime);
    const player = timer.curPlayer;

    localStorage.setItem(
      "timer",
      JSON.stringify({
        interval: null,
        isPaused: true,
        curPlayer: player,
        pauseTime,
      })
    );
  }
}
