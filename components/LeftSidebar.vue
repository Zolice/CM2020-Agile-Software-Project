<template>
  <!-- Sidebar -->
  <div
    class="transition-all duration-150 bg-base-300 block fixed md:relative h-screen z-10"
    :class="[isSidebarOpen ? 'md:w-[16rem] w-10/12' : 'w-0 collapse']"
  >
    <div class="h-full bg-base-300 w-full flex flex-col align-center">
      <div class="flex justify-between items-center px-4 py-3 h-min">
        <h1 v-if="isSidebarOpen" class="title text-2xl text-center h-fit">
          TASKMASTER
        </h1>
        <button
          class="w-fit text-center text-2xl focus:outline-none h-fit"
          @click="toggleSidebar"
        >
          <span v-if="isSidebarOpen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </span>
        </button>
      </div>
      <div class="flex flex-col px-4 pb-3 h-min">
        <MiniCalendar v-if="windowWidth >= 640" />
      </div>
      <nav
        v-if="isSidebarOpen"
        class="flex-1 px-4 flex flex-col justify-between h-full overflow-auto"
      >
        <!-- Sidebar content here -->
        <div class="flex flex-col">
          <span class="font-bold">Calendars</span>
          <CalendarListItem
            v-for="calendar in calendarList"
            :key="calendar.name"
            :calendar-name="calendar.name"
            :colour="calendar.colour"
            :display="calendar.display"
            :toggle-display-calendar="toggleDisplayCalendar"
          />
          <span v-if="calendarList.length == 0" class="text-primary">
            No calendars found!
          </span>
        </div>
      </nav>
      <!-- Bottom part of the sidebar -->
      <div v-if="isSidebarOpen" class="flex flex-col p-2">
        <div class="divider"></div>
        <div class="flex flex-col gap-1">
          <ShopModal />
          <SettingsModal />
          <ProfileModal />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
const startRefresh = inject("startRefresh");
const watchRefresh = inject("watchRefresh");

const windowWidth = ref(0);

defineProps({
  toggleSidebar: Function,
  isSidebarOpen: Boolean,
});

const calendarList = ref([]);

onMounted(() => {
  // Load the calendar list
  refresh();

  // Register refresh callback
  watchRefresh(refresh);

  // Window width
  windowWidth.value = window.innerWidth;
});

function refresh() {
  calendarList.value = [];

  // Fetch calendar list
  const calendars = JSON.parse(localStorage.getItem("calendars")) || {};

  // Get all keys
  const keys = Object.keys(calendars);

  // For each key, add it to the calendar list
  keys.forEach((key) => {
    calendarList.value.push({
      name: key,
      colour: calendars[key].colour,
      display: calendars[key].display,
    });
  });
}

function toggleDisplayCalendar(calendar, value) {
  // get updated list of calendars
  const calendars = JSON.parse(localStorage.getItem("calendars")) || {};

  // update the display value
  calendars[calendar].display = value;

  // save the updated list of calendars
  localStorage.setItem("calendars", JSON.stringify(calendars));

  // call refresh function
  startRefresh();
}
</script>

<style scoped>
.title {
  font-family: "Inter";
}
</style>
