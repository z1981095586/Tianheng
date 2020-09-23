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
        <div class="img_con"><a @click="back()" style="   font-size: 1.2rem;color: #5D7091;text-decoration:none">{{workshopname}}智能织造</a><div class="jiantou"></div><span style="margin-right:1rem">{{workshopname}}</span><div class="jiantou"></div><span >浆纱机</span></div>
    </div>
</div>

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
          <div class="monitor_left_con">
<div class="monitor_left_con_con">

</div>
 
      <div class="card6_con">
              <span style="font-size:1.4rem;color:white;margin-top:1rem;width:17rem">浙江{{workshopname}}纺织有限公司</span>
              <span style="color:#FFF700;font-size:1.8rem; margin-top:0.5rem;width:17rem  ">浆纱机总数：{{jssum}}</span>
            </div>
</div>
</div>

      <div class="monitor_right">
  <div class="monitor_right_top">
  <div class="echart1" id="echart1">

    </div>
   <div class="echart2" id="echart2">

    </div>
    </div>
      <div class="monitor_right_bottom">
            <div class="sscs">
      <div class="sscs_title">
    <span style="margin-right:3rem">实时车速监控</span>
  </div>
    <div class="sscs_con">
       <div class="speed_con_one" v-for="(item,index) in speedlist" :key="index" :style="item.margin">
                <div class="span1" >{{item.machine_id | upper}}</div>
                  <div class="span2" >{{item.speed}}</div>
                    <div class="span3" >m/min</div>
            </div>
            
                
  </div>

  </div>
  <!-- <div class="echart3" id="echart3">

    </div> -->
    </div>
    </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "js",
    data() {
      return {
     timer:null,
        companyId: this.$route.params.id, //公司库表Id
        workshop_id:this.$route.params.workshop,
        workshopname:"",
        dts:12,
        timer:"",
           sumzz:null,
        sumzj:null,
               sumyb:this.$route.params.sumyb,
        sumjs:[],
        jssum:null,
jzs:null,
aj:30000,
bj:30000,
aj1:5,
bj1:3,
speedlist:[]
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
          })

      },
      getdata2(){
let url="http://120.55.124.53:8226/machine/getSizingHisCompare"
     let that = this
     let xlist=[]
     let ylista=[] //a班 完成产量
     let ylistb=[]
       let ylista2=[] //a班 轴完成数
     let ylistb2=[]
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
workshopId:that.workshop_id,
dayNum:"-7"
            }
          })
          .then(response => {
            console.log(response)
for(let i=0;i<response.data.data.list.length;i++){
xlist.push(response.data.data.list[i].shiftDate.substr(6,5))
ylista.push(response.data.data.list[i].acurrentShiftOutput)
ylistb.push(response.data.data.list[i].bcurrentShiftOutput)
ylista2.push(response.data.data.list[i].ashiftBeamNum)
ylistb2.push(response.data.data.list[i].bshiftBeamNum)
}
xlist.push("08-26")
ylista.push(that.aj)
ylistb.push(that.bj)
ylista2.push(that.aj1)
ylistb2.push(that.bj1)
console.log(xlist)
console.log(ylista)
console.log(ylistb)
that.echart1(xlist,ylista,ylistb)
that.echart2(xlist,ylista2,ylistb2)
        
                 
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
          checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      },
          gethourarr(num) {
        let arr = []
        let arr2 = []
        for (let i = 0; i < num; i++) {
          let d = new Date(new Date().getTime() - i * 60 * 60 * 1000);

          let year = d.getFullYear();
          let mon = d.getMonth() + 1;
          let dd = d.getDate();
          let hh = d.getHours();
          let mm = d.getMinutes();
          let ss = d.getSeconds();

          //如果月，日，时，分，秒的值小于10，则在其前面加0
          mon = this.checkTime(mon);
          dd = this.checkTime(dd);
          hh = this.checkTime(hh);
          mm = this.checkTime(mm);
          ss = this.checkTime(ss);

          // let str = year + '-' + mon + '-' + dd + ' ' + hh + ":00:00"
let str =  hh + ":00"
          arr.push(str)
        }
        for (let i = arr.length - 1; i >= 0; i--) {
          arr2.push(arr[i])
        }
        return arr2
      },
      getdata(){
        let that=this
        let url="http://106.12.219.66:8227/report/getSimpleReport"
                axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
               tableName:"sizing_view",
               query:{
                 workshop_id:that.workshop_id,

               },
               selectFields:['machine_id','speed']
            }
          })
          .then(response => {
            that.jzs=response.data.data.length
            if(that.jzs<10){
              that.jzs="0"+that.jzs
            }
            console.log(response)
            that.jssum=response.data.data.length
            if(that.jssum<10){
              that.jssum="0"+that.jssum
            }
            that.speedlist=response.data.data
          })

      },
          // 对象排序
      sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },
   echart1(xlist,ylista,ylistb){
           let myChart1 = this.$echarts.init(document.getElementById('echart1'));
        // 绘制图表
        myChart1.clear();
    
       
      let option = {
          color:['#94F85C'],
              title: {
        text: '班次完成产量对比',
          textStyle: {
              color: "#00E6F1",
              fontSize: 20,
              fontWeight: "normal"
            },
            left:"center",
            top:"10%"
    },
   
    color:['#FF0000','#FCC100'],
        legend: {
        data: ['A班产量', 'B班产量'],
           top: "17%",
               right: "8%",
            textStyle: {
              color: "white",
              fontSize: 17,
              fontStyle: "normal"
            }
    },
      grid: {
        left: '20%',
        right: '10%',
        bottom: '20%',
        top:"25%",
      
    },
    xAxis: {
        type: 'category',
        data: xlist,
         axisLine: {
                lineStyle: {
                  color: "white",
                  width: 1
                }
              },
            nameTextStyle: {
                color: "white",
                fontSize: 13
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
          name: '长度/米',
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
             color: "rgba(0,0,0,0)",
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
    series: [{
        data: ylista,
        name:"A班产量",
        type: 'bar',
        barWidth:"30%"
    },
    {
        data: ylistb,
             name:"B班产量",
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
     echart2(xlist,ylista2,ylistb2){
        let myChart1 = this.$echarts.init(document.getElementById('echart2'));
        // 绘制图表
        myChart1.clear();
      let option = {
          color:['#94F85C'],
              title: {
        text: '班次完成轴数对比',
          textStyle: {
              color: "#00E6F1",
              fontSize: 20,
              fontWeight: "normal"
            },
            left:"center",
            top:"10%"
    },
    color:['#AED6FF','#007EFC'],
        legend: {
        data: ['A班轴数', 'B班轴数'],
           top: "17%",
               right: "8%",
            textStyle: {
              color: "white",
              fontSize: 17,
              fontStyle: "normal"
            }
    },
      grid: {
        left: '15%',
        right: '5%',
        bottom: '20%',
        top:"25%",
      
    },
    xAxis: {
        type: 'category',
        data: xlist,
         axisLine: {
                lineStyle: {
                  color: "white",
                  width: 1
                }
              },
            nameTextStyle: {
                color: "white",
                fontSize: 17
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
          name: '产量',
              // min: 100,
              // max: 350,
              // interval: 50,
      nameLocation: "end",
              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 20
              },
         axisLine: {
                lineStyle: {
                  color: "rgba(0,0,0,0)",
                  width: 1
                }
              },
            nameTextStyle: {
                color: "white",
                fontSize: 13
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
    series: [{
        data: ylista2,
        name:"A班轴数",
        type: 'bar',
        barWidth:"30%"
    },
    {
        data: ylistb2,
             name:"B班轴数",
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
     echart3(xlist,ylist,ylist2,legendlist){
                 let myChart1 = this.$echarts.init(document.getElementById('echart3'));
        // 绘制图表
        myChart1.clear();
let option = {
            title: {
        text: '车速实时监控',
          textStyle: {
              color: "#00E6F1",
              fontSize: 20,
              fontWeight: "normal"
            },
            left:"center",
            top:"10%"
    },
    color:['#5CFF00','#FC0000'],
          grid: {
        left: '5%',
        right: '5%',
        bottom: '20%',
        top:"25%",
      
    },
    legend:{
     data:legendlist,
      orient:"vertical",
      right:"32%",
      top:"10%",
      textStyle:{
          color:"#00E6F1",
                 fontSize: 17,
              fontStyle: "normal"
      }
    },
    xAxis: {
        type: 'category',
        data: xlist,
               axisLine: {
                lineStyle: {
             color: "white",
                  width: 1
                }
              },
                  axisLabel : {
                        
                            textStyle: {
                                color: '#fff',
                            fontSize:20
                            }
                        }
    },
    yAxis: {
        type: 'value',
             name: '转速 r/min',
              // min: 100,
              // max: 350,
              // interval: 50,
      nameLocation: "end",
              nameTextStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 20
              },
              axisLine: {
                lineStyle: {
             color: "white",
                  width: 1
                }
              },
                axisLabel : {
                        
                            textStyle: {
                                color: '#fff',
                            fontSize:20
                            }
                        }
    },
    series: [{
        data: ylist,
        type: 'line',
        name:legendlist[0]
    },
    {
        data: ylist2,
        type: 'line',
             name:legendlist[1]
    }]

};
console.log(option)
   myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
     },
       getWarningPushDataTiming: function () {
         
        const timer = setInterval(() => {
     this.getzjSum()
  this.getzzSum()
  this.getjsSum()
  this.getdata()
    this.getdata2()
    // this.aj=this.aj+60
    // this.bj=this.bj+60
    // this.aj1=this.aj1+2
    // this.bj1=this.bj1+3
    // var timestamp = (new Date()).getTime();
    // var o=new Date(new Date().toLocaleDateString()).getTime()
   
   
    // this.sumyb=this.numbertoString( ((timestamp-o)+this.getRandomInt(1,5))/1000)
        // for(let i=0;i<this.sumyb.length;i++){
        //     this.sumyb[i].num=this.getRandomInt(1,5)
        //   }
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
console.log(this.$route.params.optionjs)
   this.getzjSum()
  this.getzzSum()
  this.getjsSum()
    this.getdata2()
  this.getdata()

  this.getWarningPushDataTiming()
//        this.echart1()
    
//  this.echart2()
//  this.echart3()

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
      width: 50%;
      height: 100%;
     
  }

  .monitor_left_top{
      width: 100%;
      height: 4rem;

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
  .monitor_left_con{
        width: 90%;
    height: 59%;
    margin-top: 13rem;
           background-image: url("../static/img/card66.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
    .monitor_left_con_con{
       width: 29rem;
    height: 21rem;
           background-image: url("../static/img/card77.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
      right: -6%;
    top: 8%;
  }
 .card6_con{
    width: 10rem;
    height: 4rem;
    position: absolute;
    right: 0rem;
    top: 4.8rem;
    /* margin-right: 1rem; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    align-items: center;
    justify-content: center;
 }
     .sscs{
       width: 100%;
    height: 34%;
    margin-top: 8%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .sscs_title{
    width: 100%;
    height: 15%;
   
    margin: 2rem;
        margin-bottom: 4rem;
    display: flex;
        align-items: center;
    justify-content: center;
    font-size: 48px;
    color: #00E6F1;
      margin-left: 2rem;
  }
    .sscs_con{
    width: 100%;
    height: 83%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .speed_con_one{
width: 10.9rem;
    height: 9.3rem;

    
    margin-bottom: 1rem;
    border: 1px solid #00FFC2;

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
 .monitor_title {
     width: 84%;
       margin-left: 5%;
    height: 2.5rem;
  margin-top: 3rem;
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
   .monitor_right{
         width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
  }
  .monitor_right_top{
      width: 100%;
      height: 50%;
      display: flex;
  }
  .echart1{
      width: 50%;
      height: 100%;

  }
    .echart2{
      width: 50%;
      height: 100%;
      
  }
  .monitor_right_bottom{
         width: 100%;
      height: 50%;
      display: flex;
  
      justify-content: center;
  }
    .echart3{
      width: 100%;
      height: 100%;
      
  }
</style>
