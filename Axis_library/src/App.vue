<template>
  <div id="app">

    <router-view/>
    <div class="bottom_font"><span>Copyright © 浙江天衡信息技术有限公司</span></div>

  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style>
  .bottom_font{
    position: absolute;
    bottom: 0%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    z-index: 100;
  }
body{
     padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
 
}
</style>
