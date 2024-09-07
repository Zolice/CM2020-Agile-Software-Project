<template>
  <BackendProfile ref="backendProfile" />
</template>

<script setup lang="jsx">
const backendProfile = ref(null);
const postNotification = inject("postNotification");

// Initialise points and score
const streak = ref({});

onMounted(() => {
  backendProfile;
  getStreak();
});

function getStreak() {
  if (typeof window !== "undefined") {
    const storedStreak = localStorage.getItem("streak");
    if (!storedStreak) {
      streak.value = { streak: 1, lastDate: "" };
      localStorage.setItem("streak", JSON.stringify(streak.value));
    } else {
      streak.value = storedStreak;
      // TODO: Consider adding logic to reset streak if lastDate is not today
    }
  }
  return streak.value;
}

function addStreak() {
  const storedStreak = JSON.parse(getStreak()).streak;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  streak.value = {
    streak: storedStreak + 1,
    lastDate: formattedDate,
  };

  // TODO: Add highest streak logic here
  localStorage.setItem("streak", JSON.stringify(streak.value));
}

/**
 * Get the points from localStorage
 *
 * @returns {Number}
 */
function getPoints() {
  // Get the points
  return backendProfile.value.getProfileData().rewardPoints;
}

/**
 * Get the score from localStorage
 *
 * @returns {Number}
 */
function getScore() {
  return backendProfile.value.getProfileData().score;
}

function addPoints(addedPoints) {
  const profile = backendProfile.value.getProfileData();
  profile.rewardPoints += addedPoints;
  backendProfile.value.updateProfileData(profile);
}

function addScore(addedScore) {
  const profile = backendProfile.value.getProfileData();
  profile.score += addedScore;
  backendProfile.value.updateProfileData(profile);
}

function completeTask(completed) {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  const streakData = JSON.parse(getStreak());

  // Return if points and score has been collected for the day
  if (formattedDate == streakData.lastDate) {
    return "You have earn points and score for today!";
  }

  if (!completed) {
    // If task is originally incomplete, add streak, points and score
    const scoreGained = Math.min(50 * streakData.streak, 300);
    const pointGained = Math.min(100 * streakData.streak, 400);
    postNotification(
      "success",
      "Task Completed!",
      "You have completed a task! You have earned " +
        scoreGained +
        " points and " +
        pointGained +
        " score!",
      10000
    );
    addStreak();
    addScore(scoreGained);
    addPoints(pointGained);
  }
}

// Expose functions for use
defineExpose({
  getStreak,
  addStreak,
  getPoints,
  getScore,
  addPoints,
  addScore,
  completeTask,
});
</script>
