<script setup lang="jsx">
const toggleLeftSidebar = inject("toggleLeftSidebar");
const toggleRightSidebar = inject("toggleRightSidebar");

const backendSettings = ref(null);
const calendarViewType = ref("Monthly");

const watchRefresh = inject("watchRefresh");

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
const dailyDate = ref({});

const previousDates = ref([]);
const nextDates = ref([]);
let firstSatDate = 0;

// set the default values to be the current date
let year = new Date().getFullYear();
let month = new Date().getMonth();
let day = new Date().getDate();

onMounted(() => {
  // check if device is mobile
  if (/Mobi|Android/i.test(window.navigator.userAgent)) {
    // redirect to m-index
    window.location.href = "/m-index";
  }

  calendarViewType.value =
    localStorage.getItem("calendarViewType") || "Monthly";
  updateDates();
  updateDisplayText(calendarViewType.value);

  // Register callbacks
  watchDate((date) => {
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
    updateDates();
    updateDisplayText(calendarViewType.value);
  });

  // register refresh callback
  watchRefresh(() => {
    updateDates();
    updateDisplayText(calendarViewType.value);
  });
});

watch(calendarViewType, (value) => {
  localStorage.setItem("calendarViewType", value);
  updateDates();
  updateDisplayText(value);

  // refresh();
});

