<template
  ><b-form v-if="$mq !== 'sm' && $mq !== 'md' && $mq !== 'lg'">
    <b-input-group class="form__type-filter mr-5" v-if="filterTypeInfo">
      <label for="password">{{ filterTypeInfo.name }}</label>
      <b-form-select
        v-model="typeFilter"
        :options="filterTypeInfo.options"
        size="sm"
        class="w-70"
      ></b-form-select>
      <template #append>
        <b-button variant="danger" size="sm" @click="cleanFilter('typeFilter')"
          ><img
            src="~/assets/icons/filter-remove.svg"
            alt="Remove Filter"/></b-button
      ></template>
    </b-input-group>
    <span
      v-if="filters.find((el) => el.type === 'price')"
      class="form__price-filter ml-5"
    >
      <b-input-group>
        <label for="min">Precio Mínimo</label>
        <b-input
          :state="isMinNotHigherOrEqualToMax"
          v-model.number="priceFilter.min"
          type="number"
          size="sm"
          id="min"
        />
      </b-input-group>
      <b-input-group>
        <label for="max">Precio Máximo</label>
        <b-input
          v-model.number="priceFilter.max"
          type="number"
          size="sm"
          id="max"
          :state="isMinNotHigherOrEqualToMax"
        /> </b-input-group
    ></span>
  </b-form>
  <b-button v-else variant="secondary"
    ><b-icon icon="filter"></b-icon> Filtrar</b-button
  >
</template>

<script>
  export default {
    props: {
      filters: Array,
      items: Array,
      filteredItems: Array
    },
    data() {
      return {
        priceFilter: {
          min: undefined,
          max: undefined
        },
        typeFilter: undefined,
        isMinNotHigherOrEqualToMax: null
      };
    },
    methods: {
      cleanFilter(filter) {
        this[filter] = undefined;
      }
    },
    computed: {
      filterTypeInfo() {
        return this.filters.find((el) => el.type === 'type') || null;
      },
      combinedFilters() {
        return { ...this.priceFilter, type: this.typeFilter };
      }
    },
    watch: {
      combinedFilters: {
        deep: true,
        handler(newValue) {
          //Reset
          this.isMinNotHigherOrEqualToMax = null;

          const { min = 0, max = Infinity, type } = newValue;
          const getDigits = (val) => Number(val.replace(/[^0-9]/g, ''));

          const typeProperty = this.filters.find((el) => el.type === 'type')
            ?.property;

          const priceProperty = this.filters.find((el) => el.type === 'price')
            ?.property;

          //Filters
          const appliedTypeFilter = this.items
            ? this.items.filter((el) =>
                type ? el[typeProperty] === type : true
              )
            : this.items;

          if (!this.items[0][priceProperty]) {
            this.$emit('update:filteredItems', appliedTypeFilter);
            return;
          }

          const appliedMinFilter = appliedTypeFilter.filter(
            (el) => getDigits(el[priceProperty]) >= min
          );

          if (max <= min) {
            this.isMinNotHigherOrEqualToMax = false;
            this.$emit('update:filteredItems', appliedMinFilter);
            return;
          }

          const appliedMaxFilter = appliedMinFilter.filter(
            (el) => getDigits(el[priceProperty]) <= max
          );

          this.$emit('update:filteredItems', appliedMaxFilter);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .input-group {
    width: 100%;
  }
  form {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    button {
      height: 35px;
    }

    .form__price-filter {
      display: flex;
      justify-content: space-between;
      width: 300px;
      gap: 30px;
      input {
        flex-basis: clamp(120px, 20%, 20%);
      }
    }
    .form__type-filter {
      gap: 5px;
      flex-basis: clamp(150px, 15%, 15%);
      button {
        height: 25px;
        width: 25px;
        border-radius: 5px !important;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
