<template>
  <BackendProfile ref="backendProfile" />
</template>

<script setup lang="jsx">
const backendProfile = ref(null);

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
    }
  }
  return streak.value;
}

function addStreak() {
  localStorage.setItem("userName", {
    streak: getStreak() + 1,
    lastDate: new Date(),
  });
}

/**
 * Get the points from localStorage
 *
 * @returns {Number}
 */
function getPoints() {
  // Get the points
  return backendProfile.value.getProfileData.rewardPoints;
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

function completeTask() {
  currentDate = new Date();

  // Return if points and score has been collected for the day
  if (currentDate == getStreak().lastDate) {
    return "You have earn points and score for today!";
  }

  // Else add streak, points and score
  addStreak();
  addScore(max(50 * getStreak(), 300));
  addPoints(max(100 * getStreak(), 400));
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
