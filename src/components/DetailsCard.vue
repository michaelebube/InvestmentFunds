<template>
  <div>
    <div class="text-gray-500 font-medium xl:text-[16px]">{{ label }}</div>
    <div class="font-medium text-gray-800 xl:text-[16px]">{{ value }}</div>
  </div>
</template>

<script setup>
defineProps(["label", "value"]);
</script>
