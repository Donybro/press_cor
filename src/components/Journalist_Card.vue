<template>
  <div class="main">
    <div @click="$router.push(`/profile/${worker.id}`)" class="wrapper">
      <div class="">
        <div class="photo">
          <img :src="'http://aokaevents.tcrp.uz/api/file'+worker.photoId" alt="">
        </div>
      </div>
      <div class="info">
        <div class="name">
          {{ worker.lastName }}
          {{ worker.firstName }}
          {{ worker.fatherName }}
        </div>
        <div class="job">
          {{ worker.position }}
        </div>
      </div>
    </div>
    <div class="id">
      <div @click="getLicense" class="id_body">
        <span>ID karta</span>
        <img class="icon" src="../assets/icons/download.svg">
      </div>
    </div>
  </div>
</template>

<script>

import Http from '../common/Http';
import fileDownload from 'js-file-download';

export default {
  name: 'Journalist_Card',
  props: ['worker'],
  mounted() {
    console.log(this.worker);
  },
  methods: {
    async getLicense() {
      if (!this.worker.photoId) {
        this.$alert('Id kartani xodim rasimisiz yuklab bo`lmaydi!', '', 'error');
        return null;
      }
      let file = await Http({
        url: 'http://aokaevents.tcrp.uz/api/journalist/QR/' + this.worker.id,
        method: 'GET',
        responseType: 'blob',
      });
      fileDownload(file.data, 'license.pdf');
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  background: #fff;
  border-radius: 6px;
  transition-duration: 150ms;
  cursor: pointer;
  position: relative;
  padding: 10px 15px 35px 15px;

  &:hover {
    box-shadow: rgba(23, 109, 209, 0.2) 0px 7px 29px 0px;
  }
}

.wrapper {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
}


.photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #68c3c8;
}

.info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  width: 200px;
}

.id {
  width: 90%;
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
  font-weight: bold;
  color: #0058BF;
  position: absolute;
  bottom: 5px;

  .id_body {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 15px;
    border: 1px solid transparent;
  }

  .icon {
    width: 16px;
    height: 16px;
    margin-left: 5px;
  }
}

.name {
  font-weight: bold;
  font-size: 15px;
  color: #0058BF;
}

.job {
  font-size: 14px;
  margin-top: 5px;
}

@media only screen and (max-width: 768px) {
  .wrapper {
    padding: 20px 15px;
  }
  .photo {
    width: 60px;
    height: 60px;
  }
  .name {
    font-size: 14px;
  }
  .job {
    font-size: 14px;
  }
  .id {
    font-size: 12px;
  }
}
</style>