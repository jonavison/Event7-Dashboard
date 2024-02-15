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
    component: DashboardView
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

// Redirect to the Home page
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isSignedIn()) {
    next('/signin')
  } else {
    next()
  }
})

function isSignedIn() {
  return localStorage.getItem('token') !== null
}
export default router
