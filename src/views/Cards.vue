<template>
  <div>
    <!-- use the modal component, pass in the prop -->
    <teleport to="body">
      <transition name="modal">
        <Modal v-if="showRewardsModal" @close="showRewardsModal = false">
          <!--
              you can use custom content here to overwrite
              default content
            -->
          <template v-slot:header>
            <h1 class="title">Rewards</h1>
          </template>
          <template v-slot:body>
            <div class="mb-4">
              <h1 class="title mx-auto w-fit text-center">
                Rewards for your {{ rewards.pokemonsReleased }} pokemons
                released :
              </h1>
              <h1
                class="title mx-auto w-fit"
                style="width: fit-content !important"
              >
                {{ rewards.coins }}
                <img
                  src="@/assets/coin.svg"
                  width="30"
                  height="30"
                  class="ml-1 float-right"
                  alt="coins"
                />
              </h1>
            </div>
            <div class="rewards-content container mx-auto">
              <div
                class="rewards-item v-align"
                v-for="booster in rewards.boosterTyped"
                :key="booster.name"
              >
                <span class="font-bold text-xl">
                  {{ booster.amount }} X {{ booster.name }}
                </span>
                <Popper
                  hover
                  :content="booster.description"
                  offsetDistance="-200"
                  openDelay="1000"
                >
                  <img
                    :src="getImgUrl(booster.image, 'backs', 'png')"
                    alt=""
                    class="my-1 mx-auto"
                    width="170"
                    height="243"
                /></Popper>
              </div>
              <div
                class="rewards-item"
                v-for="(card, index) in rewards.evolutionReward"
                :key="index"
              >
                <span class="font-bold text-xl">
                  {{ card.name }}
                </span>
                <CardPokedex :card="card" />
                <!--                <CardPokedex :card="card" style="transform: scale(0.65)" />-->
              </div>
            </div>
          </template>
        </Modal>
      </transition>
    </teleport>

    <teleport to="body">
      <transition name="modal">
        <ModalConfirm
          v-if="showConfirmModal"
          @close="showConfirmModal = false"
          @confirm="releaseDuplicates"
        >
          <!--
              you can use custom content here to overwrite
              default content
            -->
          <template v-slot:header>
            <h1 class="title">Release duplicates</h1>
          </template>
          <template v-slot:body>
            <div class="mb-4">
              <h1 class="title mx-auto w-fit text-center">
                Do you want to release all your duplicates?
              </h1>
            </div>
          </template>
        </ModalConfirm>
      </transition>
    </teleport>

    <h1 class="title v-align">
      <img src="@/assets/icons/cards.png" alt="" class="mr-5" />
      Cards collection
      <img src="@/assets/icons/cards.png" alt="" class="ml-5" />
    </h1>
    <br />
    <button class="log-button" @click="setSelectState">
      <span v-if="!canSelect">Select</span>
      <span v-else>Cancel</span>
    </button>
    <button class="log-button" @click="showConfirmModal = true">
      <span>Release Duplicates</span>
    </button>
    <button
      class="log-button"
      @click="release()"
      v-if="cardsSelected.length > 0"
    >
      Release Selection
    </button>
    <input
      type="text"
      placeholder="search..."
      class="log-input"
      v-model="searchInput"
    />
    <select
      name="shown"
      id="shown"
      class="border log-button"
      v-model="cardsShown"
    >
      <option :value="20">20</option>
      <option :value="50">50</option>
      <option :value="100">100</option>
    </select>
    <select name="sort" id="sort" class="border log-button" v-model="sort">
      <option value="">Order by</option>
      <option value="id">ID</option>
      <option value="rarity">Rarity</option>
      <option value="type">Type</option>
      <option value="name">Name</option>
      <option value="isShiny">Shiny</option>
    </select>
    <button class="log-button" @click="order = -order">
      <span class="flex" v-if="order === -1"
        >asc <img src="@/assets/up.svg" width="16" class="ml-1" alt="asc"
      /></span>
      <span class="flex" v-if="order === 1"
        >dsc <img src="@/assets/down.svg" width="16" class="ml-1" alt="asc"
      /></span>
    </button>
    <br />
    <div class="select-item">
      <!---->
      <div class="relative">
        <div
          class="flex items-center flex-wrap rounded-md min-h-10 overflow-hidden select-items-container log-multibutton"
          @mouseover="isHoveringRarityFilter = true"
          @mouseleave="isHoveringRarityFilter = false"
        >
          <Popper
            v-for="rarity in pokemonsRarities"
            :key="rarity"
            hover
            arrow
            :content="`${capitalize(getRarityName(rarity))} cards`"
          >
            <div
              style="height: calc(40px - 2px)"
              class="group p-1 w-10 cursor-pointer"
              :class="rarityClass(rarity)"
              @click="setRarityFilter(rarity)"
              @mouseenter="setHover(rarity)"
            >
              <b
                class="w-full h-full flex items-center justify-center rounded text-white"
                :class="`bg-${getRarityName(rarity).toLowerCase()}`"
              >
                <span v-if="rarity !== 6">
                  {{ getRarityName(rarity).charAt(0) }}
                </span>
                <span v-else>
                  {{ getRarityName(rarity).substring(0, 2) }}
                </span>
              </b>
            </div>
          </Popper>
          <!---->

          <button
            style="height: calc(40px - 2px)"
            class="group px-2 focus:outline-none cursor-pointer hover:opacity-75"
            :class="{ 'opacity-25': !areAllRarityFiltersActive() }"
            @click="setAllRarityFilter()"
          >
            <p class="rounded border-2 px-2 py-0.5 text-xs font-bold">ALL</p>
          </button>
        </div>
      </div>
      <!---->
    </div>
    <br />
    <div class="select-item">
      <!---->
      <div class="relative">
        <div
          class="flex items-center flex-wrap rounded-md min-h-10 overflow-hidden select-items-container log-multibutton"
          @mouseover="isHoveringTypeFilter = true"
          @mouseleave="isHoveringTypeFilter = false"
        >
          <!---->
          <Popper
            v-for="type in pokemonsTypes"
            :key="type"
            hover
            arrow
            :content="`${type} Pokemons`"
          >
            <div
              style="height: calc(40px - 2px)"
              class="group p-1 w-10 cursor-pointer"
              :class="typeClass(type)"
              @click="setTypeFilter(type)"
              @mouseover="setTypeHover(type)"
            >
              <b
                class="w-full h-full flex items-center justify-center rounded text-white"
                :class="`bg-${type.toLowerCase()}`"
              >
                <img
                  :src="getImgUrl(type, 'types', 'svg')"
                  :alt="type"
                  class="types-icon"
                />
              </b>
            </div>
          </Popper>
          <button
            style="height: calc(40px - 2px)"
            class="group px-2 focus:outline-none cursor-pointer hover:opacity-75"
            :class="{ 'opacity-25': !areAllTypeFiltersActive() }"
            @click="setAllTypeFilter()"
          >
            <p class="rounded border-2 px-2 py-0.5 text-xs font-bold">ALL</p>
          </button>
        </div>
      </div>
      <!---->
    </div>
    <br />
    <!--    POKEDEX LIST OF CARDS OWNED-->
    <div
      class="projects pokedex-content container mx-auto"
      v-if="pagedData.length > 0"
    >
      <transition-group name="projects">
        <CardPokedex
          v-for="card in pagedData"
          :key="card.uuid"
          :card="card"
          class="project"
          :isSelectable="canSelect"
          :isSelected="isCardSelected(card)"
          @click="handleCard(card)"
        />
      </transition-group>
    </div>

    <div class="projects pokedex-content container mx-auto" v-else>
      No pokemons
    </div>
    <!--    PAGINATION-->
    <div class="mb-52 mt-8">
      <button class="log-button" v-if="page > 1" @click="page--">Prev</button>
      <button class="log-button" v-if="page > 1" @click="page--">
        {{ page - 1 }}
      </button>
      <button class="log-button">{{ page }}</button>
      <button
        class="log-button"
        v-if="cardsShown * page < sortedData.length"
        @click="page++"
      >
        {{ page + 1 }}
      </button>
      <button
        class="log-button"
        v-if="cardsShown * page < sortedData.length"
        @click="page++"
      >
        Next
      </button>
    </div>
    <div class="container mx-auto" v-if="!store.state.isLoggedIn">
      You need to be Logged in to see your pokedex
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/runtime-core";
import { getOwnedPokemons, saveUser } from "@/services/auth";
import { useStore } from "vuex";
import { computed } from "vue";
import CardPokedex from "@/components/CardPokedex.vue";
import PokemonCard from "@/models/PokemonCard";
import { createToaster } from "@meforma/vue-toaster";
import { pullAllBy, pull } from "lodash";
import { getReleaseRewards } from "@/utils/pokemon";
import Popper from "vue3-popper";
import { getImgUrl, capitalize } from "@/utils/helpers";
import { pokemonsTypes, pokemonsRarities } from "@/data/const";
import { getRarityName } from "@/utils/pokemon";
import Modal from "@/components/Modal.vue";
import ModalConfirm from "@/components/ModalConfirm.vue";

