<template>
  <div class="allPage">

    <div class="header">
      <div class="header_con">

        <h2>天衡&布威MES操作手册上传中心</h2>


      </div>
    </div>
    <div class="main">

      <div class="content">

        <div style="height:70%;">
          <div style="margin:1rem;">
            <el-radio v-model="radio" label="1">天衡</el-radio>
            <el-radio v-model="radio" label="2">布威七天</el-radio>
                    <el-radio v-model="radio" label="3">布威mes</el-radio>
          </div>
          <div v-show="radio=='1'">
            <el-cascader @change="changes" v-model="selectedMenu" :clearable="true" filterable placeholder="请选择上传手册的模块"
              :options="data" :props="props"></el-cascader>
            <el-upload style="margin:2rem" class="upload-demo" drag ref="upload" :limit="2"
              action="http://106.12.219.66:14100/mes/file_upload" :file-list="fileList" :auto-upload="true"
              :multiple="true" :on-change="handleChange" :http-request="allUpload">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip" style="color:red;">注意：同时上传pdf文件和doc(docx)文件</div>
              <div class="el-upload__tip" slot="tip" style="color:red;">(选择完成后系统自动上传)</div>
            </el-upload>
            <!-- <el-button type="primary" @click="upload" :disabled="disabled">上传文件</el-button> -->
            <el-button type="primary" @click="download()">下载Word</el-button>
            <el-button type="warning" style="margin-bottom:1rem;" @click="tb()">同步节点</el-button>
          </div>
          <div v-show="radio=='2'">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-upload style="margin:2rem" class="upload-demo" drag ref="upload2" :limit="2"
              action="http://36.26.68.46:14100/BWmes/file_upload" :file-list="fileList2" :auto-upload="true"
              :multiple="true" :on-change="handleChange2" :http-request="allUpload2">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip" style="color:red;">注意：同时上传pdf文件和doc(docx)文件</div>
              <div class="el-upload__tip" slot="tip" style="color:red;">(选择完成后系统自动上传)</div>
            </el-upload>
            <!-- <el-button type="primary" @click="upload2" :disabled="disabled">上传文件</el-button> -->
            <el-button type="primary" @click="download2()">下载Word</el-button>

          </div>
                  <div v-show="radio=='3'">
            <el-cascader @change="changes3" v-model="selectedMenu3" :clearable="true" filterable placeholder="请选择上传手册的模块"
              :options="data" :props="props"></el-cascader>
            <el-upload style="margin:2rem" class="upload-demo" drag ref="upload3" :limit="2"
              action="http://36.26.68.46:14100/mes/file_upload" :file-list="fileList3" :auto-upload="true"
              :multiple="true" :on-change="handleChange3" :http-request="allUpload3">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip" style="color:red;">注意：同时上传pdf文件和doc(docx)文件</div>
              <div class="el-upload__tip" slot="tip" style="color:red;">(选择完成后系统自动上传)</div>
            </el-upload>
            <!-- <el-button type="primary" @click="upload" :disabled="disabled">上传文件</el-button> -->
            <el-button type="primary" @click="download3()">下载Word</el-button>
            <el-button type="warning" style="margin-bottom:1rem;" @click="tb3()">同步节点</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="上传中......." :visible.sync="centerDialogVisible" width="30%" center>

      <el-progress :percentage="num"></el-progress>
    </el-dialog>

  </div>
</template>

