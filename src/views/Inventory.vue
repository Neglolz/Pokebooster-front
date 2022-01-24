<template>
  <h1 class="title v-align">
    <img src="@/assets/icons/pokeballs.png" alt="" class="mr-5" />
    Inventory
    <img src="@/assets/icons/pokeballs.png" alt="" class="ml-5" />
  </h1>

  <div
    v-if="
      store.state.isLoggedIn && isRewardReady(store.state.user.lastRewardDate)
    "
  >
    <h1 class="title">Next Reward : Available !</h1>

    <button @click="getReward()" class="log-button mb-10">Get Reward</button>
    <br />
    lastReward : {{ new Date(store.state.user.lastRewardDate) }} <br />

    <!--    now : {{ new Date() }} <br />-->
    <!--    isRewardReady: {{ // isRewardReady(store.state.user.lastRewardDate) }}<br />-->
    <!--    time since last reward: {{ timeSinceLastReward }} <br />-->
  </div>
  <div v-else>
    <h1 class="title">Next Reward : Not ready</h1>
    lastReward : {{ new Date(store.state.user.lastRewardDate) }} <br />
  </div>
  <div
    class="container mx-auto justify-around px-20 py-20"
    v-if="store.state.user.inventory"
  >
    <div v-if="inventoryAmount === 0">
      <h1 class="title">
        Your inventory is empty. Visit <a href="/shop">shop</a> to buy some
        boosters!
      </h1>
    </div>

    <div class="inventory-content container mx-auto">
      <div
        class="inventory-item"
        v-for="booster in boosters"
        :key="booster.name"
      >
        <!--        <div v-if="booster.amount > 0">-->
        <span class="font-bold text-xl">
          {{ booster.amount }} {{ booster.name }}
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
            class="my-4 mx-auto"
            width="175"
            height="243"
        /></Popper>
        <br />

        <OpenBooster
          :booster-amount="booster.amount"
          :booster-id="booster.id"
          @update="updateInventory"
        />
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import {
  getLastRewardDate,
  getOwnedInventory,
  saveUser,
} from "@/services/auth";
import { ref } from "@vue/runtime-core";
import { getImgUrl } from "@/utils/helpers";
import OpenBooster from "@/components/OpenBooster.vue";
import { InventoryBooster } from "@/types/Inventory.interface";
import Popper from "vue3-popper";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});

const store = useStore();
const inventory = ref(store.state.user.inventory);

const inventoryAmount = computed(() => {
  let inventoryAmount = 0;
  if (!store.state.user.inventory.boosters) return;
  store.state.user.inventory.boosters.forEach((booster: InventoryBooster) => {
    inventoryAmount += booster.amount;
  });
  return inventoryAmount;
});
const updateInventory = (newInventory: InventoryBooster) => {
  inventory.value = newInventory;
};
const boosters = computed(() => {
  if (!store.state.user.inventory.boosters) return;
  return store.state.user.inventory.boosters.filter(
    (b: InventoryBooster) => b.amount > 0
  );
});

const isRewardReady = (lastRewardDate: number) => {
  // const now = Date.parse(new Date().toDateString());
  const now: any = new Date();

  // const last: number = Date.parse(new Date(lastRewardDate).toDateString());
  const last: any = new Date(lastRewardDate);
  return now - last >= 7199999;
  // return now - last >= 999;
};

const getReward = async () => {
  try {
    // check if 2 hours passes since last reward
    const lastDate = await getLastRewardDate(store.state.user);
    if (!isRewardReady(store.state.user.lastRewardDate)) {
      toaster.error("Reward is not ready yet");
      return;
    }

    // add 1 booster to inventory
    let ownedInventory = await getOwnedInventory(store.state.user);

    //add booster to inventory
    const foundIndex = ownedInventory.boosters.findIndex(
      (boosterType) => boosterType.id === 2
    );
    ownedInventory.boosters[foundIndex].amount += 1;

    const identity = {
      ...store.state.user,
      inventory: ownedInventory,
      lastRewardDate: new Date(),
    };
    if (!identity.objectID) return;
    await saveUser(identity);
    //
    toaster.success("You claimed your reward: 1 Better booster");
    // window.location.reload();
    //add toaster
  } catch (e) {
    console.error(e);
    toaster.error(e);
  }
};
</script>

<style scoped lang="postcss">
.inventory-content {
  @apply mt-10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, max-content));
  grid-gap: 40px;
  justify-content: center;
  padding: initial;
}
.inventory-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
