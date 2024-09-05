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
  <div v-else-if="mode === 'profile'" class="mt-4">
    <div class="flex flex-wrap gap-2">
      <img v-if="owned == true" :src="img" :alt="name" class="w-40 h-10" />
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
});

const item = {
  name: props.name,
  points: props.points,
  img: props.img,
  owned: props.owned,
};

function clickHandler() {
  props.click(item, "nameTag");
}
</script>
