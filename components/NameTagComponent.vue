<template>
  <div
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
      <span :class="[owned ? 'hidden' : '']"> {{ points }} Points </span>
      <span :class="[owned ? '' : 'hidden']"> {{ message }} </span>
    </div>
  </div>
</template>

<script setup lang="jsx">
const props = defineProps({
  name: String,
  points: Number,
  img: String,
  owned: Boolean,
  message: String,
  click: Function,
});

const item = {
  name: props.name,
  points: props.points,
  img: props.img,
  owned: props.owned,
};

function clickHandler() {
  // console.log(click)
  props.click(item, "nameTag");
}
</script>
