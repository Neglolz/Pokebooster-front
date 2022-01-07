import ApiPokemon from "@/types/api/ApiPokemon";
import ApiPokemonSpecies from "@/types/api/ApiPokemonSpecies";
import Pokemon from "@/types/Pokemon.interface";
import { NextEvolution } from "@/types/NextEvolution.interface";

export type ApiCard = {
  apiData: ApiPokemon;
  apiAdditionalData: ApiPokemonSpecies;
  pokemonFromData: Pokemon;
  nextEvolutionData: NextEvolution;
};
