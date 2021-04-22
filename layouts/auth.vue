<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center vh-100"
  >
    <Nuxt />
    <div class="bg"></div>
  </div>
</template>
<style>
.bg {
  z-index: -1;
  position: absolute;
  top: 0%;
  background-color: #151d31;
  height: 50vh;
  width: 100vw;
}
</style>
