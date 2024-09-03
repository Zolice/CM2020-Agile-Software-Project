<template>
  <div class="w-full flex flex-row items-center">
    <h4 class="flex-shrink-0 ps-4">Level {{ level }} &nbsp; &nbsp;</h4>
    <div class="w-full">
      <div
        class="relative w-full bg-neutral rounded-full border-2 border-gray-400 h-4"
      >
        <div
          class="absolute top-0 left-0 bg-primary h-full rounded-full"
          :style="{ width: scoreWidth + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  scoreWidth: Number,
  level: Number,
});
</script>
