<template>
  <a
    v-if="store.state.isLoggedIn && boosterAmount > 0"
    class="log-button cursor-pointer"
    @click="rollPokemon"
    href="#loader"
  >
    Open booster
  </a>
  <br />
  <teleport to="body" v-if="boosterIsOpened">
    <transition name="slide-fade" :duration="{ enter: 1000, leave: 50 }">
      <span v-if="hasRolled">
        <button
          class="log-button cursor-pointer"
          @click="boosterIsOpened = false"
        >
          Close Booster
        </button>
        <BoosterContent :booster="booster" />
      </span>
    </transition>
  </teleport>

  <div v-if="loading">
    <div>
      <PokeballLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps } from "vue";
import { useStore } from "vuex";
import {
  saveUser,
  getOwnedPokemons,
  getOwnedInventory,
  getBoostersAmountOpened,
} from "@/services/auth";
import Booster from "@/models/Booster";
import BoosterContent from "@/components/BoosterContent.vue";
import PokeballLoader from "@/components/PokeballLoader.vue";
import PokemonCard from "@/models/PokemonCard";
import { defineEmits } from "vue";
import { getImgUrl } from "@/utils/helpers";
import { boostersTypes } from "@/data/const";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});

const boosterIsOpened = ref(false);

const props = defineProps({
  boosterId: Number,
  boosterAmount: Number,
});

const boosterType = boostersTypes.filter((b) => b.id === props.boosterId)[0];
const options = {
  id: props.boosterId,
  // rarity?: string; // rarity obligatoire
  // minRarity?: string; // min rarity
  // cardsAmount?: number; // number of cards in booster
  type: boosterType.name,
  // isLastCard?: boolean;
};

let booster = new Booster();
const store = useStore();
const hasRolled = ref(false);
const loading = ref(false);

const emit = defineEmits(["update"]);

const rollPokemon = async () => {
  boosterIsOpened.value = true;
  hasRolled.value = false;
  loading.value = true;
  try {
    await booster.init(options);

    hasRolled.value = true;
    loading.value = false;
    await savePokemon();
    await removeBoosterFromLocalInventory();
    window.location = "#booster";
  } catch (e) {
    console.error(e);
    loading.value = false;
  }
};

const removeBoosterFromLocalInventory = async () => {
  let ownedInventory = await getOwnedInventory(store.state.user);
  const boostersAmountOpened = await getBoostersAmountOpened(store.state.user);

  //remove booster from inventory
  const foundIndex = ownedInventory.boosters.findIndex(
    (boosterType) => boosterType.id === props.boosterId
  );
  ownedInventory.boosters[foundIndex].amount -= 1;

  // update inventory in algolia
  const identity = {
    ...store.state.user,
    inventory: ownedInventory,
    totalBoostersAmountOpened: boostersAmountOpened + 1,
  };

  //update inventory locally (emit new inventory)
  emit("update", ownedInventory);

  if (!identity.objectID) return;
  await saveUser(identity);
  // await removeBoosterFromInventory(ownedInventory);
};

const savePokemon = async () => {
  try {
    let ownedPokemons = await getOwnedPokemons(store.state.user);
    ownedPokemons.push(booster.firstCard);
    ownedPokemons.push(booster.secondCard);
    ownedPokemons.push(booster.thirdCard);
    ownedPokemons.push(booster.fourthCard);
    ownedPokemons.push(booster.fifthCard);
    const identity = {
      ...store.state.user,
      pokemons: ownedPokemons,
    };

    if (!identity.objectID) return;
    await saveUser(identity);
  } catch (e) {
    console.error(e);
    toaster.error(e);
  }
};
</script>

<style scoped>
.log-button {
  @apply ml-4;
  @apply border-solid;
  @apply border-2;
  @apply py-1 px-3 rounded;
}
</style>
