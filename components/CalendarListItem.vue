<template>
  <div class="flex items-center gap-2">
    <!-- <input type="checkbox" v-model="checked" :class="classValue" /> -->
    <input
      type="checkbox"
      :style="styleValue"
      v-model="displayCheck"
      @click="toggleDisplayCalendarCall"
    />
    <!-- <input
      type="checkbox"
      v-model="checked"
      :style="{ backgroundColor: colour }"
      class="checkbox border-2"
    /> -->
    <span class="grow">{{ calendarName }}</span>
    <button class="btn btn-ghost btn-sm p-2 bi bi-pencil"></button>
  </div>
</template>

<script setup lang="jsx">
// const checked = ref(true);
const displayCheck = ref(false);

const classValue = ref(
  "checkbox border-2 [--chkbg:#de744e] [--chkfg:#ffffff] checked:#de744e"
);

const styleValue = ref("");

const props = defineProps({
  calendarName: String,
  colour: String,
  display: Boolean,
  toggleDisplayCalendar: Function,
});

onMounted(() => {
  updateClassValue(props.colour);
  displayCheck.value = props.display;
  console.log(props.display);
});

function updateClassValue(colour = "#000000") {
  console.log(colour);
  classValue.value = `checkbox border-2 [--chkbg:${colour}] [--chkfg:#ffffff] checked:${colour}`;
  console.log(classValue.value);
  styleValue.value = `accent-color: ${colour}`;
  console.log(styleValue.value);
}

function toggleDisplayCalendarCall() {
  props.toggleDisplayCalendar(props.calendarName, !displayCheck.value);
  console.log(!displayCheck.value)
  console.log("called success")
}
</script>
