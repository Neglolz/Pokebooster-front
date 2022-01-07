import "reflect-metadata";

export type ApiPokemon = {
  abilities?: Abilities[];
  base_experience?: number;
  forms?: Forms[];
  game_indices?: GameIndices[];
  height?: number;
  id?: number;
  is_default?: boolean;
  location_area_encounters?: string;
  moves?: Moves[];
  name?: string;
  order?: number;
  species?: Species;
  sprites: Sprites | undefined;
  stats: Stats[];
  types?: Types[];
  weight?: number;
};

export class Species {
  public name?: string;
  public url?: string;
}

export type Sprites = {
  back_default?: string;
  back_female?: any;
  back_shiny?: string;
  back_shiny_female?: any;
  front_default?: string;
  front_female?: any;
  front_shiny?: string;
  front_shiny_female?: any;
  other: Other;
  versions?: Versions;
};

export class Other {
  public dream_world?: DreamWorld;
  public home?: Home;
  public "official-artwork": OfficialArtwork;
}

export class DreamWorld {
  public front_default?: string;
  public front_female?: any;
}

export class Home {
  public front_default?: string;
  public front_female?: any;
  public front_shiny?: string;
  public front_shiny_female?: any;
}

export class OfficialArtwork {
  public front_default?: string;
}

export class Versions {
  public "generation-i"?: GenerationI;
  public "generation-ii"?: GenerationIi;
  public "generation-iii"?: GenerationIii;
  public "generation-iv"?: GenerationIv;
  public "generation-v"?: GenerationV;
  public "generation-vi"?: GenerationVi;
  public "generation-vii"?: GenerationVii;
  public "generation-viii"?: GenerationViii;
}

export class GenerationI {
  public "red-blue"?: RedBlue;
  public yellow?: Yellow;
}

export class RedBlue {
  public back_default?: string;
  public back_gray?: string;
  public back_transparent?: string;
  public front_default?: string;
  public front_gray?: string;
  public front_transparent?: string;
}

export class Yellow {
  public back_default?: string;
  public back_gray?: string;
  public back_transparent?: string;
  public front_default?: string;
  public front_gray?: string;
  public front_transparent?: string;
}

export class GenerationIi {
  public crystal?: Crystal;
  public gold?: Gold;
  public silver?: Silver;
}

export class Crystal {
  public back_default?: string;
  public back_shiny?: string;
  public back_shiny_transparent?: string;
  public back_transparent?: string;
  public front_default?: string;
  public front_shiny?: string;
  public front_shiny_transparent?: string;
  public front_transparent?: string;
}

export class Gold {
  public back_default?: string;
  public back_shiny?: string;
  public front_default?: string;
  public front_shiny?: string;
  public front_transparent?: string;
}

export class Silver {
  public back_default?: string;
  public back_shiny?: string;
  public front_default?: string;
  public front_shiny?: string;
  public front_transparent?: string;
}

export class GenerationIii {
  public emerald?: Emerald;
  public "firered-leafgreen"?: FireredLeafgreen;
  public "ruby-sapphire"?: RubySapphire;
}

export class Emerald {
  public front_default?: string;
  public front_shiny?: string;
}

export class FireredLeafgreen {
  public back_default?: string;
  public back_shiny?: string;
  public front_default?: string;
  public front_shiny?: string;
}

export class RubySapphire {
  public back_default?: string;
  public back_shiny?: string;
  public front_default?: string;
  public front_shiny?: string;
}

export class GenerationIv {
  public "diamond-pearl"?: DiamondPearl;
  public "heartgold-soulsilver"?: HeartgoldSoulsilver;
  public platinum?: Platinum;
}

export class DiamondPearl {
  public back_default?: string;
  public back_female?: any;
  public back_shiny?: string;
  public back_shiny_female?: any;
  public front_default?: string;
  public front_female?: any;
  public front_shiny?: string;
  public front_shiny_female?: any;
}

export class HeartgoldSoulsilver {
  public back_default?: string;
  public back_female?: any;
  public back_shiny?: string;
  public back_shiny_female?: any;
  public front_default?: string;
  public front_female?: any;
  public front_shiny?: string;
  public front_shiny_female?: any;
}

export class Platinum {
  public back_default?: string;
  public back_female?: any;
  public back_shiny?: string;
  public back_shiny_female?: any;
  public front_default?: string;
  public front_female?: any;
  public front_shiny?: string;
  public front_shiny_female?: any;
}

export class GenerationV {
  public "black-white"?: BlackWhite;
}

export class BlackWhite {
  public animated?: Animated;
  public back_default?: string;
  public back_female?: any;
  public back_shiny?: string;
  public back_shiny_female?: any;
  public front_default?: string;
  public front_female?: any;
  public front_shiny?: string;
  public front_shiny_female?: any;
}

export class Animated {
  public back_default?: string;
  public back_female?: any;
  public back_shiny?: string;
  public back_shiny_female?: any;
  public front_default?: string;
  public front_female?: any;
  public front_shiny?: string;
  public front_shiny_female?: any;
}

export class GenerationVi {
  public "omegaruby-alphasapphire"?: OmegarubyAlphasapphire;
  public "x-y"?: XY;
}

export class OmegarubyAlphasapphire {
  public front_default?: string;
  public front_female?: any;
  public front_shiny?: string;
  public front_shiny_female?: any;
}

export class XY {
  public front_default?: string;
  public front_female?: any;
  public front_shiny?: string;
  public front_shiny_female?: any;
}

export class GenerationVii {
  public icons?: Icons;
  public "ultra-sun-ultra-moon"?: UltraSunUltraMoon;
}

export class Icons {
  public front_default?: string;
  public front_female?: any;
}

export class UltraSunUltraMoon {
  public front_default?: string;
  public front_female?: any;
  public front_shiny?: string;
  public front_shiny_female?: any;
}

export class GenerationViii {
  public icons?: Icons;
}

export class Abilities {
  public ability?: Ability;
  public is_hidden?: boolean;
  public slot?: number;
}

export class Ability {
  public name?: string;
  public url?: string;
}

export class Forms {
  public name?: string;
  public url?: string;
}

export class GameIndices {
  public game_index?: number;
  public version?: Version;
}

export class Version {
  public name?: string;
  public url?: string;
}

export class Moves {
  public move?: Move;
  public version_group_details?: VersionGroupDetails[];
}

export class Move {
  public name?: string;
  public url?: string;
}

export class VersionGroupDetails {
  public level_learned_at?: number;
  public move_learn_method?: MoveLearnMethod;
  public version_group?: VersionGroup;
}

export class MoveLearnMethod {
  public name?: string;
  public url?: string;
}

export class VersionGroup {
  public name?: string;
  public url?: string;
}

export type Stats = {
  base_stat?: number;
  effort?: number;
  stat: Stat;
};

export type Stat = {
  name: string;
  url: string;
};

export class Types {
  public slot?: number;
  public type?: Type;
}

export class Type {
  public name?: string;
  public url?: string;
}
