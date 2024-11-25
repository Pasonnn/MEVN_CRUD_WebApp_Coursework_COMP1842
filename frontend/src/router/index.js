import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import SignupPage from '../pages/SignupPage.vue';
import Dashboard from '../pages/Dashboard.vue';
import Words from '../pages/Words.vue';
// import New from '../pages/New.vue';
// import Test from '../pages/Test.vue';
// import Profile from '../pages/Profile.vue';
// import UserManagement from '../pages/UserManagement.vue';

const routes = [
  { path: '/', redirect: '/login' }, // Redirect to login by default
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: '', redirect: 'dashboard/words' }, // Redirect dashboard root to Words tab
      { path: 'words', component: Words },
      //{ path: 'new', component: New },
      //{ path: 'test', component: Test },
      //{ path: 'profile', component: Profile },
      //{ path: 'user-management', component: UserManagement },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
