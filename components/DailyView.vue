<template>
  <div class="grid w-full" style="grid-template-columns: auto 1fr">
    <!-- Time -->
    <div
      v-for="(hour, index) in hours"
      :key="hour"
      class="bg-accent text-accent-content px-4 py-2 text-center items-center"
      :style="`grid-row: ${index + 2};`"
    >
      {{ hour }}
    </div>

    <!-- Evnts -->
    <template v-for="hour in date.hours">
      <div
        v-for="task in hour.tasks"
        :key="task.uid"
        class="h-fit"
        :style="`grid-row: ${date.hours.indexOf(hour) + 2}; grid-column: 2;`"
      >
        <DailyCalendarTask :task="task" lines="2" />
      </div>
    </template>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  hours: Array,
  dayNames: Array,
  date: Object,
});
</script>
