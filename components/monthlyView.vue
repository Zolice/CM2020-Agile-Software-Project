<template>
  <div
    class="body-container shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col my-2 w-full"
  >
    <!-- Day Names -->
    <div
      class="dayNames-container grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-s leading-6 text-black"
    >
      <div
        v-for="dayName in dayNames"
        :key="year + '-' + months[month] + '-' + dayName"
        :class="[
          'dayName text-center font-semibold bg-accent bg-opacity-50 py-2 lg:flex-none',
          dayName,
        ]"
      >
        <h5>{{ dayName }}</h5>
      </div>
    </div>
    <!-- Dates -->
    <div class="dates-container grid grid-cols-7 gap-px">
      <div
        v-for="date in previousDates"
        :id="year + '-' + month + '-' + date.date"
        :key="year + '-' + months[month] + '-' + date.date"
        :class="[
          'date relative bg-base-200 px-2 py-2 w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px ',
          dayNames[date.day],
        ]"
        :style="`grid-area: 1/${date.day + 1}/span 1/span 1`"
      >
        {{ date.date }}
      </div>
      <div
        v-for="date in dates"
        :id="year + '-' + month + '-' + date.date"
        :key="year + '-' + months[month] + '-' + date.date"
        :class="[
          'date relative bg-base-100 px-2 py-2 w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px',
          dayNames[date.day],
        ]"
        :style="`grid-area: ${
          date.date > firstSatDate
            ? Math.ceil((date.date - firstSatDate) / 7) + 1
            : 1
        }/${date.day + 1}/span 1/span 1`"
      >
        {{ date.date }}
        <!-- Task view on calendar  -->
        <!-- starting for grid area  -->
         <!-- grid-area:row-start/col-start/col-span/row-span -->
         <!-- row-start should increase by one for each task of the day  -->
        <a href="#" style="grid-area: 2/1/span 1/span 7;" class="flex flex-row bg-white rounded-md hover:text-secondary my-0.5">
          <!-- Left side Priority Border -->
           <!-- Colour will change based on the priority of the task -->
           <div class="bg-red-400 h-full rounded-l-md" style="width: 4%;"></div>
           <!-- content and bottom priority border -->
            <div class="h-full flex-col" style="width:96%;">
              <!-- content -->
               <div class="w-full flex flex-row px-1 justify-between" style="height:80%;">
                <!-- name -->
                 <p class="flex-auto truncate align-middle"> testing task 2 alskdalskdjalskdjas  </p>
                 <!-- time -->
                  <time datetime=""class="flex-none ">1PM</time>
               </div>
              <!-- Bottom border -->
               <div class=" w-full bg-red-400 rounded-br-md" style="height:20%;"></div>
            </div>
        </a>
        
        
        
      </div>
      <div
        v-for="date in nextDates"
        :id="year + '-' + month + '-' + date.date"
        :key="year + '-' + months[month] + '-' + date.date"
        :class="[
          'date relative bg-base-200 px-2 py-2 w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px',
          dayNames[date.day],
        ]"
        :style="`grid-area: ${Math.ceil((31 - firstSatDate) / 7) + 1}
        /${date.day + 1}/span 1/span 1`"
      >
        <h5></h5>
        {{ date.date }}
        
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
defineProps({
  months: Array,
  dayNames: Array,
  dates: Array,
  previousDates: Array,
  nextDates: Array,
  firstSatDate: Number,
  year: Number,
  month: Number,
});
</script>
