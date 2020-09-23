<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="http://localhost:8080/#/select/018040/1/10000018"
          target="_blank"
        >
       to select
        </a>
      </li>
      <li>
        <a
          href="http://192.168.43.119:8080/#/Maintenance/10000018/1/admin/大保养/1175"
          target="_blank"
        >
       to 保养
        </a>
      </li>
     
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello{
  background: aquamarine;

}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
