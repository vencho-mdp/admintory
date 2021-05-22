<template>
  <Layout
    :formData="formattedInitialValues"
    @handleFormSubmission="handleFormSubmission"
  />
</template>

<script>
  import Layout from '../../components/layouts/CreateSourceMaterialLayout';
  import getDifferences from '../../mixins/getDifferenceBetweenObjects';
  export default {
    components: {
      Layout
    },
    mixins: [getDifferences],
    methods: {
      async handleFormSubmission(data) {
        const diffs = this.getDifference(this.initialValues, data);
        try {
          await this.$axios.patch(
            `api/source-materials/${this.initialValues.id}`,
            diffs
          );
          this.$router.push('/source-materials');
        } catch (error) {
          console.error(error);
        }
      }
    },
    computed: {
      initialValues() {
        return this.$route.query;
      },
      formattedInitialValues() {
        const { cost, supplier_name, ...rest } = this.initialValues;
        [rest.cost, rest.measurement_unit] = cost.split(' ')[1].split('/');
        return rest;
      }
    }
  };
</script>

<style></style>
