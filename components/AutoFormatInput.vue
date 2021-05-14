<template>
  <input
    class="form-control"
    v-model="localPhoneProperty"
    type="text"
    @input="acceptNumber"
  />
</template>

<script>
  export default {
    props: {
      phone: {
        type: [String, undefined]
      }
    },
    data() {
      return { localPhoneProperty: this.phone || '' };
    },
    methods: {
      acceptNumber() {
        const input = this.localPhoneProperty
          .replace(/\D/g, '')
          .match(/(\d{0,3})(\d{0,3})/);
        this.localPhoneProperty = !input[2]
          ? input[1]
          : input[1] + '-' + input[2];
        this.$emit('update:phone', this.localPhoneProperty);
      }
    }
  };
</script>
