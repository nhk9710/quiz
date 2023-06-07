import { createRouter, createWebHistory } from 'vue-router'
import App from "@/App.vue";
import Question from "@/components/Question.vue";
import Home from "@/components/Home.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/question',
            name: 'question',
            component: Question,
        }
    ]
})

export default router