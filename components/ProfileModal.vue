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
        <div class="flex flex-col h-full overflow-auto gap-4">
          <div class="flex flex-row w-full px-2 gap-4">
            <!-- Avatar and Username -->
            <div
              class="main-one flex-shrink-0 w-2/5 flex items-center justify-center"
            >
              <img :src="avatar" alt="Avatar" class="rounded-full w-35 h-35" />
            </div>
            <div
              class="main-two flex-grow w-3/5 flex flex-col items-center justify-center text-center"
            >
              <!-- Username and buttons-->
              <div class="flex flex-col items-center">
                <!-- Username -->
                <div class="flex items-center gap-2">
                  <input
                    v-if="editing"
                    v-model="userName"
                    type="text"
                    class="input input-bordered input-lg text-center"
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
                <!-- Save and discard buttons for name change -->
                <div class="flex gap-2 mt-2">
                  <button
                    v-if="editing"
                    class="btn btn-error btn-sm"
                    @click="discardEdit"
                  >
                    Discard
                  </button>
                  <button
                    v-if="editing"
                    class="btn btn-primary btn-sm"
                    :class="[
                      originalUserName == userName ? 'btn-disabled' : '',
                    ]"
                    @click="saveUsername"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div class="w-full flex items-center justify-around">
                <h4 class="flex-shrink-0 ps-4">Level {{ level }}</h4>

                <div class="w-2/5">
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      class="bg-blue-600 h-2.5 rounded-full"
                      :style="{ width: scoreWidth + '%' }"
                    ></div>
                  </div>
                </div>

                <span>Score: {{ score }}</span>
                <span>Reward Points: {{ rewardPoints }}</span>
              </div>

              <!-- Streaks -->
              <div class="w-full flex items-center justify-around">
                <p>Current Streak: {{ currentStreak }} Days</p>
                <p>Highest Streak: {{ highestStreak }} Days</p>
              </div>
            </div>
          </div>

          <!-- Badges, name tags, and borders -->
          <div class="row flex h-1/2">
            <div class="main-three col w-1/2">
              <div class="mt-4">
                <h4 class="text-xl font-bold">Badges</h4>
                <div class="flex flex-wrap gap-2 mt-4">
                  <div
                    v-for="badge in badges"
                    :key="badge.id"
                    class=""
                    :data-tip="badge.name"
                  >
                    <img
                      :src="badge.image"
                      :alt="badge.name"
                      class="w-12 h-12"
                    />
                  </div>
                </div>
              </div>

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
            <div class="main-four col w-1/2">
              <div class="mt-4">
                <h4 class="text-xl font-bold">Borders</h4>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="border in borders"
                    :key="border.id"
                    class="border"
                  >
                    <img
                      :src="border.image"
                      :alt="border.name"
                      class="w-12 h-12"
                    />
                  </div>
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
import { ref, computed } from "vue";

// Backend Profile Component
const backendProfile = ref(null);

// Profile Data
const avatar = ref("");
const userName = ref("");
const originalUserName = ref("");
const level = ref(1);
const score = ref(0);
const maxScore = ref(0);
const rewardPoints = ref(0);
const currentStreak = ref(0);
const highestStreak = ref(0);
const editing = ref(false);
const badges = ref([]);
const nametags = ref([]);
const borders = ref([]);

function openProfileModal() {
  // Get profile data from backend
  const profile = backendProfile.value.getProfile();
  avatar.value = profile.avatar;
  userName.value = profile.userName;
  level.value = profile.level;
  score.value = profile.score;
  maxScore.value = profile.maxScore;
  rewardPoints.value = profile.rewardPoints;
  currentStreak.value = profile.currentStreak;
  highestStreak.value = profile.highestStreak;
  badges.value = profile.badges;
  nametags.value = profile.nametags;
  borders.value = profile.borders;

  // Derived Values
  const scoreWidth = (score.value / maxScore.value) * 100;
  console.log(score.value, maxScore.value, scoreWidth);

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

function discardEdit() {
  editing.value = false;
  // Reset username to original value
  userName.value = originalUserName.value;
}
</script>
