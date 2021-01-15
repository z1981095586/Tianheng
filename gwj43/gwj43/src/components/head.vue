<template>
    <div class="head">
      <el-row :gutter="20">
        <el-col :span="4" class="b_title ellipsis" style="text-align: center">
            {{mainTitle}}
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
      data () {
        return {
          mainTitle:"天衡整经刷卡系统"
        }
      },
      methods:{
        changeMainTitle(mainTitle){
          this.mainTitle = mainTitle
        }
      },
      mounted() {

      },
      destroyed() {

      }
    }
</script>

<style lang="less">
  .head{
    background-color: #ebecef;
  }
</style>
