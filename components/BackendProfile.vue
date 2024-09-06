<script setup lang="jsx">
import { getRandomName } from "../utils/randomNameGenerator.js";
import { ref } from "vue";

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
 * Get the selected badges from localStorage
 *
 * @returns {Array}
 */
function getSelectedBadges() {
  return JSON.parse(localStorage.getItem("selectedBadges")) || [];
}

/**
 * Set the selected badges in localStorage
 *
 * @param {Array} badges
 */
function setSelectedBadges(badges) {
  localStorage.setItem("selectedBadges", JSON.stringify(badges));
}

/** 
 * Get the selected nametag from localStorage
 * 
 * @returns {Object}
 */
function getSelectedNametag() {
  return JSON.parse(localStorage.getItem("selectedNametag")) || {};
}

/**
 * Set the selected nametag in localStorage
 * 
 * @param {Object} nametag
 */
function setSelectedNametag(nametag) {
  localStorage.setItem("selectedNametag", JSON.stringify(nametag));
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
        rewardPoints: 500,
        currentStreak: 0,
        highestStreak: 0,
        badges: [
          {
            id: 1,
            img: "/badges/pot1.png",
            name: "Nurturing Beginnings",
            owned: true,
          },
          {
            id: 2,
            img: "/badges/pot2.png",
            name: "Sprouting Hope",
            owned: false,
          },
          {
            id: 3,
            img: "/badges/pot3.png",
            name: "Budding Potential",
            owned: false,
          },
          {
            id: 4,
            img: "/badges/pot4.png",
            name: "Reaching for the Sun",
            owned: false,
          },
          {
            id: 5,
            img: "/badges/pot5.png",
            name: "Blooming Strength",
            owned: false,
          },
          {
            id: 6,
            img: "/badges/pot6.png",
            name: "Flourishing Growth",
            owned: false,
          },
          {
            id: 7,
            img: "/badges/pot7.png",
            name: "Golden Blossom",
            owned: false,
          },
        ],
        borders: [],
        nametags: [],
        themes: [
          { name: "Light", theme: "light", points: 0, owned: false },
          { name: "Dark", theme: "dark", points: 0, owned: false },
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
  getSelectedBadges,
  setSelectedBadges,
  getSelectedNametag,
  setSelectedNametag,
});
</script>
