<script setup lang="ts">
import DataTable from '@/components/events/DataTable.vue'
</script>

<template>
  <div class="grid gap-4 z-10">
    <div class="grid grid-cols-2 w-full rounded-lg py-4 bg-slate-100 border px-4 align-middle">
      <h1 class="pl-2 py-2 font-medium text-xl">Event Management</h1>

      <Input class="w-full px-4 rounded-full py-2" placeholder="Search..." />
    </div>
    <div class="p-6 border rounded-lg bg-slate-100">
      <DataTable />
    </div>
    <!-- Render the dashboard data here -->
  </div>
</template>
