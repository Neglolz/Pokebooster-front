import { createStore } from "vuex";
import Cookie from "js-cookie";
import User from "../types/User.interface";
import options from "@/config/options";
import { getIdentity, getGoogleUser } from "@/GoogleAuth";
import { getUser, saveUser } from "@/services/auth";
import Pokemon from "@/models/PokemonCard";
import { Inventory, InventoryBooster } from "@/types/Inventory.interface";
import { createToaster } from "@meforma/vue-toaster";
import PokemonCard from "@/models/PokemonCard";

const toaster = createToaster({
  /* options */
});

export default createStore({
  state: () => ({
    user: {
      objectID: "",
      email: "",
      name: "",
      username: "",
      image: "",
      id_token: "",
      pokemons: [] as PokemonCard[],
      inventory: {} as Inventory,
      lastRewardDate: "",
      totalBoostersAmountOpened: 0,
    },
    isLoggedIn: false,
  }),
  mutations: {
    // SET_USER(state, user) {
    //   state.isLoggedIn = !!user;
    //   state.user = user || {};
    //
    SET_USER(state, user) {
      state.isLoggedIn = !!user;
      if (user) {
        state.user.objectID = user.objectID || state.user.objectID;
        state.user.email = user.email || state.user.email;
        state.user.name = user.name || state.user.name;
        state.user.username = user.username || state.user.username;
        state.user.image = user.image || state.user.image;
        state.user.id_token = user.id_token || state.user.id_token;
        state.user.pokemons = user.pokemons || state.user.pokemons;
        state.user.inventory = user.inventory || state.user.inventory;
        state.user.lastRewardDate =
          user.lastRewardDate || state.user.lastRewardDate;
        state.user.totalBoostersAmountOpened =
          user.totalBoostersAmountOpened ||
          state.user.totalBoostersAmountOpened;
      } else {
        state.user = user || {};
      }
    },
    UPDATE_USER_POKEMONS(state, activeIds) {
      state.user.pokemons?.reverse();
      state.user.pokemons?.reverse();
    },
    ADD_MONEY(state, amount: number) {
      state.user.inventory.money += amount;
    },
    ADD_BOOSTER(state, boosterTyped: InventoryBooster) {
      if (
        !state.user.inventory.boosters.some((b) => b.id === boosterTyped.id)
      ) {
        console.log("salut");
        // if booster is non existent create it
        state.user.inventory.boosters.push(boosterTyped);
      } else {
        //increase quantity of the booster
        state.user.inventory.boosters.filter(
          (booster: InventoryBooster) => booster.id === boosterTyped.id
        )[0].amount += boosterTyped.amount;
      }
    },
    ADD_CARDS(state, arrayOfEvolutionCard: PokemonCard[]) {
      arrayOfEvolutionCard.forEach((card: PokemonCard) => {
        state.user.pokemons?.push(card);
      });
    },
  },
  actions: {
    async signIn({ state, commit }, gAuth): Promise<void> {
      if (!gAuth) return;
      const googleUser = await gAuth.signIn();
      try {
        const user = googleUser.vc;
        const idToken = user.id_token || state.user.id_token;
        //set store
        const ticket = await getGoogleUser(options, idToken);
        if (!ticket) return;
        const identity = getIdentity(ticket);
        await getUser(identity);
        //set cookie
        Cookie.set("idToken", idToken, { expires: 1 / 24, sameSite: "Lax" });
      } catch (e) {
        console.error("error", e);
      }
    },
    signOut({ commit, state }, gAuth: any): void {
      console.log("sigout");
      if (!gAuth) return;
      commit("SET_USER");
      Cookie.remove("idToken");
      gAuth.signOut();
    },
    setUser({ commit }, identity) {
      commit("SET_USER", identity);
    },
    updateUserPokemons({ commit }) {
      commit("UPDATE_USER_POKEMONS");
    },
    async addMoney({ commit, state }, amount: number) {
      commit("ADD_MONEY", amount);
      await saveUser(state.user);
      toaster.success(`You gained ${amount} coins`);
    },
    async addBooster({ commit, state }, boosterTyped) {
      commit("ADD_BOOSTER", boosterTyped);
      await saveUser(state.user);
      toaster.success(`You gained a ${boosterTyped.name} booster !`);
    },
    async addCards({ commit, state }, arrayOfEvolutionCard: PokemonCard[]) {
      commit("ADD_CARDS", arrayOfEvolutionCard);
      await saveUser(state.user);
      toaster.success(
        `You gained ${arrayOfEvolutionCard.length} evoluted cards !`
      );
    },
  },
  modules: {},
});
