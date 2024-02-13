<script setup lang="ts">
import { ref } from 'vue'
import EventCard from '@/components/events/EventCard.vue'
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
  <div class="grid gap-10 z-10">
    <div class="text-xl rounded-lg font-medium text-primary p-4 bg-background">Recently Added</div>
    <div class="grid grid-flow-col">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    <div class="text-xl rounded-lg font-medium p-4 text-primary bg-background">
      High priority Events
    </div>
    <div class="grid grid-flow-col">
      <EventCard />
    </div>
    <!-- Render the Events data here -->
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;

  margin-bottom: 10px;
}
</style>
