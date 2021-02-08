<template>
  <div class="container">
    <div class="row main">
      <img v-if="organization.logoId" :src="'http://aokaevents.tcrp.uz/api/file/'+organization.logoId">
      <img v-else alt="">
      <div class="name">{{ organization.name }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Organization_Card',
  props: ['organization'],
  mounted() {
    console.log(this.organization);
  },
};
</script>

<style scoped lang="scss">
.main {
  background: #FFFFFF;
  border-radius: 6px;
  padding: 10px 5px;
  transition-duration: 150ms;
  cursor: pointer;
  display: flex;
  flex-wrap: nowrap;
  width: 260px;

  &:hover {
    box-shadow: rgba(23, 109, 209, 0.2) 0px 7px 29px 0px;
  }

  img {
    width: 75px;
    height: 75px;
    background-color: #ccc;
    border-radius: 50%;
    border: 1px solid #0058BF;
  }

  .name {
    font-size: 16px;
    line-height: 19px;
    color: #0058BF;
    display: flex;
    align-items: center;
    padding-left: 5px;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media only screen and (max-width: 1359px) {
  .main {
    width: 260px;
    padding: 10px 5px;

    img {
      width: 75px;
      height: 75px;
    }

    .name {
      font-size: 16px;
      width: 180px;
      padding-left: 5px;
    }
  }

}

@media only screen and (max-width: 1200px) {
  .main {
    width: 220px;
    padding: 10px 5px;

    img {
      width: 65px;
      height: 65px;
    }

    .name {
      font-size: 14px;
      width: 160px;
      padding-left: 5px;
    }
  }

}

@media only screen and (max-width: 992px) {
  .main {
    width: 165px;
    padding: 10px 5px;

    img {
      width: 55px;
      height: 55px;
    }

    .name {
      font-size: 14px;
      width: 100px;
      padding-left: 2px;
    }
  }

}

@media only screen and (max-width: 768px) {
  .main {
    width: 125px;
    padding: 10px 5px;

    img {
      width: 35px;
      height: 35px;
    }

    .name {
      font-size: 11px;
      width: 90px;
      padding-left: 2px;
    }
  }

}
</style>