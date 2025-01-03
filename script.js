const wordsContainer = document.querySelector(".text-container");
const wordsEl = document.getElementById("words-area");
const timerEl = document.getElementById("timer");
const typingInput = document.getElementById("userTextInput");
const correctWordsHTML = document.getElementById("correct-words");
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
    stopGame();
  }
}

function stopGame() {
  alert(`Game over! Words per minute: ${correctWords}`);
  typingInput.disabled = true;
}

const timer = setInterval(updateTimer, 1000);

function startGame() {
  updateTimer();
  const randomWords = wordsPickerForGame(5);
  randomWords.split(" ").forEach((word) => {
    const wordSpan = document.createElement("span");
    wordSpan.textContent = word;
    wordSpan.style.marginRight = "10px";
    wordsEl.appendChild(wordSpan);
  });
}

typingInput.addEventListener("input", function () {
  const currentWord = pickedWords[0];
  if (currentWord.startsWith(typingInput.value)) {
    wordsEl.children[0].style.color = "green";
  } else {
    wordsEl.children[0].style.color = "red";
  }
});

typingInput.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();
    const currentWord = pickedWords[0];

    if (typingInput.value === currentWord) {
      correctWords++;
      correctWordsHTML.textContent = `Correct Words: ${correctWords}`;
      wordsEl.children[0].style.color = "";
    } else {
      mistakenWords++;
      wordsEl.children[0].style.color = "";
    }

    if (wordsEl.children[0]) {
      wordsEl.children[0].remove();
      pickedWords.shift();
    }
    typingInput.value = "";

    if (pickedWords.length === 0) {
      stopGame();
      clearInterval(timer);
    }
  }
});

startGame();
