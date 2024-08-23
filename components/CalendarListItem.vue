<template>
  <div class="flex items-center gap-2">
    <!-- <input type="checkbox" v-model="checked" :class="classValue" /> -->
    <input
      v-model="displayCheck"
      type="checkbox"
      :style="styleValue"
      @click="toggleDisplayCalendarCall"
    />
    <span class="grow">{{ calendarName }}</span>
    <button class="btn btn-ghost btn-sm p-2 bi bi-pencil"></button>
  </div>
</template>

<script setup lang="jsx">
const displayCheck = ref(false);
const styleValue = ref("");

const props = defineProps({
  calendarName: String,
  colour: String,
  display: Boolean,
  toggleDisplayCalendar: Function,
});

onMounted(() => {
  styleValue.value = `accent-color: ${props.colour}`;
  displayCheck.value = props.display;
});

function toggleDisplayCalendarCall() {
  props.toggleDisplayCalendar(props.calendarName, !displayCheck.value);
}
</script>
