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
const taskList = ref([]);

onMounted(() => {
  refresh();
});

function refresh() {
  // Get updated calendar list
  let calendar = JSON.parse(localStorage.getItem("calendars")) || {};

  // get today's date
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log(today);

  // get total 7 days added to the taskList
  for (let i = 0; i < 14; i++) {
    let day = new Date(today);
    day.setDate(day.getDate() + i);
    console.log(day.toDateString());
    let tasks = [];
    taskList.value.push({ day: day, tasks: tasks });
  }

  let lastDay = taskList.value[13].day;
  lastDay.setDate(lastDay.getDate() + 1);

  // for each calendar, if it's to be displayed, parse through all the tasks
  // get list of keys
  let keys = Object.keys(calendar);

  let allTasks = [];

  // get each calendar
  keys.forEach((key) => {
    if (calendar[key].display) {
      let tasks = Object.keys(calendar[key].calendar);
      // get each task
      tasks.forEach((taskKey) => {
        // if the task is overdue, add it to the overdueTasks list
        let task = calendar[key].calendar[taskKey];

        let taskDate = new Date(task.end);
        console.log(taskDate);
        console.log(taskDate >= today);
        console.log(taskDate < lastDay);
        if (taskDate >= today && taskDate < lastDay) {
          console.log(task);
          allTasks.push(task);
        }
      });
    }
  });

  console.log(allTasks);

  // for each task list, sort by date
  // overdueTasks.value.sort((a, b) => new Date(a.end) - new Date(b.end));
  // todayTasks.value.sort((a, b) => new Date(a.end) - new Date(b.end));
  // upcomingTasks.value.sort((a, b) => new Date(a.end) - new Date(b.end));

  // sort task base don date
  allTasks.sort((a, b) => new Date(a.end) - new Date(b.end));
  console.log(allTasks);
  console.log(allTasks.length);

  // for each day, add tasks to the taskList
  taskList.value.forEach((day) => {
    let lastDay = new Date(day.day);
    lastDay.setDate(lastDay.getDate() + 1);
    allTasks.forEach((task) => {
      let taskDate = new Date(task.end);
      if (taskDate >= day.day && taskDate < lastDay) {
        day.tasks.push(task);
      }
    });
  });

  console.log(taskList.value);
}
</script>
