import "reflect-metadata";
// import {Type} from "class-transformer";

export default class MongoPokemon {
  public stats?: Stats;
  public nextEvolution?: NextEvolution;
  public typeList?: string[];
  public name?: string;
  public rarity?: number;
  public description?: string;
  public height?: number;
  public weight?: number;
  public image?: string;
  public imageShiny?: string;
  public species?: string;
  public isShiny?: boolean;
  public pokedexId?: number;
  public id?: string;
}

export class Stats {
  public atq?: number;
  public def?: number;
  public hp?: number;
  public spd?: number;
}

export class NextEvolution {
  public pokedexId?: number;
  public image?: string;
  public imageShiny?: string;
}
