<template>
    <div style="width: 1160px">
      <div style="width: 100%;text-align: center">
        <el-button type="primary" style="width:250px;height:80px;font-size: 40px;margin-bottom: 5px" @click="changeShiftAll">一键交换班</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        :header-row-style="{height:'100px',fontSize:'20px'}"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="开始时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="currentStaffName"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="axisNo"
          label="经轴号"
        >
        </el-table-column>
        <el-table-column
          prop="currentLength"
          label="当前米长"
          >
        </el-table-column>
        <el-table-column
          prop="workQty"
          label="设定米长"
        >
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          multipleSelection:[],
          tableData:[]
        }
      },
      methods:{
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        selectAll(){
          for (let i = 0; i < this.tableData.length; i++) {
            this.$refs.multipleTable.toggleRowSelection(this.tableData[i],true)
          }
        },
        getData(data){
          this.tableData = data;
          this.$nextTick(() => {
            this.selectAll();
          });
        },
        changeShiftAll(){
          console.log(this.multipleSelection)
        }
      },
      mounted() {

      },
      destroyed() {

      }
    }
</script>

<style lang="less" scoped>

</style>
