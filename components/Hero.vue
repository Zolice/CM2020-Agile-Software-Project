<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md flex flex-col gap-2 items-center">
        <h1 class="text-5xl font-bold">{{ title }}</h1>
        <p class="py-6">{{ msg }}</p>
        <button class="btn btn-primary w-fit" @click="click">Get Started</button>
        <AddTaskModal />
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { ref } from "vue";

const postNotification = inject("postNotification");

// Define props
const props = defineProps({
  title: String,
  msg: String,
});

// Define variables
const title = ref(props.title);
const msg = ref(props.msg);

// Define function
const click = function () {
  console.log("Button was clicked!");

  // Change the message
  msg.value = "Button was clicked!";

  // Post some notifications
  postNotification("info", "", "Button was clicked! This should stay for 10 seconds!", 10000, "/borders/border1.jpg");
  postNotification("warning", "This is a warning!", "Button was clicked! This should stay for 5 seconds!", 5000);
  postNotification("error", "This is an error!", "Button was clicked! This should stay for 2 seconds!", 2000);
};
</script>
