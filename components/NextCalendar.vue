<template>
  <div class="flex flex-row items-center space-x-2 justify-center mx-2">
    <!-- Calendar Previous Month Button -->
    <button
      class="btn font-medium rounded-lg text-sm px-3 py-0.5 h-10 text-center inline-flex items-center"
      type="button"
      @click="previousFunction"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>

    <!-- Calendar Month name -->
    <h1 class="text-lg">
      {{ displayText }}
    </h1>

    <!-- Calendar Next Month Button -->
    <button
      class="btn font-medium rounded-lg text-md px-3 py-0.5 h-10 text-center inline-flex items-center"
      type="button"
      @click="nextFunction"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  previousFunction: Function,
  nextFunction: Function,
  displayText: String,
});
</script>
