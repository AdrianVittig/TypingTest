const wordsContainer = document.querySelector(".text-container");
const wordsEl = document.getElementById("words-area");
const timerEl = document.getElementById("timer");
const typingInput = document.getElementById("userTextInput");
const words = [
  "function",
  "seat",
  "satisfied",
  "injection",
  "host",
  "urgency",
  "detective",
  "quality",
  "even",
  "whip",
  "layer",
  "country",
  "accessible",
  "camera",
  "angle",
  "folk",
  "cheese",
  "welcome"
];

let seconds = 60;
let minutes = 0;

let totalWords;

let percentageAccuracy;

let wordsPerMinute = totalWords / seconds;

let correctWords = 0;
let mistakenWords = 0;
const pickedWords = [];
function wordsPickerForGame(wordCount) {
  const availableWords = [...words];

  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    pickedWords.push(words[randomIndex]);
  }

  return pickedWords.join(" ");
}

function updateTimer() {
  seconds--;
  timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  if (seconds == 0) {
    clearInterval(timer);
  }
}

const timer = setInterval(updateTimer, 1000);

function startGame() {
  updateTimer();
  const randomWords = wordsPickerForGame(10);
  wordsEl.textContent = randomWords;
}

let currentWordIndex = 0;

typingInput.addEventListener("input", function () {
  if (typingInput.value === pickedWords[currentWordIndex]) {
    correctWords++;
    typingInput.value = "";
    currentWordIndex++;
    console.log(correctWords);
  }
});

startGame();
