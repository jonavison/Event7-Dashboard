<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import SpinnerIcon from '@/components/icons/IconSpinner.vue'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const isPending = ref(false)

const errorMessage = ref('')

const userSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50) // Add password field to the schema
  })
)

const form = useForm({
  validationSchema: userSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    isPending.value = true
    errorMessage.value = ''
    const response = await axios.post('http://localhost:3000/users/signin', values)
    if (response.data.success) {
      router.push('/events')
    } else {
      errorMessage.value = response.data.message
    }
  } catch (error) {
    errorMessage.value = 'An error occurred while signing in. Please try again.'
  } finally {
    isPending.value = false
  }
})
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
