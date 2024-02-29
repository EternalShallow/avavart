import {
  createRouter,
  createWebHashHistory,
} from "vue-router";

const Index = () => import("@/pages/index.vue");

const routes = [
  {
    path: "/",
    name: 'Index',
    component: Index,
  },
  // {
  //   path: "/launchpad",
  //   name: 'LaunchPad',
  //   component: LaunchPad,
  // },
  {
    path: "/:catchAll(.*)", // 此处需特别注意至于最底部
    redirect: "/",
  },
];

const mainRoutes = routes
  .concat
  // DownloadRoute
  ();

export default createRouter({
  history: createWebHashHistory(),
  routes: mainRoutes,
});
