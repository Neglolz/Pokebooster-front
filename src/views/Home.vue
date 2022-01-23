<template>
  <div class="home">
    <div>
      <br /><br />
      <h1 class="title v-align">
        <img src="@/assets/icons/zubat.png" alt="" class="mr-5" />
        Pokebooster ALPHA VERSION
        <img src="@/assets/icons/ronflex.png" alt="" class="ml-5" />
      </h1>
      <i
        >This is an early temporary version. Be ready to experience some bugs,
        and maybe some resets of your collection.</i
      >
      <br />
      <br />
      <br />
      <p class="mx-40">
        Pokebooster is a game were you open booster to complete your collection
        of pokemons. <br />
        Login now to start playing for free !
      </p>
      <br /><br />
      <GoogleLogin v-if="!store.state.isLoggedIn" />
      <router-link to="/inventory" v-else
        ><button class="log-button">My inventory</button></router-link
      >
      <br /><br /><br />
      <div class="home-content mx-auto container">
        <div class="home-item">
          <div>
            <img src="@/assets/icons/pokeballs.png" class="mb-3" alt="" />
          </div>
          <h2 class="subtitle">Open boosters</h2>
          <p>
            Win cards by opening boosters. You can win common to legendary card.
          </p>
        </div>
        <div class="home-item">
          <div>
            <img src="@/assets/icons/coloredpokedex.png" alt="" class="mb-3" />
          </div>
          <h2 class="subtitle">Fill your Pokedex</h2>
          <p>Complete your collection by getting all available cards.</p>
        </div>
        <div class="home-item">
          <div>
            <img src="@/assets/icons/release.png" class="mb-3" alt="" />
          </div>
          <h2 class="subtitle">Release cards</h2>
          <p>
            Get rewards by releasing cards you own. Based on what you release
            you get some specific rewards !
          </p>
        </div>
      </div>
      <div class="container mx-auto my-20">
        <img
          class="mx-auto"
          src="@/assets/images/booster.png"
          alt="booster"
          height="257"
          width="1000"
        />
      </div>
      <div class="container mx-auto px-20 my-20 flex justify-around text-right">
        <img
          src="@/assets/images/shiny.png"
          alt="SHINY CARD"
          height="350"
          width="250"
        />
        <div class="my-auto">
          <img
            src="@/assets/icons/coloredstar.png"
            alt=""
            class="mb-3 ml-auto"
          />
          <h2 class="subtitle">Hunt shiny cards</h2>
          <p>You can get shiny cards wich are highly valuable.</p>
        </div>
      </div>
      <div class="container mx-auto px-20 my-20 flex justify-around text-left">
        <div class="my-auto mx-40">
          <img
            src="@/assets/icons/coloredarrow.png"
            alt=""
            class="mb-3 mr-auto"
          />
          <h2 class="subtitle">Climb the ladder</h2>
          <p>
            You can access the ladder of the users with most uniques pokemon,
            shiny, or event boosters opened.
          </p>
        </div>
        <img
          src="@/assets/images/ladder.png"
          alt="Ladder"
          height="400"
          width="300"
        />
      </div>
      <div class="mb-40">
        <div class="home-content mx-auto container mb-40 pb-30">
          <div class="home-item">
            <div>
              <img src="@/assets/icons/stats.png" alt="" class="mb-3" />
            </div>
            <h2 class="subtitle">Track your stats</h2>
            <p>
              Keep track of amount of card you have, amount of boosters you
              opened in your pokedex ...
            </p>
          </div>
          <div class="home-item">
            <div>
              <img src="@/assets/icons/coloredshop.png" alt="" class="mb-3" />
            </div>
            <h2 class="subtitle">Shop</h2>
            <p>
              Buy many types of boosters and item to boost your openings and
              rewards.
            </p>
          </div>
          <div class="home-item">
            <div>
              <img src="@/assets/icons/pokecoins.png" alt="" class="mb-3" />
            </div>
            <h2 class="subtitle">Claim rewards</h2>
            <p>You can claim free rewards on your inventory every 2 hours.</p>
          </div>
        </div>
      </div>
      <div class="mb-40">
        <h3 class="title">And more to come...</h3>
        <div class="mx-auto">
          <img src="@/assets/icons/wip.png" class="mx-auto" alt="" />
        </div>
        <ul class="mt-10">
          <li class="inline-flex v-align">
            <img src="@/assets/icons/stats.png" alt="" />
            Buy and sell card on the market
          </li>
          <li class="inline-flex v-align">
            Complete your badges by fighting in arenas
            <img src="@/assets/icons/redglove.png" alt="" />
          </li>
          <li class="inline-flex v-align">Multi language support</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GoogleLogin from "@/components/GoogleLogin.vue"; // @ is an alias to /src
import { useStore } from "vuex";

const store = useStore();
</script>
<style scoped lang="postcss">
.home-content {
  @apply mb-4;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(151px, 250px));
  grid-gap: 100px;
  justify-content: center;
  padding: initial;
}
.home-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
