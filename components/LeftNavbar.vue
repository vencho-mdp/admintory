<template>
  <b-nav vertical justified class="justify-content-around">
    <b-nav-item to="/home" class="nav__logo">
      <img src="~assets/logo.svg" alt="Logo" /> Admintory</b-nav-item
    >
    <b-nav-item to="suppliers">Proveedores</b-nav-item>
    <b-nav-item to="source-materials">Materias Primas</b-nav-item>
    <b-nav-item to="products">Productos</b-nav-item>
    <b-nav-item to="kits">Kits</b-nav-item>
    <b-nav-item to="customers">Clientes</b-nav-item>
    <b-nav-item to="orders">Pedidos</b-nav-item>
  </b-nav>
</template>

<style scoped lang="scss">
  .nav {
    background: $bg-color;
    min-height: 100vh;
    width: 250px;
    .nuxt-link-active {
      font-size: 1.6rem !important;
      font-weight: bold;
      color: blue;
    }
    &-item {
      text-align: center;
      padding: 0;
      a {
        font-size: 1.3rem;
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
        font-size: 2rem !important;
      }
    }
  }
</style>
