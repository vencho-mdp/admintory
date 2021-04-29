<template
  ><b-form class="mb-2">
    <b-input-group class="form__type-filter mr-5">
      <label for="password">{{ entity || 'Proveedor' }}</label>
      <b-form-select></b-form-select>
    </b-input-group>
    <span class="form__price-filter ml-5">
      <b-input-group>
        <label for="min">Precio Mínimo</label>
        <b-input v-model.number="priceFilter.min" type="number" id="min" />
      </b-input-group>
      <b-input-group>
        <label for="max">Precio Máximo</label>
        <b-input
          v-model.number="priceFilter.max"
          type="number"
          id="max"
        /> </b-input-group
    ></span>
  </b-form>
</template>

<script>
  const priceValidation = (value, min, max) => value >= min && value <= max;

  export default {
    props: {
      entity: String,
      entityOptions: Array
    },
    data() {
      return {
        priceFilter: {
          min: undefined,
          max: undefined
        }
      };
    },
    computed: {
      combinedFilters() {
        return { ...this.priceFilter };
      }
    },
    watch: {
      combinedFilters: {
        deep: true,
        handler(newValue) {
          console.log(newValue);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  form {
    display: flex;
    justify-content: flex-end;
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
      flex-basis: clamp(150px, 15%, 15%);
      select {
        width: 100% !important;
      }
    }
  }
</style>
