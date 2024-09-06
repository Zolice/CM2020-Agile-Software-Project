<template>
  <div
    v-if="owned"
    class="relative group mt-4 cursor-pointer"
    @click="toggleSelection"
  >
    <img :src="img" :alt="name" class="w-16 h-16 rounded border" />
    <!-- Checkbox UI for selected badges -->
    <div
      v-if="selected"
      class="absolute top-1 right-1 w-5 h-5 bg-gray-200 border rounded flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-gray-900"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <!-- Badge name hover effect -->
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
  selected: Boolean,
});

function toggleSelection(event) {
  event.stopPropagation();
}
</script>
