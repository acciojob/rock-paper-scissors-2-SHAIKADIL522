//your code here
const CHOICES = ["ROCK", "PAPER", "SCISSORS"];
const RESULTS = ["TIE", "WON", "LOSE"]; // index = (user - computer + 3) % 3

const $ = (name) => document.querySelector(`[data-ns-test="${name}"]`);

const input = $("game-number");
const computerEl = $("computer-choose");
const roundEl = $("round-result");
const leftEl = $("rounds-left");
const userEl = $("user-points");
const compEl = $("computer-points");
const gameEl = $("game-result");

let roundsLeft = 0;
let userPoints = 0;
let computerPoints = 0;
let playing = false;

function render() {
  leftEl.textContent = roundsLeft;
  userEl.textContent = userPoints;
  compEl.textContent = computerPoints;
}

function resetGame() {
  roundsLeft = 0;
  userPoints = 0;
  computerPoints = 0;
  playing = false;
  computerEl.textContent = "";
  roundEl.textContent = "";
  gameEl.textContent = "";
  render();
}

function startGame() {
  resetGame();                         // reset FIRST, always
  const n = parseInt(input.value, 10);
  if (!Number.isInteger(n) || n < 1) return;
  roundsLeft = n;
  playing = true;
  render();
}

resetGame();                           // initial values set by JS on load

function playRound(userChoice) {
  if (!playing) return;

  window.computerChoose = Math.floor(Math.random() * 3);
  const computerChoice = window.computerChoose;

  const result = RESULTS[(userChoice - computerChoice + 3) % 3];
  if (result === "WON") userPoints++;
  else if (result === "LOSE") computerPoints++;

  roundsLeft--;
  computerEl.textContent = CHOICES[computerChoice];
  roundEl.textContent = result;
  render();

  if (roundsLeft === 0) {
    playing = false;
    gameEl.textContent =
      userPoints > computerPoints ? "WON" :
      userPoints < computerPoints ? "LOSE" : "TIE";
  }
}

$("play-game").addEventListener("click", startGame);
$("rock").addEventListener("click", () => playRound(0));
$("paper").addEventListener("click", () => playRound(1));
$("scissors").addEventListener("click", () => playRound(2));