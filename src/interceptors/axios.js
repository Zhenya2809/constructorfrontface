import axios from "axios";
import router from "@/routing/router";

const api = axios.create()
// http перехватчик ответа
api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            // Вернуть 401, очистить информацию о токене и перейти на страницу входа
            case 401:
                localStorage.removeItem('token');
                router.replace({
                    path: '/login'
                    // Перейти на текущую страницу после успешного входа
                    // query: {redirect: router.currentRoute.fullPath}``
                })
        }
        // Возвращаем сообщение об ошибке, возвращаемое интерфейсом
        return Promise.reject(error.response.data);
    }
});


api.interceptors.request.use(config => {
    config.headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return config
}, error => {
    console.log(error);
})

export default api