<template>
  <BackendProfile ref="backendProfile" />
</template>

<script setup lang="jsx">
import ical from "ical";

const backendProfile = ref(null)

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
}

/**
 * Set the show weekend setting
 *
 * @param {Boolean} value - Show weekend setting
 */
function setShowWeekend(value) {
  // Update all settings from localsettings first
  settings = getSettings();

  // Update the show weekend setting
  settings.showWeekend = value;
  saveSettings();
}

/**
 * Set the start week on setting
 *
 * @param {String} value - Start week on setting
 */
function setStartWeekOn(value) {
  // Update all settings from localsettings first
  settings = getSettings();

  // Update the start week on setting
  settings.startWeekOn = value;
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

/**
 * Get the available themes
 * 
 * @returns {Array} Available themes
 */
function getAvailableThemes() {
  // get profile data from backend profile
  const profileData = backendProfile.value.getProfileData();
  
  // get currently applied theme
  const currentTheme = getTheme();

  // add applied=true to the current theme
  profileData.themes.forEach((theme) => {
    if (theme.theme === currentTheme) {
      theme.applied = true;
    } else {
      theme.applied = false;
    }
  });

  // return the themes
  return profileData.themes
}

function importCalendar(file) {
  const calendar = ical.parseICS(file);
  return calendar;
}

function createCalendar(name, calendar, colour) {
  // Get calendar from local storage
  const calendars = JSON.parse(localStorage.getItem("calendars")) || {};

  // Check if calendar already exists
  if (calendars[name]) {
    return { error: "Calendar already exists" };
  }

  // Add the new calendar
  calendars[name] = { colour: colour, display: true, calendar: calendar };

  // Save the updated calendars
  localStorage.setItem("calendars", JSON.stringify(calendars));

  return { success: true };
}

function getCalendars() {
  // Get calendar from local storage
  return JSON.parse(localStorage.getItem("calendars")) || {};
}

function addEvent(calendar, event) {
  // Get calendar from local storage
  const calendars = getCalendars();

  // Add the event to the calendar
  calendars[calendar].calendar[event.uid] = event;

  // Save the updated calendars
  localStorage.setItem("calendars", JSON.stringify(calendars));
}

function resetAllSettings() {
  localStorage.removeItem("settings");
  localStorage.removeItem("theme");
  localStorage.removeItem("calendars");
  localStorage.removeItem("userName");
  localStorage.removeItem("profileData");
  localStorage.removeItem("selectedBadges");
  localStorage.removeItem("selectedNametag");
  localStorage.removeItem("streak");
  localStorage.removeItem("highestStreak");
}

defineExpose({
  getSettings,
  getTheme,
  getAvailableThemes,
  setShowWeekend,
  setStartWeekOn,
  importCalendar,
  createCalendar,
  getCalendars,
  addEvent,
  resetAllSettings,
});
</script>
