<template>
  <div class="app-main-layout">
    <SideBar
        class="sidebar"
        :class='{"smallSideBar":!sidebarIsOpen}' />
    <div class="mainContent">
      <Navbar class="navbar" />
      <div class="routerContent">
        <div v-if="!userInfoLoaded" class="spinnerWrapper">
          <Spinner size="huge" line-fg-color="rgba(0, 88, 191, 0.5)" />
        </div>
        <router-view v-else />
      </div>
    </div>
  </div>
</template>

<script>


import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'mainLayout',
  components: { SideBar, Navbar, Spinner },
  computed: {
    sidebarIsOpen() {
      return this.$store.getters.sidebarIsOpen;
    },
    userInfoLoaded() {
      return this.$store.getters['getUserInfoIsLoaded'];
    },
  },
  mounted() {

  },
};
</script>

<style scoped>


.app-main-layout {
  height: 100%;
  display: flex;

}

.spinnerWrapper {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.routerContent {
  height: 90%;
  padding: 0 3%;
}

.sidebar {
  min-width: 18%
}

.mainContent {
  width: 100%;
  overflow-y: scroll;
}


.smallSideBar {
  min-width: 100px;
}

@media only screen and (max-width: 1400px) {

  .smallSideBar {
    min-width: 65px;
  }
}


@media only screen and (max-width: 1200px) {

  .smallSideBar {
    min-width: 55px;
  }
}

@media only screen and (max-width: 768px) {

  .smallSideBar {
    min-width: 44px;
  }
}

</style>
