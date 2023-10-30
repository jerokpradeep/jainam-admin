import { httpService } from "../services/httpservices";

const state = {
  marketWatchData: [],
  userBankDetails: [],
};

const mutations = {
  setUserBankDetails(state: any, payload: any) {
    state.userBankDetails = payload;
  },
  setMarketWatchData(state: any, payload: any) {
    state.marketWatchData = payload;
  },
};
const actions = {
  async getUserBankDetails({ commit }: any, payload: any) {
    let json = {
      clientId: payload,
    };
    await httpService
      .getUserBankDetails(json)
      .then((response) => {
        if (
          response.status == 200 &&
          response.data.status == "Ok" &&
          response.data.message != "No Records Found"
        ) {
          commit("setUserBankDetails", response.data.result);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  },
  async getMarketWatchData({ commit }: any, payload: any) {
    let json = {
      userId: payload,
    };
    await httpService.getMarketWatchData(json).then((response) => {
      if (
        response.status == 200 &&
        response.data.status == "Ok" &&
        response.data.message != "No Records Found"
      ) {
        commit("setMarketWatchData", response.data.result);
      }
    });
  },
};
const getters = {
  getUserBankDetails: (state: any) => state.userBankDetails,
};

const reports = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};

export default reports;
