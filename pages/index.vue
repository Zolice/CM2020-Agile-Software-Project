<script setup lang="ts">
// import '../assets/css/output.css';
</script>
<template>
  <div class="flex m-2 p-1 space-x-15 items-center">
    <!-- Monthly view dropdown button -->
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdownView"
      class="btn btn-secondary font-medium rounded-lg text-sm px-4 py-0.5 h-10 text-center inline-flex items-center"
      type="button"
    >
      Monthly
      <svg
        class="w-2.5 h-1.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      id="dropdownView"
      class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Weekly</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Daily</a
          >
        </li>
      </ul>
    </div>

    <div class="flex flex-row items-center">
      <!-- calendar month previous button -->
      <button
        class="btn font-medium rounded-lg text-sm px-3 py-0.5 h-10 text-center inline-flex items-center"
        type="button"
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

      <!-- calendar month name -->
      <h1 class="text-lg">June 2024</h1>

      <!-- calendar month next button -->
      <button
        class="btn font-medium rounded-lg text-md px-3 py-0.5 h-10 text-center inline-flex items-center"
        type="button"
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
    <button class="btn btn-secondary rounded-lg font-medium text-sm" type="button">
      Add Task
    </button>
  </div>

  <div class="grid grid-cols-7 border mx-1">
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
    <div>01</div>
  </div>
</template>

<style scoped>
.title {
  font-family: "Inter";
}
</style>
