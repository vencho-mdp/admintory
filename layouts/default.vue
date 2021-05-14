<template>
  <div class="vh-100">
    <LeftNavbar />
    <Nuxt id="Nuxt" />
  </div>
</template>

<style scoped>
  div {
    background-color: #f3f3fa;
    display: flex;
  }
  @media screen and (max-width: 992px) {
    div {
      flex-direction: column;
    }
  }
  #Nuxt {
    width: 100%;
    padding: 5vh;
  }
</style>
