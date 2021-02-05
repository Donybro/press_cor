<template>
  <div class='sidebar_wrapper'>
    <div class='title'>
      <img @click='toggleSidebar' src='../assets/icons/hamburger.png' alt=''>
      <span v-if='sidebarIsOpen'>{{ title[getRole] }}</span>
    </div>
    <router-link active-class='active'
                 :exact='item.isExact'
                 class='listItem'
                 v-for='item in list[getRole]'
                 :key='item.name'
                 tag='div'
                 :to='item.to'>
      <img :src='item.logo' alt=''>
      <span class='menu_list' v-if='sidebarIsOpen'>{{ item.name }}</span>
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
      title: {
        'ROLE_ORGANIZATION': 'Matbuot tashkiloti',
        'ROLE_ADMIN': 'Admiistratsiya',
        'ROLE_CREATOR': 'Creator',
        'ROLE_JOURNALIST': 'Jurnalist',
      },
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

<style scoped lang='scss'>

.sidebar_wrapper {
  background: #070D93;
  box-sizing: border-box;
}

.listItem {
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  padding-left: 32px;
  height: 50px;

  &:hover {
    background-color: #4a8cc9;
  }

  img {
    width: 30px;
    height: 30px;
  }

  span {
    padding-left: 20px;
    font-size: 17px;

  }
}

.active {
  background-color: #4a8cc9;
}

.title {
  font-size: 20px;
  color: #FFFFFF;
  display: flex;
  height: 8%;
  align-items: center;
  margin-bottom: 100px;
  margin-top: 10px;

  img {
    cursor: pointer;
    width: 33px;
    height: 24px;
    margin-left: 30px;
  }

  span {
    margin-left: 20px;
  }
}

.menu_list {
  font-size: 18px;
}

@media only screen and (max-width: 1100px) {
  .title {
    font-size: 18px;

    img {
      width: 28px;
      height: 20px;
      margin-left: 20px;
    }

    span {
      margin-left: 15px;
    }
  }

}

@media only screen and (max-width: 768px) {
  .title {
    font-size: 16px;

    img {
      width: 24px;
      height: 17px;
      margin-left: 10px;
    }

    span {
      margin-left: 10px;
    }
  }

}

</style>
