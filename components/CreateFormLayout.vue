<template>
  <div class="wrapper">
    <b-card
      class="bg-white shadow"
      :title="`Agregá ${title}`"
      border-variant="grey"
      title-tag="h1"
    >
      <b-card-body>
        <b-form class="d-flex flex-column align-items-center">
          <slot />
          <span
            class="form__submit-cancel mb-3 d-flex justify-content-around w-100"
          >
            <PrimaryButton
              :isValid="isValid"
              @click.native="$emit('handleFormSubmission')"
            >
              {{ primaryButtonContent }}
            </PrimaryButton>
            <SecondaryButton @click.native="$router.push(nextRoute)"
              >Cancelar</SecondaryButton
            >
          </span>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      isValid: Boolean,
      primaryButtonContent: String,
      nextRoute: String
    }
  };
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    .card {
      text-align: center;
      height: 100%;
      width: clamp(300px, 500px, 100%);
      padding: 0;
      .card-body {
        padding: 2rem;
        h1 {
          margin: 0;
        }
        height: 100%;
        .card-body {
          padding: 0;
        }
        form {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
        }
      }
    }
  }
</style>
