<template>
  <!-- Button -->
  <button
    class="btn btn-sm btn-accent w-full justify-start"
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
        <div class="flex flex-col">
          <h3 class="text-3xl font-bold">Shop</h3>
          <span class="w-full text-right">
            Reward Points: {{ rewardPoints }}
          </span>
        </div>
        <div
          class="flex flex-col overflow-auto overflow-x-clip h-full w-full px-2 gap-4"
        >
          <div
            class="flex flex-col w-full overflow-clip gap-2"
            :class="[
              borderExpanded ? 'hidden' : '',
              nameTagExpanded ? 'hidden' : '',
            ]"
          >
            <div class="flex justify-between items-center">
              <h4 class="text-2xl">Themes</h4>
              <button class="btn btn-sm btn-primary" @click="toggleThemeExpand">
                See {{ themeExpanded ? "less" : "more" }}
              </button>
            </div>
            <div
              class="flex flex-row w-full h-full gap-2 overflow-x-auto transition-all duration-150"
              :class="[themeExpanded ? 'flex-wrap' : '']"
            >
              <ThemeDisplayComponent
                v-for="theme in themes"
                :key="theme"
                :raw="item"
                :name="theme.name"
                :theme="theme.theme"
                :points="theme.points"
                :owned="true"
                :click="purchase"
                message="Owned"
              />
            </div>
          </div>
          <div
            class="flex flex-col w-full overflow-clip gap-2"
            :class="[
              themeExpanded ? 'hidden' : '',
              nameTagExpanded ? 'hidden' : '',
            ]"
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
              class="flex flex-row w-full h-full gap-2 overflow-x-auto transition-all duration-150"
              :class="[borderExpanded ? 'flex-wrap' : '']"
            >
              <BorderComponent
                v-for="item in borders"
                :key="item"
                :name="item.name"
                :points="item.points"
                :img="item.img"
                :owned="true"
                :click="purchase"
                message="Owned"
              />
            </div>
          </div>
          <div
            class="flex flex-col w-full overflow-clip gap-2"
            :class="[
              themeExpanded ? 'hidden' : '',
              borderExpanded ? 'hidden' : '',
            ]"
          >
            <div class="flex justify-between items-center">
              <h4 class="text-2xl">Name tags</h4>
              <button
                class="btn btn-sm btn-primary"
                @click="toggleNameTagExpand"
              >
                See {{ nameTagExpanded ? "less" : "more" }}
              </button>
            </div>
            <div
              class="flex flex-row w-full h-full gap-2 overflow-x-auto transition-all duration-150"
              :class="[nameTagExpanded ? 'flex-wrap' : '']"
            >
              <NameTagComponent
                v-for="item in nameTags"
                :key="item"
                :name="item.name"
                :points="item.points"
                :img="item.img"
                :owned="true"
                :click="purchase"
                message="Owned"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Modal for confirming a purchase -->
      <dialog id="shoppingModal" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 class="text-lg font-bold">Buy {{ puchaseItem }}</h3>
          <p class="py-4">Confirm your purchase of the following item:</p>
          <ThemeDisplayComponent
            v-if="purchaseItemType == 'theme'"
            :name="purchaseItem.name"
            :theme="purchaseItem.theme"
            :points="purchaseItem.points"
            :owned="false"
          />
          <BorderComponent
            v-if="purchaseItemType == 'border'"
            :name="purchaseItem.name"
            :points="purchaseItem.points"
            :img="purchaseItem.img"
            :owned="false"
          />
          <NameTagComponent
            v-if="purchaseItemType == 'nameTag'"
            :name="purchaseItem.name"
            :points="purchaseItem.points"
            :img="purchaseItem.img"
            :owned="false"
          />
          <div class="flex w-full justify-end gap-2">
            <button class="btn btn-error" onclick="shoppingModal.close()">
              Cancel
            </button>
            <button class="btn btn-primary" @click="purchaseConfirm">
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  </dialog>
</template>

<script setup lang="jsx">
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

const borders = [
  { name: "Border 1", points: 500, img: "/borders/border1.jpg" },
  { name: "Border 2", points: 500, img: "/borders/border2.jpg" },
  { name: "Border 3", points: 500, img: "/borders/border3.jpg" },
  { name: "Border 4", points: 500, img: "/borders/border4.jpg" },
];

const nameTags = [
  { name: "Nametag 1", points: 500, img: "/nameTags/tag1.jpg" },
  { name: "Nametag 2", points: 500, img: "/nameTags/tag2.jpg" },
];

const themeExpanded = ref(false);
const borderExpanded = ref(false);
const nameTagExpanded = ref(false);

// Purchasing
const purchaseItem = ref({
  name: "purchase",
  theme: "dark",
  points: 500,
  img: "/borders/border1.jpg",
  owned: false
});
const purchaseItemType = ref("");

function toggleThemeExpand() {
  themeExpanded.value = !themeExpanded.value;
}

function toggleBorderExpand() {
  borderExpanded.value = !borderExpanded.value;
}

function toggleNameTagExpand() {
  nameTagExpanded.value = !nameTagExpanded.value;
}

function purchase(item, type) {
  purchaseItem.value = item;
  purchaseItemType.value = type;
  // console.log(purchaseItem)
  shoppingModal.showModal();
}

function purchaseConfirm() {
  console.log("Purchased", purchaseItem.value);
}
</script>
