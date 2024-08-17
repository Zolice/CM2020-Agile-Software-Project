<script setup>
var months = [
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
var dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
var dates = ref([]);
var firstSatDate = "";
// set the default values to be the current date
var year = new Date().getFullYear();
var month = new Date().getMonth();

var d = new Date(year, month);
if (!!d.getTime() && month <= 11 && month >= 0) {
  //to handle errors if arguments are not valid.
  while (d.getMonth() == month) {
    dates.value.push({ date: d.getDate(), day: d.getDay() });
    d = new Date(d.getTime() + 1000 * 60 * 60 * 24);
  }
  firstSatDate = 7 - dates.value[0].day; //compute the date of the first Saturday of the given month
} else {
  dates.value.push({}); //push an empty object into the 'dates' array
}

//Sample logic for previous month button
function previousMonth() {
  // Using current month, reduce it by 1 month
  month -= 1;
  // If the month is less than 0, set it to 11 (December) and reduce the year by 1
  if (month < 0) {
    month = 11;
    year -= 1;
  }

  // Clear the dates array
  dates.value = [];

  var d = new Date(year, month);
  if (!!d.getTime() && month <= 11 && month >= 0) {
    //to handle errors if arguments are not valid.
    while (d.getMonth() == month) {
      dates.value.push({ date: d.getDate(), day: d.getDay() });
      d = new Date(d.getTime() + 1000 * 60 * 60 * 24);
    }
    firstSatDate = 7 - dates.value[0].day; //compute the date of the first Saturday of the given month
  } else {
    dates.value.push({}); //push an empty object into the 'dates' array
  }
}

//Sample logic for next month button
function nextMonth(month, year) {
  if (month == 11) {
    this.month = 0;
    this.year += 1;
    console.log(month, year);
  } else {
    this.month += 1;
    console.log(month, year);
  }
}
</script>

<template>
  <div class="flex flex-row w-full p-2 px-4 justify-between">
    <!-- Monthly view dropdown button -->
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdownView"
      class="btn bg-white bg-opacity-50 font-medium rounded-lg text-sm px-4 py-0.5 h-10 text-center flewc items-center outline outline-1"
      type="button"
    >
      Monthly
      <svg
        class="w-2.5 h-1.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      id="dropdownView"
      class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Weekly</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Daily</a
          >
        </li>
      </ul>
    </div>

    <div class="flex flex-row items-center space-x-2 justify-center mx-2">
      <!-- Calendar Previous Month Button -->
      <button
        class="btn font-medium rounded-lg text-sm px-3 py-0.5 h-10 text-center inline-flex items-center"
        type="button"
        @click="previousMonth"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <!-- Calendar Month name -->
      <h1 class="text-lg">
        {{ months[month] + " " + year }}
      </h1>

      <!-- Calendar Next Month Button -->
      <button
        class="btn font-medium rounded-lg text-md px-3 py-0.5 h-10 text-center inline-flex items-center"
        type="button"
        @click="nextMonth(month, year)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
    <!-- Add Task Button -->
    <button
      class="btn bg-white bg-opacity-50 outline outline-1 rounded-lg font-medium text-sm"
      type="button"
    >
      Add Task
    </button>
  </div>

  <div
    class="body-container shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col my-2 px-3 w-full"
  >
    <!-- Day Names -->
    <div
      class="dayNames-container grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-s leading-6 text-black"
    >
      <div
        v-for="dayName in dayNames"
        :class="[
          'dayName text-center font-semibold bg-accent bg-opacity-50 py-2 lg:flex-none',
          dayName,
        ]"
        :key="year + '-' + months[month] + '-' + dayName"
      >
        <h5>{{ dayName }}</h5>
      </div>
    </div>
    <!-- Dates -->
    <div class="dates-container grid grid-cols-7 gap-px">
      <div
        v-for="date in dates"
        :class="[
          'date relative bg-gray-50 px-3 py-2 text-black w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px',
          dayNames[date.day],
        ]"
        :key="year + '-' + months[month] + '-' + date.date"
        :id="year + '-' + month + '-' + date.date"
        :style="`grid-area: ${
          date.date > firstSatDate
            ? Math.ceil((date.date - firstSatDate) / 7) + 1
            : 1
        }/${date.day + 1}/span 1/span 1`"
      >
        {{ date.date }}
      </div>
    </div>
  </div>

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
</template>

<style scoped>
.title {
  font-family: "Inter";
}
</style>
