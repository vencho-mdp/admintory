<template>
  <b-table-simple borderless hover caption-top responsive="sm">
    <b-thead>
      <b-tr class="table__header">
        <b-th
          v-for="field in formattedFields"
          v-bind:key="field.key"
          :class="field.class"
          >{{ field.key }}</b-th
        >
      </b-tr>
    </b-thead>

    <b-tbody>
      <b-tr>
        <b-td>46</b-td>
        <b-td>50</b-td>
        <b-td>61</b-td>
      </b-tr>
      <b-tr>
        <b-td>46</b-td>
        <b-td>50</b-td>
        <b-td>61</b-td>
      </b-tr>
      <b-tr>
        <b-td>46</b-td>
        <b-td>50</b-td>
        <b-td>61</b-td>
      </b-tr>
      <b-tr>
        <b-td>46</b-td>
        <b-td>50</b-td>
        <b-td>61</b-td>
      </b-tr>
      <b-tr>
        <b-td>46</b-td>
        <b-td>50</b-td>
        <b-td>61</b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr>
        <b-td colspan="100" class="text-right"> Total Rows: <b>5</b> </b-td>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
</template>

<script>
  export default {
    props: {
      items: Array,
      fields: Array,
      firstLettersOfEntity: String
    },
    computed: {
      formattedFields() {
        const fields = this.fields;
        return fields;
      },
      formattedItems() {}
    }
  };
</script>

<style scoped lang="scss">
  thead {
    tr {
      th {
        border: none;
        &:first-child {
          border-radius: 10px 0 0 10px;
        }
        &:last-child {
          border-radius: 0 10px 10px 0;
        }
      }
    }
  }
  tbody {
    tr:first-child {
      td:first-child {
        border-radius: 10px 0 0 0;
      }
      td:last-child {
        border-radius: 0 10px 0 0;
      }
    }
    tr:last-child {
      border: none !important;
      td:first-child {
        border-radius: 0 0 0 15px;
      }
      td:last-child {
        border-radius: 0 0 15px 0;
      }
    }
  }
  thead,
  tbody {
    background: rgb(255, 255, 255);
    text-align: center;
    background-clip: border-box;
  }
  .table__left-extreme {
    border-radius: 10px 0 0 10px;
  }
  .table__right-extreme {
    border-radius: 0 10px 10px 0;
  }
  thead::after {
    content: '';
    display: block;
    height: 10px;
    width: 100%;
    background: #f3f3fa;
  }
</style>
