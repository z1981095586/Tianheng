<template>
  <el-alert
    :title="alertText"
    type="info"
    :closable="false"
    effect="dark">
  </el-alert>
</template>

<script>
    import axios from "axios"
    export default {
      data () {
        return {
          alertText:"提示信息：刷卡系统初始化成功，请按正确步骤刷卡作业"
        }
      },
      methods:{

      },
      mounted() {

      },
      destroyed() {

      }
    }
</script>

<style lang="less">
  body,td,th {
    font-size: 20px;
  }
</style>
