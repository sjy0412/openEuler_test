import Vue from 'vue';
import VueRouter from 'vue-router';

const original = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return original.call(this, location).catch(err => err);
}

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/workbench',
    name: 'Workbench',
    component: () => import('@/views/workbench/Workbench.vue'),
    children: [
      {
        path: 'task',
        name: 'TaskList',
        component: () => import('@/views/workbench/TaskList.vue'),
      },
      {
        path: 'serverManagement',
        name: 'ServerManagement',
        component: () => import('@/views/workbench/ServerManagement.vue'),
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: () => import('@/views/workbench/MenuManagement.vue'),
      },
      {
        path: 'accountMaintenance',
        name: 'AccountMaintenance',
        component: () => import('@/views/workbench/AccountMaintenance.vue'),
      },
    ]
  },
  {
    path: '/projectDetail',
    name: 'projectDetail',
    component: () => import('@/views/taskDetail/projectDetail.vue'),
  },
  {
    path: '*',
    redirect: '/login',
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior () {
    return {
      x: 0,
      y: 0,
    }
  }
});
export default router;