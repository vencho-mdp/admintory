<template>
  <client-only
    ><b-nav
      v-if="$mq === 'xl' || $mq === 'xxl'"
      vertical
      justified
      class="justify-content-around xl-navbar"
    >
      <b-nav-item to="/" class="nav__logo">
        <img src="~assets/icons/logo.svg" alt="Logo" /> Admintory</b-nav-item
      >
      <b-nav-item to="/suppliers">Proveedores</b-nav-item>
      <b-nav-item to="/source-materials">Materias Primas</b-nav-item>
      <b-nav-item to="/products">Productos</b-nav-item>
      <b-nav-item to="/kits">Kits</b-nav-item>
      <b-nav-item to="/customers">Clientes</b-nav-item>
      <b-nav-item to="/orders">Pedidos</b-nav-item>
    </b-nav>
    <b-navbar v-else toggleable type="dark" variant="dark">
      <b-navbar-brand to="/">Admintory</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="suppliers">Proveedores</b-nav-item>
          <b-nav-item to="source-materials">Materias Primas</b-nav-item>
          <b-nav-item to="products">Productos</b-nav-item>
          <b-nav-item to="kits">Kits</b-nav-item>
          <b-nav-item to="customers">Clientes</b-nav-item>
          <b-nav-item to="orders">Pedidos</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </client-only>
</template>

<style scoped lang="scss">
  .xl-navbar {
    background: $bg-color;
    min-height: 100vh;
    width: clamp(250px, 300px, 300px);
    .nuxt-link-active {
      font-size: 1.2rem !important;
      font-weight: bold;
    }
    .nav-item {
      text-align: center;
      padding: 0;
      a {
        font-size: 1.2rem;
        color: rgb(255, 255, 255) !important;
      }
    }
    .nav__logo {
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 !important;
        font-family: 'Merriweather Sans';
        font-size: 1.3rem !important;
      }
    }
  }
  .md-navbar {
    position: absolute;
    top: 0;
    .nuxt-link-active {
      font-size: 1.4rem !important;
      font-weight: bold;
    }
  }
  .nav-link {
    text-align: center;
    font-size: 1.2rem !important;
  }
  .navbar-brand {
    font-size: 1.3rem;
  }
</style>
