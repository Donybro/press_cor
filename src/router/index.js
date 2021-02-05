import Vue from 'vue';
import VueRouter from 'vue-router';


function initialComponent() {
  let ROLE = localStorage.getItem('ROLE');
  console.log(ROLE, 'from ROUTE');
  if (ROLE === 'ROLE_ORGANIZATION') {
    return import(`../views/Journalists`);
  } else if (ROLE === 'ROLE_ADMIN') {
    return import('../views/Organizations');
  } else if (ROLE === 'ROLE_JOURNALIST') {
    return import('../views/Events');
  } else if (ROLE === 'ROLE_CREATOR') {
    return import('../views/Secretar_Events');
  } else return import('../views/404');
}

function getStatisticsComponent() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_ADMIN') {
    return import('../views/Events');
  } else return import('../views/404');
}

function getProfileComponent() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_ORGANIZATION') {
    return import(`../views/Profile_Press`);
  } else if (ROLE === 'ROLE_JOURNALIST') {
    return import('../views/Journalist_Profile');
  } else if (ROLE === 'ROLE_ADMIN' || ROLE === 'ROLE_CREATOR') {
    return import('../views/Profile_Admin');
  } else return import('../views/404');
}

function getProfileWithId() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_ORGANIZATION') {
    return import('../views/Profile_Worker');
  } else if (ROLE === 'ROLE_ADMIN') {
    return import('../views/Profile_Organization');
  } else return import('../views/404');
}

function getAddWorkerPage() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_ORGANIZATION') {
    return import('../views/AddNewWorker');
  } else return import('../views/404');
}

function getOrganizations() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_ADMIN') {
    return import(`../views/Organizations`);
  } else return import('../views/404');
}

function getJournalists() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_ORGANIZATION') {
    return import(`../views/Journalists`);
  } else return import('../views/404');
}

function getNotification() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_ADMIN') {
    return import(`../views/Notification`);
  } else return import('../views/404');
}

function getEvents() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_JOURNALIST' || ROLE === 'ROLE_ORGANIZATION') {
    return import('../views/Events');
  } else if (ROLE === 'ROLE_CREATOR') {
    return import('../views/Secretar_Events');
  } else return import('../views/404');
}

function getEventsInfo() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_JOURNALIST') {
    return import('../views/Event_Info_Container');
  } else if (ROLE === 'ROLE_CREATOR') {
    return import('../views/Event_Info_Secretary_Container');
  } else if (ROLE === 'ROLE_ADMIN') {
    return import('../views/Statistic_Info_Container');
  } else if (ROLE === 'ROLE_ORGANIZATION') {
    return import('../views/Event_Statistic_For_Organization');
  } else return import('../views/404');
}

function getStatisticsInfoComponent() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_ADMIN') {
    return import('../views/Statistic_Info_Container');
  } else return import('../views/404');
}

function getOrganizationProfile() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_ADMIN') {
    return import('../views/Profile_Organization');
  } else return import('../views/404');
}

function getAddEvent() {
  let ROLE = localStorage.getItem('ROLE');
  if (ROLE === 'ROLE_CREATOR') {
    return import('../views/AddEvent');
  } else return import('../views/404');
}

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    meta: { layout: 'main', auth: true },
    component: () => {
      return initialComponent();
    },
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import(`../views/Registration`),
    meta: { layout: 'empty', auth: false },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => {
      console.log('AuthROute');
      return import(`../views/Auth`);
    },
    meta: { layout: 'empty', auth: false },
  },
  {
    path: '/organizations',
    name: 'Organizations',
    component: () => {
      return getOrganizations();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/organizations/:id',
    name: 'Organizations',
    component: () => {
      return getOrganizationProfile();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/journalists',
    name: 'Journalists',
    component: () => {
      return getJournalists();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/journalists/addWorker',
    name: 'Journalists',
    component: () => {
      return getAddWorkerPage();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => {
      return getStatisticsComponent();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/statistics/:type=last',
    name: 'Statistics',
    component: () => {
      return getStatisticsInfoComponent();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/statistics/:infoType',
    name: 'Statistics',
    component: () => {
      return getStatisticsInfoComponent();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => {
      return getProfileComponent();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => {
      return getProfileWithId();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/events',
    name: 'Events',
    component: () => {
      return getEvents();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/addEvent',
    name: 'AddEvent',
    component: () => {
      return getAddEvent();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/event/:eventType/:eventId',
    name: 'Events',
    component: () => {
      return getEventsInfo();
    },
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () => getNotification(),
    meta: { layout: 'main', auth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth);
  let isAuth = localStorage.getItem('isAuth');

  if (requireAuth && isAuth !== 'true') {
    next('/auth');
  } else
    next();
});
export default router;
