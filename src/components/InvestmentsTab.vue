<template>
  <div
    class="mt-[50px] mx-[20px] sm:mx-[40px] md:mx-[30px] xl:mx-[90px] 2xl:mx-[200px]"
  >
    <div class="hidden sm:flex gap-6 text-lg font-medium mb-6">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="handleTabClick(tab)"
        :class="[
          'px-2 py-2 hover:cursor-pointer',
          selected === tab
            ? 'text-blue-600 bg-gray-50  border border-transparent rounded-full '
            : 'text-gray-500',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <div class="relative inline-block w-32 sm:hidden mb-2">
      <select
        v-model="selected"
        @change="handleTabClick(selected)"
        class="appearance-none px-4 py-2 text-blue-600 bg-gray-100 border border-transparent font-semibold text-[12px] rounded-full pr-12"
      >
        <option v-for="tab in tabs" :key="tab" :value="tab">
          {{ tab }}
        </option>
      </select>

      <div
        class="pointer-events-none absolute text-[10px] right-3 top-1/2 transform -translate-y-1/2 text-blue-600"
      >
        ▼
      </div>
    </div>

    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BaseCard
        v-for="fund in funds"
        :key="fund.id"
        :fund="fund"
        :returnsPercentage="formatPercentage(fund.returns)"
        :riskLevel="formatRiskLevel(fund.risk)"
        @goToDetails="goToDetails"
        :fundPerformance="fundPerformance"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed, watch } from "vue";
import { useStore } from "vuex";
import BaseCard from "./BaseCard.vue";
import { formatPercentage, formatRiskLevel } from "../utils/fundUtils";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
  store.dispatch("filterByRisk", riskMap[selected.value]);
});

const store = useStore();
const router = useRouter();

const selected = ref(localStorage.getItem("selectedTab") || "Conservative");
const tabs = ["Conservative", "Moderate", "Growth"];

const riskMap = {
  Conservative: 1,
  Moderate: 2,
  Growth: 3,
};

const handleTabClick = (tab) => {
  selected.value = tab;
};

watch(selected, (newVal) => {
  localStorage.setItem("selectedTab", newVal);
  const riskValue = riskMap[newVal];
  store.dispatch("filterByRisk", riskValue);
});

const funds = computed(() => store.getters.filteredFunds);

const goToDetails = (fund) => {
  store.dispatch("setSelectedFund", fund);
  router.push({ name: "FundDetail", params: { id: fund.id } });
};
</script>
