<template>
  <div
    class="border-gray-100 rounded-3xl py-4 sm:py-3 px-[10px] bg-white shadow-xl transition duration-300 ease-in-out border"
  >
    <div class="px-5 sm:px-5 flex flex-col">
      <div class="flex items-center gap-7 mb-10 min-h-[100px]">
        <img
          :src="fund.logo"
          alt="logo"
          class="h-13 w-13 sm:h-14 sm:w-14 rounded-full object-contain"
          loading="lazy"
        />
        <h2 class="text-xl text-[#082552] sm:text-xl font-semibold">
          {{ fund.name }}
        </h2>
      </div>

      <div class="px-1 flex justify-between">
        <div>
          <div class="text-sm text-gray-400 font-light">
            {{ fund.is_money_market ? "Annual Returns" : "YTD Returns " }}
          </div>
          <p class="text-[26px] sm:text-3xl font-medium text-[#58CC58] !mt-1">
            {{ returnsPercentage }} <span class="text-lg">%</span>
          </p>
        </div>
        <div class="flex gap-3 mt-1">
          <a href="#">
            <img src="/svg/twitter.svg" alt="Twitter Logo" class="w-4 h-4" />
          </a>
          <a href="#">
            <img src="/svg/facebook.svg" alt="Facebook Logo" class="w-4 h-4" />
          </a>
          <a href="#">
            <img src="/svg/whatsapp.svg" alt="WhatsApp Logo" class="w-4 h-4" />
          </a>
        </div>
      </div>
      <div class="mt-4 px-1">
        <p class="text-gray-400 font-light text-sm mb-4">
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
        class="px-1 mb-3 border-b py-3 text-sm border-gray-100"
      >
        <div class="flex justify-between">
          <p class="text-[#082552] font-normal opacity-60">{{ item.year }}</p>
          <p class="text-[#58CC58] font-semibold">
            {{ item.annualReturn }}<span class="text-sm">%</span>
          </p>
        </div>
      </div>
      <div class="px-1 mt-6 mb-4 flex justify-between items-center">
        <BaseButton
          class="px-4 py-2 sm:px-8 sm:py-3 lg:px-4 lg:py-3 xl:px-6 xl:py-4"
        />
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

<script setup lang="ts">
import { computed } from "vue";
import { formatPercentage } from "../utils/fundUtils.ts";
import RightArrow from "./RightArrow.vue";
import BaseButton from "./BaseButton.vue";
import type { Fund } from "../types/types.ts";

defineEmits<{
  (e: "goToDetails", fund: Fund): void;
}>();

const props = defineProps<{
  fund: Fund;
  returnsPercentage: string;
}>();

const fundPerformance = computed<
  | {
      year: number;
      annualReturn: string;
    }[]
  | []
>(() => {
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
