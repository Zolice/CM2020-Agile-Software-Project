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
              <i
                class="bi bi-pencil-square pl-2 fs-5 cursor-pointer"
                @click="changeData('date')"
              >
              </i>
            </span>
            <span
              class="badge"
              :class="[
                currentTask.priority == 'High' ? 'badge-error' : '',
                currentTask.priority == 'Medium' ? 'badge-primary' : '',
                currentTask.priority == 'Low' ? 'badge-success' : '',
              ]"
            >
              Priority: {{ currentTask.priority || "Medium" }}
              <i
                class="bi bi-pencil-square pl-2 fs-5 cursor-pointer"
                @click="changeData('priority')"
              >
              </i>
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
            class="textarea textarea-ghost p-2 h-full"
            placeholder="Description"
            v-model="currentTask.description"
          >
          </textarea>
          <div class="flex justify-between">
            <button @click="deleteTask" class="btn btn-sm btn-error">
              Delete
            </button>
            <div class="flex gap-2">
              <button @click="saveTask" class="btn btn-sm btn-secondary">
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
        <!-- Open the modal using ID.showModal() method -->
        <!-- <button class="btn" onclick="confirmDeletionModal.showModal()">open modal</button> -->
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
              <button @click="deleteTaskConfirm" class="btn btn-sm btn-error">
                Confirm Deletion
              </button>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <!-- Open the modal using ID.showModal() method -->
        <!-- <button class="btn" onclick="changeDataModal.showModal()">
          open modal
        </button> -->
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
              class="flex flex-col gap-1 items-start"
              v-if="taskChangeType == 'priority'"
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
              <button @click="changeDataConfirm" class="btn btn-sm btn-primary">
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
</template>

<script setup lang="jsx">
import { useFlowbite } from "~/composables/useFlowbite";

// Main Application Variables
const theme = ref("dark");
const isLeftSidebarOpen = ref(false);
const isRightSidebarOpen = ref(false);

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
}

function changeData(type) {
  console.log(type);
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

// Provide functions for NuxtPage
provide("setTheme", setTheme);
provide("toggleLeftSidebar", toggleLeftSidebar);
provide("isLeftSidebarOpen", isLeftSidebarOpen);
provide("postNotification", postNotification);
provide("watchRefresh", watchRefresh);
provide("startRefresh", startRefresh);
provide("viewTask", viewTask);
</script>
