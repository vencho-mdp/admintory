<template>
  <CreateSupplierLayout @handleFormSubmission="handleFormSubmission" />
</template>

<script>
  import CreateSupplierLayout from '../../components/layouts/CreateSupplierLayout';

  export default {
    components: { CreateSupplierLayout },
    methods: {
      async handleFormSubmission(data) {
        try {
          const res = await this.$axios.$post('api/suppliers', data);
          console.log(data, res);
        } catch (error) {
          console.error('Error', error);
        }
        this.$router.push('/suppliers');
      }
    }
  };
</script>
