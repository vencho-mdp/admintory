<template>
  <main class="main">
    <h1>Materias Primas</h1>
    <FilterComponent />
    <CustomTable
      :fields="[{ key: 'Hi' }, { key: 'Foo' }, { key: 'Barr' }]"
      :items="[
        {
          Hi: 300,
          Foo: 400,
          Barr: 500
        },
        {
          Hi: 300,
          Foo: 400,
          Barr: 500
        }
      ]"
    />
  </main>
</template>

<script>
  import CustomTable from '../components/CustomTable';
  import FilterComponent from '../components/FilterComponent';

  export default {
    components: { CustomTable, FilterComponent }
  };
</script>

<style scoped>
  .main {
    width: 75%;
  }
</style>