<script>
  var getUrl = window.apiRoot.getApi + '/report/getSimpleReport'
    var bwgetUrl = window.apiRoot.bwgetApi + '/report/getSimpleReport'
  import axios from 'axios'
  export default {
    name: 'index',
    data() {
      return {
        companyId: "10000025",
        loginOutShow: false,
        tab: "message",
        data: [],
        data3:[],
        props: {
          value: "name",
          label: "name",
          children: "menuMid"
        },
        selectedMenu: "",
        selectedMenu3:"",
        other: {

        },
          other3: {

        },
        radio: "1",
        disabled: false,
        disabled2: false,
              disabled3: false,
        fileList: [],
        fileList2: [],
             fileList3: [],
        options: [{
            value: '第一天培训手册',
            label: '第一天培训手册'
          }, {
            value: '第二天培训手册',
            label: '第二天培训手册'
          }, {
            value: '第三天培训手册',
            label: '第三天培训手册'
          }, {
            value: '第四天培训手册',
            label: '第四天培训手册'
          }, {
            value: '第五天培训手册',
            label: '第五天培训手册'
          }, {
            value: '第六天培训手册',
            label: '第六天培训手册'
          }, {
            value: '第七天培训手册',
            label: '第七天培训手册'
          },

        ],
        value: '',
        centerDialogVisible: false,
        num: 0


      }
    },
    methods: {
      handleChange2(file, fileList) { //文件改变事件

        this.fileList2 = fileList;
      },
      allUpload2() { //上传事件
        let formData = new FormData();


        formData.append("file", this.fileList2[0].raw)

        formData.append("file1", this.fileList2[1].raw)
        formData.append("dir", this.value)


        if (!this.value) {
          this.$message({
            message: '请先选择模块！',
            type: 'warning'
          });
          this.fileList2 = []
          this.$refs.upload2.clearFiles();
          return
        }

        axios({
          url: window.apiRoot.bwhostApi + "/BWmes/file_upload",
          method: "post",
          // headers: header,
          data: formData,
          // headers: headers
          onUploadProgress: (progressEvent) => {
            //console.log(progressEvent.total)
            this.centerDialogVisible = true
            let num = progressEvent.loaded / progressEvent.total * 100 | 0; //百分比
            this.num = num
          }

        }).then((res) => {
          console.log(res)
          if (res.data.message == "response to success") {
            this.$message({
              message: '上传成功！',
              type: 'success'
            });

            this.centerDialogVisible = false

          } else {
            this.$message({
              message: '上传失败！' + res.data.data,
              type: 'error'
            });
        this.centerDialogVisible = false
          }
          this.fileList2 = []
          this.$refs.upload2.clearFiles();
          this.disabled2 = true
          setTimeout(() => {
            this.disabled2 = false

          }, 100);
        })


      },
      download2(url) { //下载事件
        let that = this
        //console.log(that.other.name)
        if (this.value) {

          axios({
            url: window.apiRoot.bwhostApi + "/BWmes/file_download",
            method: "post",
            // headers: header,
            data: {
              dir: this.value,

              file_type: 0
            },
            // headers: headers
          }).then((res) => {
            console.log(res)
            if (res.data.data == "文件不存在") {
              this.$message({
                message: res.data.data,
                type: 'warning'
              });
            } else {
              axios.post(window.apiRoot.bwhostApi + "/BWmes/file_download", {
                dir: this.value,

                file_type: 0
              }, {
                responseType: 'blob'
              }).then(function (res) {
                console.log(res)
                var blob = res.data;
                // FileReader主要用于将文件内容读入内存
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                // onload当读取操作成功完成时调用
                reader.onload = function (e) {
                  var a = document.createElement('a');
                  // 获取文件名fileName
                  //console.log(res)
                  var fileName = that.value;
                  // fileName = fileName[fileName.length - 1];
                  // fileName = fileName.replace(/"/g, "");
                  a.download = fileName;
                  a.href = e.target.result;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }
              });
            }
          })
        } else {
          this.$message({
            message: '请先选择哪一天！',
            type: 'warning'
          });
        }

      },
      upload2() { //按钮点击触发上传
        if (this.value) {
          if (this.fileList2.length == 0) {
            this.$message({
              message: '请先选择文件！',
              type: 'warning'
            });

          } else if (this.fileList2.length == 1) {
            this.$message({
              message: '请先选择pdf文件和doc文件！',
              type: 'warning'
            });
          } else {
            this.$refs.upload2.submit();
          }
        } else {
          this.$message({
            message: '请先选择模块！',
            type: 'warning'
          });
        }

      },
      tb() {

        let url = window.apiRoot.hostApi + "/mes/synchronization"
        axios({
          url: url,
          method: "get",
          // headers: header,
          // data: data,


        }).then((response) => {
          //console.log(response)
          if (response.data.message == "response to success") {
            this.$message({
              message: '同步成功！',
              type: 'success',
              duration: 1000
            });
            this.getNode()
          } else {
            this.$message({
              message: '系统错误！',
              type: 'warning',
              duration: 1000
            });
          }
        })
      },
           tb3() {

        let url = window.apiRoot.bwhostApi + "/mes/synchronization"
        axios({
          url: url,
          method: "get",
          // headers: header,
          // data: data,


        }).then((response) => {
          //console.log(response)
          if (response.data.message == "response to success") {
            this.$message({
              message: '同步成功！',
              type: 'success',
              duration: 1000
            });
            this.getNode3()
          } else {
            this.$message({
              message: '系统错误！',
              type: 'warning',
              duration: 1000
            });
          }
        })
      },
      download(url) { //下载事件
        let that = this
        //console.log(that.other.name)
        if (this.other.dir && this.other.name) {

          axios({
            url: window.apiRoot.hostApi + "/mes/file_download",
            method: "post",
            // headers: header,
            data: {
              dir: this.other.dir,
              name: this.other.name,
              file_type: 0
            },
            // headers: headers
          }).then((res) => {
            console.log(res)
            if (res.data.data == "文件不存在") {
              this.$message({
                message: res.data.data,
                type: 'warning'
              });
            } else {
              axios.post(window.apiRoot.hostApi + "/mes/file_download", {
                dir: this.other.dir,
                name: this.other.name,
                file_type: 0
              }, {
                responseType: 'blob'
              }).then(function (res) {
                console.log(res)
                var blob = res.data;
                // FileReader主要用于将文件内容读入内存
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                // onload当读取操作成功完成时调用
                reader.onload = function (e) {
                  var a = document.createElement('a');
                  // 获取文件名fileName
                  //console.log(res)
                  var fileName = that.other.name;
                  // fileName = fileName[fileName.length - 1];
                  // fileName = fileName.replace(/"/g, "");
                  a.download = fileName;
                  a.href = e.target.result;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }
              });
            }
          })
        } else {
          this.$message({
            message: '请先选择模块！',
            type: 'warning'
          });
        }

      },
         download3(url) { //下载事件
        let that = this
        //console.log(that.other.name)
        if (this.other3.dir && this.other3.name) {

          axios({
            url: window.apiRoot.bwhostApi + "/mes/file_download",
            method: "post",
            // headers: header,
            data: {
              dir: this.other3.dir,
              name: this.other3.name,
              file_type: 0
            },
            // headers: headers
          }).then((res) => {
            console.log(res)
            if (res.data.data == "文件不存在") {
              this.$message({
                message: res.data.data,
                type: 'warning'
              });
            } else {
              axios.post(window.apiRoot.bwhostApi + "/mes/file_download", {
                dir: this.other3.dir,
                name: this.other3.name,
                file_type: 0
              }, {
                responseType: 'blob'
              }).then(function (res) {
                console.log(res)
                var blob = res.data;
                // FileReader主要用于将文件内容读入内存
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                // onload当读取操作成功完成时调用
                reader.onload = function (e) {
                  var a = document.createElement('a');
                  // 获取文件名fileName
                  //console.log(res)
                  var fileName = that.other3.name;
                  // fileName = fileName[fileName.length - 1];
                  // fileName = fileName.replace(/"/g, "");
                  a.download = fileName;
                  a.href = e.target.result;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }
              });
            }
          })
        } else {
          this.$message({
            message: '请先选择模块！',
            type: 'warning'
          });
        }

      },
      handleChange(file, fileList) { //文件改变事件

        this.fileList = fileList;
      },
          handleChange3(file, fileList) { //文件改变事件

        this.fileList3 = fileList;
      },
      upload() { //按钮点击触发上传
        if (this.other.dir && this.other.name) {
          if (this.fileList.length == 0) {
            this.$message({
              message: '请先选择文件！',
              type: 'warning'
            });

          } else if (this.fileList.length == 1) {
            this.$message({
              message: '请先选择pdf文件和doc文件！',
              type: 'warning'
            });
          } else {
            this.$refs.upload.submit();
          }
        } else {
          this.$message({
            message: '请先选择模块！',
            type: 'warning'
          });
        }

      },
      allUpload() { //上传事件
        let formData = new FormData();


        formData.append("file", this.fileList[0].raw)

        formData.append("file1", this.fileList[1].raw)
        formData.append("dir", this.other.dir)
        formData.append("name", this.other.name)

        if (!this.other.dir) {
          this.$message({
            message: '请先选择模块！',
            type: 'warning'
          });
          this.fileList = []
          this.$refs.upload.clearFiles();
          return
        }

        axios({
          url: window.apiRoot.hostApi + "/mes/file_upload",
          method: "post",
          // headers: header,
          data: formData,
          // headers: headers
          onUploadProgress: (progressEvent) => {
            //console.log(progressEvent.total)
            this.centerDialogVisible = true
            let num = progressEvent.loaded / progressEvent.total * 100 | 0; //百分比
            this.num = num
          }

        }).then((res) => {
          console.log(res)
          if (res.data.message == "response to success") {
            this.$message({
              message: '上传成功！',
              type: 'success'
            });

            this.centerDialogVisible = false

          } else {
            this.$message({
              message: '上传失败！' + res.data.data,
              type: 'error'
            });
        this.centerDialogVisible = false
          }
          this.fileList = []
          this.$refs.upload.clearFiles();
          this.disabled = true
          setTimeout(() => {
            this.disabled = false

          }, 100);
        })

      },
           allUpload3() { //上传事件
        let formData = new FormData();


        formData.append("file", this.fileList3[0].raw)

        formData.append("file1", this.fileList3[1].raw)
        formData.append("dir", this.other3.dir)
        formData.append("name", this.other3.name)

        if (!this.other3.dir) {
          this.$message({
            message: '请先选择模块！',
            type: 'warning'
          });
          this.fileList3 = []
          this.$refs.upload3.clearFiles();
          return
        }

        axios({
          url: window.apiRoot.bwhostApi + "/mes/file_upload",
          method: "post",
          // headers: header,
          data: formData,
          // headers: headers
          onUploadProgress: (progressEvent) => {
            //console.log(progressEvent.total)
            this.centerDialogVisible = true
            let num = progressEvent.loaded / progressEvent.total * 100 | 0; //百分比
            this.num = num
          }

        }).then((res) => {
          console.log(res)
          if (res.data.message == "response to success") {
            this.$message({
              message: '上传成功！',
              type: 'success'
            });

            this.centerDialogVisible = false

          } else {
            this.$message({
              message: '上传失败！' + res.data.data,
              type: 'error'
            });
        this.centerDialogVisible = false
          }
          this.fileList3 = []
          this.$refs.upload3.clearFiles();
          this.disabled3 = true
          setTimeout(() => {
            this.disabled3 = false

          }, 100);
        })

      },
      getNode() { //获取联结菜单
        let data = {
          tableName: 'operate_node',
          query: {

            level: 1
          }
        }
        let data2 = {
          tableName: 'operate_node',
          query: {

            level: 2
          }
        }
        let header = {
          companyId: 0
        }

        axios({
          url: getUrl,
          method: "post",
          headers: header,
          data: data,

          // headers: headers
        }).then((response) => {
          //console.log(response)
          let arr = response.data.data

          axios({
            url: getUrl,
            method: "post",
            headers: header,
            data: data2,

            // headers: headers
          }).then((res) => {
            //console.log(res.data.data)

            for (let i = 0; i < arr.length; i++) {
              arr[i].menuMid = []
            }
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < res.data.data.length; j++) {

                if (res.data.data[j].pid == arr[i].id) {
                  arr[i].menuMid.push(res.data.data[j])
                }

              }
            }
            //console.log(arr)
            this.data = arr

          })

        })
    
      },
 getNode3() { //获取联结菜单
        let data = {
          tableName: 'operate_node',
          query: {

            level: 1
          }
        }
        let data2 = {
          tableName: 'operate_node',
          query: {

            level: 2
          }
        }
        let header = {
          companyId: 0
        }

        axios({
          url: bwgetUrl,
          method: "post",
          headers: header,
          data: data,

          // headers: headers
        }).then((response) => {
          //console.log(response)
          let arr = response.data.data

          axios({
            url: bwgetUrl,
            method: "post",
            headers: header,
            data: data2,

            // headers: headers
          }).then((res) => {
            //console.log(res.data.data)

            for (let i = 0; i < arr.length; i++) {
              arr[i].menuMid = []
            }
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < res.data.data.length; j++) {

                if (res.data.data[j].pid == arr[i].id) {
                  arr[i].menuMid.push(res.data.data[j])
                }

              }
            }
            //console.log(arr)
            this.data3 = arr

          })

        })
    
      },
      changes(e) { //联级菜单模块选择


        this.other = {
          dir: this.selectedMenu[0],
          name: this.selectedMenu[1],
        }
        this.$refs.upload.clearFiles();
        //console.log(this.other)
      },
      changes3(e) { //联级菜单模块选择


        this.other3 = {
          dir: this.selectedMenu3[0],
          name: this.selectedMenu3[1],
        }
        this.$refs.upload3.clearFiles();
        //console.log(this.other)
      },
    },
    mounted() {
      this.getNode()
      

    },
    watch: {
      radio(val) {
        console.log(val)
        if(val=="1"){
             this.getNode()
        }else if(val=="3"){
          this.getNode3()
        }
      }
    }

  }

