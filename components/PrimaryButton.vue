<template>
  <b-button
    :disabled="!isValid ? true : false"
    :variant="isValid ? 'primary' : 'disabled'"
    class="w-50"
  >
    <slot />
  </b-button>
</template>

<script>
export default {
  props: {
    isValid: Boolean
  }
};
</script>

<style></style>
