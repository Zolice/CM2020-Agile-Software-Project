<template>
  <BackendProfile ref="backendProfile" />
</template>

<script setup lang="jsx">
const backendProfile = ref(null);

const themes = [
  { name: "Light", theme: "light", points: 500, owned: false },
  { name: "Dark", theme: "dark", points: 500, owned: false },
  { name: "Cupcake", theme: "cupcake", points: 500, owned: false },
  { name: "Bumblebee", theme: "bumblebee", points: 500, owned: false },
  { name: "Emerald", theme: "emerald", points: 500, owned: false },
  { name: "Corporate", theme: "corporate", points: 500, owned: false },
  { name: "Synthwave", theme: "synthwave", points: 500, owned: false },
  { name: "Retro", theme: "retro", points: 500, owned: false },
  { name: "Cyberpunk", theme: "cyberpunk", points: 500, owned: false },
  { name: "Valentine", theme: "valentine", points: 500, owned: false },
  { name: "Halloween", theme: "halloween", points: 500, owned: false },
  { name: "Garden", theme: "garden", points: 500, owned: false },
  { name: "Forest", theme: "forest", points: 500, owned: false },
  { name: "Aqua", theme: "aqua", points: 500, owned: false },
  { name: "Lofi", theme: "lofi", points: 500, owned: false },
  { name: "Pastel", theme: "pastel", points: 500, owned: false },
  { name: "Fantasy", theme: "fantasy", points: 500, owned: false },
  { name: "Wireframe", theme: "wireframe", points: 500, owned: false },
  { name: "Black", theme: "black", points: 500, owned: false },
  { name: "Luxury", theme: "luxury", points: 500, owned: false },
  { name: "Dracula", theme: "dracula", points: 500, owned: false },
  { name: "Cmyk", theme: "cmyk", points: 500, owned: false },
  { name: "Autumn", theme: "autumn", points: 500, owned: false },
  { name: "Business", theme: "business", points: 500, owned: false },
  { name: "Acid", theme: "acid", points: 500, owned: false },
  { name: "Lemonade", theme: "lemonade", points: 500, owned: false },
  { name: "Night", theme: "night", points: 500, owned: false },
  { name: "Coffee", theme: "coffee", points: 500, owned: false },
  { name: "Winter", theme: "winter", points: 500, owned: false },
  { name: "Dim", theme: "dim", points: 500, owned: false },
  { name: "Nord", theme: "nord", points: 500, owned: false },
  { name: "Sunset", theme: "sunset", points: 500, owned: false },
];

const borders = [
  { name: "Border 1", points: 500, owned: false, img: "/borders/border1.jpg" },
  { name: "Border 2", points: 500, owned: false, img: "/borders/border2.jpg" },
  { name: "Border 3", points: 500, owned: false, img: "/borders/border3.jpg" },
  { name: "Border 4", points: 500, owned: false, img: "/borders/border4.jpg" },
];

const nameTags = [
  { name: "Nametag 1", points: 500, img: "/nameTags/tag1.jpg", owned: false },
  { name: "Nametag 2", points: 500, img: "/nameTags/tag2.jpg", owned: false },
];
function getThemeList() {
  // Get owned themes from profile
  const owned = backendProfile.value.getProfileData().themes;
  console.log(owned);

  // make a copy of themes
  let themeList = themes;
  console.log(themeList);

  // for each owned theme
  owned.forEach((ownedTheme) => {
    // Update owned status of themes
    themeList.forEach((theme) => {
      if (theme.name === ownedTheme.name) {
        theme.owned = true;
      }
    });
  });
  console.log(themeList);
  return themeList;
}

function getBordersList() {
  // Get owned borders from profile
  const owned = backendProfile.value.getProfileData().borders;
  console.log(owned);

  // make a copy of borders
  let borderList = borders;
  console.log(borderList);

  // for each owned border
  owned.forEach((ownedBorder) => {
    // Update owned status of borders
    borderList.forEach((border) => {
      if (border.name === ownedBorder.name) {
        border.owned = true;
      }
    });
  });
  console.log(borderList);
  return borderList;
}

function getNameTagsList() {
  // Get owned name tags from profile
  const owned = backendProfile.value.getProfileData().nametags;
  console.log(owned);

  // make a copy of name tags
  let nameTagList = nameTags;
  console.log(nameTagList);

  // for each owned name tag
  owned.forEach((ownedNameTag) => {
    // Update owned status of name tags
    nameTagList.forEach((nameTag) => {
      if (nameTag.name === ownedNameTag.name) {
        nameTag.owned = true;
      }
    });
  });
  console.log(nameTagList);
  return nameTagList;
}

defineExpose({
  getThemeList,
  getBordersList,
  getNameTagsList,
});
</script>
