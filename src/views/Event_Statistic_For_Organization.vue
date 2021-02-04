<template>
  <div>
    <div class='spinnerWrapper' v-if='loading'>
      <Spinner size='large' line-fg-color='rgba(0, 88, 191, 0.5)' />
    </div>
    <div v-else class=''>
      <div class='container'>
        <div class='row'>
          <div class='col'>
            <div class='info'>
              Tadbirga ro’yxatdan o’tgan {{ organizationState.name }} tashkilotining
              xodimlari
            </div>
          </div>
        </div>
        <div v-if='!eventInfo.length' class='row'>
          <div class='col textInfo'>Topilmadi</div>
        </div>
        <div v-else class='tableWrapper row'>
          <table class='table container'>
            <thead>
            <tr class='tableHeader row'>
              <th class='col'>Xodim</th>
              <th class='col'>Matbuot tashkilot</th>
              <th v-if='eventType!=="allAfter"' class='col-2'>Faolligi</th>
            </tr>
            </thead>
            <tbody>
            <tr class='tableList row' v-for='(guest) in eventInfo' :key='guest.id'>
              <td class='tableItem col'>
                {{ guest.journalist.firstName + ' ' + guest.journalist.lastName + ' ' + guest.journalist.fatherName }}
              </td>
              <td class='tableItem col'>{{ guest.journalist.organizationName }}</td>
              <td v-if='eventType!=="allAfter"' class='tableItem col-2'>
                <img v-if='guest.isAttended' src='../assets/icons/doneGreen.svg'>
                <img v-else src='../assets/icons/notDone.svg'>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <paginator v-if='eventInfo.length' :pagination-list-length='paginationListLength' :range='5'
                   @current-page='setCurrentPage' />
      </div>
    </div>

  </div>
</template>

<script>
import Paginator from '../components/Paginator';
import Http from '../common/Http';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Event_Statistic_For_Organization',
  components: { Paginator, Spinner },
  data() {
    return {
      paginationListLength: 1,
      currentPage: 1,
      eventId: '',
      eventType: '',
      eventInfo: {},
      loading: true,
    };
  },
  computed: {
    organizationState() {
      return this.$store.getters['getOrganizationState'];
    },
  },
  methods: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    async fetchInfo() {
      this.loading = true;
      let organId = this.$store.getters['getOrganizationID'];
      this.eventInfo = (await Http.get('api/event/statistics', {
        params: {
          eventId: this.eventId,
          organId: organId,
          page: this.currentPage,
          size: 5,
        },
      })).data.object.content;
      this.loading = false;
      console.log(this.eventInfo);
    },
  },
  created() {
    this.eventId = this.$route.params.eventId;
    this.eventType = this.$route.params.eventType;
  },
  async mounted() {
    if (!this.organizationState.id) {
      await this.$store.dispatch('identifyUser', localStorage.getItem('USER_ID'));
    }
    await this.fetchInfo();
  },

};
</script>

<style scoped lang='scss'>
.info {
  margin-top: 20px;
  font-size: 26px;
}

.textInfo {
  margin-top: 50px;
  text-align: center;
  font-size: 24px;
  color: #0058BF;;
}

.spinnerWrapper {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tableList_wrapper {
  border-left: 2px solid #D7D7D7;
  border-right: 2px solid #D7D7D7;
  border-bottom: 2px solid #D7D7D7;
  cursor: pointer;
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
  background: #fff;


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
      padding-left: 10px;

    }
  }
}

.tableWrapper {
  height: 510px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
}
</style>