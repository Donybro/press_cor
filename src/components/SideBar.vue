<template>
  <div class="sidebar_wrapper">
    <div class="title" :class="{showSideBar:sidebarIsOpen}">
      <img @click="toggleSidebar" src="../assets/icons/hamburger.png" alt="">
    </div>
    <router-link active-class="active"
                 :exact="item.isExact"
                 class="listItem"
                 v-for="item in list[getRole]"
                 :key="item.name"
                 tag="div"
                 :to="item.to">
      <img :src="item.logo" alt="">
      <span class="menu_list" v-if="sidebarIsOpen">{{ item.name }}</span>
    </router-link>
  </div>
</template>

<script>
import group from '../assets/icons/group.svg';
import pie_chart from '../assets/icons/pie-chart.svg';
import profile from '../assets/icons/profile.svg';

export default {
  name: 'SideBar',
  components: {},
  data() {
    return {
      list: {
        'ROLE_ORGANIZATION': [
          {
            name: 'Jurnalistlar',
            to: '/journalists',
            isExact: true,
            logo: group,
          },
          {
            name: 'Tadbirlar',
            to: '/events',
            isExact: true,
            logo: pie_chart,
          },
          {
            name: 'Profil',
            to: '/profile',
            isExact: true,
            logo: profile,
          },
        ],
        'ROLE_ADMIN': [
          {
            name: 'Matbuot tashkilotlar',
            to: '/organizations',
            isExact: true,
            logo: group,
          },
          {
            name: 'Statistika',
            to: '/statistics',
            isExact: true,
            logo: pie_chart,
          },
          {
            name: 'Profil',
            to: '/profile',
            isExact: true,
            logo: profile,
          },
        ],
        'ROLE_CREATOR': [
          {
            name: 'Tadbirlar',
            to: '/events',
            isExact: true,
            logo: group,
          },
          {
            name: 'Profil',
            to: '/profile',
            isExact: true,
            logo: profile,
          },
        ],
        'ROLE_JOURNALIST': [
          {
            name: 'Tadbirlar',
            to: '/events',
            isExact: true,
            logo: group,
          },
          {
            name: 'Profil',
            to: '/profile',
            isExact: true,
            logo: profile,
          },
        ],
      },
      // title: {
      //   'ROLE_ORGANIZATION': 'Matbuot tashkiloti',
      //   'ROLE_ADMIN': 'Admiistratsiya',
      //   'ROLE_CREATOR': 'Creator',
      //   'ROLE_JOURNALIST': 'Jurnalist',
      // },
    };
  },
  methods: {
    async toggleSidebar() {
      await this.$store.dispatch('toggleSidebar');
    },
  },
  async created() {
    await this.$store.dispatch('me');
  },
  computed: {
    sidebarIsOpen() {
      return this.$store.getters.sidebarIsOpen;
    },
    getRole() {
      return this.$store.getters.getRole;
    },
  },
};
</script>

<style scoped lang="scss">

.active {
  background-color: #4a8cc9;
}

.sidebar_wrapper {
  background: #070D93;
  box-sizing: border-box;
}

.title {
  display: flex;
  height: 8%;
  align-items: center;
  margin-bottom: 100px;
  margin-top: 10px;
  padding-left: 30px;

  img {
    cursor: pointer;
    width: 36px;
    height: 27px;
  }

}

.listItem {
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  padding-left: 30px;
  height: 60px;

  &:hover {
    background-color: #4a8cc9;
  }

  img {
    width: 33px;
    height: 33px;
  }

  span {
    padding-left: 12px;
    font-size: 18px;
  }
}


//.showSideBar {
//  justify-content: flex-start;
//}

@media only screen and (max-width: 1400px) {
  .title {
    padding-left: 19px;

    img {
      width: 28px;
      height: 21px;
    }
  }
  .listItem {
    padding-left: 19px;
    height: 50px;

    img {
      width: 25px;
      height: 25px;
    }

    span {
      padding-left: 20px;
      font-size: 16px;

    }
  }

}

@media only screen and (max-width: 1200px) {
  .title {
    padding-left: 15px;

    img {
      width: 25px;
      height: 18px;
    }
  }
  .listItem {
    padding-left: 15px;
    height: 50px;

    img {
      width: 22px;
      height: 22px;
    }

    span {
      padding-left: 20px;
      font-size: 14px;

    }
  }
}

@media only screen and (max-width: 768px) {
  .title {
    padding-left: 10px;

    img {
      width: 24px;
      height: 17px;
    }
  }
  .listItem {
    padding-left: 10px;
    height: 40px;

    img {
      width: 22px;
      height: 22px;
    }

    span {
      padding-left: 20px;
      font-size: 13px;

    }
  }

}

</style>
