<template>
  <div class="content">
    <header style="height: 3rem">
      <div class="title">佳而美——万舟织造车间电视看板</div>

    </header>
    <div class="board">
      <div class="board_con">
        <div class="board_con_left">
          <div class="board_con_left_top">
            <div class="board_title">预了机时间</div>
            <div class="board_con_left_top_con">
              <div class="board_con_left_top_con_one" v-for="(item,index) in yljList" :key="index"><span style="color:rgb(213,119,80)">#{{item.machineId}}</span><span>{{item.beamOutTime}}min</span>
              </div>
          
            </div>
          </div>
          <div class="board_con_left_bottom">
            <div class="board_title" style="height:18%">了机时长</div>
            <div class="board_con_left_bottom_con">
              <div class="board_con_left_bottom_con_one" v-for="(item,index) in djList" :key="index"><span
                  style="color:rgb(213,119,80)">#{{item.machineId}}</span><span>{{item.liaojiTimeNum}}min</span>
              </div>
             
            </div>
          </div>
        </div>
        <div class="board_con_right">
          <div class="board_con_right_top">
            <div class="board_con_right_top_con1">
              <div class="board_con_right_top_con1_con"><span
                  style="font-size:2rem;width:4rem;margin-left:5%;margin-right:35%;">当班效率</span><span
                  style="font-size:3rem">{{dbxl}}%</span></div>
              <div class="board_con_right_top_con1_con"><span
                  style="font-size:2rem;width:4rem;margin-left:5%;margin-right:35%;">当班产量</span><span
                  style="font-size:3rem">{{zbcl}}米</span></div>
            </div>
            <div class="board_con_right_top_con2">
              <div class="board_con_right_top_con2_left"><span style="font-size:2rem;width:4rem">低效机台</span></div>
              <div class="board_con_right_top_con2_right">
                <div class="board_con_right_top_con2_right_con" v-for="(item,index) in djxlList" :key="index"><span
                    style="font-size:2.5rem;width:50%;text-align:left;margin-left:10%">#{{item.machineid}}</span><span
                    style="font-size:2.5rem;color:rgb(213,119,80);width:40%;text-align:left">{{item.shiftEfficiencyF}}%</span></div>
                              
              </div>
            </div>
            <div class="board_con_right_top_con3">
                   <!-- <div class="board_con_right_top_con2_left"><span style="font-size:2rem;width:4rem">设备维修</span></div>
                      <div class="board_con_right_top_con2_right">
                <div class="board_con_right_top_con2_right_con" v-for="(item,index) in sbwxList" :key="index"><span
                    :style="item.color" style="width:50%;text-align:left;margin-left:10%">#{{item.machineId}}</span><span
                   :style="item.color" style="width:40%;text-align:left">{{item.status}}</span></div>
                      
                           
                        
              </div> -->
                  <div class="board_con_left_bottom" style="width:50%;height:100%">
            <div class="board_title" style="height:18%">经停时间排行</div>
            <div class="board_con_left_bottom_con">
              <div class="board_con_left_bottom_con_one" v-for="(item,index) in jtList" :key="index"><span
                  style="color:rgb(213,119,80);font-size:1.8rem">#{{item.MachineID}}</span><span style="font-size:1.8rem">{{item.warp_t}}s</span>
              </div>
             
            </div>
          </div>
                   <div class="board_con_left_bottom" style="width:50%;height:100%;border:0;">
            <div class="board_title" style="height:18%">纬停时间排行</div>
            <div class="board_con_left_bottom_con">
              <div class="board_con_left_bottom_con_one" v-for="(item,index) in wtList" :key="index"><span
                  style="color:rgb(213,119,80);font-size:1.8rem">#{{item.MachineID}}</span><span style="font-size:1.8rem">{{item.weft_t}}s</span>
              </div>
             
            </div>
          </div>
            </div>
            <div class="board_con_right_top_con">      <div class="board_con_right_top_con2_left"><span style="font-size:2rem;width:4rem">断头排名</span></div>
                      <div class="board_con_right_top_con2_right">
                <div class="board_con_right_top_con2_right_con" v-for="(item,index) in dtpmList" :key="index"><span
                    style="font-size:2.5rem;width:50%;text-align:left;margin-left:10%">#{{item.MachineID}}</span><span
                    style="font-size:2.5rem;color:rgb(213,119,80);width:40%;text-align:left">{{item.weft_c}}次</span></div>
                         
              </div></div>
          </div>
          <div class="board_con_right_bottom">
              <div class="board_con_right_bottom_left"><span style="font-size:2rem;width:4rem">昨日对比</span></div>
  <div class="board_con_right_bottom_right">
      <div class="board_con_right_bottom_right_con">
          <span>A班效率</span><span>{{dbxl}}%</span>
      </div>
 <div class="board_con_right_bottom_right_con">
          <span>B班效率</span><span>{{bbxl}}%</span>
      </div>
       <div class="board_con_right_bottom_right_con">
          <span>A班产量</span><span>{{zbcl}}米</span>
      </div>

       <div class="board_con_right_bottom_right_con">
          <span>B班产量</span><span>{{bbcl}}米</span>
      </div>
  </div>
          </div>
        </div>
 
      </div>
    </div>
  </div>

