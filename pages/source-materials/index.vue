<template>
  <MainLayout
    :fields="fields"
    :items="sourceMaterialsFormatted"
    :filters="[
      {
        type: 'type',
        name: 'Material',
        options: materials,
        property: 'material'
      },
      {
        type: 'price',
        property: 'cost'
      }
    ]"
    firstCharactersOfEntity="MP"
    title="Materias Primas"
    entity="sourceMaterials"
    route="source-materials"
  />
</template>

<script>
  import MainLayout from '../../components/MainLayout';
  import { mapState } from 'vuex';
  const getTranslations = () =>
    import('~/static/translations.json').then((m) => m.default || m);

  export default {
    components: {
      MainLayout
    },
    async asyncData({ store }) {
      await store.dispatch('setSourceMaterials');
      const translations = await getTranslations();
      return { translations };
    },
    computed: {
      ...mapState(['sourceMaterials']),
      fields() {
        if (this.sourceMaterials[0]) {
          const {
            measurement_unit,
            supplierid,
            ...removedMeasurementUnitField
          } = this.sourceMaterials[0];
          return Object.keys(removedMeasurementUnitField).map((el) => {
            return { key: el, label: this.translations[el] };
          });
        }
        return [];
      },
      materials() {
        return [...new Set(this.sourceMaterials.map((el) => el.material))];
      },
      sourceMaterialsFormatted() {
        const currencyAdded = this.sourceMaterials.map(
          ({ cost, measurement_unit, ...attrs }) => {
            return {
              ...attrs,
              cost: `AR$ ${Number(cost).toLocaleString(
                'es-AR'
              )}/${measurement_unit}`
            };
          }
        );
        return currencyAdded;
      }
    }
  };
</script>

<style></style>
