<template>
  <!-- Add Task Button -->
  <button
    class="btn btn-sm btn-accent w-full justify-start"
    :onclick="openAddTaskModal"
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
        <h3 class="text-3xl font-bold">New Task</h3>
        <div class="flex flex-col lg:flex-row h-full overflow-auto gap-4">
          <div class="flex flex-col overflow-auto h-full w-full px-2 gap-4">
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
            <div class="flex flex-row gap-4">
              <div class="flex flex-col gap-1">
                <span class="text-sm pl-2">Start Time</span>
                <input type="datetime-local" id="startTime" name="startTime" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm pl-2">End Time</span>
                <input type="datetime-local" id="endTime" name="endTime" />
              </div>
              <div class="flex flex-col gap-1">
                <!-- Repeat Task -->
                <br />
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
              <div class="flex flex-col gap-1">
                <span class="text-sm pl-2">Priority Level</span>
                <select
                  v-model="priorityLevel"
                  class="select select-bordered select-sm w-fit max-w-xs"
                  @change="priorityLevelChanged"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm pl-2">Calendar / Category</span>
                <select
                  v-model="calendarCategory"
                  class="select select-bordered select-sm w-fit max-w-xs"
                  @change="calendarCategoryChanged"
                >
                  <option>Assignment</option>
                </select>
              </div>
            </div>
            <!-- Description -->
            <div class="flex flex-col gap-1">
              <textarea
                v-model="addDescription"
                placeholder="Add a description or links"
                class="input input-bordered h-48"
                style="resize: none"
              >
              </textarea>
            </div>
            <!-- Discard & Save buttons-->
            <div class="flex flex-row gap-2 w-full max-w-sm">
              <button
                class="btn btn-sm grow btn-error"
                onclick="add_task_modal.close()"
              >
                Discard
              </button>
              <button
                class="btn btn-sm grow btn-primary"
                :class="[addTitle == '' ? 'btn-disabled' : '']"
                @click="createTask"
              >
                Save
              </button>
            </div>
            <div class="flex flex-col gap-1">
              <h4 class="text-2xl">Appearance</h4>
              <span class="text-sm">Theme input is temporary.</span>
              <label
                class="input input-bordered input-sm flex items-center gap-2 w-48"
              >
                Theme
                <input
                  v-model="theme"
                  type="text"
                  class="grow"
                  placeholder="Theme"
                  @change="themeChanged"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
  <BackendSettings ref="backendSettings" />
</template>

<script setup lang="jsx">
import { ref } from "vue";

// Backend Settings Component
const backendSettings = ref(null);
const setTheme = inject("setTheme");

// Settings
const repeatTask = ref("Don't Repeat");
const priorityLevel = ref("Medium");
const theme = ref("dark");

onMounted(() => {
  // Get current theme
  theme.value = backendSettings.value.getTheme();
});

function openAddTaskModal() {
  // Get settings from backend
  const settings = backendSettings.value.getSettings();

  // Open add task modal
  add_task_modal.showModal();
}

function themeChanged(event) {
  setTheme(event.target.value);
}

function createTask() {}
</script>
