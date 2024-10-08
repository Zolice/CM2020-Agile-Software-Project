<template>
  <div class="flex flex-col gap-2 h-fit">
    <div class="flex flex-col gap-1">
      <span class="text-lg">Overdue</span>
      <TaskDisplay
        v-for="task in overdueTasks"
        :key="task"
        :name="task.task.summary"
        :due-date="new Date(task.task.end).toLocaleString()"
        colour="red"
        :description="task.task.description"
        :task="task.task"
        :calendar="task.calendar"
      />
      <span v-if="overdueTasks.length == 0" class="text-xs pl-1">No overdue tasks!</span>
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-lg">Today's Tasks</span>
      <TaskDisplay
        v-for="task in todayTasks"
        :key="task"
        :name="task.task.summary"
        :due-date="new Date(task.task.end).toLocaleString()"
        colour="red"
        :description="task.task.description"
        :task="task.task"
        :calendar="task.calendar"
      />
      <span v-if="todayTasks.length == 0" class="text-xs pl-1">No tasks for today.</span>
    </div>
    <div class="flex flex-col gap-1">
      <span class="text-lg">Upcoming</span>
      <TaskDisplay
        v-for="task in upcomingTasks"
        :key="task"
        :name="task.task.summary"
        :due-date="new Date(task.task.end).toLocaleString()"
        colour="green"
        :description="task.task.description"
        :task="task.task"
        :calendar="task.calendar"
      />
      <span v-if="upcomingTasks.length == 0" class="text-xs pl-1">No upcoming tasks.</span>
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
  const calendar = JSON.parse(localStorage.getItem("calendars")) || {};

  // get today's date
  const today = new Date();

  // for each calendar, if it's to be displayed, parse through all the tasks
  // get list of keys
  const keys = Object.keys(calendar);

  // get each calendar
  keys.forEach((key) => {
    if (calendar[key].display) {
      const tasks = Object.keys(calendar[key].calendar);
      // get each task
      tasks.forEach((taskKey) => {
        // if the task is overdue, add it to the overdueTasks list
        const task = calendar[key].calendar[taskKey];

        const taskDate = new Date(task.end);
        if (taskDate < today) {
          const pushTask = {
            calendar: key,
            task: task,
          }
          overdueTasks.value.push(pushTask);
        }
        // if the task is due today, add it to the todayTasks list
        else if (taskDate == today) {
          const pushTask = {
            calendar: key,
            task: task,
          }
          todayTasks.value.push(pushTask);
        }
        // if the task is upcoming, add it to the upcomingTasks list
        else {
          const pushTask = {
            calendar: key,
            task: task,
          }
          upcomingTasks.value.push(pushTask);
        }
      });
    }
  });

  // for each task list, sort by date
  overdueTasks.value.sort((a, b) => new Date(a.task.end) - new Date(b.task.end));
  todayTasks.value.sort((a, b) => new Date(a.task.end) - new Date(b.task.end));
  upcomingTasks.value.sort((a, b) => new Date(a.task.end) - new Date(b.task.end));
}
</script>
