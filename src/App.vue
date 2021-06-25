<template>
  <div id="content">
    <NavBar></NavBar>
      <router-view class="bg"></router-view>
</div>
</template>

<script>
import NavBar from "./components/Nav/NavBar";


export default {
  name: 'App',
  components: {
    NavBar,
  },
  methods: {
    Goto(pageRoute){
      this.$router.push(pageRoute)
    }
  }

}
</script>

<style>
  .bg{
    background-color: #ffffff;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
