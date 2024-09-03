<template>
  <div class="lg:flex lg:flex-auto lg:flex-col py-2 w-full h-full px-4">
    <!-- Day Names -->
    <div class="grid grid-cols-7 leading-6 text-accent-content">
      <div
        v-for="dayName in dayNames"
        :key="year + '-' + months[month] + '-' + dayName"
        class="text-center font-semibold bg-accent py-2 lg:flex-none"
      >
        <h5>{{ dayName }}</h5>
      </div>
    </div>
    <!-- Dates -->
    <div class="grid grid-cols-7 h-full">
      <div
        v-for="date in previousDates"
        :id="year + '-' + month + '-' + date.date"
        :key="year + '-' + months[month] + '-' + date.date"
        class="relative bg-base-200 px-2 py-2 w-full flex flex-col h-full"
        :style="`grid-area: 1/${date.day + 1}/span 1/span 1`"
      >
        {{ date.date }}
      </div>
      <div
        v-for="date in dates"
        :id="year + '-' + month + '-' + date.date"
        :key="year + '-' + months[month] + '-' + date.date"
        class="relative bg-base-100 px-2 py-2 w-full flex flex-col h-full"
        :style="`grid-area: ${
          date.date > firstSatDate
            ? Math.ceil((date.date - firstSatDate) / 7) + 1
            : 1
        }/${date.day + 1}/span 1/span 1`"
      >
        {{ date.date }}

        <!-- Display the tasks -->
        <CalendarTask :calendar="calendar" />
      </div>
      <div
        v-for="date in nextDates"
        :id="year + '-' + month + '-' + date.date"
        :key="year + '-' + months[month] + '-' + date.date"
        class="relative bg-base-200 px-2 py-2 w-full flex flex-col h-full"
        :style="`grid-area: ${Math.ceil((31 - firstSatDate) / 7) + 1}
        /${date.day + 1}/span 1/span 1`"
      >
        {{ date.date }}
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  months: Array,
  dayNames: Array,
  dates: Array,
  previousDates: Array,
  nextDates: Array,
  firstSatDate: Number,
  year: Number,
  month: Number,
});
</script>
