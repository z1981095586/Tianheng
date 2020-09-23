<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="content4">

    <header>
      <div class="title">七星智能纺织-整经机</div>
      <h1 class="tip">

    
       
        
      </h1>
    </header>
    <div class="monitor">
  <div class="monitor_left">
<div class="monitor_left_top">
    <div class="img">
        <div class="img_con"><a @click="back()"  style="   font-size: 1rem;color: #5D7091;text-decoration:none">七星智能纺织</a><div class="jiantou"></div><span style="margin-right:1rem">整经机</span></div>
    </div>

</div>
<div class="monitor_left_mid">
  <div class="cldb_dts">
   <div  style="width:74%;height:100%" id="echart7"></div>
    <div  class="circle">
          <div  class="circle_con">
      <div class="font">
        <span >断头数</span>
         <span style="color:#F7FF00;font-size: 1.5rem; margin-top: 0.3rem;">{{dts}}</span>
      </div>
    </div>
    </div>
  </div>
   <div class="sscs">
      <div class="sscs_title">
    实时车速监控
  </div>
    <div class="sscs_con">
       <div class="speed_con_one" v-for="(item,index) in speedlist" :key="index" :style="item.margin">
                <div class="span1" >{{item.machine_id | upper}}</div>
                  <div class="span2" >{{item.current_speed}}</div>
                    <div class="span3" >m/min</div>
            </div>
            
                
  </div>
  </div>

