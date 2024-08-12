<template>
  <div class="flex flex-col bg-base-100 border border-neutral">
    <div
      class="flex items-center align-middle min-w-32 w-full h-16 overflow-clip"
    >
      <img class="h-full" :src="img" />
    </div>
    <span class="w-full text-center pt-2">{{ name }}</span>
    <span class="w-full text-center pb-2">{{ points }} Points</span>
  </div>
</template>

<script setup lang="jsx">
const props = defineProps({
  name: String,
  points: Number,
  img: String,
});
</script>
