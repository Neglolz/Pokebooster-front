import {
  boostersTypes,
  getPokemonFromData,
  pokemonsByRarity,
  pokemonsByType,
} from "@/data/const";
import {
  getEvolutionData,
  getEvolutionName,
  getPokemon,
  getPokemonById,
  getPokemonInfos,
} from "@/services/pokemonApi";
import { v4 as uuidv4 } from "uuid";
import { BoosterOptions } from "@/types/BoosterOptions.interface";
import { Item } from "@/types/Item.interface";
import { includes } from "lodash";
import { Stat } from "@/types/Stats.interface";
import { NextEvolution } from "@/types/NextEvolution.interface";
import { ApiCard } from "@/types/api/ApiCard";
import { Stats } from "@/types/api/ApiPokemon";
import { FlavorTextEntries } from "@/types/api/ApiPokemonSpecies";
import MongoPokemon from "@/types/api/MongoPokemon";

export default class PokemonCard {
  [k: string]: any;
  uuid: string;
  id: number;
  name: string;
  typeList: string[];
  rarity: number;
  description: string;
  height: number;
  weight: number;
  image?: string;
  species: string;
  isShiny: boolean;
  stats: Stat;
  nextEvolution: NextEvolution;

  constructor() {
    this.uuid = "";
    this.id = 0;
    this.name = "";
    this.typeList = [""];
    this.rarity = 0;
    this.height = 0;
    this.weight = 0;
    this.image = "";
    this.description = "";
    this.species = "";
    this.isShiny = this.rollShiny();
    this.stats = {
      atq: 0,
      def: 0,
      hp: 0,
      spd: 0,
    };
    this.nextEvolution = {
      id: 0,
      image: "",
    };
  }

  async init(isLastCard: boolean, options?: BoosterOptions): Promise<void> {
    const rarityRolled = this.rollRarity(
      isLastCard,
      options?.id,
      options?.rarity,
      options?.minRarity
    );
    let pokemonRolledId = 0;

    // if booster is type elemental
    if (options?.id && options?.id > 2 && options?.id < 21) {
      let typeName = boostersTypes?.find(
        (b: Item) => b.id === options?.id
      )?.name;
      if (!typeName) typeName = "";
      pokemonRolledId = this.rollPokemonWithRarityInPokemonByType(
        rarityRolled,
        typeName
      );
    } else if (options?.cardId) {
      pokemonRolledId = options.cardId;
    } else {
      //roll un pokemon random dans la rareté rollé
      pokemonRolledId = this.rollPokemon(rarityRolled);
    }

    //get pokemon datas
    const data = await this.getPokemonData(pokemonRolledId);
    //create card
    this.setPokemonCard(data);
  }

  rollRarity(
    isLastCard: boolean,
    id?: number,
    rarity?: string | undefined,
    minRarity?: string
  ): string {
    const roll = Math.floor(Math.random() * 1001);

    let rarityRolled: string;
    if (rarity) return rarity; //if rarity is specified return it

    switch (true) {
      case roll <= 899:
        if (isLastCard && id === 2) {
          rarityRolled = "RARITY_UNCOMMON"; //if better booster => last card is uncommon minimum
        } else {
          rarityRolled = "RARITY_COMMON";
        }
        break;
      case roll > 900 && roll < 980: // entre 900 et 979
        rarityRolled = "RARITY_UNCOMMON";
        break;
      case roll > 900 && roll < 997: // entre 980 et 996
        rarityRolled = "RARITY_RARE";
        break;
      case roll > 900 && roll < 999: //entre 997 et 999
        rarityRolled = "RARITY_EPIC";
        break;
      case roll === 1000:
        if (Math.floor(Math.random() * 11) > 9) {
          rarityRolled = "RARITY_UBER";
        } else {
          rarityRolled = "RARITY_LEGENDARY";
        }
        break;
      default:
        rarityRolled = "RARITY_";
    }
    return rarityRolled;
  }

