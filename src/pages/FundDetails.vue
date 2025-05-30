<template>
  <div
    class="min-h-screen bg-gray-300 py-10 px-8 flex items-center justify-center"
  >
    <div class="max-w-4xl xl:max-w-5xl mx-auto flex flex-col justify-center">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="mb-4 flex items-center text-[18px] text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 md:h-5 md:w-5 mr-1 transform transition-transform duration-200 group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      <div
        v-if="fund"
        class="bg-white/70 rounded-3xl shadow-sm p-6 border border-[3px] border-[#0165f6]"
      >
        <div class="flex items-center mb-4 gap-2">
          <img
            :src="fund.logo"
            alt="logo"
            class="h-10 w-10 object-contain"
            loading="lazy"
          />
          <h2 class="text-2xl xl:text-[28px] font-semibold text-blue-700">
            {{ fund.name }}
          </h2>
        </div>

        <p class="text-sm xl:text-[16px] text-gray-700 mb-4">
          {{ fund.description || "No description available." }}
        </p>

        <div class="sm:grid sm:grid-cols-2 items-center gap-[100px]">
          <div
            class="grid grid-cols-1 gap-4 text-sm xl:text-[16px] text-gray-800"
          >
            <DetailRow
              v-for="(item, index) in detailsArray"
              :key="index"
              :label="item.label"
              :value="item.value"
              :id="item.id"
            >
              <template #composition_detail="{ value }">
                <div class="flex flex-col">
                  <p
                    v-if="value.length === 0"
                    class="font-medium text-gray-800 xl:text-[16px]"
                  >
                    No data available
                  </p>
                  <p v-else v-for="item in value" :key="item.key">
                    <span class="font-medium"> {{ item.key }}: </span>
                    {{ item.value }}%
                  </p>
                </div>
              </template>
              <template #performance_detail="{ value }">
                <div class="flex flex-col">
                  <h3
                    v-if="value.length === 0"
                    class="xl:text-[16px] font-medium"
                  >
                    No performance data available for this fund.
                  </h3>
                  <p v-else v-for="item in value" :key="item.fund_id">
                    <span class="font-medium"> {{ item.year }}: </span>
                    {{ item.annualReturn }}
                  </p>
                </div>
              </template>
            </DetailRow>
          </div>
          <div>
            <img
              :src="logo"
              alt="Cowrywise logo"
              class="hidden sm:block sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:h-[350px] lg:w-[350px] xl:h-[380px] xl:w-[380px] opacity-5"
            />
          </div>
        </div>
      </div>
      <div
        v-else-if="!fetchFunds && !error"
        class="text-center text-gray-500 py-10"
      >
        Loading fund details...
      </div>
      <ErrorComp :error="error" />
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import DetailRow from "../components/DetailsCard.vue";
import { formatPercentage } from "../utils/fundUtils.js";
import logo from "../assets/logo.png";
import { formatRiskLevel } from "../utils/fundUtils.js";

const route = useRoute();
const router = useRouter();
const store = useStore();
const error = computed(() => store.state.error);

onMounted(() => {
  if (!store.state.funds.length) {
    store.dispatch("fetchFunds", {
      customErrorMessage: "Failed to fetch fund details. Please try again.",
    });
  }
});

const fund = computed(() =>
  store.getters.filteredFunds.find((f) => f.id == route.params.id)
);

const returnsPercentage = computed(() => formatPercentage(fund.value.returns));
const fundComposition = computed(() => {
  if (!fund.value.composition || typeof fund.value.composition !== "object") {
    return [];
  }

  return Object.entries(fund.value.composition).map(([key, value]) => ({
    key,
    value,
  }));
});

const fundPerformance = computed(() => {
  return fund.value.performance?.map((item) => ({
    year: item.year,
    annualReturn: formatPercentage(item.annual_return),
  }));
});

const detailsArray = computed(() => {
  const baseDetails = [
    {
      label: "Returns",
      value: returnsPercentage.value,
    },
    {
      label: "Risk Level",
      value: formatRiskLevel(fund.value.risk),
    },
    {
      label: "Composition",
      value: fundComposition.value,
      id: "composition",
    },
    {
      label: "Custodian",
      value: fund.value.custodian || "No custodian listed",
    },
    {
      label: "Fund Manager",
      value: fund.value.manager || "Cowry Asset Management",
    },
    {
      label: "Performance",
      value: fundPerformance.value,
      id: "performance",
    },
    {
      label: "Minimum Investment",
      value: "₦1,000",
    },
  ];
  return [...baseDetails];
});

const goBack = () => {
  router.back();
};
</script>