const toaster = createToaster({
  /* options */
});

const searchInput = ref("");
const sort = ref("");
const store = useStore();
// let pokedex = ref(store.state.user.pokemons);
const order = ref(1);
const canSelect = ref(false);
const cardsSelected = ref([] as PokemonCard[]);
const showRewardsModal = ref(false);
const showConfirmModal = ref(false);

const pokedex = computed(() => {
  return store.state.user.pokemons;
});

//RARITY Filters
//switch case
//si selectionné et non hover => opacité 100%
// si non selectionné et non hover => opacité 25%
// si selectionné et hover => opacité 75%
// si non selectioné et hover => opacité 100%
// si tous les filtres sont selectionnée et hover => opacity 100%
// si tous les filtres sont selectionnées et non hover => opacity 25%
const rarityFilter = ref([] as number[]);
const hoveredRarityFilter = ref(0);
const isHoveringRarityFilter = ref(false);
const isBaseRarityFilter = ref(true);
const rarityClass = (rarity: number) => {
  if (areAllRarityFiltersActive() && isHoveringRarityFilter.value) {
    switch (true) {
      case hoveredRarityFilter.value === rarity:
        return "opacity-100";
      case hoveredRarityFilter.value !== rarity:
        return "opacity-25";
    }
  } else {
    switch (true) {
      case isRaritySelected(rarity) && hoveredRarityFilter.value !== rarity:
        return "opacity-100";
      case !isRaritySelected(rarity) && hoveredRarityFilter.value !== rarity:
        return "opacity-25";
      case isRaritySelected(rarity) && hoveredRarityFilter.value === rarity:
        return "opacity-75";
      case !isRaritySelected(rarity) && hoveredRarityFilter.value === rarity:
        return "opacity-100";
    }
  }
};
const setHover = (rarity: number) => {
  hoveredRarityFilter.value = rarity;
};
const areAllRarityFiltersActive = () => {
  return (
    rarityFilter.value.length >= pokemonsRarities.length ||
    rarityFilter.value.length === 0
  );
};
const setAllRarityFilter = () => {
  rarityFilter.value = pokemonsRarities;
};
const setRarityFilter = (rarity: number) => {
  isBaseRarityFilter.value = false;
  if (
    isRaritySelected(rarity) &&
    rarityFilter.value.length < pokemonsRarities.length &&
    rarityFilter.value.length !== 0
  ) {
    //si la rareté est selectionée et que tous les filtre ne sont pas selectionées on enlève la rareté
    pull(rarityFilter.value, rarity);
    return;
  }
  if (rarityFilter.value.length >= pokemonsRarities.length) {
    //si tous les filtres sont selectionées on les supprime tous et on ajoute le filtre
    rarityFilter.value = [];
    rarityFilter.value.push(rarity);
    return;
  }
  rarityFilter.value.push(rarity);
};
const isRaritySelected = (rarity: number) => {
  if (areAllRarityFiltersActive()) return true;
  return rarityFilter.value.includes(rarity);
};