</template>

<script>
  // 0: {name: "万舟织造一部", id: }4
  // 1: {name: "万舟织造二部", id: }5
  // 2: {name: "兰棉", id: }2
  // 3: {name: "佳而美", id: }1
  import axios from 'axios';
  let host1 = "http://120.55.124.53";
   import {getUrl,wzBoard_api} from "../api/api"; //引入时间格式化js
  export default {
    name: "board",
    data() {
      return {
        lang: 'zh',
        workshopId: '1',
 companyId: this.$route.params.id,//公司库表Id

workshopLabel:"",
workshopList:[],
dbxl:"",//当班效率
bbxl:"",//b班效率
zbcl:"",//A班产量
bbcl:"",//b班产量
wtList:[],
jtList:[],
dtpmList:[],//断头排名数据
   djxlList:[],
         yljList:[],
         djList:[],
      }
    },
    methods: {
          changeWorkshopTiming:function (){
          const timer = setInterval(() =>{
     
         
    
            // let index = '';
            // let i = 0;
            // for ( i = 0;i<this.workshopList.length;i++){
            //   if (this.workshopList[i].value===this.workshopId){
            //     index = i;
            //   }
            // }
            // if (index+1<this.workshopList.length){
            //   this.workshopId = this.workshopList[index+1].value;
            //   this.workshopLabel = this.workshopList[index+1].label;
            // }
            // else {
            //   this.workshopId = this.workshopList[0].value;
            //   this.workshopLabel = this.workshopList[0].label;
            // }
           this.getdata()
          }, 15000);
          // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
          })
        },
        // getWorkshopList(){
        //   let path='/report/getSimpleReport';
        //   let data={
        //     "tableName": "mac_workshop",
        //     "selectFields":['id','name'],
        //     "query":{"status":1}
        //   };
        //   wzBoard_api(path,data,this.companyId)
        //     .then(response => {
        //       ////console.log(response)
        //       this.workshopList=response.data.data.map(x=> {
        //         return{label:x.name,value:x.id}
        //       });
        //       this.workshopId=this.workshopList[0].value;
        //       this.workshopLabel=this.workshopList[0].label;
        //     })
        //     .then(()=>{
        //       this.getdata();
            
        //     })

        // },
