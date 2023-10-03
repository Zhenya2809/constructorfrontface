<template>
  <div class="container">
    <h1>Щоб підключитись до чату, натисніть CONNECT</h1>
  </div>
  <div id="main-content" class="container">
    <div class="connect-disconnect">
<!--      <button v-if="!connected" @click="connect" class="connect-button">Connect</button>-->
<!--      <button v-else @click="disconnect" class="disconnect-button">Disconnect</button>-->
    </div>

    <div id="message-container" v-scroll-bottom="incomingMessages" ref="messageContainer">

      <div v-for="(incomingMessage, index) in incomingMessages" :key="index"
           :class="[incomingMessage.class, {'last-message': index === incomingMessages.length - 1}]">
        <strong>{{ incomingMessage.class === 'incoming-message' ? username : incomingMessage.sender }}:</strong>
        {{ incomingMessage.content }}
      </div>
    </div>

    <div class="form-group">
      <div class="input-send">
<textarea id="name" class="form-control rounded-textarea" v-model="name" placeholder="enter your message here..."
          @keyup.enter="sendName"></textarea>
        <button @click="sendName" class="send-button-telegram">
          <i class="telegram-icon"></i>
        </button>
      </div>
    </div>
  </div>

</template>


<script>
import {ref, nextTick} from 'vue';
import SockJS from 'sockjs-client';
import Stomp from 'stomp-websocket';
import api from "@/interceptors/axios.js";
import VueScrollBottom from 'vue-scroll-bottom';

export default {
  directives: {
    'scroll-bottom': VueScrollBottom,
  },
  setup() {
    const username = ref(localStorage.getItem('username'));

    const connected = ref(false);
    const messageContainer = ref(null);
    const name = ref('');
    const incomingMessages = ref([]);
    let stompClient = null;

    const connect = () => {
      var socket = new SockJS('http://localhost:8083/chat');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        connected.value = true;
        const chatId = localStorage.getItem('chatId');
        const botId = localStorage.getItem('botId');

        api.get(`http://localhost:8083/functional/messages/${chatId}/${botId}`)
            .then(response => {
              incomingMessages.value = response.data.map(message => ({
                sender: message.botUser.toString(),
                content: message.content,
                class: message.botUser.toString() === 'ADMINISTRATOR' ? 'outgoing-message' : 'incoming-message'
              }));
              scrollToLastMessage();
            })
            .catch(error => {
              console.error('Помилка при завантаженні попередніх повідомлень:', error);
            });

        stompClient.subscribe('/topic/messages', function (message) {
          const messageBody = JSON.parse(message.body);
          incomingMessages.value.push({
            sender: messageBody.sender,
            content: messageBody.content,
            class: 'incoming-message' // нові повідомлення вважаються вхідними

          });
          scrollToLastMessage();
        });


      })
    };
    const scrollToLastMessage = () => {
      nextTick(() => {
        const lastMessageElement = document.querySelector('.last-message');
        if (lastMessageElement) {
          lastMessageElement.scrollIntoView({behavior: 'smooth'});
        }
      });
    };
    const disconnect = () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      localStorage.removeItem('sender');
      connected.value = false;
    };
    const scrollToBottom = () => {
      // Перевірка на наявність messageContainer
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
      }
    };
    const sendName = () => {
      if (!name.value) {
        return; // Перевірка на порожнє значення name
      }

      const sender = localStorage.getItem('chatId'); // Отримання sender з localStorage
      const botId = localStorage.getItem('botId'); // Якщо вам потрібно botId, отримайте його також з localStorage

      const messageObject = {
        sender: sender, // Використання sender з localStorage
        content: name.value,
        botId: botId
      };
      stompClient.send("/app/chat", {}, JSON.stringify(messageObject));
      incomingMessages.value.push({
        sender: 'ADMINISTRATOR',
        content: name.value,
        class: 'outgoing-message' // вихідні повідомлення від адміністратора
      });
      name.value = '';
      nextTick(() => {
        scrollToLastMessage();
      });
      // ...
    };

    return {
      connect,
      disconnect,
      sendName,
      connected,
      name,
      incomingMessages,
      username

    };
  },
  mounted() {
    this.connect(); // автоматично викликає метод connect при завантаженні сторінки
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
body {
  background-color: #f5f5f5;
}

#main-content {
  max-width: 940px;
  padding: 2em 3em;
  margin: 0 auto 20px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

#message-container {
  max-height: 500px; /* ви можете змінити це значення згідно з потребами */
  overflow-y: auto;
}

.incoming-message,
.outgoing-message {
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
}

.incoming-message {
  background-color: #e6f7ff;
  border: 1px solid #b5e2fa;
  float: left;
  clear: both;
}

.outgoing-message {
  background-color: #d9f7be;
  border: 1px solid #b7eb8f;
  float: right;
  clear: both;
}

.connect-disconnect {
  text-align: center;
  margin-bottom: 20px;
}

.connect-button, .disconnect-button {
  font-size: 1.2em;
  padding: 10px 20px;
}

.chat-window {
  max-width: 800px;
  margin: 20px auto;
  border: 1px solid #e5e5e5;
  padding: 10px;
}

.incoming-message, .outgoing-message {
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}

.incoming-message {
  background-color: #f2f2f2;
  text-align: left;
}

.outgoing-message {
  background-color: #d1e7fd;
  text-align: right;
}

.form-group {
  margin-top: 20px;
}

.input-send {
  display: flex;
}

.form-control {
  flex-grow: 1;
  resize: vertical; /* Дозволяє користувачеві змінювати розмір поля введення вертикально */
}

.connect-button {
  background-color: #4caf50; /* зелений колір */
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  border-radius: 10px; /* округлення країв */
  font-family: 'Arial', sans-serif; /* читабельний шрифт */
}

.connect-button:hover {
  background-color: #388e3c; /* темний зелений колір при наведенні */
}
.disconnect-button{
  background-color: #da0808; /* зелений колір */
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  border-radius: 10px; /* округлення країв */
  font-family: 'Arial', sans-serif; /* читабельний шрифт */
}

.disconnect-button:hover {
  background-color: #ea0000; /* темний зелений колір при наведенні */
}
.send-button-telegram {
  background-color: transparent; /* прозорий фон */
  border: none; /* видалення рамки */
  cursor: pointer; /* вказівник миші */
  padding: 0; /* внутрішні відступи */
  outline: none; /* видалення виділення */
  width: 54px; /* ширина кнопки */
  height: 44px; /* висота кнопки */
  display: flex; /* використання flex для центрування значка */
  align-items: center; /* центрування по вертикалі */
  justify-content: center; /* центрування по горизонталі */
}

.telegram-icon {
  display: inline-block;
  width: 54px; /* ширина значка */
  height: 44px; /* висота значка */
  background-image: url('https://i.ibb.co/TKv1JCm/image.png'); /* шлях до зображення значка */
  background-size: cover; /* розмір зображення */
  transition: 0.2s; /* плавний перехід */
}

.send-button-telegram:hover .telegram-icon {
  opacity: 0.7; /* прозорість при наведенні */
}

.send-button-telegram:active .telegram-icon {
  opacity: 0.5; /* прозорість при натисканні */
}

.rounded-textarea {
  border-radius: 20px; /* Ви можете змінити це значення згідно з вашими потребами */
}

.rounded-textarea::placeholder {
  text-align: center;
}
</style>
