<template>
  <b-form
    @submit.prevent="sendData()"
    class="bg-white shadow rounded d-flex flex-column justify-content-between align-items-center"
  >
    <h1 class="mb-2">Bienvenido</h1>
    <b-input-group
      class="d-flex flex-column align-items-start mb-4"
      id="input-email"
    >
      <label for="email">Email</label>
      <b-input
        v-model="email"
        class="align-self-stretch rounded"
        @focus="showAlert = false"
        @blur="$v.email.$touch()"
        :state="$v.email.$dirty ? ($v.email.$error ? false : null) : null"
        id="email"
      ></b-input>
      <b-form-invalid-feedback id="input-email-feedback"
        >Email Inválido</b-form-invalid-feedback
      >
    </b-input-group>
    <b-input-group
      class="d-flex flex-column align-items-start mb-4"
      id="input-password"
    >
      <label for="email">Contraseña</label>
      <b-input
        v-model="password"
        class="align-self-stretch rounded"
        @focus="showAlert = false"
        @blur="$v.password.$touch()"
        type="password"
        :state="$v.password.$dirty ? ($v.password.$error ? false : null) : null"
        id="password"
      ></b-input>
      <b-form-invalid-feedback id="input-password-feedback"
        >Contraseña Inválida</b-form-invalid-feedback
      >
    </b-input-group>
    <b-alert :show="showAlert" variant="danger" class="mt-1 mb-1"
      >Contraseña y/o Email Inválido</b-alert
    >
    <primary-button type="submit" :isValid="isValid" class="w-50 mt-3 mb-3"
      >Ingresar</primary-button
    >
    <p class="form__text__description mt-2">
      ¿No tenés una cuenta todavía?
      <nuxt-link to="/create-account">Registrate</nuxt-link>
    </p>
  </b-form>
</template>

<script>
import primaryButton from "../components/primary_button";
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: undefined,
      password: undefined,
      showAlert: false
    };
  },
  components: {
    primaryButton
  },
  methods: {
    async handleResponseRejection() {
      this.showAlert = true;
      this.$v.$reset();
      this.email = this.password = undefined;
    },
    async sendData() {
      try {
        const res = await this.$http().$post("/login", {
          email: this.email,
          password: this.password
        });
        console.log(res);
        // if (!res.ok) {
        //   this.handleResponseRejection();
        //   return;
        // }
        // this.$router.push("/register");
      } catch (error) {
        this.handleResponseRejection();
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
