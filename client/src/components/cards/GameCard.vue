<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

defineProps<{
  name: string
}>()
</script>

<template>
  <Card class="w-[350px] border cursor-pointer hover:bg-slate-300" :name="name" @click="selectGame">
    <CardHeader>
      <CardTitle>{{ name }}</CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent class="grid gap-4 h-full"> </CardContent>
    <CardFooter> Go to events</CardFooter>
  </Card>
</template>
