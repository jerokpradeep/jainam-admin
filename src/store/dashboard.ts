import { httpService } from "../services/httpservices";
const state = {
  topViewedPages: [],
  visitorsPerDay: [],
  topviewsLoader: false,
  tab: [
    { type: "Unique Active Users", count: "0", active: true },
    { type: "Web Login", count: "0", active: false },
    { type: "Mobile Login", count: "0", active: false },
    { type: "API Login", count: "0", active: false },
  ],
  totalCount: 0,
};
const mutations = {
  setUserCountDetails(state: any, payload: any) {
    state.userCountDetails = payload;
  },
  setTopViewedPages(state: any, payload: any) {
    state.topViewedPages = payload;
  },

  setVisitorsPerDay(state: any, payload: any) {
    state.visitorsPerDay = payload;
  },
  setVisitorsPerDayLoader(state: any, payload: any) {
    state.VisitorsPerDayloader = payload;
  },

  setTopviewsLoader(state: any, payload: any) {
    state.topviewsLoader = payload;
  },

  setUserCount(state: any, payload: any) {
    state.tab.forEach((el: any) => {
      if (el.type == "Unique Active Users") {
        el.count = payload.totalCount ? `${payload.totalCount}` : "0";
      }
      if (el.type == "Web Login") {
        el.count = payload.web ? `${payload.web}` : "0";
      }
      if (el.type == "Mobile Login") {
        el.count = payload.mob ? `${payload.mob}` : "0";
      }
      if (el.type == "API Login") {
        el.count = payload.api ? `${payload.api}` : "0";
      }
    });
  },

  setTotalUserCount(state: any, payload: any) {
    state.totalCount = payload;
  },
};

const actions = {
  async getUserCountDetails({ commit }: any) {
    await httpService
      .getUserCountDetails()
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.status == "Ok" &&
          response.data.message != "No Records Found"
        ) {
          commit("setUserCountDetails", response.data.result);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      }).finally;
    () => {};
  },

  async getTopViewedPages({ commit }: any) {
    commit("setTopviewsLoader", true);
    await httpService
      .getTopViewedPages()
      .then((response) => {
        if (response.data) {
          commit("setTopViewedPages", response.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        commit("setTopviewsLoader", false);
      });
  },

  async getVisitorsPerDay({ commit }: any) {
    // commit("setgetVisitorsPerDayLoader", true);
    await httpService
      .getVisitorsPerDay()
      .then((response) => {
        if (response.data) {
          // console.log(response.data);
          commit("setVisitorsPerDay", response.data);
        }
        console.log();
      })
      .catch(() => {})
      .finally(() => {
        commit("setVisitorsPerDayLoader", false);
      });
  },

  async getSeperateUserCount({ commit }: any) {
    await httpService
      .getUserCount()
      .then((response) => {
        if (
          response.data?.message == "Success" &&
          response.data?.result.length &&
          response.status == 200
        ) {
          commit("setUserCount", response.data?.result[0]);
          commit("setTotalUserCount", response.data?.result[0]?.totalCount);
        }
      })
      .catch(() => {})
      .finally(() => {
        commit("setTopviewsLoader", false);
      });
  },
};

const getters = {
  getTopViewedPages: (state: any) => state.topViewedPages,
  getVisitorsPerDay: (state: any) => state.visitorsPerDay,
  getUserTabs: (state: any) => state.tab,
  getTotalCount: (state: any) => state.totalCount,
};

const dash = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default dash;
