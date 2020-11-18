<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">检查</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>

    
    <div class="all-page">
      <div class="checkOption">
        <div class="checkOption_con">
          <select name="bbxb" id="select1" class="shortselect3" @change="changeWorkshop">
            <option :value="item.id" v-for="item in workshopList">{{item.name}}</option>

          </select>
          <select name="bbxb" id="select2" class="shortselect3" @change="changeMactype">
            <option :value="item.id" v-for="item in MacType">{{item.type_name}}</option>

          </select>
          <select name="bbxb" id="select3" class="shortselect3" @change="changeLevel">
            <option :value="item.id" v-for="item in levelList">{{item.check_name}}</option>

          </select>
        </div>
      </div>
      <div class="checkOption">
        <div class="checkOption_con2">
          <span style="margin-right:5%">检查项：</span>
          <select name="bbxb" id="select4" class="shortselect3" style="width:40%" @change="changeMaintainType">
            <option :value="item.id" v-for="item in maintainType">{{item.name}}</option>

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
        mac_type_id:"",
        workshop_id:"",
        staff_id: this.$route.params.staff_id,
        operator: this.$route.params.operator,
        workshopList: [],
        MacType: [],
        levelList: [ ],
        isRight: '合格',
        textarea: '',
        filelist: [],
        maintainType: [],
    
        checkedMaintainType: "",
    
        checkedLevel: "",
      }
    },
    methods: {
    getMaintainCheck(){
     
   let url = 'http://120.55.124.53:8206/api/maintain/getMaintainCheck';
    let method = "post";
        let data = {
        selectInfo:this.selectInfo,
       
        };
        let that = this
        axios({
            url: url,
            method: method,
            data: data,
      
          })
          .then(response => {
          console.log(response)
          response.data.result.forEach(element => {
            this.levelList.push(element)
          });
          this.checkedLevel=this.levelList[0].id
      
          })
    },
      getMaintainType(mac_type_id){

   let url = 'http://120.55.124.53:8206/api/maintain/getMaintainType';
    let method = "post";
        let data = {
        selectInfo:this.selectInfo,
        maintainType:{
          mac_type_id:mac_type_id
        }
        };
        let that = this
        axios({
            url: url,
            method: method,
            data: data,
      
          })
          .then(response => {
          console.log(response)
      
          response.data.result.forEach(element => {
            that.maintainType.push(element)
          });
              this.checkedMaintainType=that.maintainType[0].id
          })
      },
         getMacTypeCategoryList() { //获取mactypeid
        let url = 'http://106.12.219.66:8227/report/getSimpleReport';
        let headers = {
          'Content-Type': 'application/json',
          'companyID': this.selectInfo.company_id
        };
        let method = "post";
        let data = {
          "tableName": "mac_type",
          "pageNum": 1,
          "pageSize": 1000,
          "selectFields": ["id", "type_name"],
        };
        let that = this
        axios({
            url: url,
            method: method,
            data: data,
            headers: headers
          })
          .then(response => {
            console.log(response.data.data)
            that.mac_type_id = response.data.data[0].id
            that.getMaintainType(that.mac_type_id)
            for (let i = 0; i < response.data.data.length; i++) {

              that.MacType.push(response.data.data[i])
            }
            that.getWorkShopList() //获取车间id列表
          })

      },
           getWorkShopList() { //获取车间列表数据
        let url = " http://120.55.124.53:8211/workShop/getWorkShopList"
        let that = this
        axios.post(url, {
          page: 1,
          pageSize: 10000
        }, {
          headers: {
            companyId: that.selectInfo.company_id
          }
        }).then(function (res) {
          //console.log(res)
          that. workshopList = res.data.data //设置下拉菜单选项列表
          that.workshop_id = that.workshopList[0].id
     

        })
      },
        acTiveArrStringFun: function (obj) { //数组转字符串，用于将数组图片转换成逗号隔开的字符串形式
        console.log(obj)
        var arr = [];
        if (obj != null && obj.length != 0) {
          for (var i = 0; i < obj.length; i++) {
            arr.push(obj[i]);
          }
        }
        return arr.toString();
      },
      sure() {
        // console.log(this.mac_type_id)
        // console.log(this.workshop_id)
        // console.log(this.checkedLevel)
        // console.log(this.checkedMaintainType)
        // console.log(this.isRight)
        // console.log(this.textarea)
        let check_result;
      if(this.isRight=="合格"){
        check_result="1"
      }else{
        check_result="2"
      }
        let pic=[]
        this.filelist.forEach(element => {
          pic.push(element.url)
        });
        console.log(this.acTiveArrStringFun(pic))
             let url = "http://120.55.124.53:8206/api/maintain/submitCheck"
        let that = this
        axios.post(url, {
      selectInfo: that.selectInfo,
      maintain_check_record:{
        mac_type_id:that.mac_type_id,
        maintain_check_id:that.checkedLevel,
        maintain_type_id:that.checkedMaintainType,
        check_result:check_result,
        detail:that.textarea,
        picture:that.acTiveArrStringFun(pic),
        check_person:that.operator
      }
        }, {
          
        }).then(function (res) {
        
      if(res.data.message=="成功"){
            that.$message({
          message: '提交成功！',
          center: true,
          duration: 2000,
        type: 'success'
        });
      }else{
            that.$message({
          message: '提交失败！',
          center: true,
          duration: 2000,
            type: 'warning'
        });
      }
     

        })
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
        this.workshop_id = e.target.value
      },
      changeMactype(e) {
        console.log(e.target.value)
        this.mac_type_id = e.target.value
        this.getMaintainType(this.mac_type_id)
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
       
      
    
        for(let i=0;i<this.filelist.length;i++){
          if(this.filelist[i].url==file.url){
            this.filelist.splice(i,1)
          }
        }
      
      },
    },
    mounted() {
      this.selectInfo.company_id = this.$route.params.company_id;
      this.getMacTypeCategoryList()
      this.getMaintainCheck()
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
    position: absolute;
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
    position: absolute;
    bottom: 3rem;
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
