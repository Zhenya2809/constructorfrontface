<template>
  <div>
    <h1>Список моїх ботів</h1>
    <div v-if="loading">Завантаження...</div>
    <div v-else>
      <ul>
        <li v-for="bot in botsData" :key="bot.id">
          ID: {{ bot.id }} - Ім'я боту: {{ bot.botName }} - Тип боту: {{ bot.botType }}
          <button @click="editBot(bot)">Редагувати</button>
        </li>
      </ul>
    </div>

    <!-- Модальне вікно для редагування бота -->
    <div v-if="editingBot">
      <h2>Редагування бота</h2>
      <form @submit.prevent="saveChanges">
        <label for="botAvatarUrl">Bot Avatar URL:</label>
        <input v-model="editedBot.botAvatarUrl" type="text" id="botAvatarUrl" />

        <label for="botName">Bot Name:</label>
        <input v-model="editedBot.botName" type="text" id="botName" />

        <label for="token">Token:</label>
        <input v-model="editedBot.token" type="text" id="token" />

        <label for="webhookUrl">Webhook URL:</label>
        <input v-model="editedBot.webhookUrl" type="text" id="webhookUrl" />

        <button type="submit">Зберегти</button>
        <button @click="cancelEditing">Скасувати</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/interceptors/axios.js"; // Шлях до вашого Axios об'єкта
import { ref } from 'vue';

export default {
  setup() {
    const botsData = ref([]);
    const loading = ref(true);
    const editingBot = ref(null);
    const editedBot = ref({});

    // Функція завантаження даних про ботів
    const fetchData = async () => {
      try {
        const response = await api.get('http://localhost:8083/setting_bot/getAllBots');
        botsData.value = response.data;
      } catch (error) {
        console.error('Помилка при завантаженні даних ботів:', error);
      } finally {
        loading.value = false;
      }
    };

    // Функція для редагування бота
    const editBot = (bot) => {
      editedBot.value = { ...bot }; // Копіюємо дані бота для редагування
      editingBot.value = bot; // Позначаємо бота, якого ми редагуємо
    };

    // Функція для збереження змін
    const saveChanges = () => {
      // Отримати дані з editedBot і відправити їх на сервер для збереження
      // Після успішного оновлення можна закрити модальне вікно
      editingBot.value = null;
    };

    // Функція для скасування редагування
    const cancelEditing = () => {
      editingBot.value = null;
    };

    fetchData();

    return {
      botsData,
      loading,
      editBot,
      editingBot,
      editedBot,
      saveChanges,
      cancelEditing
    };
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}

ul {
  list-style: none;
}

li {
  padding: 10px;
  border: 1px solid #e5e5e5;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #388e3c;
}
</style>