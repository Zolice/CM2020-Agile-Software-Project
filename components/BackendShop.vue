<template>
  <BackendProfile ref="backendProfile" />
</template>

<script setup lang="jsx">
// Add backend profile component to access its functions
const backendProfile = ref(null);

// List of all themes
const themes = [
  { name: "Light", theme: "light", points: 0, owned: false },
  { name: "Dark", theme: "dark", points: 0, owned: false },
  { name: "Black", theme: "black", points: 100, owned: false },
  { name: "Dim", theme: "dim", points: 200, owned: false },
  { name: "Aqua", theme: "aqua", points: 350, owned: false },
  { name: "Night", theme: "night", points: 400, owned: false },
  { name: "Valentine", theme: "valentine", points: 400, owned: false },
  { name: "Cupcake", theme: "cupcake", points: 450, owned: false },
  { name: "Pastel", theme: "pastel", points: 450, owned: false },
  { name: "Tutti Frutti", theme: "tuttifrutti", points: 450, owned: false },
  { name: "Coffee", theme: "coffee", points: 450, owned: false },
  { name: "Bumblebee", theme: "bumblebee", points: 500, owned: false },
  { name: "Autumn", theme: "autumn", points: 500, owned: false },
  { name: "Lemonade", theme: "lemonade", points: 500, owned: false },
  { name: "Dark Green", theme: "darkgreen", points: 500, owned: false },
  { name: "Light Green", theme: "lightgreen", points: 500, owned: false },
  { name: "Garden", theme: "garden", points: 550, owned: false },
  { name: "Cmyk", theme: "cmyk", points: 550, owned: false },
  { name: "Strawberries", theme: "sweetberries", points: 600, owned: false },
  { name: "Forest", theme: "forest", points: 600, owned: false },
  { name: "Business", theme: "business", points: 600, owned: false },
  { name: "Winter", theme: "winter", points: 600, owned: false },
  { name: "Corporate", theme: "corporate", points: 600, owned: false },
  { name: "Retro", theme: "retro", points: 650, owned: false },
  { name: "Acid", theme: "acid", points: 650, owned: false },
  { name: "Nord", theme: "nord", points: 650, owned: false },
  { name: "Emerald", theme: "emerald", points: 700, owned: false },
  { name: "Sunset", theme: "sunset", points: 750, owned: false },
  { name: "Magentamoment", theme: "magentamoment", points: 750, owned: false },
  { name: "Halloween", theme: "halloween", points: 850, owned: false },
  { name: "Desire", theme: "desire", points: 850, owned: false },
  { name: "Synthwave", theme: "synthwave", points: 900, owned: false },
  { name: "Fantasy", theme: "fantasy", points: 950, owned: false },
  { name: "Cyberpunk", theme: "cyberpunk", points: 1000, owned: false },
  { name: "Dracula", theme: "dracula", points: 1000, owned: false },
  { name: "Luxury", theme: "luxury", points: 1200, owned: false },
];

// List of all borders
const borders = [
  {
    id: 1,
    name: "Cat Ears",
    points: 400,
    owned: false,
    img: "/borders/cat-ears.png",
  },
  {
    id: 2,
    name: "Flower",
    points: 200,
    owned: false,
    img: "/borders/flower.png",
  },
  {
    id: 3,
    name: "Leaf",
    points: 150,
    owned: false,
    img: "/borders/leaf.png",
  },
  {
    id: 4,
    name: "Neon",
    points: 300,
    owned: false,
    img: "/borders/neon.png",
  },
  {
    id: 5,
    name: "Red Glitch",
    points: 400,
    owned: false,
    img: "/borders/red-glitch.png",
  },
  {
    id: 6,
    name: "Red Neon",
    points: 900,
    owned: false,
    img: "/borders/red-neon.png",
  },
  {
    id: 7,
    name: "Under the Sea",
    points: 700,
    owned: false,
    img: "/borders/underthesea.png",
  },
];

// List of all name tags
const nameTags = [
  {
    id: 1,
    name: "Clouds",
    points: 200,
    owned: false,
    img: "/nameTags/clouds.png",
    text: "#ffffff",
  },
  {
    id: 2,
    name: "Food",
    points: 400,
    owned: false,
    img: "/nameTags/food.png",
    text: "#000000",
  },
  {
    id: 3,
    name: "Frog",
    points: 100,
    owned: false,
    img: "/nameTags/frog.png",
    text: "#00482c",
  },
  {
    id: 4,
    name: "Neon",
    points: 800,
    owned: false,
    img: "/nameTags/neon.png",
    text: "#ec6df5"
  },
];

/**
 * Get the list of themes with owned status
 *
 * @returns {Array} List of themes
 */
function getThemeList() {
  // Get owned themes from profile
  const owned = backendProfile.value.getProfileData().themes;

  // Make a copy of the list of themes to work on
  const themeList = themes;

  // If you get an error here, go into localStorage and
  // delete the data for key: `profileData`
  owned.forEach((ownedTheme) => {
    // Update owned status of themes
    themeList.forEach((theme) => {
      if (theme.name === ownedTheme.name) {
        theme.owned = true;
      }
    });
  });
  return themeList;
}

function getBordersList() {
  // Get owned borders from profile
  const owned = backendProfile.value.getProfileData().borders;

  // Make a copy of the list of borders to work on
  const borderList = borders;

  // for each owned border
  owned.forEach((ownedBorder) => {
    // Update owned status of borders
    borderList.forEach((border) => {
      if (border.name === ownedBorder.name) {
        border.owned = true;
      }
    });
  });
  return borderList;
}

function getNameTagsList() {
  // Get owned name tags from profile
  const owned = backendProfile.value.getProfileData().nametags;

  // Make a copy of the list of name tags to work on
  const nameTagList = nameTags;

  // for each owned name tag
  owned.forEach((ownedNameTag) => {
    // Update owned status of name tags
    nameTagList.forEach((nameTag) => {
      if (nameTag.name === ownedNameTag.name) {
        nameTag.owned = true;
      }
    });
  });
  return nameTagList;
}

defineExpose({
  getThemeList,
  getBordersList,
  getNameTagsList,
});
</script>
