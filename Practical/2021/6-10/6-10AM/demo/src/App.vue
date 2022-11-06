<template>
  <div id="app">
    <p>{{msg}}</p>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default{
  name:"App",
  computed:mapState({
    msg:state=>state.msg
  })
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