getdata(){
  let that=this
         axios({
            url: host1+':7070/s/getEfficiency',// 效率落后（低效机台）
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
               'companyId':that.companyId
            },
            data:{
              "problemId":"1",
              "workshopId":that.workshopId
            }

          })
          .then(response => {
            ////console.log(response)
              let list=[]
         for(let i=0;i<response.data.data.list.length;i++){
           list.push(response.data.data.list[i])
         }
           that.djxlList=list
                 })
          .then(() => {
          
          })
                 axios({
            url:  host1+':7070/ab/getLiaoJiWithWorkshop',// 了机时间
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
               'companyId':that.companyId
            },
            data:{
             
              "workshopId":that.workshopId
            }

          })
          .then(response => {
            ////console.log(response)
              let list=[]
         for(let i=0;i<response.data.data.length;i++){
           response.data.data[i].beamOutTime=(response.data.data[i].beamOutTime*60).toFixed(1)
             list.push(response.data.data[i])
         }
         that.yljList=list
                 })
          .then(() => {
          
          })
                 axios({
            url:  host1+':7070/ab/getLiaoJiIng  ',// 待机时长
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
               'companyId':that.companyId
            },
            data:{
             
              "workshopId":that.workshopId,
                  "limitSize":6
            }

          })
          .then(response => {
            ////console.log(response)
              let list=[]
         for(let i=0;i<response.data.data.length;i++){
           response.data.data[i].liaojiTimeNum=(response.data.data[i].liaojiTimeNum*60).toFixed(1)
            list.push(response.data.data[i])
         }
          that.djList=list
                 })
          .then(() => {
          
          })
                   axios({
            url: host1+':7070/ab/getWorkshopABAndYield?workshops='+that.workshopId, // 当班效率，折标产量，平均车速
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
      

          })
          .then(response => {
            ////console.log(response)
            that.dbxl=response.data.data.selects[0].list[0]
                 that.bbxl=response.data.data.selects[0].list[1]
       that.zbcl=(response.data.data.selects[0].yieldXs).toFixed(1)
          that.bbcl=response.data.data.selects[0].yesterdayYieldXs
      //  that.speed=response.data.data.selects[0].rpm
          })
          .then(() => {

          })
                axios({
            url: 'http://106.12.219.66:8227/report/getSimpleReport', //纬停时间（秒）
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data:{
              tableName:"lm_shift",
              sort:"DESC",
              sortColumn:"weft_t",
              selectFields:["MachineID","weft_t"],
              pageNum:1,
              pageSize:15,
              query:{
                "WorkShopID":that.workshopId
              }
            }

          })
          .then(response => {
          //console.log(response)
            let list=[]
             for(let i=0;i<response.data.data.length;i++){
              
               list.push(response.data.data[i])
             }
             that.wtList=list
          })
          .then(() => {

          })
                  axios({
            url: 'http://106.12.219.66:8227/report/getSimpleReport', //经停时间（秒）
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data:{
              tableName:"lm_shift",
              sort:"DESC",
              sortColumn:"warp_t",
              selectFields:["MachineID","warp_t"],
              pageNum:1,
              pageSize:15,
                 query:{
                "WorkShopID":that.workshopId
              }
            }

          })
          .then(response => {
          //console.log(response)
            let list=[]
             for(let i=0;i<response.data.data.length;i++){
              
               list.push(response.data.data[i])
             }
             that.jtList=list
          })
          .then(() => {

          })
              axios({
            url: 'http://106.12.219.66:8227/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "lm_shift",
            pageSize:15,
            pageNum:1,
            sortColumn:"weft_c",
            sort:"DESC",
              query:{
              WorkShopID:that.workshopId
            }

            }

          })
          .then(response => {
    
                   let list=[]
           for(let i=0;i<response.data.data.length;i++){
            list.push(response.data.data[i])
           }
            that.dtpmList=list
            //console.log(list)
          })
          //            axios({
          //   url: host1+':7070/weight/getWeftCmpx?workshopId='+that.workshopId, //断头排名
          //   method: 'get',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'companyId': that.companyId
          //   },
     

          // })
          // .then(response => {
          //   ////console.log(response)
          //   let list=[]
          //  for(let i=0;i<response.data.data.length;i++){
          //   list.push(response.data.data[i])
          //  }
          //   that.dtpmList=list
          //   ////console.log( that.dtpmList)
          
          // })
          // .then(() => {

          // })

  
}
    },




    filters: {

    },
    mounted() {
    // this.getWorkshopList();
    //this. changeWorkshopTiming()
         this.getdata()
    this.changeWorkshopTiming()

    },
    beforeDestroy() {
  if (this.timer) {
          clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    }
  }

