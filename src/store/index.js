import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    funds: [],
    selectedFund: null,
    filterRisk: "",
    isLoading: false,
    error: null,
  },
  mutations: {
    setFunds(state, funds) {
      state.funds = funds;
    },
    setSelectedFund(state, fund) {
      state.selectedFund = fund;
    },
    setFilterRisk(state, risk) {
      state.filterRisk = risk;
    },
    setLoading(state, loading) {
      state.isLoading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchFunds({ commit }, { customErrorMessage }) {
      try {
        commit("setLoading", true);
        commit("setError", null);
        const res = await axios.get(`${import.meta.env.VITE_COWRYWISE_API}`);
        const enrichedFunds = res.data.data.map((fund) => fund);
        commit("setFunds", enrichedFunds);
      } catch (err) {
        commit(
          "setError",
          customErrorMessage || "Something went wrong. Please try again."
        );
        console.error("Error fetching funds:", err);
      } finally {
        commit("setLoading", false);
      }
    },
    selectFund({ commit }, fund) {
      commit("setSelectedFund", fund);
    },
    filterByRisk({ commit }, risk) {
      commit("setFilterRisk", risk);
    },
  },
  getters: {
    filteredFunds: (state) => {
      if (!state.filterRisk) return state.funds;
      return state.funds.filter(
        (fund) => fund.risk == state.filterRisk && fund.performance.length !== 0
      );
    },
    fundDetails: (state) => state.selectedFund,
    isLoading: (state) => state.isLoading,
  },
});
