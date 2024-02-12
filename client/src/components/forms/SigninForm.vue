<!-- <script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'
import SpinnerIcon from '@/components/icons/IconSpinner.vue'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const eventFormSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters.' })
      .max(50, { message: 'Username cannot exceed 50 characters.' }),
    password: z
      .string()
      .min(1, { message: 'Password must be at least 1 character.' })
      .max(255, { message: 'Password cannot exceed 255 characters.' })
  })
)

const form = useForm({ validationSchema: eventFormSchema })
const isPending = ref(false)
const errorMessage = ref('')

// const onSubmit = form.handleSubmit(async (values) => {
//   let response: Response
//   try {
//     const response = await fetch('http://localhost:3000/user', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(values)
//     });

//     if (response.status === 200) {
//         const data = await response.json();
//         if (data.ads === 'sure, why not!') {
//             form.resetForm();
//             isPending.value = false;
//             errorMessage.value = '';
//             console.log('Logged in successfully');
//             return true;
//         } else if (data.ads === 'you shall not pass!') {
//             throw new Error('Ads type is disabled for this user');
//         } else {
//             throw new Error('Unexpected response body');
//         }
//     } else if (response.status === 400) {
//         throw new Error('Missing mandatory parameters');
//     } else if (response.status === 401) {
//         throw new Error('Invalid username or password');
//     } else if (response.status === 500) {
//         throw new Error('Server is temporarily not available');
//     } else {
//         throw new Error('Unexpected response status');
//     }
// )}
</script>

<template>
  <!-- <div class="h-full w-full max-w-sm mx-auto">
    <form
      @submit="onSubmit"
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
</template>  -->
<template></template>
