<template>
  <!-- Settings Button -->
  <button
    class="btn btn-sm btn-accent w-full justify-start"
    onclick="settings_modal.showModal()"
  >
    Settings
  </button>

  <!-- Settings Modal -->
  <dialog id="settings_modal" class="modal h-screen">
    <div class="modal-box w-full max-w-screen-lg md:h-5/6 h-screen">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div class="flex flex-col h-full gap-4">
        <h3 class="text-3xl font-bold">Settings</h3>
        <div class="flex flex-col lg:flex-row h-full overflow-auto gap-4 ">
          <ul class="menu menu-horizontal lg:menu-vertical bg-base-100 rounded-box w-48 p-0">
            <li>
              <button
                :class="[selected ? 'active' : '']"
                @click="selectGeneral"
              >
                General
              </button>
            </li>
            <li>
              <button
                :class="[selected ? '' : 'active']"
                @click="selectCalendar"
              >
                Calendar
              </button>
            </li>
          </ul>
          <!-- General Settings -->
          <div
            v-if="selected"
            class="flex flex-col overflow-auto h-full w-full px-2 gap-4"
          >
            <!-- Calendar View Settings -->
            <div class="flex flex-col gap-1">
              <h4 class="text-2xl">Calendar View</h4>
              <label class="label cursor-pointer w-fit pl-2">
                <input
                  v-model="showWeekend"
                  type="checkbox"
                  class="toggle toggle-primary toggle-sm"
                  checked="checked"
                  @change="showWeekendChanged"
                >
                <span class="label-text pl-2">Show Weekends</span>
              </label>
              <span class="text-sm pl-2">Start Week On</span>
              <select
                v-model="startWeekOn"
                class="select select-bordered select-sm w-fit max-w-xs"
                @change="startWeekOnChanged"
              >
                <option>Sunday</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
              </select>
            </div>
            <!-- Time Date Settings -->
            <div class="flex flex-col gap-1">
              <h4 class="text-2xl">Time / Date Format</h4>
              <span class="text-sm pl-2">Date Format</span>
              <select
                v-model="dateFormat"
                class="select select-bordered select-sm w-fit max-w-xs"
                @change="dateFormatChanged"
              >
                <option>DD-MM-YY</option>
                <option>MM-DD-YY</option>
                <option>YY-MM-DD</option>
              </select>
              <span class="text-sm pl-2">Time Format</span>
              <select
                v-model="timeFormat"
                class="select select-bordered select-sm w-fit max-w-xs"
                @change="timeFormatChanged"
              >
                <option>12-Hour-Time</option>
                <option>24-Hour-Time</option>
              </select>
            </div>
            <button class="btn btn-primary w-48">Export Calendars</button>
            <!-- TODO: Check if this button is necessary -->
            <button class="btn btn-primary w-48">
              Backup to Local Storage
            </button>
            <div class="flex flex-col gap-1">
              <h4 class="text-2xl">Accounts</h4>
              <span class="text-sm">No account settings for now</span>
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
                >
              </label>
            </div>
          </div>
          <!-- Calendar -->
          <div
            v-else
            class="flex flex-col overflow-auto h-full w-full px-2 gap-4"
          >
            <!-- Settings -->
            <div class="flex flex-col gap-1">
              <h4 class="text-2xl">Create new calendar</h4>
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

const props = defineProps({
  setTheme: Function,
});

// Backend Settings Component
const backendSettings = ref(null);

// Current Page Boolean
const selected = ref(true); // true = general, false = calendar

// General Settings
const showWeekend = ref(true);
const startWeekOn = ref("Monday");
const dateFormat = ref("DD-MM-YY");
const timeFormat = ref("12-Hour-Time");
const theme = ref("dark");

onMounted(() => {
  // Get settings from backend
  const settings = backendSettings.value.getSettings();
  showWeekend.value = settings.showWeekend;
  startWeekOn.value = settings.startWeekOn;
  dateFormat.value = settings.dateFormat;
  timeFormat.value = settings.timeFormat;

  // Get current theme
  theme.value = backendSettings.value.getTheme();
});

// Functions by buttons
function selectGeneral() {
  selected.value = true;
}

function selectCalendar() {
  selected.value = false;
}

function showWeekendChanged(event) {
  backendSettings.value.setShowWeekend(event.target.checked);
}

function startWeekOnChanged(event) {
  backendSettings.value.setStartWeekOn(event.target.value);
}

function dateFormatChanged(event) {
  backendSettings.value.setDateFormat(event.target.value);
}

function timeFormatChanged(event) {
  backendSettings.value.setTimeFormat(event.target.value);
}

function themeChanged(event) {
  props.setTheme(event.target.value);
}
</script>
