<template>
  <div ref="cloud" id="cloud"></div>

  <svg width="0">
    <filter id="filter">
      <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="10" />
      <feDisplacementMap in="SourceGraphic" scale="240" />
    </filter>
  </svg>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";

function rn(from, to) {
  return ~~(Math.random() * (to - from + 1)) + from;
}

function rs() {
  return arguments[rn(1, arguments.length) - 1];
}

function boxShadows(max) {
  let ret = [];
  for (let i = 0; i < max; ++i) {
    ret.push(`
      ${rn(1, 100)}vw ${rn(1, 100)}vh ${rn(20, 40)}vmin ${rn(1, 20)}vmin
      ${rs("#11cbd7", "#c6f1e7", "#f0fff3", "#43dbad")}
    `);
  }
  return ret.join(",");
}

const cloud = ref("cloud");
function update() {
  cloud.value.style.boxShadow = boxShadows(100);
}
onMounted(() => {
  update();
});

// window.addEventListener('load', update);
// document.addEventListener('click', update);
</script>

<style scoped>
html,
body {
  margin: 0;
}
body:after {
  content: "click to update";
  font-size: 0.8em;
  color: rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  bottom: 1em;
  text-align: center;
}

#cloud {
  overflow: hidden;
  width: 1px;
  height: 1px;
  transform: translate(-100%, -100%);
  border-radius: 50%;
  filter: url(#filter);
}
</style>
