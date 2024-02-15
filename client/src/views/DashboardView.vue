<script setup lang="ts">
import { ref } from 'vue'
import EventCard from '@/components/events/EventCard.vue'
import axios from 'axios'
// interface Event {
//   id: string
//   name: string
//   priority: number
//   type: 'crosspromo' | 'liveops' | 'app' | 'ads'
//   description: string
// }

// // Use the correct interface name in ref
// const events = ref<Event[]>([])
// const findOneById = async (id: string) => {
//   try {
//     const response = await axios.get<Event>(`http://localhost:3000/events/${id}`)
//     // Assuming the response data is the event object
//     const event = response.data
//     // Update the events array with the retrieved event
//     events.value.push(event)
//   } catch (error) {
//     console.error('Error fetching event by ID:', error)
//   }
// }
// findOneById('your-event-id')
</script>

<template>
  <div class="grid gap-10 z-10">
    <!-- <div class="text-xl rounded-lg font-medium text-primary p-4 bg-background">Recently Added</div>
    <div class="grid grid-flow-col">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    <div class="text-xl rounded-lg font-medium p-4 text-primary bg-background">
      High priority Events
    </div> -->
    <!-- Render the Events data here -->
  </div>
</template>

<style scoped>
h1 {
  font-size: 24px;

  margin-bottom: 10px;
}
</style>
