<script setup lang="jsx">
// Declare your functions here
const sampleFunction = function () {
  console.log("Sample function was executed!");
  return "Sample";
};

// This format works as well!
function sampleInput(input) {
  console.log("Received Input: ", input);
  return input;
}

// Expose the functions to the parent component
defineExpose({
  sampleFunction,
  sampleInput,
});
</script>
