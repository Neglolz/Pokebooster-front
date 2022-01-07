<template>
  <div id="nav" class="flex justify-between nav mb-10">
    <div class="v-align" v-if="!store.state.isLoggedIn">
      <router-link class="mx-1 v-align" to="/">
        <img
          class="float-right mr-1"
          src="@/assets/icons/home.png"
          alt=""
          height="16"
          width="16"
        />
        Home</router-link
      >
    </div>
    <div class="v-align" v-else>
      <router-link class="mx-1 v-align" to="/">
        <img
          class="float-right mr-1"
          src="@/assets/icons/home.png"
          alt=""
          height="16"
          width="16"
        />
        Home</router-link
      >
      |
      <!--      <a-->
      <!--        class="mx-1 v-align"-->
      <!--        href="/pokedex"-->
      <!--        :class="{-->
      <!--          'router-link-active router-link-exact-active':-->
      <!--            $route.name === 'Pokedex',-->
      <!--        }"-->
      <!--      >-->
      <!--        <img-->
      <!--          class="float-right mr-1"-->
      <!--          src="@/assets/icons/pokedex2.png"-->
      <!--          alt=""-->
      <!--          height="16"-->
      <!--          width="16"-->
      <!--        />-->
      <!--        Pokedex-->
      <!--      </a>-->
      <router-link class="mx-1 v-align" to="/pokedex">
        <img
          class="float-right mr-1"
          src="@/assets/icons/pokedex2.png"
          alt=""
          height="16"
          width="16"
        />
        Pokedex</router-link
      >
      |
      <!--      <a-->
      <!--        class="mx-1 v-align"-->
      <!--        href="/cards"-->
      <!--        :class="{-->
      <!--          'router-link-active router-link-exact-active':-->
      <!--            $route.name === 'Cards',-->
      <!--        }"-->
      <!--      >-->
      <!--        <img-->
      <!--          class="float-right mr-1"-->
      <!--          src="@/assets/icons/card.png"-->
      <!--          alt=""-->
      <!--          height="16"-->
      <!--          width="16"-->
      <!--        />-->
      <!--        Cards-->
      <!--      </a>-->
      <router-link class="mx-1 v-align" to="/cards">
        <img
          class="float-right mr-1"
          src="@/assets/icons/card.png"
          alt=""
          height="16"
          width="16"
        />
        Cards</router-link
      >
      |
      <router-link class="mx-1 v-align" to="/shop">
        <img
          class="float-right mr-1"
          src="@/assets/icons/shop.png"
          alt=""
          height="16"
          width="16"
        />
        Shop</router-link
      >
      |
      <!--      <a-->
      <!--        class="mx-1 v-align"-->
      <!--        href="/inventory"-->
      <!--        :class="{-->
      <!--          'router-link-active router-link-exact-active':-->
      <!--            $route.name === 'Inventory',-->
      <!--        }"-->
      <!--      >-->
      <!--        <img-->
      <!--          class="float-right mr-1"-->
      <!--          src="@/assets/icons/inventory.png"-->
      <!--          alt=""-->
      <!--          height="16"-->
      <!--          width="16"-->
      <!--        />-->
      <!--        Inventory-->
      <!--      </a>-->
      <router-link class="mx-1 v-align" to="/inventory">
        <img
          class="float-right mr-1"
          src="@/assets/icons/inventory.png"
          alt=""
          height="16"
          width="16"
        />
        Inventory</router-link
      >
      |
      <!--      <a-->
      <!--        class="mx-1 v-align"-->
      <!--        href="/ladder"-->
      <!--        :class="{-->
      <!--          'router-link-active router-link-exact-active':-->
      <!--            $route.name === 'Ladder',-->
      <!--        }"-->
      <!--      >-->
      <!--        <img-->
      <!--          class="float-right mr-1"-->
      <!--          src="@/assets/icons/ladder.png"-->
      <!--          alt=""-->
      <!--          height="16"-->
      <!--          width="16"-->
      <!--        />-->
      <!--        Ladder-->
      <!--      </a>-->
      <router-link class="mx-1 v-align" to="/ladder">
        <img
          class="float-right mr-1"
          src="@/assets/icons/ladder.png"
          alt=""
          height="16"
          width="16"
        />
        Ladder</router-link
      >
    </div>

    <GoogleLogin />
  </div>
  <router-view />
</template>
<script setup>
import GoogleLogin from "@/components/GoogleLogin";
// import { useRoute } from "vue-router";
import { useStore } from "vuex";

// const route = useRoute();
const store = useStore();

// export default {
//   components: {
//     GoogleLogin,
//   },
// };
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;

  a {
    color: white;
    font-weight: 400;

    &.router-link-exact-active {
      color: white;
      font-weight: 900;
    }
  }

  background-color: #e73f34;
  border-bottom: 4px solid black;
  color: white !important;
  font-weight: bold;
}
</style>
