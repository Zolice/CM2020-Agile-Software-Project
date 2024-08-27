<template>
  <div class="flex flex-col gap-2 h-fit">
    <div class="flex flex-col gap-1">
      <span class="text-lg">Overdue</span>
      <TaskDisplay
        v-for="task in overdueTasks"
        :key="task"
        :name="task.summary"
        :due-date="new Date(task.end).toLocaleString()"
        colour="red"
        :description="task.description"
      />
      <span v-if="overdueTasks.length == 0" class="text-xs">No tasks</span>
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-lg">Today's Tasks</span>
      <TaskDisplay
        v-for="task in todayTasks"
        :key="task"
        :name="task.summary"
        :due-date="new Date(task.end).toLocaleString()"
        colour="red"
        :description="task.description"
      />
      <span v-if="todayTasks.length == 0" class="text-xs">No tasks</span>
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-lg">Upcoming</span>
      <TaskDisplay
        v-for="task in upcomingTasks"
        :key="task"
        :name="task.summary"
        :due-date="new Date(task.end).toLocaleString()"
        colour="green"
        :description="task.description"
      />
      <span v-if="upcomingTasks.length == 0" class="text-xs">No tasks</span>
    </div>
  </div>
</template>

<script setup lang="jsx">
const watchRefresh = inject("watchRefresh");

const overdueTasks = ref([]);
const todayTasks = ref([]);
const upcomingTasks = ref([]);

onMounted(() => {
  refresh();

  // register refresh callback
  watchRefresh(refresh)
});

function refresh() {
  // clear all previous values
  overdueTasks.value = [];
  todayTasks.value = [];
  upcomingTasks.value = [];

  // Get updated calendar list
  let calendar = JSON.parse(localStorage.getItem("calendars")) || {};

  // get today's date
  let today = new Date();
  console.log(today);

  // for each calendar, if it's to be displayed, parse through all the tasks
  // get list of keys
  let keys = Object.keys(calendar);

  // get each calendar
  keys.forEach((key) => {
    if (calendar[key].display) {
      let tasks = Object.keys(calendar[key].calendar);
      // get each task
      tasks.forEach((taskKey) => {
        // if the task is overdue, add it to the overdueTasks list
        let task = calendar[key].calendar[taskKey];

        let taskDate = new Date(task.end);
        if (taskDate < today) {
          overdueTasks.value.push(task);
        }
        // if the task is due today, add it to the todayTasks list
        else if (taskDate == today) {
          todayTasks.value.push(task);
        }
        // if the task is upcoming, add it to the upcomingTasks list
        else {
          upcomingTasks.value.push(task);
        }
      });
    }
  });

  // for each task list, sort by date
  overdueTasks.value.sort((a, b) => new Date(a.end) - new Date(b.end));
  todayTasks.value.sort((a, b) => new Date(a.end) - new Date(b.end));
  upcomingTasks.value.sort((a, b) => new Date(a.end) - new Date(b.end));
}
</script>
