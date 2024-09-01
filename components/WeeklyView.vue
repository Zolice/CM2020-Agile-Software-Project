<template>
  <div
    class="body-container shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col my-2 px-3 w-full"
  >
    <table class="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th class="border border-gray-300 px-4 py-2"></th>
          <th
            v-for="(day, index) in days"
            :key="index"
            class="border border-gray-300 px-4 py-2 bg-accent text-s leading-6 text-black"
          >
            {{ day }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(hour, index) in hours" :key="index">
          <!-- Hours Column -->
          <td
            class="px-4 py-2 border border-gray-300 bg-accent text-s leading-6 text-black"
          >
            <h6>{{ hour }}</h6>
          </td>
          <!-- Task Area Columns for each day -->
          <td
            v-for="day in days"
            :key="day"
            class="px-4 py-2 border border-gray-300"
          >
            <div class="task-area h-full min-h-[60px]">
              TODO: Add tasks here
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const days = [
  "Sun 9",
  "Mon 10",
  "Tues 11",
  "Wed 12",
  "Thurs 13",
  "Fri 14",
  "Sat 15",
];

defineProps({
  hours: Array,
});
</script>
