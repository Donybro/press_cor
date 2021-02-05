<template>
  <div class='container'>
    <div class='header row'>
      <div class='title col-5'>{{ eventInfo.name }}</div>
      <div class='date_block col-7'>
        <div class='date'><span>O’tkazilish kuni:</span> {{ new Date(eventInfo.dateTime) | date }}</div>
        <div class='hour'>
          <img src='../assets/icons/clock.svg' alt=''>
          {{ new Date(eventInfo.dateTime) | date('time') }}
        </div>
      </div>
    </div>
    <div class='row blocks'>
      <div class='col-4'>
        <div class='block'>
          <div>{{ eventInfo.maxAmount }}</div>
          <div>Ja’mi o’rinlar</div>
        </div>
      </div>
      <div class='col-4'>
        <div class='block'>
          <div>{{ eventInfo.joinedCount }}</div>
          <div>Ro’yxatdan o’tganlar</div>
        </div>
      </div>
      <div class='col-4' v-if='eventType==="allBefore"'>
        <div class='block'>
          <div>{{ eventInfo.visitorsCount }}</div>
          <div>Qatnashganlar</div>
        </div>
      </div>
    </div>
    <div class='row'>
      <div v-if='eventType==="allAfter"' class='col-12 title'> Tadbirda ishtirok etadiganlar ro’yxati</div>
      <div v-else class='col-12 title'>Tadbirda ishtirok etganlar ro’yxati</div>
    </div>
    <div class='tableWrapper row'>
      <table class='table container'>
        <thead>
        <tr class='tableHeader row'>
          <th class='col-5'>Xodimlar ro’yxati</th>
          <th class='col-5'>Matbuot tashkilot</th>
          <th v-if='eventType==="allBefore"' class='col'>Faolligi</th>
        </tr>
        </thead>
        <tbody v-if='guests.length'>
        <tr class='tableList row' v-for='(guest) in guests' :key='guest.id'>
          <td class='tableItem col-5'>
            {{ guest.journalist.firstName + ' ' + guest.journalist.lastName + ' ' + guest.journalist.fatherName }}
          </td>
          <td class='tableItem col-5'>{{ guest.journalist.organizationName }}</td>
          <td v-if='eventType==="allBefore"' class='tableItem col'>
            <img v-if='guest.isAttended' src='../assets/icons/doneGreen.svg'>
            <img v-else src='../assets/icons/notDone.svg'>
          </td>
        </tr>
        </tbody>
        <div v-else class='infoText'>Royxatda hech kim topilmadi</div>
      </table>
    </div>
    <paginator :pagination-list-length='paginationListLength' :range='5' @current-page='setCurrentPage' />
  </div>
</template>

<script>
import Paginator from '../components/Paginator';

export default {
  name: 'Statistic_Info',
  components: { Paginator },
  props: ['eventId', 'eventType', 'eventInfo', 'guests'],
  data() {
    return {
      currentPage: 1,
      paginationListLength: 1,
    };
  },
  mounted() {
    console.log(this.eventInfo);
    console.log(this.guests);
  },
  watch: {
    // eventGuests: {
    //   immediate: true,
    //   handler(items) {
    //     if (items.length) {
    //       this.prepare = items.map((item) => {
    //         console.log(item);
    //         if (item.organization.length > 80) {
    //           return {
    //             ...item,
    //             organization: item.organization.slice(0, 80) + '...',
    //           };
    //         } else return item;
    //       });
    //     }
    //   },
    // },
  },
  methods: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped lang='scss'>

.infoText {
  text-align: center;
  padding-top: 24px;
  font-weight: bold;
  font-size: 24px;
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
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:nth-child(3), &:nth-child(4) {
      display: flex;
      align-items: center;
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
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.tableWrapper {
  height: 410px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  margin: 10px 0;
}

.blocks {
  display: flex;
  justify-content: space-around;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  line-height: 23px;
  font-weight: bold;

  span {
    font-weight: normal;
  }

  .date_block {
    display: flex;
    justify-content: flex-end;

    .hour {
      margin-left: 20px;
      display: flex;
      align-items: center;

      img {
        margin-left: 10px;
        margin-right: 5px;
      }
    }
  }
}


.block {
  border-radius: 6px;
  padding: 20px;
  background: #CCDEF2;
  color: #0058BF;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;


  div {
    height: 40px;
    text-align: center;

    &:first-child {
      font-size: 36px;
      line-height: 42px;

    }
  }
}

</style>