<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import EventCard from '@/components/events/EventCard.vue'

import axios from 'axios'
interface Event {
  id: number
  name: string
  priority: number
  type: 'crosspromo' | 'liveops' | 'app' | 'ads'
  description: string
}

const event = ref<Event | null>(null)
onMounted(async () => {
  const route = useRoute()

  const eventId = route.params.id as string

  try {
    const response = await axios.get<Event>(`http://localhost:3000/events/${eventId}`)

    event.value = response.data
  } catch (error) {
    console.error('Error fetching event:', error)

    alert('Failed to fetch event. Please try again.')
  }
})
</script>
<template>
  <div v-if="event">
    <!-- Render the EventCard component with the fetched event data -->
    <EventCard
      :id="event.id"
      :name="event.name"
      :priority="event.priority"
      :description="event.description"
      :type="event.type"
    />
  </div>

  <div v-else>Loading event data...</div>
</template>
