<template>
  <!-- TODO: Make the mobile view of this -->
  <!-- Profile Button -->
  <button
    class="btn btn-md btn-accent w-full flex flex-row"
    @click="openProfileModal"
  >
    <img :src="avatar" alt="Avatar" class="rounded-full w-6 h-6" />
    <span class="grow text-center"> {{ userName }} </span>
  </button>

  <!-- Profile Modal -->
  <dialog id="profile_modal" class="modal h-screen">
    <div class="modal-box w-full max-w-screen-lg md:h-5/6 h-screen">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <!-- Profile nav bar -->
      <div class="flex flex-col h-full gap-4">
        <h3 class="text-3xl font-bold">Profile</h3>

        <ShareAchievementModal />

        <div class="flex flex-col h-full overflow-auto gap-4">
          <div class="flex flex-row w-full px-2 gap-4">
            <!-- Avatar and Username -->
            <div class="flex-shrink-0 w-2/5 flex items-center justify-center">
              <img :src="avatar" alt="Avatar" class="rounded-full w-35 h-35" />
            </div>
            <div
              class="flex-grow w-3/5 flex flex-col items-center justify-center text-center"
            >
              <!-- Username and buttons-->
              <div class="flex flex-col items-center">
                <!-- Username -->
                <div class="flex items-center gap-2">
                  <input
                    v-if="editing"
                    v-model="userName"
                    type="text"
                    class="input input-bordered input-lg w-full text-center"
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
                <!-- Save and cancel buttons for name change -->
                <div class="flex gap-2 py-2">
                  <button
                    v-if="editing"
                    class="btn btn-error btn-sm"
                    @click="cancelEdit"
                  >
                    Cancel
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

              <div
                class="w-full grid grid-cols-1 sm:grid-cols-3 items-center justify-around"
              >
                <!-- Level progress bar -->
                <LevelProgressBar :score-width="scoreWidth" :level="level" />

                <!-- Score and reward points -->
                <span class="hidden sm:block">Score: {{ score }}</span>
                <span class="hidden sm:block">
                  Reward Points: {{ rewardPoints }}
                </span>
              </div>

              <!-- Streaks -->
              <div class="w-full items-center justify-around hidden sm:flex">
                <p>Current Streak: {{ currentStreak }} Days</p>
                <p>Highest Streak: {{ highestStreak }} Days</p>
              </div>
            </div>
          </div>
          <div class="grid-cols-3 grid sm:hidden">
            <div class="flex flex-col">
              <span class="font-bold text-xl text-center">Player Score</span>
              <span class="text-center">{{ score }}</span>
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-xl text-center">Current Streak</span>
              <span class="text-center">{{ currentStreak }} Days</span>
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-xl text-center">Highest Streak</span>
              <span class="text-center">{{ highestStreak }}</span>
            </div>
          </div>

          <!-- Badges, name tags, and borders -->
          <div class="row flex">
            <div class="main-three col w-1/2">
              <!-- Badges -->
              <!-- TODO: Allow users to select the badges, borders and name tags  -->
              <div class="mt-4">
                <h4 class="text-xl font-bold">Badges</h4>
                <div class="flex flex-wrap gap-2 mt-4 relative">
                  <BadgeComponent
                    v-for="item in badges"
                    :key="item.id"
                    :name="item.name"
                    :img="item.img"
                    :owned="item.owned"
                  />
                </div>
              </div>

              <!-- Name tags -->
              <NameTagComponent
                v-for="item in nametags"
                :key="item.id"
                :name="item.name"
                :img="item.img"
                :owned="item.owned"
                :mode="'profile'"
              />
            </div>

            <!-- Borders -->
            <BorderComponent
              v-for="item in borders"
              :key="item.id"
              :name="item.name"
              :img="item.img"
              :owned="item.owned"
              :mode="'profile'"
            />
          </div>
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
const maxScore = ref(0);
const scoreWidth = ref(0);
const rewardPoints = ref(0);
const currentStreak = ref(0);
const highestStreak = ref(0);
const editing = ref(false);
const badges = ref([]);
const nametags = ref([]);
const borders = ref([]);

onMounted(() => {
  // Get profile name and user name)
  userName.value = backendProfile.value.getUserName();

  const profile = backendProfile.value.getProfileData();
  avatar.value = profile.avatar;
});

function openProfileModal() {
  // Get username from backend
  userName.value = backendProfile.value.getUserName();

  // Get profile data from backend
  const profile = backendProfile.value.getProfileData();
  avatar.value = profile.avatar;
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
  scoreWidth.value = (score.value / maxScore.value) * 100;

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
