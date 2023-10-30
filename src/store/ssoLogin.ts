import { httpService } from "../services/httpservices";
import router from "../router/index";
import { env } from "../env";
const auth: any = {
  namespaced: true,
  state: {
    error_message: null,
  },
  mutations: {
    setErrorMessage(state: any, payload: any) {
      state.error_message = payload;
    },
  },
  actions: {
    async getData({ commit }: any, payload: any) {
      commit("setErrorMessage", null);
      try {
        let json = {
          vendor: env().APPCODE,
          authCode: payload,
        };
        const response = await httpService.ssoLogin(json);
        if (response.data.stat === "Ok") {
          localStorage.setItem("clientId", response.data.clientId);
          localStorage.setItem("sessionId", response.data.accessToken);
          commit("setUserId", response.data.clientId, { root: true });
          commit("setSessionId", response.data.accessToken, { root: true });
          router.push("dashboard").catch(() => {});
        } else if (response.data.stat) {
          commit("setErrorMessage", response.data.stat);
        }
      } catch (error: any) {
        console.log(error);
      }
    },
  },
  getters: {
    getErrorMsg: (state: any) => state.error_message,
  },
};
export default auth;
