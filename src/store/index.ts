import { createStore } from "vuex";
import accessLog from "./accesslog";
import tabs from "./tabs";
import dash from "./dashboard";
import settings from "./settings";
import cMaster from "./contractMaster";
import notify from "./pushNotification";
import user from "./userDetails";
import vendor from "./vendors";
import version from "./version";
import auth from "./ssoLogin";
import reports from "./reports";
import fileupload from "./fileupload"
// import commonFunc from "../mixins/commonFunc";
const store = createStore({
  state: {
    buildDate: "23_08_2023_11_50",
    activePageTab: "Accesslog",
    vendor_code: "bFjXyEeYdIiihXY",
    userId: "",
    sessionId: "",
  },
  modules: {
    reports,
    accessLog,
    tabs,
    dash,
    settings,
    cMaster,
    notify,
    user,
    vendor,
    version,
    auth,
    fileupload
  },
  mutations: {
    setActivePageTab(state: any, payload: any) {
      state.activePageTab = payload;
    },
    setUserId(state, payload) {
      state.userId = payload;
    },
    setSessionId(state, payload) {
      state.sessionId = payload;
    },
  },
  getters: {
    getUserId: (state) => state.userId,
    getSessionId: (state) => state.sessionId,
  },
});
export default store;
