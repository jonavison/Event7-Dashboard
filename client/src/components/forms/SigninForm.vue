<script setup lang="ts">
import { ref } from 'vue'
import SpinnerIcon from '@/components/icons/IconSpinner.vue'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const isPending = ref(false)
const errorMessage = ref('')

const formData = ref({
  username: '',
  password: ''
})

const onSubmit = async () => {
  try {
    // You can add your custom validation here if needed

    // Set isPending to true to show spinner
    isPending.value = true

    // Submit the form data using Axios POST request
    const response = await axios.post('http://localhost:3000/users/signin', formData.value)

    // If the request is successful, handle accordingly
    console.log('Login successful:', response.data)

    // Reset form state
    formData.value.username = ''
    formData.value.password = ''

    // Clear any previous error message
    errorMessage.value = ''
    router.push('/')
  } catch (error) {
    // If there's an error, handle it
    console.error('Login failed:', error)

    // Display error message
    errorMessage.value = 'An error occurred while logging in. Please try again.'
  } finally {
    // Whether the request is successful or not, set isPending back to false
    isPending.value = false
  }
}
</script>

<template>
  <div class="h-full w-full max-w-sm mx-auto">
    <form
      @submit.prevent="onSubmit"
      class="grid gap-5 bg-slate-100 z-50 border-foreground/30 border-2 rounded-md p-8"
    >
      <h2 class="text-2xl font-medium mb-4 text-center">Log in</h2>
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Username" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="Password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button :disabled="isPending" type="submit">
        <SpinnerIcon v-if="isPending" class="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        <span v-else>Log in</span>
        <span class="sr-only">Log in</span>
      </Button>

      <div v-if="errorMessage" class="text-red-500 mt-2 text-sm">{{ errorMessage }}</div>
    </form>
  </div>
</template>
