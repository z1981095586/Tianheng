<template>
  <div id="app">

    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true,
        loading: false
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        
        this.$nextTick(function () {
          this.isRouterAlive = true
          const loading = this.$loading({
            lock: true,
            text: '重新加载中！',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(() => {
            loading.close();
            this.$message({
              message: '页面已刷新！',
              type: 'success'
            });
          }, 1000);
        })
      }
    }
  }

</script>

<style>
  @import './common/font/font.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

  }

  body {
    margin: 0;
    padding: 0;
  }

</style>
