<template>
  <div class="flex flex-col w-fit bg-base-100 border border-neutral" :data-theme="theme">
    <div class="grid grid-rows-2 grid-cols-2 w-32 h-32">
      <div class="bg-primary"></div>
      <div class="bg-secondary"></div>
      <div class="bg-accent"></div>
      <div class="bg-neutral"></div>
    </div>
    <span class="w-full text-center pt-2">{{ name }}</span>
    <span class="w-full text-center pb-2">{{ points }} Points</span>
  </div>
</template>

<script setup lang="jsx">
const props = defineProps({
  name: String,
  theme: String,
  points: Number,
});
</script>
