<template>
  <div class="event">
    <h2>{{ event.name }}</h2>

    <p>{{ event.description }}</p>

    <p>Type: {{ event.type }}</p>

    <p>Priority: {{ event.priority }}</p>

    <button @click="editEvent">Edit</button>

    <button @click="deleteEvent">Delete</button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    event: {
      type: Object,

      required: true
    }
  },

  methods: {
    editEvent() {
      this.$emit('edit-event', this.event)
    },

    deleteEvent() {
      this.$emit('delete-event', this.event)
    }
  }
}
</script>

<style scoped>
.event {
  border: 1px solid #ccc;

  padding: 1rem;

  margin-bottom: 1rem;
}
</style>
