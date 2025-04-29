<template>
  <div v-if="show" class="text-center py-8" v-bind="$attrs">
    <div
      class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
</script>
