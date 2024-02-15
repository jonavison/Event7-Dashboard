import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import EventManagementView from '@/views/EventManagementView.vue'
import AnalyticsEventsPageVue from '@/views/AnalyticsEventsPage.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import EventView from '@/views/EventView.vue'
const routes = [
  {
    path: '/'
  },
  {
    path: '/dashboard',
    component: DashboardView
  },
  {
    path: '/events',
    component: EventManagementView
  },
  {
    path: '/events/:id',
    component: EventView
  },
  {
    path: '/games',
    component: EventManagementView
  },
  // {
  //   path: '/games/:id/events',
  //   component: GameEventsView,
  //   props: true
  // },
  {
    path: '/analytics',
    component: AnalyticsView,
    children: [
      {
        path: '/analytics/:id',
        component: AnalyticsEventsPageVue
      }
    ]
  }

  // Other routes...
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
