<template>
  <CreateSupplierLayout
    :formData="formattedInitialValues"
    @handleFormSubmission="handleFormSubmission"
  />
</template>

<script>
  import CreateSupplierLayout from '../../components/layouts/CreateSupplierLayout';

  const getDifference = (a, b) =>
    Object.fromEntries(
      Object.entries(b).filter(([key, val]) => key in a && a[key] !== val)
    );

  export default {
    components: { CreateSupplierLayout },
    methods: {
      async handleFormSubmission(data) {
        const diffs = getDifference(this.initialValues, data);
        try {
          await this.$axios.patch(
            `api/suppliers/${this.initialValues.id}`,
            diffs
          );
          this.$router.push('/suppliers');
        } catch (error) {
          console.error(error);
        }
      }
    },
    async asyncData(context) {
      const query_params = context.route.query;
      return { initialValues: query_params };
    },
    computed: {
      formattedInitialValues() {
        const {
          city,
          address,
          phone_number,
          full_name,
          company
        } = this.initialValues;
        const [name, surname] = full_name.split(' ');
        const [prefix, phoneNumber] = phone_number
          .replace(/[{()}]/g, '')
          .split(' ');
        const [street, streetNumber] = address.split(' ');
        const res = {
          name,
          surname,
          phone: { prefix, number: phoneNumber },
          address: { street, number: streetNumber },
          city,
          company
        };
        return res;
      }
    }
  };
</script>

<style></style>
