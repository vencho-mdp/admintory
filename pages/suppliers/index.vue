<template>
  <MainLayout
    :fields="fields"
    :items="suppliers"
    :filters="[
      {
        type: 'type',
        name: 'Ciudad',
        options: cities,
        property: 'city'
      }
    ]"
    firstCharactersOfEntity="PV"
    title="Proveedores"
    entity="suppliers"
  />
</template>

<script>
  import MainLayout from '../../components/MainLayout';
  import { mapState } from 'vuex';

  const getTranslations = () =>
    import('~/static/translations.json').then((m) => m.default || m);

  export default {
    components: { MainLayout },
    async asyncData({ store }) {
      await store.dispatch('setSuppliers');
      const translations = await getTranslations();
      return { translations };
    },
    computed: {
      ...mapState(['suppliers']),
      fields() {
        const result = this.suppliers[0]
          ? Object.keys(this.suppliers[0]).map((el) => {
              return { key: el, label: this.translations[el] };
            })
          : [];
        return result;
      },
      cities() {
        return [...new Set(this.suppliers.map((el) => el.city))];
      }
    }
  };
</script>

<style scoped>
  .wrapper {
    width: 75%;
  }
</style>
