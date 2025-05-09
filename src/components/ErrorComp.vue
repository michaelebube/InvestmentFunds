<template>
  <div
    v-if="error"
    class="text-center p-6 max-w-lg mx-auto text-2xl text-red-500 py-10 border border-red-500 rounded-lg"
  >
    {{ error }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: string | null;
}>();
</script>
