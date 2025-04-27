<template>
  <div class="bg-white/60 min-h-screen">
    <div class="font-dmsans" ref="scrollTarget">
      <!-- <div class="relative inline-block group" v-if="!error && !isLoading">
      <select
        v-model="selectedRisk"
        @change="filterFunds"
        class="mb-6 p-2 pr-12 border rounded-sm hover:bg-[#0165f6] hover:text-white appearance-none w-full transition duration-300 ease-in-out"
      >
        <option value="">All Risks</option>
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">High</option>
      </select>
      <span
        class="pointer-events-none absolute right-4 top-[33%] group-hover:text-white transform -translate-y-1/2 text-gray-600 transition duration-300 ease-in-out"
      >
        ▼
      </span>
    </div> -->

      <div class="pt-[90px]">
        <InvestmentsTab />
      </div>

      <div v-if="isLoading" class="text-center py-8">
        <div
          class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"
        ></div>
        <p class="mt-2 text-gray-500">Loading funds...</p>
      </div>

      <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-8">
      <BaseCard
        v-for="fund in visibleFunds"
        :key="fund.id"
        :fund="fund"
        :returnsPercentage="formatPercentage(fund.returns)"
        :riskLevel="formatRiskLevel(fund.risk)"
        @click="goToDetails(fund)"
      />
    </div> -->

      <!-- <div class="flex justify-center mt-6">
      <button
        v-if="hasMore"
        @click="loadMore"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
      >
        Load More
      </button>
    </div> -->
      <!-- <div class="flex justify-center mt-6">
      <button
        v-if="!hasMore && !isLoading && !error && visibleFunds.length > 20"
        @click="loadless"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
      >
        See Less
      </button>
    </div> -->
      <ErrorComp :error="error" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import BaseCard from "../components/BaseCard.vue";
// import { formatPercentage } from "../utils/fundUtils.js";
// import { formatRiskLevel } from "../utils/fundUtils.js";
import InvestmentsTab from "../components/InvestmentsTab.vue";

const store = useStore();
const router = useRouter();
// const selectedRisk = ref("");
// const itemsToShow = ref(20);

const error = computed(() => store.state.error);

onMounted(() => {
  if (!store.state.funds.length) {
    store.dispatch("fetchFunds", {
      customErrorMessage: "Failed to fetch funds. Please try again.",
    });
  }
});

// const visibleFunds = computed(() => funds.value.slice(0, itemsToShow.value));
// const loadMore = () => {
//   itemsToShow.value += 20;
// };

// const loadless = () => {
//   itemsToShow.value = 20;

//   nextTick(() => {
//     scrollTarget.value?.scrollIntoView({ behavior: "smooth" });
//   });
// };

// watch(funds, () => {
//   itemsToShow.value = 20;
// });
// watch(selectedRisk, (newValue) => {
//   itemsToShow.value = 20; // Reset items to show when filter changes
// });

// const hasMore = computed(() => itemsToShow.value < funds.value.length);
const isLoading = computed(() => store.getters.isLoading);
</script>

<style>
.logo {
  font-family: "Lora", serif;
}
</style>
