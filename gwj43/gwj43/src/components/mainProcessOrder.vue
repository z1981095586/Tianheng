<template>
    <div style="height: 150px">
      <table cellspacing='0' cellpadding='0' style="width: 100%;height: 100%;border-collapse: collapse;">
        <tr style="height: 25%">
          <td colspan="2" style="background-color: #e5e6e9"><p class="small_title">加工单主信息</p></td>
        </tr>
        <tr class="standard_border" style="height: 75%;background-color: #ebecef">
          <table cellspacing='0' cellpadding='0'>
            <tr style="height: 33.3px">
              <td class="rightTableTd">
                <div class="blueInputTitle">加工单号</div>
                <el-input class="standard_input" style="width: 150px" size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="blueInputTitle">加工日期</div>
                <el-input class="standard_input" style="width: 150px" size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="blueInputTitle">机台</div>
                <el-input class="standard_input" style="width: 150px"  size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="inputTitle">加工类别</div>
                <el-input class="standard_input" style="width: 150px"  size="mini"></el-input>
              </td>
            </tr>
            <tr style="height: 33.3px">
              <td class="rightTableTd" colspan="4">
                <div class="inputTitle">备注</div>
                <el-input class="standard_input" style="width: 770px" size="mini"></el-input>
              </td>
            </tr>
            <tr style="height: 33.3px">
              <td class="rightTableTd">
                <div class="blueInputTitle">经轴定长</div>
                <el-input class="standard_input" style="width: 150px"  size="mini"></el-input>
              </td>
              <td class="rightTableTd">
                <div class="blueInputTitle">开轴数</div>
                <el-input class="standard_input" style="width: 150px"  size="mini"></el-input>
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

</style>
