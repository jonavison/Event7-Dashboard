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
    const response = await axios.post(
      'http://localhost:3000/users/signin',
      formData.value,
      errorMessage
    )

    if (response.data.success) {
      // Handle successful response here
      console.log('User signed in successfully:', response.data.data)
      // Set isPending to false to hide spinner
      isPending.value = false
      // Clear form fields
      formData.value = { username: '', password: '' }
      // Navigate to the desired page
      router.push('/')
    } else {
      // Set errorMessage if there is an error in the response
      errorMessage.value = response.data.message
    }
  } catch (error: any) {
    // Check if error response is available
    if (error.response) {
      // Set errorMessage to the message from the response
      errorMessage.value = error.response.data.message
    } else {
      // If no response available, set a default error message
      errorMessage.value = 'An error occurred, please try again'
    }
    // Clear the spinner
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
