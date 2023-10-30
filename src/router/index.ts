import { createRouter, createWebHashHistory } from "vue-router";

//   components

const login = () =>
  import(/* webpackChunkName: "login" */ "../views/login/login.vue");

const logs = () => import(/* webpackChunkName: "logs" */ "../views/logs.vue");

const main = () => import(/* webpackChunkName: "main" */ "../views/main.vue");

const reports = () =>
  import(/* webpackChunkName: "logs" */ "../views/Reports/reports.vue");

const userInfo = () =>
  import(/* webpackChunkName: "userInfo" */ "../views/user-info/userInfo.vue");

const vendors = () =>
  import(/* webpackChunkName: "vendors" */ "../views/vendor/vendor.vue");

const contracts = () =>
  import(/* webpackChunkName: "vendors" */ "../views/contracts/contracts.vue");

const settings = () =>
  import(/* webpackChunkName: "vendors" */ "../views/settings/settings.vue");

const fileUpload = () =>
  import(
    /* webpackChunkName: "fileUpload" */ "../views/files_upload/file_upload.vue"
  );

const dashboard = () =>
  import(
    /* webpackChunkName: "dashboard" */ "../views/dashboard/dashboard.vue"
  );

const notify = () =>
  import(/* webpackChunkName: "dashboard" */ "../views/notify/notify.vue");

const addOrEditUser = () => import(/* webpackChunkName: "addOrEditUser" */ "../views/user-info/addOrEditUser.vue");

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "", name: "login", component: login },
    {
      path: "/layout",
      name: "main",
      component: main,
      children: [
        { path: "/dashboard", name: "dashboard", component: dashboard },
        { path: "/logs", name: "logs", component: logs },
        { path: "/report", name: "report", component: reports },
        { path: "/userInfo", name: "userInfo", component: userInfo },
        { path: "/vendors", name: "vendors", component: vendors },
        { path: "/contracts", name: "contracts", component: contracts },
        { path: "/settings", name: "settings", component: settings },
        { path: "/fileupload", name: "fileupload", component: fileUpload },
        { path: "/notify", name: "notify", component: notify },
        { path: "/addOrEditUser", name: "addOrEditUser", component: addOrEditUser}
      ],
    },
  ],
});
export default router;

// router.beforeEach(async (to, from, next) => {
//   let userActive = JSON.parse(sessionStorage.getItem("activeTab")!);

//   if (userActive) {
//     next();
//   } else if (!userActive && from.path == "/" && to.path !== "/") {
//     next("/");
//   } else {
//     next();
//   }
// });

router.beforeEach(async (to, from, next) => {
  let isValidSession = localStorage.getItem('sessionId') ? true : false
  if(isValidSession && (from.path == '/' && to.path == '/' && to.query.logout != 'true')) {
    next({ path: 'dashboard' })
  } else {
    next()
  }
})
