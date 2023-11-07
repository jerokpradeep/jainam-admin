import { httpService } from "../services/httpservices";
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

const state = {
  newlyAddedSymbols: [],
  deactivatedSymbols: [],
  duplicateSymbols: [],
  contractMasterData: [],
  loader: false,
  exchangeData: [
    "bcs_fo",
    "MCX",
    "NSE_COM",
    "BSE_COM",
    "NSE Indices",
    "BSE Indices",
    "MCX Indices",
  ],
  resetdialogue:false,
};

const mutations = {
  setNewlyAddedSymbols(state: any, payload: any) {
    state.newlyAddedSymbols = payload;
  },
  setDeactivatedSymbols(state: any, payload: any) {
    state.deactivatedSymbols = payload;
  },
  setDuplicateSymbols(state: any, payload: any) {
    state.duplicateSymbols = payload;
  },
  setLoader(state: any, payload: any) {
    state.loader = payload;
  },
  setresetdialogue(state: any, payload: any) {
    state.resetdialogue= payload;
   
  },
  setContractMasterData(state: any, payload: any) {
    state.contractMasterData = payload;
  },
  // 
  SET_SNAKBAR({ state }: any, payload: any) {
    state.snackbar.msg = payload.msg;
    state.snackbar.show = payload.show;
    state.snackbar.color = payload.color;
    state.snackbar.timeout = payload.timeout;
  },



};

const actions = {
  async getContractMasterData({ commit }: any, payload: any) {
    let json = {
      symbol: payload.symbol,
      exch: payload.exch,
      group: payload.group ? payload.group : "",
      expiry: payload.expiry ? payload.expiry : "",
    };
    commit("setLoader", true);
    await httpService
      .getContractMasterData(json)
      .then((response) => {
        if (response.data) {
          commit("setContractMasterData", response.data.result);
        }
      })
      .finally(() => {
        commit("setLoader", false);
      });
  },
  async getNewlyAddedSymbols({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getNewlyAddedSymbols()
      .then((response) => {
        if (response.data) {
          commit("setNewlyAddedSymbols", response.data.result);
        }
      })
      .catch(() => {})
      .finally(() => {
        commit("setLoader", false);
      });
  },

  async getDeactivatedSymbols({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getDeactivatedSymbols()
      .then((response) => {
        if (response.data) {
          commit("setDeactivatedSymbols", response.data.result);
        }
      })
      .catch(() => {})
      .finally(() => {
        commit("setLoader", false);
      });
  },

  async getDuplicateSymbols({ commit }: any) {
    commit("setLoader", true);
    await httpService
      .getDuplicateSymbols()
      .then((response) => {
        if (response.data) {
          commit("setDuplicateSymbols", response.data.result);
        }
      })
      .catch(() => {})
      .finally(() => {
        commit("setLoader", false);
      });
  },


  async resetCache({ commit } :any, jsonObj :any) {
   await httpService.resetCache(jsonObj)
   .then(response => {
        if (response.data) {
        
          if (
            response.status == 200 &&
            response.data.message == "Contract loaded sucessfully"
          ) {
            notify({
              group: "auth",
              type: "success",
              title: `${response.data.message}`,
            });
           // dispatch("getProductList");
          }


          
            commit('notify', {
                msg: 'Reset Cache successfully',
                show: true,
                color: 'teal darken-1',
                timeout: 2500
            })
        } else {
            commit('notify', {
                msg: 'Reset Cache failed',
                show: true,
                color: 'red darken-1',
                timeout: 2500
            })
        }
    }).finally(() => { })
},


};

const getters = {
  getNewlyAddedSymbols: (state: any) => state.newlyAddedSymbols,
  getDeactivatedSymbols: (state: any) => state.deactivatedSymbols,
  getDuplicateSymbols: (state: any) => state.duplicateSymbols,
};

const cMaster = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default cMaster;
