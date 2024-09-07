<template>
  <!-- Profile Button -->
  <button
    class="btn btn-md btn-accent w-full flex flex-row"
    @click="openProfileModal"
  >
    <vue-avatar :size="35" :username="userName" />

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
              <vue-avatar :size="150" :username="userName" />
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
                  <div
                    v-else
                    class="grid grid-cols-1 grid-rows-1 items-center align-middle"
                  >
                    <img
                      v-if="selectedNametag != {}"
                      class="row-start-1 col-start-1"
                      :src="selectedNametag.img"
                    />
                    <div
                      class="flex flex-row gap-2 items-center row-start-1 col-start-1 justify-center text-base-content"
                    >
                      <h1
                        class="text-xl font-bold md:text-2xl"
                        :style="[
                          selectedNametag.text != ''
                            ? 'color: ' + selectedNametag.text
                            : '',
                        ]"
                      >
                        {{ userName }}
                      </h1>
                      <i
                        v-if="!editing"
                        class="bi bi-pencil-square text-primary fs-5 cursor-pointer"
                        @click="editUsername"
                      ></i>
                    </div>
                  </div>
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
                      originalUserName == userName || !userName
                        ? 'btn-disabled'
                        : '',
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
                <p>Current Streak: {{ currentStreak }} Day(s)</p>
                <p>Highest Streak: {{ highestStreak }} Day(s)</p>
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
              <span class="text-center">{{ currentStreak }} Day(s)</span>
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
              <h4 class="text-xl font-bold">Badges</h4>
              <div class="flex flex-wrap gap-2">
                <BadgeComponent
                  v-for="item in badges"
                  :key="item.id"
                  :name="item.name"
                  :img="item.img"
                  :owned="item.owned"
                  :selected="
                    selectedBadges.some((selected) => selected.id === item.id)
                  "
                  @click="toggleBadgeSelection(item)"
                />
                <span v-if="badges.length == 0" class="text-sm">
                  No badges available
                </span>
              </div>

              <!-- Name tags -->
              <h4 class="text-xl font-bold mt-4">Name Tags</h4>
              <div class="flex flex-wrap gap-2">
                <NameTagComponent
                  v-for="item in nametags"
                  :key="item.id"
                  :name="item.name"
                  :img="item.img"
                  :owned="item.owned"
                  :mode="'profile'"
                  :click="toggleNameTagSelection"
                  :item="item"
                  :selected="selectedNametag.id == item.id"
                />
                <span v-if="nametags.length == 0" class="text-sm">
                  No name tags available
                </span>
              </div>
            </div>

            <!-- Borders -->
            <div class="main-four col w-1/2">
              <h4 class="text-xl font-bold">Borders</h4>
              <div class="flex flex-wrap gap-2">
                <BorderComponent
                  v-for="item in borders"
                  :key="item.id"
                  :name="item.name"
                  :img="item.img"
                  :owned="item.owned"
                  :mode="'profile'"
                />
                <span v-if="borders.length == 0" class="text-sm">
                  No borders available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
  <BackendProfile ref="backendProfile" />
  <BackendGamification ref="backendGamification" />
</template>

<script setup lang="jsx">
import VueAvatar from "@webzlodimir/vue-avatar";
import "@webzlodimir/vue-avatar/dist/style.css";

// Backend Profile Component
const backendProfile = ref(null);
const backendGamification = ref(null);

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
const selectedBadges = ref([]);
const selectedNametag = ref({});

onMounted(() => {
  // Get profile name and user name
  userName.value = backendProfile.value.getUserName();

  const profile = backendProfile.value.getProfileData();
  avatar.value = profile.avatar;

  selectedBadges.value = backendProfile.value.getSelectedBadges();

  selectedNametag.value = backendProfile.value.getSelectedNametag();
});

function toggleBadgeSelection(badge) {
  // Check if the badge is already selected by comparing badge ids
  const badgeIndex = selectedBadges.value.findIndex(
    (selectedBadge) => selectedBadge.id === badge.id
  );

  if (badgeIndex !== -1) {
    // If the badge is already selected, remove it from the array
    selectedBadges.value.splice(badgeIndex, 1);
  } else {
    // If the badge is not selected, add the whole badge object
    selectedBadges.value.push(badge);
  }

  // Save the updated selected badges to localStorage
  backendProfile.value.setSelectedBadges(selectedBadges.value);
}

function toggleNameTagSelection(nametag) {
  // Set the selected nametag
  selectedNametag.value = nametag;

  // Save the selected nametag to localStorage
  backendProfile.value.setSelectedNametag(selectedNametag.value);
}

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
  currentStreak.value = backendGamification.value.getStreakData().streak;
  highestStreak.value = backendGamification.value.getHighestStreakData().streak;
  badges.value = profile.badges;
  nametags.value = profile.nametags;
  borders.value = profile.borders;

  // Derived Values
  scoreWidth.value = (score.value / maxScore.value) * 100;

  // Get selected nametag
  selectedNametag.value = backendProfile.value.getSelectedNametag();

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
