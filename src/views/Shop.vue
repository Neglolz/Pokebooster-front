<template>
  <h1 class="title v-align">
    <img src="@/assets/icons/coloredshop.png" alt="" class="mr-5" />
    Shop
    <img src="@/assets/icons/coloredshop.png" alt="" class="ml-5" />
  </h1>

  <div class="container mx-auto shop-content">
    <div v-for="(item, i) in shopItems" :key="item.name" class="shop-item">
      <span class="inline-flex font-bold text-xl">
        {{ item.name }} Booster - {{ item.price }}
        <img
          src="@/assets/coin.svg"
          width="16"
          height="16"
          class="ml-1"
          alt="coins"
        />
      </span>
      <Popper
        hover
        :content="item.description"
        offsetDistance="-100"
        openDelay="1000"
      >
        <img
          :src="getImgUrl(item.image, 'backs', 'png')"
          alt=""
          class="my-4"
          width="255"
          height="355"
        />
      </Popper>
      <div>
        <input
          type="number"
          class="log-input"
          :ref="
            (el) => {
              if (el) divs[i] = el;
            }
          "
          value="1"
        />
        <button @click="buyItem(item, i)" class="log-button mb-10">Buy</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shop } from "@/data/shop";
import { getImgUrl } from "@/utils/helpers";
import { useStore } from "vuex";
import { getOwnedInventory, saveUser } from "@/services/auth";
import { Item } from "@/types/Item.interface";
import { createToaster } from "@meforma/vue-toaster";

import Popper from "vue3-popper";
import { onBeforeUpdate } from "vue";
import { ref } from "@vue/runtime-core";

const toaster = createToaster({
  /* options */
});
const store = useStore();
const shopItems = shop();
const divs = ref([] as any);
// make sure to reset the refs before each update
onBeforeUpdate(() => {
  divs.value = [];
});

const checkMoney = (money: number, price: number) => {
  if (money - price >= 0) return true;
  if (money - price < 0) {
    //add toaster error
    toaster.error("You don't have enough coins to buy this");
    return false;
  }
};

const buyItem = async (Item: Item, index: number) => {
  const boosterAmountToBuy = parseInt(divs.value[index].value) || 1;

  let ownedInventory = await getOwnedInventory(store.state.user);

  // check if user have enough money
  if (!checkMoney(ownedInventory.money, Item.price * boosterAmountToBuy))
    return;
  //reduce booster price from money in inventory
  // ownedInventory.money += shopItem.price;
  store.state.user.inventory.money -= Item.price * boosterAmountToBuy;

  //add booster to inventory
  const foundIndex = ownedInventory.boosters.findIndex(
    (boosterType) => boosterType.id === Item.id
  );
  ownedInventory.boosters[foundIndex].amount += boosterAmountToBuy;

  const identity = {
    ...store.state.user,
    inventory: ownedInventory,
  };
  if (!identity.objectID) return;
  await saveUser(identity);
  toaster.success(`${boosterAmountToBuy} ${Item.name} booster bought !`);
};
</script>

<style scoped lang="postcss">
.shop-content {
  @apply mt-10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(255px, max-content));
  grid-gap: 50px;
  justify-content: center;
  padding: initial;
}
.shop-item {
  @apply flex flex-col items-center;
}
</style>
