<template>
  <!-- Border shop view -->
  <div
    v-if="mode === 'shop'"
    class="flex flex-col w-fit bg-base-100 border border-neutral cursor-pointer"
    @click="clickHandler"
  >
    <div class="flex items-center align-middle w-32 h-32 overflow-clip">
      <div class="grid grid-rows-1 grid-cols-1 h-full">
        <img class="h-full row-start-1 col-start-1" :src="img" />
        <div class="flex w-full justify-end row-start-1 col-start-1 p-2">
          <span class="badge badge-ghost" :class="[owned ? '' : 'hidden']">
            Owned
          </span>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center w-full py-1">
      <span>{{ name }}</span>
      <span> {{ owned ? "Owned" : points + " Points" }} </span>
    </div>
  </div>

  <!-- Border profile view -->
  <div v-else-if="mode === 'profile'" class="mt-4">
    <img v-if="owned == true" :src="img" :alt="name" class="w-16 h-16 border" />
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
  props.click(item, "border");
}
</script>
