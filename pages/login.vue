<template>
  <b-form
    @submit.prevent="sendData()"
    class="bg-white shadow rounded d-flex flex-column justify-content-between align-items-center"
  >
    <h1 class="mb-3">Bienvenido</h1>
    <b-input-group
      class="d-flex flex-column align-items-start mb-4"
      id="input-email"
    >
      <label>Email</label>
      <b-input
        v-model="email"
        class="align-self-stretch rounded"
        @focus="showAlert = false"
        @blur="$v.email.$touch()"
        :state="$v.email.$dirty ? ($v.email.$error ? false : null) : null"
      ></b-input>
      <b-form-invalid-feedback id="input-email-feedback"
        >Email Inválido</b-form-invalid-feedback
      >
    </b-input-group>
    <b-input-group
      class="d-flex flex-column align-items-start mb-4"
      id="input-password"
    >
      <label>Contraseña</label>
      <b-input
        v-model="password"
        class="align-self-stretch rounded"
        @focus="showAlert = false"
        @blur="$v.password.$touch()"
        type="password"
        :state="$v.password.$dirty ? ($v.password.$error ? false : null) : null"
      ></b-input>
      <b-form-invalid-feedback id="input-password-feedback"
        >Contraseña Inválida</b-form-invalid-feedback
      >
    </b-input-group>
    <b-alert :show="showAlert" variant="danger" class="mt-1 mb-1 w-50"
      >Contraseña y/o Email Inválido</b-alert
    >
    <PrimaryButton type="submit" :isValid="isValid" class="w-50 mt-3 mb-3"
      >Ingresar</PrimaryButton
    >
    <p class="form__text__description mt-2">
      ¿No tenés una cuenta todavía?
      <nuxt-link to="/register">Registrate</nuxt-link>
    </p>
  </b-form>
</template>

<script>
  import PrimaryButton from '../components/PrimaryButton';
  import { required, email } from 'vuelidate/lib/validators';
  export default {
    auth: false,
    layout: 'auth',
    data() {
      return {
        email: undefined,
        password: undefined,
        showAlert: false
      };
    },
    components: {
      PrimaryButton
    },
    methods: {
      async sendData() {
        try {
          const res = await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          });
          this.$router.push('/');
        } catch (error) {
          console.error(error);
          this.showAlert = true;
          this.$v.$reset();
          this.email = this.password = undefined;
        }
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    },
    computed: {
      isValid() {
        return !this.$v.$invalid;
      }
    }
  };
</script>

<style scoped>
  form {
    padding: 20px 40px;
    width: 365px;
  }
  h1 {
    font-weight: 600;
  }
  p {
    font-size: 1.08rem;
    text-align: center;
  }
  a {
    color: #0b3580;
    text-decoration: underline;
    font-size: 1.09rem;
  }
  .input-group > .form-control {
    width: auto !important;
  }
  @media screen and (max-width: 400px) {
    form {
      width: 100%;
    }
  }
</style>
