<template>
  <div class="buttongroup" :class='{"listType":type==="list"}'>
    <div class="button" @click="toggleBtn(leftText)" :class='{"active":getTableSelectedButton===leftText}'>
      {{ leftText }}
    </div>
    <div class="button" @click="toggleBtn(rightText)" :class='{"active":getTableSelectedButton===rightText}'>
      {{ rightText }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Table_Button_Group',
  props: ['leftText', 'rightText', 'type'],
  watch: {
    leftText: {
      immediate: true,
      handler(val) {
        if (val) {
          this.selected = val;
          this.$emit('showed-type', this.selected);
        }
      },
    },
  },
  methods: {
    toggleBtn(btnname) {
      this.selected = btnname;
      this.$store.dispatch('setTableSelectedButton', btnname);
      this.$emit('showed-type', this.selected);
    },
  },
  mounted() {
    this.$store.dispatch('setTableSelectedButton', this.leftText);
  },
  computed: {
    getTableSelectedButton() {
      return this.$store.getters['getTableSelectedButton'];
    },
  },
};
</script>

<style scoped lang="scss">

.buttongroup {
  cursor: pointer;
  font-size: 17px;
  color: #0058BF;
  transition-duration: 300ms;
  display: flex;
  justify-content: space-around;
  padding: 0;

  .button {
    width: 50%;
    padding: 10px 0;
    text-align: center;

    &:first-child {
      border-top-left-radius: 15px;
      border-top: 2px solid #0058BF;
      border-left: 2px solid #0058BF;
    }

    &:last-child {
      border-top: 2px solid #0058BF;
      border-right: 2px solid #0058BF;
      border-top-right-radius: 15px;
    }
  }
}

.active {
  background-color: #0058BF;
  color: #fff;
}

.listType {
  border-bottom: 2px solid #0058BF;
  border-radius: 25px;

  .button {
    &:first-child {
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
    }

    &:last-child {
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;

    }
  }
}

@media only screen and (max-width: 1400px) {
  .buttongroup {
    font-size: 16px;

    .button {
      padding: 8px 0;
    }
  }
}

@media only screen and (max-width: 1200px) {
  .buttongroup {
    font-size: 15px;

    .button {
      padding: 7px 0;
    }
  }
}

@media only screen and (max-width: 992px) {
  .buttongroup {
    font-size: 14px;

    .button {
      padding: 6px 0;
    }
  }
}

@media only screen and (max-width: 768px) {
  .buttongroup {
    font-size: 12px;

    .button {
      padding: 5px 0;
    }
  }
}
</style>