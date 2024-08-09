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
    score: 0,
    streaks: 0,
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
