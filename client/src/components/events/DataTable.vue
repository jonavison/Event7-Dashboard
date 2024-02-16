<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from '@/components/ui/table'
import DataTableDropDown from './data-table-dropdown.vue'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components//ui/badge'

import { getPriorityColor, toTitleCase } from '@/lib/utils'
import { PlusCircle } from 'lucide-vue-next'

import AddEventForm from '../forms/AddEventForm.vue'

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

interface Event {
  id: string
  name: string
  priority: number
  type: 'crosspromo' | 'liveops' | 'app' | 'ads'
  description: string
}

const events = ref<Event[]>([])

// Fetch all events from the server
const getEvents = async (type?: Event['type']) => {
  try {
    // Make a GET request to fetch events by type if provided, otherwise fetch all events
    const url = type ? `http://localhost:3000/events?type=${type}` : 'http://localhost:3000/events'
    const response = await axios.get<Event[]>(url)
    // Update the events reference with the response data
    events.value = response.data
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}

// handle the type of event
const handleTypeFilter = (type: Event['type']) => {
  getEvents(type)
}

// Call getEvents with no type parameter to fetch all events
onMounted(() => {
  getEvents()
})
</script>
<template>
  <div class="w-full">
    <div class="flex justify-between py-2">
      <div class="grid grid-flow-col gap-2 max-w-2xl">
        <!-- <Button variant="outline" size="sm" @click="handleTypeFilter('')"> View All </Button> -->
        <Button variant="outline" size="sm" @click="handleTypeFilter('crosspromo')">
          Crosspromo
        </Button>
        <Button variant="outline" size="sm" @click="handleTypeFilter('liveops')"> LiveOps </Button>
        <Button variant="outline" size="sm" @click="handleTypeFilter('app')"> App </Button>
        <Button variant="outline" size="sm" @click="handleTypeFilter('ads')"> Ads </Button>
      </div>
      <div class="grid grid-flow-col gap-2 max-w-2xl"></div>
      <Dialog>
        <DialogTrigger
          :class="[buttonVariants({ variant: 'default', size: 'sm' }), 'flex border-2']"
          ><PlusCircle class="mr-2 h-4 w-4" />Add Event</DialogTrigger
        >
        <DialogContent>
          <AddEventForm />
        </DialogContent>
      </Dialog>
    </div>
    <Table>
      <TableCaption>A list of your recent events.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-32"> Type </TableHead>
          <TableHead class="w-24 cursor-pointer hover:text-foreground"> Priority </TableHead>
          <TableHead class="w-52">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead class="text-right"> Edit </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="event in events" :key="event.id" class="hover:bg-slate-200">
          <TableCell class="font-medium">{{ toTitleCase(event.type) }}</TableCell>
          <TableCell class="font-medium">
            <Badge class="" :class="getPriorityColor(event.priority)">
              {{ event.priority }}
            </Badge>
          </TableCell>
          <TableCell class="font-medium">{{ event.name }}</TableCell>
          <TableCell class="font-medium">{{ event.description }}</TableCell>
          <TableCell class="text-right"> <DataTableDropDown :events="event" /></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
