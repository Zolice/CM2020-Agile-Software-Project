<template>
  <!-- Sidebar -->
  <div
    class="transition-all duration-150 bg-base-300 block fixed md:relative h-screen z-10"
    :class="[isSidebarOpen ? 'md:w-[20rem] w-10/12' : 'w-0 collapse']"
  >
    <div class="h-full bg-base-300 w-full flex flex-col align-center">
      <div class="flex justify-between items-center px-4 py-3 h-min">
        <button
          class="w-fit text-center text-2xl focus:outline-none h-fit"
          @click="toggleSidebar"
        >
          <span v-if="isSidebarOpen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </button>
        <select
          v-if="isSidebarOpen"
          v-model="sidebarType"
          class="select select-sm"
        >
          <option>Task List</option>
          <option>Timeline</option>
        </select>
      </div>
      <nav
        v-if="isSidebarOpen"
        class="flex-1 p-4 flex flex-col justify-between overflow-auto"
      >
        <!-- Sidebar content here -->
        <TaskListView v-if="sidebarType == 'Task List'" />
        <TimelineView v-else />
      </nav>
    </div>
  </div>
</template>

<script setup lang="jsx">
// Import
defineProps({
  toggleSidebar: Function,
  isSidebarOpen: Boolean,
});

// Settings
const sidebarType = ref("Timeline");
</script>
