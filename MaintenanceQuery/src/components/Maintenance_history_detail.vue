<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">保养历史记录详情</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>

    <!--出库单详细-->
    <div class="all-page">
      <div class="card" style="width:100%;height:60px;">
        <div class="card-head" style="height:45%;"><span>&nbsp;&nbsp;</span><span>保养项目：{{maintain_type_name}}</span>
        </div>
        <div class="line">
          <div class="line-con"></div>
        </div>
        <div class="card-head" style="height:45%;"><span>&nbsp;&nbsp;</span><span>机台：{{id}}</span>
        </div>
      </div>

      <div style="height:40%;margin-top:3%;overflow:auto;background:white;">
        <div v-for="(item,index) in dataList" :key="index">
          <div class="contain" v-if="item.confirm==1">
            <div class="card">
              <div class="card-head"><span
                  style="color:red;font-weight:700;font-size:20px;text-align:center;">*</span><span>{{item.index}}.保养条目：{{item.maintain_item_name}}</span>
              </div>
              <div class="line">
                <div class="line-con"></div>
              </div>
              <div class="card-content" style="margin-top:10px;">
                <div class="card-con">

                   <el-checkbox v-model="item.tick" disabled>是</el-checkbox>
                                

                </div>

              </div>

            </div>

          </div>
          <div class="contain" style="margin-top:10px;" v-else-if="item.confirm==3">
            <div class="card">
              <div class="card-head"><span
                  style="color:red;font-weight:700;font-size:20px;text-align:center;">*</span><span>{{item.index}}.保养条目：{{item.maintain_item_name}}</span>
              </div>
              <div class="line">
                <div class="line-con"></div>
              </div>
              <div class="card-content" style="margin-top:10px;">
                <div class="content-two">

                  <el-input type="textarea" rows="2" placeholder="请输入内容" disabled v-model="item.text"
                    @input="(value) => {linput(value,item.id)}">
                  </el-input>
                </div>

              </div>
            </div>

          </div>

          <div class="contain" style="margin-top:10px;" v-else="item.confirm==2">
            <div class="card2">
              <div class="card-head"><span>{{item.index}}.保养条目：{{item.maintain_item_name}}</span><span
                  style="color:rgba(0,0,0,0.5)">(提交现场实际照片)</span></div>
              <div class="line">
                <div class="line-con">
                  <el-image style="width: 80px; height: 80px;float:left;margin:10px"
                    v-for="(items,indexs) in item.picture" :key="indexs" :src="items" :preview-src-list="item.picture">
                    <div slot="error" class="image-slot">

                    </div>
                  </el-image>
                </div>
              </div>
              <div class="contain">

              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="card" style="width:100%;height:200px;margin-top:2rem;">
        <div class="card-head" style="height:20%;"><span>&nbsp;&nbsp;</span><span>保养耗品：</span>
        </div>
        <div class="line">
          <div class="line-con"></div>
        </div>
        <div style="height:40%;width:100%;margin-top:3%;overflow:auto;background:white;">
          <div style="width:100%;text-align:left;height:25%;" v-for="(item,index) in consumeList" :key="index"><span
              style="margin-left:1rem">{{item.product_name}} &nbsp;&nbsp;* {{item.quantity}} </span></div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Maintenance_history_detail',
    data() {
      return {
        macRelation: {
          machine_id: '',
          workshop_id: ''
        },
        id: '',
        selectInfo: {
          company_id: ''
        },
        maintain_type_name: this.$route.params.maintain_type_name,
        operator: '', //操作人
        dataList: [],
        consumeList: []
      }
    },
    methods: {
      back() {
        this.$router.push({ //跳转并传参数
          path: '/Maintenance_history',
          name: 'Maintenance_history',
          params: {
            machine_id: this.macRelation.machine_id,
            operator: this.operator,
            workshop_id: this.macRelation.workshop_id,
            company_id: this.selectInfo.company_id
          }

        })
      },

      getData() {
        console.log(this.id)
        this.dataList = []
        let url = "http://120.55.124.53:8206/api/maintain/getMaintainDetail"
        let that = this
        that.dataList = []
        axios.post(url, {
          company_id: that.selectInfo.company_id,
          id: that.id
        }, {

        }).then(function (res) {
          console.log(res)

          if (res.data.result.maintainRecords.length == 0) {
            that.$message({
              message: '没有数据！',
              center: true,
              duration: 2000
            });

            return
          } else {
            for (let i = 0; i < res.data.result.maintainRecords.length; i++) {
              res.data.result.maintainRecords[i].index = i + 1
              if (res.data.result.maintainRecords[i].tick == 1) {
                res.data.result.maintainRecords[i].tick = true
              } else {
                res.data.result.maintainRecords[i].tick = false
              }
              res.data.result.maintainRecords[i].picture = res.data.result.maintainRecords[i].picture.split(',')

              that.dataList.push(res.data.result.maintainRecords[i])

            }
            for (let i = 0; i < res.data.result.consumeMaterials.length; i++) {
              that.consumeList.push(res.data.result.consumeMaterials[i])
            }
          }
          console.log(that.dataList)

        })
      }

    },
    mounted() {
      this.id = this.$route.params.id;
      this.macRelation.machine_id = this.$route.params.machine_id;
      this.operator = this.$route.params.operator
      this.macRelation.workshop_id = this.$route.params.workshop_id;
      this.selectInfo.company_id = this.$route.params.company_id;

      this.getData()
      history.pushState(null, null, window.location.href);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, window.location.href);
      });

    }
  }

</script>

<style scoped>
  .all-page /deep/ ._v-container {
    position: absolute;
    top: 13%;


  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

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

  .query {
    width: 100%;
    height: 6%;
    background: white;

    display: flex;
    align-items: center;

  }

  .scroller {
    height: 80%;
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .card {
    width: 90%;
    height: 200px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;

  }

  .card-con {
    width: 90%;
    text-align: left;
    line-height: 37px;
    height: 37px;
    color: black;

  }

  .detail {
    width: 90%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: red;
  }

  .el-message-box {
    width: auto;
  }

</style>
<style scoped>
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
    height: 265px;
    display: flex;
    flex-direction: column;
    background: white;
    font-size: 0.7rem;

    font-weight: 700;
  }

  .card2 /deep/ .el-icon-plus {
    line-height: 35px;

  }

  .upload /deep/ .el-upload-list--picture-card .el-upload-list__item {
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
    height: 22px;
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
    font-size: 0.7rem;

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
    font-size: 0.7rem;

    font-weight: 00;
  }

  .con span {
    margin-left: 5px;
  }

</style>