//TYPE Filters
//switch case
//si selectionné et non hover => opacité 100%
// si non selectionné et non hover => opacité 25%
// si selectionné et hover => opacité 75%
// si non selectioné et hover => opacité 100%
// si tous les filtres sont selectionnée et hover => opacity 100%
// si tous les filtres sont selectionnées et non hover => opacity 25%
const typeFilter = ref([] as string[]);

const hoveredTypeFilter = ref("");
const isHoveringTypeFilter = ref(false);
const isBaseTypeFilter = ref(true);
const typeClass = (rarity: string) => {
  if (areAllTypeFiltersActive() && isHoveringTypeFilter.value) {
    switch (true) {
      case hoveredTypeFilter.value === rarity:
        return "opacity-100";
      case hoveredTypeFilter.value !== rarity:
        return "opacity-25";
    }
  } else {
    switch (true) {
      case isTypeSelected(rarity) && hoveredTypeFilter.value !== rarity:
        return "opacity-100";
      case !isTypeSelected(rarity) && hoveredTypeFilter.value !== rarity:
        return "opacity-25";
      case isTypeSelected(rarity) && hoveredTypeFilter.value === rarity:
        return "opacity-75";
      case !isTypeSelected(rarity) && hoveredTypeFilter.value === rarity:
        return "opacity-100";
    }
  }
};
const setTypeHover = (rarity: string) => {
  hoveredTypeFilter.value = rarity;
};
const areAllTypeFiltersActive = () => {
  return (
    typeFilter.value.length >= pokemonsTypes.length ||
    typeFilter.value.length === 0
  );
};
const setAllTypeFilter = () => {
  typeFilter.value = pokemonsTypes;
};
const setTypeFilter = (rarity: string) => {
  isBaseTypeFilter.value = false;
  // console.log("setRarityFilter", rarity);
  if (
    isTypeSelected(rarity) &&
    typeFilter.value.length < pokemonsTypes.length &&
    typeFilter.value.length !== 0
  ) {
    //si la rareté est selectionée et que tous les filtre ne sont pas selectionées on enlève la rareté
    pull(typeFilter.value, rarity);
    return;
  }
  if (typeFilter.value.length >= pokemonsTypes.length) {
    //si tous les filtres sont selectionées on les supprime tous et on ajoute le filtre
    typeFilter.value = [];
    typeFilter.value.push(rarity);
    return;
  }
  typeFilter.value.push(rarity);
};
const isTypeSelected = (rarity: string) => {
  if (areAllTypeFiltersActive()) return true;
  return typeFilter.value.includes(rarity);
};

