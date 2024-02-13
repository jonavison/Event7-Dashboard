<script setup lang="ts">
import EventCard from '@/components/events/EventCard.vue'
import { ref } from 'vue'

import axios from 'axios'

const events = ref([])

async function fetchEvents() {
  const response = await axios.get('http://localhost:3000/events')

  events.value = response.data
}

fetchEvents()
</script>

<template>
  <EventCard />
</template>
