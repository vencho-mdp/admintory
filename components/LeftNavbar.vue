<template>
  <b-nav vertical justified class="justify-content-around">
    <b-nav-item class="nav__logo"> Admintory</b-nav-item>
    <b-nav-item>Proveedores</b-nav-item>
    <b-nav-item>Materias Primas</b-nav-item>
    <b-nav-item>Productos</b-nav-item>
    <b-nav-item>Kits</b-nav-item>
    <b-nav-item>Clientes</b-nav-item>
    <b-nav-item>Pedidos</b-nav-item>
  </b-nav>
</template>

<style scoped lang="scss">
  .nav {
    background: $bg-color;
    min-height: 100vh;
    width: clamp(200px, 15vw, 250px);
    &-item {
      text-align: center;
      padding: 0;
      a {
        font-size: 1.2rem;
        color: rgb(255, 255, 255) !important;
      }
    }
    &__logo {
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 !important;
        font-family: 'Merriweather Sans';
        font-family: 1.25rem !important;
      }
    }
  }
</style>
