<template>
  <div class="w-full flex flex-col gap-2">
    <div class="flex flex-row justify-between items-center">
      <span>{{ months[month] }} {{ year }}</span>
      <div class="flex flex-row gap-1">
      <button class="btn btn-ghost btn-xs px-1">Up</button>
      <button class="btn btn-ghost btn-xs px-1">Up</button>
    </div>
    </div>
    <div class="w-full grid grid-cols-7">
      <div
        v-for="(day, index) in dayNames"
        :key="index"
        class="text-center font-bold text-primary py-[0.25rem]"
      >
        {{ day.charAt(0) }}
      </div>
    </div>
    <div class="w-full grid grid-cols-7">
      <!-- <div
        v-for="(date, index) in previousDates"
        :key="index"
        class="text-center text-gray-600"
        :style="`grid-area: ${
          date.date > firstSatDate
            ? Math.ceil((date.date - firstSatDate) / 7) + 1
            : 1
        }/${date.day + 1}/span 1/span 1`"
      >
        {{ date.date }}
      </div> -->
      <div
        v-for="(date, index) in dates"
        :key="index"
        class="text-center py-[0.25rem]"
        :style="`grid-area: ${
          date.date > firstSatDate
            ? Math.ceil((date.date - firstSatDate) / 7) + 1
            : 1
        }/${date.day + 1}/span 1/span 1`"
      >
        {{ date.date }}
      </div>
      <!-- <div
        v-for="(date, index) in nextDates"
        :key="index"
        class="text-center text-gray-600"
        :style="`grid-area: ${
          date.date > firstSatDate
            ? Math.ceil((date.date - firstSatDate) / 7) + 1
            : 1
        }/${date.day + 1}/span 1/span 1`"
      >
        {{ date.date }}
      </div> -->
    </div>
  </div>

  <BackendSettings ref="backendSettings" />
</template>

<script setup lang="jsx">
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

const dates = ref([]);
const previousDates = ref([]);
const nextDates = ref([]);
const firstSatDate = ref(0);
const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth());
// const month = ref(8);
const day = ref(new Date().getDate());

const backendSettings = ref(null);

onMounted(() => {
  updateDates();
  console.log(dates.value);
  console.log(previousDates.value);
  console.log(nextDates.value);
});

// Copied from index.vue
function updateDates() {
  // Assume the value months and year are set
  // Clear the dates array
  dates.value = [];

  let d = new Date(year.value, month.value);
  console.log(d);
  console.log(!!d.getTime());
  if (!!d.getTime() && month.value <= 11 && month.value >= 0) {
    console.log("1");
    //to handle errors if arguments are not valid.
    while (d.getMonth() == month.value) {
      console.log("2");
      dates.value.push({ date: d.getDate(), day: d.getDay() });
      d = new Date(d.getTime() + 1000 * 60 * 60 * 24);
    }
    firstSatDate.value = 7 - dates.value[0].day; //compute the date of the first Saturday of the given month
  } else {
    dates.value.push({}); //push an empty object into the 'dates' array
  }

  // Check which day the first day of the month falls on
  // If not the start of the week, add the previous month's dates
  // Get the start day from settings
  const settings = backendSettings.value.getSettings();
  const startDay = settings.startWeekOn.substring(0, 3).toUpperCase() || "SUN";
  console.log(startDay);

  console.log(year.value, month.value);
  d = new Date(year.value, month.value);
  console.log(d);
  console.log(d.getDay());
  previousDates.value = [];
  if (startDay != dayNames[d.getDay()]) {
    console.log("3");
    // loop until all added
    do {
      console.log("4");
      d = new Date(d.getTime() - 1000 * 60 * 60 * 24);
      previousDates.value.push({
        date: d.getDate(),
        day: d.getDay(),
      });
      console.log(d);
      console.log(dayNames[d.getDay()]);
    } while (startDay !== dayNames[d.getDay()]);
  }

  // sort previousdate
  previousDates.value.sort((a, b) => new Date(a.date) - new Date(b.date));

  // If the last day of the month is not the end of the week, add the next month's dates
  d = new Date(year.value, month.value + 1, 0);
  console.log(d);
  nextDates.value = [];
  if (dayNames[d.getDay()] !== startDay) {
    console.log(d);
    d = new Date(year.value, month.value + 1, 0);
    while (dayNames[d.getDay()] !== startDay) {
      console.log("6");
      nextDates.value.push({
        date: d.getDate(),
        day: d.getDay(),
      });
      d = new Date(d.getTime() + 1000 * 60 * 60 * 24);
    }
  }
}
</script>
