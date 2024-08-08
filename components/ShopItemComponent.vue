<template>
  <div
    class="flex flex-col w-fit bg-base-100 border border-neutral"
  >
    <div class="flex items-center align-middle w-max min-w-32 h-32 overflow-clip">
      <img class="w-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlROcXWBsxzaZwXERUSfV6eD92_-KLFAvjbg&s"
      />
    </div>
    <span class="w-full text-center pt-2">{{ name }}</span>
    <span class="w-full text-center pb-2">{{ points }} Points</span>
  </div>
</template>

<script setup lang="jsx">
const props = defineProps({
  name: String,
  points: Number,
});
</script>
