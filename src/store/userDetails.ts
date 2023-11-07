import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();
const state = {
  loader: false,
  userDetails: [],
};

const mutations = {
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
  setUserDetails(state: any, payload: any) {
    state.userDetails = payload;
  },
};

const actions = {
  async getUserDetails({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .getUserDetails(payload)
      .then((response) => {
        if (response.data.message == "Success" && response.data.result.length) {
          
          commit("setUserDetails", response.data.result);
        } else {
          notify({ group: "auth", type: "error", title: `No Data Found` });
          commit("setUserDetails", []);
        }
      })
      .catch(() => {})
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async updateUserDetails({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .updateUserDetails(payload)
      .then((response) => {
        if (
          response.data.message == "Success" &&
          response?.data?.result[0] == "User details updated"
        ) {
          notify({
            group: "auth",
            type: "success",
            title: `${response.data.result[0]}`,
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        commit("setLoader", false);
      });
  },

  async addUserKeyCloak({ commit }: any, payload: any) {
    commit("setLoader", true);
    await httpService
      .addUserKeyCloak(payload)
      .then((response) => {
        if (
          (response.data.message == "Success" &&
            response?.data?.result[0]?.includes("User Created")) ||
          response?.data?.result[0]?.includes("User already exists")
        ) {
          notify({
            group: "auth",
            type: "success",
            title: `${response.data.result[0]}`,
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        commit("setLoader", false);
      });
  },
};

const getters = {
  getLoader: (state: any) => state.loader,
  getUserDetails: (state: any) => state.userDetails,
};

const user = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default user;
