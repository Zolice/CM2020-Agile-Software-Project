<template>
  <!-- Profile Button -->
  <button
    class="btn btn-sm btn-accent w-full justify-start"
    @click="openProfileModal"
  >
    Profile
  </button>

  <!-- Profile Modal -->
  <dialog id="profile_modal" class="modal h-screen">
    <div class="modal-box w-full max-w-screen-lg md:h-5/6 h-screen">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div class="flex flex-col h-full gap-4">
        <h3 class="text-3xl font-bold">Profile</h3>
        <div class="flex flex-col lg:flex-row h-full overflow-auto gap-4">
          <div class="flex flex-col overflow-auto h-full w-full px-2 gap-4">
            <!-- Avatar and Username -->
            <div class="flex flex-row items-center gap-4">
              <img :src="avatar" alt="Avatar" class="rounded-full w-24 h-24" />
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <input
                    v-if="editing"
                    v-model="userName"
                    type="text"
                    class="input input-bordered input-lg"
                  />
                  <h1 v-else class="text-2xl font-bold">
                    {{ userName }}
                  </h1>
                  <i
                    v-if="!editing"
                    class="bi bi-pencil-square text-primary fs-5 cursor-pointer"
                    @click="editUsername"
                  ></i>
                </div>
                <div class="flex gap-2 mt-2">
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
                </div>
              </div>
            </div>
            <!-- Level and Score -->
            <div class="mt-4">
              <h4 class="text-xl">Level {{ level }}</h4>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  class="bg-blue-600 h-2.5 rounded-full"
                  :style="{ width: scoreWidth + '%' }"
                ></div>
              </div>
              <span>{{ score }} points</span>
            </div>
            <!-- Streaks -->
            <div class="mt-4">
              <h4 class="text-xl">Streaks</h4>
              <p>Current Streak: {{ currentStreak }} Days</p>
              <p>Highest Streak: {{ highestStreak }} Days</p>
            </div>
            <!-- Badges -->
            <div class="mt-4">
              <h4 class="text-xl font-bold">Badges</h4>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="badge in badges"
                  :key="badge.id"
                  class="badge"
                  :data-tip="badge.name"
                >
                  <img :src="badge.image" :alt="badge.name" class="w-12 h-12" />
                </div>
              </div>
            </div>
            <!-- Borders -->
            <div class="mt-4">
              <h4 class="text-xl font-bold">Borders</h4>
              <div class="flex flex-wrap gap-2">
                <div v-for="border in borders" :key="border.id" class="border">
                  <img
                    :src="border.image"
                    :alt="border.name"
                    class="w-12 h-12"
                  />
                </div>
              </div>
            </div>
            <!-- Name Tags -->
            <div class="mt-4">
              <h4 class="text-xl font-bold">Name Tags</h4>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="nametag in nametags"
                  :key="nametag.id"
                  class="nametag"
                >
                  <img
                    :src="nametag.image"
                    :alt="nametag.name"
                    class="w-12 h-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Share Achievements Button -->
        <div class="flex justify-center mt-4">
          <button class="btn btn-success" @click="shareAchievements">
            Share Achievements
          </button>
        </div>
      </div>
    </div>
  </dialog>
  <BackendProfile ref="backendProfile" />
</template>

<script setup lang="jsx">
import { ref } from "vue";

// Backend Profile Component
const backendProfile = ref(null);

// Profile Data
const avatar = ref("");
const userName = ref("");
const originalUserName = ref("");
const level = ref(1);
const score = ref(0);
const streaks = ref(0);
const editing = ref(false);

// Derived Values
const scoreWidth = computed(() => (score.value % 100) + "%");

function openProfileModal() {
  // Get profile data from backend
  const profile = backendProfile.value.getProfile();
  avatar.value = profile.avatar;
  userName.value = profile.userName;
  level.value = profile.level;
  score.value = profile.score;
  streaks.value = profile.streaks;

  // Open profile modal
  profile_modal.showModal();
}

function editUsername() {
  originalUserName.value = userName.value;
  editing.value = true;
}

function saveUsername() {
  backendProfile.value.saveUsername(userName.value);
  editing.value = false;
}

function cancelEdit() {
  editing.value = false;
  // Reset username to original value
  userName.value = originalUserName.value;
}
</script>
