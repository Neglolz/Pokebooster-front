<template>
  <div>
    <span v-if="store.state.isLoggedIn" class="v-align">
      {{ store.state.user.inventory.money }}
      <img
        src="@/assets/coin.svg"
        width="20"
        height="20"
        class="ml-1"
        alt="coins"
      />
      <img
        :src="store.state.user.image"
        height="36"
        width="36"
        class="rounded-full ml-4"
        alt="user image"
      />
      <button class="log-button" @click="logout">Log out</button>
    </span>

    <button class="log-button" @click="login" v-if="!store.state.isLoggedIn">
      Login
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { getIdentity, installGoogleAuth, getGoogleUser } from "@/GoogleAuth";
import Cookie from "js-cookie";
import { useStore } from "vuex";
import options from "@/config/options";
import { watch } from "vue";
import {
  getLastRewardDate,
  getOwnedInventory,
  getOwnedPokemons,
  getUser,
} from "@/services/auth";
import { useRouter } from "vue-router";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});
const router = useRouter();
let gAuth: any;
const user = ref({}) as any;
const store = useStore();
const money = ref(store.state.user.inventory?.money);

watch(store.state, async () => {
  money.value = store.state.user.inventory?.money;
});
async function login() {
  await store.dispatch("signIn", gAuth);
}
async function logout() {
  await store.dispatch("signOut", gAuth);
  await router.replace("/");
  toaster.success("Disconnected");
}
function signOut(): void {
  if (!gAuth) return;
  gAuth.signOut();
}

onMounted(async () => {
  gAuth = await installGoogleAuth(options);

  const idToken = Cookie.get("idToken");
  if (!idToken) return;
  const ticket = await getGoogleUser(options, idToken);
  if (!ticket) {
    await logout();
    return;
  }
  const identity = getIdentity(ticket);
  await getUser(identity);
});
</script>

<style scoped lang="postcss">
.log-button {
  @apply ml-4;
  @apply border-solid;
  @apply border-2;
  @apply py-1 px-3 rounded;
}
</style>
