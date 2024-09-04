<template>
  <div class="grid grid-cols-8 grid-rows-25 w-full h-fit align-middle">
    <div class="bg-accent text-accent-content px-4 py-2"></div>
    <!-- Day and Date -->
    <div
      v-for="day in dates"
      :key="day"
      class="bg-accent text-accent-content px-4 py-2 text-center items-center"
    >
      {{ dayNames[day.day] }}
      <br />
      {{ day.date }}
    </div>

    <!-- Hours -->
    <div
      v-for="(hour, index) in hours"
      :key="hour"
      class="bg-accent text-accent-content px-4 py-2 text-center items-center"
      :style="`grid-row: ${index + 2};`"
    >
      {{ hour }}
    </div>

    <!-- For each day, for each event -->
    <template v-for="date in dates">
      <template v-for="hour in date.hours">
        <div
          v-for="task in hour.tasks"
          :key="task.uid"
          class="h-fit"
          :style="`grid-row: ${date.hours.indexOf(hour) + 2}; grid-column: ${date.day + 1};`"
        >
          <DailyCalendarTask :task="task" lines="2"/>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  hours: Array,
  dayNames: Array,
  dates: Array,
});
</script>
