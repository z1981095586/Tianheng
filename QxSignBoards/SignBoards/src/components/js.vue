<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="content4">

    <header>
      <div class="title">七星智能纺织-浆纱机</div>
      <h1 class="tip">

    
       
        
      </h1>
    </header>
    <div class="monitor">
  <div class="monitor_left">
<div class="monitor_left_top">
    <div class="img">
        <div class="img_con"><a @click="back()"  style="   font-size: 1rem;color: #5D7091;text-decoration:none">七星智能纺织</a><div class="jiantou"></div><span style="margin-right:1rem">浆纱机</span></div>
    </div>

</div>
<div class="monitor_left_mid">
    <div class="top">
        <div class="top_title">浆纱机Top3车速监控</div>
        <div class="top_head"><span>车速m/min</span><span>机台号</span><span>上一班产量</span><span>当班完成轴数</span></div>
                <div class="top_con" v-for="(item,index) in speedlist" :key="index" :style="item.backgr" ><span>{{item.speed}}</span><span>{{item.machine_id}}</span><span>{{item.last_shift_output}}</span><span>{{item.shift_beam_num}}</span></div>
 
    </div>
    <div class="speed">
        <div class="top_title">实时车速监控</div>
        <div class="speed_con">
            <div class="speed_con_one" v-for="(item,index) in speedlist2" :key="index" >
                <div class="span1" >{{item.machine}}</div>
                  <div class="span2" >{{item.speed}}</div>
                    <div class="span3" >m/min</div>
            </div>
                
        </div>
    </div>
        <div class="car"></div>
            <div class="card6">
                <div class="card6_con">
                    <span style="font-size:1rem">浙江省七星纺织有限公司</span>
                      <span style="color:#FFF700;font-size:1.8rem;   margin-top: 1rem;">浆纱机总数：{{zong}}</span>
                </div>
            </div>
