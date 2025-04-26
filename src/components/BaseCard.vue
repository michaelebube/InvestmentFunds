<template>
  <div
    class="border-gray-300 rounded-3xl py-8 bg-white shadow-lg transition duration-300 ease-in-out border"
  >
    <div class="px-8 flex flex-col">
      <div class="flex items-center gap-7 mb-10 min-h-[100px]">
        <img
          :src="fund.logo"
          alt="logo"
          class="h-15 w-15 object-contain"
          loading="lazy"
        />
        <h2 class="text-2xl xl:text-2xl font-semibold">
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
      <div class="px-1 mt-8 flex justify-between items-center">
        <button
          class="bg-[#0066f5] text-white px-8 py-3 lg:px-4 lg:py-3 xl:px-8 xl:py-3 rounded-md shadow-md cursor-pointer transition duration-300 ease-in-out"
        >
          Invest Now
        </button>
        <a
          href="#"
          class="text-[#0066f5] font-medium flex items-center gap-1 cursor-pointer transition duration-300 ease-in-out group"
        >
          Learn More
          <span
            ><img
              src="../assets/svg/right-arrow.svg"
              alt="right-arrow"
              class="w-3 h-3 transform transition-transform duration-300 ease-in-out group-hover:translate-x-[4px]"
          /></span>
        </a>
      </div>
    </div>
  </div>
  <!-- <template>
    <div class="rounded-2xl shadow-md p-6 w-full max-w-sm">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img
            :src="fund.logo"
            alt="logo"
            class="h-10 w-10 object-contain"
            loading="lazy"
          />
          <h2 class="font-semibold text-lg">{{ fund.name }}</h2>
        </div>
        <div class="flex gap-2 text-[#0f172a] text-sm">
          <i class="fab fa-twitter"></i>
          <i class="fab fa-facebook"></i>
          <i class="fab fa-whatsapp"></i>
        </div>
      </div>

      <div class="mt-6 text-sm text-gray-500">Annual Returns</div>
      <div class="text-green-500 text-2xl font-bold">
        {{ returnsPercentage }} <span class="text-base">%</span>
      </div>

      <div class="mt-4 text-xs text-gray-400">
        Historical performance of annual returns
      </div>
      <div class="mt-2 space-y-2 text-sm">
        <div
          v-for="(value, year) in fund.performance"
          :key="year"
          class="flex justify-between"
        >
          <span class="text-gray-500">{{ year }}</span>
          <span class="text-green-600 font-semibold">{{ value }}</span>
        </div>
      </div>

      <div class="mt-6 flex justify-between items-center">
        <button class="bg-blue-600 text-white px-4 py-2 rounded-md shadow">
          Invest Now
        </button>
        <a href="#" class="text-blue-600 font-medium flex items-center gap-1"
          >Learn More <span>→</span></a
        >
      </div>
    </div>
  </template> -->
</template>

<script setup>
const props = defineProps(["fund", "returnsPercentage", "riskLevel"]);
import { computed } from "vue";
import { formatPercentage } from "../utils/fundUtils";

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
