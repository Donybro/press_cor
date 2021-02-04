<template>
  <paginate
      :page-count="paginationListLength"
      v-model="paginationCurrentpage"
      :page-range="pageSize"
      :click-handler="paginateHandler"
      :prev-text="prevTextButton"
      :next-text="nextTextButton"
      :container-class="'custom_pagination'"
      :page-class='"custom_page_class"'
      :active-class='"custom_active"'
  ></paginate>
</template>

<script>
import d from '../assets/icons/done.svg';

export default {
  name: 'Paginator',
  emits: ['items-for-render', 'current-page'],
  props: ['paginationListLength', 'range', 'currentPage'],
  data() {
    return {
      d,
      paginationCurrentpage: 1,
      prevTextButton: '<div class="iconPrev" ></div>',
      nextTextButton: '<div class="iconNext" ></div>',
      pageSize: null,
    };
  },
  methods: {
    paginateHandler(num) {
      this.$emit('current-page', +num);
      this.paginationCurrentpage = +num;
    },
  },
  mounted() {
    this.pageSize = this.range;
    this.paginationCurrentpage = this.currentPage;
  },
};
</script>

<style>
.custom_pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  width: 100%;

}

.custom_page_class a {
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 40px;
  outline: none;
  user-select: none;
}

.custom_page_class a:hover {
  text-decoration: none;
}

.custom_page_class {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #0058BF;
  border-radius: 50%;
  margin-right: 10px;
  transition-duration: 200ms;
}

.custom_pagination li a {
  outline: none;
  user-select: none;
}

.custom_pagination li:first-child {
  margin-right: 30px;
}

.custom_pagination li:last-child {
  margin-left: 20px;
}

.custom_active {
  border: 1px solid #0058BF;
  background-color: #0058BF;
}

.custom_active a {
  color: #fff;
}

.iconPrev {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid transparent;
  background: url("../assets/icons/prev.svg") center no-repeat;

}

.iconNext {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid transparent;
  background: url("../assets/icons/next.svg") center no-repeat;

}

.iconNext:hover {
  border: 1px solid #0058BF;
  transition-duration: 100ms;
}

.iconPrev:hover {
  border: 1px solid #0058BF;
  transition-duration: 100ms;
}
</style>