<script setup>
import TheHeader from "./components/TheHeader.vue";
</script>

<template
  class="mt-[50px] mx-[20px] sm:mx-[40px] md:mx-[30px] xl:mx-[90px] 2xl:mx-[200px]"
>
  <TheHeader />
  <RouterView />
</template>

<style>
* {
  font-family: "IBM Plex Sans", sans-serif;
}
</style>
