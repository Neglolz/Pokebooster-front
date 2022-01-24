<template>
  <div class="flip-container" :class="{ flip: isFlipped }">
    <div class="flipper">
      <div class="front">
        <div
          :class="[
            card.isShiny
              ? `hover:shadow-rshiny`
              : `hover:shadow-r${card.rarity}`,
          ]"
          class="back-card"
          @click="flipCard"
        >
          <img
            src="@/assets/back_card.png"
            class="rounded-xl"
            :class="[
              card.isShiny
                ? `hover:shadow-rshiny`
                : `hover:shadow-r${card.rarity}`,
            ]"
            alt=""
            height="330"
            width="256"
          />
        </div>
      </div>
      <div
        class="back"
        :class="[
          card.isShiny ? `hover:shadow-rshiny` : `hover:shadow-r${card.rarity}`,
        ]"
      >
        <div
          :class="[
            `safe bg-${card.typeList[0].toLowerCase()}`,
            card.isShiny ? 'pokemon-card-shiny' : 'pokemon-card',
            card.isShiny
              ? `hover:shadow-rshiny`
              : `hover:shadow-r${card.rarity}`,
          ]"
        >
          <div class="header">
            {{ card.name }}<br />
            <div>
              <img
                v-for="type in card.typeList"
                :key="type"
                :src="getImgUrl(type, 'types', 'svg')"
                :alt="type"
                class="types-icon"
              />
            </div>
          </div>
          <div
            :class="[
              card.typeList[0],
              card.isShiny ? 'content-image-shiny' : 'content-image',
            ]"
          >
            <img :src="card.image" alt="" class="mx-auto pokemon-image" />
          </div>
          <div :class="[card.isShiny ? 'sub-image-shiny' : 'sub-image']">
            N°{{ card.id }} -
            {{ card.species.substring(0, card.species.length - 8) }} -
            {{ card.height / 10 }} m / {{ card.weight / 10 }} kg
          </div>
          <div class="content text-center v-align">
            {{ getFirstSentence(card.description) }}
          </div>
          <!--          <div class="aa">-->
          <div class="rarity">
            <span v-for="i in card.rarity" :key="i">
              <img
                src="@/assets/icons/shinystar.png"
                class="star"
                v-if="card.isShiny && card.isShiny === true"
                alt=""
              />
              <img src="@/assets/star.svg" class="star" alt="" v-else />
            </span>
            <!--            </div>-->
          </div>

          <div class="evolution" v-if="card.nextEvolution.id > 0">
            <span>
              <img
                :class="[
                  card.isShiny ? 'evolution-image-shiny' : 'evolution-image',
                ]"
                :src="card.nextEvolution.image"
                alt=""
              />
            </span>
          </div>
          <div class="stats">
            <span>
              <img
                src="@/assets/icons/sword.png"
                alt="atk"
                width="16"
                height="16"
                class="mx-auto"
              />{{ card.stats.atq }}</span
            >
            <span>
              <img
                src="@/assets/icons/shield.png"
                alt="def"
                width="16"
                height="16"
                class="mx-auto"
              />{{ card.stats.def }}</span
            >
            <span>
              <img
                src="@/assets/icons/heart.png"
                alt="hp"
                width="16"
                height="16"
                class="mx-auto"
              />{{ card.stats.hp }}</span
            >
            <span>
              <img
                src="@/assets/icons/spd.png"
                alt="spd"
                width="16"
                height="16"
                class="mx-auto"
              />{{ card.stats.spd }}</span
            >

            <br />
            <!--            {{ card.stats }}-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { getImgUrl, getFirstSentence } from "@/utils/helpers";
import PokemonCard from "@/models/PokemonCard";
import { ref } from "@vue/runtime-core";

const props = defineProps({
  card: PokemonCard,
});
const isFlipped = ref(false);
const flipCard = () => {
  isFlipped.value = true;
};
// const p = ref({});
// watch(props.pokemonRolled, (pokemonRolled, prevPokemonRolled) => {
//   pokemonImage.value = await getPokemon(props.pokemonRolled.id);
// });

// const getImgUrl = (pic: string) => {
//   return require("@/assets/types/" + pic + ".svg");
// };
// onMounted(() => {});
// import { onMounted, ref } from "@vue/runtime-core";
//
</script>

