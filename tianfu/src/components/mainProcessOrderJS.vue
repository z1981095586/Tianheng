<template>
    <div style="height: 250px">
      <table cellspacing='0' cellpadding='0' style="width: 100%;height: 100%;border-collapse: collapse;">
        <tr style="height: 20%">
          <td colspan="2" style="background-color: #e5e6e9"><p class="small_title">浆纱单主信息</p></td>
        </tr>
        <tr class="standard_border" style="height: 80%;background-color: #ebecef">
          <table cellspacing='0' cellpadding='0'>
            <tr style="height: 33.3px">
              <td class="rightTableTd">
                <div class="blueInputTitle">浆纱单号</div>
                <el-input class="standard_input" style="width: 150px" size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="blueInputTitle">产品编号</div>
                <el-input class="standard_input" style="width: 150px" size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="blueInputTitle">机台号</div>
                <el-input class="standard_input" style="width: 150px"  size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="inputTitle">订单号</div>
                <el-input class="standard_input" style="width: 190px"  size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="blueInputTitle" style="width: 60px">浆纱合轴数</div>
                <el-input class="standard_input" style="width: 140px" size="mini"></el-input>
              </td>
            </tr>
            <tr style="height: 33.3px">
              <td class="rightTableTd">
                <div class="inputTitle">总经根数</div>
                <el-input class="standard_input" style="width: 150px" size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="inputTitle" style="width: 60px;">轴幅宽CM</div>
                <el-input class="standard_input" style="width: 140px" size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="inputTitle">经纱长度</div>
                <el-input class="standard_input" style="width: 150px" size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="inputTitle" style="width: 90px">并轴只数(只X根)</div>
                <el-input class="standard_input" style="width: 150px" size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="blueInputTitle">轴长</div>
                <el-input class="standard_input" style="width: 150px" size="mini"></el-input>
              </td>
            </tr>
            <tr style="height: 33.3px">
              <td class="rightTableTd" colspan="5">
                <div class="blueInputTitle">备注</div>
                <el-input class="standard_input" style="width: 1020px"  size="mini"></el-input>
              </td>
            </tr>
            <tr style="height: 67px;">
              <td class="rightTableTd" colspan="5" >
                <div class="blueInputTitle">经纱排列</div>
                <el-input type="textarea" class="standard_input" style="width: 1020px" :autosize="{ minRows: 2, maxRows: 3}" size="mini"></el-input>
              </td>
            </tr>
          </table>
        </tr>
      </table>
    </div>
</template>
<script>
    import axios from "axios"
    export default {
      data () {
        return {
           mainData:[]
        }
      },
      methods:{
        getMainData(data){
          this.mainData = data
        }
      },
      mounted() {

      },
      destroyed() {

      }
    }
</script>

<style lang="less">

</style>
