import "reflect-metadata";

export type ApiPokemonSpecies = {
  base_happiness?: number;
  capture_rate?: number;
  color?: Color;
  egg_groups?: EggGroups[];
  evolution_chain?: EvolutionChain;
  evolves_from_species?: any;
  flavor_text_entries?: FlavorTextEntries[];
  forms_switchable?: boolean;
  gender_rate?: number;
  genera?: Genera[];
  generation?: Generation;
  growth_rate?: GrowthRate;
  habitat?: Habitat;
  has_gender_differences?: boolean;
  hatch_counter?: number;
  id?: number;
  is_baby?: boolean;
  is_legendary?: boolean;
  is_mythical?: boolean;
  name?: string;
  names?: Names[];
  order?: number;
  pal_park_encounters?: PalParkEncounters[];
  pokedex_numbers?: PokedexNumbers[];
  shape?: Shape;
  varieties?: Varieties[];
};

export class Color {
  public name?: string;
  public url?: string;
}

export class EvolutionChain {
  public url?: string;
}

export class Generation {
  public name?: string;
  public url?: string;
}

export class GrowthRate {
  public name?: string;
  public url?: string;
}

export class Habitat {
  public name?: string;
  public url?: string;
}

export class Shape {
  public name?: string;
  public url?: string;
}

export class EggGroups {
  public name?: string;
  public url?: string;
}

export type FlavorTextEntries = {
  flavor_text?: string;
  language: Language;
  version?: Version;
};

export type Language = {
  name: string;
  url?: string;
};

export class Version {
  public name?: string;
  public url?: string;
}

export type Genera = {
  genus: string;
  language?: Language;
};

export class Names {
  public language?: Language;
  public name?: string;
}

export class PalParkEncounters {
  public area?: Area;
  public base_score?: number;
  public rate?: number;
}

export class Area {
  public name?: string;
  public url?: string;
}

export class PokedexNumbers {
  public entry_number?: number;
  public pokedex?: Pokedex;
}

export class Pokedex {
  public name?: string;
  public url?: string;
}

export class Varieties {
  public is_default?: boolean;
  public pokemon?: Pokemon;
}

export class Pokemon {
  public name?: string;
  public url?: string;
}
