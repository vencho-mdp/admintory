<template>
  <main class="wrapper">
    <h1>{{ title }}</h1>
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
  import CustomTable from './CustomTable';
  import FilterComponent from './FilterComponent';

  export default {
    props: { title: String },
    components: { CustomTable, FilterComponent }
  };
</script>

<style scoped></style>
