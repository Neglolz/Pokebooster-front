import PokemonCard from "@/models/PokemonCard";
import { BoosterOptions } from "@/types/BoosterOptions.interface";

export default class Booster {
  firstCard: PokemonCard;
  secondCard: PokemonCard;
  thirdCard: PokemonCard;
  fourthCard: PokemonCard;
  fifthCard: PokemonCard;

  constructor() {
    this.firstCard = new PokemonCard();
    this.secondCard = new PokemonCard();
    this.thirdCard = new PokemonCard();
    this.fourthCard = new PokemonCard();
    this.fifthCard = new PokemonCard();
  }

  async init(options?: BoosterOptions): Promise<void> {
    try {
      await Promise.all([
        this.firstCard.init(false, options),
        this.secondCard.init(false, options),
        this.thirdCard.init(false, options),
        this.fourthCard.init(false, options),
        this.fifthCard.init(true, options),
      ]);
    } catch (e) {
      console.error(e);
    }
  }
}
