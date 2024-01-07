<template>
  <header-page></header-page>
  <nav>
    <router-link to="/history" exact>History</router-link>
    <router-link to="/chatQueue" exact>Черга</router-link>
    <router-link to="/createBot" exact>Створити Бота</router-link>
    <router-link to="/login" @click="logOut">Вихід</router-link>
  </nav>
  <router-view></router-view>
</template>

<script>
import { ref, onMounted } from 'vue';
import HeaderPage from "@/pages/HeaderPage.vue";

export default {
  components: {
    HeaderPage
  },
  setup() {
    // State
    const hideContent = ref(false);

    // Methods
    const checkRole = () => {
      hideContent.value = localStorage.getItem('role') == null;
    }

    const logOut = () => {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      // window.location.href = 'http://localhost:8080/login';
    }

    onMounted(() => {
      checkRole();
    });

    return {
      hideContent,
      logOut
    };
  }
};
</script>

<style scoped>
nav {
  margin: 37px auto 0;
  position: relative;
  width: 1090px;
  height: 100px;
  border-radius: 8px;
  font-size: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  line-height: 50px;
  height: 100%;
  font-size: 25px;
  display: inline-block;
  position: relative;
  z-index: 10;
  text-decoration: none;
  color: #605f5f;
  text-shadow: 0 0 15px #888888;
  font-weight: 600;
}
</style>