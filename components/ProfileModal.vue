<template>
  <dialog ref="profileModal" class="profile-modal">
    <div class="profile-container px-5 max-w-xl mx-auto">
      <div
        class="profile-header d-flex align-items-center justify-content-between mb-4"
      >
        <div class="avatar">
          <img :src="avatar" alt="Avatar" class="rounded-circle w-24 h-24" />
        </div>
        <div class="profile-info flex-grow-1 ms-4">
          <div class="username-container d-flex align-items-center">
            <input
              v-if="editing"
              v-model="userName"
              type="text"
              class="edit-username form-control fs-4 fw-bold border-0 border-bottom border-success"
            />
            <h1 v-else class="me-2 cursor-pointer">{{ userName }}</h1>
            <button
              v-if="editing"
              class="btn btn-primary btn-sm me-2"
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
              class="bi bi-pencil-square edit-icon text-primary fs-5 cursor-pointer"
              @click="editUsername"
            ></i>
          </div>
          <div class="level-score d-flex align-items-center mt-3">
            <span class="me-3">Level {{ level }}</span>
            <div class="progress w-25 me-3">
              <div
                class="progress-bar bg-success"
                :style="{ width: scoreWidth + '%' }"
                role="progressbar"
              ></div>
            </div>
            <span>{{ score }}</span>
          </div>
          <div class="streaks mt-3">
            <span>Current Streak: {{ currentStreak }} Days</span><br />
            <span>Highest Streak: {{ highestStreak }} Days</span>
          </div>
        </div>
        <div class="share-btn">
          <button class="btn btn-success" @click="shareAchievements">
            Share Achievements
          </button>
        </div>
      </div>
      <div class="profile-content d-flex justify-content-between">
        <div class="badges-section flex-1 me-3">
          <h2 class="text-lg font-bold">Badges</h2>
          <div class="badges flex flex-wrap">
            <div
              v-for="badge in badges"
              :key="badge.id"
              class="badge me-2 mb-2 tooltip tooltip-top"
              :data-tip="badge.name"
            >
              <img :src="badge.image" :alt="badge.name" class="w-12 h-12" />
            </div>
          </div>
        </div>
        <div class="borders-section flex-1 me-3">
          <h2 class="text-lg font-bold">Borders</h2>
          <div class="borders flex flex-wrap">
            <div
              v-for="border in borders"
              :key="border.id"
              class="border me-2 mb-2"
            >
              <img :src="border.image" :alt="border.name" class="w-12 h-12" />
            </div>
          </div>
        </div>
        <div class="nametags-section flex-1">
          <h2 class="text-lg font-bold">Name Tags</h2>
          <div class="nametags flex flex-wrap">
            <div
              v-for="nametag in nametags"
              :key="nametag.id"
              class="nametag me-2 mb-2"
            >
              <img :src="nametag.image" :alt="nametag.name" class="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script>
import BackendProfile from "./BackendProfile.vue";

export default {
  components: {
    BackendProfile,
  },
  props: {
    userName: String,
    avatar: String,
    level: Number,
    score: Number,
    maxScore: Number,
    currentStreak: Number,
    highestStreak: Number,
    editing: Boolean,
    badges: Array,
    borders: Array,
    nametags: Array,
  },
  methods: {
    shareAchievements() {
      alert("Achievements shared!");
    },
    openModal() {
      this.$refs.profileModal.showModal();
    },
    closeModal() {
      this.$refs.profileModal.close();
    },
  },
};
</script>
