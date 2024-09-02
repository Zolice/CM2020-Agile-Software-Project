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
        <button class="btn btn-md rounded-full" @click="toggleLeftSidebar">
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>

          <!-- Left Sidebar -->
        </button>

        <button
          class="btn btn-md w-fit rounded-full"
          @click="toggleRightSidebar"
        >
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

          <!-- Right Sidebar -->
        </button>
      </div>

      <MonthView />

      <!-- Display the page -->
      <div class="h-fit overflow-auto">
        <NuxtPage />
      </div>
    </div>

    <RightSidebar
      :toggle-sidebar="toggleRightSidebar"
      :is-sidebar-open="isRightSidebarOpen"
    />

    <!-- Notifications -->
    <div class="toast z-50">
      <NotificationDisplay
        v-for="notification in notifications"
        :key="notification.title"
        :type="notification.type"
        :title="notification.title"
        :message="notification.message"
        :duration="notification.duration"
        :img="notification.img"
      />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { useFlowbite } from "~/composables/useFlowbite";

const theme = ref("dark");
const isLeftSidebarOpen = ref(false);
const isRightSidebarOpen = ref(false);

// All callbacks
const refreshCallbacks = ref([]);
const dateCallbacks = ref([]);

const notifications = ref([]);

onMounted(() => {
  theme.value = localStorage.getItem("theme") || "dark";
  useFlowbite(() => {
    initFlowbite();
  });

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

function postNotification(
  type = "info",
  title,
  message,
  duration = 10000,
  img = ""
) {

  // create notification object
  const notification = {
    type,
    title,
    message,
    duration,
    img,
  };

    // Add notification to the list
  notifications.value.push(notification);

  // Remove notification after duration
  setTimeout(() => {
    // Delete the notification
    notifications.value.splice(
      notifications.value.findIndex((n) => {
        n != notification;
      }),
      1
    );
  }, duration);
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

function watchDate(callback) {
  dateCallbacks.value.push(callback);
}

function startDate(date) {
  dateCallbacks.value.forEach((callback) => callback(date));
}

// Provide functions for NuxtPage
provide("setTheme", setTheme);
provide("toggleLeftSidebar", toggleLeftSidebar);
provide("isLeftSidebarOpen", isLeftSidebarOpen);
provide("postNotification", postNotification);
provide("watchRefresh", watchRefresh);
provide("startRefresh", startRefresh);
provide("watchDate", watchDate);
provide("startDate", startDate);
</script>
