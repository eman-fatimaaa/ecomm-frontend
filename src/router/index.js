import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AuthPage from '../pages/AuthPage.vue'
import CreateUpdatePage from '../pages/CreateUpdatePage.vue'

const routes = [
  { 
    path: '/', 
    component: AuthPage,
    meta: { requiresAuth: false } 
  },
  { 
    path: '/home', 
    component: HomePage,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/create', 
    component: CreateUpdatePage,
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthStatus() // Implement your auth check logic
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if trying to access protected route without auth
    next('/')
  } else if (to.path === '/' && isAuthenticated) {
    // Redirect to home if logged in user tries to access login page
    next('/home')
  } else {
    // Proceed to requested route
    next()
  }
})

// Helper function to check authentication status
function checkAuthStatus() {
  // Check for token in localStorage or your auth store
  const token = localStorage.getItem('authToken')
  // You might want to add additional checks like token expiration
  return !!token
}

export default router