<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">维保记录详情</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>
    <!--出库单详细-->
    <div class="all-page">
      <scroller height="100%" :onRefresh="refresh" :onInfinite="inf" ref="my_scroller">
        <div class="contain" style="margin-top:8px;">
          <div class="card">
            <div class="card-head"><span>维保记录</span></div>
            <div class="line">
              <div class="line-con"></div>
            </div>

                <div v-for="item in datalist" style="display: flex; flex-direction: column;justify-content: center;">
              <div class="card-content2" style="margin-top:5px;">
                <div class="content-two">
                  <span>{{item.big_maintain.maintain_time}}</span>
                  <span>大保养</span>
                  <span>{{item.big_maintain.consumeMaterial}}</span>
                </div>

              </div>
              <div class="card-content2" style="margin-top:5px;">
                <div class="content-two">
                  <span>{{item.small_maintain.maintain_time}}</span>
                  <span>小保养</span>
                  <span>{{item.small_maintain.consumeMaterial}}</span>
                </div>

              </div>
            </div>


          </div>

        </div>

      </scroller>
    </div>

  </div>

</template>





























<script>
  import axios from 'axios'
  import VueScroller from "vue-scroller"
  export default {
    name: 'Maintenance_details',
    data() {
      return {
        machine_id: '',
        company_id: '',
        mac_type_id: '',
        page_size: 10,
        page_num: 1,
        total_data_num: 0,
        datalist: [],
        workshop_id:0
      }
    },
    methods: {
      getMaintainRecordPage() { //获取某台设备保养记录(分页)
  let url = 'http://47.110.242.174:8206/api/maintain/getRecentMaintainRecord'
        let that = this
        axios.post(url, {
          macRelation: {
            mac_type_id: that.mac_type_id,
             workshop_id: that.workshop_id
          },
          selectInfo: {
            company_id: that.company_id,
            page_size: that.page_size,
            page_num: that.page_num
          }
        }, {
          headers: {
            'Content-Type': 'application/json',

          }
        }).then(function (res) {

          //console.log(res)
          if (res.data.result.machine_list.length == 0) {
            that.$message({
              message: '没有更多数据了！',
              center: true,
              duration: 1000
            });
            that.$refs.my_scroller.finishInfinite(true)
            return
          } else {
            that.total_data_num = res.data.result.total_data_num
            that.$refs.my_scroller.finishPullToRefresh(true) ////下拉获取数据回调函数停止使用
      
          for (let i = 0; i < res.data.result.machine_list.length; i++) {
            that.datalist.push(res.data.result.machine_list[i])
          }
                   for (let i = 0; i < that.datalist.length; i++) {
            axios.post("http://47.110.242.174:8206/api/maintain/getMaintainDetail", {
                company_id: that.company_id,
                id: that.datalist[i].big_maintain.id
              },

            ).then(function (res) {
              //console.log(res)
               if (res.data.result.consumeMaterials== null) {
                that.datalist[i].big_maintain.consumeMaterial = "无更换物品"
                return
              }
              if (res.data.result.consumeMaterials.length == 0) {
                that.datalist[i].big_maintain.consumeMaterial = "无更换物品"
              } else {
                that.datalist[i].big_maintain.consumeMaterial = "有更换物品"
              }
            })
            axios.post("http://47.110.242.174:8206/api/maintain/getMaintainDetail", {
                company_id: that.company_id,
                id: that.datalist[i].small_maintain.id
              },

            ).then(function (res) {
              //console.log(res)
                if (res.data.result.consumeMaterials == null) {
                that.datalist[i].small_maintain.consumeMaterial = "无更换物品"
                return
              }
              if (res.data.result.consumeMaterials.length == 0) {
                that.datalist[i].small_maintain.consumeMaterial = "无更换物品"
              } else {
                that.datalist[i].small_maintain.consumeMaterial = "有更换物品"
              }
            })
          }
           that.$refs.my_scroller.finishInfinite(true) //上拉获取数据回调函数停止使用
            // for (let i = 0; i < res.data.result.maintainRecord.length; i++) {
            //   if (res.data.result.maintainRecord[i].maintain_type == "2") {
            //     res.data.result.maintainRecord[i].maintain_type = "小保养"
            //   } else if (res.data.result.maintainRecord[i].maintain_type == "1") {
            //     res.data.result.maintainRecord[i].maintain_type = "大保养"
            //   }
            //   if ((res.data.result.maintainRecord[i].consumeMaterial == null) || (res.data.result.maintainRecord[i]
            //       .consumeMaterial == false)) {
            //     res.data.result.maintainRecord[i].consumeMaterial = "无更换物品"
            //   } else {
            //     res.data.result.maintainRecord[i].consumeMaterial = "有更换物品"
            //   }
            //   that.datalist.push(res.data.result.maintainRecord[i])

            //   that.$refs.my_scroller.finishInfinite(true) //上拉获取数据回调函数停止使用
            // }
          }

        })
      },
      refresh() {
        this.datalist = []
        this.page_num = 1
        setTimeout(() => { //不设置定时器会出现bug
          this.getMaintainRecordPage() //获取数据列表
          this.$message({
            message: '刷新成功！',
            center: true,
            duration: 1000
          });
          this.$refs.my_scroller.finishPullToRefresh(false) //关闭下拉刷新函数
        }, 500);
      },

      /**
       * 上拉获取
       */
      inf() {

        setTimeout(() => {

          if (this.datalist.length == this.total_data_num) { //如果数据总条数等于当前数据列表长度了，那就关闭上拉加载了
      
            this.$refs.my_scroller.finishInfinite(true)
            return
          } else if (this.datalist.length == 0) { //如果查到没数据了，那就关闭上拉加载了
            this.$refs.my_scroller.finishInfinite(true)
            return
          } else { //否则就++，获取下一页数据
            this.page_num++;
            this.getMaintainRecordPage()
          }

        }, 500);
      


      },
      back() {
        this.$router.push({
          path: '/select',
            name:"select",
            params:{
              mac_type_id:this.mac_type_id,
              company_id: this.company_id ,
              machine_id:this.machine_id,
                      workshop_id:this.workshop_id
            }

        })
      },
      getParams() { //获取其他页面传过来的参数

        //console.log(this.$route.params)
        this.mac_type_id = this.$route.params.mac_type_id
        this.company_id = this.$route.params.company_id
        this.machine_id = this.$route.params.machine_id
                this.workshop_id=this.$route.params.workshop_id
        this.getMaintainRecordPage()


      },
    },
    mounted() {
   
      this.getParams()
history.pushState(null, null, window.location.href);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, window.location.href);
        });
    }
  }

</script>

<style scoped>
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .contain {
    width: 100%;
    display: flex;
    height: 100%;
    
    justify-content: center;



  }

  .all-page {
    margin-top: 12px;
    width: 100%;
    overflow: auto;
    height: 100%;

    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;

  }

  .head {
    width: 95%;
    height: 30px;
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
    height: 90%;
    display: flex;
    flex-direction: column;
    background: white;
    font-size: 0.9rem;

    font-weight: 400;
  }

  .card2 {
    width: 95%;
    height: 100px;
    display: flex;
    flex-direction: column;
    background: white;
    font-size: 0.9rem;

    font-weight: 400;
  }

  .card-head {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-head span {
    margin-left: 5px;
  }

  .card-content {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-content2 {
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-one {
    width: 90%;
    display: flex;

  }

  .content-one span {
    width: 50%;
    text-align: left;

  }

  .content-two {
    width: 90%;
    display: flex;

  }

  .content-two span {
    margin-right: 10px;
    text-align: left;

  }

  .con {
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.9rem;

    font-weight: 400;
  }

  .con span {
    margin-left: 5px;
  }

</style>
