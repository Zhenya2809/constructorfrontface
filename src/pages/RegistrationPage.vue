<template>
  <div class="textMessage">
    <span>{{ message }}</span>
  </div>


  <form class="login-form" @submit.prevent="onRegistration">
    <label><i class="form-label"></i>Номер телефону</label>
    <UInput v-model="phone"
            type="login"
            placeholder="Номер телефону"
            autocomplete="name"
            class="UInput" required/>


    <label><i class="orm-label"></i>Email</label>
    <UInput v-model="email"
            type="email"
            placeholder="email"
            class="UInput" required/>


    <label><i class="orm-label"></i>Ім'я</label>
    <UInput v-model="firstName"
            :type="firstName"
            placeholder="Ім'я"
            autocomplete="family-name"
            class="UInput" required/>


    <label><i class="orm-label"></i>Призвіще</label>
    <UInput v-model="lastName"
            :type="lastName"
            placeholder="Призвіще"
            class="UInput" />


    <label><i class="orm-label"></i>Пароль</label>
    <UInput v-model="password"
            type="password"
            placeholder="Пароль"
            class="UInput"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required/>


    <label><i class="orm-label"></i>Re-Пароль</label>
    <UInput v-model="rePassword"
            type="password"
            placeholder="re-пароль"
            class="UInput"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required/>

    <p class="clearfix">
      <button type="submit" class="form-button">Зареєструватись</button>
    </p>
  </form>
</template>

<script>



import UInput from "@/components/global/UInput.vue";
import axios from "axios";

export default {
  components: {
    UInput
  },
  name: "RegistrationPage",
  data() {
    return {
      phone: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      req: null,
      role: null,
      message: null,
    }
  },

  methods: {
    onRegistration() {
      const data = {
        phone: this.phone,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };


      console.log(data);

      axios.post('http://localhost:8083/api/v1/auth/register', data)
          .then(response => {
            this.req = response.data;
            window.location.href = 'http://localhost:5173/';
            this.message = response.data.result;
          })
          .catch(error => {
            // Check if the error contains a response (with data) from the server
            if (error.response && error.response.data) {
              const errorMessage = error.response.data;

              // Створюємо контейнер для повідомлення
              const errorContainer = document.createElement('div');
              errorContainer.className = 'error-message';

              // Додаємо повідомлення до контейнера
              errorContainer.textContent = `${JSON.stringify(errorMessage)}`;

              // Додаємо кнопку закриття повідомлення (необов'язково)
              const closeButton = document.createElement('button');
              closeButton.textContent = 'X';
              closeButton.addEventListener('click', () => {
                document.body.removeChild(errorContainer);
              });
              errorContainer.appendChild(closeButton);

              // Додаємо контейнер повідомлення до body
              document.body.appendChild(errorContainer);
            } else {
              console.error('Error while sending the request:', error);
            }
          });
    },
  }
};
</script>

<style>
/* Стилі для повідомлення про помилку */
.error-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: black;
  color: white;
  font-size: 26px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999; /* Встановіть велике значення z-index, щоб повідомлення було завжди наверху */
}

/* Стилі для кнопки закриття повідомлення (необов'язково) */
.error-message button {
  background-color: transparent;
  border: none;
  color: red;
  font-size: 16px;
  cursor: pointer;
  float: right;
}
.login-form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 23px;
}

.form-label {
  font-size: 1rem;
  display: block;
  margin-bottom: 0.5rem;
}

.form-button {
  width: 100%;
  font-size: 1.2rem;
  padding: 0.75rem;
  color: #fff;
  background-color: #91ee8e;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.form-button:hover,
.form-button:focus {
  background-color: #e8b277;
}

.UInput {

  width: 70%
}

</style>