<template>
  <div class='container'>
    <Spinner v-if='loading' class='row' size='large' line-fg-color='rgba(0, 88, 191, 0.5)' />
    <div v-else class='wrapper container'>
      <div class='info'>
        <div class='photo'>
          <img v-if='info.logoId' :src='"http://aokaevents.tcrp.uz/api/file/" + info.logoId' alt=''>
        </div>
        <div class='name'>{{ info.name }}</div>
      </div>
      <div class='workerState'>
        <div class='isActive'>
          <div class='formField'>
            <label class='container'>Aktiv
              <input v-model='isActive' type='radio' :value='true' checked='checked' name='radio'>
              <span class='checkmark'></span>
            </label>
          </div>
          <div class='formField'>
            <label class='container'>Aktiv emas
              <input v-model='isActive' type='radio' :value='false' checked='checked' name='radio'>
              <span class='checkmark'></span>
            </label>
          </div>
        </div>
        <div @click='saveChanges' class='btn'>Saqlash</div>
      </div>
      <div class='phone'>
        <div class='title mb-2'>Telefon raqam</div>
        {{ info.phoneNumber }}
      </div>
    </div>
  </div>
</template>

<script>
import Http from '../common/Http';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Organization_Profile_Header',
  components: { Spinner },
  props: ['info'],
  data() {
    return {
      isActive: true,
      loading: true,
    };
  },
  watch: {
    info: {
      immediate: true,
      handler(info) {
        if (info.id) {
          this.isActive = this.info.status === 'ACTIVE';
          this.loading = false;
        }
      },
    },
  },
  methods: {
    saveChanges() {
      try {
        Http.post('api/organ/change', {
          id: this.info.id,
          status: this.isActive ? 'ACTIVE' : 'INACTIVE',
        });
        this.$alert('Saqlandi!', '', 'success');
      } catch (e) {
        this.$alert('Xatolik yuz berdi!', '', 'error');
        console.log(e);
      }
    },
  },
  mounted() {
    console.log('Header');
  },
};
</script>

<style scoped lang='scss'>

.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border: 1px solid #0058BF;
  border-radius: 50%;
  transition-duration: 200ms;
}


.container input:checked ~ .checkmark {
  background-color: #0058BF;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  top: 7px;
  left: 7px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: white;
}

.wrapper {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}

.info {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 32px;
  line-height: 37px;

  .photo {
    width: 90px;
    height: 90px;
    background-color: #ba2e2e;
    border-radius: 50%;
    position: relative;
    margin-right: 20px;

    img {
      border-radius: 50%;
      height: 100%;
      width: 100%;
    }

    .addPhoto {
      position: absolute;
      bottom: 0;
      right: 10px;
      cursor: pointer;
    }
  }
}

.btn {
  background: #0058BF;
  border-radius: 30px;
  font-size: 14px;
  line-height: 14px;
  color: #FFFFFF;
  height: 20%;
  align-self: flex-end;
  margin-bottom: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.workerState {
  display: flex;
}

.phone {
  display: flex;
  flex-direction: column;
  font-size: 24px;
  line-height: 28px;

  .title {
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
  }
}

</style>