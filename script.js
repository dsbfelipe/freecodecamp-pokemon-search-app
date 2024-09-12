const pokemonList = ""
const container = document.querySelector("div");

async function fetchPokemons() {
  try {
    const response = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const data = await response.json();
    showPokemons(data);
  } catch (error) {
    console.log(error);
  }
}

fetchPokemons();

function showPokemons(data) {
  const { count, results} = data;
  container.innerHTML = results.map((pokemon) => {
    const {id, name, url} = pokemon;

    return `<section>
              <p>${id}</p>
              <p>${name}</p>
              <p>${url}</p>
            </section>`;
  }).join("");
}