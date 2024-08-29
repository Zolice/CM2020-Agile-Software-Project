<template>
  <div class="flex h-screen bg-base-200" :data-theme="theme">
    <LeftSidebar
      :toggle-sidebar="toggleLeftSidebar"
      :is-sidebar-open="isLeftSidebarOpen"
    />

    <!-- Main content -->
    <div class="flex-1 flex flex-col h-screen">
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
      <div class="h-fit overflow-auto">
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

const theme = ref("dark");
const isLeftSidebarOpen = ref(false);
const isRightSidebarOpen = ref(false);

// Refresh callbacks
const refreshCallbacks = ref([]);

onMounted(() => {
  theme.value = localStorage.getItem("theme") || "dark";

  // If viewport smaller than tablet (640px), close sidebars
  if (window.innerWidth < 640) {
    isLeftSidebarOpen.value = false;
    isRightSidebarOpen.value = false;
  } else {
    isLeftSidebarOpen.value = true;
    isRightSidebarOpen.value = true;
  }
});

function setTheme(value) {
  theme.value = value;
}

function toggleLeftSidebar() {
  isLeftSidebarOpen.value = !isLeftSidebarOpen.value;
}

function toggleRightSidebar() {
  isRightSidebarOpen.value = !isRightSidebarOpen.value;
}

function postNotification(type, message, duration = 5000) {
  // TODO: Implement a proper notification system

  alert(message);
}

watch(theme, (newTheme) => {
  localStorage.setItem("theme", newTheme);
});

function watchRefresh(callback) {
  refreshCallbacks.value.push(callback);
}

function startRefresh() {
  refreshCallbacks.value.forEach((callback) => callback());
}
// Provide functions for NuxtPage
provide("setTheme", setTheme);
provide("toggleLeftSidebar", toggleLeftSidebar);
provide("isLeftSidebarOpen", isLeftSidebarOpen);
provide("postNotification", postNotification);
provide("watchRefresh", watchRefresh);
provide("startRefresh", startRefresh);
</script>
