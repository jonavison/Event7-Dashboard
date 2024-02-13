<script lang="ts">
import EventCard from '@/components/events/EventCard.vue'
import axios from 'axios'
import { computed, defineProps, reactive } from 'vue'

export default {
  name: 'EventDetails',
  components: {
    EventCard
  },
  setup() {
    // Define the props for the component
    const props = defineProps<{
      event: {
        id: number // other properties of the event object
      }
    }>()

    // Create a reactive object for the event data
    const eventData = reactive({
      id: props.event.id
      // other properties of the event object
    })

    // Create a computed property that returns the event data
    const event = computed(() => {
      return eventData
    })

    // Create a reactive object for the loading state
    const loadingState = reactive({
      loading: true
    })

    // Create a computed property that returns the loading state
    const loading = computed(() => {
      return loadingState.loading
    })

    // Create a method that gets the event data from the server
    const getEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/analytics/${props.event.id}`)

        // Set the event data in the eventData reactive object
        Object.assign(eventData, response.data)
      } catch (error) {
        console.error(error)
      } finally {
        // Set the loading state to false
        loadingState.loading = false
      }
    }

    // Call the getEventData method in the created hook
    getEventData()

    return {
      event,
      loading
    }
  }
}
</script>

<template>
  <div>
    <EventCard v-if="!loading && event" :event="event" />

    <p v-else-if="loading">Loading event data...</p>

    <p v-else>Event data not found.</p>
  </div>
</template>
