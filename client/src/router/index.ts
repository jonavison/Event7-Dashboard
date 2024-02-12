import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import EventManagementView from '@/views/EventManagementView.vue'
import AnalyticsEventsPageVue from '@/views/AnalyticsEventsPage.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
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
