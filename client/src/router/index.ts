import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import EventManagementView from '@/views/EventManagementView.vue'
import AnalyticsEventsPageVue from '@/views/AnalyticsEventsPage.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'
import EventView from '@/views/EventView.vue'
import HomePage from '@/views/HomePage.vue'
import SigninForm from '@/components/forms/SigninForm.vue'
const routes = [
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    component: SigninForm,
    meta: { layout: DefaultLayout }
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/events',
    component: EventManagementView,
    meta: { layout: DashboardLayout }
  },
  {
    path: '/events/:id',
    component: EventView,
    meta: { requiresAuth: true }
  },
  {
    path: '/games',
    component: EventManagementView,
    meta: { requiresAuth: true }
  },
  {
    path: '/analytics',
    component: AnalyticsView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/analytics/:id',
        component: AnalyticsEventsPageVue
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Redirect to the Home pagerouter.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the route requires authentication
    if (!isAuthenticated()) {
      // If user is not authenticated, redirect to sign-in page
      next('/signin')
    } else {
      // If user is authenticated, proceed to the route
      next()
    }
  } else {
    // For routes that do not require authentication, proceed
    next()
  }
})

function isSignedIn() {
  return localStorage.getItem('token') !== null
}
export default router
