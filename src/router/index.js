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
        component: () => import(/* webpackChunkName: "about" */ "../pages/Home/Dashboard.vue")
      },     
      {
        path: "/profiles",
        name: "Profiles",
        component: () => import(/* webpackChunkName: "about" */ "../pages/Profiles/Profiles.vue")
      },     
      {
        path: "/offenses",
        name: "Offenses",
        component: () => import(/* webpackChunkName: "about" */ "../pages/Offenses/Offenses.vue")
      },     
      {
        path: "/offenders",
        name: "Offenders",
        component: () => import(/* webpackChunkName: "about" */ "../pages/Offenses/Offenders.vue")
      },     
      {
        path: "/reports",
        name: "Reports",
        component: () => import(/* webpackChunkName: "about" */ "../pages/Reports/Reports.vue")
      },     
    ]
  }  
];

let router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log('to route', to)

  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   if (localStorage.getItem('token') === '' || localStorage.getItem('token') === null) {
  //     next({
  //       path: '/login',
  //       params: { nextUrl: to.fullPath }
  //     })
  //   } else {
  //     store.dispatch('getToken')
  //     next()
  //   }
  // } else if (to.matched.some(record => record.meta.guest)) {
  //   if (localStorage.getItem('token') === '' || localStorage.getItem('token') === null) {
  //     next()
  //   } else {
  //     next({ name: 'Dashboard' })
  //   }
  // } else 
  
  if(to.path === '/') {
    next({
      path: '/home'
    })
  }
  else {
    next()
  }
})

export default router;
