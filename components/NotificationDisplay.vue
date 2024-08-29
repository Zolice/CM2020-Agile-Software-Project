<template>
  <div
    role="alert"
    class="alert max-w-md shadow-lg ring-2 ring-base-100 bg-base-300"
  >
    <svg
      v-if="img == ''"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-primary h-6 w-6 shrink-0"
      :class="[
        type == 'warning' ? 'stroke-warning' : '',
        type == 'error' ? 'stroke-error' : '',
      ]"
    >
      <path
        v-if="type == 'info'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <path
        v-if="type == 'warning'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
      <path
        v-if="type == 'error'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <img v-else :src="img" alt="Notification Image" class="h-12 w-12" />

    <div v-if="title == ''">
      <div class="text-wrap text-sm">{{ message }}</div>
    </div>
    <div v-else>
      <h3 class="font-bold">{{ title }}</h3>
      <div class="text-xs text-wrap">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="jsx">
const props = defineProps({
  type: String,
  title: String,
  message: String,
  duration: Number,
  img: String,
});

onMounted(() => {
  setTimeout(() => {}, props.duration);
});
</script>
