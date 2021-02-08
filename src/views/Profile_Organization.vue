<template>
  <div class="wrapper container">
    <div class="row">
      <Organization_Profile_Header class="col header" :info="info" />
    </div>
    <div class="row">
      <SearchInput @search-text="setSearchText" class="search col-6" />
    </div>
    <div class="tableWrapper row">
      <table class="table container">
        <thead>
        <tr class="tableHeader row">
          <th class="col-6">Xodimlar ro’yxati</th>
          <th class="col-4">Lavozimi</th>
          <th class="col-2">Faolligi</th>
        </tr>
        </thead>
        <tbody v-if="workers.length && !loading">
        <tr class="tableList row" v-for="(worker) in workers" :key="worker.id">
          <td class="tableItem col-6">{{ worker.firstName + ' ' + worker.lastName + ' ' + worker.fatherName }}</td>
          <td class="tableItem col-4">{{ worker.position }}</td>
          <td class="tableItem col-2">
            <img v-if='worker.status === "ACTIVE"' src="../assets/icons/doneGreen.svg">
            <img v-else src="../assets/icons/notDone.svg">
          </td>
        </tr>
        </tbody>
        <div v-if="!workers.length && !loading" class="infoText">Xodimlar topilmadi</div>
        <Spinner class="row" v-if="loading" size="large" line-fg-color="rgba(0, 88, 191, 0.5)" />
      </table>
    </div>
    <div class="row paginator">
      <paginator :pagination-list-length="paginationListLength" :current-page="currentPage" :range="3"
                 @current-page="setCurrentPage" />
    </div>
  </div>
</template>

<script>
import Organization_Profile_Header from '../components/Organization_Profile_Header';
import Http from '../common/Http';
import SearchInput from '../components/SearchInput';
import Paginator from '../components/Paginator';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Profile_Organization',
  components: { SearchInput, Spinner, Paginator, Organization_Profile_Header },
  data() {
    return {
      orgId: '',
      info: {},
      listStatus: '',
      currentPage: 1,
      workers: [],
      searchText: '',
      loading: true,
      paginationListLength: 1,
    };
  },
  methods: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    async fetchWorkers() {
      this.loading = true;
      this.workers = [];
      this.workers = (await Http.get('api/journalist/allByStatus', {
        params: {
          id: this.orgId,
          page: this.currentPage,
          size: 5,
          search: this.searchText,
          status: 'ACTIVE',
        },
      })).data.object.content;
      this.$emit('ready');
      this.loading = false;
    },
    async setSearchText(text) {
      this.searchText = text;
      await this.fetchWorkers();
    },
  },
  async created() {
    this.orgId = this.$route.params.id;
    this.info = (await Http.get('api/organ/' + this.orgId)).data.object;
    await this.fetchWorkers();
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  margin-top: 30px;
}

.paginator {
  margin-top: auto;
}

.infoText {
  text-align: center;
  padding-top: 24px;
  font-weight: bold;
  font-size: 24px;
}


.search {
  width: 50%;
  margin: 10px 0;
}

.tableHeader {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.035em;
  color: #0058BF;
  background: rgba(0, 88, 191, 0.2);
  height: 50px;

  th {
    text-align: left;
    display: flex;
    align-items: center;

    &:nth-child(1) {
      padding-left: 20px;
    }

    &:nth-child(2) {
      padding-left: 5px;
    }

    &:nth-child(3),
    &:nth-child(4) {
      justify-content: center;
    }

  }
}

.tableList {
  font-size: 16px;

  &:nth-child(even) {
    background: #f2f7fc
  }

  &:nth-child(odd) {
    background: #fff;
  }

  .tableItem {
    padding: 11px 0;
    text-align: left;

    &:nth-child(3), &:nth-child(4) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:nth-child(1) {
      padding-left: 20px;
    }

    &:nth-child(2) {
      padding-left: 5px;
    }

  }
}

.tableWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


</style>