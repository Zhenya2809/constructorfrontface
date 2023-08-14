<script setup>
import {ref, onMounted} from 'vue';
import HeaderPage from "@/pages/HeaderPage.vue";

// State
const img1 = ref(/* You need to define or import img1 here. Was it missed in the code? */);
const hideContent = ref(false);

// Methods
const checkRole = () => {
  if (localStorage.getItem('role') == null) {
    hideContent.value = true;
  } else {
    hideContent.value = false;
  }
}

const logOut = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = 'http://localhost:8080/login';
}

const hasRole = (role) => {
  return localStorage.getItem('role') === role;
}

onMounted(() => {
  checkRole();
  window.addEventListener('scroll', () => {
    document.body.style.cssText = `--scrollTop:${scrollY}px`;
  });
});
</script>

<template>
  <HeaderPage></HeaderPage>
  <nav>
    <n-avatar
        :size="110"
        :src="img1"
    />
    <router-link v-if="hasRole('ROLE_USER')" to="/home" exact>Головна</router-link>
    <router-link v-if="hasRole('ROLE_USER')" to="/chatQueue" exact>Queue</router-link>
    <router-link v-if="hasRole('ROLE_USER')" to="/createBot" exact>CreateBot</router-link>

<!--    <router-link v-if="hasRole('ROLE_USER')" to="/my-appointment" exact>Записи</router-link>-->
<!--    <router-link v-if="hasRole('ROLE_USER')" to="/chose-doctor">Лікарі</router-link>-->
<!--    <router-link v-if="hasRole('ROLE_USER')" to="/about">Про нас</router-link>-->
<!--    <router-link v-if="hasRole('ROLE_USER')" to="/profile">Мій профіль</router-link>-->
<!--    <router-link v-if="hasRole('ROLE_ADMIN')" to="/profile">Картки</router-link>-->
<!--    <router-link v-if="hasRole('ROLE_ADMIN')" to="/users-menu">Користувачі</router-link>-->
<!--    <router-link v-if="hasRole('ROLE_ADMIN')" to="/doctors-menu">Лікарі</router-link>-->
<!--    <router-link v-if="hasRole('ROLE_ADMIN')" to="/admin">Нагадування</router-link>-->
<!--    <router-link v-if="hasRole('ROLE_ADMIN')" to="/test-page">testPage</router-link>-->
<!--    <router-link v-if="hideContent" to="/login" class="login">Вхід</router-link>-->
<!--    <router-link v-if="hasRole('ROLE_DOCTOR')" to="/appointments" exact>Записи</router-link>-->
<!--    <router-link v-if="hasRole('ROLE_DOCTOR')" to="/doctor-profile" exact>Мій профіль</router-link>-->
<!--    <router-link v-if="hasRole('ROLE_DOCTOR')" to="/treatment" exact>Лікування</router-link>-->
    <router-link v-if="hasRole('ROLE_ADMIN')||hasRole('ROLE_USER')||hasRole('ROLE_DOCTOR')" to="/login" @click="logOut"
                 class="logout">Вихід
    </router-link>
  </nav>
  <router-view></router-view>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

nav {
  margin: 37px auto 0;
  position: relative;
  width: 1090px;
  height: 100px;
  border-radius: 8px;
  font-size: 0;
  align-content: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.router-link {
  flex: 1;
  text-align: center;
  padding: 10px;
}

h1 {
  display: flex;
  justify-content: center;
}

nav a {
  line-height: 50px;
  height: 100%;
  font-size: 25px;
  display: inline-block;
  position: relative;
  z-index: 10;
  text-decoration: none;
  text-align: center;
  color: #605f5f;
  text-shadow: 0 0 15px #888888;
  cursor: pointer;
  font-weight: 600;


}

a:nth-child(1) {
  width: 11px;

}

a:nth-child(2) {
  width: 150px;

}

a:nth-child(3) {
  width: 180px;

}

a:nth-child(4) {
  width: 110px;

}

a:nth-child(5) {
  width: 166px;

}

a:nth-child(6) {
  width: 190px;

}

a:nth-child(7) {
  width: 140px;

}

a:nth-child(8) {
  width: 100px;
}

a:nth-child(9) {
  width: 100px;
}

a:nth-child(10) {
  width: 100px;
}

.middle {
  padding-top: 50px;
  width: 400px;
  margin: 0 auto;
}

.middle1 {
  float: right;
  padding-right: 127px;
}
</style>
