<script setup lang="jsx">
let settings = {};

/**
 * Default settings for the application
 *
 * @returns {Object} Default settings
 */
function defaultSettings() {
  return {
    showWeekend: true,
    startWeekOn: "Sunday",
    dateFormat: "DD-MM-YY",
    timeFormat: "12-Hour-Time",
  };
}

onMounted(() => {
  // Load settings from local storage
  getSettings();

  // Update the settings
  saveSettings();
});

/**
 * Get the current settings from local storage
 * If no settings are found, return the default settings
 *
 * @returns {Object} Current settings
 */
function getSettings() {
  settings = JSON.parse(localStorage.getItem("settings")) || defaultSettings();
  return settings;
}

/**
 * Saves the settings in local storage
 */
function saveSettings() {
  localStorage.setItem("settings", JSON.stringify(settings));
  console.log("Settings saved", settings);
}

/**
 * Set the show weekend setting
 *
 * @param {Boolean} value - Show weekend setting
 */
function setShowWeekend(value) {
  settings.showWeekend = value;
  saveSettings();
}

/**
 * Set the start week on setting
 * 
 * @param {String} value - Start week on setting
 */
function setStartWeekOn(value) {
  settings.startWeekOn = value;
  saveSettings();
}

/**
 * Set the date format setting
 * 
 * @param {String} value - Date format setting
 */
function setDateFormat(value) {
  console.log(value)
  settings.dateFormat = value;
  saveSettings();
}

/**
 * Set the time format setting
 * 
 * @param {String} value - Time format setting
 */
function setTimeFormat(value) {
  settings.timeFormat = value;
  saveSettings();
}

/**
 * Get the current theme
 * 
 * @returns {String} Current theme
 */
function getTheme() {
  return localStorage.getItem("theme") || "dark";
}

defineExpose({
  getSettings,
  getTheme,
  setShowWeekend,
  setStartWeekOn,
  setDateFormat,
  setTimeFormat,
});
</script>
