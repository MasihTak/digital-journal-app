import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";

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
            component: () => import('../views/TheJournals.vue'),
            meta: {requiresAuth: true},
        },
        {
            path: '/journals/new',
            name: 'newJournal',
            component: () => import('../views/NewJournal.vue'),
            meta: {requiresAuth: true},
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const {isAuthenticated} = storeToRefs(useAuthStore());
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated.value) {
            next({path: '/sign-in'})
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
