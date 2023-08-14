<template>
  <div class="container">
    <h1>Активні черги чатів</h1>
  </div>
  <div >

    <div v-if="loading">Завантаження...</div>
    <div v-else>
      <ul>
        <li v-for="queue in chatQueues" :key="queue.id">
          ID: {{ queue.id }} - Chat ID: {{ queue.chatId }} - Bot ID: {{ queue.botId }} - Active: {{ queue.active }}
          <button @click="deactivateQueue(queue)">Перейти до чату з цим клієнтом</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/interceptors/axios.js";
import { useRouter } from "vue-router";
import { ref } from 'vue';

export default {
  setup() {
    const chatQueues = ref([]);
    const loading = ref(true);
    const router = useRouter();

    const deactivateQueue = async (queue) => {
      try {
        const payload = { id: queue.id };
        await api.post('http://localhost:8083/functional/deactive-queues', payload);

        localStorage.setItem('chatId', queue.chatId);
        localStorage.setItem('botId', queue.botId);

        // Запит з параметром chatId
        const usernameResponse = await api.get(`http://localhost:8083/functional/getusername/${queue.chatId}`);
        localStorage.setItem('username', usernameResponse.data.username);

        router.push({ path: '/home', params: { sender: queue.chatId.toString() } });
      } catch (error) {
        console.error('Помилка при деактивації черги:', error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await api.get('http://localhost:8083/functional/active-queues');
        chatQueues.value = response.data;
      } catch (error) {
        console.error('Помилка при завантаженні черг чатів:', error);
      } finally {
        loading.value = false;
      }
    };

    fetchData();

    return {
      chatQueues,
      loading,
      deactivateQueue
    };
  }
};
</script>
<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center; /* Вирівнювання тексту по центру */
  font-family: 'Arial', sans-serif; /* Вибір шрифту */
}
h1 {
  font-size: 24px; /* Змінення розміру шрифту для заголовка */
  font-weight: bold; /* Зробити текст жирним */
  color: #333; /* Змінення кольору тексту */
  margin-bottom: 20px; /* Відступ внизу від заголовка */
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #e5e5e5;
  margin: 8px 0;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  border-radius: 10px; /* округлення країв */
  font-family: 'Arial', sans-serif; /* читабельний шрифт */
}

button:hover {
  background-color: #d32f2f;
}
li {
  padding: 10px;
  border: 1px solid #e5e5e5;
  margin: 8px 0;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px; /* округлення країв */
}

div {
  max-width: 800px;
  margin: 0 auto;
}
</style>