function updateDates() {
  // Assume the value months and year are set
  // Clear all previous values
  weeklyDates.value = [];
  dates.value = [];
  dailyDate.value = {};

  // Get updated calendar list
  const calendar = JSON.parse(localStorage.getItem("calendars")) || {};

  // Get today's date
  const today = new Date(year, month);
  today.setHours(0, 0, 0, 0);

  // get all dates between 1st day and the day before next month
  let d = new Date(year, month);
  if (!!d.getTime() && month <= 11 && month >= 0) {
    //to handle errors if arguments are not valid.
    while (d.getMonth() == month) {
      dates.value.push({
        date: d.getDate(),
        day: d.getDay(),
        raw: d,
        tasks: [],
      });
      d = new Date(d.getTime() + 1000 * 60 * 60 * 24);
    }
    firstSatDate = 7 - dates.value[0].day; //compute the date of the first Saturday of the given month
  } else {
    dates.value.push({}); //push an empty object into the 'dates' array
  }

  const lastDay = dates.value[dates.value.length - 1].raw;
  lastDay.setDate(lastDay.getDate() + 1);

  // for each calendar, if it's to be displayed, parse through all the tasks
  // get list of keys
  const keys = Object.keys(calendar);
  const allTasks = [];

  // get each calendar
  keys.forEach((key) => {
    if (calendar[key].display) {
      const tasks = Object.keys(calendar[key].calendar);
      // get each task
      tasks.forEach((taskKey) => {
        // if the task is overdue, add it to the overdueTasks list
        const task = calendar[key].calendar[taskKey];

        const taskDate = new Date(task.end);
        if (taskDate >= today && taskDate < lastDay) {
          const pushTask = {
            calendar: key,
            task: task,
          };
          allTasks.push(pushTask);
        }
      });
    }
  });

  // sort task base done date
  allTasks.sort((a, b) => new Date(a.task.end) - new Date(b.task.end));

  // for each day, add tasks to the taskList
  dates.value.forEach((day) => {
    const lastDay = new Date(day.raw);
    lastDay.setDate(lastDay.getDate() + 1);
    allTasks.forEach((task) => {
      const taskEndDate = new Date(task.task.end);
      const taskStartDate = new Date(task.task.start);
      if (taskEndDate >= day.raw && taskEndDate < lastDay) {
        day.tasks.push(task);
      } else if (taskStartDate >= day.raw && taskStartDate <= lastDay) {
        day.tasks.push(task);
      }
    });
  });

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
        raw: new Date(startOfWeek),
        tasks: [],
      });
      startOfWeek.setDate(startOfWeek.getDate() + 1);
    }

    // for each day, add tasks to the taskList
    weeklyDates.value.forEach((day) => {
      const lastDay = new Date(day.raw);
      lastDay.setDate(lastDay.getDate() + 1);
      allTasks.forEach((task) => {
        const taskEndDate = new Date(task.task.end);
        const taskStartDate = new Date(task.task.start);
        if (taskEndDate >= day.raw && taskEndDate < lastDay) {
          day.tasks.push(task);
        } else if (taskStartDate >= day.raw && taskStartDate <= lastDay) {
          day.tasks.push(task);
        }
      });
    });

    // For each day, separate tasks by hour
    weeklyDates.value.forEach((day) => {
      day.hours = [];

      for (let i = 0; i < 24; i++) {
        const newTime = new Date(day.raw);
        newTime.setTime(newTime.getTime() + i * 60 * 60 * 1000);
        day.hours.push({
          time: newTime,
          tasks: [],
        });
      }

      // check if the task is within the hour
      day.tasks.forEach((task) => {
        const start = new Date(task.task.start);
        const end = new Date(task.task.end);

        // check if the task is within the hour
        day.hours.forEach((hour) => {
          if (start <= hour.time && end >= hour.time) {
            hour.tasks.push(task);
          }
        });
      });
    });
  }

  // daily view
  if (calendarViewType.value === "Daily") {
    dailyDate.value = {
      date: day,
      day: new Date(year, month, day).getDay(),
      raw: new Date(year, month, day),
      tasks: [],
    };

    allTasks.forEach((task) => {
      const taskEndDate = new Date(task.task.end);
      const taskStartDate = new Date(task.task.start);
      if (taskEndDate >= dailyDate.value.raw && taskEndDate < lastDay) {
        dailyDate.value.tasks.push(task);
      } else if (
        taskStartDate >= dailyDate.value.raw &&
        taskStartDate <= lastDay
      ) {
        dailyDate.value.tasks.push(task);
      }
    });

    // For each props.date, separate tasks by hour
    dailyDate.value.hours = [];

    for (let i = 0; i < 24; i++) {
      const newTime = new Date(dailyDate.value.raw);
      newTime.setTime(newTime.getTime() + i * 60 * 60 * 1000);
      dailyDate.value.hours.push({
        time: newTime,
        tasks: [],
      });
    }

    // check if the task is within the hour
    dailyDate.value.tasks.forEach((task) => {
      const start = new Date(task.task.start);
      const end = new Date(task.task.end);

      // check if the task is within the hour
      dailyDate.value.hours.forEach((hour) => {
        if (start <= hour.time && end >= hour.time) {
          hour.tasks.push(task);
        }
      });
    });
  } else {
    dailyDate.value = {};
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

  startDate(new Date(year, month, day));
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-row w-full p-2 px-4 justify-between items-center">
      <div class="flex gap-2">
        <button class="btn btn-sm btn-ghost" @click="toggleLeftSidebar">
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
        </button>
        <!-- Dropdown button to change views -->
        <select v-model="calendarViewType" class="select select-sm">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select>
      </div>
      <!-- Arrows to navigate back and forth different months -->
      <NextCalendar
        :navigate-calendar="navigateCalendar"
        :view="calendarViewType"
        :display-text="displayText"
      />

      <div class="flex gap-2">
        <!-- Add Task Button -->
        <AddTaskModal />
        <button class="btn btn-sm btn-ghost w-fit" @click="toggleRightSidebar">
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
        </button>
      </div>
    </div>

    <div class="h-full overflow-y-auto">
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
      <DailyView
        v-else-if="calendarViewType === 'Daily'"
        :hours="hours"
        :day-names="dayNames"
        :date="dailyDate"
      />
    </div>
  </div>
  <BackendSettings ref="backendSettings" />
</template>

<style scoped>
.title {
  font-family: "Inter";
}
</style>
