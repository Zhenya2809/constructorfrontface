<template>
  <div>
    <h2>Редагування бота</h2>
    <form @submit.prevent="saveChanges">
      <ul class="edit-bot-list">
        <li>
          <label for="botAvatarUrl">Bot Avatar URL:</label>
          <input v-model="editedBot.botAvatarUrl" type="text" id="botAvatarUrl" />
        </li>
        <li>
          <label for="botName">Bot Name:</label>
          <input v-model="editedBot.botName" type="text" id="botName" />
        </li>
        <li>
          <label for="token">Token:</label>
          <input v-model="editedBot.token" type="text" id="token" />
        </li>
        <li>
          <label for="webhookUrl">Webhook URL:</label>
          <input v-model="editedBot.webhookUrl" type="text" id="webhookUrl" />
        </li>
      </ul>
      <button type="submit">Зберегти</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    bot: Object // Передається об'єкт бота з головної сторінки
  },
  data() {
    return {
      editedBot: { ...this.bot } // Копіюємо об'єкт бота для редагування
    };
  },
  methods: {
    saveChanges() {
      // Отримати дані з this.editedBot і відправити їх на сервер для збереження
      // Після успішного оновлення можна перейти на головну сторінку або закрити модальне вікно
    }
  }
};
</script>

<style scoped>
.edit-bot-list {
  list-style-type: none;
  padding: 0;
}

.edit-bot-list li {
  margin-bottom: 10px;
}

.edit-bot-list label {
  display: block;
  font-weight: bold;
}

.edit-bot-list input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>