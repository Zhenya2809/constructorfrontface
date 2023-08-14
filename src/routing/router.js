import { createRouter, createWebHistory } from 'vue-router';
import HomePages from '@/pages/HomePage.vue';
import FirstPages from '@/pages/FirstPages.vue';
import RegistrationPage from "@/pages/RegistrationPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import ChatPage from "@/pages/ChatPage.vue";
import QueuePage from "@/pages/QueuePage.vue";
import CreateBotPage from "@/pages/CreateBotPage.vue";

const routes = [
    { path: '/home', component: ChatPage },
    { path: '/first', component: FirstPages },
    { path: '/registration', component: RegistrationPage },
    { path: '/login', component: LoginPage },
    { path: '/chatQueue', component: QueuePage },
    { path: '/createBot', component: CreateBotPage },
];

const myRouter = createRouter({
    history: createWebHistory(),
    routes,
});

export default myRouter;