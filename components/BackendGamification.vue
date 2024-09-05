<template></template>

<script setup lang="jsx">
// Initialise points and score
const points = ref(200);
const score = ref(0);

onMounted(() => {
  // Run getPoints() to initialize points
  getPoints();

  // Run getScore() to initialize score
  getScore();
});

/**
 * Get the points from localStorage
 * Create a new localStorage for points if it doesn't exist
 *
 * @returns {Number}
 */
function getPoints() {
  // Add points to the user
  if (typeof window !== "undefined") {
    const storedPoints = localStorage.getItem("points") || points.value;
    if (storedPoints) {
      points.value += storedPoints;
    } else {
      localStorage.setItem("points", points.value);
    }
  }
  return points.value;
}

/**
 * Get the score from localStorage
 * Create a new localStorage for score if it doesn't exist
 *
 * @returns {Number}
 */
function getScore() {
  // Add points to the user
  if (typeof window !== "undefined") {
    const storedScore = localStorage.getItem("score") || score.value;
    if (storedScore) {
      score.value += storedScore;
    } else {
      localStorage.setItem("score", score.value);
    }
  }
  return points.value;
}

// Expose functions for use
defineExpose({ getPoints, getScore });
</script>
