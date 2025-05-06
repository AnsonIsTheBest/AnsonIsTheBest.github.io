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
  img.style.filter = "brightness(0)"; // 恢复剪影
}

function checkGuess() {
  const userGuess = document.getElementById("guess").value.trim();
  const correctName = POKEMON_DATA[currentId];
  const result = document.getElementById("result");
  const img = document.getElementById("pokemon-img");

  if (userGuess === correctName) {
    result.textContent = "🎉 正确！";
    img.style.filter = "none"; // 取消剪影
  } else {
    result.textContent = `❌ 错了！正确答案是：${correctName}`;
    img.style.filter = "none"; // 取消剪影

  }
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
  loadNew();
};
