export type BoosterOptions = {
  id?: number; // BoosterTypes from const
  cardId?: number; //Card id pour créer un pokemon spécifique
  rarity?: string; // rarity obligatoire
  minRarity?: string; // min rarity
  cardsAmount?: number; // number of cards in booster
  type?: string; // name from BoosterType
  isLastCard?: boolean;
};
