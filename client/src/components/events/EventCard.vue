<script setup lang="ts">
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
  id: number
  name: string
  priority: number
  description: string
  type: string
}>()
</script>

<template>
  <Card :key="id" class="w-[350px] border">
    <CardHeader class="relative">
      <CardTitle class="text-xl text-primary">{{ name }}</CardTitle>
      <Badge class="absolute right-2 top-6 text-center" :class="getPriorityColor(priority ?? 0)">
        {{ priority }}
      </Badge>
      <CardDescription>{{ type }}</CardDescription>
    </CardHeader>

    <CardContent>
      <p>{{ description }}</p>
    </CardContent>

    <CardFooter class="flex justify-between px-6 pb-6">
      <Button>Edit</Button>

      <Button>Delete</Button>
    </CardFooter>
  </Card>
</template>
