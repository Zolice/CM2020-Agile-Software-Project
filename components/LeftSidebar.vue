<template>
  <!-- Sidebar -->
  <div
    class="transition-all duration-150 bg-base-300 block fixed md:relative h-screen z-10"
    :class="[isSidebarOpen ? 'md:w-[16rem] w-10/12' : 'w-0']"
  >
    <div class="h-full bg-base-300 w-full flex flex-col align-center">
      <div class="flex justify-between items-center px-4 py-3 h-min">
        <h1 v-if="isSidebarOpen" class="title text-2xl text-center h-fit">
          TASKMASTER
        </h1>
        <button
          class="w-fit text-center text-2xl focus:outline-none h-fit"
          @click="toggleSidebar"
        >
          <span v-if="isSidebarOpen">-</span>
        </button>
      </div>
      <nav
        v-if="isSidebarOpen"
        class="flex-1 p-4 flex flex-col justify-between h-full overflow-scroll"
      >
        <!-- Sidebar content here -->
        <div class="flex flex-col gap-4">
          <span>Calendar</span>
          <span>Calendars</span>
          <span>Settings</span>
          <span>Other stuff</span>
          <span>Calendar</span>
          <span>Calendars</span>
          <span>Settings</span>
          <span>Other stuff</span>
          <span>Calendar</span>
          <span>Calendars</span>
          <span>Settings</span>
          <span>Other stuff</span>
          <span>Calendar</span>
          <span>Calendars</span>
          <span>Settings</span>
          <span>Other stuff</span>
          <span>Calendar</span>
          <span>Calendars</span>
          <span>Settings</span>
          <span>Other stuff</span>
        </div>
      </nav>
      <div class="m-2 p-2 bg-neutral text-neutral-content rounded-lg">
        <span>Profile</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  toggleSidebar: Function,
  isSidebarOpen: Boolean,
});
</script>
<style scoped>
.title {
  font-family: "Inter";
}
</style>
