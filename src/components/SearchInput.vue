<template>
  <div class='search'>
    <input v-model='searchText' placeholder='Izlash' type='text'>
    <img @click='emitSearchText' src='../assets/icons/search.png' class='search_icon'>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    emitSearchText() {
      if (!this.searchText.trim().length) {
        return null;
      }
      this.$emit('search-text', this.searchText);
      this.searchText = '';
    },
  },
};
</script>

<style scoped lang='scss'>
.search {
  position: relative;
  padding: 0;

  input {
    background: #FFFFFF;
    border: 1px solid #DADADA;
    box-sizing: border-box;
    border-radius: 50px;
    width: 100%;
    height: 37px;
    font-size: 16px;
    color: #7D7D7D;
    padding-left: 20px;
    outline: none;
  }

  input::-webkit-input-placeholder {
    font-size: 16px;
  }

  .search_icon {
    cursor: pointer;
    width: 18px;
    height: 18px;
    position: absolute;
    top: 9px;
    right: 20px;
  }
}
</style>