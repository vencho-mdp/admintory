<template>
  <Form
    @handleFormSubmission="handleFormSubmission"
    title="un proveedor"
    :isValid="!$v.$invalid && !isNameAndSurnameAlreadyTaken"
    :primaryButtonContent="formData ? 'Guardar cambios' : 'Añadir proveedor'"
    nextRoute="/suppliers"
  >
    <b-input-group class="w-100">
      <b-input-group class="d-flex">
        <label>Nombre</label>
        <b-form-input
          :state="
            $v.form.name.$dirty
              ? !$v.form.name.$error && !isNameAndSurnameAlreadyTaken
                ? null
                : false
              : !isNameAndSurnameAlreadyTaken
              ? null
              : false
          "
          @blur="$v.form.name.$touch()"
          type="text"
          v-model="form.name"
        ></b-form-input>
        <b-form-invalid-feedback class="text-left text-nowrap">{{
          this.form.name
            ? 'Ya utilizaste ese nombre y apellido para otro proveedor'
            : ''
        }}</b-form-invalid-feedback>
      </b-input-group>
      <b-input-group>
        <label>Apellido</label>
        <b-form-input
          type="text"
          v-model="form.surname"
          :state="
            $v.form.surname.$dirty
              ? !$v.form.surname.$error && !isNameAndSurnameAlreadyTaken
                ? null
                : false
              : !isNameAndSurnameAlreadyTaken
              ? null
              : false
          "
          @blur="$v.form.surname.$touch()"
        ></b-form-input>
      </b-input-group>
    </b-input-group>
    <b-input-group class="w-100">
      <label>Ciudad</label>
      <Autocomplete
        class="w-100"
        :data="cities"
        :minMatchingChars="1"
        v-model="form.city"
        @blur="$v.form.city.$touch()"
      ></Autocomplete>
    </b-input-group>
    <b-input-group class="w-100">
      <b-input-group class="w-25">
        <label>Prefijo</label>
        <b-form-select
          :state="
            $v.form.phone.prefix.$dirty
              ? !$v.form.phone.prefix.$error
                ? null
                : false
              : null
          "
          @blur="$v.form.phone.prefix.$touch()"
          :options="prefixes.map((el) => el.prefix)"
          v-model="form.phone.prefix"
        ></b-form-select
      ></b-input-group>
      <b-input-group class="w-70">
        <label>Teléfono</label>
        <AutoFormatInput :phone.sync="form.phone.number" />
      </b-input-group>
    </b-input-group>
    <b-input-group class="w-100">
      <b-input-group class="w-70">
        <label>Calle </label>
        <b-input
          type="text"
          :state="
            $v.form.address.street.$dirty
              ? !$v.form.address.street.$error
                ? null
                : false
              : null
          "
          @blur="$v.form.address.street.$touch()"
          v-model="form.address.street"
        ></b-input
      ></b-input-group>
      <b-input-group class="w-25">
        <label>Altura</label>
        <b-input
          type="number"
          :state="
            $v.form.address.number.$dirty
              ? !$v.form.address.number.$error
                ? null
                : false
              : null
          "
          @blur="$v.form.address.number.$touch()"
          v-model="form.address.number"
        ></b-input
      ></b-input-group>
    </b-input-group>
    <b-input-group class="w-100">
      <label>Empresa</label>
      <b-input v-model="form.company" type="text"></b-input>
    </b-input-group>
  </Form>
</template>

<script>
  import Form from '../../components/CreateFormLayout';
  import Autocomplete from 'vue-typeahead-bootstrap';
  import { required, minLength } from 'vuelidate/lib/validators';
  import { mapState } from 'vuex';

  const removeAccents = (str) => {
    var accents =
      'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut =
      'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
    str = str.split('');
    var strLen = str.length;
    var i, x;
    for (i = 0; i < strLen; i++) {
      if ((x = accents.indexOf(str[i])) != -1) {
        str[i] = accentsOut[x];
      }
    }
    return str.join('');
  };

  const getCities = () =>
    import('../../static/arg-cities.json').then((m) => m.default || m);

  const getPrefixes = () =>
    import('../../static/arg-prefixes.json').then((m) => m.default || m);

  export default {
    components: { Form, Autocomplete },
    props: {
      formData: [Object]
    },
    data() {
      return {
        form: this.formData || {
          name: undefined,
          surname: undefined,
          phone: {
            number: undefined,
            prefix: 11
          },
          address: {
            street: undefined,
            number: undefined
          },
          city: 'Buenos Aires',
          company: undefined
        },
        cities: [],
        prefixes: []
      };
    },
    async fetch() {
      this.cities = await getCities();
      this.prefixes = await getPrefixes();
    },
    fetchOnServer: false,
    watch: {
      city: {
        handler(val) {
          this.form.phone.prefix = this.prefixes.filter(
            (el) => el.name === removeAccents(val.toLowerCase())
          )[0]?.prefix;
        }
      }
    },
    computed: {
      ...mapState(['suppliers']),
      isNameAndSurnameAlreadyTaken() {
        const supplierIdThatHasTakenTheFullName = this.suppliers
          .map((el) => {
            return { full_name: el.full_name, id: el.id };
          })
          .find(
            (el) => el.full_name === `${this.form.name} ${this.form.surname}`
          )?.id;
        if (!supplierIdThatHasTakenTheFullName) return false;
        const isThatSupplierTheSameAsThisOne =
          supplierIdThatHasTakenTheFullName === this.$route.query?.id;
        return !isThatSupplierTheSameAsThisOne;
      }
    },
    validations: {
      form: {
        name: {
          required
        },
        surname: {
          required
        },
        city: {
          required
        },
        company: {
          required
        },
        phone: {
          prefix: {
            required
          },
          number: { required, minLength: minLength(7) }
        },
        address: {
          street: {
            required
          },
          number: { required }
        }
      }
    },
    methods: {
      async handleFormSubmission() {
        const data = {
          full_name: `${this.form.name} ${this.form.surname}`,
          city: this.form.city,
          address: `${this.form.address.street} ${this.form.address.number}`,
          company: this.form.company,
          phone_number: `(${this.form.phone.prefix}) ${this.form.phone.number}`,
          userid: this.$auth.strategy.token.get().split(' ')[1]
        };
        this.$emit('handleFormSubmission', data);
      }
    }
  };
</script>

<style scoped lang="scss">
  .input-group {
    display: flex;
    align-items: flex-start;
    gap: 5%;
    width: clamp(45%, 45%, 100%);
    input,
    select {
      width: 100%;
    }
  }
</style>
