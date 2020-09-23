<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="content4">

    <header>
      <div class="title">{{workshopname}}智能织造数字化平台</div>
      <h1 class="tip">

    
       
        
      </h1>
    </header>
    <div class="monitor">
  <div class="monitor_left">
  <div class="monitor_left_top">
  <div class="img">
        <div class="img_con"><a @click="back()" style="   font-size: 1.2rem;color: #5D7091;text-decoration:none">{{workshopname}}智能织造</a><div class="jiantou"></div><span style="margin-right:1rem">{{workshopname}}</span><div class="jiantou"></div><span >整经机</span></div>
    </div>
</div>
  <div class="monitor_left_middle" id="echart1">

</div>
  <div class="monitor_left_bottom" id="echart2">

</div>
</div>

      <div class="monitor_right">
        <div style="width:20rem;height:20rem;    width: 30rem;height: 30rem;position: absolute;right: 4%;top:11%;">
             <div class="monitor_title"><span>产量实时监控</span></div>
          <div class="monitor_con">
            <div class="fangkuai">

              <div
                style="font-size:1rem;margin-bottom: 1rem;display:flex;align-items:center;justify-content: center;width:50%">
                <span>整经总产量</span></div>
              <div style="color:#08FF00;font-size:2rem;" class="num"><span v-for="(item,index) in sumzj" :key="index" style="background:#2D2D2D;margin:0.2rem;padding-left:0.2rem;padding-right:0.2rem">{{item.num}}</span></div>
            </div>
            <div class="fangkuai2" >

              <div
                style="font-size:1rem;margin-bottom: 1rem;display:flex;align-items:center;justify-content: center;width:50%">
                <span>浆纱总产量</span></div>
              <div style="color:#FFCC00;font-size:2rem;" class="num"><span v-for="(item,index) in sumjs" :key="index" style="background:#2D2D2D;margin:0.2rem;padding-left:0.2rem;padding-right:0.2rem">{{item.num}}</span></div>
            </div>
            <div class="fangkuai">

              <div
         style="font-size:1rem;margin-bottom: 1rem;display:flex;align-items:center;justify-content: center;width:50%">
                <span>织造总产量</span></div>
              <div style="color:#CDFF00;font-size:2rem;" class="num"><span v-for="(item,index) in sumzz" :key="index" style="background:#2D2D2D;margin:0.2rem;padding-left:0.2rem;padding-right:0.2rem">{{item.num}}</span></div>
            </div>
            <div class="fangkuai2" >

              <div
                 style="font-size:1rem;margin-bottom: 1rem;display:flex;align-items:center;justify-content: center;width:50%">
                <span>验布总产量</span></div>
              <div style="color:#00FFFF;font-size:2rem;" class="num"><span v-for="(item,index) in sumyb" :key="index" style="background:#2D2D2D;margin:0.2rem;padding-left:0.2rem;padding-right:0.2rem">{{item.num}}</span></div>
            </div>
          </div>
        </div>
    <div class="sscs">
      <div class="sscs_title">
    <span style="margin-right:17rem">实时车速监控</span>
  </div>
    <div class="sscs_con">
       <div class="speed_con_one" v-for="(item,index) in list" :key="index" :style="item.margin">
                <div class="span1" >{{item.machineId | upper}}</div>
                  <div class="span2" >{{item.currentSpeed}}</div>
                    <div class="span3" >m/min</div>
            </div>
            
                
  </div>
    <div class="circle_con">
          <div class="circles">
         
            <div class="font"><span style="font-size:1.8rem">断头数
              </span><div><span style="font-size:3.1rem;color:#EEFF00;width:80%">{{dts}}</span><span>个</span></div></div>
          </div>
        </div>
  </div>
  <div class="car2">
      <div class="card22">
          <div style="width:100%;height:100%;position:relative">
                  <div class="card6_con">
              <span style="font-size:1rem;color:#00FF99;margin-top:1rem">浙江{{workshopname}}纺织有限公司</span>
              <span style="color:#FFF700;font-size:1.3rem; margin-top:0.5rem  ">整经机总数：{{jsjzs}}</span>
            </div>
          </div>
      </div>
  </div>
    </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "zj",
    data() {
      return {
     timer:null,
        companyId: this.$route.params.id, //公司库表Id
        workshop_id:this.$route.params.workshop,
        workshopname:"",
        dts:0,
          sumzz:null,
        sumzj:null,
                sumyb:this.$route.params.sumyb,
        sumjs:[],
        jsjzs:0,
    list:[]
      }
    },
    methods: {
      back(){
        this.$router.push({ //跳转并传参数
          path: '/productMonitor',
          name: 'productMonitor',
          params:{
              //  machine_id:this.macRelation.machine_id,
              id:this.companyId,
              // workshop_id:this.macRelation.workshop_id,
            //  workshop:this.workshopId,
             sumyb:this.sumyb
          }

        })
//  this.$router.push({path:'/productMonitor/'+this.companyId})
      },
       getzjSum() {
        let url = ""
       
          url = "http://47.99.156.243:7070/warping/getZhengJing?workshops="+this.workshop_id
        
        let that = this
        axios({
            url: url,
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {

            }
          })
          .then(response => {
            console.log(response)
            let sum = 0
            for (let i = 0; i < response.data.data.length; i++) {
              sum = sum + response.data.data[i].currentShiftOutput
            }
            
            // that.sumzj = sum
            that.sumzj=that.numbertoString(sum)
            console.log(that.sumzj)
          })
      },
      numbertoString(num){


let digits = num.toString().split('');

let realDigits = digits.map(Number)
let arr=[]
for(let i=0;i<realDigits.length;i++){
  arr.push({
    num:realDigits[i]
  })
}
 console.log(arr);
return arr
      },
      getzzSum() {
        let url = ""
      
          url = "http://47.99.156.243:7070/ab/getMultiWorkshopABAndYield?workshops="+this.workshop_id
        
        let that = this
        axios({
            url: url,
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {

            }
          })
          .then(response => {
            console.log(response)

        
                 that.sumzz=that.numbertoString(parseInt(parseInt(response.data.data.totalYieldXs)*2.5))
                 console.log(parseInt(response.data.data.totalYieldXs)*2.5)
          })

      },
            getjsSum() {
   let that=this
      
           axios({
            url: 'http://47.99.156.243:8227/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },

            data: {

              tableName: "sizing",
       

            }

          })
          .then(response => {
            let sum=0;
            for(let i=0;i<response.data.data.length;i++){
              sum=sum+response.data.data[i].current_shift_output
            }
            
            that.sumjs=that.numbertoString(parseInt(sum))

          })
        
    

      },
      getdata(){
        let that=this
let url="http://120.55.124.53:8226/warp/getAlls"
 axios({
            url: url,
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },

            data: {

           


           



            }

          })
          .then(response => {
            console.log(response)
            let list=[]
            let dts=0
            let xlist=[]
            let ylist=[]
            let ylist2=[]
            let sum=0
            for(let i=0;i<response.data.length;i++){
              if(that.workshop_id==response.data[i].workshopId){
        list.push(response.data[i])
               dts=dts+response.data[i].numberBrokenEnds
               xlist.push(response.data[i].machineId)
               ylist.push(parseInt(response.data[i].settingLength)- parseInt(response.data[i].currentLength))
               ylist2.push(response.data[i].currentLength)
               sum=sum+1
              }
       
            }
            if(sum<10){
              sum="0"+sum
            }
            that.jsjzs=sum
            that.dts=dts
            that.list=list
            that.echart1(xlist,ylist,ylist2)

          })
               axios({
            url: 'http://120.55.124.53:7070/warpingHis/selectWeekYield', //整经统计图数据
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {
             workshops:that.workshop_id
            }

          })
          .then(response => {
            console.log(response)
                let list = []
            let list2 = []
            for (let i = response.data.data.length - 1; i >= 0; i--) {

              response.data.data[i].shiftDate = response.data.data[i].shiftDate.slice(5)
              list2.push((response.data.data[i].currentShiftOutput / 1000).toFixed(0))
              list.push(response.data.data[i].shiftDate)
            }
          
            that.echart2(list,list2)
          })
      },
   echart1(xlist,ylist,ylist2){
          let myChart1 = this.$echarts.init(document.getElementById('echart1'));
        // 绘制图表
        myChart1.clear();
     
      let option = {
    title: {
        text: '当前经长和未完成经长对比',
          textStyle: {
              color: "#00E6F1",
              fontSize: 24,
              fontWeight: "normal"
            },
            left:"40%",
            top:"4%"
    },
  color:['#94F85C','#FF0008',],
    legend: {
        data: ['未完成经长', '当前经长'],
           top: "15%",
               right: "8%",
            textStyle: {
              color: "white",
              fontSize: 17,
              fontStyle: "normal"
            }
    },
    grid: {
        left: '20%',
        right: '15%',
        bottom: '10%',
        top:"25%",
      
    },
    xAxis: {
        type: 'value',
                 name: '长度/米',
              // min: 100,
              // max: 350,
              // interval: 50,
nameLocation: "end",
nameGap:35,
              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 20
              },
        boundaryGap: [0, 0.01],
         axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#FFFFFF",
                  fontSize: 20
                }
              },
                  axisLine: {
                lineStyle: {
                      color: "white",
                  width: 1
                }
              },
                       splitLine: {
                show: false,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,0.5)",
                }
              },
    },
    yAxis: {
        type: 'category',
              name: '机台号',
              // min: 100,
              // max: 350,
              // interval: 50,
nameLocation: "end",
              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 20
              },
        data: xlist,
            axisLine: {
                lineStyle: {
                  color: "white",
                  width: 1
                }
              },
            nameTextStyle: {
                color: "white",
                fontSize: 20
              },
 axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#FFFFFF",
                  fontSize: 17
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,0.5)",
                }
              },
    },
    series: [
        {
            name: '当前经长',
            type: 'bar',
                stack: '总量',
                barWidth:"50%",
            data: ylist2
        },
        {
            name: '未完成经长',
            type: 'bar',
                    stack: '总量',
                      barWidth:"50%",
            data:ylist
        }
    ]
};
     myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
   },
     echart2(list,list2){
          let myChart1 = this.$echarts.init(document.getElementById('echart2'));
        // 绘制图表
        myChart1.clear();
      let option = {
          color:['#94F85C'],
              title: {
        text: '每日总产量对比',
          textStyle: {
              color: "#00E6F1",
              fontSize: 24,
              fontWeight: "normal"
            },
            left:"47%",
            top:"10%"
    },
      grid: {
        left: '20%',
        right: '4%',
        bottom: '10%',
        top:"25%",
      
    },
    xAxis: {
        type: 'category',
        data: list,
         axisLine: {
                lineStyle: {
                  color: "white",
                  width: 1
                }
              },
            nameTextStyle: {
                color: "white",
                fontSize: 20
              },
 axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#FFFFFF",
                fontSize: 20
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,0.5)",
                }
              },
    },
    yAxis: {
        type: 'value',
          name: '产量/米',
              // min: 100,
              // max: 350,
              // interval: 50,
nameLocation: "end",
              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 17
              },
         axisLine: {
                lineStyle: {
                  color: "white",
                  width: 1
                }
              },
            nameTextStyle: {
                color: "white",
                fontSize: 20
              },
 axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#FFFFFF",
                  fontSize: 20
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dashed',
                  color: "rgba(84,84,84,0.5)",
                }
              },
    },
    series: [{
        data: list2,
        type: 'bar',
        barWidth:"30%"
    }]
};
     myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
     },

            //定时刷新预警推送
      getWarningPushDataTiming: function () {
        const timer = setInterval(() => {
          // this.getZhengjing(this.workshopId);
          // this.getJiangsha(this.workshopId);
          // this.getStartRatesYMD(this.workshopId);
      this.getzjSum()
  this.getzzSum()
  this.getjsSum()
    for(let i=0;i<this.sumyb.length;i++){
            this.sumyb[i].num=this.getRandomInt(1,5)
          }
    this.getdata()
this.echart2()
        }, 10000);
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
      },
       upper: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.toUpperCase();
            }
    },
    mounted() {

if(this.$route.params.workshop==1){
  this.workshopname="亿骏"
}else{
this.workshopname="祥嘉"
}
   this.getzjSum()
  this.getzzSum()
  this.getjsSum()

    this.getdata()
this.echart2()
this.getWarningPushDataTiming()
    },
      filters: {
   
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
      width: 40%;
      height: 100%;
     
  }
  .monitor_right{
         width: 60%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
  }
  .monitor_left_top{
      width: 100%;
      height: 4rem;

  }
   .monitor_title {
     width: 84%;
    margin-left: 10%;
    height: 2.5rem;
 
    background: #0B3354;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    justify-content: center;
    margin-bottom: 10px;
  }

  .monitor_title span {
    margin-left: 1rem;
  }
    .fangkuai {

    width: 45%;
    height: 45%;
    float: left;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

  }

  .fangkuai2 {

    width: 45%;
    height: 45%;
    margin-left: 10%;
    float: left;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

  }
  .img{
       margin-left: 3rem;
    width: 23rem;
    margin-top: 1rem;
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
      font-size: 1.2rem;
      color: #5D7091;
      align-items: center;
      margin-top: 0.5rem;
      margin-right:3rem;
  }
  .jiantou{
      width: 1.2rem;
      height: 1.2rem;
         background-image: url("../static/img/jiantou.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .monitor_left_middle{
      width: 100%;
      height: 40%;
    
  }
    .monitor_left_bottom{
      width: 100%;
      height: 40%;
      margin-top: 6rem;
  
  }  
    .sscs{
       width: 51%;
    height: 34%;
    margin-top: 8%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .sscs_title{
    width: 100%;
    height: 15%;
    margin-bottom: 2%;
    display: flex;
        align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #00E6F1;
      margin-left: 2rem;
  }
    .sscs_con{
    width: 100%;
    height: 83%;
        margin-left: 2rem;
  }
  .speed_con_one{
width: 10.9rem;
    height: 9.3rem;

    margin-right: 1rem;
    
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
    font-size: 1.6rem;
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
    font-size: 4rem;
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
    font-size: 1.5rem;
    margin-right: 0.3rem;
}
.circle_con {
     width: 38rem;
    height: 38rem;
    position: absolute;
   top: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card6_con {
     width: 100%;
    height: 4rem;
    position: absolute;
    left: 0rem;
    top: 0.8rem;
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
  }
  .circles {
width: 24rem;
    height: 24rem;
    margin-left: -10rem;
    background-image: url("../static/img/circles.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

  }
  .font {
    width: 10rem;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

  }

  .font span {
    width: 100%;
    margin-top: 0.8rem;

  }
.car2{
    position: absolute;
    width: 60rem;
    height: 45rem;
    right: 0px;
     top: 35%; 
    /* bottom: 3%; */
      background-image: url("../static/img/car2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.card22{
position: absolute;
    width: 17rem;
    height: 26rem;
    left: 13%;
        background-image: url("../static/img/card22.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
