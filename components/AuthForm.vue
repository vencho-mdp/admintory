<template>
  <b-form
    @submit.prevent="sendData()"
    class="bg-white shadow rounded d-flex flex-column justify-content-between align-items-center"
  >
    <h1 class="mb-2">{{ title }}</h1>
    <slot formData="form" />
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
  layout: "auth",
  props: {
    title: String
  },
  data() {
    return {
      form: { email: undefined },
      showAlert: false
    };
  },
  components: {
    primaryButton
  },
  methods: {
    async sendData() {
      try {
        const res = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
        console.log(res.data);
        console.log("Here!!");
        // this.$router.push("/register");
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
