import { Item } from "@/types/Item.interface";

export interface Inventory {
  money: number;
  boosters: InventoryBooster[];
}

export type InventoryBooster = Item & {
  amount: number;
};
