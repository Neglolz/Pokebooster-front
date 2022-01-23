<template>
  <div
    :class="[
      `safe bg-${card.typeList[0].toLowerCase()} hover:shadow-r${card.rarity}`,
      {
        selectable: isSelectable && !isSelected,
      },
      { 'cursor-pointer': isSelectable },
      card.isShiny ? 'pokemon-card-shiny' : 'pokemon-card',
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
    <div :class="card.isShiny ? 'sub-image-shiny' : 'sub-image'">
      N°{{ card.id }} -
      {{ card.species.substring(0, card.species.length - 8) }} -
      {{ card.height / 10 }} m / {{ card.weight / 10 }} kg
    </div>

    <div class="evolution" v-if="card.nextEvolution.id">
      <span>
        <img
          :class="[card.isShiny ? 'evolution-image-shiny' : 'evolution-image']"
          :src="card.nextEvolution.image"
          alt=""
        />
      </span>
    </div>
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
    </div>
    <div class="stats" v-if="card.stats">
      <span>
        <img
          src="@/assets/icons/sword.png"
          alt="atk"
          width="14"
          height="14"
          class="mx-auto"
        />{{ card.stats.atq }}</span
      >
      <span>
        <img
          src="@/assets/icons/shield.png"
          alt="def"
          width="14"
          height="14"
          class="mx-auto"
        />{{ card.stats.def }}</span
      >
      <span>
        <img
          src="@/assets/icons/heart.png"
          alt="hp"
          width="14"
          height="14"
          class="mx-auto"
        />{{ card.stats.hp }}</span
      >
      <span>
        <img
          src="@/assets/icons/spd.png"
          alt="spd"
          width="14"
          height="14"
          class="mx-auto"
        />{{ card.stats.spd }}</span
      >

      <br />
      <!--            {{ card.stats }}-->
    </div>
    <div v-else class="content">
      {{ card.description.substring(0, 45) }} ...
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { getImgUrl } from "@/utils/helpers";

defineProps({
  card: Object,
  isSelectable: Boolean,
  isSelected: Boolean,
});
</script>

<style scoped lang="postcss">
.evolution-image {
  @apply border-2 border-yellow-400;
  position: absolute;
  left: 125px;
  top: 30px;
  background-color: lightgray;
  z-index: 11;
  border-radius: 50%;
  width: 39px;
}
.evolution-image-shiny {
  position: absolute;
  left: 125px;
  top: 30px;
  background-color: lightgray;
  z-index: 11;
  border-radius: 50%;
  width: 39px;
  border: 2px solid beige;
}
.stats {
  @apply text-center flex justify-center text-xs;
  position: absolute;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.stats > span {
  @apply mx-1;
  width: 25px;
}
.selectable {
  opacity: 0.5;
}
.cursor-pointer {
  cursor: pointer !important;
}
.header {
  @apply flex pt-2 px-3 justify-between font-black;
  @apply z-10 relative;
}
.content-image {
  @apply bg-white mx-2 border-2 border-yellow-500 mt-2 shadow;
  @apply z-10 relative;
}
.content-image-shiny {
  @apply bg-white mx-2 border-2 border-yellow-50 mt-2 shadow;
  @apply z-10 relative;
}
.pokemon-image {
  width: 100px;
  height: 100px;
  position: relative;
}
.sub-image {
  @apply bg-yellow-500 font-medium text-center mx-auto;
  width: 151px;
  @apply z-10 relative;
  font-size: 0.5rem;
}
.sub-image-shiny {
  @apply bg-yellow-50 font-medium text-center mx-auto;
  width: 151px;
  @apply z-10 relative;
  font-size: 0.5rem;
}
.content {
  @apply font-medium text-xs pt-2 px-1;
  @apply z-10 relative;
}
.star {
  width: 25px;
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
  @apply border-yellow-400 border-4 rounded-xl mx-1 my-1 shadow;
  /*@apply transition-shadow duration-500;*/
  cursor: default;

  position: relative;
  display: inline-block;
  width: 175px;
  height: 243px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.pokemon-card-shiny {
  @apply border-yellow-50 border-4 rounded-xl mx-1 my-1 shadow;
  /*@apply transition-shadow duration-500;*/
  cursor: default;

  position: relative;
  display: inline-block;
  width: 175px;
  height: 243px;
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
.pokemon-card:hover::after,
.pokemon-card-shiny:hover::after {
  opacity: 1;
}
.types-icon {
  width: 20px;
  height: 20px;
  float: right;
  margin-left: 3px;
  @apply border-white border rounded-full;
}
</style>
