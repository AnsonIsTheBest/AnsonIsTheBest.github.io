let currentId = null;

function getRandomPokemonId() {
  const keys = Object.keys(POKEMON_DATA);
  const index = Math.floor(Math.random() * keys.length);
  return keys[index];
}

function loadNew() {
  document.getElementById("result").textContent = "";
  document.getElementById("guess").value = "";

  currentId = getRandomPokemonId();
  const img = document.getElementById("pokemon-img");
  img.src = `images/${currentId}.png`;
}

function checkGuess() {
  const userGuess = document.getElementById("guess").value.trim();
  const correctName = POKEMON_DATA[currentId];
  const result = document.getElementById("result");

  if (userGuess === correctName) {
    result.textContent = "🎉 正确！";
  } else {
    result.textContent = `❌ 错了！正确答案是：${correctName}`;
  }
}

window.onload = loadNew;
