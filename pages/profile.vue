<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="avatar">
        <img :src="avatar" alt="Avatar" />
      </div>
      <div class="profile-info">
        <div class="username-container">
          <input
            v-if="editing"
            v-model="userName"
            type="text"
            class="edit-username"
          />
          <h1 v-else>{{ userName }}</h1>
          <button
            v-if="editing"
            class="btn btn-primary btn-sm"
            @click="saveUsername"
          >
            Save
          </button>
          <button
            v-if="editing"
            class="btn btn-secondary btn-sm"
            @click="cancelEdit"
          >
            Cancel
          </button>
          <i
            v-if="!editing"
            class="bi bi-pencil-square edit-icon"
            @click="editUsername"
          ></i>
        </div>
        <div class="level-score">
          <span>Level {{ level }}</span>
          <div class="score-bar">
            <div class="score" :style="{ width: scoreWidth + '%' }"></div>
          </div>
          <span>{{ score }}</span>
        </div>
        <div class="streaks">
          <span>Current Streak: {{ currentStreak }} Days</span>
          <span>Highest Streak: {{ highestStreak }} Days</span>
        </div>
      </div>
      <div class="share-btn">
        <button @click="shareAchievements">Share Achievements</button>
      </div>
    </div>
    <div class="profile-content">
      <div class="badges-section">
        <h2>Badges</h2>
        <div class="badges">
          <div
            v-for="badge in badges"
            :key="badge.id"
            class="badge"
            @mouseover="showTitle($event, badge.name)"
            @mouseleave="hideTitle($event)"
          >
            <img :src="badge.image" :alt="badge.name" />
            <span class="badge-title">{{ badge.name }}</span>
          </div>
        </div>
      </div>
      <div class="borders-section">
        <h2>Borders</h2>
        <div class="borders">
          <div v-for="border in borders" :key="border.id" class="border">
            <img :src="border.image" :alt="border.name" />
          </div>
        </div>
      </div>
      <div class="nametags-section">
        <h2>Name Tags</h2>
        <div class="nametags">
          <div v-for="nametag in nametags" :key="nametag.id" class="nametag">
            <img :src="nametag.image" :alt="nametag.name" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "Jeremy Chua",
      avatar: "https://via.placeholder.com/100",
      level: 20,
      score: 1900,
      currentStreak: 2,
      highestStreak: 3,
      editing: false,
      originalUserName: "",
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
  },
  computed: {
    scoreWidth() {
      return (this.score / 2000) * 100; // Adjust the denominator to match the maximum score
    },
  },
  methods: {
    editUsername() {
      this.originalUserName = this.userName;
      this.editing = true;
    },
    saveUsername() {
      this.editing = false;
    },
    cancelEdit() {
      this.userName = this.originalUserName;
      this.editing = false;
    },
    shareAchievements() {
      // Implement share functionality here
      alert("Achievements shared!");
    },
    showTitle(event, title) {
      const span = event.target.querySelector(".badge-title");
      if (span) {
        span.style.visibility = "visible";
      }
    },
    hideTitle(event) {
      const span = event.target.querySelector(".badge-title");
      if (span) {
        span.style.visibility = "hidden";
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.avatar img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.profile-info {
  flex-grow: 1;
  margin-left: 20px;
}

.username-container {
  display: flex;
  align-items: center;
}

.username-container h1 {
  margin-right: 10px;
  cursor: pointer;
}

.edit-username {
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-bottom: 2px solid #4caf50;
  outline: none;
  margin-right: 10px;
}

.edit-icon {
  font-size: 20px;
  cursor: pointer;
}

.level-score {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.score-bar {
  width: 100px;
  height: 10px;
  background-color: #ddd;
  margin: 0 10px;
  border-radius: 5px;
  overflow: hidden;
}

.score {
  height: 100%;
  background-color: #4caf50;
}

.streaks {
  margin-top: 10px;
}

.share-btn button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.profile-content {
  display: flex;
  justify-content: space-between;
}

.badges-section,
.borders-section,
.nametags-section {
  flex: 1;
  margin: 10px;
}

.badges,
.borders,
.nametags {
  display: flex;
  flex-wrap: wrap;
}

.badge,
.border,
.nametag {
  width: 50px;
  height: 50px;
  margin: 5px;
  position: relative;
}

.badge-title {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 2px 5px;
  border-radius: 3px;
  visibility: hidden;
  font-size: 12px;
  white-space: nowrap;
}
</style>
