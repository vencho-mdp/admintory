<template>
  <Layout @handleFormSubmission="handleFormSubmission" />
</template>

<script>
  import Layout from '../../components/layouts/CreateSourceMaterialLayout';
  export default {
    components: { Layout },
    methods: {
      async handleFormSubmission(data) {
        try {
          await this.$axios.post('/api/source-materials', data);
          this.$router.push('/source-materials');
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>

<style></style>
