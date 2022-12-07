/*
TODO: 1. refactor the code
      2. add a button to get more pokemons
      3. white background behind the pokemon pics
      4. maybe OOP?
*/

const poke_container = document.querySelector(".cards");
const API_URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemonArr = [];
const colors = {
   fire: "#FDDFDF",
   grass: "#DEFDE0",
   electric: "#FCF7DE",
   water: "#DEF3FD",
   ground: "#f4e7da",
   rock: "#d5d5d4",
   fairy: "#fceaff",
   poison: "#98d7a5",
   bug: "#f8d5a3",
   dragon: "#97b3e6",
   psychic: "#eaeda1",
   flying: "#F5F5F5",
   fighting: "#E6E0D4",
   normal: "#F5F5F5",
};

const mainTypes = Object.keys(colors);

async function getArrayOfPokemons() {
   try {
      const { data } = await axios(API_URL);
      return data.results;
   } catch (err) {
      console.error(err);
   }
}

async function getOnePokemon(pokeUrl) {
   try {
      const { data } = await axios(pokeUrl);
      return data;
   } catch (err) {
      console.error();
   }
}

async function fillPokemonArr() {
   const apiArr = await getArrayOfPokemons();
   apiArr.forEach((el, i) => {
      pokemonArr.push(el.url);
   });
   main(pokemonArr);
}

function generateMarkup(data) {
   const pokemonEl = document.createElement("div");
   pokemonEl.classList.add("card");

   const img = data.sprites.front_default;
   const id = data.id.toString().padStart(3, "0");
   const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
   const pokeType = data.types[0].type.name;
   const type = mainTypes.find((type) => pokeType.indexOf(type) > -1);
   const color = colors[type];

   pokemonEl.style.backgroundColor = color;

   const pokemonInnerHTML = `
            <div class="img">
               <img
                  src="${img}"
                  alt=""
               />
            </div>
            <div class="id">#${id}</div>
            <p class="name">${name}</p>
            <p class="type">Type: ${type}</p>
   `;

   pokemonEl.innerHTML = pokemonInnerHTML;
   poke_container.appendChild(pokemonEl);
}

async function main(pokemonUrls) {
   for (let i = 0; i < pokemonUrls.length; i++) {
      const data = await getOnePokemon(pokemonUrls[i]);
      generateMarkup(data);
   }
}

fillPokemonArr();
