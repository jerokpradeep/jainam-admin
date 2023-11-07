import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()

const state = {
    loader: false,
    nfoLoader: false,
    cdsLoader: false,
    mcxLoader: false,
    DPLoader: false,
    T1Loader: false
};

const mutations = {
    SET_LOADER(state:any, payload:any) {
        state.loader = payload
    },
    SET_NFO_LOADER (state:any, payload:any) {
        state.nfoLoader = payload
    },
    SET_CDS_LOADER (state:any, payload:any) {
        state.cdsLoader = payload
    },
    SET_MCX_LOADER (state:any, payload:any) {
        state.mcxLoader = payload
    },
    SET_DPLOADER(state:any, payload:any){
        state.DPLoader = payload
    },
    SET_T1LOADER(state:any, payload:any){
        state.T1Loader = payload
    },
};

const actions = {
    async fileLoader({ state, commit }: any, payload: any) {
      if (payload?.exch == "NFO") {
        commit("SET_NFO_LOADER", !state.nfoLoader);
      } else if (payload?.exch == "CDS") {
        commit("SET_CDS_LOADER", !state.cdsLoader);
      } else if (payload?.exch == "MCX ") {
        commit("SET_MCX_LOADER", !state.mcxLoader);
      } else if (payload?.type == "DP") {
        commit("SET_DP_LOADER", !state.mcxLoader);
      } else if (payload?.type == "T1") {
        commit("SET_T1_LOADER", !state.mcxLoader);
      }
    },

    async loadPositionFile({ dispatch }: any, payload: any) {
      dispatch('fileLoader', payload)
      await httpService.loadPositionFile(payload.formData).then((response) => {
          if (response.data.status == "Ok" && response.status == 200) {
            notify({ group: "auth", type: "success", title: `Please Submit to confirm Upload`});
          } else {
            notify({ group: "auth", type: "error", title: `${response.data.message}`});
          }
        })
        .catch(() => {

        })
        .finally(() => {
          dispatch('fileLoader', payload)
        });
    },

    async submitPositionFile({ commit }: any) {
        commit('SET_LOADER', true);
        await httpService.submitPositionFile().then((response) => {
            if (response.data.status == "Ok" && response.status == 200) {
              notify({ group: "auth", type: "success", title: `${response.data.message}`});
            } else {
              notify({ group: "auth", type: "error", title: `${response.data.message}`});
            }
        })
        .catch(() => {

        })
        .finally(() => {
          commit("SET_LOADER", false);
        });
    },

    async loadHoldingFile({ commit }: any, payload: any) {
      if(payload.type == 'DP') {
        commit('SET_DPLOADER', true)
      } else {
        commit('SET_T1LOADER', true)
      }
      await httpService.loadHoldingFile(payload.formData).then((response) => {
          if (response.data.status == "Ok" && response.status == 200) {
            notify({ group: "auth", type: "success", title: `Please Submit to confirm Upload`});
          } else {
            notify({ group: "auth", type: "error", title: `${response.data.message}`});
          }
      })
      .catch(() => {

      })
      .finally(() => {
        if(payload.type == 'DP') {
          commit('SET_DPLOADER', false)
        } else {
          commit('SET_T1LOADER', false)
        }
      });
    },

    async submitHoldingFile({ commit }: any) {
      commit('SET_LOADER', true);
      await httpService.submitHoldingFile().then((response) => {
          if (response.data.status == "Ok" && response.status == 200) {
            notify({ group: "auth", type: "success", title: `${response.data.message}`});
          } else {
            notify({ group: "auth", type: "error", title: `${response.data.message}`});
          }
      })
      .catch(() => {

      })
      .finally(() => {
        commit("SET_LOADER", false);
      });
    },
};

const getters = {
  getLoader: (state: any) => state.loader,
  getNfoLoader: (state: any) => state.nfoLoader,
  getCdsLoader: (state: any) => state.cdsLoader,
  getMcxLoader: (state: any) => state.mcxLoader,
  getPoaLoader: (state: any) => state.poaLoader,
  getDPLoader: (state: any) => state.DPLoader,
  getT1Loader: (state: any) => state.T1Loader,
};

const pushNotify = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default pushNotify;
