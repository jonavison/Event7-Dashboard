<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

import { RouterLink } from 'vue-router'
import { MoreHorizontal } from 'lucide-vue-next'

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

const handleDelete = async (event: { id: string }) => {
  loading.value = true // Set loading to true during delete operation
  try {
    await axios.delete(`http://localhost:3000/events/${event.id}`)
    // Show success toast
    // toast.success('Event deleted successfully')
  } catch (error) {
    console.error(error)
    // Show error toast
    // toast.error('Error deleting event')
  } finally {
    loading.value = false // Reset loading state after delete operation
  }
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
          <DialogTrigger>
            <span>Delete</span>
            <!-- Wrap text with a span -->
          </DialogTrigger>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <DialogContent class="max-w-xs flex-justify-center text-center">
      <DialogHeader class="mb-4 text-center flex">
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>Changes cannot be undone...</DialogDescription>
      </DialogHeader>

      <!-- Show loading spinner if loading is true -->
      <template v-if="loading">
        <div class="flex items-center justify-center h-12">
          <IconSpinner class="animate-spin h-8 w-8 text-primary" />
        </div>
      </template>
      <!-- Show delete button if not loading -->
      <template v-else>
        <Button variant="destructive" @click="handleDelete(events)">Delete</Button>
      </template>
    </DialogContent>

    <!-- Add close button and listen for the close event -->
    <DialogClose as-child />
  </Dialog>
</template>
