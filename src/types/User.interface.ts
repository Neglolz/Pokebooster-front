import Pokemon from "@/models/PokemonCard";
import { Inventory } from "@/types/Inventory.interface";

export default interface User {
  objectID: string;
  email?: string;
  name?: string;
  username?: string;
  image?: string;
  id_token?: string;
  pokemons?: Pokemon[];
  inventory?: Inventory;
  lastRewardDate?: string;
}
