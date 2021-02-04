<template>
  <div class=''>
    <div v-if='isLoading'>
      <Spinner size='large' line-fg-color='rgba(0, 88, 191, 0.5)' />
    </div>
    <div v-else>
      <div class='wrapper'>
        <div class='info'>
          <div class='photo'>
          </div>
          <div class='name'>{{ worker.lastName + ' ' + worker.firstName + ' ' + worker.fatherName }}</div>
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
          <div class='btn-wrapper'>
            <div @click='sendWorkerStatus' class='savebtn'>
              <Spinner v-if='sending' size='20px' line-fg-color='rgba(0, 88, 191, 0.5)' />
              <span v-else>Saqlash</span>
            </div>
          </div>
        </div>
        <div class='inputField'>
          <label for='companyName'>Lavozimi</label>
          <input :disabled='!editPositionMode' ref='positionWorker' id='companyName' v-model='position' type='text'>
          <div @click='toggleEditPositionNameMode' class='editIcon'>
            <img v-if='!editPositionMode' src='../assets/icons/edit.svg' alt=''>
            <img @click='sendWorkerPosition' v-else src='../assets/icons/done.svg' alt=''>
          </div>
        </div>
        <div class='phone'>
          <div class='title'>Telefon raqami</div>
          <div class=''>{{ worker.phoneNumber }}</div>
        </div>
        <div class='licence' @click='getPDF'>
          <span>ID kartani yuklab olish (pdf, jpg)</span>
          <img src='../assets/icons/download.svg' alt=''>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '../common/Http';
import Spinner from 'vue-simple-spinner';

export default {
  name: 'Profile_Worker',
  components: { Spinner },
  data() {
    return {
      isActive: true,
      position: '',
      worker: null,
      editPositionMode: false,
      isLoading: true,
      sending: false,
    };
  },
  methods: {
    toggleEditPositionNameMode() {
      this.editPositionMode = !this.editPositionMode;
      if (this.editPositionMode) {
        setTimeout(() => {
          this.$refs.positionWorker.focus();
        }, 200);
      }
    },
    getPDF() {
      Http.get('api/journalist/QR', {
        params: {
          id: this.$route.params.id,
        },
      });
    },
    async sendWorkerStatus() {
      this.sending = true;
      let status = this.isActive ? 'ACTIVE' : 'INACTIVE';
      await Http.post('api/journalist/change', {
        id: this.worker.id,
        status,
      });
      this.sending = false;
    },
    async sendWorkerPosition() {
      let sendObject = {
        ...this.worker,
        position: this.position,
      };
      delete sendObject['status'];
      delete sendObject['role'];
      delete sendObject['organizationName'];
      delete sendObject['certificateId'];
      await Http.patch('api/journalist', sendObject);
    },
  },
  async mounted() {
    let id = this.$route.params.id;
    this.worker = (await Http.get('api/journalist/' + id)).data.object;
    if (this.worker.id) { // checking for available worker
      console.log(this.worker);
      this.position = this.worker.position;
      this.isActive = (this.worker.status === 'ACTIVE');
      this.isLoading = false;
    }

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

.licence {
  font-size: 22px;
  line-height: 26px;
  color: #0058BF;
  cursor: pointer;
  display: flex;
  position: relative;
  width: 60%;

  img {
    margin-left: 10px;
  }
}

.phone {
  display: flex;
  flex-direction: column;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 30px;

  .title {
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
  }
}

.wrapper {
  display: flex;
  padding-top: 10px;
  flex-direction: column;
}

.info {
  display: flex;
  align-items: center;
  width: 100%;
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

    .addPhoto {
      position: absolute;
      bottom: 0;
      right: 10px;
      cursor: pointer;
    }
  }
}

.workerState {
  width: 60%;
  display: flex;
  margin: 30px 0;
}

.isActive {
  width: 50%;
  font-size: 24px;
  line-height: 28px;
}

.formField {
  display: flex;
  align-items: center;

  &:first-child {
    margin-bottom: 10px;
  }

  input {
    cursor: pointer;
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }

  label {
    cursor: pointer;
  }
}

.btn-wrapper {
  display: flex;
  flex-direction: column-reverse;
  cursor: pointer;

  .savebtn {
    background: #0058BF;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    height: 50px;
    width: 120px;
  }
}

.inputField {
  display: flex;
  flex-direction: column;
  width: 30%;
  position: relative;
  margin-top: 10px;
  margin-bottom: 30px;

  input {
    font-size: 24px;
    line-height: 28px;
    padding-left: 20px;
    padding-top: 6px;
    padding-bottom: 6px;
    border: 1px solid #DADADA;
    outline: none;
  }

  input::-webkit-input-placeholder {
    font-size: 24px;
    line-height: 28px;
  }

  label {
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    margin-bottom: 10px;
  }
}

.editIcon {
  cursor: pointer;
  position: absolute;
  right: -60px;
  top: 32px;
  height: 100%;
}
</style>