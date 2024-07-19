<template>
  <!-- Sidebar -->
  <div
    class="transition-all duration-150 bg-base-300 block fixed md:relative h-screen z-10"
    :class="[isSidebarOpen ? 'md:w-[16rem] w-10/12' : 'w-0']"
  >
    <div class="h-full bg-base-300 w-full flex flex-col align-center">
      <div class="flex justify-between items-center px-4 py-3 h-min">
        <h1 class="title text-2xl text-center h-fit" v-if="isSidebarOpen">
          TASKMASTER
        </h1>
        <button
          @click="toggleSidebar"
          class="w-fit text-center text-2xl focus:outline-none h-fit"
        >
          <span v-if="isSidebarOpen">-</span>
        </button>
      </div>
      <nav
        v-if="isSidebarOpen"
        class="flex-1 p-4 flex flex-col justify-between"
      >
        <!-- Sidebar content here -->
        <div class="flex flex-col gap-4 h-full">
          <span>Calendar</span>
          <span>Calendars</span>
          <span>Settings</span>
          <span>Other stuff</span>
        </div>
        <span>Profile</span>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-family: "Inter";
}
</style>

<script setup lang="jsx">
const props = defineProps({
  toggleSidebar: Boolean,
  isSidebarOpen: Function,
});
</script>
