import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Paginate from 'vuejs-paginate';
import Spinner from 'vue-simple-spinner';
import Vuelidate from 'vuelidate';
import dateFilter from './filters/date';
import VueSimpleAlert from 'vue-simple-alert';
import './assets/css/datePicker.css';

Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;
Vue.component('paginate', Paginate);
Vue.component('spinner', Spinner);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
