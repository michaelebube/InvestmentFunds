import { createStore } from "vuex";
import axios from "axios";
import type { Fund, State } from "../types/types"; // Adjust the import path as necessary

// Define types for fund and performance

export default createStore<State>({
  state: {
    funds: [],
    selectedFund: null,
    filterRisk: null,
    isLoading: false,
    error: null,
  },

  mutations: {
    setFunds(state: State, funds: Fund[]) {
      state.funds = funds;
    },
    setSelectedFund(state: State, fund: Fund) {
      state.selectedFund = fund;
    },
    setFilterRisk(state: State, risk: number | null) {
      state.filterRisk = risk;
    },
    setLoading(state: State, loading: boolean) {
      state.isLoading = loading;
    },
    setError(state: State, error: string | null) {
      state.error = error;
    },
  },

  actions: {
    async fetchFunds({ commit }, payload: { customErrorMessage?: string }) {
      try {
        commit("setLoading", true);
        commit("setError", null);

        const res = await axios.get(`${import.meta.env.VITE_COWRYWISE_API}`);

        const enrichedFunds: Fund[] = res.data.data.map((fund: Fund) => ({
          ...fund,
        }));

        commit("setFunds", enrichedFunds);
      } catch (err) {
        commit(
          "setError",
          payload.customErrorMessage ||
            "Something went wrong. Please try again."
        );
        console.error("Error fetching funds:", err);
      } finally {
        commit("setLoading", false);
      }
    },

    selectFund({ commit }, fund: Fund) {
      commit("setSelectedFund", fund);
    },

    filterByRisk({ commit }, risk: number | null) {
      commit("setFilterRisk", risk);
    },
  },

  getters: {
    filteredFunds: (state: State): Fund[] => {
      if (!state.filterRisk) return state.funds;

      return state.funds.filter(
        (fund) =>
          fund.risk === state.filterRisk && fund.performance.length !== 0
      );
    },
    fundDetails: (state: State): Fund | null => state.selectedFund,
    isLoading: (state: State): boolean => state.isLoading,
  },
});
