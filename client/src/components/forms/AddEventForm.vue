<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import SpinnerIcon from '@/components/icons/IconSpinner.vue'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const event = ref({
  name: '',
  priority: '',
  type: '',
  description: ''
})

const isPending = ref(false)

const onSubmit = async () => {
  isPending.value = true
  try {
    await axios.post('http://localhost:3000/events', event.value)
    alert('Event created successfully!')
  } catch (error) {
    console.error('Error creating event:', error)
    alert('Failed to create event. Please try again.')
  } finally {
    isPending.value = false
  }
}
</script>

<template>
  <form @submit="onSubmit" class="grid gap-5 p-2">
    <h2 class="text-xl font-medium mb-4">Create an Event</h2>
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>

        <FormControl>
          <Input type="text" placeholder="Event Name" v-bind="componentField" />
        </FormControl>

        <FormMessage />
      </FormItem>
    </FormField>
    <div class="grid grid-cols-2 gap-4 justify-stretch">
      <FormField v-slot="{ componentField }" name="type">
        <FormItem>
          <FormLabel>Type</FormLabel>

          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="crosspromo"> Crosspromo </SelectItem>

                  <SelectItem value="liveops"> Liveops </SelectItem>

                  <SelectItem value="app"> App </SelectItem>

                  <SelectItem value="ads"> Ads </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex justify-end">
        <FormField v-slot="{ componentField }" name="priority">
          <FormItem>
            <FormLabel>Priority</FormLabel>

            <FormControl>
              <Select v-bind="componentField" class="">
                <SelectTrigger>
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="index in 10" :value="`${index}`" :key="index" as="number">
                      {{ index }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>

        <FormControl>
          <Textarea v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <Button :disabled="isPending" type="submit">
      <SpinnerIcon v-if="isPending" class="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />

      <span v-else> Add Event </span>

      <span class="sr-only">Add Event</span>
    </Button>
  </form>
</template>
