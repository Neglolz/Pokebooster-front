<template>
  <ul class="cards-split" id="booster" :class="{ transition: isOpened }">
    <li
      @click="isOpened = true"
      v-for="(card, index) in booster"
      :key="index"
      class="card"
      :class="index"
    >
      <CardBooster :card="card" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import CardBooster from "@/components/CardBooster.vue";
import { defineProps } from "vue";
import Booster from "@/models/Booster";
import { ref } from "@vue/runtime-core";

const isOpened = ref(false);

defineProps({
  booster: Booster,
});
</script>

<style scoped lang="scss">
.booster-content {
  //@apply flex flex-wrap mx-20 justify-center;
}
ul.cards-split {
  width: 100%;
  height: 450px;
  list-style-type: none;
  position: relative;
  margin: 0 auto 20px;
  padding: 20px;
  //cursor: pointer;
  li.title {
    margin: 0 0 20px;
    h2 {
      font-weight: 700;
    }
  }
  li.card {
    //background: #fff;
    overflow: visible;
    height: 355px;
    width: 256px;
    border-radius: 10px;
    position: absolute;
    left: 220px;
    //box-shadow: 1px 2px 2px 0 #aaa;
    transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.12);
    img {
      max-width: 100%;
      height: auto;
    }
    div.content {
      padding: 5px 10px;
      h1 {
      }
      p {
      }
    }

    &.firstCard {
      z-index: 10;
      transform: rotateZ(-2deg);
    }
    &.secondCard {
      z-index: 9;
      transform: rotateZ(-7deg);
      transition-delay: 0.05s;
    }
    &.thirdCard {
      z-index: 8;
      transform: rotateZ(5deg);
      transition-delay: 0.1s;
    }
    &.fourthCard {
      z-index: 7;
      transform: rotateZ(2deg);
      transition-delay: 0.2s;
    }
    &.fifthCard {
      z-index: 6;
      transform: rotateZ(1deg);
      transition-delay: 0.3s;
    }
  }

  &.transition {
    li.card {
      transform: rotateZ(0deg);
      &.firstCard {
        left: 0%;
      }

      &.secondCard {
        left: 20%;
      }

      &.thirdCard {
        left: 40%;
        //left: 600px;
      }

      &.fourthCard {
        left: 60%;
        //left: 900x;
      }

      &.fifthCard {
        left: 80%;
      }
    }
  }
}
</style>
