<template>
  <div class="mt-4">
    <h4 class="text-xl font-bold">Name Tags</h4>
    <div class="flex flex-wrap gap-2">
      <div v-for="nametag in nametags" :key="nametag.id" class="border">
        <img :src="nametag.image" :alt="nametag.name" class="w-40 h-10" />
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  nametags: Array,
});
</script>
