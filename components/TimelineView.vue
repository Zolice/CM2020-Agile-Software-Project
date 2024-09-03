<template>
  <div class="flex flex-col gap-2 h-fit">
    <div v-for="days in taskList" :key="days" class="flex flex-col gap-1">
      <span class="text-lg">{{ days.day.toDateString() }}</span>
      <TaskDisplay
        v-for="task in days.tasks"
        :key="task"
        :name="task.task.summary"
        :due-date="new Date(task.task.end).toLocaleString()"
        colour="red"
        :description="task.task.description"
        :task="task.task"
        :calendar="task.calendar"
      />
      <span v-if="days.tasks.length == 0" class="text-xs pl-1">No tasks.</span>
    </div>
  </div>
</template>

<script setup lang="jsx">
const watchRefresh = inject("watchRefresh");

const watchDate = inject("watchDate");

const taskList = ref([]);

const props = defineProps({
  watchDate: String,
})

const currentDate = ref(new Date());

onMounted(() => {
  refresh();

  // register refresh callback
  watchRefresh(refresh);

  console.log(props.watchDate)
  if(props.watchDate == "true") {
    watchDate((date) => {
      console.log("watch")
      console.log(date)
      currentDate.value = date;
      refresh();
    });
  }
});

function refresh() {
  // clear all previous values
  taskList.value = [];

  // Get updated calendar list
  const calendar = JSON.parse(localStorage.getItem("calendars")) || {};

  // get today's date
  const today = currentDate.value;
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
          const pushTask = {
            calendar: key,
            task: task,
          };
          allTasks.push(pushTask);
        }
      });
    }
  });

  // sort task base don date
  allTasks.sort((a, b) => new Date(a.task.end) - new Date(b.task.end));

  // for each day, add tasks to the taskList
  taskList.value.forEach((day) => {
    const lastDay = new Date(day.day);
    lastDay.setDate(lastDay.getDate() + 1);
    allTasks.forEach((task) => {
      const taskDate = new Date(task.task.end);
      if (taskDate >= day.day && taskDate < lastDay) {
        day.tasks.push(task);
      }
    });
  });
}
</script>
