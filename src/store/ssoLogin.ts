import { httpService } from "../services/httpservices";
import router from "../router/index";
import { env } from "../env"
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
        if (response.data.message === "Success") {
          localStorage.setItem("clientId", response.data.result[0].clientId);
          localStorage.setItem("sessionId", response.data.result[0].accessToken);
          commit("setUserId", response.data.result[0].clientId, { root: true });
          commit("setSessionId", response.data.result[0].accessToken, { root: true });
          router.push('dashboard').catch(() => { })
        } else if (response.data.message) {
          commit("setErrorMessage", response.data.message);
        }
      } catch (error:any) {
        console.log(error);
      }
    },
  },
  getters: {
    getErrorMsg: (state:any) => state.error_message
  },
};
export default auth;
