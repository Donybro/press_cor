<template>
  <div class='navbar_wrapper'>
    <Spinner v-if='!userInfoLoaded' size='50px' line-fg-color='rgba(0, 88, 191, 0.5)' />
    <div v-else class='wrapperProfile'>
      <Bell v-if='getRole==="ROLE_ADMIN"' :newMessage='newMessage' class='bell' />
      <span @click='$router.push("/profile")' class='profile'>
        <span class='photo'>
            <img v-if='pathToPhoto' :src='"http://aokaevents.tcrp.uz/api/file/"+pathToPhoto' alt=''>
            <img v-if='getRole === "ROLE_ADMIN" || getRole === "ROLE_CREATOR"' :src='logodefault' alt=''>
        </span>
          <span class='profile_title'>{{ showName }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import Bell from './Bell';
import Spinner from 'vue-simple-spinner';
import logodefault from '../assets/icons/images.png';

export default {
  name: 'Navbar',
  components: { Bell, Spinner },
  data() {
    return {
      newMessage: true,
      pathToPhoto: '',
      logodefault,
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
  watch: {
    userInfoLoaded(state) {
      if (state) {
        if (this.getRole === 'ROLE_JOURNALIST') {
          this.pathToPhoto = this.$store.getters['getWorkerState'].photoId;
        } else if (this.getRole === 'ROLE_ORGANIZATION') {
          this.pathToPhoto = this.$store.getters['getOrganizationState'].logoId;
        }
      }
    },
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

.profile {
  display: flex;
  align-items: center;
  cursor: pointer;

  .photo {
    height: 44px;
    width: 44px;
    background: #231;
    border-radius: 50%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .profile_title {
    margin-left: 10px;
    font-size: 22px;
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

@media only screen and (max-width: 992px) {
  .profile {
    .photo {
      width: 33px;
      height: 33px;
    }

    .profile_title {
      font-size: 20px;
    }
  }

}

@media only screen and (max-width: 768px) {
  .profile {
    .photo {
      width: 25px;
      height: 25px;
    }

    .profile_title {
      font-size: 16px;
    }
  }

}
</style>