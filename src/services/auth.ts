import User from "@/types/User.interface";
import PokemonCard from "@/models/PokemonCard";
import algoliasearch from "algoliasearch";
import { shop } from "@/data/shop";
import { Inventory } from "@/types/Inventory.interface";
import store from "@/store/index";
import { Item } from "@/types/Item.interface";

const client = algoliasearch(
  process.env.VUE_APP_ALGOLIA_APP_ID || "",
  process.env.VUE_APP_ALGOLIA_PRIVATE_APIKEY || ""
);
const index = client.initIndex("users");
// const store = useStore();

//todo server side?
const headers = {
  "X-Algolia-API-Key": process.env.VUE_APP_ALGOLIA_PRIVATE_APIKEY as string,
  "X-Algolia-Application-Id": process.env.VUE_APP_ALGOLIA_APP_ID as string,
};

export async function saveUser(identity: User) {
  const objects = [identity];
  index.partialUpdateObjects(objects, {
    // All the following parameters are optional
    createIfNotExists: true,
    headers,
    // + any requestOptions
  });
  await store.dispatch("setUser", identity);
  console.log("User have been saved");
}
export async function getOwnedPokemons(identity: User): Promise<PokemonCard[]> {
  const res = await fetch(
    `https://${process.env.VUE_APP_ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/users/${identity.objectID}`,
    { headers }
  );
  const data = await res.json();
  //create if first connexion
  if (!data.pokemons) return [];
  //save in store
  const newIdentity = {
    ...identity,
    pokemons: data.pokemons,
  };
  await store.dispatch("setUser", newIdentity);
  return data.pokemons;
}
export async function getOwnedInventory(identity: User): Promise<Inventory> {
  console.log("getOwnedInventory");
  const res = await fetch(
    `https://${process.env.VUE_APP_ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/users/${identity.objectID}`,
    { headers }
  );
  const data = await res.json();
  //create inventory if first connexion
  if (!data.inventory) return baseInventory;
  // // save in store
  const newIdentity = {
    ...identity,
    inventory: data.inventory,
  };
  await store.dispatch("setUser", newIdentity);
  return data.inventory;
}
export async function getLastRewardDate(identity: User) {
  console.log("getLastRewardDate");
  const res = await fetch(
    `https://${process.env.VUE_APP_ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/users/${identity.objectID}`,
    { headers }
  );
  const data = await res.json();

  //create date-1 if first connexion
  if (!data.lastRewardDate) {
    // const today = new Date();
    // const yesterday = Date.parse(today.toDateString()) - 8640000;

    return {
      lastRewardDate: baseLastRewardDate(),
    };
  }
  // //save in store
  const newIdentity = {
    ...identity,
    lastRewardDate: data.lastRewardDate,
  };
  await store.dispatch("setUser", newIdentity);
  // console.log("DATA.LAST", store.state.user.lastRewardDate);
  return store.state.user.lastRewardDate;
}
export async function getUser(identity: User): Promise<User> {
  console.log("getUser");
  const res = await fetch(
    `https://${process.env.VUE_APP_ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/users/${identity.objectID}`,
    { headers }
  );
  const data = await res.json();
  // init inventory if new User
  if (!data.inventory) {
    data.inventory = baseInventory;
    data.lastRewardDate = baseLastRewardDate();
  }

  await store.dispatch("setUser", data);
  return data;
}
export async function getAllUsers(): Promise<User[]> {
  const res = await fetch(
    `https://${process.env.VUE_APP_ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/users`,
    { headers }
  );
  const data = await res.json();
  console.log("GET ALL USERS", data);

  return data.hits;
}
export async function getBoostersAmountOpened(identity: User): Promise<number> {
  const res = await fetch(
    `https://${process.env.VUE_APP_ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/users/${identity.objectID}`,
    { headers }
  );
  const data = await res.json();
  if (!data.totalBoostersAmountOpened) return 0;

  return data.totalBoostersAmountOpened;
}

const baseInventory: Inventory = {
  money: 1000,
  boosters: [
    {
      ...shop()[0],
      amount: 10,
    },
    {
      ...shop()[1],
      amount: 0,
    },
  ],
};
const baseLastRewardDate = () => {
  const today = new Date();
  const yesterday = Date.parse(today.toDateString()) - 86400000;

  return yesterday;
};
