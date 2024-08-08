<template>
  <!-- Button -->
  <button
    class="btn btn-sm btn-secondary w-full justify-start"
    onclick="shop_modal.showModal()"
  >
    Shop
  </button>

  <dialog id="shop_modal" class="modal h-screen">
    <div class="modal-box w-full max-w-screen-lg md:h-5/6 h-screen">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div class="flex flex-col h-full gap-4">
        <h3 class="text-3xl font-bold">Shop</h3>
        <div
          class="flex flex-col overflow-auto overflow-x-clip h-full w-full px-2 gap-4"
        >
          <span class="w-full text-right">
            Reward Points: {{ rewardPoints }}
          </span>
          <div
            class="flex flex-col w-full overflow-clip gap-2"
            :class="[borderExpanded ? 'hidden' : '']"
          >
            <div class="flex justify-between items-center">
              <h4 class="text-2xl">Themes</h4>
              <button class="btn btn-sm btn-primary" @click="toggleThemeExpand">
                See {{ themeExpanded ? "less" : "more" }}
              </button>
            </div>
            <div
              class="flex flex-row w-full h-full gap-2 overflow-x-scroll transition-all duration-150"
              :class="[themeExpanded ? 'flex-wrap' : '']"
            >
              <ThemeDisplayComponent
                v-for="theme in themes"
                v-bind:key="theme"
                :name="theme.name"
                :theme="theme.theme"
                :points="theme.points"
              />
            </div>
          </div>
          <div
            class="flex flex-col w-full overflow-clip gap-2"
            :class="[themeExpanded ? 'hidden' : '']"
          >
            <div class="flex justify-between items-center">
              <h4 class="text-2xl">Borders</h4>
              <button
                class="btn btn-sm btn-primary"
                @click="toggleBorderExpand"
              >
                See {{ borderExpanded ? "less" : "more" }}
              </button>
            </div>
            <div
              class="flex flex-row w-full h-full gap-2 overflow-x-scroll transition-all duration-150"
              :class="[borderExpanded ? 'flex-wrap' : '']"
            >
              <ThemeDisplayComponent
                v-for="theme in themes"
                v-bind:key="theme"
                :name="theme.name"
                :theme="theme.theme"
                :points="theme.points"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="jsx">
import ThemeDisplayComponent from "./ThemeDisplayComponent.vue";

const rewardPoints = ref(100);

const themes = [
  { name: "Light", theme: "light", points: 500 },
  { name: "Dark", theme: "dark", points: 500 },
  { name: "Cupcake", theme: "cupcake", points: 500 },
  { name: "Bumblebee", theme: "bumblebee", points: 500 },
  { name: "Emerald", theme: "emerald", points: 500 },
  { name: "Corporate", theme: "corporate", points: 500 },
  { name: "Synthwave", theme: "synthwave", points: 500 },
  { name: "Retro", theme: "retro", points: 500 },
  { name: "Cyberpunk", theme: "cyberpunk", points: 500 },
  { name: "Valentine", theme: "valentine", points: 500 },
  { name: "Halloween", theme: "halloween", points: 500 },
  { name: "Garden", theme: "garden", points: 500 },
  { name: "Forest", theme: "forest", points: 500 },
  { name: "Aqua", theme: "aqua", points: 500 },
  { name: "Lofi", theme: "lofi", points: 500 },
  { name: "Pastel", theme: "pastel", points: 500 },
  { name: "Fantasy", theme: "fantasy", points: 500 },
  { name: "Wireframe", theme: "wireframe", points: 500 },
  { name: "Black", theme: "black", points: 500 },
  { name: "Luxury", theme: "luxury", points: 500 },
  { name: "Dracula", theme: "dracula", points: 500 },
  { name: "Cmyk", theme: "cmyk", points: 500 },
  { name: "Autumn", theme: "autumn", points: 500 },
  { name: "Business", theme: "business", points: 500 },
  { name: "Acid", theme: "acid", points: 500 },
  { name: "Lemonade", theme: "lemonade", points: 500 },
  { name: "Night", theme: "night", points: 500 },
  { name: "Coffee", theme: "coffee", points: 500 },
  { name: "Winter", theme: "winter", points: 500 },
  { name: "Dim", theme: "dim", points: 500 },
  { name: "Nord", theme: "nord", points: 500 },
  { name: "Sunset", theme: "sunset", points: 500 },
];

const themeExpanded = ref(false);
const borderExpanded = ref(false);

function toggleThemeExpand() {
  themeExpanded.value = !themeExpanded.value;
}

function toggleBorderExpand() {
  borderExpanded.value = !borderExpanded.value;
}
</script>
