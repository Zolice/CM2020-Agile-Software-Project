<template>
  <div
    class="lg:flex lg:flex-auto lg:flex-col py-2 px-3 w-full"
  >
    <table class="table-auto w-full border-b border-accent-content">
      <tbody>
        <tr v-for="(hour, index) in hours" :key="index">
          <!-- Hours Column -->
          <td
            class="px-4 py-2 w-[10%] text-sm leading-6 bg-accent text-accent-content"
          >
            <h6 class="w-max">{{ hour }}</h6>
          </td>
          <!-- Task Area Column -->
          <td class="px-4 py-2 w-[90%] border border-base-content">
            <div class="text-base-content h-full">TODO: Add tasks here</div>
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
