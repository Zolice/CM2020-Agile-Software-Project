<template>
  <title>Taskmaster</title>
  <div class="flex h-screen bg-base-200" :data-theme="theme">
    <LeftSidebar
      :toggle-sidebar="toggleLeftSidebar"
      :is-sidebar-open="isLeftSidebarOpen"
    />

    <!-- Main content -->
    <div class="flex-1 flex flex-col h-screen">
      <!-- Display the page -->
      <div class="h-full overflow-auto">
        <NuxtPage />
      </div>
    </div>

    <RightSidebar
      v-if="windowWidth >= 640"
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
          <input
            v-model="currentTask.summary"
            type="text"
            placeholder="Title"
            class="input text-3xl font-bold w-full p-2 text-wrap"
          />
          <!-- Tags -->
          <div class="flex flex-row flex-wrap gap-2">
            <span
              class="badge cursor-pointer"
              :class="[
                new Date(currentTask.end) < new Date()
                  ? 'bg-[#BDD9CD] text-black'
                  : 'bg-[#BDD9CD] text-black',
              ]"
              @click="changeData('date')"
            >
              Due Date: {{ new Date(currentTask.end).toLocaleString() }}
              <i class="bi bi-pencil-square pl-2 fs-5"></i>
            </span>
            <span
              class="badge cursor-pointer"
              :class="[
                currentTask.priority == 'High' ? 'badge-error' : '',
                currentTask.priority == 'Medium' ? 'badge-primary' : '',
                currentTask.priority == 'Low' ? 'badge-success' : '',
              ]"
              @click="changeData('priority')"
            >
              Priority: {{ currentTask.priority || "Medium" }}
              <i class="bi bi-pencil-square pl-2 fs-5"></i>
            </span>
            <span
              class="badge"
              :class="[currentTask.completed ? 'badge-success' : 'badge-error']"
            >
              {{ currentTask.completed ? "Completed" : "Incomplete" }}
            </span>
            <span class="badge badge-primary">
              Calendar: {{ currentTaskCalendar }}
            </span>
          </div>
          <textarea
            v-model="currentTask.description"
            class="textarea textarea-ghost p-2 h-full"
            placeholder="Description"
          />
          <div class="flex justify-between">
            <button class="btn btn-sm btn-error" @click="deleteTask">
              Delete
            </button>
            <div class="flex gap-2">
              <button class="btn btn-sm btn-secondary" @click="saveTask">
                Save Changes
              </button>
              <button
                class="btn btn-sm"
                :class="[currentTask.completed ? 'btn-error' : 'btn-primary']"
                @click="toggleCompleted"
              >
                Mark as {{ currentTask.completed ? "Incomplete" : "Completed" }}
              </button>
            </div>
          </div>
        </div>
        <dialog id="confirmDeletionModal" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">Delete {{ currentTask.summary }}</h3>
            <p class="py-4">This action is irreversible!</p>
            <div class="flex w-full justify-end gap-2">
              <button
                onclick="confirmDeletionModal.close()"
                class="btn btn-sm btn-primary"
              >
                Cancel
              </button>
              <button class="btn btn-sm btn-error" @click="deleteTaskConfirm">
                Confirm Deletion
              </button>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <dialog id="changeDataModal" class="modal">
          <div class="modal-box flex flex-col gap-4">
            <h3 class="text-lg font-bold">Change {{ taskChangeType }}</h3>
            <div
              v-if="taskChangeType == 'date'"
              class="flex md:flex-row gap-4 flex-wrap"
            >
              <div class="flex flex-col gap-1 items-start">
                <span class="text-sm pl-2">Start Time</span>
                <input
                  id="startTime"
                  v-model="taskStartDate"
                  type="datetime-local"
                  name="startTime"
                  class="input input-bordered input-sm"
                />
              </div>
              <div class="flex flex-col gap-1 items-start">
                <span class="text-sm pl-2">End Time</span>
                <input
                  id="endTime"
                  v-model="taskEndDate"
                  type="datetime-local"
                  name="endTime"
                  class="input input-bordered input-sm"
                />
              </div>
            </div>

            <div
              v-if="taskChangeType == 'priority'"
              class="flex flex-col gap-1 items-start"
            >
              <span class="text-sm pl-2">Priority Level</span>
              <select
                v-model="taskPriority"
                class="select select-bordered select-sm"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div class="flex w-full justify-end gap-2">
              <button
                onclick="changeDataModal.close()"
                class="btn btn-sm btn-error"
              >
                Cancel
              </button>
              <button class="btn btn-sm btn-primary" @click="changeDataConfirm">
                Confirm
              </button>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
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
  <BackendGamification ref="backendGamification" />
</template>

<script setup lang="jsx">
import { useFlowbite } from "~/composables/useFlowbite";

// Main Application Variables
const theme = ref("dark");
const isLeftSidebarOpen = ref(false);
const isRightSidebarOpen = ref(false);
const windowWidth = ref(0);

// All callbacks
// View Task Modal Variables
const currentTask = ref({});
const currentTaskCalendar = ref("");

// Edit Task Modal Variables
const taskChangeType = ref("");
const taskPriority = ref("");
const taskStartDate = ref("");
const taskEndDate = ref("");

