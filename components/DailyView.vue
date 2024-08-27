<template>
  <div
    class="body-container shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col my-2 px-3 w-full"
  >
    <table class="table-auto w-full border-b border-black">
      <tbody>
        <tr v-for="hour in hours">
          <!-- Hours Column -->
          <td
            class="px-4 py-2 w-[10%] border-black bg-gray-200 text-s leading-6 text-black"
          >
            <h6>{{ hour }}</h6>
          </td>
          <!-- Task Area Column -->
          <td class="px-4 py-2 w-[90%] border-b border-gray-300">
            <div class="task-area h-full">TODO: Add tasks here</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  hours: Array,
});
</script>
