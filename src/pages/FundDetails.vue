<template>
  <div class="bg-[#ffffff] min-h-screen">
    <BaseLoader :show="isLoading" class="pt-[120px]">
      <p class="text-gray-400 text-sm sm:text-lg">Loading fund details...</p>
    </BaseLoader>

    <div v-if="fund">
      <DetailRow
        :key="$route.params.id"
        :fund="fund"
        :returnsPercentage="formatPercentage(fund.returns)"
      />
    </div>

    <div v-else class="pt-[150px]">
      <ErrorComp :error="error" />
    </div>
    <div v-if="fund" class="mt-15 sm:mt-0 mb-15">
      <InvestmentsTab :excludeFundId="fund?.id" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, watch, nextTick } from "vue";
import DetailRow from "../components/DetailsCard.vue";
import { formatPercentage } from "../utils/fundUtils.js";

import InvestmentsTab from "../components/InvestmentsTab.vue";
import BaseLoader from "../components/BaseLoader.vue";

const route = useRoute();

const store = useStore();
const error = computed(() => store.state.error);

onMounted(() => {
  console.group("this is mounted");
  if (!store.state.funds.length) {
    store.dispatch("fetchFunds", {
      customErrorMessage: "Failed to fetch fund details. Please try again.",
    });
  }
});

watch(
  () => route.params.id,
  async (newId, oldId) => {
    if (oldId !== newId) {
      await nextTick();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
);

const fund = computed(() =>
  store.state.funds.find((f) => f.id == route.params.id)
);

const isLoading = computed(() => {
  return store.state.isLoading;
});

watch(isLoading, (newVal) => {
  console.log("Loading state changed:", newVal);
});
</script>
