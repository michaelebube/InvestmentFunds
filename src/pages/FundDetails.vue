<template>
  <div class="bg-[#ffffff] min-h-screen">
    <div v-if="isLoading" class="text-center text-gray-500 py-10 pt-[130px]">
      Loading fund details...
    </div>
    <div v-else-if="fund">
      <DetailRow
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
import { computed, onMounted, watch } from "vue";
import DetailRow from "../components/DetailsCard.vue";
import { formatPercentage } from "../utils/fundUtils.js";

import InvestmentsTab from "../components/InvestmentsTab.vue";

const route = useRoute();

const store = useStore();
const error = computed(() => store.state.error);

onMounted(() => {
  if (!store.state.funds.length) {
    store.dispatch("fetchFunds", {
      customErrorMessage: "Failed to fetch fund details. Please try again.",
    });
  }
});

watch(
  () => route.params.id,
  () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