  async getPokemonData(pokemonRolledId: number): Promise<MongoPokemon> {
    // const data = {} as ApiCard;
    let data = {} as MongoPokemon;
    try {
      //get data from mongo api
      data = await getPokemonById(pokemonRolledId);
      console.log(data);

      //get overall data
      // const apiData = await getPokemon(pokemonRolledId);
      //
      // //get specified infos
      // const apiAdditionalData = await getPokemonInfos(pokemonRolledId);
      //
      // //get data from const local data
      // const pokemonFromData = await getPokemonFromData(pokemonRolledId);
      //
      // //next evolution data
      // const apiNextEvolutionName: string = await getEvolutionName(
      //   apiAdditionalData.evolution_chain?.url || "",
      //   apiAdditionalData.name || "",
      //   apiAdditionalData?.id || 0
      // );
      //
      // let nextEvolutionData: NextEvolution;
      // if (apiNextEvolutionName) {
      //   const apiNextEvolutionData = await getEvolutionData(
      //     apiNextEvolutionName
      //   );
      //   if (this.isShiny) {
      //     nextEvolutionData = {
      //       id: apiNextEvolutionData.id || 0,
      //       image: apiNextEvolutionData.sprites?.front_shiny || "",
      //     };
      //   } else {
      //     nextEvolutionData = {
      //       id: apiNextEvolutionData.id || 0,
      //       image: apiNextEvolutionData.sprites?.front_default || "",
      //     };
      //   }
      // } else {
      //   nextEvolutionData = {
      //     id: 0,
      //     image: "",
      //   };
      // }
      //
      // data = {
      //   apiData,
      //   apiAdditionalData,
      //   pokemonFromData,
      //   nextEvolutionData,
      // };
    } catch (e) {
      console.error("error", e);
    }
    return data;
  }

  setPokemonCard(data: any): void {
    console.log("data", data);
    this.uuid = uuidv4();
    this.id = data.pokedexId;
    this.name = data.name;
    this.typeList = data.typeList;
    this.rarity = data.rarity;
    this.height = data.height;
    this.weight = data.weight;

    // this.id = data.pokemonFromData.id;
    // this.name = data.pokemonFromData.name;
    // this.typeList = data.pokemonFromData.typeList;
    // this.rarity = data.pokemonFromData.rarity;
    // this.height = data.apiData.height || 0;
    // this.weight = data.apiData.weight || 0;

    if (this.isShiny) {
      // this.image =
      //   data.apiData.sprites?.other?.home?.front_shiny ||
      //   data.apiData.sprites?.other["official-artwork"].front_default ||
      //   "";
      this.image = data.imageShiny;
    } else {
      this.image = data.image;
      // this.image =
      //   data.apiData.sprites?.other?.dream_world?.front_default ||
      //   data.apiData.sprites?.other["official-artwork"].front_default ||
      //   "";
    }

    // this.description = data.apiAdditionalData.flavor_text_entries.find(
    //   (text: FlavorTextEntries) => text.language.name === "en"
    // ).flavor_text;
    this.description = data.description;
    // this.species = data.apiAdditionalData.genera[7].genus;
    this.species = data.species;

    // const stats: Stat = {
    //   atq:
    //     Math.round(
    //       (data.apiData.stats.find((s: Stats) => s.stat.name === "attack")
    //         .base_stat +
    //         data.apiData.stats.find(
    //           (s: Stats) => s.stat.name === "special-attack"
    //         ).base_stat) /
    //         2
    //     ) || 0,
    //   def:
    //     Math.round(
    //       (data.apiData.stats.find((s: Stats) => s.stat.name === "defense")
    //         .base_stat +
    //         data.apiData.stats.find(
    //           (s: Stats) => s.stat.name === "special-defense"
    //         ).base_stat) /
    //         2
    //     ) || 0,
    //   hp:
    //     data.apiData.stats.find((s: Stats) => s.stat.name === "hp").base_stat ||
    //     0,
    //   spd:
    //     data.apiData.stats.find((s: Stats) => s.stat.name === "speed")
    //       .base_stat || 0,
    // };
    // this.stats = stats;
    this.stats = data.stats;

    // this.nextEvolution = data.nextEvolutionData;
    this.nextEvolution = data.nextEvolution;
  }

  rollPokemon(rarityRolled: string): number {
    const pokemonLengthInRarityRolled = pokemonsByRarity[rarityRolled].length;
    const indexRolled = Math.floor(
      Math.random() * (pokemonLengthInRarityRolled - 1)
    );
    return pokemonsByRarity[rarityRolled][indexRolled];
  }

  rollPokemonWithRarityInPokemonByType(
    rarityRolled: string,
    typeName: string
  ): number {
    const arrPokemonsByRarity = pokemonsByRarity[rarityRolled];
    const arrPokemonByType = pokemonsByType[typeName];
    const arrPokemonsByRarityAndType = arrPokemonsByRarity.filter((element) =>
      includes(arrPokemonByType, element)
    );

    const pokemonLength = arrPokemonsByRarityAndType.length;
    const indexRolled = Math.floor(Math.random() * (pokemonLength - 1));
    return arrPokemonsByRarityAndType[indexRolled];
  }

  rollShiny(): boolean {
    const roll = Math.floor(Math.random() * 1001);
    return roll === 1000;
    // return roll > 500;
  }
}
