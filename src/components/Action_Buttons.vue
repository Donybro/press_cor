<template>
  <td class='tableItem'>
    <div class='btns'>
      <div class='btn_add confirm' @mouseenter='switchConfirmIcon' @mouseleave='switchConfirmIcon'>
        <img v-if='!confirmHovered' class='' src='../assets/icons/confirm.svg'>
        <img v-else src='../assets/icons/confirm_hover.svg'>
      </div>
      <div class='btn_add2 cancel' @mouseenter='switchCancelIcon' @mouseleave='switchCancelIcon'>
        <img v-if='!cancelHovered' src='../assets/icons/cancel.svg'>
        <img v-else src='../assets/icons/cancel_hovered.svg'>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  name: 'Action_Buttons',
  data() {
    return {
      confirmHovered: false,
      cancelHovered: false,
    };
  },
  methods: {

    switchConfirmIcon() {
      this.confirmHovered = !this.confirmHovered;
    },
    switchCancelIcon() {
      this.cancelHovered = !this.cancelHovered;
    },
  },
};
</script>

<style scoped lang='scss'>
.tableItem {
  padding: 11px 0;
  text-align: center;
}

.btns {
  display: flex;
  justify-content: center;
}

.btn_add, .btn_add2 {
  position: relative;
  display: flex;
  height: 24px;
  width: 24px;
  cursor: pointer;

  .border {
    position: absolute;
    top: 0;
  }

  .body {
    position: absolute;
    top: 7px;
    left: 7px;
  }
}

.btn_add2 {
  margin-left: 20px;
}
</style>