<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">检查</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>

    
    <div class="all-page">
      <div class="checkOption">
        <div class="checkOption_con">
          <select name="bbxb" id="select1" class="shortselect3" @change="changeWorkshop">
            <option :value="item.id" v-for="item in workshopList">{{item.workshopName}}</option>

          </select>
          <select name="bbxb" id="select2" class="shortselect3" @change="changeMactype">
            <option :value="item.id" v-for="item in MacType">{{item.Name}}</option>

          </select>
          <select name="bbxb" id="select3" class="shortselect3" @change="changeLevel">
            <option :value="item.id" v-for="item in levelList">{{item.Name}}</option>

          </select>
        </div>
      </div>
      <div class="checkOption">
        <div class="checkOption_con2">
          <span style="margin-right:5%">检查项：</span>
          <select name="bbxb" id="select4" class="shortselect3" style="width:40%" @change="changeMaintainType">
            <option :value="item.id" v-for="item in maintainType">{{item.Name}}</option>

          </select>
        </div>
      </div>
      <div class="checkOption">
        <div class="checkOption_con2">
          <span style="margin-right:5%">检查结果：</span>
          <el-radio v-model="isRight" label="合格">合格</el-radio>
          <el-radio v-model="isRight" label="不合格">不合格</el-radio>
        </div>
      </div>

      <div class="checkOption" style="height:3%">
        <div class="checkOption_con2">
          <span>检查详情：</span>

        </div>
      </div>
      <div class="checkOption" style="height:15%">
        <div class="checkOption_con2">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea">
          </el-input>


        </div>
      </div>
      <div class="checkOption" style="height:3%;margin-top:8%">
        <div class="checkOption_con2">
          <span>检查照片：</span>

        </div>
      </div>
      <div class="checkOption" style="height:30%">
        <div class="checkOption_con2">
          <el-upload action="http://120.55.124.53:8206/api/file/fileUpload/maintain" :limit="limit"
            :auto-upload="autoUpload" list-type="picture-card" :on-error="uploadError"
            :on-remove="(file, fileList) => {handleRemove(file, fileList)}" accept="image/*" :on-exceed="toMany"
            :file-list="filelist"
            :on-success="(response,file, fileList) => {handleAvatarSuccess(response,file, fileList)}">
            <i class="el-icon-plus" :id="1"></i>
          </el-upload>


        </div>
      </div>

      <div class="btn"><span @click="sure">提交</span></div>

    </div>

  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'check',
    data() {
      return {
        limit: 5, //最多5张照片
        autoUpload: true, //选择图片后自动上传服务器获取url
        selectInfo: {
          company_id: this.$route.params.company_id
        },
        staff_id: this.$route.params.staff_id,
        operator: this.$route.params.operator,
        workshopList: [{
          workshopName: "鑫海一分厂",
          id: 1
        }, {
          workshopName: "鑫海二分厂",
          id: 2
        }, ],
        MacType: [{
          Name: "喷气织机",
          id: 1
        }, {
          Name: "喷气前端",
          id: 2
        }, ],
        levelList: [{
          Name: "一级监察",
          id: 1
        }, {
          Name: "二级检查",
          id: 2
        }, ],
        isRight: '合格',
        textarea: '',
        filelist: [],
        maintainType: [{
          Name: "每日保养",
          id: 1
        }, {
          Name: "每月保养",
          id: 2
        }, ],
        checkedWorkshop: "",
        checkedMaintainType: "",
        checkedMacType: "",
        checkedLevel: "",
      }
    },
    methods: {
      sure() {
        this.$router.push({ //跳转并传参数
          path: '/ToMaintenance_list',
          name: 'ToMaintenance_list',
          params: {
        
            operator: this.operator,
    
            company_id: this.selectInfo.company_id,
            staff_id: this.staff_id
          }

        })
      },
      back() {
        this.$router.push({ //跳转并传参数
          path: '/ToMaintenance_list',
          name: 'ToMaintenance_list',
          params: {

            operator: this.operator,
  
            company_id: this.selectInfo.company_id,
            staff_id: this.staff_id
          }

        })
      },
      changeWorkshop(e) {
        console.log(e.target.value)
        this.checkedWorkshop = e.target.value
      },
      changeMactype(e) {
        console.log(e.target.value)
        this.checkedMacType = e.target.value
      },
      changeLevel(e) {
        console.log(e.target.value)
        this.checkedLevel = e.target.value
      },
      changeMaintainType(e) {
        console.log(e.target.value)
        this.checkedMaintainType = e.target.value
      },
      // 上传图片-成功
      handleAvatarSuccess(response, file, fileList) {
        let url = "http://120.55.124.53"
        console.log(response)
        let k = {
          name: response.result,
          url: url + response.result
        }

        this.filelist.push(k)
        console.log(this.filelist)
        if (response.message != "成功") {


          this.$message.error({
            message: '上传失败，请重新选择图片！',
            center: true,
            duration: 1000
          });
        }
      },
      toMany() {
        this.$message.error({
          message: '图片最多五张！',
          center: true,
          duration: 1000
        });
      },
      uploadError(err, file, fileList) {
        this.$message({
          message: '上传失败，图片不能大于1Mb！',
          center: true,
          duration: 2000
        });
      },
      handleRemove(file, fileList) { //移除图片
        let url = "http://120.55.124.53:81"
        let k = url + file.response.result
  
      },
    },
    mounted() {
   
      this.selectInfo.company_id = this.$route.params.company_id;

    }
  }

</script>

<style scoped>
  .all-page /deep/ ._v-container {
    position: absolute;
    top: 10%;


  }



  .all-page {
    margin-top: 12px;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
  }

  .checkOption {
    width: 100%;
    height: 8%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .checkOption_con {
    width: 90%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .checkOption_con2 {
    width: 90%;
    height: 100%;

    display: flex;
    align-items: center;

  }

  .checkOption_con2 /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
  }

  .checkOption_con2 /deep/ .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 85px;
  }

  .checkOption_con2 /deep/ .el-textarea__inner {
    margin-top: 8%;
    height: 90%;
  }

  .shortselect3 {
    height: 50%;
  }

  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn span {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(49, 153, 102);
    color: white;
  }

</style>
