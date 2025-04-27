<template>
  <div
    class="border-gray-200 rounded-3xl py-8 bg-white shadow-md transition duration-300 ease-in-out border"
  >
    <div class="px-8 flex flex-col">
      <div class="flex items-center gap-7 mb-10 min-h-[100px]">
        <img
          :src="fund.logo"
          alt="logo"
          class="h-15 w-15 object-contain"
          loading="lazy"
        />
        <h2 class="text-2xl font-semibold">
          {{ fund.name }}
        </h2>
      </div>

      <div class="px-1 flex justify-between">
        <div>
          <div class="text-md text-gray-400">
            {{ fund.is_money_market ? "Annual Returns" : "YTD Returns " }}
          </div>
          <p class="text-3xl font-semibold text-[#58CC58] !mt-1">
            {{ returnsPercentage }} <span class="text-lg">%</span>
          </p>
        </div>
        <div class="flex gap-3 mt-1">
          <a href="#">
            <img
              src="../assets/svg/twitter.svg"
              alt="Twitter Logo"
              class="w-4 h-4"
            />
          </a>
          <a href="#">
            <img
              src="../assets/svg/facebook.svg"
              alt="Facebook Logo"
              class="w-4 h-4"
            />
          </a>
          <a href="#">
            <img
              src="../assets/svg/whatsapp.svg"
              alt="WhatsApp Logo"
              class="w-4 h-4"
            />
          </a>
        </div>
      </div>
      <div class="mt-4 px-1">
        <p class="text-gray-400 text-sm mb-4">
          {{
            fund.is_money_market
              ? "Historical performance of annual returns"
              : ""
          }}
        </p>
      </div>
      <div
        v-for="item in fundPerformance"
        :key="item.year"
        class="px-1 mb-3 border-b py-3 text-sm border-gray-200"
      >
        <div class="flex justify-between">
          <p class="text-[#082552] opacity-60">{{ item.year }}</p>
          <p class="text-[#58CC58] font-bold">
            {{ item.annualReturn }}<span class="text-sm">%</span>
          </p>
        </div>
      </div>
      <div class="px-1 mt-6 flex justify-between items-center">
        <button
          class="bg-[#0066f5] text-white px-8 py-3 lg:px-4 lg:py-3 xl:px-8 xl:py-3 rounded-md shadow-md cursor-pointer transition duration-300 ease-in-out"
        >
          Invest Now
        </button>
        <a
          @click="$emit('goToDetails', fund)"
          class="text-[#0066f5] font-medium flex items-center gap-1 cursor-pointer transition duration-300 ease-in-out group"
        >
          Learn More
          <span>
            <RightArrow
              class="text-blue-600 group-hover:translate-x-1 transform transform-translate duration-300 ease-in-out"
            />
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["fund", "returnsPercentage", "riskLevel"]);
import { computed } from "vue";
import { formatPercentage } from "../utils/fundUtils";
import RightArrow from "./RightArrow.vue";

defineEmits(["goToDetails"]);

const fundPerformance = computed(() => {
  return props.fund.is_money_market
    ? props.fund.performance
        ?.filter((item) => item.year >= 2021 && item.year <= 2023)
        .map((item) => ({
          year: item.year,
          annualReturn: formatPercentage(item.annual_return),
        })) || []
    : [];
});
</script>
