import { RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";
import Layout from "@/layout/index.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    name: "Home",
    meta: {
      title: "首页",
    },
    component: Layout,
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页",
        },
        component: Home,
      },
    ],
  },
  {
    path: "/system",
    name: "system",
    meta: {
      title: "系统管理",
      alwaysShow: true,
    },
    component: Layout,
    children: [
      {
        path: "/system/user",
        name: "/system/user",
        meta: {
          title: "用户列表",
        },
        component: () => import("@/views/user/index.vue"),
      },
      {
        path: "/system/route",
        name: "/system/route",
        meta: {
          title: "菜单列表",
        },
        component: () => import("@/views/route/index.vue"),
      },
    ],
  },
];

export default routes;
