<template>
  <!-- Add Task Button -->
  <button
    class="btn btn-primary btn-sm text-center items-center"
    type="button"
    @click="openAddTaskModal"
  >
    Add Task
  </button>

  <!-- Add Task Modal -->
  <dialog id="add_task_modal" class="modal h-screen">
    <div class="modal-box w-full max-w-screen-lg md:h-5/6 h-screen">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div class="flex flex-col h-full gap-4">
        <h3 class="text-3xl font-bold w-fit">New Task</h3>
        <div class="flex flex-col lg:flex-row h-full overflow-auto gap-3">
          <div
            class="flex flex-col overflow-auto h-full w-full px-2 py-1 gap-4"
          >
            <!-- Title -->
            <div class="flex flex-col gap-1">
              <input
                v-model="addTitle"
                type="text"
                placeholder="Add Title"
                class="input input-bordered"
              />
            </div>
            <!-- Date & Time Pickers -->
            <div class="flex md:flex-row gap-4 flex-wrap">
              <div class="flex flex-col gap-1 items-start">
                <span class="text-sm pl-2">Start Time</span>
                <input
                  id="startTime"
                  v-model="startTime"
                  type="datetime-local"
                  name="startTime"
                  class="input input-bordered input-sm"
                />
              </div>
              <div class="flex flex-col gap-1 items-start">
                <span class="text-sm pl-2">End Time</span>
                <input
                  id="endTime"
                  v-model="endTime"
                  type="datetime-local"
                  name="endTime"
                  class="input input-bordered input-sm"
                />
              </div>
              <div class="flex flex-col gap-1 items-start">
                <span class="text-sm pl-2">Repeat</span>
                <!-- Repeat Task -->
                <select
                  v-model="repeatTask"
                  class="select select-bordered select-sm w-fit max-w-xs"
                  @change="repeatTaskChanged"
                >
                  <option>Repeat</option>
                  <option>Don't Repeat</option>
                </select>
              </div>
            </div>
            <!-- Priority / Category -->
            <div class="flex flex-row gap-4">
              <div class="flex flex-col gap-1 items-start">
                <span class="text-sm pl-2">Priority Level</span>
                <select
                  v-model="priorityLevel"
                  class="select select-bordered select-sm"
                  @change="priorityLevelChanged"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div class="flex flex-col gap-1 items-start">
                <span class="text-sm pl-2">Calendar / Category</span>
                <select
                  v-model="calendarCategory"
                  class="select select-bordered select-sm w-fit"
                  :class="[
                    calendarCategory == 'No calendars available'
                      ? 'btn-disabled'
                      : '',
                  ]"
                  @change="calendarCategoryChanged"
                >
                  <option
                    v-if="calendarCategoryList.length == 0"
                    selected
                    disabled
                  >
                    No calendars available
                  </option>
                  <option
                    v-for="category in calendarCategoryList"
                    :key="category"
                  >
                    {{ category }}
                  </option>
                  <!-- <option>Assignment</option> -->
                </select>
              </div>
            </div>
            <!-- Description -->
            <div class="flex flex-col gap-1">
              <textarea
                v-model="addDescription"
                placeholder="Add a description or links"
                class="input input-bordered h-48 p-2"
                style="resize: none"
              >
              </textarea>
            </div>
          </div>
        </div>
        <!-- Discard & Save buttons-->
        <div class="flex flex-row gap-2 w-full justify-end items-center">
          <span
            v-if="calendarCategory == 'No calendars available'"
            class="text-sm text-error"
            >Create a calendar to add a task!</span
          >
          <button class="btn btn-sm btn-error" onclick="add_task_modal.close()">
            Discard
          </button>
          <button
            class="btn btn-sm btn-primary"
            :class="[
              addTitle == '' ? 'btn-disabled' : '',
              startTime == '' ? 'btn-disabled' : '',
              endTime == '' ? 'btn-disabled' : '',
              calendarCategory == '' ? 'btn-disabled' : '',
            ]"
            @click="createTask"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </dialog>
  <BackendSettings ref="backendSettings" />
</template>

<script setup lang="jsx">
import { ref } from "vue";

// Import backend components
const backendSettings = ref(null);

// Values
const calendarCategoryList = ref([]);

// User inputs
const addTitle = ref("");
const addDescription = ref("");
const startTime = ref("");
const endTime = ref("");
const repeatTask = ref("Don't Repeat");
const calendarCategory = ref("");
const priorityLevel = ref("Medium");

onMounted(() => {});

function openAddTaskModal() {
  console.log("hello");
  // Get all calendars
  // calendar list
  const calendars = backendSettings.value.getCalendars();
  console.log("hello");

  // Get keys of calendar list
  calendarCategoryList.value = Object.keys(calendars);
  console.log("hello");

  // Set the default calendar
  if (calendarCategoryList.value.length > 0) {
    calendarCategory.value = calendarCategoryList.value[0];
  } else {
    calendarCategory.value = "No calendars available";
  }
  console.log("hello");

  // Clear all values
  addTitle.value = "";
  addDescription.value = "";
  startTime.value = "";
  endTime.value = "";
  repeatTask.value = "Don't Repeat";
  priorityLevel.value = "Medium";
  console.log("hello");

  // Open add task modal
  add_task_modal.showModal();
  console.log("hello");
}

function createTask() {
  /*
  Generate the following information:
  {
    "type": "VEVENT",
    "params": [],
    "start": "2023-07-20T16:00:00.000Z",
    "end": "2023-07-21T16:00:00.000Z",
    "dtstamp": "2024-08-02T12:10:18.000Z",
    "uid": "0guvjfdmri73pbe96hme9hsn73@google.com",
    "created": "2023-04-13T10:05:49.000Z",
    "lastmodified": "2023-04-13T10:05:49.000Z",
    "sequence": "0",
    "status": "CONFIRMED",
    "summary": "Title",
    "transparency": "TRANSPARENT"
    // Extra information added by TM
    "description": "This is a description",
    "priority": "Medium",
  }
  */

  // Get an updated copy of the calendar
  const calendars = backendSettings.value.getCalendars();

  // Generate a UID to store the event
  let uid = Math.random().toString(36).substring(2, 15);

  // check if the UID is already in use
  // if it is, generate a new one
  while (calendars[calendarCategory.value].calendar[uid]) {
    uid = Math.random().toString(36).substring(2, 15);
  }

  // Generate an event
  const event = {
    type: "VEVENT",
    params: [],
    start: new Date(startTime.value).toISOString(),
    end: new Date(endTime.value).toISOString(),
    dtstamp: new Date().toISOString(),
    uid: uid,
    created: new Date().toISOString(),
    lastmodified: new Date().toISOString(),
    sequence: "0",
    status: "CONFIRMED",
    summary: addTitle.value,
    transparency: "TRANSPARENT",
    // Extra information added by TM
    description: addDescription.value,
    priority: priorityLevel.value,
  };

  // Add the event to the calendar
  backendSettings.value.addEvent(calendarCategory.value, event);

  // Close the modal
  add_task_modal.close();
}
</script>
