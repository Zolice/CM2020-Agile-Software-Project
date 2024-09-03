<template>
  <div
    class="lg:flex lg:flex-auto lg:flex-col py-2 px-3 w-full"
  >
    <table class="table-fixed w-full border-collapse">
      <thead>
        <tr>
          <!-- Empty top-left cell -->
          <th class="bg-accent px-4 py-2 w-min"></th>
          <!-- Day and Date Headers -->
          <th
            v-for="(day, index) in dates"
            :key="index"
            class="px-4 py-2 bg-accent text-s leading-6 text-black"
          >
            {{ dayNames[day.day] }}
            <br />
            {{ day.date }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hour, index) in hours" :key="index">
          <!-- Hours Column -->
          <td
            class="px-4 py-2 border-black bg-accent text-s leading-6 text-black w-min"
          >
            <h6 class="w-fit">{{ hour }}</h6>
          </td>
          <!-- Task Area Columns for each day -->
          <td
            v-for="dayName in dayNames"
            :key="dayName"
            class="px-4 py-2 border border-base-content"
          >
            <div class="task-area h-full min-h-[60px]">
              <!-- TODO: Add tasks here -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  hours: Array,
  dayNames: Array,
  dates: Array,
});
</script>
