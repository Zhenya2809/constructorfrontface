<template>
  <header class="header-bg">
    <v-row justify="center" no-gutters class="links-container">
      <v-col class="text-center header-title" cols="12">
        <strong>{{ headerPage }}</strong>
      </v-col>
    </v-row>
  </header>
</template>

<script>
export default {
  name: "HeaderPage",
  data() {
    return {
      headerPage: 'TELEGRAM API  '
    }
  }
}
</script>

<style scoped>
.header-bg {
  background-color: #4a76a8;
  color: #ffffff;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center; /* Вирівнювання тексту по центру */
}

.header-title {
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 24px;
}
</style>
