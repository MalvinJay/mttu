import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../pages/Index"

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "about" */ "../pages/Login.vue")
  },
  {
    path: "/",
    name: "index",
    component: Index,
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import(/* webpackChunkName: "about" */ "../pages/Home.vue")
      },     
      {
        path: "/profiles",
        name: "Profiles",
        component: () => import(/* webpackChunkName: "about" */ "../pages/Profiles.vue")
      },     
      {
        path: "/offenses",
        name: "Offenses",
        component: () => import(/* webpackChunkName: "about" */ "../pages/Offenses.vue")
      },     
      {
        path: "/reports",
        name: "Reports",
        component: () => import(/* webpackChunkName: "about" */ "../pages/Reports.vue")
      },     
    ]
  }  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