</script>

<style scoped>
  .menu /deep/ .el-menu-item {
    padding: 0px 135px;
    font-size: 1rem;
  }

  .menu /deep/ .el-submenu__title {
    padding: 0px 130px;
    font-size: 1rem;
  }

  .allPage {
    width: 100%;
    height: 100vh;
    background: rgb(247, 248, 249);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .header {
    width: 100%;
    height: 91px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header_con {
    width: 80%;
    height: 60px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header_left {
    width: 20rem;
    height: 100%;
    display: flex;
    align-items: center;
    /* color: white;
    font-size: 1.5rem; */
  }

  .header_left span {
    margin-left: 1.5rem;
  }

  .header_right {
    width: 20rem;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .header_right_icon {
    width: 8rem;
    height: 100%;
    color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
  }

  .header_right span {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;

  }

  .icon_info {
    width: 42%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .icon_info img {
    width: 40px;
    height: 40px;
  }

  .main {
    width: 84%;
    height: 91%;
    margin-top: 1%;
    background: rgb(247, 248, 249);
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .menu {
    width: 20%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .add_item_btn {
    width: 97%;
    height: 2.5rem;
    margin-top: 1rem;
    background: rgb(208, 5, 19);
    color: white;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }

  .login_out {
    position: absolute;
    right: 0;
    bottom: -1rem;
    width: 5rem;
    height: 1.5rem;
    border-radius: 8px;
    display: flex;
    color: red;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }

  .line {
    width: 97%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin-top: 10px;
  }

  .content {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .message {
    width: 290px;
    height: 220px;
    overflow: hidden;


  }

  .message_row {
    width: 290px;
    height: 70px;
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .message_row_one {
    width: 280px;
    height: 35px;
    display: flex;
    color: rgba(0, 0, 0, 0.5);
    align-items: center;
    font-size: 1.1rem;
    justify-content: space-between;
  }

  .message_row_two {
    width: 280px;
    height: 35px;

    font-size: 1.1rem;
    display: flex;
    color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: space-between;
  }

  .message_row_one span {
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .message_row_two span {

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /deep/ .el-tabs__item.is-active {
    font-size: 1.1rem;
  }

  /deep/ .el-tabs__item {
    font-size: 1.1rem;
  }

</style>
