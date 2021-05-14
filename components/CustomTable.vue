<template>
  <b-table
    :fields="formattedFields"
    :items="formattedItems"
    v-bind="$attrs"
    hover
    borderless
    responsive="sm"
  >
    <template #cell(id)="props">{{ idMaker(props.item.id) }}</template>
    <template #cell(editAndDeleteField)="props">
      <b-dropdown right variant="white" no-caret>
        <template #button-content>
          <b-icon scale="1.2" icon="three-dots-vertical"></b-icon>
        </template>
        <b-dropdown-item-button
          @click.stop="editItem(props.item)"
          tabindex="-1"
          variant="info"
        >
          <b-icon icon="pencil"></b-icon>
          Editar
        </b-dropdown-item-button>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item-button
          variant="danger"
          @click.stop="deleteItem(props.item.id)"
        >
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          Eliminar
        </b-dropdown-item-button>
      </b-dropdown></template
    >
  </b-table>
</template>

<script>
  export default {
    props: {
      items: Array,
      fields: Array,
      firstCharactersOfEntity: String
    },
    computed: {
      formattedFields() {
        const fields = [
          ...this.fields.filter((el) => el.key != 'userid'),
          { key: 'editAndDeleteField', label: '' }
        ];
        return fields;
      },
      formattedItems() {
        //Format Id
        const items = this.items.map((el) => {
          let copy = Object.assign({}, el);
          delete copy.userid;
          return {
            ...copy,
            editAndDeleteField: undefined
          };
        });
        return items;
      }
    },
    methods: {
      idMaker(id) {
        return `${this.firstCharactersOfEntity}${[...id].reduce((a, b) => {
          return a + b.charCodeAt();
        }, 0)}`;
      },
      editItem(data) {
        delete data.editAndDeleteField;
        this.$emit('editItem', data);
      },
      deleteItem(id) {
        this.$emit('deleteItem', id);
      }
    }
  };
</script>

<style lang="scss">
  table {
    thead {
      tr {
        th {
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
      tr {
        td {
          vertical-align: middle !important;
        }
      }
      tr:first-child {
        border: 0;
        td:first-child {
          border-radius: 10px 0 0 0;
        }
        td:last-child {
          border-radius: 0 10px 0 0;
        }
      }
      tr:last-child {
        td:first-child {
          border-radius: 0 0 0 15px;
        }
        td:last-child {
          border-radius: 0 0 15px 0;
        }
      }
      tr {
        border-top: 1px solid #eaecee;
      }
    }
  }

  thead tr,
  tbody {
    background: rgb(255, 255, 255);
    text-align: center;
    background-clip: border-box;
  }

  thead::after {
    content: '';
    display: block;
    height: 10px;
    width: 100%;
    background: #f3f3fa;
  }
</style>
