<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">选择</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>

    <!--出库单详细-->
    <div class="all-page">
      <!-- <div class="choose2">
        <div class="choose-con">
          <span>MachineId:{{machine_id}}</span>
        </div>

      </div> -->
     <div style="height:90%;overflow:auto;">
       
  
    
        <div class="contain" style="margin-top:8px;" v-for="item in datalist">
          <div class="card" @click="toDetail(item.mac_type_id,item.mac_type_name,item.maintain_type_name,item.machine_id,item.workshop_id,item.maintain_type_id)">
            <div class="card-head">
              <div><span>{{workshop_name}}</span><span>上次保养时间：{{item.maintain_time}}</span></div><span 
                class="no-deal">待处理</span>
            </div>
            <div class="line">
              <div class="line-con"></div>
            </div>
            <div class="card-content2" style="margin-top:5px;">
              <div class="content-two" style="   justify-content: space-between;">
                <span>设备编号：{{item.machine_id}}</span>
   <span>设备类型：{{item.mac_type_name}}</span>
              </div>

            </div>
            <div class="card-content2">
              <div class="content-two" >
             
                <span>保养类别：{{item.maintain_type_name}}</span>

              </div>

            </div>
            <div class="card-content2">
              <div class="content-two">
                <span>到期时间：{{item.expire_time}}</span>

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
    name: 'choose',
    data() {
      return {
        ljShow:false,
        szShow:false,
        qjShow:false,
        staff_id: "",
workshop_id:"",
days_to_expire:"",
        machine_id: '',
        company_id: "",
datalist:[],
workshop_name:"",
        operator: '', //操作人
      }
    },
    methods: {
      back() {
        this.$router.push({ //跳转并传参数
          path: '/Maintenance_list',
          name: 'Maintenance_list',
          params: {
            // machine_id:this.macRelation.machine_id,
            operator: this.operator,
            // workshop_id:this.macRelation.workshop_id,
            company_id: this.company_id,
            staff_id: this.staff_id
          }

        })
      },
      toMaintenance_list() {
        this.$router.push({ //跳转并传参数
          path: '/Maintenance_list',
          name: 'Maintenance_list',
          params: {
            // machine_id:this.macRelation.machine_id,
            operator: this.operator,
            // workshop_id:this.macRelation.workshop_id,
            company_id: this.selectInfo.company_id,
            staff_id: this.staff_id
          }

        })
      },
          toDetail(mac_type_id, type_name, flag, machine_id,workshop_id,maintain_type_id) { //跳转到修改更新保养页面
console.log(mac_type_id)
               this.$router.push({ //跳转并传参数
          path: '/Maintenance',
          name: 'Maintenance',
          params: {
            // machine_id:this.macRelation.machine_id,
           company_id: this.company_id,
            // workshop_id:this.macRelation.workshop_id,
            workshop_id: this.workshop_id,
            operator:this.operator,
        flag:flag,
        machine_id:this.machine_id,
        maintain_type_id:maintain_type_id,
        isClickIn:"false",
        mac_type_id:mac_type_id
          }

        })
 
    
   
      
      },
      getData(){
          let url = " http://47.110.242.174:8206/api/maintain/getRecentMaintainRecord"//获取某台设备的保养记录/物品消耗
        let that = this
//         axios.post(url, {
//          macRelation:{
// mac_type_id:this.mac_type_id,
// machine_id:this.machine_id,
// workshop_id:this.workshop_id
//          },
//        selectInfo:{
//          company_id:that.company_id,
//          page_size:10,
//          page_num:1
//        } ,
//        days_to_expire:parseInt(that.days_to_expire),

//         }, {
//           headers: {
//             companyId: that.company_id
//           }
//         }).then(function (res) {
//           console.log(res)
//      let list=[]
//            if (res.data.result.machine_list.length == 0) {
            // that.$message({
            //   message: '没有数据！',
            //   center: true,
            //   duration: 2000
            // });
       
     axios.post("http://47.110.242.174:8206/api/maintain/getMaintain", {
 
mac_type_id:that.mac_type_id,


        }, {
          headers: {
            companyId: that.company_id
          }
        }).then(function (res) {
          console.log(res)
          let lists=[]
              for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].mac_type_name=res.data.data[i].type_name
                res.data.data[i].maintain_type_name=  res.data.data[i].name
                  res.data.data[i].machine_id=that.machine_id
                    res.data.data[i].workshop_id=that.workshop_id
                      res.data.data[i].maintain_type_id=  res.data.data[i].id
                lists.push(res.data.data[i])
             
            // res.data.result.machine_list[i].big_maintain.flag = "大保养" //判断保养类型
            // res.data.result.machine_list[i].small_maintain.flag = "小保养"
            // that.datalist.push(res.data.result.machine_list[i].big_maintain) //将处理完成的数据push到数据列表
            // that.datalist.push(res.data.result.machine_list[i].small_maintain)


          }
               that.datalist=lists
        })

            return
        //   } else {
        
        //       for (let i = 0; i < res.data.result.machine_list.length; i++) {
        //      for(let j=0;j<res.data.result.machine_list[i].maintain.length;j++){
        //         list.push(res.data.result.machine_list[i].maintain[j])
        //      }
        //     // res.data.result.machine_list[i].big_maintain.flag = "大保养" //判断保养类型
        //     // res.data.result.machine_list[i].small_maintain.flag = "小保养"
        //     // that.datalist.push(res.data.result.machine_list[i].big_maintain) //将处理完成的数据push到数据列表
        //     // that.datalist.push(res.data.result.machine_list[i].small_maintain)


        //   }
        //   that.datalist=list
             
        //   }
        // })
      },


    },
    mounted() {
      this.machine_id = this.$route.params.machine_id;
      this.company_id = this.$route.params.company_id
      this.operator = this.$route.params.operator
      this.staff_id = this.$route.params.staff_id
      this. mac_type_id=this.$route.params. mac_type_id
      this.days_to_expire=this.$route.params.days_to_expire
      this.workshop_id=this.$route.params.workshop_id
      this.workshop_name=this.$route.params.workshop_name
      this.getData()
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


    height: 100vh;

    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;

  }

  .choose {
    width: 100%;
    height: 8%;
    margin-top: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
  }

  .choose2 {
    width: 100%;
    height: 8%;
    margin-top: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
  }

  .choose-con {
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .head {
    width: 95%;
    height: 30px;
    display: flex;
    justify-content: space-around;

  }
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

 .all-page /deep/ ._v-container {
    position: absolute;
    top: 10%;


  }
 .select{
      width: 100%;
    height: 7%;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
   

 }
  .shortselect {
    border: 0;
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
    /* Firefox */
    -webkit-appearance: none;
    /* Safari 和 Chrome */

  }
    .scroller {
    height: 80%;
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }
  .shortselect2 {
    border: 0;
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
    /* Firefox */
    -webkit-appearance: none;
    /* Safari 和 Chrome */

  }
    .shortselect3 {
    border: 0;
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
    /* Firefox */
    -webkit-appearance: none;
    /* Safari 和 Chrome */

  }
  .no-deal {
    margin-right: 5px;
    background: rgb(220, 164, 80);
    border-radius: 8px;
    padding-left: 4px;
    padding-right: 4px;
    color: white;
  }

  .has-deal {
    margin-right: 5px;
    background: green;
    border-radius: 8px;
    padding-left: 4px;
    padding-right: 4px;
    color: white;
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


    height: 100vh;

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
    width: 95%;
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