</div>
</div>

      <div class="monitor_right">
        <div class="monitor_right_top">
          <div  style="width:100%;height:100%" id="echart8"></div>
        </div>
           <div class="monitor_right_bottom">
          <div class="imgs1">
              <div class="card6_con">
                    <span style="font-size:1rem;color:#00FF99;margin-top:1rem">浙江省七星纺织有限公司</span>
                      <span style="color:#FFF700;font-size:1.3rem; margin-top:0.5rem  ">整经机总数：{{zong}}</span>
                </div>
          </div>
             
        </div>
  <!-- <div  style="width:100%;height:45%" id="echart"></div>
    <div  style="width:100%;height:45%" id="echart2"></div> -->
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
    name: "zj",
    data() {
      return {
     timer:null,
        companyId: this.$route.params.id, //公司库表Id
        workshop_id:this.$route.params.workshopid,
        dts:null,
        speedlist:[],
        zong:null
      }
    },
    methods: {
      back(){
        ////console.log(this.$route)
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
        sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },
     getbcl(){
         let machineidlist=[];
         let current_shift_outputlist=[]
         let hislist=[]
         let wwc_lengthlist=[]
         let current_lengthlist=[]
         let that=this
             that.speedlist=[]
             let l2=[]
 let url="http://106.12.219.66:8227/report/getSimpleReport"
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
            tableName:"warping",
        
          
            }
          })
          .then(response => {
       
          response.data.data=that.sortByKey(response.data.data,"machine_id")
          let dts=0
          if(response.data.data.length<10){
             that.zong="0"+(response.data.data.length)
          }else{
 that.zong=response.data.data.length
          }
                   //console.log(response.data.data)
          for(let i=0;i<response.data.data.length;i++){
       
            dts=dts+response.data.data[i].number_broken_ends //dts
         if(i==0){
           response.data.data[i].margin="margin-left:9rem"
         }else if(i==4){
            response.data.data[i].margin="margin-left:3.5rem"
         }else if(i==9){
            response.data.data[i].margin="margin-left:9rem"
         }
            that.speedlist.push(response.data.data[i])//实时车速
            ////console.log(response.data.data[i])

            machineidlist.push(response.data.data[i].machine_id)//统计图1
            current_shift_outputlist.push(response.data.data[i].current_shift_output)
                l2.push({
          machine_id:response.data.data[i].machine_id,
          current_shift_output:response.data.data[i].current_shift_output
        })
               wwc_lengthlist.push((response.data.data[i].setting_length-response.data.data[i].current_length))//统计图2
             current_lengthlist.push(response.data.data[i].current_length)
          }
          that.echart2(machineidlist,current_lengthlist,wwc_lengthlist)
          that.dts=dts
          }).then(() => {
            let l=[]
            console.log(machineidlist)
      for(let i=0;i<machineidlist.length;i++){
           axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
            tableName:"warping_his",
            query:{
            machine_id: machineidlist[i]
            },
            sort:"DESC",
            sortColumn:"id"
          
            }
          })
          .then(response => {
        l.push({
          machine_id:machineidlist[i],
          current_shift_output:response.data.data[0].current_shift_output
        })
        if(l.length==machineidlist.length){
   l=that.sortByKey(l,"machine_id")
  
           //console.log(l2)
           for(let i=0;i<l.length;i++){
 hislist.push(l[i].current_shift_output)
           }
  //  ////console.log(hislist)
  //     ////console.log(current_shift_outputlist)
  that.echart(machineidlist,current_shift_outputlist,hislist)
        }
         
          })
      }

     



          })
     },
  echart(machineidlist,current_shift_outputlist,hislist){
 
      let myChart1 = this.$echarts.init(document.getElementById('echart7'));
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
          color: ['#FF0000', '#6AB0B8'],
          legend: {
               orient:'vertical',
            data: ['当班', '上一班', ],
            itemWidth: 15,
            itemHeight: 8,
            top: "4%",
            right: "17%",
            textStyle: {
              color: "white",
              fontSize: 17,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "8%",
            top: "25%",
            right: "0%",
            left:"14.5%"
          },
          title: {
            padding: [
              0, // 上
              90, // 右
              10, // 下
              90, // 左
            ],
            left: "center",
            top: "8%",

            textStyle: {
              color: "#00E6F1",
              fontSize: 25,
              fontWeight: "normal"
            },
            text: "单台整经机班产对比"
          },
          xAxis: [{
            type: 'category',
            data: machineidlist,
            axisPointer: {
              type: 'shadow'
            },
            
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },
              fontStyle:"italic"
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
              name: '长度/m',
              //  min: 0,
              // max: 350,
              // interval: 50,

              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
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
                  fontSize: 10
                }
              },
            },
    
          ],
          series: [{
              name: '当班',
              type: 'bar',
    
              data: current_shift_outputlist
            },
            {
              name: '上一班',
              type: 'bar',
            
              data:hislist
            },

          ]
        };

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
  },
   echart2(machineidlist,current_lengthlist,wwc_lengthlist){
     
      let myChart1 = this.$echarts.init(document.getElementById('echart8'));
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
          color: [ '#FF0000','#FFFF00',],
          legend: {
              orient:'vertical',
            data: ['当前经长', '未完成经长', ],
            itemWidth: 15,
            itemHeight: 8,
            top: "17%",
               right: "7%",
            textStyle: {
              color: "white",
              fontSize: 17,
              fontStyle: "normal"
            }
          },
          grid: {
            bottom: "9%",
            top: "35%",
            right: "7%",
            left:"8%"
          },
          title: {
            padding: [
              3, // 上
              90, // 右
              2, // 下
              90, // 左
            ],
            left: "center",
            top: "20%",

            textStyle: {
              color: "#00E6F1",
              fontSize: 25,
              fontWeight: "normal"
            },
            text: "当前经长和未完成经长对比"
          },
          xAxis: [{
            type: 'category',
            data: machineidlist,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
               fontStyle:"italic",
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
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
              name: '长度/m',
              // min: 100,
              // max: 350,
              // interval: 50,
 min: 0,
 
              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 13
              },

              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
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
                  fontSize: 10
                }
              },
            },
    
          ],
          series: [{
              name: '未完成经长',
              type: 'bar',
        barGap:"-100%",
             barWidth:"45%",
              data: wwc_lengthlist
            },
            {
              name: '当前经长',
              type: 'bar',
                  barWidth:"45%",
              data:current_lengthlist
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
      this.getbcl()
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
      this.getbcl()
       this.getWarningPushDataTiming()
       
    


    },
      filters: {
            upper: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.toUpperCase();
            }
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
      width: 58%;
      height: 100%;
     
  }
  .monitor_right{
         width: 42%;
      height: 100%;
      display: flex;
      flex-direction: column;
  }

    .monitor_right_top{
         width: 100%;
      height: 45%;
   
  }
    .monitor_right_bottom{
       width: 100%;
    /* height: 55%; */
    height: 32rem;
   position: relative;
       background-image: url("../static/img/machine2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

.monitor_left_top{
      width: 100%;
      height: 8%;
  
        position: relative;
  }
  .card6_con{
      width: 15rem;
    height: 10rem;
  position: absolute;
      
    left: -1rem;
    top: 0.5rem;
   margin-right: 1rem;
    display: flex;
    flex-direction: column;
}
  .monitor_left_mid{
         width: 100%;
      height: 90%;
       position: relative;
  }
  .img{
        position: absolute;
    left: 3.5rem;
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
  .cldb_dts{
    width: 100%;
    height: 40%;

    display: flex;
    margin-bottom: 2rem;
  }
  .circle{
    width: 26%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .circle_con{
  width: 19rem;
  height: 19rem;
       background-image: url("../static/img/circles.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .sscs{
        width: 100%;
    height: 55%;

    display: flex;
    flex-direction: column;
  }
  .sscs_title{
    width: 100%;
    height: 15%;
    margin-bottom: 2%;
    display: flex;
        align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    color: #00E6F1;
  }
    .sscs_con{
    width: 100%;
    height: 83%;
  }
  .speed_con_one{
width: 8.9rem;
    height: 7.3rem;
    margin-right: 4rem;
    margin-bottom: 1rem;
    border: 1px solid #00FFC2;
    float: left;
background: black;
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
    font-family: 'let';
    color: #EEFF00;
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
  .font{
    width: 60%;
    height: 60%;
    display: flex;
    flex-direction: column;
       
        align-items: center;
    justify-content: center;
  }
  .font span{
    width: 100%;

    display: flex;
        align-items: center;
    justify-content: center;
    font-size: 1rem;
  }
  .imgs1{
    width: 20rem;
    position: absolute;
    top: 4rem;
    height: 15rem;
        background-image: url("../static/img/card9.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

</style>
