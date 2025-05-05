<template>
  <div
    class="pt-[90px] sm:pt-[150px] mx-[20px] sm:mx-[40px] md:mx-[30px] xl:mx-[90px] 2xl:mx-[200px]"
  >
    <div class="flex gap-2 sm:gap-4 items-center">
      <a
        @click="goBack"
        class="text-[#082552] opacity-65 text-[13px] font-light sm:text-sm cursor-pointer"
        >Mutual Funds</a
      >
      <RightArrow />
      <span class="text-[12px] text-[#082552] sm:text-sm">{{ fund.name }}</span>
    </div>

    <div
      class="mt-10 sm:mt-15 grid grid-cols-1 space-y-6 sm:space-y-10 md:space-y-0 md:grid-cols-[67%_33%] md:gap-x-[60px] lg:gap-x-[90px] xl:gap-x-[100px] 2xl:gap-x-[120px]"
    >
      <div>
        <div class="sm:flex justify-between sm:items-end md:items-start">
          <div class="sm:flex mb-4 gap-6 xl:gap-8">
            <img
              :src="fund.logo"
              alt="logo"
              class="h-16 w-16 sm:h-18 sm:w-18 md:h-16 md:w-16 xl:h-20 xl:w-20 object-contain rounded-full border-[#fff] border-3 mb-4 sm:mb-0"
              loading="lazy"
            />
            <div>
              <h2
                class="mb-2 sm:mb-4 md:mb-0 text-2xl md:text-xl lg:text-2xl xl:text-[28px] text-[#082552] font-semibold"
              >
                {{ fund.name }}
              </h2>
              <h2 class="mb-10 md:mb-0 mt-1 text-[13px] text-gray-400">
                {{ fund.fund_manager }}
              </h2>
            </div>
          </div>
          <BaseButton
            class="md:text-sm lg:text-[16px] text-lg py-2 px-6 md:py-[7px] md:px-4 lg:py-2 xl:py-3 lg:px-4 xl:px-6"
          />
        </div>
        <div class="mt-10 sm:mt-12 md:mt-10 px-1 flex justify-between">
          <div>
            <div class="text-sm sm:text-[16px] text-gray-400">
              {{ fund.is_money_market ? "Annual Returns" : "YTD Returns " }}
            </div>
            <p class="text-[26px] sm:text-3xl font-medium text-[#58CC58] mt-1">
              {{ returnsPercentage }} <span class="text-lg">%</span>
            </p>
          </div>
          <div class="flex gap-3 mt-1">
            <a href="#">
              <img src="/svg/twitter.svg" alt="Twitter Logo" class="w-4 h-4" />
            </a>
            <a href="#">
              <img
                src="/svg/facebook.svg"
                alt="Facebook Logo"
                class="w-4 h-4"
              />
            </a>
            <a href="#">
              <img
                src="/svg/whatsapp.svg"
                alt="WhatsApp Logo"
                class="w-4 h-4"
              />
            </a>
          </div>
        </div>
        <div class="mt-14 px-1">
          <p class="text-[#b1bbc9] font-light text-sm mb-4">
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
          class="px-1 mb-3 border-b py-3 text-[16px] border-gray-100"
        >
          <div class="flex justify-between">
            <p class="text-[#082552] opacity-60">{{ item.year }}</p>
            <p class="text-[#58CC58] font-semibold">
              {{ item.annualReturn }}<span class="text-sm">%</span>
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col gap-3 md:max-w-[175px] lg:max-w-[240px] xl:max-w-[300px] 2xl:max-w-[330px]"
      >
        <h2 class="lg:-my-2 text-lg sm:text-xl font-medium text-[#082552]">
          About
        </h2>
        <p
          class="text-[#082552]/80 mt-2 leading-5 opacity-65 break-words text-sm font-normal md:text-sm lg:text-sm sm:text-[16px] mb-1"
        >
          {{ fund.description }}
        </p>
        <div v-for="(item, index) in detailsArray" :key="index">
          <div
            class="flex justify-between items-center border-b-[0.5px] border-gray-200 py-4 text-sm lg:text-sm"
          >
            <p class="text-[#082552] opacity-60">{{ item.label }}</p>
            <p class="font-normal text-[#082552]">
              {{ item.value }}
            </p>
          </div>
        </div>
        <div class="mt-5 mb-6 sm:mt-6">
          <p class="text-[#082552] text-sm opacity-60 mb-5">Fund Composition</p>
          <div
            class="flex items-center h-2 rounded-[2px] overflow-hidden bg-gray-100"
          >
            <div
              v-for="(item, index) in fundComposition"
              :key="index"
              :style="{ width: `${item.value}%`, backgroundColor: item.color }"
              class="h-full transition-all duration-300"
            ></div>
          </div>

          <div class="mt-4 flex flex-wrap gap-5 sm:grid sm:grid-cols-1 lg:flex">
            <div
              v-for="(item, index) in fundComposition"
              :key="index"
              class="flex items-baseline gap-2"
            >
              <div
                :style="{ backgroundColor: item.color }"
                class="w-2 h-2"
              ></div>
              <span class="text-[12px]">{{ item.key }}: {{ item.value }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-20">
      <h2 class="text-3xl font-medium text-[#082552]">Explore more funds</h2>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import RightArrow from "./RightArrow.vue";
import { useRouter } from "vue-router";
import {
  formatPercentage,
  formatReturnsPayment,
  formatRiskLevel,
  formatNaira,
} from "../utils/fundUtils";
import BaseButton from "./BaseButton.vue";

const props = defineProps({
  fund: {
    type: Object,
    required: true,
  },
  returnsPercentage: {
    type: Number,
    required: true,
  },
});
const router = useRouter();

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

const truncate = (str, maxLength = 18) => {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

const detailsArray = computed(() => {
  return [
    { label: "Risk Level", value: formatRiskLevel(props.fund.risk) },
    {
      label: "Custodian",
      value: truncate(props.fund.custodian),
    },
    { label: "Fund Size", value: formatNaira(props.fund.size_in_kobo) },
    {
      label: "Returns Payment",
      value: formatReturnsPayment(props.fund.returns_model),
    },
  ];
});
const colors = ["#A2E3FC", "#0066F5", "#082552", "#BEE8BA"];

const fundComposition = computed(() => {
  if (!props.fund.composition || typeof props.fund.composition !== "object") {
    return [];
  }

  return Object.entries(props.fund.composition).map(([key, value], index) => ({
    key,
    value,
    color: colors[index],
  }));
});

const goBack = () => {
  router.push("/");
};
</script>
