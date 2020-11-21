<template>
  <div>
    <el-select v-model="value" filterable placeholder="请选择" @change="showName">
      <el-option
        v-for="(item,index) in workerList"
        :key="index"
        :label="item.staff_name"
        :value="item.staff_code">
      </el-option>
    </el-select>

  </div>
</template>

<script>
  import { common_api } from '../../../../static/api/api.js';
  export default {
    data () {
      return {
        options: [{
          value: ' ',
          label: ' '
        }],
        value: '',
        workerList : [],

      }
    },


    methods:{
      getWorker(){
        let data = {};
        data.tableName = "s_staff";
        data.selectFields =["staff_name","staff_code","id"];
        common_api("/report/getSimpleReport", data,"10000015")
          .then(response => {
            console.log(response.data.data);
            this.workerList = [];
            for (let i = 0; i < response.data.data.length; i++) {
              if(response.data.data[i].staff_code>0){
                this.workerList.push(response.data.data[i])
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      showName(e){
        // alert(this.value)
        this.$alert('这是一段内容'+e, '员工号', {
          confirmButtonText: '确定',
        });
      }
    },
    mounted() {//网页先显示内容

    },
    created() {
      this.getWorker();
    }
  }
</script>

<style lang="less">

</style>
