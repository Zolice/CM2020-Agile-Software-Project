<template>
  <div class="flex flex-row items-center space-x-2 justify-center mx-2">
    <!-- Calendar Previous Button -->
    <button
      class="btn btn-ghost font-medium rounded-lg text-sm px-3 py-0.5 h-10 text-center inline-flex items-center"
      type="button"
      @click="navigateCalendar(view, 'previous')"
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

    <!-- Calendar Name -->
    <h1 class="text-lg">
      {{ displayText }}
    </h1>

    <!-- Calendar Next Button -->
    <button
      class="btn btn-ghost font-medium rounded-lg text-md px-3 py-0.5 h-10 text-center inline-flex items-center"
      type="button"
      @click="navigateCalendar(view, 'next')"
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
  navigateCalendar: Function,
  view: String,
  displayText: String,
});
</script>
