<template>
  <div
    class="body-container shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col my-2 px-3 w-full"
  >
    <table class="table-auto w-full border-collapse">
      <thead>
        <tr>
          <!-- Empty top-left cell -->
          <th class="border border-gray-300 px-4 py-2"></th>
          <!-- Day and Date Headers -->
          <th
            v-for="(day, index) in dates"
            :key="index"
            class="border border-gray-300 px-4 py-2 bg-accent text-s leading-6 text-black"
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
            class="px-4 py-2 w-[10%] border-black bg-accent text-s leading-6 text-black"
          >
            <h6>{{ hour }}</h6>
          </td>
          <!-- Task Area Columns for each day -->
          <td
            v-for="dayName in dayNames"
            :key="dayName"
            class="px-4 py-2 border border-gray-300"
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
