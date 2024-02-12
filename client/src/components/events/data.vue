<!-- <script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState
} from '@tanstack/vue-table'
import {
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable
} from '@tanstack/vue-table'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'

import { h, ref } from 'vue'
import DropdownAction from './DataTableColumn.vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn, valueUpdater } from '@/lib/utils'

export interface Event {
  id: string
  name: string
  priority: number
  type: 'crosspromo' | 'liveops' | 'app' | 'ads'
  description: string
}

const data: Event[] = [
  {
    id: 'm5gr84i9',
    name: 'randomName',
    priority: 316,
    type: 'crosspromo',
    description: 'description'
  },
  {
    id: '3u1reuv4',
    name: 'randomName',
    priority: 242,
    type: 'liveops',
    description: 'description'
  },
  {
    id: 'derv1ws0',
    name: 'randomName',
    priority: 837,
    type: 'app',
    description: 'description'
  },
  {
    id: '5kma53ae',
    name: 'randomName',
    priority: 874,
    type: 'ads',
    description: 'description'
  },
  {
    id: 'bhqecj4p',
    name: 'randomName',
    priority: 721,
    type: 'ads',
    description: 'description'
  }
]

const columnHelper = createColumnHelper<Event>()

const columns = [
  columnHelper.accessor('type', {
    header: 'Type',
    cell: ({ row }) =>
      h(
        'div',
        {
          class: 'capitalize max-w-12 text-left',
          style: {
            width: '12rem'
          }
        },

        row.getValue('type')
      )
  }),
  columnHelper.accessor('priority', {
    header: () => h('div', { class: 'text-left w-0' }, 'Priority'),
    cell: ({ row }) => {
      const priority = parseInt(row.getValue('priority'))

      return h('div', { class: 'text-left font-medium w-0' }, priority)
    }
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => {
      return h(
        Button,
        {
          class: 'text-left max-w-12',
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    cell: ({ row }) => h('div', { class: 'max-w-12' }, row.getValue('name'))
  }),
  columnHelper.accessor('description', {
    header: 'Description', // Just set the header text to "Description"
    cell: ({ row }) => h('div', { class: '' }, row.getValue('description'))
  }),

  columnHelper.display({
    header: () => h('div', { class: 'w-auto text-right' }, 'Edit'),
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original

      return h(
        'div',
        { class: 'text-right' },
        h(DropdownAction, {
          event
        })
      )
    }
  })
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const types = ['crosspromo', 'liveops', 'app', 'ads'] as const

const handleTypeFilter = (filterValue: string) => {
  if (filterValue === '') {
    table.setColumnFilters([])
  } else {
    table.setColumnFilters([
      {
        column: 'type',

        id: 'type',

        value: filterValue
      }
    ])
  }
}
const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() {
      return sorting.value
    },

    get columnFilters() {
      return columnFilters.value
    },

    get columnVisibility() {
      return columnVisibility.value
    },

    get rowSelection() {
      return rowSelection.value
    },

    columnPinning: {
      left: ['type']
    }
  }
})

const getState = table.getState()
</script>

<template>
  <div class="w-full">
    <div class="grid grid-flow-col gap-2 max-w-2xl">
      <Button variant="outline" size="sm" @click="handleTypeFilter('')"> View All </Button>

      <Button variant="outline" size="sm" @click="handleTypeFilter('crosspromo')">
        Crosspromo
      </Button>

      <Button variant="outline" size="sm" @click="handleTypeFilter('liveops')"> LiveOps </Button>

      <Button variant="outline" size="sm" @click="handleTypeFilter('app')"> App </Button>

      <Button variant="outline" size="sm" @click="handleTypeFilter('ads')"> Ads </Button>
    </div>
    <div class="flex gap-2 items-center py-4">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="
              (value) => {
                column.toggleVisibility(!!value)
              }
            "
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :data-pinned="header.column.getIsPinned()"
              :class="cn({ sticky: header.column.getIsPinned() })"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
              class="hover:bg-slate-300"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell col-span="{columns.length}" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template> -->
