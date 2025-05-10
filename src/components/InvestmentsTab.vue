<template>
  <div
    class="mt-[20px] sm:mt-[40px] mx-[20px] sm:mx-[40px] md:mx-[30px] xl:mx-[90px] 2xl:mx-[200px]"
  >
    <div class="hidden sm:flex gap-2 text-sm lg:text-[16px] font-normal mb-6">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="handleTabClick(tab)"
        :class="[
          'px-2 py-2  hover:cursor-pointer rounded-full  ',
          selected === tab
            ? 'text-blue-600 bg-[#F3F6FF]  border border-transparent font-semibold '
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

    <div
      class="mt-5 md:mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-15"
    >
      <BaseCard
        v-for="fund in funds"
        :key="fund.id"
        :fund="fund"
        :returnsPercentage="formatPercentage(fund.returns)"
        :riskLevel="formatRiskLevel(fund.risk)"
        @goToDetails="goToDetails"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import BaseCard from "./BaseCard.vue";
import { formatPercentage, formatRiskLevel } from "../utils/fundUtils.ts";
import type { State, Fund } from "../store/types";

const props = defineProps<{
  excludeFundId?: string | null;
}>();
interface RiskMap {
  Conservative: number;
  Moderate: number;
  Growth: number;
}

const riskMap: RiskMap = {
  Conservative: 1,
  Moderate: 2,
  Growth: 3,
};

const store = useStore<State>();
const router = useRouter();
const route = useRoute();

// Tabs
const tabs: string[] = ["Conservative", "Moderate", "Growth"];
const defaultTab: string = "Conservative";

// Selected Tab Reactive Reference
const selected = ref<string>(
  tabs.includes(route.query.tab as string)
    ? (route.query.tab as string)
    : defaultTab
);

// OnMounted Hook to Filter Funds by Risk
onMounted(() => {
  store.dispatch("filterByRisk", riskMap[selected.value as keyof RiskMap]);
});

// Handle Tab Click
const handleTabClick = (tab: string): void => {
  selected.value = tab;
  router.replace({
    query: {
      ...route.query,
      tab,
    },
  });
};

watch(selected, (newVal) => {
  const riskValue = riskMap[newVal as keyof RiskMap];
  store.dispatch("filterByRisk", riskValue);
});

watch(
  () => route.query.tab,
  (newTab) => {
    if (!tabs.includes(newTab as string)) {
      router.replace({
        query: { ...route.query, tab: defaultTab },
      });
    }
  }
);

const funds = computed<Fund[]>(() => {
  const allFunds = store.getters.filteredFunds;
  if (props.excludeFundId) {
    return allFunds.filter(
      (fund: { id: string }) => fund.id !== props.excludeFundId
    );
  }
  return allFunds;
});

// Navigate to Fund Detail
const goToDetails = (fund: { id: string }): void => {
  router.push({ name: "FundDetail", params: { id: fund.id } });
};
</script>
