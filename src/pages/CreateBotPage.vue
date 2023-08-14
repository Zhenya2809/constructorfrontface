<template>
  <div class="container">
    <div v-if="step === 1">
      <h1>Якого бота ви хочете створити?</h1>
      <div class="bot-selection">
        <div @click="selectBot('TELEGRAM')" class="bot-image">
          <img :src="telegram" alt="Telegram">
        </div>
        <div @click="selectBot('VIBER')" class="bot-image">
          <img :src="viber" alt="Viber">
        </div>
        <div @click="selectBot('WHATSAPP')" class="bot-image">
          <img :src="whatsapp" alt="WhatsApp">
        </div>
      </div>
    </div>

    <div v-if="step === 2">
      <label for="botToken">Bot Token:</label>
      <input type="text" v-model="botToken"/>
      <label v-if="typeBot === 'VIBER'" for="webhookURL">Webhook URL:</label>
      <input v-if="typeBot === 'VIBER'" type="text" v-model="webhookURL"/>
      <div class="button-container">
        <button @click="step = 3">OK</button>
      </div>
    </div>

    <div v-if="step === 3">
      <label for="botName">Введіть ім'я бота:</label>
      <input type="text" v-model="botName"/>
      <div class="button-container">
        <button @click="step = 4">Далі</button>
      </div>
    </div>

    <div v-if="step === 4">
      <h2>Перевірте введену інформацію:</h2>
      <p><strong>Тип бота:</strong> {{ typeBot }}</p>
      <p><strong>Bot Token:</strong> {{ botToken }}</p>
      <p v-if="typeBot === 'VIBER'"><strong>Webhook URL:</strong> {{ webhookURL }}</p>
      <p><strong>Ім'я бота:</strong> {{ botName }}</p>
      <div class="button-container">
        <button @click="confirmData">Так</button>
        <button @click="step = 1">Ні</button>
      </div>
    </div>
  </div>

  <div v-if="notification" class="notification">
    {{ notification }}
  </div>
</template>


<script>
import viber from '@/img/viber.png';
import telegram from '@/img/telegram.png';
import whatsapp from '@/img/whatsup.png';
import api from "@/interceptors/axios.js";

export default {
  data() {
    return {
      step: 1,
      typeBot: '',
      botToken: '',
      webhookURL: '',
      botName: '',
      viber,
      telegram,
      whatsapp,
      notification: '', // Змінна для відображення повідомлення користувачеві
    };
  },
  methods: {
    selectBot(type) {
      this.typeBot = type;
      localStorage.setItem('typeBot', type);
      this.step = 2;
    },
    confirmData() {
      const data = {
        typeBot: this.typeBot,
        botToken: this.botToken,
        webhookURL: this.webhookURL,
        botName: this.botName
      };

      localStorage.setItem('botToken', this.botToken);
      if (this.typeBot === 'viber') {
        localStorage.setItem('webhookURL', this.webhookURL);
      }

      // Відправити запит на сервер
      api.post('http://localhost:8083/bot/create/', data)
          .then(response => {
            // Встановити повідомлення для користувача на основі статусу та повідомлення від сервера
            this.notification = `${response.data.status},    ${response.data.message} successfully created`;
          })
          .catch(error => {
            console.error('Помилка при створенні бота:', error);
            this.notification = 'Помилка при створенні бота. Будь ласка, спробуйте пізніше.';
          });
    }
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

.bot-selection {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px; /* Додавання відступу знизу для всього блоку вибору бота */
}

.bot-image {
  width: 250px; /* Змінено ширину, щоб відповідати розміру зображення */
  height: 140px; /* Змінено висоту, щоб відповідати розміру зображення */
  border: 1px solid #ccc;
  cursor: pointer;
  margin: 10px; /* Додавання відступу навколо кожного зображення */
  border-radius: 15px; /* Округлення країв зображення */
  overflow: hidden; /* Приховування частин зображення, які виходять за межі округлення */
}

.bot-image img {
  width: 100%;
  height: 100%;
  display: block; /* Забезпечення відсутності відступу навколо зображення */
}

.bot-token-field {
  display: flex;
  flex-direction: column;
  align-items: center; /* Вирівнювання елементів по центру */
  margin: 20px 0;
}

.bot-token-input {
  width: 80%; /* Збільшення ширини поля введення */
  padding: 10px;
  border-radius: 10px; /* Невелике округлення країв */
  border: 1px solid #ccc;
  font-size: 16px; /* Збільшення розміру шрифту */
  text-align: center; /* Вирівнювання тексту по центру */
  font-family: 'Arial', sans-serif; /* Застосування шрифту */
}

.bot-token-input::placeholder {
  text-align: center; /* Вирівнювання плейсхолдера по центру */
  color: #888; /* Змінення кольору плейсхолдера */
}


input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 10px; /* Округлення країв поля вводу */
  text-align: center; /* Вирівнювання тексту по центру */
  font-family: 'Arial', sans-serif; /* Застосування шрифту */
}

.input-section {
  margin-top: 100px; /* Відступ зверху */
}

.input-group {
  display: flex; /* Вирівнювання елементів в ряд */
}

input[type="text"] {
  /* ... інші стилі ... */
  flex-grow: 1; /* Забезпечує, що поле вводу заповнює доступний простір */
  height: 20px; /* Ви можете змінити це значення відповідно до вашого дизайну */
  border-radius: 10px; /* Округлення країв */
}

button {
  padding: 10px 20px;
  font-family: 'Arial', sans-serif; /* Застосування шрифту */
  cursor: pointer;
  width: 15%; /* Ширина кнопки відповідає ширині поля вводу */
  transition: background-color 0.3s;
  margin-left: 10px; /* Відступ між кнопкою та полем вводу */
  height: 40px; /* Висота кнопки така ж, як у поля вводу */
  border-radius: 10px; /* Округлення країв */
  background-color: #007BFF; /* Колір фону кнопки */
  color: white; /* Колір тексту кнопки */
  font-size: 16px; /* Розмір шрифту кнопки */
  border: none; /* Видалення рамки */
}

button:hover {
  background-color: #0056b3; /* Зміна кольору кнопки при наведенні */
}

.button-container {
  text-align: center; /* Вирівнюємо кнопку по центру */
  margin-top: 20px; /* Відступ зверху */
}

.ok-button {
  width: 80%; /* Збільшення ширини кнопки */
  padding: 10px;
  border-radius: 10px; /* Округлення країв кнопки */
  border: none;
  background-color: #007bff; /* Змінення кольору фону кнопки */
  color: #fff; /* Колір тексту кнопки */
  font-size: 16px; /* Розмір шрифту кнопки */
  cursor: pointer;
  transition: background-color 0.3s ease; /* Плавна анімація при наведенні */
}
.notification {
  font-family: 'Arial', sans-serif; /* Шрифт */
  font-size: 16px; /* Розмір шрифта */
  color: #333; /* Колір тексту */
  background-color: #f9f9f9; /* Колір фону */
  border: 1px solid #e0e0e0; /* Межа навколо повідомлення */
  padding: 10px; /* Внутрішній відступ */
  margin: 20px 0; /* Зовнішній відступ */
  border-radius: 8px; /* Округлені кути */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Тінь */
  text-align: center; /* Вирівнювання тексту по центру */
}


</style>
