import { createRouter, createWebHistory } from 'vue-router';
import HomePages from '@/pages/HomePage.vue';
import FirstPages from '@/pages/FirstPages.vue';
import RegistrationPage from "@/pages/RegistrationPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import ChatPage from "@/pages/ChatWithClientPage.vue";
import QueuePage from "@/pages/ChatQueuePage.vue";
import CreateBotPage from "@/pages/CreateBotPage.vue";
import SettingBotPage from "@/pages/SettingBotPage.vue";

const routes = [
    { path: '/chatPage', component: ChatPage },
    { path: '/first', component: FirstPages },
    { path: '/registration', component: RegistrationPage },
    { path: '/login', component: LoginPage },
    { path: '/chatQueue', component: QueuePage },
    { path: '/createBot', component: CreateBotPage },
    { path: '/settingBot', component: SettingBotPage },
];

const myRouter = createRouter({
    history: createWebHistory(),
    routes,
});

export default myRouter;