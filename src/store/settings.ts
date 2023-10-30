import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

const state = {
  versionList: [],
  productlist: [],
  versionLoader: false,
  productloader: false,
  confirmationdialogue: "",
};
const mutations = {
  setVersionList(state: any, payload: any) {
    state.versionList = payload;
  },
  setVersionLoader(state: any, payload: any) {
    state.versionLoader = payload;
  },
  setproductlist(state: any, payload: any) {
    state.productlist = payload;
  },
  setproductloader(state: any, payload: any) {
    state.productloader = payload;
  },

  setconfirmationdialogue(state: any, payload: any) {
    state.confirmationdialogue = payload;
  },
};

const actions = {
  async getVersionList({ commit }: any) {
    commit("setVersionLoader", true);
    await httpService
      .getVersionList()
      .then((response) => {
        if (response.data) {
          commit("setVersionList", response.data);
        }
      })
      .catch(() => {
        
      })
      .finally(() => {
        commit("setVersionLoader", false);
      });
  },

  async getProductList({ commit }: any) {
    commit("setproductloader", true);
    await httpService
      .getproductlist()
      .then((response) => {
        if (response.data.result && response.status == 200) {
          commit("setproductlist", response.data.result);
        }
      })
      .catch(() => {

      })
      .finally(() => {
        commit("setproductloader", false);
      });
  },

  async updateSettingsAction({ dispatch }: any, payload: any) {
    await httpService
      .updateSettingsAction(payload)
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.message == "Updated Successfully"
        ) {
          notify({
            group: "auth",
            type: "success",
            title: `${response.data.message}`,
          });
          dispatch("getProductList");
        }
      })
      .catch(() => {})
      .finally(() => {});
  },
};

const getters = {
  getVersionList: (state: any) => state.versionList,
  getproductlist: (state: any) => state.productlist,
};

const settings = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default settings;
