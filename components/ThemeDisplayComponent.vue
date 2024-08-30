<template>
  <div
    class="flex flex-col w-fit bg-base-100 border border-neutral cursor-pointer"
    :data-theme="theme"
    @click="clickHandler"
  >
    <div class="grid grid-rows-2 grid-cols-2 w-32 h-32">
      <div class="bg-primary"></div>
      <div class="bg-secondary flex justify-end p-1">
        <div class="badge badge-ghost" :class="[badge ? '' : 'hidden']">
          {{ badgeContent }} 
        </div>
      </div>
      <div class="bg-accent"></div>
      <div class="bg-neutral"></div>
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
  theme: String,
  points: Number,
  badge: Boolean,
  badgeContent: String,
  message: String,
  click: Function,
  displayType: String,
});

const item = {
  name: props.name,
  theme: props.theme,
  points: props.points,
  owned: props.owned,
};

function clickHandler() {
  props.click(item, "theme");
}
</script>
