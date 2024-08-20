<template>
  <div class="main-four col w-1/2">
    <div class="mt-4">
      <h4 class="text-xl font-bold">Borders</h4>
      <div class="flex flex-wrap gap-2 mt-4">
        <div v-for="border in borders" :key="border.id" class="border">
          <img :src="border.image" :alt="border.name" class="w-16 h-16" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  borders: Array,
});
</script>
