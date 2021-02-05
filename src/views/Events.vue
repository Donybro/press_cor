<template>
  <div class='wrapper container'>
    <div class='row btnsGroup'>
      <Table_Button_Group class='col-3 btns'
                          @showed-type='setShowedType'
                          :left-text='leftButtonText'
                          :right-text='rightButtonText'
      />
    </div>
    <div class='row tableWrapper'>
      <table class='table container'>
        <thead>
        <tr class='row tableHeader'>
          <th class='col-6'>Tadbir nomi</th>
          <th class='col-3'>Sana</th>
          <th class='col-3'>Qo’shilish</th>
        </tr>
        </thead>
        <tr v-if='loading' class='spinnerWrapper col'>
          <Spinner class='spinnerWrapper' size='large' line-fg-color='rgba(0, 88, 191, 0.5)' />
        </tr>
        <tbody v-if='!loading  && events.length'>
        <tr class='row tableList' v-for='(event) in events' :key='event.name'>
          <td class='tableItem col-6'>{{ event.name }}</td>
          <td class='tableItem col-3'>{{
              new Date(event.dateTime) | date
            }}
          </td>
          <td class='tableItem  buttonWrapper col-3'>
            <button
                @click='$router.push(`/event/${queryString}/${event.id}`)'
                class='btn'
            >
              Batafsil
            </button>
          </td>
        </tr>
        </tbody>
        <tr v-if='!events.length && queryString==="allAvailable"' class='textInfo'>Yangi tadbirlar hozircha yoq</tr>
        <tr v-if='!events.length && queryString==="allJoined"' class='textInfo'>A`zo bo`lgan tadbirlar hozircha yoq</tr>
      </table>
    </div>
    <div class='row paginator'>
      <paginator :range='2' :paginationListLength='paginationListLength'
                 :currentPage='currentPage' @current-page='setCurrentPage' />
    </div>
  </div>
</template>

<script>
import Paginator from '../components/Paginator';
import Table_Button_Group from '../components/Table_Button_Group';
import Http from '../common/Http';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Events',
  components: { Table_Button_Group, Paginator, Spinner },
  props: ['searchText'],
  data() {
    return {
      add: false,
      currentPage: 1,
      leftButtonText: '',
      rightButtonText: '',
      showedType: '',
      paginationListLength: 1,
      loading: true,
      events: [],
      queryString: '',
      ROLE: '',
      searchContent: '',
    };
  },
  watch: {
    getWorkerID: {
      immediate: true,
      async handler(id) {
        if (id) {
          await this.fetchEvents(id);
        }
      },
    },
    async searchText(text) {
      this.searchContent = text;
      await this.fetchEventsForAdmin();
    },
  },
  methods: {
    async setShowedType(type) {
      this.showedType = type;
      this.loading = true;
      this.currentPage = 1;
      this.paginationListLength = 0;
      if (this.ROLE === 'ROLE_JOURNALIST') {
        await this.fetchEvents(this.getWorkerID);
      }
      if (this.ROLE === 'ROLE_ADMIN' || this.ROLE === 'ROLE_CREATOR' || this.ROLE === 'ROLE_ORGANIZATION') {
        await this.fetchEventsForAdmin();
      }
    },
    async setCurrentPage(page) {
      this.currentPage = page;
      this.loading = true;
      if (this.ROLE === 'ROLE_JOURNALIST') {
        await this.fetchEvents(this.getWorkerID);
      }
      if (this.ROLE === 'ROLE_ADMIN' || this.ROLE === 'ROLE_CREATOR' || this.ROLE === 'ROLE_ORGANIZATION') {
        await this.fetchEventsForAdmin();
      }
    },
    async fetchEvents(id) {
      this.queryString = this.showedType === 'A’zo bo’lingan' ? 'allJoined' : 'allAvailable';
      let eventsObject = (await Http.get('api/event/' + this.queryString, {
        params: {
          id: id,
          page: this.currentPage,
          size: 5,
        },
      })).data.object;
      this.paginationListLength = eventsObject.totalPages;
      if (eventsObject.content.length) {
        this.events = eventsObject.content.map((item) => {
          if (item.name.length > 120) {
            return {
              ...item,
              name: item.name.slice(0, 120) + '...',
            };
          } else return item;
        });
      } else {
        this.events = [];
      }
      this.loading = false;
    },
    async fetchEventsForAdmin() {
      this.queryString = (this.showedType === 'O’tgan' || this.showedType === '') ? 'allBefore' : 'allAfter';
      let eventsObject = (await Http.get('api/event/' + this.queryString, {
        params: {
          page: this.currentPage,
          size: 5,
          search: this.searchContent,
        },
      })).data.object;
      console.log(eventsObject);
      this.paginationListLength = eventsObject.totalPages;
      this.searchContent = '';
      if (eventsObject.content.length) {
        this.events = eventsObject.content.map((item) => {
          if (item.name.length > 120) {
            return {
              ...item,
              name: item.name.slice(0, 120) + '...',
            };
          } else return item;
        });
      } else {
        this.events = [];
      }
      this.loading = false;
    },

  },
  computed: {
    getWorkerID() {
      return this.$store.getters['getWorkerID'];
    },
    userInfoLoaded() {
      return this.$store.getters['getUserInfoIsLoaded'];
    },
  },
  async created() {
    this.ROLE = localStorage.getItem('ROLE');
    if (this.ROLE === 'ROLE_JOURNALIST') {
      this.leftButtonText = 'Tadbirlar';
      this.rightButtonText = 'A’zo bo’lingan';
    } else {
      this.leftButtonText = 'O’tgan';
      this.rightButtonText = 'Yangi';
      await this.fetchEventsForAdmin();
    }
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

.paginator {
  margin-top: auto;
}

.spinnerWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.warningText {
  text-align: center;
  padding-top: 20px;
  font-size: 25px;
  color: #0058BF;
}

.btn {
  border-radius: 6px;
  border: 1px solid #0058BF;
  background: transparent;
  color: #0058BF;
  padding: 7px 25px;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background: #0058BF;
    color: #fff;
  }
}

.btnsGroup {
  margin-top: 20px;
}

.btns {
  margin-left: 2px;
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
    background: #f2f7fc;
  }

  &:nth-child(odd) {
    background: #ffffff;
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
      display: flex;
      align-items: center;
    }

    &:nth-child(2) {
      display: flex;
      align-items: center;
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