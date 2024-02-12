import type { SidebarNavItem } from '@/types'
import { LayoutDashboard, BarChart3, ListTodo, Settings } from 'lucide-vue-next'

export const siteConfig = {
  name: 'Event7',
  description: 'Internal web tool',
  sidebarNavItems: [
    {
      to: '/dashboard',
      title: 'Dashboard',
      icon: LayoutDashboard
    },

    {
      to: '/events',
      title: 'Events',
      icon: ListTodo
    },

    {
      to: '/analytics',
      title: 'Analytics',
      icon: BarChart3
    }
  ] as SidebarNavItem[]
}
