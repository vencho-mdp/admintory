<template>
  <Form
    title="una materia prima"
    :isValid="!$v.$invalid"
    :primaryButtonContent="
      formData ? 'Guardar cambios' : 'Añadir materia prima'
    "
    nextRoute="/source-materials"
    @handleFormSubmission="handleFormSubmission"
  >
    <b-input-group class="w-100">
      <label class="mb-2">Material</label>
      <b-form-select
        v-model="form.material"
        :options="['Lienzo', 'Media', 'Baja']"
        @change="$v.form.material.$touch()"
      ></b-form-select>
    </b-input-group>
    <b-input-group class="w-100">
      <label class="mb-2">Proveedor</label>
      <b-form-select
        v-model="form.supplierid"
        :options="suppliersOptions"
        @change="$v.form.supplierid.$touch()"
      ></b-form-select>
    </b-input-group>
    <b-input-group class="w-100">
      <label class="mb-2">Calidad</label>
      <b-form-select
        v-model="form.quality"
        :options="['Alta', 'Media', 'Baja']"
        @change="$v.form.quality.$touch()"
      ></b-form-select>
    </b-input-group>
    <b-input-group class="w-100">
      <label class="mb-2">Color</label>
      <b-form-select
        v-model="form.color"
        :options="['Alta', 'Media', 'Baja']"
        @change="$v.form.color.$touch()"
      ></b-form-select>
    </b-input-group>
    <b-input-group class="w-100">
      <label class="mb-2">Unidad de Medida</label>
      <b-form-select
        v-model="form.measurement_unit"
        :options="['Centímetro', 'Metro', 'Unidad']"
        @change="$v.form.measurement_unit.$touch()"
      ></b-form-select>
    </b-input-group>
    <b-input-group class="w-100">
      <span class="d-flex justify-content-between w-100">
        <label>Costo</label>
        <label class="label-description">AR$</label>
      </span>
      <b-input material="number" v-model="form.cost"></b-input>
    </b-input-group>
  </Form>
</template>

<script>
  import Form from '../../components/CreateFormLayout';
  import { required } from 'vuelidate/lib/validators';

  export default {
    components: {
      Form
    },
    props: {
      formData: [Object]
    },
    async fetch() {
      if (!this.$store.getters.getSuppliers)
        await this.$store.dispatch('setSuppliers');

      this.suppliers = this.$store.getters.getSuppliers;
    },
    data() {
      return {
        form: this.formData || {
          supplierid: undefined,
          color: 'Beige',
          quality: undefined,
          material: undefined,
          cost: undefined,
          measurement_unit: undefined
        },
        suppliers: []
      };
    },
    methods: {
      handleFormSubmission() {
        const formDataAndUserId = {
          ...this.form,
          userid: this.$auth.strategy.token.get().split(' ')[1]
        };
        this.$emit('handleFormSubmission', formDataAndUserId);
      }
    },
    computed: {
      suppliersOptions() {
        return this.suppliers.map((el) => {
          return {
            text: el.full_name,
            value: el.id
          };
        });
      }
    },
    validations: {
      form: {
        supplierid: {
          required
        },
        color: { required },
        quality: { required },
        material: { required },
        cost: { required },
        measurement_unit: { required }
      }
    }
  };
</script>

<style scoped lang="scss">
  .input-group {
    align-items: flex-start;
    gap: 5%;
    select,
    input {
      width: 100%;
    }
  }
</style>
