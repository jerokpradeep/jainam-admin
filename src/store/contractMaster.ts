import { httpService } from "../services/httpservices";
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
  setContractMasterData(state: any, payload: any) {
    state.contractMasterData = payload;
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
          commit("setNewlyAddedSymbols", response.data);
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
          commit("setDeactivatedSymbols", response.data);
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
          commit("setDuplicateSymbols", response.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        commit("setLoader", false);
      });
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
