<template>
  <BackendProfile ref="backendProfile" />
</template>

<script setup lang="jsx">
const backendProfile = ref(null);
const postNotification = inject("postNotification");

// Initialise points and score
const streak = ref({});
const highestStreak = ref({});

onMounted(() => {
  backendProfile;
  getStreakData();
  getHighestStreakData();
});

/**
 * Fetches the streak data or create a streak data if it does not exist in localStorage
 * Also checks if it has been more than 2 days since the user completed a task
 * Reset the streak if so
 * 
 * Returns {Object} streakData
 */
function getStreakData() {
  if (typeof window !== "undefined") {
    const storedStreak = localStorage.getItem("streak");
    
    if (!storedStreak) {
      streak.value = { streak: 1, lastDate: "" };
      localStorage.setItem("streak", JSON.stringify(streak.value));
    } else {
      streak.value = JSON.parse(storedStreak);
      
      // Logic to reset streak if the time difference is greater than 48 hours
      const lastDate = new Date(streak.value.lastDate);
      const currentDate = new Date();
      // Check if the difference in time is greater than or equal to 2 days (48 hours)
      const timeDifference = currentDate - lastDate; 
    
      // 2 days difference in milliseconds = 2 * 24 * 60 * 60 * 1000
      if (timeDifference >= (2 * 24 * 60 * 60 * 1000)) {
        console.log("here")
        // Reset the streak to 1 if the difference is 2 days or more
        streak.value = { streak: 1, lastDate: "" };
        localStorage.setItem("streak", JSON.stringify(streak.value));
      }
    }
  }
  return streak.value;
}

/**
 * Fetches the highest streak data or create a highest streak data if it does not exist in localStorage
 * 
 * @returns {Object} highestStreakData
 */
function getHighestStreakData() {
  if (typeof window !== "undefined") {
    const storedHighestStreak = localStorage.getItem("highestStreak");
    if (!storedHighestStreak) {
      const storedStreak = localStorage.getItem("streak");
      highestStreak.value = JSON.parse(storedStreak);
      localStorage.setItem("highestStreak", JSON.stringify(highestStreak.value));
    } else {
      highestStreak.value = JSON.parse(storedHighestStreak);
    }
  }
  return highestStreak.value;
}

/**
 * Add 1 to the current existing streak
 */
function addStreak() {
  const storedStreak = getStreakData().streak;
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  streak.value = {
    streak: storedStreak + 1,
    lastDate: formattedDate,
  };

  localStorage.setItem("streak", JSON.stringify(streak.value));
  localStorage.setItem("highestStreak", JSON.stringify(streak.value));
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

/**
 * @params {boolean} completed
 * 
 * Checks if a streak has been completed for the day. 
 * If not add the streak, points and score for the user
 * Display notification as well
 * 
 * If streak has already been obtained, do not give more 
 * streak, points and score
 */
function completeTask(completed) {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  const streakData = getStreakData();

  // Return if points and score has been collected for the day
  if (formattedDate == streakData.lastDate) {
    postNotification(
      "info",
      "Task Completed! Carry on!",
      "However, you have already earned a streak for the day! ^^ Come back again tomorrow"
    );
    return
  }

  if (!completed) {
    // If task is originally incomplete, add streak, points and score
    const scoreGained = Math.min(50 * streakData.streak, 300);
    const pointGained = Math.min(100 * streakData.streak, 400);
    postNotification(
      "info",
      "Task Completed! Fighting!",
      "You have completed a task! ^^ You have earned " +
        scoreGained +
        " points and " +
        pointGained +
        " score!"
    );
    addStreak();
    addScore(scoreGained);
    addPoints(pointGained);
  }
}

// Expose functions for use
defineExpose({
  getStreakData,
  getHighestStreakData,
  addStreak,
  getPoints,
  getScore,
  addPoints,
  addScore,
  completeTask,
});
</script>
