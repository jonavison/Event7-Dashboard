<script setup lang="ts">
import { ref } from 'vue'
import EventCard from '@/components/cards/EventCard.vue'

// Correct the typo in the interface name
interface Event {
  id: string
  name: string
  priority: number
  type: 'crosspromo' | 'liveops' | 'app' | 'ads'
  description: string
}

// Use the correct interface name in ref
const events = ref<Event[]>([])

fetch('http://localhost:3000/events')
  .then((response) => response.json())
  .then((data: Event[]) => {
    // Specify the type of data received
    events.value = data
  })
  .catch((error) => {
    console.error('Error fetching events:', error)
  })
</script>

<template>
  <!-- Check if events array has any items -->
  <div v-if="events.length">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
  <div v-else>Loading event data...</div>
</template>
