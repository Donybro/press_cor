<template>
  <div class='navbar_wrapper'>
    <Spinner v-if='!userInfoLoaded' size='50px' line-fg-color='rgba(0, 88, 191, 0.5)' />
    <div v-else class='wrapperProfile'>
      <Bell v-if='getRole==="ROLE_ADMIN"' :newMessage='newMessage' class='bell' />
      <span @click='$router.push("/profile")' class='profile'>
        <span class='photo'>
           <img :src='"http://aokaevents.tcrp.uz/api/file/"+pathToPhoto' alt=''>
        </span>
          <span class='profile_title'>{{ showName }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import Bell from './Bell';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Navbar',
  components: { Bell, Spinner },
  data() {
    return {
      newMessage: true,
      pathToPhoto: '',
    };
  },
  computed: {
    sidebarIsOpen() {
      return this.$store.getters.sidebarIsOpen;
    },
    userInfoLoaded() {
      return this.$store.getters['getUserInfoIsLoaded'];
    },
    getRole() {
      return this.$store.getters.getRole;
    },
    showName() {
      let role = this.getRole;
      if (role === 'ROLE_ADMIN') {
        return 'Admin';
      } else if (role === 'ROLE_CREATOR') {
        return 'Creator';
      } else if (role === 'ROLE_ORGANIZATION') {
        return this.$store.getters['getOrganizationState'].name;
      } else if (role === 'ROLE_JOURNALIST') {
        return this.$store.getters['getWorkerState'].firstName + ' ' + this.$store.getters['getWorkerState'].lastName;
      } else return false;
    },
  },
  created() {
    if (this.getRole === 'ROLE_JOURNALIST') {
      this.pathToPhoto = this.$store.getters['getWorkerState'].photoId;
    } else if (this.getRole === 'ROLE_ORGANIZATION') {
      this.pathToPhoto = this.$store.getters['getOrganizationState'].logoId;
    }
  },
};
</script>

<style scoped lang='scss'>

.navbar_wrapper {
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 0;
}

.title {
  font-size: 20px;
  color: #000000;
  margin-left: 30px;
}


.profile {
  display: flex;
  align-items: center;
  cursor: pointer;

  .photo {
    height: 44px;
    width: 44px;
    background: #231;
    border-radius: 50%;
    border: 1px solid #0058BF;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .profile_title {
    margin-left: 10px;
    font-size: 28px;
    line-height: 33px;
    color: #000000;
  }
}


.wrapperProfile {
  display: flex;
  align-items: center;
  margin-right: 30px;

  .bell {
    margin-right: 20px;
  }
}
</style>