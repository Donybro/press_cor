<template>
  <div class='wrapper container'>
    <div class='row'>
      <Journalists_Header @search-text='emitSearchText' />
    </div>
    <div class='row'>
      <Table_Button_Group class='col-3 btnGroup'
                          @showed-type='setShowedType'
                          left-text='Aktiv' right-text='Neaktiv'
                          type='list' />
    </div>
    <div v-if='loading' class='spinnerWrapper'>
      <Spinner size='large' line-fg-color='rgba(0, 88, 191, 0.5)' />
    </div>
    <div class='row spinnerWrapper' v-else-if='showMessageEmpty && !loading'>
      <div class='col textInfo'>
        Xodimlar topilmadi !
      </div>
    </div>
    <div class='workersWrapper' v-else>
      <div class='container'>
        <div class='workers_list row'>
          <div :class='colType' class='worker' v-for='worker in workers' :key='worker.id'>
            <Journalist_Card :worker='worker' />
          </div>
        </div>
      </div>
    </div>
    <div v-if='!showMessageEmpty && !loading' class='paginator'>
      <paginator :range='9' :paginationListLength='paginationListLength' @current-page='setCurrentPage' />
    </div>
  </div>
</template>

<script>
import Journalists_Header from '../components/Journalists_Header';
import Journalist_Card from '../components/Journalist_Card';
import Paginator from '../components/Paginator';
import Table_Button_Group from '../components/Table_Button_Group';
import Spinner from 'vue-simple-spinner';
import Http from '../common/Http';


export default {
  name: 'Journalists',
  components: { Spinner, Table_Button_Group, Paginator, Journalist_Card, Journalists_Header },
  data() {
    return {
      currentPage: 1,
      showedType: 'Aktiv',
      loading: true,
      paginationListLength: null,
      workers: [],
      showMessageEmpty: false,
      searchText: '',
    };
  },
  watch: {
    getOrganizationID: {
      immediate: true,
      handler(id) {
        if (id) {
          this.getJournalists(id);
        }
      },
    },
  },
  methods: {
    async emitSearchText(val) {
      this.searchText = val;
      await this.getJournalists(this.getOrganizationID);
    },
    async getJournalists(id) {
      this.loading = true;
      let req;
      try {
        req = await Http.get('api/journalist/allByStatus', {
          params: {
            page: this.currentPage,
            size: 9,
            search: this.searchText,
            status: (this.showedType === 'Aktiv') ? 'ACTIVE' : 'INACTIVE',
            id: id,
          },
        });
      } catch (e) {
        return null;
      }
      this.searchText = '';
      this.paginationListLength = req.data.object.totalPages;
      this.workers = req.data.object.content;
      if (this.workers.length) {
        this.loading = false;
      } else {
        this.loading = false;
        this.showMessageEmpty = true;
      }
    },
    setShowedType(type) {
      this.showMessageEmpty = false;
      this.showedType = type;
      this.getJournalists(this.getOrganizationID);
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
  },
  computed: {
    getOrganizationID() {
      return this.$store.getters['getOrganizationID'];
    },
    colType() {
      return this.$store.getters.sidebarIsOpen ? 'col-4' : 'col-3';
    },
  },
};
</script>

<style scoped lang='scss'>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.textInfo {
  margin-top: 50px;
  text-align: center;
  font-size: 24px;
  color: #0058BF;;
}

.spinnerWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.workersWrapper {
  flex-grow: 3;
}

.workers_list {
  display: flex;
  flex-wrap: wrap;
  padding-top: 30px;

  .worker {
    margin-bottom: 15px;
  }
}

.btnGroup {
  margin-top: 20px;
}

.paginator {
  margin-top: auto;
}

</style>