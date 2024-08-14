<template>
  <!-- Modal Trigger -->
  <div class="flex justify-end">
    <button @click="openShareModal" class="btn btn-sm btn-primary">
      <i class="bi bi-share"></i> Share Achievements
    </button>
  </div>

  <!-- Share Modal -->
  <dialog id="share_achievement_modal" class="modal">
    <div class="modal-box w-full max-w-md">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>

      <div ref="modalContent" class="text-center">
        <h2 class="text-xl font-bold mb-4">TASKMASTER</h2>
        <img
          :src="profileData.avatar"
          alt="Avatar"
          class="rounded-full w-24 h-24 mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold">{{ profileData.name }}</h3>
        <div
          class="bg-blue-200 text-blue-800 px-4 py-1 rounded-full inline-block mb-4"
        >
          {{ profileData.level }}
        </div>
        <p class="mb-2">Score: {{ profileData.score }}</p>
        <p class="mb-4">Highest Streak: {{ profileData.streak }} Days</p>

        <div
          class="flex flex-wrap gap-2 mt-4 relative justify-center align-center"
        >
          <Badges :badges="profileData.badges" />
        </div>

        <div class="flex justify-between mt-4">
          <button class="btn btn-secondary" @click="closeShareModal">
            Discard
          </button>
          <button class="btn btn-success" @click="downloadImage">
            Get TaskMaster Now!
          </button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import html2canvas from "html2canvas";

// Profile Data
const profileData = ref({
  name: "",
  avatar: "",
  level: "",
  score: 0,
  streak: 0,
  badges: [],
});

// Open the Share Modal
function openShareModal() {
  const data = JSON.parse(localStorage.getItem("profileData"));
  if (data) {
    profileData.value = data;
  }
  document.getElementById("share_achievement_modal").showModal();
}

// Close the Share Modal
function closeShareModal() {
  document.getElementById("share_achievement_modal").close();
}

// Download the content as an image
function downloadImage() {
  html2canvas(document.getElementById("share_achievement_modal")).then(
    (canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${profileData.value.name}_TaskMaster.png`;
      link.click();
    }
  );
}
</script>
