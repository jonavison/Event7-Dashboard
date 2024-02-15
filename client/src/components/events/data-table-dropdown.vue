<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { MoreHorizontal } from 'lucide-vue-next'
import IconSpinner from '../icons/IconSpinner.vue'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogClose,
  DialogTitle
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

defineProps<{
  events: {
    id: string
  }
}>()

const loading = ref(false)
const success = ref(false)
const handleDelete = async (event: { id: string }) => {
  loading.value = true // Set loading to true during delete operation

  // Display loading spinner for at least 3 seconds
  setTimeout(async () => {
    try {
      // Perform delete operation after 3 seconds
      await axios.delete(`http://localhost:3000/events/${event.id}`)
      // Show success toast
      // toast.success('Event deleted successfully')
      success.value = true
    } catch (error) {
      console.error(error)
      // Show error toast
      // toast.error('Error deleting event')
    } finally {
      loading.value = false // Reset loading state after delete operation
    }
  }, 3000)
}
</script>

<template>
  <Dialog>
    <DropdownMenu>
      <!-- Dropdown menu trigger button -->
      <DropdownMenuTrigger class="" as-child>
        <Button variant="ghost" class="w-8 h-8 p-0">
          <span class="sr-only">Open menu</span>
          <MoreHorizontal class="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <!-- Dropdown menu content -->
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <!-- View Event menu item -->
        <DropdownMenuItem>
          <RouterLink :to="`/events/${events.id}`">View Event</RouterLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DialogTrigger> Delete </DialogTrigger>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <DialogContent class="max-w-xs flex-justify-center text-center">
      <DialogHeader class="mb-4 text-center flex">
        <DialogTitle v-if="!success">Are you sure?</DialogTitle>
        <DialogDescription v-if="!success">Changes cannot be undone...</DialogDescription>
        <DialogTitle v-if="!loading && success">Event Deleted Successfully</DialogTitle>
      </DialogHeader>

      <Button v-if="!success" variant="destructive" @click="handleDelete(events)">
        <span v-if="!loading">Delete</span>
        <IconSpinner v-else class="animate-spin" aria-hidden="true"></IconSpinner>
      </Button>
    </DialogContent>
    <DialogClose />
  </Dialog>
</template>
