<template>
  <div class="allPage">


  </div>
</template>

<script>
import keyboard from '@/components/keyboard'
  export default {
components:{keyboard},
    name: 'index',
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {

    }
  }

</script>

<style scoped>
  .allPage {
    width: 100%;
    height: 100vh;


  }
.keyboard{
  width: 33rem;
  height: 16rem;
}
.keyboard /deep/ .el-checkbox-button__inner{
  font-size: 5rem;
  margin: 0.5rem;
}
</style>
