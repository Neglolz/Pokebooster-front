<template>
  <div>
    <h1 class="title v-align">
      <img src="@/assets/icons/coloredarrow.png" alt="" class="mr-5" />
      Ladder
      <img src="@/assets/icons/coloredarrow.png" alt="" class="ml-5" />
    </h1>
    <pre></pre>
    <div class="ladder-content container mx-auto">
      <div class="grid">
        <h3 class="subtitle">Most uniques pokemon :</h3>
        <div
          v-for="(user, index) in sortedData('unique')"
          :key="index"
          class="text-left"
        >
          <span class="first" v-if="index === 0">
            <img
              src="@/assets/icons/laddergold.png"
              alt=""
              class="float-left mr-2"
              height="25"
              width="25"
            />{{ index + 1 }}. {{ user.name }} :
            {{ user.uniquesAmount }}
          </span>
          <span class="second" v-if="index === 1">
            <img
              src="@/assets/icons/ladderSilver.png"
              alt=""
              class="float-left mr-2"
              height="25"
              width="25"
            />{{ index + 1 }}. {{ user.name }} :
            {{ user.uniquesAmount }}
          </span>
          <span class="third" v-if="index === 2">
            <img
              src="@/assets/icons/ladderBronze.png"
              alt=""
              class="float-left mr-2"
              height="25"
              width="25"
            />{{ index + 1 }}. {{ user.name }} :
            {{ user.uniquesAmount }}
          </span>
          <span v-if="index > 2">
            {{ index + 1 }}. {{ user.name }} :
            {{ user.uniquesAmount }}
          </span>
          <br />
        </div>
      </div>
      <!--      <div class="grid">-->
      <!--        <h3 class="subtitle">Most uniques shinies pokemon :</h3>-->
      <!--        &lt;!&ndash;        <div&ndash;&gt;-->
      <!--        &lt;!&ndash;          v-for="(user, index) in sortedData('shiny')"&ndash;&gt;-->
      <!--        &lt;!&ndash;          :key="index"&ndash;&gt;-->
      <!--        &lt;!&ndash;          class="text-left"&ndash;&gt;-->
      <!--        &lt;!&ndash;        >&ndash;&gt;-->
      <!--        &lt;!&ndash;          <span class="first" v-if="index === 0">&ndash;&gt;-->
      <!--        &lt;!&ndash;            <img&ndash;&gt;-->
      <!--        &lt;!&ndash;              src="@/assets/icons/laddergold.png"&ndash;&gt;-->
      <!--        &lt;!&ndash;              alt=""&ndash;&gt;-->
      <!--        &lt;!&ndash;              class="float-left mr-2"&ndash;&gt;-->
      <!--        &lt;!&ndash;              height="25"&ndash;&gt;-->
      <!--        &lt;!&ndash;              width="25"&ndash;&gt;-->
      <!--        &lt;!&ndash;            />{{ index + 1 }}. {{ user.name }} : {{ user.uniquesShinyAmount }}&ndash;&gt;-->
      <!--        &lt;!&ndash;          </span>&ndash;&gt;-->
      <!--        &lt;!&ndash;          <span class="second" v-if="index === 1">&ndash;&gt;-->
      <!--        &lt;!&ndash;            <img&ndash;&gt;-->
      <!--        &lt;!&ndash;              src="@/assets/icons/ladderSilver.png"&ndash;&gt;-->
      <!--        &lt;!&ndash;              alt=""&ndash;&gt;-->
      <!--        &lt;!&ndash;              class="float-left mr-2"&ndash;&gt;-->
      <!--        &lt;!&ndash;              height="25"&ndash;&gt;-->
      <!--        &lt;!&ndash;              width="25"&ndash;&gt;-->
      <!--        &lt;!&ndash;            />{{ index + 1 }}. {{ user.name }} : {{ user.uniquesShinyAmount }}&ndash;&gt;-->
      <!--        &lt;!&ndash;          </span>&ndash;&gt;-->
      <!--        &lt;!&ndash;          <span class="third" v-if="index === 2">&ndash;&gt;-->
      <!--        &lt;!&ndash;            <img&ndash;&gt;-->
      <!--        &lt;!&ndash;              src="@/assets/icons/ladderBronze.png"&ndash;&gt;-->
      <!--        &lt;!&ndash;              alt=""&ndash;&gt;-->
      <!--        &lt;!&ndash;              class="float-left mr-2"&ndash;&gt;-->
      <!--        &lt;!&ndash;              height="25"&ndash;&gt;-->
      <!--        &lt;!&ndash;              width="25"&ndash;&gt;-->
      <!--        &lt;!&ndash;            />{{ index + 1 }}. {{ user.name }} : {{ user.uniquesShinyAmount }}&ndash;&gt;-->
      <!--        &lt;!&ndash;          </span>&ndash;&gt;-->
      <!--        &lt;!&ndash;          <span v-if="index > 2">&ndash;&gt;-->
      <!--        &lt;!&ndash;            {{ index + 1 }}. {{ user.name }} : {{ user.uniquesShinyAmount }}&ndash;&gt;-->
      <!--        &lt;!&ndash;          </span>&ndash;&gt;-->
      <!--        &lt;!&ndash;          <br />&ndash;&gt;-->
      <!--        &lt;!&ndash;        </div>&ndash;&gt;-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
import { getAllUsers } from "@/services/auth";
import User from "@/types/User.interface";
import PokemonCard from "@/models/PokemonCard";

const users = ref();
const topUniques = ref();

const getTopUniques = () => {
  let topUniques: {
    name: string;
    uniquesAmount: number;
    uniquesShinyAmount: number;
  }[] = [];
  console.log("a");
  users.value.forEach((u: User) => {
    if (!u.pokemons) return;
    console.log("b");
    const uniquesAmount = u.pokemons
      .map((e: PokemonCard) => e["id"])
      .map(
        (e: number, i: number, final: number[]) => final.indexOf(e) === i && i
      )
      .filter((obj: PokemonCard) => u.pokemons[obj])
      .map((e: PokemonCard) => u.pokemons[e]).length;

    const uniquesShinyAmount = u.pokemons
      .map((e: PokemonCard) => e["id"])
      .map(
        (e: number, i: number, final: number[]) => final.indexOf(e) === i && i
      )
      .filter((obj: PokemonCard) => u.pokemons[obj])
      .map((e: PokemonCard) => u.pokemons[e])
      .filter((e: PokemonCard) => e.isShiny).length;

    topUniques.push({
      name: u.username || u.name || "",
      uniquesAmount: uniquesAmount,
      uniquesShinyAmount: uniquesShinyAmount,
    });
  });
  return topUniques.slice(0, 10);
};

const sortedData = (sortValue: string) => {
  if (!topUniques.value) return;
  return topUniques.value.sort((a: any, b: any) => {
    switch (sortValue) {
      case "unique":
        return a.uniquesAmount < b.uniquesAmount ? 1 : -1;
      case "shiny":
        return a.uniquesShinyAmount < b.uniquesShinyAmount ? 1 : -1;
      default:
        return 1;
    }
  });
};

onMounted(async () => {
  users.value = await getAllUsers();
  topUniques.value = getTopUniques();
});
</script>

<style scoped lang="postcss">
.first {
  @apply font-bold text-xl;
}
.second {
  @apply font-semibold text-lg;
}
.third {
  @apply font-medium text-base;
}
.ladder-content {
  @apply mt-10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  grid-gap: 150px;
  justify-content: center;
  padding: initial;
}
</style>
