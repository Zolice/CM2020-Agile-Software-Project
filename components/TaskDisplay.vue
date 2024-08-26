<template>
  <!-- cursor-pointer hover:bg-base-100 -->
  <div class="flex flex-col btn btn-ghost h-fit items-start p-1 gap-1">
    <span class="line-clamp-1 text-start">{{ name }}</span>
    <span
      class="badge badge-ghost badge-sm font-normal border-none"
      :class="[
        colour == 'red' ? 'bg-[#EA9999] text-black' : '',
        colour == 'yellow' ? 'bg-[#FCE8B2] text-black' : '',
        colour == 'green' ? 'bg-[#BDD9CD] text-black' : '',
      ]"
    >
      Due on {{ dueDate }}
    </span>
    <span class="text-xs line-clamp-2 text-start font-normal">
      {{ description }}
    </span>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  name: String,
  colour: String,
  dueDate: String,
  description: String,
  uid: String,
});
</script>
