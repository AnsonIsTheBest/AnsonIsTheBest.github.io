let currentId = null;
let timer = null;
let timeLeft = 0;
let mode = null; // "timed" or "free"
let score = 0;
let allowInput = false;
let startTime = 0;

function getRandomPokemonId() {
  const keys = Object.keys(POKEMON_DATA);
  const index = Math.floor(Math.random() * keys.length);
  return keys[index];
}

function loadNew() {
  if (!allowInput) return;
  document.getElementById("result").textContent = "";
  document.getElementById("guess").value = "";

  currentId = getRandomPokemonId();
  const img = document.getElementById("pokemon-img");
  img.src = `images/${currentId}.png`;
  img.style.filter = "brightness(0)";
}

function checkGuess() {
  if (!allowInput) return;

  const userGuess = document.getElementById("guess").value.trim();
  const correctName = POKEMON_DATA[currentId];
  const result = document.getElementById("result");
  const img = document.getElementById("pokemon-img");

  if (userGuess === correctName) {
    img.style.filter = "none"; // 显示原图

    if (mode === "timed") {
      const timeUsed = 15 - timeLeft;
      result.textContent = `🎉 正确！你用了 ${timeUsed} 秒完成挑战！`;
      clearInterval(timer);
      allowInput = false;
    } else if (mode === "free") {
      score += 1;
      result.textContent = `✅ 正确！当前得分：${score}`;
      setTimeout(loadNew, 1000);
    }
  } else {
    result.textContent = "❌ 错了，再试一次！";
    img.style.filter = "none"; // 显示原图

  }
}

function startCountdown(duration, onEnd) {
  timeLeft = duration;
  document.getElementById("timer").textContent = `⏱️ 时间：${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `⏱️ 时间：${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      allowInput = false;
      onEnd();
    }
  }, 1000);
}

function startTimedMode() {
  mode = "timed";
  allowInput = true;
  score = 0;
  document.getElementById("mode-indicator").textContent = "🕒 当前模式：15秒挑战";
  document.getElementById("result").textContent = "";
  startTime = Date.now();
  loadNew();
  startCountdown(15, () => {
    const correctName = POKEMON_DATA[currentId];
    document.getElementById("result").textContent =
      `⏱️ 时间到！挑战失败！正确答案是：${correctName}`;
    img.style.filter = "none"; // 显示原图

  });
}

function startFreeMode() {
  mode = "free";
  allowInput = true;
  score = 0;
  document.getElementById("mode-indicator").textContent = "⌛ 当前模式：1分钟自由答题";
  document.getElementById("result").textContent = "";
  loadNew();
  startCountdown(60, () => {
    document.getElementById("result").textContent =
      `🛑 时间到！你一共答对了 ${score} 个宝可梦！`;
  });
}

function populateDatalist() {
  const datalist = document.getElementById("pokemon-list");
  datalist.innerHTML = "";
  for (const name of Object.values(POKEMON_DATA)) {
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);
  }
}

window.onload = () => {
  populateDatalist();
  document.getElementById("timer").textContent = "⏱️ 时间：--";
};