</div>
</div>

      <div class="monitor_right">
  <div  style="width:100%;height:45%" id="echart11"></div>
    <div  style="width:100%;height:45%" id="echart12"></div>
    </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {
    formatDate
  } from "../static/js/date"; //引入时间格式化js
  export default {
    name: "productMonitor",
    data() {
      return {
     timer:null,
        companyId: this.$route.params.id, //公司库表Id
        workshop_id:this.$route.params.workshopid,
        speedlist:[],
        speedlist2:[],
        zong:null
      }
    },
    methods: {
            back(){
        this.$router.push({ //跳转并传参数
          path: '/productMonitor2',
          name: 'productMonitor2',
          params:{
            
              id:this.companyId,
              workshop_id:this.workshop_id
            
          }

        })
//  this.$router.push({path:'/productMonitor/'+this.companyId})
      },
            // 对象排序
      sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },
      getdate(){
// 获取当前日期
var date = new Date();

// 获取当前月份
var nowMonth = date.getMonth() + 1;

// 获取当前是几号
var strDate = date.getDate();

// 添加分隔符“-”
var seperator = "-";

// 对月份进行处理，1-9月在前面添加一个“0”
if (nowMonth >= 1 && nowMonth <= 9) {
   nowMonth = "0" + nowMonth;
}

// 对月份进行处理，1-9号在前面添加一个“0”
if (strDate >= 0 && strDate <= 9) {
   strDate = "0" + strDate;
}

// 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
return nowDate;
      },
       getcl(list2){
        console.log(list2)
      
        let that=this
      
          list2=that.sortByKey(list2,"machine_id")
         let url="http://106.12.219.66:8227/report/getSimpleReport"
        let xlist=[]
        let ylist=[]
        let ylist2=[]
        for(let i=0;i<list2.length;i++){
      //     if(list2[i].current_shift_output){
      //        ylist.push(list2[i].current_shift_output)
      //     }else{
      //         ylist.push(0)
      //     }
      //  xlist.push(list2[i].machine_id)
       switch(list2[i].machine_id) {
     case "sj0104":
        list2[i].machinename="浆纱机2#"
                list2[i].looplistId="p1286c52666"
        
        break;
        case "sj0103":
        list2[i].machinename="浆纱机3#"
                list2[i].looplistId="p1286c16590"
        break;
             case "sj0205":
        list2[i].machinename="浆纱机5#"
                list2[i].looplistId="p1286c22026"
        break;
             case "sj0206":
        list2[i].machinename="浆纱机6#"
                list2[i].looplistId="p1286c61080"
        break;
                 case "sj0204"://0204
        list2[i].machinename="浆纱机4#"
        list2[i].looplistId="p1286c46865"
        break;
             case "sj0101":
        list2[i].machinename="浆纱机1#"
            list2[i].looplistId="p1286c62811"
        break;
     default: list2[i].machinename=""
     
} 
//console.log(list2)

                  axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': "10000012"
            },
            data: {
            tableName:"electric_history_h",
          selectLikeFields:{
            startTime:that.getdate()
          },
          query:{
           looplistId:list2[i].looplistId
          },
                      selectFields:["sum(electric+0) as electric","looplistId"]
            }
          })
          .then(response => {
            //console.log(response.data.data)
               list2[i].electric=  response.data.data[0].electric
        
         
          })

        }
     setTimeout(() => {
              console.log(list2)
              //console.log(xlist)
                  list2=that.sortByKey(list2,"machine_id")
                    for(let i=0;i<list2.length;i++){
          if(list2[i].current_shift_output){
             ylist.push(list2[i].current_shift_output)
          }else{
              ylist.push(0)
          }
       xlist.push(list2[i].machine_id)
       ylist2.push(list2[i].electric.toFixed(0))
                    }
     that.echart2(xlist,ylist,ylist2)
     }, 1000);
 
        
   
    
       },
       getspeed(){
let url="http://106.12.219.66:8227/report/getSimpleReport"
let that=this
that.speedlist=[]
let list2=[]
let xlist=[]
let ylist=[]
let ylist2=[]
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {
            tableName:"sizing",
         
            }
          })
          .then(response => {
            //console.log(response)
            that.getcl(response.data.data)
           if(response.data.data.length<10){
              that.zong="0"+response.data.data.length
           }else{
              that.zong=response.data.data.length
           }
            that.speedlist2= that.correctArr(that.sortByKey(response.data.data,"speed"))
            list2=that.sortByKey(response.data.data,"speed")
         
            
     
       
            for(let i=list2.length-1;i>=list2.length-3;i--){
             //////console.log(    list2[i])
              if(i==(list2.length-1)){
               
                list2[i].backgr="background:black;color:red"
              }else if(i==(list2.length-2)){
                  list2[i].backgr="color:#FFEE01"
              }else if(i==(list2.length-3)){
                list2[i].backgr="background:black;color:#42FF00"
              }
              list2[i].f_u_tension=parseFloat( list2[i].f_u_tension)
              //console.log(list2[i].f_u_tension)
              if(isNaN( list2[i].f_u_tension)){
                list2[i].f_u_tension=0
              }
              that.speedlist.push(list2[i])
            }
            console.log(response)
             response.data.data=that.sortByKey(response.data.data,"machine_id")
            for(let i=0;i<response.data.data.length;i++){
              xlist.push(response.data.data[i].machine_id)
              ylist.push(response.data.data[i].current_shift_output)
                   ylist2.push(response.data.data[i].last_shift_output)
            }
            that.echart(xlist,ylist,ylist2)
          })
       },
//         getspeed2(list2){
//          ////console.log(list2)
//                  let that=this
//                  let lists=[]
//        let list=[]
//     let url="http://106.12.219.66:8227/report/getSimpleReport"
//         axios({
//             url: url,
//             method: 'post',
//             headers: {
//               'Content-Type': 'application/json',
//               'companyId': 0
//             },
//             data: {
//             tableName:"sizing_karl",
//               query:{
//                  company_id:that.companyId
//                }
//             }
//           })
//           .then(response => {
//             ////console.log(response)
         
//              for(let i=0;i<response.data.data.length;i++){
//    response.data.data[i].speed=response.data.data[i].db1_52
//    lists.push(response.data.data[i])
//              }
//           }).then(()=>{
//               axios({
//             url: url,
//             method: 'post',
//             headers: {
//               'Content-Type': 'application/json',
//               'companyId': 0
//             },
//             data: {
//             tableName:"sizing_benninger",
//               query:{
//                  company_id:that.companyId
//                }
//             }
//           })
//           .then(response => {
//             ////console.log(response)
         
