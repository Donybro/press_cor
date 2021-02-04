<template>
  <div class=''>
    <Organization_Profile_Header :info='info' class='header' />
    <Organization_WorkerList class='list' :orgId='orgId' />
  </div>
</template>

<script>
import Organization_Profile_Header from '../components/Organization_Profile_Header';
import Organization_WorkerList from '../components/Organization_WorkerList';
import Http from '../common/Http';

export default {
  name: 'Profile_Organization',
  components: { Organization_WorkerList, Organization_Profile_Header },
  data() {
    return {
      orgId: '',
      info: {},
      listStatus: '',
    };
  },
  async created() {
    this.orgId = this.$route.params.id;
    this.info = (await Http.get('api/organ/' + this.orgId)).data.object;
  },
};
</script>

<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>