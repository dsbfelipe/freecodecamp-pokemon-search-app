const pokemonListUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const pokemonId = document.querySelector("#pokemon-id");
const pokemonName = document.querySelector("#pokemon-name");
const pokemonType = document.querySelector("#types");
const pokemonWeight = document.querySelector("#weight");
const pokemonHeight = document.querySelector("#height");
const pokemonHP = document.querySelector("#hp");
const pokemonAttack = document.querySelector("#attack");
const pokemonDefense = document.querySelector("#defense");
const pokemonSpecialAttack = document.querySelector("#special-attack");
const pokemonSpecialDefense = document.querySelector("#special-defense");
const pokemonSpeed = document.querySelector("#speed");
const imageContainer = document.querySelector(".image-container");
const displayData = document.querySelector(".data-container")
const typeColors = {
  "normal": "#4e5457",
  "fighting": "#cc6600",
  "flying": "#0f4579",
  "poison": "#6b2a9a",
  "ground": "#74411a",
  "rock": "#504c33",
  "bird": "#4d7a70",
  "bug": "#748114",
  "ghost": "#5a345a",
  "steel": "#3a7083",
  "fire": "#af1415",
  "water": "#0d55b0",
  "grass": "#328121",
  "electric": "#c89a00",
  "psychic": "#a10e3d",
  "ice": "#0a85a4",
  "dragon": "#192795",
  "dark": "#4e3e3e",
  "fairy": "#840f84",
}

async function fetchPokemonList() {
  try {
    const response = await fetch(pokemonListUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchSearchedPokemon(nameOrId) {
    try {
      const response = await fetch(pokemonListUrl + `/${nameOrId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      alert("Pokémon not found");
    }
}

async function getImage(nameOrId) {
  const pokemonObject = await fetchSearchedPokemon(nameOrId);
  const sprites = pokemonObject.sprites;
  return sprites["front_default"];
}

async function getStats(nameOrId) {
  const pokemonObject = await fetchSearchedPokemon(nameOrId);
  console.log(pokemonObject);
  const stats = pokemonObject.stats;
  const organizedStats = {};
  stats.forEach((stat) => {
    organizedStats[stat.stat.name] = stat["base_stat"];
  })
  organizedStats["type"] = pokemonObject.types[0].type.name;
  organizedStats["weight"] = pokemonObject.weight;
  organizedStats["height"] = pokemonObject.height;
  organizedStats["id"] = pokemonObject.id;
  organizedStats["name"] = pokemonObject.name;
  return organizedStats;
}

console.log(getStats(25));

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
})

searchButton.addEventListener("click", async () => {
  displayData.classList.remove("show");
  displayData.classList.add("hide");
  const input = searchInput.value.toLowerCase();
  console.log(input);
  const stats = await getStats(input);
  const spriteUrl = await getImage(input);

  pokemonName.style.fontSize = "96px"
  if (stats.name.length > 9){
    pokemonName.style.fontSize = "80px"
  }

  pokemonId.textContent = `#${stats.id}`;
  pokemonName.textContent = stats.name.toUpperCase();
  pokemonType.textContent = stats.type[0].toUpperCase() + stats.type.slice(1);
  pokemonType.style.backgroundColor = typeColors[stats.type];
  pokemonWeight.textContent = stats.weight;
  pokemonHeight.textContent = stats.height;
  pokemonHP.textContent = stats.hp;
  pokemonAttack.textContent = stats.attack;
  pokemonDefense.textContent = stats.defense;
  pokemonSpecialAttack.textContent = stats["special-attack"];
  pokemonSpecialDefense.textContent = stats["special-defense"];
  pokemonSpeed.textContent = stats.speed;
  imageContainer.innerHTML = "";
  imageContainer.innerHTML = `<img id="sprite" src="${spriteUrl}" />`;
  displayData.classList.remove("hide");
  displayData.classList.add("show");
})