<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'
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

const eventFormSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters.' })
      .max(50, { message: 'Name cannot exceed 50 characters.' }),

    type: z
      .enum(['crosspromo', 'liveops', 'app', 'ads'], {
        required_error: 'Must be a valid type.'
      })

      .default('crosspromo'),
    priority: z.preprocess(
      (value) => (typeof value === 'string' ? parseInt(value, 10) : value),

      z.number().int().positive().min(0).max(10)
    ),

    description: z
      .string()
      .min(1, { message: 'Description must be at least 1 character.' })
      .max(255, { message: 'Description cannot exceed 255 characters.' })
  })
)

const form = useForm({
  validationSchema: eventFormSchema
})
const isPending = ref(false)

const formData = ref({
  name: '',
  type: 'crosspromo',
  priority: 0,
  description: ''
})

const onSubmit = form.handleSubmit(async (values) => {
  isPending.value = true
  console.log('Form submitted!', values)
  setTimeout(() => {
    isPending.value = false
  }, 1000)
  try {
    // Submit form data to your backend endpoint
    const response = await fetch('http://localhost:3000/events', {
      method: 'POST'
    })

    if (!response.ok) {
      throw new Error('Failed to create event')
    }

    // Reset form and pending state after successful submission
    formData.value = {
      name: '',
      type: 'crosspromo',
      priority: 0,
      description: ''
    }
    isPending.value = false
    console.log('Event created successfully')
  } catch (error) {
    console.error('Error creating event:', error)
    isPending.value = false
  }
})
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
