import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

const state = {
  accessLogDetails: "",
  isAccessLog: false,
  accessRow: "",
  loader: false,
  payOutDetails: [],
  FeedbackDetails: [],
  AddNewScript: [],
  downloadLoader: false,
  mailLogs: [],
  pageNum: 1,
  perPage: 20,
  loginType: "EMAIL",
  isMailDial: false,
  accessLogType: true,
  distinctUrl: [],
};
const mutations = {
  setAccessLogDetails(state: { accessLogDetails: any }, payload: any) {
    state.accessLogDetails = payload;
  },
  setIsAccessLog(state: { isAccessLog: any; accessRow: any }, payload: any) {
    state.isAccessLog = payload.isOpen;
    state.accessRow = payload?.data;
  },
  setLoader(state: { loader: any }, payload: any) {
    state.loader = payload;
  },
  setPayOutDetails(state: any, payload: any) {
    state.payOutDetails = payload;
  },
  setFeedbackDetails(state: any, payload: any) {
    state.FeedbackDetails = payload;
  },
  setAddNewScript(state: any, payload: any) {
    state.AddNewScript = payload;
  },

  setDownloadLoader(state: any, payload: any) {
    state.downloadLoader = payload;
  },

  setPageNum(state: any, payload: any) {
    state.pageNum = payload;
  },

  setIsMailDial(state: any, payload: any) {
    state.isMailDial = payload;
  },
  setAccessLogType(state: any, payload: any) {
    state.accessLogType = payload;
  },
  setDistinctUrl(state: any, payload: any) {
    state.distinctUrl = payload;
  },
};

const actions = {
  async getAccessLogDetails({ state, commit }: any, payload: object) {
    commit("setLoader", true);

    await httpService
      .getAccessLog(payload)
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.status == "Ok" &&
          response.data.message != "No Records Found"
        ) {
          state.accessLogDetails = response.data.result;
        } else {
          state.accessLogDetails = "";
          notify({
            group: "auth",
            type: "error",
            title: `${response.data.message}`,
          });
        }
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getDistinctUrl(commit: any) {
    await httpService
      .getDistinctUrl()
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.status == "Ok" &&
          response.data.message != "No Records Found"
        ) {
          commit("setDistinctUrl", response.data.result);
        } else {
        }
      })
      .catch(() => {
      })
      .finally(() => {});
  },
  async callPayoutReport({ commit }: any, payload: Object) {
    commit("setLoader", true);
    httpService
      .getPayoutDetails(payload)
      .then((resp) => {
        if (
          resp.status == 200 &&
          resp.data.status == "Ok" &&
          resp.data.message == "Success" &&
          resp.data.result &&
          resp.data.result.length > 0
        ) {
          commit("setPayOutDetails", resp.data.result);
        } else {
          commit("setPayOutDetails", []);
          notify({
            group: "auth",
            type: "error",
            title: `${resp.data.message}`,
          });
        }
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },

  downloadFile({ commit }: any, payload: any) {
    commit("setDownloadLoader", true);
    httpService
      .payOutDownload(payload)
      .then((resp) => {
        if (resp.status == 200 && resp.data) {
          const el = (sel: string, par?: any): Element =>
            (par || document).querySelector(sel);
          const elNew = (tag: string, prop?: any): HTMLAnchorElement =>
            Object.assign(document.createElement(tag), prop);

          const file = new Blob([resp.data], { type: "text/plain" });
          const href = URL.createObjectURL(file);
          const elAnchor = elNew("a", { href, download: "payoutDetails.txt" });
          el("body").append(elAnchor);
          elAnchor.click();
          elAnchor.remove();
          URL.revokeObjectURL(href);
        }
      })
      .finally(() => {
        commit("setDownloadLoader", false);
        commit("setIsMailDial", false);
      });
  },

  async sendNewScript({ commit }: any, payload: Object) {
    commit("setLoader", true);
    await httpService
      .sendNewScript(payload)
      .then((resp) => {
        if (
          resp.status == 200 &&
          resp.data.status == "Ok" &&
          resp.data.message == "Success" &&
          resp.data.result[0] != "No Records Found" &&
          resp.data.result.length > 0
        ) {
          commit("setAddNewScript", resp.data.result);
        } else if (resp.data.result[0] == "No Records Found") {
          notify({
            group: "auth",
            type: "error",
            title: `${resp.data.result[0]}`,
          });
        } else {
          commit("setAddNewScript", []);
          notify({
            group: "auth",
            type: "error",
            title: `${resp.data.message}`,
          });
        }
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },

  async callFeedbackReport({ commit }: any, payload: Object) {
    commit("setLoader", true);
    httpService
      .getFeedbackDetails(payload)
      .then((resp) => {
        if (
          resp.status == 200 &&
          resp.data.status == "Ok" &&
          resp.data.message == "Success" &&
          resp.data.result[0] != "No Records Found" &&
          resp.data.result.length > 0
        ) {
          commit("setFeedbackDetails", resp.data.result);
        } else if (resp.data.result[0] == "No Records Found") {
          notify({
            group: "auth",
            type: "error",
            title: `${resp.data.result[0]}`,
          });
        } else {
          commit("setFeedbackDetails", []);
          notify({
            group: "auth",
            type: "error",
            title: `${resp.data.message}`,
          });
        }
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },

  feedbackdownloadFile({ commit }: any, payload: any) {
    commit("setDownloadLoader", true);
    httpService
      .FeedbackDownload(payload)
      .then((resp) => {
        if (resp.status == 200 && resp.data) {
          const el = (sel: string, par?: any): Element =>
            (par || document).querySelector(sel);
          const elNew = (tag: string, prop?: any): HTMLAnchorElement =>
            Object.assign(document.createElement(tag), prop);

          const file = new Blob([resp.data], { type: "text/plain" });
          const href = URL.createObjectURL(file);
          const elAnchor = elNew("a", {
            href,
            download: "FeedbackDetails.txt",
          });
          el("body").append(elAnchor);
          elAnchor.click();
          elAnchor.remove();
          URL.revokeObjectURL(href);
        }
      })
      .finally(() => {
        commit("setDownloadLoader", false);
        commit("setIsMailDial", false);
      });
  },

  async getResponseLog({ state, commit }: any, payload: object) {
    commit("setLoader", true);
    await httpService
      .getResponseLog(payload)
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.status == "Ok" &&
          response.data.message != "No Records Found"
        ) {
          state.accessLogDetails = response.data.result;
        } else {
          state.accessLogDetails = "";
          notify({
            group: "auth",
            type: "error",
            title: `${response.data.message}`,
          });
        }
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },
};

const getters = {
  
  getIsAccessLog: (state: { isAccessLog: any }) => state.isAccessLog,
  getLogDeatails: (state: { accessLogDetails: any }) => state.accessLogDetails,
  getAccessRow: (state: { accessRow: any }) => state.accessRow,
  getLoader: (state: { loader: any }) => state.loader,
  getMailLogs: (state: { mailLogs: any }) => state.mailLogs,
  getPageperData: (state: any) => {
    let from = state.pageNum * state.perPage - state.perPage;
    let to = state.pageNum * state.perPage;
    return state.accessLogDetails.slice(from, to);
  },
  getAccessLogType: (state: any) => state.accessLogType,
};

const accessLog = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default accessLog;
