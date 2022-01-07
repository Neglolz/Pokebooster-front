import { boostersTypes } from "@/data/const";
import { Item } from "@/types/Item.interface";

export const shop = (): Item[] => {
  return boostersTypes.filter((b: Item) => b.isBuyable);
};
