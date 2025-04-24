<template>
  <div>
    <div class="text-gray-500 font-medium xl:text-[16px]">{{ label }}</div>
    <div
      v-if="!slot[id + '_detail']"
      class="font-medium text-gray-800 xl:text-[16px]"
    >
      {{ value }}
    </div>
    <slot :name="id + '_detail'" :value="value" v-else> </slot>
  </div>
</template>

<script setup>
import { useSlots } from "vue";
defineProps(["label", "value", "id"]);

const slot = useSlots();
</script>
