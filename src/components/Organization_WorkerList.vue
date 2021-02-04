<template>
  <div class='container'>
    <div class='row'>
      <SearchInput class='search col-6' />
    </div>
    <div class='tableWrapper row'>
      <table class='table container'>
        <thead>
        <tr class='tableHeader row'>
          <th class='col-6'>Xodimlar ro’yxati</th>
          <th class='col-4'>Lavozimi</th>
          <th class='col-2'>Faolligi</th>
        </tr>
        </thead>
        <tbody>
        <tr class='tableList row' v-for='(worker) in workers' :key='worker.id'>
          <td class='tableItem col-6'>{{ worker.firstName + ' ' + worker.lastName + ' ' + worker.fatherName }}</td>
          <td class='tableItem col-4'>{{ worker.position }}</td>
          <td class='tableItem col-2'>
            <img v-if='worker.status === "ACTIVE"' src='../assets/icons/doneGreen.svg'>
            <img v-else src='../assets/icons/notDone.svg'>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <paginator :items='workers' :range='6' @current-page='setCurrentPage' @items-for-render='renderItems' />
  </div>
</template>

<script>
import SearchInput from './SearchInput';
import Paginator from './Paginator';
import Http from '../common/Http';

export default {
  name: 'Organization_WorkerList',
  props: ['orgId'],
  components: { Paginator, SearchInput },
  data() {
    return {
      renderedItems: [],
      currentPage: 1,
      workers: [],
      searchText: '',
      loading: true,
    };
  },
  methods: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    renderItems(items) {
      this.renderedItems = [...items];
    },
  },
  async mounted() {
    this.workers = (await Http.get('api/journalist/allByStatus', {
      params: {
        id: this.orgId,
        page: this.currentPage,
        size: 5,
        search: this.searchText,
        status: 'ACTIVE',
      },
    })).data.object.content;
    console.log(this.workers);
  },
};
</script>

<style scoped lang='scss'>

.table_wrapper {
  height: 500px;

  .table {
    height: 100%;
  }
}

.nameBlock {
  width: 500px;
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

    &:nth-child(3), &:nth-child(4) {
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
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


</style>