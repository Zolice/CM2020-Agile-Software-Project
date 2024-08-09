<script setup lang="jsx">
import { getRandomName } from "../utils/randomName.js";
import { ref } from "vue";

let userName = ref("");
let editing = ref(false);

function getProfile() {
  if (typeof window !== "undefined") {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      userName.value = storedName;
    } else {
      userName.value = getRandomName();
      localStorage.setItem("userName", userName.value);
    }
  }
  return {
    avatar: "https://i.pravatar.cc/150?u=1",
    userName: userName.value,
    level: 1,
    score: 100,
    maxScore: 2000,
    rewardPoints: 0,
    currentStreak: 2,
    highestStreak: 5,
    badges: [
      { id: 1, image: "https://via.placeholder.com/50", name: "Badge 1" },
      { id: 2, image: "https://via.placeholder.com/50", name: "Badge 2" },
      { id: 3, image: "https://via.placeholder.com/50", name: "Badge 3" },
      { id: 4, image: "https://via.placeholder.com/50", name: "Badge 4" },
      { id: 5, image: "https://via.placeholder.com/50", name: "Badge 5" },
      { id: 6, image: "https://via.placeholder.com/50", name: "Badge 6" },
    ],
    borders: [
      { id: 1, image: "https://via.placeholder.com/50", name: "Border 1" },
      { id: 2, image: "https://via.placeholder.com/50", name: "Border 2" },
      { id: 3, image: "https://via.placeholder.com/50", name: "Border 3" },
    ],
    nametags: [
      { id: 1, image: "https://via.placeholder.com/50", name: "Name Tag 1" },
      { id: 2, image: "https://via.placeholder.com/50", name: "Name Tag 2" },
    ],
  };
}

/**
 * Save the username to localStorage
 */
function saveUsername(userName) {
  localStorage.setItem("userName", userName);
  editing.value = false;
}

// Expose functions for use
defineExpose({
  getProfile,
  saveUsername,
});
</script>
