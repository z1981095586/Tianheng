<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">查询</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>

    <div class="all-page">
      <div class="contain">
        <div class="head">
          <div class="con" style="width:55%;"><span>编号：{{machine_id}}</span></div>
          <div class="con"><span>名称：{{machineName}}</span></div>
        </div>
      </div>
      <div style="overflow:auto;height:85%;">
        <div class="contain">
          <div class="card">
            <div class="card-head"><span>设备实况</span></div>
            <div class="line">
              <div class="line-con"></div>
            </div>
            <div class="card-content">
              <div class="content-one">
                <span>设备状态:{{MachineState}}</span>
                <span>运行速度:{{Rpm}}</span>
              </div>

            </div>
            <div class="card-content">
              <div class="content-one">
                <span>班产量:{{chanliangb}}</span>
                <span>班效率:{{Shift_efficiency}}</span>
              </div>

            </div>
          </div>

        </div>

        <div class="contain" style="margin-top:8px;">
          <div class="card">
            <div class="card-head"><span>维保记录</span><span style="margin-right:20px; color:blue;"
                @click="more1">更多</span>
            </div>
            <div class="line">
              <div class="line-con"></div>
            </div>
            <div v-for="item in recentRecord" style="height: 50%; display: flex; flex-direction: column;justify-content: center;">
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
        <div class="contain" style="margin-top:8px;">
          <div class="card">
            <div class="card-head"><span>部品消耗</span><span style="margin-right:20px; color:blue;"
                @click="more2">更多</span>
            </div>
            <div class="line">
              <div class="line-con"></div>
            </div>
            <div class="card-content2" v-for="item in  consumeList">
              <div class="content-two">
                <span>{{item.consume_time}}</span>
                <span>{{item.product_name}}</span>
                <span>{{item.quantity}}</span>
              </div>

            </div>

          </div>

        </div>
        <div class="contain" style="margin-top:8px;">
          <div class="card2">
            <div class="card-head"><span>折旧摊提</span></div>
            <div class="line">
              <div class="line-con"></div>
            </div>
            <div class="card-content">
              <div class="content-one">
                <span>购买时间:{{zjTime}}</span>
                <span>设备年限:{{zjage}}</span>
              </div>

            </div>
            <div class="card-content">
              <div class="content-one">
                <span>购买成本:{{zjPrice}}</span>
                <span>折旧剩余:{{zjsurplus}}</span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>

  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'select_mac',
    data() {
      return {
        macRelation: {
          mac_type_id: '',
          workshop_id: ''
        },
        selectInfo: {
          company_id: ''
        },
        consumeList: [], //部品消耗
        machine_id: '',

        machineName: '',

        Rpm: '', //运行速度
        chanliangb: '', //班产量
        MachineState: '', //运行状态
        Shift_efficiency: "", //运行效率
        recentRecord: [], //存储维保记录
        zjTime: "", //购买时间
        zjage: "", //设备年限
        zjPrice: "", //购买成本
        zjsurplus: "" //折旧剩余
      }
    },
    methods: {
      back() {
        nativeMethod.closeActivity();
      },
      getMaintainRecord() { //获取某台设备的保养记录/物品消耗   

        let url = "http://120.55.124.53:8206/api/maintain/getConsumeMaterialPage"
        let that = this
        console.log(that.macRelation)
        axios.post(url, {
          maintainMainRecord: {
            mac_type_id: that.macRelation.mac_type_id,
            machine_id: that.machine_id

          },
          selectInfo: {
            company_id: that.selectInfo.company_id,
            page_size: 3,
            page_num: 1
          }
        }, {
          headers: {
            'Content-Type': 'application/json',

          }
        }).then(function (res) {

          console.log(res)
          if (res.data.result.consumeMaterial.length == 0) {


            return
          } else {


            for (let i = 0; i < res.data.result.consumeMaterial.length; i++) {

              that.consumeList.push(res.data.result.consumeMaterial[i])


            }
          }





        })
      },
      more1() { //维保记录更多
        this.$router.push({
          path: '/Maintenance_details',
          name: "Maintenance_details",
          params: {
            mac_type_id: this.macRelation.mac_type_id,
            machine_id: this.machine_id,
            company_id: this.selectInfo.company_id,
              workshop_id:this.macRelation.workshop_id
          }
        })
      },
      more2() { //部品消耗更多
        this.$router.push({
          path: '/Component_consumption_details',
          name: "Component_consumption_details",
          params: {
            mac_type_id: this.macRelation.mac_type_id,
            machine_id: this.machine_id,
            company_id: this.selectInfo.company_id,
              workshop_id:this.macRelation.workshop_id
          }
        })
      },
      // getMachine_id: function () { // 获取设备编号
      //   let url = 'http://120.55.124.53:8206/api/maintain/getRecentMaintainRecord'
      //   let macRelation = {
      //     mac_type_id: this.macRelation.mac_type_id, //设备类型id
      //     workshop_id: this.macRelation.workshop_id //车间id
      //   }
      //   let selectInfo = {
      //     company_id: this.selectInfo.company_id //公司ID
      //   }
      //   let that = this

      //   axios.post(url, {
      //     macRelation,
      //     selectInfo
      //   }).then(function (res) {

      //     //console.log(res)
      //     // that.workshop_id = res.data.result[0].workshop_id   
      //    // that.machine_id = res.data.result[0].machine_id //获得设备编号
      //     // that.mac_type_id = res.data.result[0].mac_type_id
      //     //that.getMachineName() //获得设备名称



      //   })
      // },
      getEedsMachineList() { //获得折旧信息
        let url = "http://120.55.124.53:8211/machine/getEedsMachineList"
        let that = this
        console.log(that.machine_id)
        axios.post(url, {
          machineId: that.machine_id,
          "page": 1,
          "pageSize": 10
        }, {
          headers: {
            'Content-Type': 'application/json',
            "companyId": that.selectInfo.company_id //token换成从缓存获取
          }
        }).then(function (res) {
          console.log(res)
          that.zjTime = res.data.data[0].machineProTime
          that.zjage = res.data.data[0].age
          that.zjPrice = res.data.data[0].price
          that.zjsurplus = res.data.data[0].discountRatePrice
        })


      },
      getTypeInfo() { //获取设备实况
        let url = "http://106.12.219.66:8227/report/getSimpleReport"
        let tableName = "lm_run_" + this.selectInfo.company_id //表名
        let query = {
          WorkShopID: this.macRelation.workshop_id
        }
        let that = this
        axios.post(url, {
          tableName: tableName,
          pageNum: 1,
          pageSize: 10000,
        }, {
          headers: {
            'Content-Type': 'application/json',
            "companyId": 0 //token换成从缓存获取
          }
        }).then(function (res) {

          //console.log(res)
          that.Rpm = res.data.data[0].Rpm //设置速度
          that.chanliangb = res.data.data[0].chanliangb //设置产量
          that.MachineState = res.data.data[0].MachineState //设置状态
          that.Shift_efficiency = res.data.data[0].Shift_efficiency //设置效率



        })

      },
      getMachineName: function () { // 获取设备名字
        let url = 'http://106.12.219.66:8763/com-machine-info/selectAMachineRelation'

        let headers1 = {
          'Content-Type': 'application/json',
          'companyId': this.selectInfo.company_id

        }

        // let mac_type_id = this.mac_type_id
        let that = this

        axios.get(url, {
          params: {
            machineId: that.machine_id
          },
          headers: headers1 //设置header信息
        }).then(function (res) {
          console.log(res)
          that.machineName = res.data.data[0].machineName //设置设备名称
          that.macRelation.mac_type_id = res.data.data[0].machineType
          that.macRelation.workshop_id = res.data.data[0].workshopId
          that.getEedsMachineList() //获得折旧信息

          that.getMachineRecord()

        })
      },
      getMachineRecord: function () { // 获取设备最近的保养记录
        this.getMaintainRecord() //获取部品消耗记录
        let url = 'http://120.55.124.53:8206/api/maintain/getRecentMaintainRecord'

        let headers1 = {

          'company_id': this.selectInfo.company_id,
          page_size:2,
          page_num:1

        }


        let that = this

        axios.post(url, {
            macRelation: {
              mac_type_id: that.macRelation.mac_type_id,
              workshop_id: that.macRelation.workshop_id
            },
            selectInfo: headers1
          },

        ).then(function (res) {
          console.log(res)
          that.recentRecord = [] //清空维保记录先
          for (let i = 0; i < res.data.result.machine_list.length; i++) {
            that.recentRecord.push(res.data.result.machine_list[i])
          }

          // let small = res.data.result[0].small_maintain
          // let big = res.data.result[0].big_maintain
          // if (that.isArr(big) == false) { //判断大维护是不是数组，看来不是数组
          //   big.flag = "大保养"
          //   big.maintain_time = that.getNowFormatDate(new Date(big.maintain_time))
          //   that.recentRecord.push(big)
          // } else {
          //   for (let i = 0; i < big.length; i++) { //是数组就循环push
          //     big[i].flag = "大保养"
          //     big[i].maintain_time = that.getNowFormatDate(new Date(big[i].maintain_time))
          //     that.recentRecord.push(big[i])
          //   }
          // }
          // if (that.isArr(small) == false) { //不是数组
          //   small.flag = "小保养"
          //   small.maintain_time = that.getNowFormatDate(new Date(small.maintain_time))
          //   that.recentRecord.push(small)
          // } else {
          //   for (let i = 0; i < small.length; i++) {
          //     small[i].flag = "小保养"
          //     small[i].maintain_time = that.getNowFormatDate(new Date(small[i].maintain_time))
          //     that.recentRecord.push(small[i])
          //   }
          // }
          // if (that.recentRecord.length >= 4) { //不能显示第五条，最多4条了

          //   for (var i = 0; i < that.recentRecord.length; i++) {
          //     if (i >= 4) {
          //       that.recentRecord.splice(i, 1)
          //     }
          //   }


          // }

          /*下面代码判断有无更换物品*/
          for (let i = 0; i < that.recentRecord.length; i++) {
            axios.post("http://120.55.124.53:8206/api/maintain/getMaintainDetail", {
                company_id: that.selectInfo.company_id,
                id: that.recentRecord[i].big_maintain.id
              },

            ).then(function (res) {
              //console.log(res)
              if (res.data.result.consumeMaterials.length == 0) {
                that.recentRecord[i].big_maintain.consumeMaterial = "无更换物品"
              } else {
                that.recentRecord[i].big_maintain.consumeMaterial = "有更换物品"
              }
            })
            axios.post("http://120.55.124.53:8206/api/maintain/getMaintainDetail", {
                company_id: that.selectInfo.company_id,
                id: that.recentRecord[i].small_maintain.id
              },

            ).then(function (res) {
              //console.log(res)
              if (res.data.result.consumeMaterials.length == 0) {
                that.recentRecord[i].small_maintain.consumeMaterial = "无更换物品"
              } else {
                that.recentRecord[i].small_maintain.consumeMaterial = "有更换物品"
              }
            })
          }

        })
      },
      // isArr(datas) { //判断是不是数组
      //   return (Array.prototype.isPrototypeOf(datas))
      // },
      getNowFormatDate(date) { //获得当前时间


        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month < 10) {
          month = "0" + month
        }
        if (strDate < 10) {
          strDate = "0" + strDate
        }
        var currentdate = year + '年' + month + '月' + strDate + '日';
        return currentdate;
      },


    },
    mounted() {
      console.log(this.$route.params)
      //         this.macRelation.mac_type_id = this.$route.params.mac_type_id;

      //  this.macRelation.workshop_id = this.$route.params.workshop_id;
      this.machine_id = this.$route.params.machine_id
      this.selectInfo.company_id = this.$route.params.company_id;
      // this.getMachine_id()
      this.getMachineName()

      this.getTypeInfo()
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
    height: 120px;
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
    height: 30%;
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
    height: 20%;
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
