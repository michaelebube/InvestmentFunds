<template>
  <div class="bg-white min-h-screen">
    <div>
      <div class="pt-[80px] mb-15">
        <InvestmentsTab />
      </div>

      <div v-if="isLoading" class="text-center py-8">
        <div
          class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"
        ></div>
        <p class="mt-2 text-gray-500">Loading funds...</p>
      </div>

      <ErrorComp :error="error" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

import InvestmentsTab from "../components/InvestmentsTab.vue";

const store = useStore();

const error = computed(() => store.state.error);

onMounted(() => {
  if (!store.state.funds.length) {
    store.dispatch("fetchFunds", {
      customErrorMessage: "Failed to fetch funds. Please try again.",
    });
  }
});

const isLoading = computed(() => store.getters.isLoading);
</script>
