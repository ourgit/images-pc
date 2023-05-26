import { createRouter, createWebHashHistory } from "vue-router";
//createWebHistory
const routes = [
  {
    path: "/",

    redirect: '/home',
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("@/views/detail/index.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search/index.vue"),
  },
  {
    path: "/share/",
    name: "share",
    component: () => import("@/views/share/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
