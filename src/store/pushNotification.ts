import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()
const state = {
    loader: false
};

const mutations = {
    setLoader(state:any, payload:any) {
        state.loader = payload
    }
};

const actions = {
  async sendPushNotification({ commit }: any, payload:any) {
    commit("setLoader", true);
    await httpService.sendPushNotification(payload)
      .then((response) => {
        if (response.data.message == 'Success') {
            notify({ group: 'auth', type: 'success', title: `${response.data.message}` })
        }notify({ group: 'auth', type: 'failed',title: `${response.data.message}` })
      })
      .catch(() => {})
      .finally(() => {
        commit("setLoader", false);
      });
  },
};

const getters = {
    getLoader: (state:any) => state.loader
};

const pushNotify = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default pushNotify;
