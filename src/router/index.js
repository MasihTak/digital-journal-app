import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/sign-up',
            name: 'signUp',
            component: () => import('../views/auth/SignUp.vue')
        },
        {
            path: '/sign-in',
            name: 'signIn',
            component: () => import('../views/auth/SignIn.vue')
        },
        {
            path: '/journals',
            name: 'journals',
            component: () => import('../views/TheJournals.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        }
    ]
})

export default router
