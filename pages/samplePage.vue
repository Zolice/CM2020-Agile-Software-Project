<template>
    <div class="w-full flex flex-col gap-4 p-4 items-center">
      <h1 class="text-4xl w-fit">Hello!</h1>
      <button class="btn btn-primary w-fit" @click="sampleFunction">sampleFunction Button</button>
      <button class="btn btn-primary w-fit" @click="sampleInput">sampleInput Button</button>
    </div>
  
    <BackendSample ref="backendSample" />
  </template>
  
  <script setup lang="jsx">
  import { ref } from "vue";
  
  // Define the backend sample component to be used
  const backendSample = ref(null);
  
  // Define click function used by the sample button
  const sampleFunction = ref(null)
  const sampleInput = ref(null);
  
  // When the page is fully loaded
  onMounted(() => {
    // Run the sample input function
    console.log("Function Output: ", backendSample.value.sampleInput("Sample input"));
  
    // Assign the sample function to the click function
    sampleFunction.value = backendSample.value.sampleFunction;
    sampleInput.value = backendSample.value.sampleInput;
  });
  </script>
  