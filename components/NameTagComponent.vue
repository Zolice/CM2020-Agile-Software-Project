<template>
  <!-- Shop name tag view -->
  <div
    v-if="mode === 'shop'"
    class="grid grid-rows-2 grid-flow-row grid-cols-1"
    @click="clickHandler"
  >
    <div class="col-start-1 row-start-1">
      <img class="h-16 w-64" :src="img" />
    </div>
    <div class="flex w-full justify-end p-2 col-start-1 row-start-1">
      <span class="badge badge-ghost" :class="[owned ? '' : 'hidden']">
        Owned
      </span>
    </div>
    <div class="flex flex-col items-center w-full py-1">
      <span>{{ name }}</span>
      <span> {{ owned ? "Owned" : points + " Points" }} </span>
    </div>
  </div>

  <!-- Profile name tag view -->
  <div v-else-if="mode === 'profile'" class="mt-4 relative" @click="clickHandler">
    <img v-if="owned == true" :src="img" :alt="name" class="w-40 h-10" />

    <!-- Checkbox UI for selected badges -->
    <div
      v-if="selected"
      class="absolute top-1 right-1 w-5 h-5 bg-gray-200 border rounded flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-gray-900"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="jsx">
const props = defineProps({
  name: String,
  points: Number,
  img: String,
  owned: Boolean,
  click: Function,
  mode: String,
  item: Object,
  selected: Boolean,
});

function clickHandler() {
  props.click(props.item, "nameTag");
}
</script>
