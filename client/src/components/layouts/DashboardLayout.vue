<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>
<template>
  <div
    id="dashboard-layout"
    class="min-h-screen w-full bg-slate-200 lg:flex lg:justify-between relative"
  >
    <div
      class="bg-background top-0 lg:flex lg:max-h-screen lg:w-1/6 lg:flex-col lg:justify-between relative"
    >
      <div class="relative">
        <Navbar />
      </div>
    </div>
    <div class="lg:w-5/6 w-full sm:p-16 overflow-x-clip">
      <slot />
    </div>
  </div>
</template>
