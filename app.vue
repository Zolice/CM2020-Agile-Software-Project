<template>
  <div class="flex h-screen bg-base-200" :data-theme="theme">
    <LeftSidebar
      :toggle-sidebar="toggleLeftSidebar"
      :is-sidebar-open="isLeftSidebarOpen"
    />

    <!-- Main content -->
    <div class="flex-1 flex flex-col h-screen">
      <!-- Move these buttons to each NuxtPage respectively -->
      <div class="flex justify-between p-2 bg-base-200">
        <button
          class="btn btn-secondary btn-md w-fit"
          @click="toggleLeftSidebar"
        >
          Left Sidebar
        </button>

        <label class="input input-bordered flex items-center gap-2">
          Theme
          <input v-model="theme" type="text" class="grow" placeholder="Theme" />
        </label>

        <button
          class="btn btn-secondary btn-md w-fit"
          @click="toggleRightSidebar"
        >
          Right Sidebar
        </button>
      </div>

      <!-- Display the page -->
      <div class="h-fit overflow-auto">
        <NuxtPage />
      </div>
    </div>

    <RightSidebar
      :toggle-sidebar="toggleRightSidebar"
      :is-sidebar-open="isRightSidebarOpen"
    />
  </div>
</template>

<script setup lang="jsx">
import { ref } from "vue";

const theme = ref("dark");
const isLeftSidebarOpen = ref(true);
const isRightSidebarOpen = ref(true);

onMounted(() => {
  theme.value = localStorage.getItem("theme") || "dark";
});

function toggleLeftSidebar() {
  isLeftSidebarOpen.value = !isLeftSidebarOpen.value;
}

function toggleRightSidebar() {
  isRightSidebarOpen.value = !isRightSidebarOpen.value;
}

watch(theme, (newTheme) => {
  localStorage.setItem("theme", newTheme);
});
</script>