//              for(let i=0;i<response.data.data.length;i++){
//    response.data.data[i].speed=response.data.data[i].db8_2
//  lists.push(response.data.data[i])
//              }
//              for(let i=0;i<list2.length;i++){
//                list2[i].speed=parseFloat(list2[i].speed)
            
//                lists.push(list2[i])
//              }
   
          
//             //  setTimeout(() => {
//                       that.speedlist2=that.correctArr(that.sortByKey(lists,"speed"))
//                       //console.log(that.speedlist2)
//                   that.getcl(lists)
          
//               let xlist=[]
//               let ylist=[]
//               let ylist2=[]
//              for(let i=0;i<that.speedlist2.length;i++){
//                 xlist.push(that.speedlist2[i].machine)
//                    ylist.push(that.speedlist2[i].current_shift_output)
//                    if(that.speedlist2[i].last_shift_output){
//   ylist2.push(that.speedlist2[i].last_shift_output)
//                    }else{
//                      ylist2.push(0) 
//                    }
                 
//              }
//              ////console.log(xlist)
//              ////console.log(ylist)
//              ////console.log(ylist2)
//              that.echart(xlist,ylist,ylist2)

//              if(lists.length<10){
//                  that.zong="0"+lists.length
//              }else{
//                 that.zong=lists.length
//              }
             
//             //  }, 500);
     
//           })
//           })

