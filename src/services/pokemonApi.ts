// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/871.png
import { ApiPokemon } from "@/types/api/ApiPokemon";
import { ApiPokemonSpecies } from "@/types/api/ApiPokemonSpecies";
import MongoPokemon from "@/types/api/MongoPokemon";

const headers = {
  "X-Algolia-API-Key": process.env.VUE_APP_ALGOLIA_PRIVATE_APIKEY as string,
  "X-Algolia-Application-Id": process.env.VUE_APP_ALGOLIA_APP_ID as string,
};
export async function getPokemon(pokemonId: number): Promise<ApiPokemon> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId.toString()}`,
    {
      headers,
    }
  );
  return await res.json();
}
export async function getPokemonImage(pokemonId: number): Promise<string> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, {
    headers,
  });
  const data = await res.json();
  // console.log("GetPokemonImage (pokemonApi) data:", data.sprites.front_default);
  return data.sprites.front_default;
}
export async function getPokemonInfos(
  pokemonId: number
): Promise<ApiPokemonSpecies> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`,
    {
      headers,
    }
  );
  return await res.json();
}
export async function getEvolutionName(
  url: string,
  pokemonName: string,
  pokemonId: number
): Promise<string> {
  const res = await fetch(url, {
    headers,
  });
  const data = await res.json();

  let evolutionUrl = "";
  let evolutionId = "";
  let evolutionName = "";

  if (data.chain.evolves_to[0]) {
    // cas 1
    evolutionUrl = data.chain.evolves_to[0].species.url;
    evolutionId = evolutionUrl.substring(
      evolutionUrl.indexOf("species/") + 8,
      evolutionUrl.lastIndexOf("/")
    );
    evolutionName = data.chain.evolves_to[0].species.name;

    //cas 2
    if (parseInt(evolutionId) <= pokemonId) {
      if (data.chain.evolves_to[0].evolves_to[0]) {
        //si le pokemon possède deux evolutions
        evolutionUrl = data.chain.evolves_to[0].evolves_to[0].species.url;
        evolutionId = evolutionUrl.substring(
          evolutionUrl.indexOf("species/") + 8,
          evolutionUrl.lastIndexOf("/")
        );
        evolutionName = data.chain.evolves_to[0].evolves_to[0].species.name;

        //cas 3
        if (parseInt(evolutionId) <= pokemonId) {
          evolutionName = "";
        }
      } else {
        evolutionName = "";
      }
    }
  }

  return evolutionName;
}
export async function getEvolutionData(name: string): Promise<ApiPokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    headers,
  });
  return await res.json();
}
export async function getPokemonById(pokemonId: number): Promise<MongoPokemon> {
  const res = await fetch(
    `http://localhost:3000/v1/pokemons/${pokemonId.toString()}`
    // {
    //   headers,
    // }
  );
  return await res.json();
}
