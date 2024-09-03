<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-row w-full p-2 px-4 justify-between items-center">
      <div class="flex gap-2">
        <button class="btn btn-sm btn-ghost" @click="toggleLeftSidebar">
          <i class="bi bi-list text-2xl"></i>
        </button>
      </div>
      <h1 class="title text-2xl text-center h-fit">TASKMASTER</h1>

      <div class="flex gap-2">
        <!-- Add Task Button -->
        <AddTaskModal />
      </div>
    </div>
    <div class="flex flex-col gap-2 px-4">
      <MobileCalendar />
      <select
        v-model="displayType"
        class="select select-sm bg-base-300 text-base-content w-full"
      >
        <option>Task List</option>
        <option>Timeline</option>
        <option>Daily View</option>
      </select>
    </div>

    <div class="h-full overflow-y-auto px-6 py-4">
      <TaskListView v-if="displayType == 'Task List'" />
      <TimelineView v-else-if="displayType == 'Timeline'" watch-date="true" />
      <DailyView v-else :hours="hours" />
    </div>
  </div>
  <BackendSettings ref="backendSettings" />
</template>

<script setup>
const toggleLeftSidebar = inject("toggleLeftSidebar");

const backendSettings = ref(null);

const watchDate = inject("watchDate");

const displayText = ref("");
const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];
const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const hours = [
  "12:00 AM",
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
  "11:00 PM",
];
const dates = ref([]);
const weeklyDates = ref([]);

const previousDates = ref([]);
const nextDates = ref([]);

const displayType = ref("Timeline");

// set the default values to be the current date
let year = new Date().getFullYear();
let month = new Date().getMonth();
let day = new Date().getDate();

onMounted(() => {
  // check if device is mobile
  if (!/Mobi|Android/i.test(window.navigator.userAgent)) {
    // redirect to m-index
    // window.location.href = "/";
  }
  updateDates();
  updateDisplayText("Monthly");

  // Register callbacks
  watchDate((date) => {
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
    updateDates();
    updateDisplayText("Monthly");
  });
});

function updateDates() {
  // Assume the value months and year are set
  // Clear the dates array
  dates.value = [];
  weeklyDates.value = [];

  let d = new Date(year, month);
  if (!!d.getTime() && month <= 11 && month >= 0) {
    //to handle errors if arguments are not valid.
    while (d.getMonth() == month) {
      dates.value.push({ date: d.getDate(), day: d.getDay() });
      d = new Date(d.getTime() + 1000 * 60 * 60 * 24);
    }
  } else {
    dates.value.push({}); //push an empty object into the 'dates' array
  }

  // Check which day the first day of the month falls on
  // If not the start of the week, add the previous month's dates
  // Get the start day from settings
  const settings = backendSettings.value.getSettings();
  const startDay = settings.startWeekOn.substring(0, 3).toUpperCase() || "SUN";

  d = new Date(year, month);
  previousDates.value = [];
  if (startDay != dayNames[d.getDay()]) {
    // loop until all added
    do {
      d = new Date(d.getTime() - 1000 * 60 * 60 * 24);
      previousDates.value.push({
        date: d.getDate(),
        day: d.getDay(),
      });
    } while (startDay !== dayNames[d.getDay()]);
  }

  // If the last day of the month is not the end of the week, add the next month's dates
  d = new Date(year, month + 1, 0);
  nextDates.value = [];
  if (dayNames[d.getDay()] !== startDay) {
    d = new Date(year, month + 1);
    while (dayNames[d.getDay()] !== startDay) {
      nextDates.value.push({
        date: d.getDate(),
        day: d.getDay(),
      });
      d = new Date(d.getTime() + 1000 * 60 * 60 * 24);
    }
  }
}

// Changes the display text based on the view
function updateDisplayText(view) {
  if (view === "Monthly") {
    displayText.value = `${months[month]} ${year}`;
  } else if (view === "Weekly") {
    const startOfWeek = weeklyDates.value[0];
    const endOfWeek = weeklyDates.value[6];
    displayText.value = `${months[month]} ${startOfWeek.date} - ${months[month]} ${endOfWeek.date}, ${year}`;
  } else if (view === "Daily") {
    displayText.value = `${day} ${months[month]} ${year}, ${
      dayNames[new Date(year, month, day).getDay()]
    }`;
  }
}
</script>

<style scoped>
.title {
  font-family: "Inter";
}
</style>
