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
                :name="theme.name"
                :theme="theme.theme"
                :points="theme.points"
                :owned="theme.owned"
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
          <h3 class="text-lg font-bold">Buy {{ purchaseItemName }} {{ purchaseItemType }}</h3>
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
          <p v-if="purchaseItem.points > rewardPoints" class="text-error">
            You do not have enough points to buy this!
          </p>
          <p v-if="purchaseItem.owned" class="text-error">
            You already own this item!
          </p>
          <div class="flex w-full justify-end gap-2">
            <button class="btn btn-error" onclick="shoppingModal.close()">
              Cancel
            </button>
            <button
              class="btn btn-primary"
              :class="[purchaseItem.owned || purchaseItem.points > rewardPoints ? 'btn-disabled' : '']"
              @click="purchaseConfirm"
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  </dialog>
  <BackendProfile ref="backendProfile" />
  <BackendShop ref="backendShop" />
</template>

<script setup lang="jsx">
// Backend Profile Component
const backendProfile = ref(null);
const backendShop = ref(null);
const rewardPoints = ref(0);

const themes = ref([]);

const borders = ref([]);

const nameTags = ref([]);

const themeExpanded = ref(false);
const borderExpanded = ref(false);
const nameTagExpanded = ref(false);

// Purchasing
const purchaseItem = ref({
  name: "purchase",
  theme: "dark",
  points: 500,
  img: "/borders/border1.jpg",
  owned: false,
});
const purchaseItemName = ref("");
const purchaseItemType = ref("");

onMounted(() => {
  // Get reward points from backend
  console.log(backendProfile.value.getProfileData());
  rewardPoints.value = backendProfile.value.getProfileData().rewardPoints;

  // Get themes from backend
  themes.value = backendShop.value.getThemeList();
  console.log(themes.value);

  // Get borders from backend
  borders.value = backendShop.value.getBordersList();

  // Get name tags from backend
  nameTags.value = backendShop.value.getNameTagsList();
});

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
  purchaseItemName.value = item.name;
  purchaseItemType.value = type;
  // console.log(purchaseItem)
  shoppingModal.showModal();
}

function purchaseConfirm() {
  console.log("Purchased", purchaseItem.value);
}
</script>
