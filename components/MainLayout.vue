<template>
  <main class="wrapper" v-if="items[0]">
    <h1 class="wrapper__title">{{ title }}</h1>
    <div class="wrapper__nav">
      <div class="wrapper__nav__primary-actions">
        <PrimaryButton
          :isValid="true"
          @click.native="$router.push(parentRoute + '/create')"
        >
          <b-icon icon="plus" scale="1.5"></b-icon> Agregar</PrimaryButton
        >
        <SecondaryButton
          @click.native="downloadData()"
          v-if="$mq !== 'sm' && $mq !== 'md' && $mq !== 'lg'"
          ><b-icon icon="download" scale="1.3" alt="Descargar"
        /></SecondaryButton>
      </div>
      <FilterComponent
        :filters="filters"
        :items="items"
        :filteredItems.sync="filteredItems"
      />
    </div>
    <CustomTable
      @deleteItem="deleteItem"
      @editItem="editItem"
      :fields="fields"
      :items="filteredItems"
      :firstCharactersOfEntity="firstCharactersOfEntity"
    />
  </main>
  <main v-else class="wrapper d-flex align-items-center flex-column">
    <h1>Todavía no creaste {{ title.toLowerCase() }}</h1>
    <PrimaryButton
      :isValid="true"
      class="mt-4 w-25"
      @click.native="$router.push(parentRoute + '/create')"
    >
      <b-icon icon="plus" scale="1.5"></b-icon> Empezá a
      agregarlos</PrimaryButton
    >
  </main>
</template>

<script>
  import CustomTable from './CustomTable';
  import FilterComponent from './FilterComponent';
  import PrimaryButton from './PrimaryButton';
  import SecondaryButton from './SecondaryButton';

  //From https://jsfiddle.net/1ecj1rtz/
  const jsonToCSVDownload = (JSONData, ReportTitle, ShowLabel) => {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = 'sep=,' + '\r\n\n';
    if (ShowLabel) {
      var row = '';
      for (var index in arrData[0]) {
        row += index + ',';
      }
      row = row.slice(0, -1);
      CSV += row + '\r\n';
    }
    for (var i = 0; i < arrData.length; i++) {
      var row = '';
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }
      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }
    let fileName = ReportTitle.replace(/ /g, '_');
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var link = document.createElement('a');
    link.href = uri;
    link.download = fileName + '.csv';
    link.click();
  };

  export default {
    props: {
      title: String,
      items: Array,
      entity: String,
      fields: Array,
      firstCharactersOfEntity: String,
      filters: Array,
      route: String
    },
    components: {
      CustomTable,
      FilterComponent,
      PrimaryButton,
      SecondaryButton
    },
    data() {
      return { filteredItems: this.items };
    },

    watch: {
      items() {
        //Every time user deletes an item, this function is going to be executed
        //We should reset formattedItems and all the filters

        //New value of filteredItems will be the same as it was
        //but, without the item that has been deleted
        this.filteredItems = this.filteredItems.filter((filteredItem) =>
          this.items.some((item) => item.id === filteredItem.id)
        );
      }
    },
    computed: {
      parentRoute() {
        return this.route || this.entity;
      }
    },
    methods: {
      downloadData() {
        jsonToCSVDownload(this.items, this.entity, true);
      },
      async deleteItem(id) {
        const data = { entity: this.entity, id };
        this.$store.commit('deleteItemLocally', data);
        try {
          await this.$axios.$delete(`api/${this.parentRoute}/${id}`);
        } catch (error) {
          console.error(error);
        }
      },
      editItem(data) {
        this.$router.push({
          path: `${this.parentRoute}/edit`,
          query: data
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrapper {
    h1 {
      text-align: center;
    }
    &__nav {
      display: flex;
      margin: 3vh 0;
      align-items: flex-end;
      justify-content: space-evenly;

      &__primary-actions {
        display: flex;
        gap: 20px;
        align-items: flex-end;
      }
    }
  }
  @media screen and (min-width: 992px) {
    .wrapper__nav {
      justify-content: space-between;
    }
    h1 {
      text-align: left !important;
    }
  }
</style>
