<script setup lang="jsx">
import ical from "node-ical";
// import ical from 'ical'

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
 * Set the date format setting
 *
 * @param {String} value - Date format setting
 */
function setDateFormat(value) {
  // Update all settings from localsettings first
  settings = getSettings();

  // Update the date format setting
  settings.dateFormat = value;
  saveSettings();
}

/**
 * Set the time format setting
 *
 * @param {String} value - Time format setting
 */
function setTimeFormat(value) {
  // Update all settings from localsettings first
  settings = getSettings();

  // Update the time format setting
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

async function importCalendarURL(url) {
  try {
    // Use a proxy server to bypass CORS issues
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const fetchUrl = proxyUrl + url;

    // Log the URL being fetched
    console.log("Importing calendar from", fetchUrl);

    // Perform the fetch request
    const response = await fetch(fetchUrl);

    // Check if the response is not OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the response text
    const calendar = await response.text();

    // Parse the calendar
    const parsedCalendar = ical.sync.parseICS(calendar);

    return parsedCalendar;
  } catch (error) {
    // Log the error with more details
    console.error("Failed to import calendar:", error.message);
  }
}

function importCalendarFile(file) {
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
  calendars[name] = { colour: colour, calendar: calendar };

  // Save the updated calendars
  localStorage.setItem("calendars", JSON.stringify(calendars));

  return { success: true };
}

defineExpose({
  getSettings,
  getTheme,
  setShowWeekend,
  setStartWeekOn,
  setDateFormat,
  setTimeFormat,
  importCalendarURL,
  importCalendarFile,
  createCalendar,
});
</script>
