<template>
  <div class='container wrapper'>
    <div class='row'>
      <div class='col'>
        <div class='title'>Tasdiqlanishi kutilayotgan
          {{ (showedType === 'Tashkilotlar') ? 'matbuot tashkilotlar' : ' erkin jurnalistlar' }}
        </div>
      </div>
    </div>
    <div class='row'>
      <Table_Button_Group @showed-type='sethowedType' class='col-4 tableBtns' left-text='Tashkilotlar'
                          right-text='Erkin jurnalistlar' />
    </div>
    <div class='tableWrapper row'>
      <table class='table container'>
        <thead>
        <tr class='tableHeader row'>
          <th class='col-6'>Tashkilot nomi</th>
          <th class='col-2'>Litsenziya</th>
          <th class='col-4'>Tasdiqlash</th>
        </tr>
        </thead>
        <tbody v-if='loading'>
        <Spinner class='spinnerWrapper' size='large' line-fg-color='rgba(0, 88, 191, 0.5)' />
        </tbody>
        <tbody v-else>
        <tr class='tableList row' v-for='(item) in notifications' :key='item.id'>
          <td v-if='showedType==="Tashkilotlar"' class='col-6 tableItem'>{{ item.name }}</td>
          <td v-else class='col-6 tableItem'>
            {{ item.firstName + ' ' + item.lastName + ' ' + item.fatherName }}
          </td>
          <td class='col-2 tableItem'>
            <a download='userLicense' :href='getHref(item)'>
              <img src='../assets/icons/download.svg'>
            </a>
          </td>
          <td class='col-4 tableItem'>
            <Action_Buttons @success='sethowedType(showedType)' :type='showedType' :id='item.id' />
          </td>
        </tr>
        </tbody>
        <div class='infoText' v-if='!notifications.length && !loading'>
          Yangi sorovlar topilmadi
        </div>
      </table>
    </div>
    <div class='row paginator'>
      <paginator :range='5' :pagination-list-length='paginationListLength' @current-page='setCurrentPage' />
    </div>
  </div>
</template>

<script>
import Paginator from '../components/Paginator';
import Action_Buttons from '../components/Action_Buttons';
import Http from '../common/Http';
import Table_Button_Group from '../components/Table_Button_Group';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Notification',
  components: { Spinner, Table_Button_Group, Action_Buttons, Paginator },
  data() {
    return {
      currentPage: 1,
      notifications: [],
      paginationListLength: 1,
      showedType: '',
      loading: false,
    };
  },
  methods: {
    async sethowedType(type) {
      this.currentPage = 1;
      this.showedType = type;
      this.loading = true;
      if (type === 'Tashkilotlar') {
        await this.getNewOrganizations();
      } else {
        await this.getNewWorkers();
      }
    },
    async setCurrentPage(page) {
      this.currentPage = page;
      this.loading = true;
      if (this.showedType === 'Tashkilotlar') {
        await this.getNewOrganizations();
      } else {
        await this.getNewWorkers();
      }
    },
    async getNewWorkers() {
      this.loading = true;
      let req = (await Http.get('api/journalist/allForCheck', {
        params: {
          page: this.currentPage,
          size: 5,
        },
      })).data;
      this.paginationListLength = req.object.totalPages || 1;
      this.notifications = req.object.content;
      this.loading = false;
    },
    async getNewOrganizations() {
      this.loading = true;
      let req = (await Http.get('api/organ/allByStatus', {
        params: {
          page: this.currentPage,
          size: 5,
          search: '',
          status: 'PENDING',
        },
      })).data;
      this.paginationListLength = req.object.totalPages || 1;
      this.notifications = req.object.content;
      this.loading = false;
    },
    getHref(item) {
      let id = (this.showedType === 'Tashkilotlar') ? item['licenseId'] : item['certificateId'];
      return 'http://aokaevents.tcrp.uz/api/file/' + id;
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


.tableBtns {
  margin-left: 2px;
}

.infoText {
  text-align: center;
  padding-top: 24px;
  font-weight: bold;
  font-size: 24px;
}

.title {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  margin: 20px 0;
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

    &:nth-child(2), &:nth-child(3), &:nth-child(4) {
      justify-content: center;
    }
  }
}

.tableList {
  font-size: 16px;

  &:nth-child(even) {
    background: #d9e3f0;
  }

  &:nth-child(odd) {
    background: #fff;
  }

  .tableItem {
    text-align: left;
    display: flex;
    align-items: center;

    &:nth-child(2), &:nth-child(3), &:nth-child(4) {
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

    img {
      cursor: pointer;
    }
  }
}

.tableWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.spinnerWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.paginator {
  margin-top: auto;
}
</style>