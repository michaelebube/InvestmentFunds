<template>
  <div class="bg-white min-h-screen">
    <div>
      <div class="pt-[80px] mb-15">
        <InvestmentsTab />
      </div>

      <BaseLoader :show="isLoading">
        <p class="text-gray-400 text-sm sm:text-lg">Loading funds...</p>
      </BaseLoader>

      <ErrorComp :error="error" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import InvestmentsTab from "../components/InvestmentsTab.vue";
import BaseLoader from "../components/BaseLoader.vue";
import ErrorComp from "../components/ErrorComp.vue";
import type { State } from "../types/types";

const store = useStore<State>();

const error = computed(() => store.state.error);
const isLoading = computed<boolean>(() => store.getters.isLoading);

onMounted(() => {
  if (!store.state.funds.length) {
    store.dispatch("fetchFunds", {
      customErrorMessage: "Failed to fetch funds. Please try again.",
    });
  }
});
</script>
