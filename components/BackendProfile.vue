<script setup lang="jsx">
import { getRandomName } from "../utils/randomNameGenerator.js";
import { ref } from "vue";

// Import borders
import border1 from "~/assets/borders/border1.jpg";
import border2 from "~/assets/borders/border2.jpg";
import border3 from "~/assets/borders/border3.jpg";
import border4 from "~/assets/borders/border4.jpg";

// Import nametags
import nameTag1 from "~/assets/nameTags/tag1.jpg";
import nameTag2 from "~/assets/nameTags/tag2.jpg";

const userName = ref("");

onMounted(() => {
  // Run getUserName() to initialize userName
  getUserName();

  // Run getProfileData() to initialize profileData
  getProfileData();
});

/**
 * Get the username from localStorage
 * Create a new localStorage for userName if it doesn't exist
 * Separated it from profileData for easier editing
 *
 * @returns {String}
 */
function getUserName() {
  if (typeof window !== "undefined") {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      userName.value = storedName;
    } else {
      userName.value = getRandomName();
      localStorage.setItem("userName", userName.value);
    }
  }
  return userName.value;
}

/**
 * Save the username to localStorage
 * @param {String} userName
 */
function saveUsername(userName) {
  localStorage.setItem("userName", userName);
}

/**
 * Get the profile data from localStorage
 * Create a new localStorage for profileData if it doesn't exist
 *
 * @returns {Object}
 */
function getProfileData() {
  if (typeof window !== "undefined") {
    const storedProfile = localStorage.getItem("profileData");
    userName.value = localStorage.getItem("userName") || "";

    if (storedProfile) {
      // Parse and return stored profile data
      const profileData = JSON.parse(storedProfile);
      return profileData;
    } else {
      // If no profile data exists, create default profile data and store it
      const defaultProfileData = {
        avatar: "https://i.pravatar.cc/150?u=1",
        level: 1,
        score: 0,
        maxScore: 2000,
        rewardPoints: 0,
        currentStreak: 0,
        highestStreak: 0,
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
        themes: [
          { name: "Light", theme: "light", points: 500, owned: true },
          { name: "Dark", theme: "dark", points: 500, owned: true },
        ],
      };

      // Store the default profile data in localStorage
      localStorage.setItem("profileData", JSON.stringify(defaultProfileData));
      return defaultProfileData;
    }
  }

  // Return an empty object if localStorage is not available
  return {};
}

/**
 * Update the profile data in localStorage
 *
 * @param data {Object}
 */
function updateProfileData(data) {
  if (data == null) return;
  localStorage.setItem("profileData", JSON.stringify(data));
}

// Expose functions for use
defineExpose({
  getUserName,
  saveUsername,
  getProfileData,
  updateProfileData,
});
</script>
