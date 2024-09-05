<template>
  <img
    v-if="owned == true"
    :src="img"
    :alt="name"
    class="w-16 h-16 rounded transition-transform transform group-hover:scale-110 border"
  />
  <div
    class="absolute flex items-center justify-center bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"
  >
    {{ name }}
  </div>
</template>

<script setup lang="jsx">
defineProps({
  owned: Boolean,
  name: String,
  img: String,
});
</script>
