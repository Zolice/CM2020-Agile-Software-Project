<template>
    <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">{{ title }}</h1>
                <p class="py-6">{{ msg }}</p>
                <button class="btn btn-primary" @click="click">Get Started</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'

// Define props
const props = defineProps({
    title: String,
    msg: String
})

// Define variables
const title = ref(props.title)
const msg = ref(props.msg )

// Define function
const click = function () {
    console.log('Button was clicked!')

    // Change the message
    msg.value = "Button was clicked!"
}

</script>