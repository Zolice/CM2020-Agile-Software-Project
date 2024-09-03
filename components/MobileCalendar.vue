<template>
  <div class="w-full flex flex-col gap-2 bg-neutral p-4 rounded-btn">
    <div
      class="flex flex-row justify-between items-center text-neutral-content px-1"
    >
      <div class="flex flex-row gap-1 items-center">
        <button class="btn btn-ghost btn-sm text-lg" @click="toggleExpand">
          <i v-if="expanded" class="bi bi-caret-down-fill"></i>
          <i v-else class="bi bi-caret-right-fill"></i>
        </button>
        <span class="font-bold">{{ months[month] }} {{ year }}</span>
      </div>
      <div v-if="expanded" class="flex flex-row gap-2">
        <button class="btn btn-ghost btn-sm px-1" @click="navigateCalendar('previous')">
          <i class="bi bi-caret-left-fill"></i>
        </button>
        <button class="btn btn-ghost btn-sm px-1" @click="navigateCalendar('next')">
          <i class="bi bi-caret-right-fill"></i>
        </button>
      </div>
    </div>
    <div v-if="expanded" class="w-full grid grid-cols-7 py-2">
      <div
        v-for="(day, index) in dayNames"
        :key="index"
        class="text-center font-bold text-primary"
      >
        {{ day.charAt(0) }}
      </div>
    </div>
    <div
      v-if="expanded"
      class="w-full grid grid-cols-7 text-neutral-content gap-y-4"
    >
      <div
        v-for="(date, index) in dates"
        :key="index"
        class="text-center py-[0.25rem] cursor-pointer"
        :class="[
          date.date == currentDate
            ? 'rounded-xl bg-primary text-primary-content'
            : '',
        ]"
        :style="`grid-area: ${
          date.date > firstSatDate
            ? Math.ceil((date.date - firstSatDate) / 7) + 1
            : 1
        }/${date.day + 1}/span 1/span 1`"
        @click="clickDate(date.date)"
      >
        {{ date.date }}
      </div>
    </div>
  </div>

  <BackendSettings ref="backendSettings" />
</template>

<script setup lang="jsx">
const backendSettings = ref(null);

const watchDate = inject("watchDate");
const startDate = inject("startDate");

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

const dates = ref([]);
const firstSatDate = ref(0);
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth());
const currentDate = ref(new Date().getDate());

const expanded = ref(false);

onMounted(() => {
  // register callback
  watchDate((date) => {
    year.value = date.getFullYear();
    month.value = date.getMonth();
    currentDate.value = date.getDate();
    updateDates();
  });

  // fetch expanded from localstorage
  const expand = localStorage.getItem("mobileExpanded");

  if (expand == "true" || expand == null) {
    expanded.value = true;
  } else {
    expanded.value = false;
  }

  updateDates();
});

function clickDate(date) {
  startDate(new Date(year.value, month.value, date));
}

function previous() {
  navigateCalendar("previous");
}

function next() {
  navigateCalendar("next");
}

function toggleExpand() {
  expanded.value = !expanded.value;
  localStorage.setItem("mobileExpanded", expanded.value);
}

function navigateCalendar(direction) {
  if (direction === "previous") {
    month.value -= 1;
    if (month.value < 0) {
      month.value = 11;
      year.value -= 1;
    }
  } else {
    month.value += 1;
    if (month.value > 11) {
      month.value = 0;
      year.value += 1;
    }
  }

  updateDates();
}

// Copied from index.vue
function updateDates() {
  // Assume the value months and year are set
  // Clear the dates array
  dates.value = [];

  let d = new Date(year.value, month.value);
  if (!!d.getTime() && month.value <= 11 && month.value >= 0) {
    //to handle errors if arguments are not valid.
    while (d.getMonth() == month.value) {
      dates.value.push({ date: d.getDate(), day: d.getDay() });
      d = new Date(d.getTime() + 1000 * 60 * 60 * 24);
    }
    firstSatDate.value = 7 - dates.value[0].day; //compute the date of the first Saturday of the given month
  } else {
    dates.value.push({}); //push an empty object into the 'dates' array
  }
}
</script>
