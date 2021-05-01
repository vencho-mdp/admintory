<template>
  <MainLayout title="Proveedores" />
</template>

<script>
  import MainLayout from '../components/MainLayout';
  import { mapState } from 'vuex';

  export default {
    components: { MainLayout },
    computed: { ...mapState(['counter']) }
  };
</script>

<style scoped>
  .wrapper {
    width: 75%;
  }
</style>
