<template>
  <div v-for="badge in badges" :key="badge.id">
    <img
      :src="badge.image"
      :alt="badge.name"
      class="w-16 h-16 rounded transition-transform transform group-hover:scale-110"
    />
    <div
      class="absolute flex items-center justify-center bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"
    >
      {{ badge.name }}
    </div>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  badges: Array,
});
</script>
