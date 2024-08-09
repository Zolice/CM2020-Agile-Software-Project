<script setup lang="jsx">
import { getRandomName } from "../utils/randomName.js";
import { ref } from "vue";

// Import borders
import border1 from "~/assets/borders/border1.jpg";
import border2 from "~/assets/borders/border2.jpg";
import border3 from "~/assets/borders/border3.jpg";
import border4 from "~/assets/borders/border4.jpg";

// Import nametags
import nameTag1 from "~/assets/nametags/tag1.jpg";
import nameTag2 from "~/assets/nametags/tag2.jpg";

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
    score: 1000,
    maxScore: 2000,
    rewardPoints: 0,
    currentStreak: 2,
    highestStreak: 5,
    badges: [
      { id: 1, image: "https://i.pravatar.cc/150?u=2", name: "Badge 1" },
      { id: 2, image: "https://i.pravatar.cc/150?u=3", name: "Badge 2" },
      { id: 3, image: "https://i.pravatar.cc/150?u=4", name: "Badge 3" },
      { id: 4, image: "https://i.pravatar.cc/150?u=5", name: "Badge 4" },
      { id: 5, image: "https://i.pravatar.cc/150?u=6", name: "Badge 5" },
      { id: 6, image: "https://i.pravatar.cc/150?u=7", name: "Badge 6" },
    ],
    borders: [
      { id: 1, image: border1, name: "Border 1" },
      { id: 2, image: border2, name: "Border 2" },
      { id: 3, image: border3, name: "Border 3" },
      { id: 4, image: border4, name: "Border 4" },
    ],
    nametags: [
      { id: 1, image: nameTag1, name: "Name Tag 1" },
      { id: 2, image: nameTag2, name: "Name Tag 2" },
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
