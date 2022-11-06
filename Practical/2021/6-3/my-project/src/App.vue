<template>
  <div id="app">
    <div id="nav">
      <router-link to="/zuixin">最新</router-link>
      <router-link to="/remen">热门</router-link>
      <router-link to="/tuijian">推荐</router-link>
    </div>
    <router-view class="show"/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: auto;
  width: 600px;
  .show{
    padding: 20px 10px 20px 10px;
    border: 1px solid #999;
    margin-top:-1px;
    li{
      list-style: none;
    }
    li span:nth-child(1){
      color:red;
      margin-left: 10px;
    }
    li span:nth-child(2){
      float:right;
    }
  }

}

#nav {
  width: 321px;
  height: 50px;
  line-height: 50px;
  margin-top: 30px;
  font-size: 20px;
  a {
    display: inline-block;
    text-align:center;
    width:104px;
    border: 1px solid #999;
    border-bottom: none;
    margin-right: 1px;
    background-color: #ffffaa;
    color:black;
    text-decoration: none;
    &.router-link-exact-active {
      background-color:white;
    }
  }
}

</style>
