<template>
  <div class="flex h-screen">
    <LeftSidebar
      :toggleSidebar="toggleLeftSidebar"
      :isSidebarOpen="isLeftSidebarOpen"
    />

    <!-- Main content -->
    <div class="flex-1 flex flex-col h-screen overflow-y-clip">
      <!-- Move these buttons to each NuxtPage respectively -->
      <div class="flex justify-between p-2 bg-base-200">
        <button
          @click="toggleLeftSidebar"
          class="btn btn-secondary btn-md w-fit"
        >
          Left Sidebar
        </button>
        <button
          @click="toggleRightSidebar"
          class="btn btn-secondary btn-md w-fit"
        >
          Right Sidebar
        </button>
      </div>

      <!-- Display the page -->
      <div class="h-fit overflow-scroll">
        <NuxtPage />
      </div>
    </div>

    <RightSidebar
      :toggleSidebar="toggleRightSidebar"
      :isSidebarOpen="isRightSidebarOpen"
    />
  </div>
</template>

<script setup lang="jsx">
import { ref } from "vue";

const isLeftSidebarOpen = ref(true);
const isRightSidebarOpen = ref(true);

function toggleLeftSidebar() {
  isLeftSidebarOpen.value = !isLeftSidebarOpen.value;
}

function toggleRightSidebar() {
  isRightSidebarOpen.value = !isRightSidebarOpen.value;
}
</script>
