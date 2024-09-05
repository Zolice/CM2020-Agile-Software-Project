<template>
  <div v-if="owned" class="relative group mt-4">
    <img :src="img" :alt="name" class="w-16 h-16 rounded border" />
    <div
      class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <span class="text-center px-2">{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  owned: Boolean,
  name: String,
  img: String,
});
</script>
