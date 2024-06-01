export default function writeHistory(msg) {
  const div = document.createElement("div");
  div.classList.add("msg");
  div.innerHTML = msg;
  const history = document.querySelector(".history");
  if (!history) return;
  history.appendChild(div);
}