//         },
    correctArr(list){
      let arr=[]
     for(let i=list.length-1;i>=0;i--){
       arr.push(list[i])
     }
     return arr
    },
  //    getspeed(){
  //      let that=this
  //      let list=[]
  //      that.speedlist=[]
  //   let url="http://106.12.219.66:8227/report/getSimpleReport"
  //       axios({
  //           url: url,
  //           method: 'post',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'companyId': 0
  //           },
  //           data: {
  //           tableName:"sizing_machine308",
  //             query:{
  //                company_id:that.companyId
  //              }
  //           }
  //         })
  //         .then(response => {
  //           //////console.log(response)
  //           for(let i=0;i<response.data.data.length;i++){
          
  // list.push(response.data.data[i])
  //           }
          

  //         }).then(() => {
  //                axios({
  //           url: url,
  //           method: 'post',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'companyId': 0
  //           },
  //           data: {
  //           tableName:"sizing_machine310",
  //             query:{
  //                company_id:that.companyId
  //              }
  //           }
  //         })
  //         .then(response => {
  //      for(let i=0;i<response.data.data.length;i++){
  // list.push(response.data.data[i])
  //           }
  //         }).then(() => {
  //               axios({
  //           url: url,
  //           method: 'post',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'companyId': 0
  //           },
  //           data: {
  //           tableName:"sizing_machine312",
  //             query:{
  //                company_id:that.companyId
  //              }
  //           }
  //         })
  //         .then(response => {
  //                for(let i=0;i<response.data.data.length;i++){
  // list.push(response.data.data[i])
  //           }
  //         }).then(() => {
  //           let list2=that.sortByKey(list,"speed")
         
            
     
       
  //           for(let i=list2.length-1;i>=list2.length-3;i--){
  //            //////console.log(    list2[i])
  //             if(i==(list2.length-1)){
               
  //               list2[i].backgr="background:black;color:red"
  //             }else if(i==(list2.length-2)){
  //                 list2[i].backgr="color:#FFEE01"
  //             }else if(i==(list2.length-3)){
  //               list2[i].backgr="background:black;color:#42FF00"
  //             }
  //             list2[i].f_u_tension=parseFloat( list2[i].f_u_tension)
  //             //console.log(list2[i].f_u_tension)
  //             if(isNaN( list2[i].f_u_tension)){
  //               list2[i].f_u_tension=0
  //             }
  //             that.speedlist.push(list2[i])
  //         //                 axios({
  //         //   url: url,
  //         //   method: 'post',
  //         //   headers: {
  //         //     'Content-Type': 'application/json',
  //         //     'companyId': 0
  //         //   },
  //         //   data: {
  //         //   tableName:"com_machine_uuid_id",
  //         //     query:{
  //         //       machine_uuid:list2[i].uuid
  //         //      }
  //         //   }
  //         // })
  //         // .then(response => {
  //         //      list2[i].machineid=  response.data.data[0].machine_id
  //         //         
  //         // })
           
  //           }
          
  //                    that.getspeed2(list2)
          

  //         })
  //         })
  //         })
  //    },
  echart(xlist,ylist,ylist2){
 
      let myChart1 = this.$echarts.init(document.getElementById('echart11'));
        // 绘制图表
        myChart1.clear();
        let that = this
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
         color: ['#FF6F00', '#FFEE00'],
          legend: {
               orient:'vertical',
            data: ['当班', '上一班', ],
            itemWidth: 15,
            itemHeight: 8,
            top: "21%",
            right: "17%",
            textStyle: {
              color: "white",
              fontSize: 17,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "9%",
            top: "35%",
            right: "12%",
            left:"15%"
          },
          title: {
            padding: [
              3, // 上
              90, // 右
              2, // 下
              90, // 左
            ],
            left: "center",
            top: "21%",

            textStyle: {
              color: "#00E6F1",
              fontSize: 25,
              fontWeight: "normal"
            },
            text: "单台浆纱机班产对比"
          },
          xAxis: [{
            type: 'category',
            data: xlist,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 13
              }
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            }
          }],
          yAxis: [{
              type: 'value',
              name: '产量/m',
              // min: 100,
              // max: 350,
              // interval: 50,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 13
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'solid',
                  color: "rgba(84,84,84,0.5)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "rgba(0,0,0,0)",
                  width: 1
                }
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#FFFFFF",
                  fontSize: 13
                }
              },
            },
    
          ],
          series: [{
              name: '当班',
              type: 'bar',
         
              data: ylist
            },
            {
              name: '上一班',
              type: 'bar',
            
              data:ylist2
            },

          ]
        };

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
  },
   echart2(xlist,ylist,ylist2){
     
      let myChart1 = this.$echarts.init(document.getElementById('echart12'));
        // 绘制图表
        myChart1.clear();
        let that = this
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          color: ['#00FF19', '#0099FF'],
          legend: {
              orient:'vertical',
            data: ['电量','产量',  ],
            itemWidth: 15,
            itemHeight: 8,
            top: "11%",
               right: "18%",
            textStyle: {
              color: "white",
              fontSize: 17,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "9%",
            top: "35%",
            right: "12%",
            left:"15%"
          },
          title: {
            padding: [
              3, // 上
              90, // 右
              2, // 下
              90, // 左
            ],
            left: "center",
            top: "11%",

            textStyle: {
              color: "#00E6F1",
              fontSize: 25,
              fontWeight: "normal"
            },
            text: "浆纱机产量与电量实时对比"
          },
          xAxis: [{
            type: 'category',
            data: xlist,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 13
              }
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            }
          }],
          yAxis: [{
              type: 'value',
              name: '电量/Kwh',
              // min: 100,
              // max: 350,
              // interval: 50,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 13
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'solid',
                  color: "rgba(84,84,84,0.5)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "rgba(0,0,0,0)",
                  width: 1
                }
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#FFFFFF",
                  fontSize: 13
                }
              },
            },{
              type: 'value',
              name: '产量/m',
              // min: 100,
              // max: 350,
              // interval: 50,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 13
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'solid',
                  color: "rgba(84,84,84,0.5)",
                }
              },
              nameLocation: "end",
              axisLine: {
                lineStyle: {
                  color: "rgba(0,0,0,0)",
                  width: 1
                }
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#FFFFFF",
                  fontSize: 13
                }
              },
            },
    
          ],
          series: [{
              name: '产量',
              type: 'bar',
             yAxisIndex: 1,
              data: ylist
            },
            {
              name: '电量',
              type: 'bar',
               yAxisIndex: 0,
              data:ylist2
            },

          ]
        };

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
  },
        getWarningPushDataTiming: function () {
        const timer = setInterval(() => {
   this.getspeed()
        }, 15000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once('hook:beforeDestroy', () => {
          clearInterval(timer);
        })
      },
    },


    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    mounted() {
      let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(() => {
        _this.date = new Date(); // 修改数据date
      }, 1000);
  
    this.getspeed()
    this.getWarningPushDataTiming()


    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  }

