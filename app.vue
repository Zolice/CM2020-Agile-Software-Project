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

    <!-- Add Task Modal -->
    <dialog id="view_task_modal" class="modal h-screen">
      <div class="modal-box w-full max-w-screen-lg md:h-5/6 h-screen">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <div class="flex flex-col h-full gap-4">
          <!-- <h3 class="text-3xl font-bold w-fit">{{ currentTask.summary }}</h3> -->
          <input
            v-model="currentTask.summary"
            type="text"
            placeholder="Title"
            class="input text-3xl font-bold w-full p-2"
          />
          <!-- Tags -->
          <div class="flex flex-row gap-2">
            <span
              class="badge"
              :class="[
                new Date(currentTask.end) < new Date()
                  ? 'bg-[#BDD9CD] text-black'
                  : 'bg-[#BDD9CD] text-black',
              ]"
            >
              Due Date: {{ new Date(currentTask.end).toLocaleString() }}
            </span>
          </div>
          <textarea
            class="textarea textarea-ghost p-2 h-full"
            placeholder="Description"
            v-model="currentTask.description"
          ></textarea>
          <div class="flex justify-between">
            <button class="btn btn-sm btn-error">Delete</button>
            <div class="flex gap-2">
              <button class="btn btn-sm btn-secondary">Save Changes</button>
              <button class="btn btn-sm btn-primary">Mark as Completed</button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
    
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

// Main Application Variables
const theme = ref("dark");
const isLeftSidebarOpen = ref(false);
const isRightSidebarOpen = ref(false);

// View Task Modal Variables
const currentTask = ref({});

// Refresh callbacks
const refreshCallbacks = ref([]);

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

function viewTask(event) {
  // Set the current task
  currentTask.value = event;

  // Display the modal
  view_task_modal.showModal();
}

// Provide functions for NuxtPage
provide("setTheme", setTheme);
provide("toggleLeftSidebar", toggleLeftSidebar);
provide("isLeftSidebarOpen", isLeftSidebarOpen);
provide("postNotification", postNotification);
provide("watchRefresh", watchRefresh);
provide("startRefresh", startRefresh);
provide("viewTask", viewTask);
</script>
