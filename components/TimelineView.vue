<template>
  <div class="flex flex-col gap-2 h-fit">
    <div v-for="days in taskList" :key="days" class="flex flex-col gap-1">
      <span class="text-lg">{{ days.day.toDateString() }}</span>
      <TaskDisplay
        v-for="task in days.tasks"
        :key="task"
        :name="task.summary"
        :due-date="new Date(task.end).toLocaleString()"
        colour="red"
        :description="task.description"
      />
      <span v-if="days.tasks.length == 0" class="text-xs">No tasks</span>
    </div>
  </div>
</template>

<script setup lang="jsx">
const watchRefresh = inject("watchRefresh");

const taskList = ref([]);

onMounted(() => {
  refresh();

  // register refresh callback
  watchRefresh(refresh);
});

function refresh() {
  // clear all previous values
  taskList.value = [];

  // Get updated calendar list
  const calendar = JSON.parse(localStorage.getItem("calendars")) || {};

  // get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // get total 7 days added to the taskList
  for (let i = 0; i < 14; i++) {
    const day = new Date(today);
    day.setDate(day.getDate() + i);
    const tasks = [];
    taskList.value.push({ day: day, tasks: tasks });
  }

  const lastDay = taskList.value[13].day;
  lastDay.setDate(lastDay.getDate() + 1);

  // for each calendar, if it's to be displayed, parse through all the tasks
  // get list of keys
  const keys = Object.keys(calendar);

  const allTasks = [];

  // get each calendar
  keys.forEach((key) => {
    if (calendar[key].display) {
      const tasks = Object.keys(calendar[key].calendar);
      // get each task
      tasks.forEach((taskKey) => {
        // if the task is overdue, add it to the overdueTasks list
        const task = calendar[key].calendar[taskKey];

        const taskDate = new Date(task.end);
        if (taskDate >= today && taskDate < lastDay) {
          allTasks.push(task);
        }
      });
    }
  });

  // sort task base don date
  allTasks.sort((a, b) => new Date(a.end) - new Date(b.end));

  // for each day, add tasks to the taskList
  taskList.value.forEach((day) => {
    const lastDay = new Date(day.day);
    lastDay.setDate(lastDay.getDate() + 1);
    allTasks.forEach((task) => {
      const taskDate = new Date(task.end);
      if (taskDate >= day.day && taskDate < lastDay) {
        day.tasks.push(task);
      }
    });
  });
}
</script>
