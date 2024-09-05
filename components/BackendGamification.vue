<template></template>

<script setup lang="jsx">
// Initialise points and score
const points = ref(200);
const score = ref(0);

onMounted(() => {
  initGame();
});

function initGame() {
  if (typeof window !== "undefined") {
    const storedPoints = localStorage.getItem("points") || points.value;
    const storedScore = localStorage.getItem("score") || score.value;

    if (!storedPoints) {
      localStorage.setItem("points", points.value);
    }

    if (!storedScore) {
      localStorage.setItem("score", score.value);
    }
  }
}

/**
 * Get the points from localStorage
 *
 * @returns {Number}
 */
function getPoints() {
  // Get the points
  if (typeof window !== "undefined") {
    return localStorage.getItem("points") || points.value;
  }
}

/**
 * Get the score from localStorage
 *
 * @returns {Number}
 */
function getScore() {
  // Add points to the user
  if (typeof window !== "undefined") {
    return localStorage.setItem("score", score.value);
  }
}

function addPoints(addedPoints) {
  points.value = getPoints();

  localStorage.setItem("points", points.value + addedPoints);
}

function addScore(addedScore) {
  score.value = getScore();

  localStorage.setItem("score", score.value + addedScore);
}

// Expose functions for use
defineExpose({ getPoints, getScore, addPoints, addScore });
</script>
