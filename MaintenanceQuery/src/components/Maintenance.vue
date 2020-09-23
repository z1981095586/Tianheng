<template>
  <div class="content" style="padding-top:10px;">
    <el-dialog title="请选择保养类型" :visible.sync="dialogVisible" width="60%">
      <select name="bbxb" id="selecte" class="shortselect3" @change="change3">
        <option :value="item.id" v-for="item in maintainTypeList">{{item.name}}</option>

      </select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">保养</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>
    <!--出库单详细-->
    <div class="all-page">
      <div class="contain">
        <div class="head">
          <div class="con" style="width:55%;"><span>设备编号：{{machine_id}}</span></div>
          <div class="con"><span>设备类型：{{type_name}}</span></div>

        </div>

      </div>

      <div class="contain">
        <div class="head">
          <div class="con" style="width:55%;"><span>保养分类：{{flag}}</span></div>
          <div class="con"><span></span></div>

        </div>

      </div>
      <div style="height:80%;overflow:auto;background:white;margin-top:5px;">
        <div v-for="item in datalist">
          <div class="contain" v-if="item.confirm==1">
            <div class="card">
              <div class="card-head"><span
                  style="color:red;font-weight:700;font-size:20px;text-align:center;">*</span><span>{{item.index}}.保养条目：{{item.name}}</span>
              </div>
              <div class="line">
                <div class="line-con"></div>
              </div>
              <div class="card-content" style="margin-top:10px;">
                <div class="card-con">

                   <el-checkbox v-model="item.radio">是</el-checkbox>
                                

                </div>

              </div>

            </div>

          </div>
          <div class="contain" style="margin-top:10px;" v-else-if="item.confirm==3">
            <div class="card">
              <div class="card-head"><span
                  style="color:red;font-weight:700;font-size:20px;text-align:center;">*</span><span>{{item.index}}.保养条目：{{item.name}}</span>
              </div>
              <div class="line">
                <div class="line-con"></div>
              </div>
              <div class="card-content" style="margin-top:10px;">
                <div class="content-two">

                  <el-input type="textarea" rows="2" placeholder="请输入内容" v-model="item.input"
                    @input="(value) => {linput(value,item.id)}">
                  </el-input>
                </div>

              </div>
            </div>

          </div>

          <div class="contain" style="margin-top:10px;" v-else="item.confirm==2">
            <div class="card2">
              <div class="card-head"><span>{{item.index}}.保养条目：{{item.name}}</span><span
                  style="color:rgba(0,0,0,0.5)">(提交现场实际照片)</span></div>
              <div class="line">
                <div class="line-con"></div>
              </div>
              <div class="contain">
                <div class="upload">
                  <el-upload action="http://120.55.124.53:8206/api/file/fileUpload/maintain" :limit="limit"
                    :auto-upload="autoUpload" list-type="picture-card" :on-error="uploadError"
                    :on-remove="(file, fileList) => {handleRemove(file, fileList, item.id)}" accept="image/*"
                    :on-exceed="toMany" :file-list="item.filelist"
                    :on-success="(response,file, fileList) => {handleAvatarSuccess(response,file, fileList, item.id)}">
                    <i class="el-icon-plus" :id="item.index"></i>
                  </el-upload>

                </div>
              </div>




            </div>

          </div>
        </div>
            <div class="card2" style="height:129px;">
          <div class="card-head2">
            <div style="margin-left:5px;"><span>消耗物料：</span><span style="color:rgba(0,0,0,0.5)">(备品更换使用记录)</span></div>
          
            <div class="add_btn" @click="toadd"><span>增加</span></div>
          </div>
          <div class="line">
            <div class="line-con"></div>

          </div>
          <div style="height:80%;overflow:auto;">
            <div v-for="(item,index) in consume_list" :key="index">
              <div class="contain">
                <div class="contain-son" style="margin-left:5px;">
                  <span>备品名称：{{item.name}}</span>
                  <span style="margin-right:20px;">备品规格：{{item.specification}}</span>

                </div>

              </div>
              <div class="contain">
                <div class="contain-son" style="margin-left:5px;">
                  <span>备品数量：{{item.stockQuantity}}</span>
                  <div class="del_btn"><i class="el-icon-delete-solid" @click="deletes(item.id)"></i></div>

                </div>

              </div>
              <div class="line" style="margin-top:5px;">
              </div>
              <div class="line-con"></div>

            </div>

          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="submit" @click="isclick()"><span>提交</span></div>
        <div class="cancel" @click="back"><span>取消</span></div>
      </div>
      <!-- <div class="contain" style="margin-top:10px;">
        <div class="card2" style="height:129px;">
          <div class="card-head2">
            <div style="margin-left:5px;"><span>消耗物料：</span><span style="color:rgba(0,0,0,0.5)">(备品更换使用记录)</span></div>
          
            <div class="add_btn" @click="toadd"><span>增加</span></div>
          </div>
          <div class="line">
            <div class="line-con"></div>

          </div>
          <div style="height:80%;overflow:auto;">
            <div v-for="(item,index) in consume_list" :key="index">
              <div class="contain">
                <div class="contain-son" style="margin-left:5px;">
                  <span>备品名称：{{item.name}}</span>
                  <span style="margin-right:20px;">备品规格：{{item.specification}}</span>

                </div>

              </div>
              <div class="contain">
                <div class="contain-son" style="margin-left:5px;">
                  <span>备品数量：{{item.stockQuantity}}</span>
                  <div class="del_btn"><i class="el-icon-delete-solid" @click="deletes(item.id)"></i></div>

                </div>

              </div>
              <div class="line" style="margin-top:5px;">
              </div>
              <div class="line-con"></div>

            </div>

          </div>
        </div>

      </div> -->
    </div>

  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Maintenance',
    data() {
      return {
        // dialogImageUrl: '',
        dialogVisible: false,
        maintain_type_id: "",
        isClickIn: "",
        maintainTypeList: [], //保养类型选项
        isclickIn: null,
        mac_type_id: null, //设备类型id
        type_name: null, //类型名称
        machine_id: null, //设备id
        operator: "", //操作人
        flag: null, //用于存放当前设备是大保养还是小保养
        company_id: '',
        limit: 5, //最多5张照片
        autoUpload: true, //选择图片后自动上传服务器获取url
        datalist: [], //保养列表
        company_id: "",
        workshop_id: "",
        yes: true,
        no: false,
        consume_list: [] //消耗物料列表
      }
    },
    methods: {
      isclick() {
        console.log(this.maintain_type_id)
        // if (this.isClickIn == "false") {

        //   this.dialogVisible = true
        // } else {
        //   console.log("sda")
          this.submit()
        // }
      },
      change3(e) { //mactype下拉选择框值改变重新获取数据

        console.log(e)

        this.maintain_type_id = e.target.value

      },
      toadd() { //跳转到增加消耗物料列表的界面，并将当前的设备编号，设备名称等数据转发
        //console.log(this.machine_id)
        console.log(this.operator)
        console.log(this.datalist)

        let dataObj2 = { //存放点击的设备信息
          type_name: this.type_name,
          mac_type_id: this.mac_type_id,
          flag: this.flag,
          machine_id: this.machine_id
        }
        this.$router.push({
          path: "/Maintenance_materials",
          name: "Maintenance_materials",
          params: {
            operator: this.operator,
            dataObj2: dataObj2,
            machine_id: this.machine_id,
            workshop_id: this.workshop_id,
            company_id: this.company_id,
            maintain_type_id: this.maintain_type_id,
            flag: this.flag,
            isClickIn: this.isClickIn,
            datalist: this.datalist //把填写的信息发送

          }
        })
      },

      back() { //点击取消返回上一个页面，保养列表
        let p = {
          mac_type_id: this.mac_type_id,
          workshop_id: this.workshop_id,
          company_id: this.company_id,
          machine_id: this.machine_id
        }
        console.log(p)
        this.$router.push({ //跳转并传参数
          path: '/Maintenance_list',
          name: 'Maintenance_list',
          params: p

        })
      },
      getParams() {
        // 取到路由带过来的参数 
        console.log(this.$route.params)
        this.company_id = this.$route.params.company_id
        this.maintain_type_id = this.$route.params.maintain_type_id
        this.isClickIn = this.$route.params.isClickIn
        this.workshop_id = this.$route.params.workshop_id
        this.operator = this.$route.params.operator
        this.datalist = this.$route.params.datalist
        // this.mac_type_id =this.$route.params .mac_type_id//这个是扫码页面传来的当前的设备编号，设备名称等数据
        this.flag = this.$route.params.flag
        //this.type_name = this.$route.params .type_name
        this.machine_id = this.$route.params.machine_id
        // if(this.datalist.filelist==undefined){
        //       if(this.datalist.filelist.length>0){
        //       for(let i=0;i<this.datalist.filelist.length;i++){
        //         this.datalist.filelist[i].url=this.datalist.filelist[i]
        //         this.datalist.filelist[i].name=i
        //       }
        //     }
        // }
        
//         if(this.$route.params.mac_type_id){
//  this.mac_type_id= this.$route.params.mac_type_id
//         }
        console.log(this.maintain_type_id)
        console.log(this.isClickIn)
        if (this.isClickIn == "false") {

          this.getMaintainType()
        }
        console.log(this.operator)
        if (this.$route.params.dataObj) { //这个是取增加页面发给本页面的选中的消耗物料数据

          let routerParams = this.$route.params.dataObj
          this.consume_list = routerParams
        }

        let that = this;
        axios.get("http://106.12.219.66:8763/com-machine-info/selectAMachineRelation", {
          params: {
            machineId: that.machine_id
          },
          headers: {
            companyId: that.company_id
          }
        }).then((res) => {
          console.log(res);
                // if(that.mac_type_id==""){
 that.mac_type_id = res.data.data[0].machineType
          // }

          that.type_name = res.data.data[0].macType.typeName
          if (that.datalist) {
            console.log(that.datalist)
          } else {
            that.getMaintain() //获取保养信息
          }

        });







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

      submit() { //提交
        console.log(this.datalist)
        for (let i = 0; i < this.datalist.length; i++) {

          if (typeof (this.datalist[i].filelist) != "undefined") {
            if (this.datalist[i].filelist.length > 0) {
              for (let j = 0; j < this.datalist[i].filelist.length; j++) {
                if (this.datalist[i].filelist[j].url) {
                  this.datalist[i].filelist[j] = this.datalist[i].filelist[j].url
                }

              }
            }
          }

        }

        let maintain_type = this.maintain_type_id;
        // if (this.flag == "大保养") { //如果是大保养，需要将类型转为1，传给后台
        //   maintain_type = 1
        // } else {
        //   maintain_type = 2
        // }


        let maintainMainRecord = { //这是当前设备和操作者的信息，传给后台
          operator: this.operator,
          "machine_id": this.machine_id,
          "mac_type_id": this.mac_type_id,
          "maintain_type_id": maintain_type,
          "workshop_id":this.workshop_id
        }
        let selectInfo = {
          "company_id": this.company_id
        }
        let arr = this.datalist //arr暂存保养列表数据
        let arr2 = [] //arr2暂存处理完成交给后台的数据列表
        var picture, radio, input; //picture暂存图片，radio存放选择是或否，input暂存输入框说明内容
        for (let i = 0; i < arr.length; i++) { //处理保养条目数组
          if (arr[i].filelist) { //处理图片格式
            if (arr[i].filelist.length > 0) {
              arr[i].picture = this.acTiveArrStringFun(arr[i].filelist)
              //console.log(arr[i].picture)
            }

          }
          picture = ""
          radio = ""
          input = ""
          if (arr[i].picture) {
            if (arr[i].picture == "undefined") { //判断是否存在还是undefined
              arr[i].picture = ""
            }
            picture = arr[i].picture
          }
          console.log(arr[i].radio)
          if (arr[i].radio != "") {
            if (arr[i].radio == "undefined") {
              arr[i].radio = ""
            }
            if (arr[i].radio == true) {
              radio = 1
            } else if (arr[i].radio == false) {
              radio = 0
            }

          }
          if (arr[i].input != "") {
            if (arr[i].input == "undefined") {
              arr[i].input = ""
            }
            input = arr[i].input
          }
          arr2.push({ //将处理好的数据push进arr2
            picture: picture,
            tick: radio,
            text: input,
            maintain_item_id: arr[i].id
          })


        }
        let arr3 = [] //arr3暂存需要增加的消耗物料数据
        for (let j = 0; j < this.consume_list.length; j++) {
          let data3 = {
            product_id: this.consume_list[j].id,
            product_name: this.consume_list[j].name,
            specification: this.consume_list[j].specification,
            quantity: this.consume_list[j].stockQuantity
          }
          arr3.push(data3)
        }

        //数据处理完成，开始更新
        let that = this
        axios.post("http://120.55.124.53:8206/api/maintain/submitMaintain", {

          maintainMainRecord: maintainMainRecord,
          selectInfo: selectInfo,
          maintainList: arr2,
          maintainMaterial: arr3
        }, {
          headers: {
            'Content-Type': 'application/json',

          }
        }).then(function (res) {
          console.log(res)

          if (res.data.message == "成功") {
            that.$message({
              type: 'success',
              message: '更新成功!',
              center: true,
              duration: 2000
            });
            let p = {
              mac_type_id: that.mac_type_id,
              workshop_id: that.workshop_id,
              company_id: that.company_id,
              machine_id: that.machine_id
            }

            that.$router.push({ //跳转并传参数
              path: '/Maintenance_list',
              name: 'Maintenance_list',
              params: p

            })
          } else {
            that.$message.error({

              message: '更新失败!',
              center: true,
              duration: 500
            });
            let p = {
              mac_type_id: that.mac_type_id,
              workshop_id: that.workshop_id,
              company_id: that.company_id
            }

            that.$router.push({ //跳转并传参数
              path: '/Maintenance_list',
              name: 'Maintenance_list',
              params: p

            })
          }
        })
      },

      deletes(id) { //这边是删除一条消耗物料的函数
        //console.log(id)
        this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.consume_list.length; i++) {
            if (this.consume_list[i].id == id) {
              let index = this.consume_list.indexOf(this.consume_list[i]);
              this.consume_list.splice(index, 1)
            }
          }
          this.$message({
            type: 'success',
            message: '删除成功!',
            center: true,
            duration: 1000
          });
        }).catch(() => {

        });

      },
      getMaintainType() { //获取保养类型
        console.log("das")
        let url = "http://120.55.124.53:8206/api/maintain/getMaintainType"
        let that = this
        axios.post(url, {
          selectInfo: {
            company_id: that.company_id
          },
          // mac_type_id: that.mac_type_id
          maintainType: {
            mac_type_id: that.mac_type_id
          }

        }, {
          headers: {
            'Content-Type': 'application/json',
            "companyId": that.company_id
          }
        }).then(function (res) {
          console.log(res)
          let list = []
          // that.maintain_type_id = res.data.result[0].id
          for (let i = 0; i < res.data.result.length; i++) {

            list.push({
              id: res.data.result[i].id,
              name: res.data.result[i].name
            })
          }
          that.maintainTypeList = list
          console.log(that.maintainTypeList)
        })
      },
      // 输入框监听
      linput(value, id) {

        for (let i = 0; i < this.datalist.length; i++) {

          if (this.datalist[i].id == id) {

            this.datalist[i].input = value





          }
        }
      },
      lradio(value, id) { //单选框事件

        for (let i = 0; i < this.datalist.length; i++) {
          if (this.datalist[i].id == id) {
            this.datalist[i].radio = value
          }
        }
      },
      handleRemove(file, fileList, id) { //移除图片
        let url = "http://120.55.124.53:81"
        let k = url + file.response.result
        for (let i = 0; i < this.datalist.length; i++) {
          if (this.datalist[i].id == id) {
            let index = this.datalist[i].filelist.indexOf(k);
            this.datalist[i].filelist.splice(index, 1);
          }
        }
        //console.log(this.datalist)
      },

      toMany() {
        this.$message.error({
          message: '图片最多四张！',
          center: true,
          duration: 1000
        });
      },
      uploadError(err, file, fileList) {
        console.log(err)
        console.log(file)
        this.$message({
          message: '上传失败，图片不能大于1Mb！',
          center: true,
          duration: 2000
        });

      },
      // 上传图片-成功
      handleAvatarSuccess(response, file, fileList, id) {
        let url = "http://120.55.124.53:81"
        console.log(response)
        for (let i = 0; i < this.datalist.length; i++) {
          if (this.datalist[i].id == id) {
            if (this.datalist[i].filelist) {

              this.datalist[i].filelist[this.datalist[i].filelist.length] = url + file.response.result
            } else {
              this.datalist[i].filelist = []
              this.datalist[i].filelist[0] = url + file.response.result
            }

          }
        }
        //console.log(this.datalist)
        if (response.message != "成功") {


          this.$message.error({
            message: '上传失败，请重新选择图片！',
            center: true,
            duration: 1000
          });
        }
      },


      getMaintain() { //获取保养信息
        let url = "http://120.55.124.53:8206/api/maintain/getMaintain"
        let that = this
        axios.post(url, {

          // mac_type_id: that.mac_type_id
          mac_type_id: that.mac_type_id
        }, {
          headers: {
            'Content-Type': 'application/json',
            "companyId": that.company_id
          }
        }).then(function (res) {
          console.log(res)

          if (res.data.result == "fail") {

            that.$message.error({
              message: res.data.message,
              center: true,
              duration: 500
            });
            return;
          } else {
            let list = []
            console.log(that.flag)
            for (var i = 0; i < res.data.data.length; i++) {
                 
                if(res.data.data[i].name==that.flag){
               
for (var j = 0; j < res.data.data[i].maintainItemList.length; j++) {
  res.data.data[i].maintainItemList[j].index = j+1
                res.data.data[i].maintainItemList[j].input = ""
                res.data.data[i].maintainItemList[j].radio = ""
                list.push(res.data.data[i].maintainItemList[j])
                }
                
              }
            }
            //           if(that.flag=="大保养"){
            //   for (var i = 0; i < res.data.data['大保养'].length; i++) { //将大保养的数据push进list暂存
            //             res.data.data['大保养'][i].index = i + 1
            //             res.data.data['大保养'][i].input = ""
            //             res.data.data['大保养'][i].radio = ""
            //             list.push(res.data.data['大保养'][i])
            //           }
            //           }else if(that.flag=="小保养"){
            // for (var i = 0; i < res.data.data['小保养'].length; i++) { //将小保养的数据push进list暂存
            //             res.data.data['小保养'][i].index = i + 1
            //             res.data.data['小保养'][i].radio = ""
            //             res.data.data['小保养'][i].input = ""
            //             list.push(res.data.data['小保养'][i])
            //           }
            //           }


            //console.log(list)
            that.datalist = list
          }

        })
      }




    },
    mounted() {
      //console.log(this)
      this.getParams() //先获取其他页面传过来的数据
history.pushState(null, null, window.location.href);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, window.location.href);
        });

    }
  }

