<!-- TODO: Create Mobile view and make width consistent -->
<template>
  <!-- Modal Trigger -->
  <div class="flex justify-end">
    <button class="btn btn-sm btn-primary" @click="openShareModal">
      <i class="bi bi-share"></i> Share Achievements
    </button>
  </div>

  <!-- Background Overlay to dim the background -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-black opacity-50 z-40"
    @click="closeShareModal"
  ></div>

  <!-- Share Achievement Modal -->
  <dialog
    id="share_achievement_modal"
    class="overflow-hidden w-1/2 bg-transparent"
  >
    <!-- Modal Content -->
    <div class="modal-box w-full max-w-md mx-auto">
      <div ref="modalContent" class="text-center">
        <h2 class="text-xl font-bold mb-4">TASKMASTER</h2>
        <img
          :src="avatar"
          alt="Avatar"
          class="rounded-full w-24 h-24 mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold pb-3">{{ userName }}</h3>

        <div class="w-full flex items-center justify-center pb-3">
          <!-- Level progress bar -->
          <LevelProgressBar :score-width="scoreWidth" :level="level" />
        </div>

        <p class="mb-2">Score: {{ score }}</p>
        <p class="mb-4">Highest Streak: {{ highestStreak }} Days</p>

        <div class="flex flex-wrap gap-2 mt-4 justify-center">
          <Badges :badges="badges" />
        </div>
      </div>
    </div>

    <!-- Buttons outside the modal box -->
    <div class="modal-action w-full max-w-md mx-auto flex justify-between">
      <button class="btn btn-error w-[49%]" @click="closeShareModal">
        Discard
      </button>
      <button class="btn btn-primary w-[49%]" @click="downloadImage">
        Save
      </button>
    </div>
  </dialog>

  <BackendProfile ref="backendProfile" />
</template>

<script setup>
import { ref } from "vue";

const backendProfile = ref(null);
const isModalOpen = ref(false);

const avatar = ref("");
const userName = ref("");
const level = ref(1);
const score = ref(0);
const maxScore = ref(0);
const highestStreak = ref(0);
const badges = ref([]);
const scoreWidth = ref(0);

// Open the Share Modal
function openShareModal() {
  isModalOpen.value = true;

  userName.value = backendProfile.value.getUserName();

  const profile = backendProfile.value.getProfileData();
  avatar.value = profile.avatar;
  level.value = profile.level;
  score.value = profile.score;
  maxScore.value = profile.maxScore;
  highestStreak.value = profile.highestStreak;
  badges.value = profile.badges;

  scoreWidth.value = (score.value / maxScore.value) * 100;

  share_achievement_modal.showModal();
}

// Close the Share Modal
function closeShareModal() {
  isModalOpen.value = false;
  share_achievement_modal.close();
}

// Download the content as an image
function downloadImage() {
  // TODO: Implement the downloadImage function
}
</script>
