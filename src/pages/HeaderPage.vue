<template>
  <header>

    <header class="bg-grey-lighten-1">
      <v-row justify="center" no-gutters class="links-container">

        <v-col class="text-center mt-4" cols="12">
          <strong>{{headerPage}}</strong>
        </v-col>
      </v-row>
    </header>
  </header>
</template>

<script>
export default {
  mounted() {

  },
  name: "HeaderPage",
  data() {
    return{
      headerPage: ' COMPANY NAME OR LOGO !'
    }
  }
}
</script>

<style scoped>


.bg-grey-lighten-1 {
  background-color: #f3f3f3 !important;
  color: #000000 !important;
}
header {
  text-transform: uppercase;
  position: relative;
  text-align: center;
  text-shadow: 0 0 15px #888888;
}
</style>