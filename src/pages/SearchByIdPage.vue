<template>
  <div class="container">
    <div class="input-container">
      <input class="chat-id-input" v-model="chatId" placeholder="Введіть ID чату">
      <button class="search-button" @click="fetchChatHistory">Пошук</button>
    </div>
    <div v-if="messages.length > 0" class="messages-container">
      <h3>Історія чату:</h3>
      <ul>
        <li v-for="(message, index) in messages" :key="index" :class="{'message-item': true, 'outgoing': message.includes('Вихідне'), 'incoming': message.includes('Вхідне')}">
          <strong>{{ message.split(', ')[0] }} - {{ message.split(', ')[1] }}</strong>
          <span v-if="!isPhotoMessage(message)">{{ message.split(', ').slice(2).join(', ') }}</span>
          <a v-if="isPhotoMessage(message)" :href="getPhotoUrl(message)" target="_blank">{{ message.split(', ').slice(2).join(', ') }}</a>
        </li>
      </ul>
    </div>
    <div v-else class="no-messages">
      <p>Повідомлення не знайдено.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChatHistoryPage',
  data() {
    return {
      chatId: '',
      messages: []
    }
  },
  methods: {
    async fetchChatHistory() {
      try {
        const response = await axios.get(`http://localhost:8083/api/chats/history/${this.chatId}`);
        this.messages = response.data;
      } catch (error) {
        console.error('Помилка при отриманні історії чату:', error);
        this.messages = [];
      }
    },
    isPhotoMessage(message) {
      return message && typeof message === 'string' && message.includes('Фото: [');
    },
    getPhotoIndex(message) {
      return message.match(/\[(\d+)\]/)[1];
    },
    getPhotoUrl(message) {
      const photoIndex = this.getPhotoIndex(message);
      return `http://localhost:8083/images/image${photoIndex}.jpg`;
    }
  }
}
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.chat-id-input {
  width: 70%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.search-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #45a049;
}

.messages-container {
  margin-top: 20px;
  text-align: left;
}

.message-item {
  background-color: #f0f0f0;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  word-wrap: break-word;
}

.message-item.outgoing {
  background-color: #d9f7be; /* Світло зелений для вихідних повідомлень */
  text-align: right;
}

.message-item.incoming {
  background-color: #e6f7ff; /* Голубий для вхідних повідомлень */
  text-align: left;
}

.message-item strong {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.message-item span, .message-item a {
  color: #555;
}
.messages-container ul {
  list-style-type: none; /* Видалення кружків */
  padding-left: 0; /* Видалення відступу зліва */
}

.messages-container li {
  list-style-type: none; /* Видалення кружків для кожного елементу списку, якщо це необхідно */
}
.no-messages {
  margin-top: 20px;
}
</style>
