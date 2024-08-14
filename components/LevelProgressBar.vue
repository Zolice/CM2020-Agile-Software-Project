<template>
  <div class="w-2/5">
    <div
      class="relative w-full bg-neutral rounded-full border-2 border-gray-400 h-4"
    >
      <div
        class="absolute top-0 left-0 bg-primary h-full rounded-full"
        :style="{ width: scoreWidth + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  scoreWidth: Number,
});
</script>
