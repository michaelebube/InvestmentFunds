<template>
  <div
    class="mt-[20px] sm:mt-[40px] mx-[20px] sm:mx-[40px] md:mx-[30px] xl:mx-[90px] 2xl:mx-[200px]"
  >
    <div class="hidden sm:flex gap-3 text-sm lg:text-[17px] font-normal mb-6">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="handleTabClick(tab)"
        :class="[
          'px-2 py-2 hover:cursor-pointer',
          selected === tab
            ? 'text-blue-600 bg-gray-50  border border-transparent font-semibold rounded-full '
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

<script setup>
import { ref } from "vue";
import { computed, watch } from "vue";
import { useStore } from "vuex";
import BaseCard from "./BaseCard.vue";
import { formatPercentage, formatRiskLevel, slugify } from "../utils/fundUtils";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const props = defineProps({
  excludeFundId: {
    type: [String],
    default: null,
  },
});

const store = useStore();
const router = useRouter();
const route = useRoute();

const riskMap = {
  Conservative: 1,
  Moderate: 2,
  Growth: 3,
};

onMounted(() => {
  store.dispatch("filterByRisk", riskMap[selected.value]);
});

const tabs = ["Conservative", "Moderate", "Growth"];
const defaultTab = "Conservative";

const selected = ref(
  tabs.includes(route.query.tab) ? route.query.tab : defaultTab
);

const handleTabClick = (tab) => {
  selected.value = tab;
  router.replace({
    query: {
      ...route.query,
      tab,
    },
  });
};

watch(selected, (newVal) => {
  localStorage.setItem("selectedTab", newVal);
  const riskValue = riskMap[newVal];
  store.dispatch("filterByRisk", riskValue);
});

watch(
  () => route.query.tab,
  (newTab) => {
    if (!tabs.includes(newTab)) {
      router.replace({
        query: { ...route.query, tab: defaultTab },
      });
    }
  }
);

const funds = computed(() => {
  const allFunds = store.getters.filteredFunds;
  if (props.excludeFundId) {
    return allFunds.filter((fund) => fund.id != props.excludeFundId);
  }

  return allFunds;
});

const goToDetails = (fund) => {
  // store.dispatch("setSelectedFund", fund);
  router.push({ name: "FundDetail", params: { id: fund.id } });
};
</script>
