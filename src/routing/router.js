import { createRouter, createWebHistory } from 'vue-router';
import HomePages from '@/pages/HomePage.vue';
import FirstPages from '@/pages/FirstPages.vue';
import RegistrationPage from "@/pages/RegistrationPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SearchByIdPage from "@/pages/SearchByIdPage.vue";


const routes = [
    { path: '/first', component: FirstPages },
    { path: '/history', component: SearchByIdPage },
    { path: '/registration', component: RegistrationPage },
    { path: '/login', component: LoginPage },

];

const myRouter = createRouter({
    history: createWebHistory(),
    routes,
});

export default myRouter;