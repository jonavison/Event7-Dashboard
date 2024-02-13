<script setup lang="ts">
import { defineProps } from 'vue'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getPriorityColor } from '@/lib/utils'

defineProps<{
  event: {
    id: string
    name: string
    priority: number
    type: 'crosspromo' | 'liveops' | 'app' | 'ads'
    description: string
  }
}>()
</script>

<template>
  <Card :key="event.id" class="w-[350px] border">
    <CardHeader class="relative">
      <CardTitle class="text-xl text-primary">{{ event.name }}</CardTitle>
      <Badge
        class="absolute right-2 top-6 text-center"
        :class="getPriorityColor(event.priority ?? 0)"
      >
        {{ event.priority }}
      </Badge>
      <CardDescription>{{ event.type }}</CardDescription>
    </CardHeader>

    <CardContent>
      <p>{{ event.description }}</p>
    </CardContent>

    <CardFooter class="flex justify-between px-6 pb-6">
      <Button>Edit</Button>

      <Button>Delete</Button>
    </CardFooter>
  </Card>
</template>
