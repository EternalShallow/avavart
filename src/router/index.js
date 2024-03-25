import {
  createRouter,
  createWebHashHistory,
} from "vue-router";

const Index = () => import("@/pages/index.vue");
const HowGetAirdrop = () => import("@/pages/howGetAirdrop.vue");

const routes = [
  {
    path: "/",
    name: 'Home',
    component: Index,
  },
  {
    path: "/howgetairdrop",
    name: 'HowGetAirdrop',
    component: HowGetAirdrop,
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
