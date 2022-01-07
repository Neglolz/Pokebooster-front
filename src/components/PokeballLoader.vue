<template>
  <teleport to="body">
    <div id="loader" class="flex justify-center mb-20">
      <div class="pokeball"></div>
    </div>
    <!--  <div class="wrapper">-->
    <!--  </div>-->
  </teleport>
</template>

<script>
export default {
  name: "PokeballLoader",
};
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  align-items: center;
  display: flex;
  justify-content: center;
}

.wrapper:before {
  content: "";
  background-color: black;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  opacity: 0.2;
}
.pokeball {
  width: 120px;
  height: 120px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  border: 5px solid;
  animation: frames 1.3s linear 0s infinite;
}

.pokeball:after {
  content: "";
  position: absolute;
  width: 120px;
  height: 60px;
  background-color: red;
  border-bottom: 6px solid;
  top: -1px;
  left: 0px;
}

.pokeball:before {
  content: "";
  position: absolute;
  background-color: #fff;
  width: 28px;
  height: 28px;
  border: 6px solid;
  border-radius: 50%;
  bottom: 41px;
  right: 41px;
  z-index: 1;
}

/* AnimationFrames */
@keyframes frames {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
