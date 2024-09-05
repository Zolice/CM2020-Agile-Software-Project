<template>
  <!-- Task view on calendar  -->
  <!-- starting for grid area  -->
  <!-- row-start should increase by one for each task of the day  -->
  <div
    style="grid-area: 2/1 / span 1 / span 7"
    class="flex flex-row bg-neutral text-neutral-content rounded-md hover:text-primary my-0.5 cursor-pointer"
    @click="clickHandler"
  >
    <!-- Left side Priority Border -->
    <!-- Colour will change based on the priority of the task -->
    <div class="bg-red-400 h-full rounded-l-md" style="width: 4%"></div>
    <!-- content and bottom priority border -->
    <div class="h-full flex-col" style="width: 96%">
      <!-- content -->
      <div
        class="w-full flex flex-row px-1 justify-between"
        style="height: 80%"
      >
        <!-- name -->
        <p class="flex-auto line-clamp-1 text-sm align-middle">
          {{ task.task.summary }}
        </p>
        <!-- time -->
        <span class="flex-none text-sm">{{ time }}</span>
      </div>
      <!-- Bottom border -->
      <div class="w-full bg-red-400 rounded-br-md" style="height: 20%"></div>
    </div>
  </div>
</template>

<script setup lang="jsx">
const viewTask = inject("viewTask");

const time = ref("");

const props = defineProps({
  task: Object,
  calendar: String,
});

onMounted(() => {
  time.value = new Date(props.task.task.end).toLocaleTimeString().slice(0, 5);
});

function clickHandler() {
  viewTask(props.task.task, props.task.calendar);
}
</script>
