<template>
  <!-- Task view on calendar  -->
  <!-- starting for grid area  -->
  <!-- row-start should increase by one for each task of the day  -->
  <div
    style="grid-area: 2/1 / span 1 / span 7"
    class="flex flex-row bg-red-400 rounded-md hover:text-primary my-0.5 cursor-pointer pl-2 pb-1 w-full self-center"
    @click="clickHandler"
  >
    <!-- Left side Priority Border -->
    <!-- Colour will change based on the priority of the task -->
    <!-- content and bottom priority border -->
    <div class="h-full w-full flex-col">
      <!-- content -->
      <div
        class="w-full flex flex-row px-1 justify-between bg-neutral text-neutral-content"
        style="height: 80%"
      >
        <!-- name -->
        <p
          class="flex-auto align-middle"
          :class="[lines == '2' ? 'line-clamp-2' : 'line-clamp-1']"
        >
          {{ task.task.summary }}
        </p>
        <!-- time -->
        <span class="flex-none pl-1">{{ time }}</span>
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
  lines: String,
});

onMounted(() => {
  time.value = new Date(props.task.task.end).toLocaleTimeString().slice(0, 5);
});

function clickHandler() {
  viewTask(props.task.task, props.task.calendar);
}
</script>
