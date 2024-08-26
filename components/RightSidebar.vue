<template>
  <!-- Sidebar -->
  <div
    class="transition-all duration-150 bg-base-300 block fixed md:relative h-screen z-10"
    :class="[isSidebarOpen ? 'md:w-[18rem] w-10/12' : 'w-0 collapse']"
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
        class="flex-1 p-4 flex flex-col justify-between"
      >
        <!-- Sidebar content here -->
        <div v-if="sidebarType=='Task List'" class="flex flex-col gap-2 h-fit overflow-auto">
          <span class="text-lg">Overdue</span>
        </div>
        <div v-else class="flex flex-col gap-2 h-fit overflow-auto">
          <div class="flex flex-col gap-1">
            <span class="text-lg">Overdue</span>
            <TaskDisplay
              name="Assignment Due -- Algorithms and Data Structures II"
              due-date="Today"
              colour="red"
              description="Algorithms and Data Structures II -- Week 6 https://www.coursera.org/learn/uol-algorithms-and-data-structures-2/home/week/6You have 1 item due - 3.403 Topic 3 summative assessment [001]Stay on track by completing your assignment now!"
            />
            <TaskDisplay
              name="Assignment Due -- Algorithms and Data Structures II"
              due-date="Today"
              colour="yellow"
              description="Algorithms and Data Structures II -- Week 6 https://www.coursera.org/learn/uol-algorithms-and-data-structures-2/home/week/6You have 1 item due - 3.403 Topic 3 summative assessment [001]Stay on track by completing your assignment now!"
            />
            <TaskDisplay
              name="Assignment Due -- Algorithms and Data Structures II"
              due-date="Today"
              colour="green"
              description="Algorithms and Data Structures II -- Week 6 https://www.coursera.org/learn/uol-algorithms-and-data-structures-2/home/week/6You have 1 item due - 3.403 Topic 3 summative assessment [001]Stay on track by completing your assignment now!"
            />
          </div>
          <span class="text-lg">Today's Tasks</span>
          <span class="text-lg">Upcoming</span>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  toggleSidebar: Function,
  isSidebarOpen: Boolean,
});

const sidebarType = ref("Timeline");
</script>