// Refresh callbacks
const refreshCallbacks = ref([]);
const dateCallbacks = ref([]);

const notifications = ref([]);

const backendGamification = ref(null);

onMounted(() => {
  // Theme
  theme.value = localStorage.getItem("theme") || "dark";

  useFlowbite(() => {
    initFlowbite();
  });

  // Get viewport width
  windowWidth.value = window.innerWidth;

  // If viewport smaller than tablet (640px), close sidebars
  if (window.innerWidth < 640) {
    isLeftSidebarOpen.value = false;
    isRightSidebarOpen.value = false;
  } else {
    // Get from localstorage
    const left = localStorage.getItem("isLeftSidebarOpen");
    const right = localStorage.getItem("isRightSidebarOpen");

    if (left == "true" || left == null) {
      isLeftSidebarOpen.value = true;
    } else {
      isLeftSidebarOpen.value = false;
    }

    if (right == "true" || right == null) {
      isRightSidebarOpen.value = true;
    } else {
      isRightSidebarOpen.value = false;
    }
  }
});

function setTheme(value) {
  theme.value = value;
}

function toggleLeftSidebar() {
  isLeftSidebarOpen.value = !isLeftSidebarOpen.value;
  localStorage.setItem("isLeftSidebarOpen", isLeftSidebarOpen.value);
}

function toggleRightSidebar() {
  isRightSidebarOpen.value = !isRightSidebarOpen.value;
  localStorage.setItem("isRightSidebarOpen", isRightSidebarOpen.value);
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

function viewTask(event, calendar) {
  // Set the current task
  currentTask.value = event;

  // If there's no assigned priority, set it to Medium
  if (!currentTask.value.priority) {
    currentTask.value.priority = "Medium";
  }

  // Set the current calendar
  currentTaskCalendar.value = calendar;

  // Display the modal
  view_task_modal.showModal();
}

function saveTask() {
  // Get the calendar
  const calendar = JSON.parse(localStorage.getItem("calendars")) || {};

  // find the task and override
  calendar[currentTaskCalendar.value].calendar[currentTask.value.uid] =
    currentTask.value;

  // Save the calendar
  localStorage.setItem("calendars", JSON.stringify(calendar));

  // Call refresh
  startRefresh();

  // Close the modal
  view_task_modal.close();
}

function toggleCompleted() {
  backendGamification.value.completeTask(currentTask.value.completed);

  // Set the completed
  currentTask.value.completed = currentTask.value.completed ? false : true;

  // Get the calendar
  // Get the calendar
  const calendar = JSON.parse(localStorage.getItem("calendars")) || {};

  // find the task and override
  calendar[currentTaskCalendar.value].calendar[currentTask.value.uid] =
    currentTask.value;

  // Save the calendar
  localStorage.setItem("calendars", JSON.stringify(calendar));

  // Call refresh
  startRefresh();
}

function deleteTask() {
  confirmDeletionModal.showModal();
}

function deleteTaskConfirm() {
  // Get the calendar
  const calendar = JSON.parse(localStorage.getItem("calendars")) || {};

  // find the task and delete
  delete calendar[currentTaskCalendar.value].calendar[currentTask.value.uid];

  // Save the calendar
  localStorage.setItem("calendars", JSON.stringify(calendar));

  // Call refresh
  startRefresh();

  // Close the modals
  confirmDeletionModal.close();
  view_task_modal.close();

  // Create a notification
  postNotification(
    "error",
    "Task Deleted",
    `${currentTask.value.summary} has been deleted!`
  );
}

function changeData(type) {
  taskChangeType.value = type;

  switch (type) {
    case "date":
      // Convert to local time string in the format expected by datetime-local input
      taskStartDate.value = new Date(currentTask.value.start)
        .toISOString()
        .slice(0, 16);
      taskEndDate.value = new Date(currentTask.value.end)
        .toISOString()
        .slice(0, 16);
      break;
    case "priority":
      taskPriority.value = currentTask.value.priority;
      break;
  }

  changeDataModal.showModal();
}

function changeDataConfirm() {
  switch (taskChangeType.value) {
    case "date":
      currentTask.value.start = new Date(taskStartDate.value).toISOString();
      currentTask.value.end = new Date(taskEndDate.value).toISOString();
      break;
    case "priority":
      currentTask.value.priority = taskPriority.value;
      break;
  }

  // Get the calendar
  const calendar = JSON.parse(localStorage.getItem("calendars")) || {};

  // find the task and override
  calendar[currentTaskCalendar.value].calendar[currentTask.value.uid] =
    currentTask.value;

  // Save the calendar
  localStorage.setItem("calendars", JSON.stringify(calendar));

  // Call refresh
  startRefresh();

  // Close the modal
  changeDataModal.close();
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
provide("toggleRightSidebar", toggleRightSidebar);
provide("isLeftSidebarOpen", isLeftSidebarOpen);
provide("postNotification", postNotification);
provide("watchRefresh", watchRefresh);
provide("startRefresh", startRefresh);
provide("watchDate", watchDate);
provide("startDate", startDate);
provide("viewTask", viewTask);
</script>