<style scoped lang="postcss">
.evolution-image {
  @apply border-2 border-yellow-400;
  position: absolute;
  left: 196px;
  top: 30px;
  background-color: lightgray;
  z-index: 10;
  border-radius: 50%;
  width: 47px;
}
.evolution-image-shiny {
  position: absolute;
  left: 196px;
  top: 30px;
  background-color: lightgray;
  z-index: 10;
  border-radius: 50%;
  width: 47px;
  border: 2px solid beige;
}
.stats {
  @apply text-center flex justify-center;
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.stats > span {
  @apply mx-3;
  width: 30px;
}
.header {
  @apply flex pt-2 px-4 justify-between font-black;
  @apply z-10 relative;
}
.content-image {
  @apply bg-white mx-4 border-2 border-yellow-500 mt-2 shadow;
  @apply z-10 relative;
}
.content-image-shiny {
  @apply bg-white mx-4 border-2 border-yellow-50 mt-2 shadow;
  @apply z-10 relative;
}
.pokemon-image {
  width: 150px;
  height: 150px;
  position: relative;
}
.sub-image {
  @apply bg-yellow-500 text-xs font-extralight text-center mx-auto;
  width: 216px;
  @apply z-10 relative;
}
.sub-image-shiny {
  @apply bg-yellow-50 text-xs font-extralight text-center mx-auto;
  width: 216px;
  @apply z-10 relative;
}
.content {
  @apply font-medium text-xs px-4;
  @apply z-10 absolute;
  height: 56px;
  bottom: 36px;
  text-align: center;
  width: 100%;
}
.star {
  width: 30px;
  @apply mx-auto ml-1;
}
.rarity {
  @apply flex justify-center;
  @apply z-10;
  left: 50%;
  bottom: 8px;
  position: absolute;
  transform: translateX(-50%);
}

.pokemon-card {
  @apply border-yellow-400 border-4 rounded-xl mx-auto shadow;
  /*@apply transition-shadow duration-500;*/
  cursor: default;

  position: relative;
  display: inline-block;
  width: 256px;
  height: 355px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.pokemon-card-shiny {
  @apply border-yellow-50 border-4 rounded-xl mx-auto shadow;
  /*@apply transition-shadow duration-500;*/
  cursor: default;

  position: relative;
  display: inline-block;
  width: 256px;
  height: 355px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.pokemon-card:before,
.pokemon-card-shiny:before {
  /*opacity: 0.2;*/
  border-radius: 8px;
  background-image: url("./../assets/smoke.png");
  background-position: center center;
  background-size: cover;

  content: " ";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.3;
}
.pokemon-card::after,
.pokemon-card-shiny::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  @apply shadow;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
/* Scale up the box */
.pokemon-card:hover,
.pokemon-card-shiny:hover {
  transform: scale(1.07, 1.07);
  -webkit-transform: scale(1.07, 1.07);
}
/* Fade in the pseudo-element with the bigger shadow */
.pokemon-card:hover::after,
.pokemon-card-shiny:hover::after {
  opacity: 1;
}
.back-card {
  @apply pb-10 rounded-xl mx-auto shadow;
  /*@apply transition-shadow duration-500;*/
  cursor: pointer;

  position: relative;
  display: inline-block;
  width: 256px;
  height: 343px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.back-card::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  @apply shadow;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
/* Scale up the box */
.back-card:hover {
  transform: scale(1.07, 1.07);
  -webkit-transform: scale(1.07, 1.07);
}
/* Fade in the pseudo-element with the bigger shadow */
.back-card:hover::after {
  opacity: 1;
}
.types-icon {
  width: 20px;
  height: 20px;
  float: right;
  margin-left: 3px;
  @apply border-white border rounded-full;
}

/* entire container, keeps perspective */
.flip-container {
  perspective: 1000px;
  @apply m-6;
}
/* flip the pane when clicked */
/*.flip-container:hover .flipper,*/
.flip-container.hover .flipper,
.flip-container.flip .flipper {
  transform: rotateY(180deg);
}
.flip-container,
.front,
.back {
  width: 256px;
  height: 355px;
}
/* flip speed goes here */
.flipper {
  transition: 0.8s;
  transform-style: preserve-3d;
  position: relative;
}
/* hide back of pane during swap */
.front,
.back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
/* front pane, placed above back */
.front {
  z-index: 2;
  /* for firefox 31 */
  transform: rotateY(0deg);
}
/* back, initially hidden pane */
.back {
  transform: rotateY(180deg);
}

/*html,*/
/*body {*/
/*  margin: 0;*/
/*}*/
/*body:after {*/
/*  content: "click to update";*/
/*  font-size: 0.8em;*/
/*  color: rgba(0, 0, 0, 0.3);*/
/*  position: fixed;*/
/*  width: 100%;*/
/*  bottom: 1em;*/
/*  text-align: center;*/
/*}*/

#card {
  /*overflow: hidden;*/
  /*width: 1px;*/
  /*height: 1px;*/
  /*transform: translate(-100%, -100%);*/
  /*border-radius: 50%;*/
  filter: url(#filter);
}
</style>