</script>

<style scoped>


  .content4 {
    height: auto;
    margin-top: 10px;
    /*color: rgba(173, 255, 47, 0.25);*/
  }

  header {
    padding: 0;
    width: 100%;
    text-align: center;
    margin: 0;
  }

  .title {
    /*background-image: url("../static/img/title.png");*/
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: transparent;
    height: 5rem;
    color: white;
    text-align: center;
    font-size: 3em;
    width: 100%;
    /*-webkit-box-shadow:1px 1px 1px rgba(9, 62, 175, 0.66);*/
    /*-moz-box-shadow:1px 1px 1px rgba(9, 62, 175, 0.66);*/
    /*box-shadow:1px 1px 25px  rgba(9, 62, 175, 0.66);*/
    /*border-radius: 1rem;*/
  }
  .monitor{
      width: 100%;
      height: 60.5rem;

      display: flex;
  }
  .monitor_left{
      width: 55%;
      height: 100%;
     
  }
.monitor_left_top{
      width: 100%;
      height: 8%;
  margin-bottom: 1rem;
        position: relative;
  }
  .img{
        position: absolute;
    left: 7rem;
    top: 1rem;
    width: 14rem;
    height: 4rem;
    background-image: url("../static/img/card4.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .img_con{
      display: flex;
      font-size: 1rem;
      color: #5D7091;
      align-items: center;
      margin-top: 0.5rem;
  }
  .jiantou{
      width: 1rem;
      height: 1rem;
         background-image: url("../static/img/jiantou.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
    .monitor_right{
      width: 45%;
      height: 100%;
            
  }
  .echarts{
    height: 30rem;
    width: 50rem;
  }

  .monitor_left_mid{
         width: 100%;
      height: 90%;
       position: relative;
  }
.top{
width: 28rem;
    height: 15rem;
    position: absolute;
    left: 7rem;
    
    display: flex;
    flex-direction: column;
}
.top_title{
    width: 100%;
    height: 15%;
  font-size: 25px;
    margin-bottom: 2rem;
    color: #00E6F1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.top_head{
       width: 100%;
    height: 15%;
    font-size: 1rem; 
    display: flex;
}
.top_head span{
       width: 25%;
    height: 100%;
   
    display: flex;
    align-items: center;
    justify-content: center;

}
.top_con{
       width: 100%;
    height: 19%;
    font-size: 1.3rem; 
    display: flex;
}
.top_con span{
       width: 25%;
    height: 100%;
   
    display: flex;
    align-items: center;
    justify-content: center;

}
.speed{
    width: 30rem;
    height: 19rem;
    position: absolute;
    right: 0rem;
    top: 0rem;

    display: flex;
    flex-direction: column;
}
.span1{
 display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 1.2rem;
       margin: 0.9rem;
}
.span2{
       display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 2rem;
    color: #EEFF00;
           font-family: 'let';
    margin: 0rem;
}
.span3{
     display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 1.3rem;
    margin-right: 0.3rem;
}
.speed_con{
    width: 100%;
       height: 23rem;

}
.speed_con_one{
width: 8.9rem;
    height: 7.3rem;
    margin-right: 0.3rem;
    margin-bottom: 0.3rem;
  border: 1px solid #00FFC2;
    float: left;
    background: black;

}
.car{
      width: 53rem;
    height: 30rem;
    position: absolute;
    left: 0%;
    bottom: 9%;
          background-image: url("../static/img/car2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.card6{
  width: 29rem;
    height: 17rem;
    position: absolute;
    right: 6%;
    bottom: 24%;
          background-image: url("../static/img/card6.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
}
.card6_con{
      width: 15rem;
    height: 10rem;
    position: relative;
   margin-right: 1rem;
    display: flex;
    flex-direction: column;
}
.card6_con span{
    width: 100%;
    margin-top: 2rem;
}
</style>
