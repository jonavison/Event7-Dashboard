<script setup lang="ts">
import { ref } from 'vue'
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
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(120),
    priority: z.string(),
    type: z.enum(['crosspromo', 'liveops', 'app', 'ads']),
    game: z.enum(['talking_tom', 'mythic_legend'])
  })
)

const form = useForm({
  validationSchema: formSchema
})
const isPending = ref(false)
const onSubmit = form.handleSubmit(async (values) => {
  isPending.value = true
  try {
    await axios.post('http://localhost:3000/events', values)
    alert('Event created successfully!')
  } catch (error) {
    console.error('Error creating event:', error)
    alert('Failed to create event. Please try again.')
  } finally {
    isPending.value = false
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" method="post" class="grid gap-5 p-2">
    <h2 class="text-xl font-medium mb-4">Create an Event</h2>
    <FormField v-slot="{ componentField }" name="game">
      <FormItem>
        <FormLabel>Game</FormLabel>

        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder="Game" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="talking_tom"> Talking Tom </SelectItem>

                <SelectItem value="mythic_legend"> Mythic Legend </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
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
                    <SelectItem v-for="index in 10" :value="index.toString()" :key="index">
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
