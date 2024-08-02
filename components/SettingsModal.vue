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
        <div class="flex flex-col lg:flex-row h-full overflow-auto gap-4">
          <ul
            class="menu menu-horizontal lg:menu-vertical bg-base-100 rounded-box w-48 p-0"
          >
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
                />
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
                />
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
              <input
                type="text"
                placeholder="Calendar Name"
                class="input input-bordered"
              />
            </div>
            <div class="flex flex-row gap-4">
              <div class="flex flex-col gap-1">
                <span class="text-sm pl-2">Colour</span>
                <input
                  type="color"
                  class="w-16 h-8 border-none border-0 bg-transparent"
                  v-model="calendarColour"
                />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm">Presets</span>
                <div class="flex flex-wrap gap-2">
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-red-300 hover:bg-red-400"
                    value="#fca5a5"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-orange-300 hover:bg-orange-400"
                    value="#fdba74"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-amber-300 hover:bg-amber-400"
                    value="#fcd34d"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-yellow-300 hover:bg-yellow-400"
                    value="#fde047"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-lime-300 hover:bg-lime-400"
                    value="#bef264"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-green-300 hover:bg-green-400"
                    value="#86efac"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-emerald-300 hover:bg-emerald-400"
                    value="#6ee7b7"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-teal-300 hover:bg-teal-400"
                    value="#5eead4"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-cyan-300 hover:bg-cyan-400"
                    value="#67e8f9"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-sky-300 hover:bg-sky-400"
                    value="#7dd3fc"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-blue-300 hover:bg-blue-400"
                    value="#93c5fd"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-indigo-300 hover:bg-indigo-400"
                    value="#a5b4fc"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-violet-300 hover:bg-violet-400"
                    value="#c4b5fd"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-purple-300 hover:bg-purple-400"
                    value="#d8b4fe"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-fuchsia-300 hover:bg-fuchsia-400"
                    value="#f0abfc"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-pink-300 hover:bg-pink-400"
                    value="#f9a8d4"
                    @click="setColour"
                  ></button>
                  <button
                    class="btn btn-sm btn-circle rounded-full bg-rose-300 hover:bg-rose-400"
                    value="#fda4af"
                    @click="setColour"
                  ></button>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-sm pl-2">Import Calendar</span>
              <div class="flex flex-row gap-2 items-center max-w-md">
                <input
                  type="url"
                  placeholder="Calendar URL"
                  class="input input-sm input-bordered w-full"
                  @change="validateUrl"
                  v-model="calendarUrl"
                />
                <button
                  class="btn btn-sm btn-primary"
                  :class="[calendarUrlError ? 'btn-disabled' : '']"
                >
                  Import
                </button>
              </div>
              <span v-if="calendarUrlError" class="text-sm text-error pl-2">{{
                calendarUrlErrorText
              }}</span>
              <span v-if="calendarUrlSuccess" class="text-sm text-success pl-2"
                >Import successful</span
              >
            </div>
            <div class="flex flex-row gap-2 w-full max-w-sm">
              <button class="btn btn-sm grow btn-error">Discard</button>
              <button class="btn btn-sm grow btn-primary">Save</button>
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

// Calendar Settings
const calendarColour = ref("#fca5a5");
const calendarUrl = ref("");
const calendarUrlError = ref(false);
const calendarUrlErrorText = ref("");
const calendarUrlSuccess = ref(false);

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

function setColour(event) {
  calendarColour.value = event.target.value;
}

function validateUrl(event) {
  if (event.target.value === "") {
    calendarUrlError.value = false;
    return;
  }
  let regex = new RegExp("^https?:\/\/");
  if (regex.test(event.target.value)) {
    calendarUrlError.value = false;
    calendarUrlErrorText.value = "";
  } else {
    calendarUrlError.value = true;
    calendarUrlErrorText.value = "Invalid URL";
  }
}
</script>
