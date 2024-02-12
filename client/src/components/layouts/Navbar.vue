<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

import { siteConfig } from '@/config/site'
import CommunityIcon from '@/components/icons/IconCommunity.vue'
import CloseIcon from '@/components/icons/IconClose.vue'
import MenuIcon from '@/components/icons/IconMenu.vue'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Button } from '../ui/button'

export default defineComponent({
  components: {
    CommunityIcon,
    CloseIcon,
    RouterLink,
    MenuIcon
  },

  setup() {
    const isNavActive = ref(false)
    const icon = ref(MenuIcon)

    const toggleNav = () => {
      isNavActive.value = !isNavActive.value

      if (isNavActive.value) {
        icon.value = CloseIcon
      } else {
        icon.value = MenuIcon
      }
    }

    return {
      siteConfig,
      isNavActive,
      toggleNav,
      Button,
      Dialog,
      DialogClose,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      Label,
      Input,
      icon
    }
  }
})
</script>

<template>
  <div id="navbar" class="">
    <div class="lg:grid flex gap-2 lg:pt-20 lg:px-4 sm:px-8 px-4 py-4 xl:ml-6 ml-0">
      <div class="lg:ml-4 lg:mb-8 mr-8 lg:mr-0 px-2">
        <router-link class="flex items-center gap-2 text-2xl font-semibold" to="/">
          <CommunityIcon class="h-4 w-4" />
          <h1 class="">{{ siteConfig.name }}</h1>
        </router-link>
        <p class="text-base font-medium lg:block hidden">{{ siteConfig.description }}</p>
      </div>
      <nav class="hidden sm:block">
        <ul class="lg:grid flex items-start text-sm font-medium md:gap-4 gap-2 align-middle">
          <li v-for="(item, index) in siteConfig.sidebarNavItems" :key="index">
            <router-link
              :to="item.to"
              class="flex align-middle items-center hover:bg-slate-200 p-2 rounded-lg"
            >
              <component :is="item.icon" class="h-4 w-4 mr-2" />

              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="sm:hidden flex justify-end w-full">
        <Button variant="outline" @click="toggleNav">
          <component :is="icon" class="h-full" />
        </Button>
      </div>
    </div>

    <div class="sm:hidden block">
      <nav
        :class="{ block: isNavActive, hidden: !isNavActive }"
        class="min-h-[100vh] bg-background px-4 py-4 z-9999"
      >
        <ul class="">
          <li v-for="(item, index) in siteConfig.sidebarNavItems" :key="index">
            <router-link
              :to="item.to"
              class="flex align-middle items-center hover:bg-slate-200 p-2 rounded-lg text-xl font-semibold"
              @click="() => (isNavActive = false)"
            >
              <component :is="item.icon" class="h-4 w-4 mr-2" />
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
