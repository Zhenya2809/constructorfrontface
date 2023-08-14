<template>



</template>
<script>


export default {
  mounted() {
  },

  data() {
    return {
    };
  },

  methods: {

  },
};
</script>
<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav {
  background-color: #f8f9fa;
  padding: 10px 20px;
}

nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #343a40;
}

nav a.router-link-exact-active {
  color: #495057;
  font-weight: bold;
}

router-view {
  margin: 20px 0;
  width: 100%;
}

h1 {
  display: flex;
  justify-content: center;

  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 50px;
  font-weight: 600;
}
h2 {
  display: flex;
  justify-content: center;

  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 20px;
  font-weight: 600;
}

</style>