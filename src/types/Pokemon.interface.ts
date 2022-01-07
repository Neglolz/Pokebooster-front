import "reflect-metadata";
// import { getPokemonFromData, rarity } from "@/data/const";
// import { getPokemon, getPokemonInfos } from "@/services/pokemonApi";
// import { Type } from "class-transformer";

export default interface Pokemon {
  id: number;
  name: string;
  typeList: string[];
  rarity: number;
}
