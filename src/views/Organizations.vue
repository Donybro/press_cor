<template>
  <div class="wrapper container">
    <div class="row">
      <div class="col">
        <div class="header">
          <span class="title">Matbuot tashkilotlar ro’yxati</span>
        </div>
      </div>
    </div>
    <div class="menuWrapper row">
      <Table_Button_Group @showed-type="setShowedType" class="buttons col-3" left-text="Aktiv" right-text="Neaktiv"
                          type="list" />
      <SearchInput @search-text="setSearchText" class="col-5" />
    </div>
    <Spinner class="organizationsList row" v-if="loading" size="large" line-fg-color="rgba(0, 88, 191, 0.5)" />
    <div class="listWrapper row" v-else-if="!loading && organizations.length">
      <div class="organizationsList">
        <div v-for="org in organizations" :key="org.id" :class="colType"
             @click='$router.push("/organizations/"+org.id)'>
          <Organization_Card :organization="org" class="card" />
        </div>
      </div>
    </div>
    <div class="organizationsList row" v-else>
      <div class="col textInfo">Topilmadi</div>
    </div>
    <div v-if="!loading && organizations.length" class="row paginator">
      <paginator class="paginator" :paginationListLength="paginationListLength" @current-page="setCurrentPage"
                 :range="3" />
    </div>
  </div>
</template>

<script>
import Organization_Card from '../components/Organization_Card';
import Paginator from '../components/Paginator';
import Table_Button_Group from '../components/Table_Button_Group';
import SearchInput from '../components/SearchInput';
import Http from '../common/Http';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Organizations',
  components: { SearchInput, Paginator, Organization_Card, Table_Button_Group, Spinner },
  props: [],
  data() {
    return {
      organizations: [],
      currentPage: 1,
      showedType: '',
      searchText: '',
      paginationListLength: 1,
      loading: true,
    };
  },
  methods: {
    async setSearchText(text) {
      this.searchText = text;
      await this.getOrganizations();
      this.searchText = '';
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    renderItems(items) {
      this.renderedItems = [...items];
    },
    setShowedType(type) {
      this.showedType = type;
      this.loading = true;
      this.getOrganizations();
      console.log(type);
    },
    async getOrganizations() {
      let status = this.showedType === 'Aktiv' ? 'ACTIVE' : 'INACTIVE';
      let req = await Http.get('api/organ/allByStatus', {
        params: {
          page: this.currentPage,
          size: 9,
          search: this.searchText,
          status,
        },
      });
      this.organizations = req.data.object.content;
      this.paginationListLength = req.data.object.totalPages || 1;
      this.loading = false;
    },
  },
  watch: {
    // organizations: {
    //   immediate: true,
    //   handler(items) {
    //     if (items.length) {
    //       this.prepare = items.map((item) => {
    //         if (item.name.length > 90) {
    //           return {
    //             ...item,
    //             name: item.name.slice(0, 90) + '...',
    //           };
    //         } else return item;
    //       });
    //     }
    //   },
    // },
  },
  computed: {
    colType() {
      return this.$store.getters.sidebarIsOpen ? 'col-4' : 'col-3';
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;

}

.textInfo {
  margin-top: 50px;
  text-align: center;
  font-size: 24px;
  color: #0058BF;;
}


.header {
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 24px;
    color: #000000;
  }
}

@media only screen and (max-width: 1200px) {
  .header {
    margin: 25px 0;

    .title {
      font-size: 22px;
    }
  }

}

@media only screen and (max-width: 1000px) {
  .header {
    margin: 20px 0;

    .title {
      font-size: 20px;

    }
  }

}

@media only screen and (max-width: 768px) {
  .header {
    margin: 15px 0;

    .title {
      font-size: 18px;

    }
  }

}

.menuWrapper {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.organizationsList {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 40px;

  .card {
    margin-bottom: 15px;
  }
}

@media only screen and (max-width: 1920px) {
  .organizationsList {
    .card {
      margin-bottom: 40px;
    }
  }

}

@media only screen and (max-width: 1400px) {
  .organizationsList {
    .card {
      margin-bottom: 30px;
    }
  }

}

@media only screen and (max-width: 1200px) {
  .organizationsList {
    .card {
      margin-bottom: 25px;
    }
  }

}

.paginator {
  margin-top: auto;
}
</style>