const setSelectState = () => {
  cardsSelected.value = [];
  canSelect.value = !canSelect.value;
};

const rewards = ref({});
const release = async () => {
  if (cardsSelected.value.length === 0) {
    toaster.info("You need to select Pokemons to release");
    return;
  }
  canSelect.value = false;
  let ownedPokemons = await getOwnedPokemons(store.state.user);
  try {
    pullAllBy(ownedPokemons, cardsSelected.value, "uuid");
  } catch (e) {
    toaster.error("You tried to release pokemons you don't own");
    console.error(e);
  }

  const identity = {
    ...store.state.user,
    pokemons: ownedPokemons,
  };

  if (!identity.objectID) return;
  try {
    //save in api
    await saveUser(identity);
    // updateStore
    await store.dispatch("updateUserPokemons");

    rewards.value = await getReleaseRewards(cardsSelected.value);
    showRewardsModal.value = true;

    toaster.success(
      `Successfully released ${cardsSelected.value.length} pokemons`
    );
    cardsSelected.value = [];
  } catch (e) {
    toaster.error(e);
  }
};
const handleCard = (cardSelected: PokemonCard) => {
  if (!canSelect.value) return;
  if (isCardSelected(cardSelected)) {
    const indexCardToDeselect = indexSelectedCard(cardSelected);
    cardsSelected.value.splice(indexCardToDeselect, 1);

    return;
  }
  cardsSelected.value.push(cardSelected);
};
const isCardSelected = (card: PokemonCard) => {
  return indexSelectedCard(card) !== -1;
};
const indexSelectedCard = (cardSelected: PokemonCard) => {
  return cardsSelected.value.findIndex(
    (card: PokemonCard) => card.uuid === cardSelected.uuid
  );
};

