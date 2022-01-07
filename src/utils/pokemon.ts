import PokemonCard from "@/models/PokemonCard";
import store from "@/store/index";
import { pokemonsTypes, boostersTypes } from "@/data/const";
import { Item } from "@/types/Item.interface";
import { InventoryBooster } from "@/types/Inventory.interface";
import { uniq } from "lodash";
import gameConst from "@/data/gameConst";

export const getRarityName = (rarity: number): string => {
  switch (rarity) {
    case 1:
      return "COMMON";
    case 2:
      return "UNCOMMON";
    case 3:
      return "RARE";
    case 4:
      return "EPIC";
    case 5:
      return "LEGENDARY";
    case 6:
      return "UBER";
    default:
      return "";
  }
};
export const getBoosterTypeById = (id: number): Item | undefined => {
  return boostersTypes.find((b: Item) => b.id === id);
};
export const getBoosterTypeByName = (name: string): Item | undefined => {
  return boostersTypes.find((b: Item) => b.name === name);
};

export const getReleaseRewards = async (cardsReleased: PokemonCard[]) => {
  const coinsAmountRewarded = getCoinsReward(cardsReleased);
  const boosterTypedRewarded = getTypeReward(cardsReleased);
  const arrayOfEvolutionReward = await getEvolutionReward(cardsReleased);

  return {
    coins: coinsAmountRewarded,
    boosterTyped: boosterTypedRewarded,
    evolutionReward: arrayOfEvolutionReward,
    pokemonsReleased: cardsReleased.length,
  };
};

const getCoinsReward = (cardsReleased: PokemonCard[]) => {
  const commonLength = cardsReleased.filter((c) => c.rarity === 1).length;
  const uncommonLength = cardsReleased.filter((c) => c.rarity === 2).length;
  const rareLength = cardsReleased.filter((c) => c.rarity === 3).length;
  const epicLength = cardsReleased.filter((c) => c.rarity === 4).length;
  const legendaryLength = cardsReleased.filter((c) => c.rarity === 5).length;
  const uberLength = cardsReleased.filter((c) => c.rarity === 6).length;

  const shinies = cardsReleased.filter((c) => c.isShiny);
  const shinyLength = cardsReleased.filter((c) => c.isShiny).length;

  const commonCoins = commonLength * gameConst.commonCoins;
  const uncommonCoins = uncommonLength * gameConst.uncommonCoins;
  const rareCoins = rareLength * gameConst.rareCoins;
  const epicCoins = epicLength * gameConst.epicCoins;
  const legendaryCoins = legendaryLength * gameConst.legendaryCoins;
  const uberCoins = uberLength * gameConst.uberCoins;
  let shinyCoins = 0;

  shinies.forEach((s) => {
    switch (s.rarity) {
      case 1:
        shinyCoins += gameConst.shinyCoins + gameConst.commonCoins;
        return;
      case 2:
        shinyCoins += gameConst.shinyCoins + gameConst.uncommonCoins;
        return;
      case 3:
        shinyCoins += gameConst.shinyCoins + gameConst.rareCoins;
        return;
      case 4:
        shinyCoins += gameConst.shinyCoins + gameConst.epicCoins;
        return;
      case 5:
        shinyCoins += gameConst.shinyCoins + gameConst.legendaryCoins;
        return;
      case 6:
        shinyCoins += gameConst.shinyCoins + gameConst.uberCoins;
        return;
    }
  });
  const totalCoins =
    commonCoins +
    uncommonCoins +
    rareCoins +
    epicCoins +
    legendaryCoins +
    uberCoins +
    shinyCoins;

  store.dispatch("addMoney", totalCoins);
  return totalCoins;
};

const getTypeReward = (cardsReleased: PokemonCard[]) => {
  const cardAmountByType: any = [];
  //check pour tous les types le nombre de pokemon relachés
  pokemonsTypes.forEach((type) => {
    const typeAmount = cardsReleased.filter((c) =>
      c.typeList.includes(type)
    ).length;

    // ajoute pour tous les types de pokemon le nombre de pokemon relachés
    cardAmountByType.push({
      type: type,
      amount: typeAmount as number,
    });
  });

  //stock tous les rewards
  const typedBoosterRewards: InventoryBooster[] = [];

  // vérifie si 5 pokemons ont été relachés par type puis  ajoute la récompense si c'est le cas
  cardAmountByType.forEach((cardType: { type: string; amount: number }) => {
    if (cardType.amount >= gameConst.typeRelease) {
      //calcul du nom de booster gagnés
      const boosterAmount: number = ~~(cardType.amount / gameConst.typeRelease);

      //creation du booster à ajouter à l'inventaire
      const findBooster = getBoosterTypeByName(cardType.type);
      if (!findBooster) return;
      const boosterTyped: InventoryBooster = {
        ...findBooster,
        amount: boosterAmount as number,
      };
      // ajout du booster au stock des rewards
      typedBoosterRewards.push(boosterTyped);
      //ajout du booster dans l'inventaire
      store.dispatch("addBooster", boosterTyped);
    }
  });
  return typedBoosterRewards;
};

const getEvolutionReward = async (cardsReleased: PokemonCard[]) => {
  //récupère un tableau des pokemon dupliqués
  const duplicateIds = uniq(
    cardsReleased
      .map((e: PokemonCard) => e["id"])
      .map(
        (e: number, i: number, final: number[]) => final.indexOf(e) !== i && i
      )
      .filter((obj: any) => cardsReleased[obj])
      .map((e: any) => cardsReleased[e]["id"])
  );

  const arrayOfEvolutionCard: PokemonCard[] = [];

  //get card duplicate amount for each id
  await Promise.all(
    duplicateIds.map(async (id: number) => {
      const cardToEvolution = cardsReleased.find((c) => c.id === id);
      if (cardToEvolution?.nextEvolution.id === 0) return;
      const amountReleased = cardsReleased.filter((c) => c.id === id).length;

      // vérifie si 5 pokemons ont été relachés par type puis  ajoute la récompense si c'est le cas
      if (amountReleased >= gameConst.evolutionRelease) {
        //calcul du nom de cartes gagnés
        const cardsAmount: number = ~~(
          amountReleased / gameConst.evolutionRelease
        );

        //creation de la carte à ajouter au pokedex
        for (let i = 0; i < cardsAmount; i++) {
          console.log("i", i);
          const evolutionCard: PokemonCard = new PokemonCard();
          await evolutionCard.init(false, {
            cardId: cardToEvolution?.nextEvolution.id,
          });

          // ajout de la carte au stock des rewards
          arrayOfEvolutionCard.push(evolutionCard);
        }
      }
    })
  );

  //ajout des carte dans le pokedex
  store.dispatch("addCards", arrayOfEvolutionCard);

  return arrayOfEvolutionCard;
};
