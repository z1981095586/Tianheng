<template>
  <div id="app">

    <router-view />
    <footer-bar v-show="barShow" class="footer" :select="select"></footer-bar>
  </div>
</template>

<script>
  import Footer from './components/FooterBar.vue'

  export default {
    name: 'App',
    data() {
      return {
        barShow: true,
        select: "index"
      }
    },
    components: {
      'footer-bar': Footer
    },
    watch: {
      $route(e) {
        console.log(e.name)
        if (e.name == "search") {
          this.barShow = false
        } else if (e.name == "index") {
          this.select = "index"
          this.barShow = true
        } else if (e.name == "good_Detail") {

          this.barShow = false
        } else if (e.name == "ShoppingCart") {
          this.select = "ShoppingCart"
          this.barShow = true
        } else if (e.name == "my") {
          this.select = "my"
          this.barShow = true
        } else if (e.name == "order") {
          this.barShow = false
        } else if (e.name == "address") {
          this.barShow = false
        } else if (e.name == "add_address") {
          this.barShow = false
        } else if (e.name == "sureOrder") {
          this.barShow = false
        }
      }
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

  }


  body {
    margin: 0;
    padding: 0;
  }

</style>
