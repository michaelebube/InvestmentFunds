<template>
  <div
    class="border p-4 rounded-3xl shadow hover:shadow-md hover:scale-105 hover:bg-[#0165f6] hover:text-white cursor-pointer transition duration-300 ease-in-out group border"
  >
    <div class="flex items-center space-x-4">
      <img
        :src="fund.logo"
        alt="logo"
        class="h-10 w-10 object-contain"
        loading="lazy"
      />
      <div class="border-b border-gray-500 w-full group-hover:border-white">
        <h2 class="text-lg font-bold">{{ fund.name }}</h2>
        <p class="text-sm text-gray-500 mb-1 group-hover:text-white/90">
          Code: {{ fund.fund_code }}
        </p>
      </div>
    </div>
    <div class="mt-2 space-y-1">
      <p><strong>Fund Manager:</strong> {{ fund.fund_manager }}</p>
      <p><strong>Returns: </strong> {{ returnsPercentage }}</p>
      <p><strong>Risk Level:</strong> {{ riskLevel }}</p>
      <p>
        <strong>Type: </strong>
        <span v-if="fund.is_money_market">Money Market</span>
        <span v-else-if="fund.is_eurobond">Eurobond</span>
        <span v-else>Mixed</span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps(["fund", "returnsPercentage", "riskLevel"]);
</script>
