<script setup>
const backendSettings = ref(null);
const calendarViewType = ref("Monthly");

const watchDate = inject("watchDate");
const startDate = inject("startDate");

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
let firstSatDate = 0;

// set the default values to be the current date
let year = new Date().getFullYear();
let month = new Date().getMonth();
let day = new Date().getDate();

onMounted(() => {
  calendarViewType.value =
    localStorage.getItem("calendarViewType") || "Monthly";
  updateDates();
  updateDisplayText(calendarViewType.value);

  console.log(month)

  // Register callbacks
  watchDate((date) => {
    console.log("confirm callback")
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
    updateDates();
    updateDisplayText(calendarViewType.value);
  });
});

watch(calendarViewType, (value) => {
  localStorage.setItem("calendarViewType", value);
  updateDates();
  updateDisplayText(value);
});

function updateDates() {
  // Assume the value months and year are set
  // Clear the dates array
  dates.value = [];
  weeklyDates.value = [];

  let d = new Date(year, month);
  console.log(d)
  if (!!d.getTime() && month <= 11 && month >= 0) {
    //to handle errors if arguments are not valid.
    while (d.getMonth() == month) {
      console.log(d)
      dates.value.push({ date: d.getDate(), day: d.getDay() });
      d = new Date(d.getTime() + 1000 * 60 * 60 * 24);
    }
    firstSatDate = 7 - dates.value[0].day; //compute the date of the first Saturday of the given month
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
  console.log(d)
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

  // Calculate dates for weekly view
  if (calendarViewType.value === "Weekly") {
    const startOfWeek = new Date(year, month, day);
    while (dayNames[startOfWeek.getDay()] !== startDay) {
      startOfWeek.setDate(startOfWeek.getDate() - 1);
    }
    for (let i = 0; i < 7; i++) {
      weeklyDates.value.push({
        date: startOfWeek.getDate(),
        day: startOfWeek.getDay(),
      });
      startOfWeek.setDate(startOfWeek.getDate() + 1);
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

// Navigates the calendar based on the view and direction
// view: Monthly, Weekly, Daily
// direction: previous, next
function navigateCalendar(view, direction) {
  console.log(dates.value);
  switch (view) {
    case "Monthly":
      if (direction === "previous") {
        month -= 1;
        if (month < 0) {
          month = 11;
          year -= 1;
        }
      } else {
        month += 1;
        if (month > 11) {
          month = 0;
          year += 1;
        }
      }
      break;
    case "Weekly":
      if (direction === "previous") {
        day -= 7;
        if (day < 1) {
          month -= 1;
          if (month < 0) {
            month = 11;
            year -= 1;
          }
          const lastDayOfPrevMonth = new Date(year, month + 1, 0).getDate();
          day += lastDayOfPrevMonth;
        }
      } else {
        day += 7;
        const lastDayOfCurrentMonth = new Date(year, month + 1, 0).getDate();
        if (day > lastDayOfCurrentMonth) {
          day -= lastDayOfCurrentMonth;
          month += 1;
          if (month > 11) {
            month = 0;
            year += 1;
          }
        }
      }
      break;
    case "Daily":
      if (direction === "previous") {
        day -= 1;
        if (day < 1) {
          month -= 1;
          if (month < 0) {
            month = 11;
            year -= 1;
          }
          day = new Date(year, month + 1, 0).getDate();
        }
      } else {
        day += 1;
        if (day > new Date(year, month + 1, 0).getDate()) {
          day = 1;
          month += 1;
          if (month > 11) {
            month = 0;
            year += 1;
          }
        }
      }
      break;
    default:
      break;
  }

  console.log(year, month, day);

  startDate(new Date(year, month, day));

  console.log("started")
  // updateDates();
  // updateDisplayText(view);
}
</script>

<template>
  <div class="flex flex-row w-full p-2 px-4 justify-between">
    <!-- Dropdown button to change views -->
    <select v-model="calendarViewType" class="select select-sm">
      <option>Monthly</option>
      <option>Weekly</option>
      <option>Daily</option>
    </select>

    <!-- Arrows to navigate back and forth different months -->
    <NextCalendar
      :navigate-calendar="navigateCalendar"
      :view="calendarViewType"
      :display-text="displayText"
    />

    <!-- Add Task Button -->
    <AddTaskModal />
  </div>

  <!-- Render monthly view -->
  <MonthlyView
    v-if="calendarViewType === 'Monthly'"
    :months="months"
    :day-names="dayNames"
    :dates="dates"
    :previous-dates="previousDates"
    :next-dates="nextDates"
    :first-sat-date="firstSatDate"
    :year="year"
    :month="month"
  />

  <!-- Render Weekly view -->
  <WeeklyView
    v-else-if="calendarViewType === 'Weekly'"
    :hours="hours"
    :day-names="dayNames"
    :dates="weeklyDates"
  />

  <!-- Render Daily view -->
  <DailyView v-else-if="calendarViewType === 'Daily'" :hours="hours" />

  <!-- Test for Listing tasks - to remove later -->
  <div
    class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col p-2 w-full"
  >
    <div class="flex bg-gray-200 text-s leading-6 text-gray-700 lg:flex-auto">
      <div
        class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px"
      >
        <div class="relative bg-gray-50 px-3 py-2 text-black">
          <time datetime="2024-5-26">10</time>
          <ol class="mt-2">
            <li>
              <a href="#" class="group flex">
                <p
                  class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"
                >
                  Assignment Due -- Algorithms and Data Structures II
                </p>
                <time
                  datetime="2022-01-03T10:00"
                  class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                  >10AM</time
                >
              </a>
            </li>
            <li>
              <a href="#" class="group flex">
                <p
                  class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600"
                >
                  Assignment Due -- Databases, Networks and the Web
                </p>
                <time
                  datetime="2022-01-03T14:00"
                  class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                  >2PM</time
                >
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <BackendSettings ref="backendSettings" />
</template>

<style scoped>
.title {
  font-family: "Inter";
}
</style>
