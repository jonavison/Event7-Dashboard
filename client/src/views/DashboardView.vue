<script setup lang="ts">
import { ref } from 'vue'
import GameCard from '@/components/cards/GameCard.vue'

const games = ref<{ name: string; slug: string }[]>([
  { name: 'TALKING_TOM', slug: 'talking_tom' },
  { name: 'MYTHIC_LEGEND', slug: 'mythic_legend' }
])
</script>
<template>
  <div class="grid grid-flow-col gap-4 mx-auto max-w-5xl">
    <router-link v-for="game in games" :key="game.slug" :to="`/${game.slug}/events`">
      <GameCard :name="game.name" />
    </router-link>
  </div>
</template>
