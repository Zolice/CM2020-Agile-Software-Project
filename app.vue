<template>
  <div class="flex h-screen bg-base-200">
    <LeftSidebar
      :toggle-sidebar="toggleLeftSidebar"
      :is-sidebar-open="isLeftSidebarOpen"
    />

    <!-- Main content -->
    <div class="flex-1 flex flex-col h-screen overflow-y-clip">
      <!-- Move these buttons to each NuxtPage respectively -->
      <div class="flex justify-between p-2 bg-base-200">
        <button
          class="btn btn-secondary btn-md w-fit"
          @click="toggleLeftSidebar"
        >
          Left Sidebar
        </button>
        <button
          class="btn btn-secondary btn-md w-fit"
          @click="toggleRightSidebar"
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
      :toggle-sidebar="toggleRightSidebar"
      :is-sidebar-open="isRightSidebarOpen"
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