const allFilters = computed(() => {
  return [{ rarity: rarityFilter.value }, { typeList: typeFilter.value }];
});

const isItemValid = (card: PokemonCard): boolean => {
  return allFilters.value.every((filters: any) => {
    // ex: rarity
    const filterCategory = Object.keys(filters)[0];
    //  ex: ['COMMON', 'RARE']
    const selectedFilters = filters[filterCategory];
    // ex: 'COMMON'
    if (selectedFilters.length === 0) {
      return true;
    } // stop if there is no filters

    let cardValue;
    let cardValue2;
    if (filterCategory === "typeList") {
      cardValue = card[filterCategory][0];
      if (card[filterCategory].length > 1) cardValue2 = card[filterCategory][1];
    } else {
      cardValue = card[filterCategory];
    }

    // ex: rarity 'EPIC' is not included in ['COMMON', 'RARE']
    if (
      !selectedFilters.toString().includes(cardValue) &&
      !selectedFilters.toString().includes(cardValue2)
    ) {
      // console.log(
      //   `Value ${cardValue} and ${cardValue2} for key "${filterCategory}" invalid, expected value: ${selectedFilters}`
      // );
      // object is invalid, stop looping and go next item
      return false;
    }
    return true;
  });
};

const sortedData = computed(() => {
  if (!store.state.user.pokemons) return;
  //search
  const searchedData = pokedex.value.filter((item: PokemonCard) =>
    JSON.stringify(item)
      .toLowerCase()
      .includes(searchInput.value ? searchInput.value.toLowerCase() : "")
  );

  //filter
  const filterData = (pokedex: PokemonCard[]) => {
    return pokedex.filter((card: PokemonCard) => isItemValid(card));
  };
  const filteredData = filterData(searchedData);

  //sort
  return filteredData.sort((a: PokemonCard, b: PokemonCard) => {
    switch (sort.value) {
      case "rarity":
        return a.rarity < b.rarity ? -1 * order.value : 1 * order.value;
      case "id":
        return a.id < b.id ? -1 * order.value : 1 * order.value;
      case "type":
        return a.typeList[0] < b.typeList[0]
          ? -1 * order.value
          : 1 * order.value;
      case "name":
        return a.name < b.name ? -1 * order.value : 1 * order.value;
      case "isShiny":
        return a.isShiny < b.isShiny ? 1 * order.value : -1 * order.value;
      default:
        return 1;
    }
  });
});

const pagedData = computed(() => {
  return sortedData.value?.slice(
    cardsShown.value * page.value - cardsShown.value,
    cardsShown.value * page.value
  );
});

const page = ref(1);
const cardsShown = ref(20);

const releaseDuplicates = async () => {
  const duplicateIds = store.state.user.pokemons
    .map((e: PokemonCard) => e["id"])
    .map((e: number, i: number, final: number[]) => final.indexOf(e) !== i && i)
    .filter(
      (obj: PokemonCard, i: number) =>
        store.state.user.pokemons[i].id === obj.id
    )
    .map((e: PokemonCard) => {
      if (!store.state.user.pokemons[e.id].isShiny)
        return store.state.user.pokemons[e.id]["uuid"];
    });

  // enregistre les cartes dupliquées en selectionné
  cardsSelected.value = store.state.user.pokemons.filter(
    (obj: PokemonCard) => duplicateIds.includes(obj.uuid) && !obj.isShiny
  );
  await release();
  showConfirmModal.value = false;
};
</script>

<style scoped>
.pokedex-content {
  @apply mt-10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, max-content));
  grid-gap: 9px;
  justify-content: center;
  padding: initial;
}

.project {
  transition: all 0.35s ease-in-out;
}

.select-item {
  @apply mt-4;
  display: inline-block;
}
.types-icon {
  width: 20px;
  height: 20px;
  /*float: right;*/
  /*margin-left: 3px;*/
  @apply border-white border rounded-full;
}
.rewards-content {
  @apply mb-4;
  overflow: scroll;
  max-height: 350px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(151px, max-content));
  grid-gap: 40px;
  justify-content: center;
  padding: initial;
}
.rewards-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