</script>

<style scoped>
span{
    text-align: center;
}
  .content {
    width: 100%;
    background-image: url("../../static/img/wzBack.png");
    background-size: 100% 100%;
 
    background-repeat: no-repeat;
    height: 100%;
    margin: 0;
    padding-top: 2rem;
  }

  .title {
    /*background-image: url("../static/img/title.png");*/
    height: 4rem;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: -1.5rem;
    width: 100%;
    /*-webkit-box-shadow:1px 1px 1px rgba(9, 62, 175, 0.66);*/
    /*-moz-box-shadow:1px 1px 1px rgba(9, 62, 175, 0.66);*/
    /*box-shadow:1px 1px 25px  rgba(9, 62, 175, 0.66);*/
    /*border-radius: 1rem;*/
  }

  .board {
    width: 100%;
    height: 93%;

    display: flex;
    justify-content: center;
    align-items: center;

  }

  .board_con {
    width: 94%;
    height: 91%;
    border: 2px solid white;
    display: flex;
    position: relative;

  }
  .bottom_font{
    position: absolute;
 bottom: -2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    z-index: 100;
  }
  .board_con_left {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;

  }

  .board_con_left_top {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;

    border-right: 2px solid white;
    border-bottom: 2px solid white;
  }

  .board_con_left_top_con {
    width: 100%;
    height: 85%;

    overflow: auto;
  }

  .board_con_left_top_con_one {
    width: 100%;
    height: 16.6%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 2.5rem;
  }

  .board_title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 11%;
    font-size: 1.5rem;
    color: white;
  }

  .board_con_left_bottom {
    width: 100%;
    height: 40%;
    display: flex;

    flex-direction: column;
    border-right: 2px solid white;

  }

  .board_con_left_bottom_con {
    width: 100%;
    height: 85%;
    overflow: auto;
  }

  .board_con_left_bottom_con_one {
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 2.5rem;
  }

  .board_con_right {
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .board_con_right_top {
    width: 100%;
    height: 80%;


  }

  .board_con_right_top_con {
    width: 49.8%;
    height: 50%;
    float: left;
    display: flex;
  }

  .board_con_right_top_con1 {
    width: 49.9%;
    height: 50%;
    float: left;
    border-right: 2px solid white;
    border-bottom: 2px solid white
  }

  .board_con_right_top_con1_con {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;


  }

  .board_con_right_top_con2 {
    width: 49.8%;
    height: 50%;
    float: left;
    border-bottom: 2px solid white;
    display: flex;
  }

  .board_con_right_top_con2_left {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }



  .board_con_right_top_con2_right_con {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 2.5rem;

  }
  

  .board_con_right_top_con2_right {
    width: 70%;
    height: 100%;
    overflow: auto;

  }

  .board_con_right_top_con3 {
    width: 49.9%;
    height: 50%;
    float: left;
    border-right: 2px solid white;
    display: flex;
  }



  .board_con_right_bottom {
    width: 100%;
    height: 20%;
    display: flex;


    border-top: 2px solid white;


  }
  .board_con_right_bottom_left{
      font-size: 2rem;
      color: white;
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      
  }
    .board_con_right_bottom_right{
      font-size: 1.5rem;
      color: white;
      width: 90%;
      height: 100%;
      
  }
   .board_con_right_bottom_right_con{
       width: 50%;
       height: 50%;
       float: left;
       display: flex;
       align-items: center;
      
   }
     .board_con_right_bottom_right_con span{
  margin-left:10.5%;
   margin-right: 5%;   
   }

</style>
