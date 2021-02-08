<template>
  <div class="search">
    <input v-model="searchText" placeholder="Izlash" type="text">
    <img v-if="typingMode" @click="emitSearchText" src="../assets/icons/search.png" class="search_icon">
    <img v-else @click="clearSearchText" src="../assets/icons/searchCancel.svg" class="search_icon">
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      searchText: '',
      typingMode: true,
    };
  },
  methods: {
    emitSearchText() {
      if (!this.searchText.trim().length) {
        return null;
      }
      this.$emit('search-text', this.searchText);
      this.typingMode = false;
    },
    clearSearchText() {
      this.searchText = '';
      this.$emit('search-text', this.searchText);
      this.typingMode = true;
    },
  },
};
</script>

<style scoped lang="scss">
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
    position: absolute;
    cursor: pointer;
    width: 18px;
    height: 18px;

    top: 9px;
    right: 20px;
  }
}


@media only screen and (max-width: 992px) {
  .search {
    input {
      height: 35px;
      font-size: 16px;
      padding-left: 15px;
    }

    input::-webkit-input-placeholder {
      font-size: 16px;
    }

    .search_icon {
      width: 16px;
      height: 16px;
      top: 9px;
      right: 20px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .search {
    input {
      height: 30px;
      font-size: 14px;
      padding-left: 15px;
    }

    input::-webkit-input-placeholder {
      font-size: 14px;
    }

    .search_icon {
      width: 13px;
      height: 13px;
      top: 9px;
      right: 20px;
    }
  }
}
</style>