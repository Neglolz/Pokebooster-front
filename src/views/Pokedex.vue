<template>
  <div>
    <h1 class="title v-align">
      <img src="@/assets/icons/coloredpokedex.png" alt="" class="mr-5" />
      Pokedex completion
      <img src="@/assets/icons/coloredpokedex.png" alt="" class="ml-5" />
    </h1>
    <div class="container mx-auto">
      <div class="subtitle">Cards: {{ uniques }}/898</div>
      <div class="subtitle">
        Shiny:
        {{ uniquesShiny }}
        <br />
      </div>
      <div class="subtitle">
        Boosters opened : {{ store.state.user.totalBoostersAmountOpened }}
      </div>
      <br />
      <div>
        <input
          type="text"
          class="log-input"
          v-model="username"
          placeholder="Username"
        />
        <button class="log-button" @click="saveUsername">Save username</button>
      </div>
    </div>
    <div class="container mx-auto" v-if="!store.state.isLoggedIn">
      You need to be Logged in to see your pokedex
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { computed } from "vue";
import { createToaster } from "@meforma/vue-toaster";
import PokemonCard from "@/models/PokemonCard";
import { saveUser } from "@/services/auth";

const toaster = createToaster({
  /* options */
});

const store = useStore();

const uniques = computed(() => {
  return store.state.user.pokemons
    .map((e: PokemonCard) => e["id"])
    .map((e: number, i: number, final: number[]) => final.indexOf(e) === i && i)
    .filter((obj: number) => store.state.user.pokemons[obj])
    .map((e: number) => store.state.user.pokemons[e]).length;
});
const uniquesShiny = computed(() => {
  return store.state.user.pokemons
    .filter((e: PokemonCard) => e.isShiny)
    .map((e: PokemonCard) => e["id"])
    .map((e: number, i: number, final: number[]) => final.indexOf(e) === i && i)
    .filter((obj: number) => store.state.user.pokemons[obj])
    .map((e: number) => store.state.user.pokemons[e]).length;
});

const username = ref(store.state.user.username);
const saveUsername = async () => {
  try {
    // update username in algolia
    const identity = {
      ...store.state.user,
      username: username.value,
    };

    if (!identity.objectID) return;
    await saveUser(identity);
    toaster.success("Username have been updated");
  } catch (e) {
    console.error(e);
    toaster.error(e);
  }
};
</script>

<style scoped></style>
