<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center vh-100"
  >
    <Nuxt />
    <div class="bg"></div>
  </div>
</template>
<style scoped lang="scss">
  .bg {
    z-index: -1;
    position: absolute;
    top: 0%;
    background-color: $bg-color;
    height: 50vh;
    width: 100vw;
  }
</style>