</script>
<style>
  .el-message-box__wrapper /deep/ .el-message-box {
    width: 70%;
  }

</style>
<style scoped>
  .shortselect3 {
    width: 100%;
    display: block;
    position: relative;
    min-height: 1.146667rem;
    line-height: 1.146667rem;
    white-space: nowrap;
    font-size: 12px;
    color: rgb(21, 153, 204);
    overflow: hidden;
    background-color: #eee;
    background: transparent;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .el-radio-button__inner,
  .el-radio-group {
    display: flex;
    flex-direction: column;
  }

  .content-two .el-input {

    border: none;
  }

  .content-two /deep/ textarea {
    border: none;
  }

  .bottom {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;

    bottom: 0;
  }

  .submit {
    width: 49%;
    height: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(49, 153, 102);
    color: white;
  }

  .cancel {
    width: 49%;
    height: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(255, 153, 102);
    color: white;
  }

  .contain-son {
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .add_btn {
    width: 68px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    float: right;
    background: rgb(21, 153, 204);
    margin-right: 15px;
  }

  .del_btn {
    width: 68px;
    height: 22px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: rgb(255, 10, 10);
    font-size: 20px;
    float: right;

    margin-right: 15px;
  }

  .upload {
    margin-top: 5px;
    width: 90%;
    background: rgb(215, 215, 215);
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .card2 /deep/ .el-upload--picture-card {
    line-height: 35px;
    width: 35px;
    height: 35px;
    margin: 0 8px 0px 0;
  }

  .card2 /deep/ .el-upload-list--picture-card .el-upload-list__item {
    margin: 0 8px 0px 0;
  }

  .card2 {
    width: 95%;
    height: 97px;
    display: flex;
    flex-direction: column;
    background: white;
    font-size: 0.9rem;

    font-weight: 700;
  }

  .card2 /deep/ .el-icon-plus {
    line-height: 35px;

  }

  .upload /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 35px;
    height: 35px;
  }

  .card2 /deep/ img {
    width: 35px;
    height: 35px;
  }

  .contain {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .all-page {
    margin-top: 12px;
    width: 100%;

    height: 100%;

    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;

  }

  .head {
    width: 95%;
    height: 1.2rem;
    display: flex;
    justify-content: space-around;

  }

  .line {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .line-con {

    width: 95%;
    height: 1.5px;
    background: rgb(242, 242, 245);
  }

  .card {
    width: 95%;
    height: 88px;
    display: flex;
    flex-direction: column;
    background: white;
    font-size: 0.9rem;

    font-weight: 700;
  }

  .card-head {
    width: 100%;
    height: 37%;
    display: flex;

    align-items: center;
  }

  .card-head2 {
    width: 100%;
    height: 29%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-head span {
    margin-left: 5px;
  }

  .card-content {
    width: 100%;
    height: 44%;

    display: flex;

    justify-content: flex-start;
  }

  .card-con {
    width: 80px;
    height: 100%;
    display: flex;
    flex-direction: column;

    justify-content: center;
  }

  .card-content /deep/ .el-radio {
    margin: 0;
  }

  .card-content2 {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-one {
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 78%;
    line-height: 78%;
    background: rgb(113, 182, 12);
    font-size: 1.4rem;
    color: white;

    font-weight: 400;
  }

  .content-two {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 78%;
    height: 78%;
    background: rgb(21, 153, 204);
    font-size: 1.4rem;
    color: white;
    font-weight: 400;
  }

  .content-two input {
    width: 100%;
    border: none;
    height: 100%;
  }

  .con {
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.9rem;

  }

  .con span {
    margin-left: 5px;
  }

</style>
