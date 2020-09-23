<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="content4">

    <header>
      <div class="title">七星智能纺织-织机</div>
      <h1 class="tip">

    
       
        
      </h1>
    </header>
    <div class="img">
        <div class="img_con"><a @click="back()"  style="   font-size: 1rem;color: #5D7091;text-decoration:none">七星智能纺织</a><div class="jiantou"></div><span style="margin-right:1rem">织机</span></div>
    </div>
    <div class="monitor">

    <div class="monitor_con">
      <div class="table">
        <div class="table_con">
          <div class="table_head">
            <div class="t_con" v-for="(item,index) in daylist" :key="index" :style="item.style">{{item.name}}</div>
          </div>
            <div class="table_data">
<div class="table_one" v-for="(item,index) in tableData" :key="index">
<div class="table_one_con" style="width:9.05%">{{item.styleName}}</div>
<div class="table_one_con">{{item.dayProductMeter}}</div>
<div class="table_one_con">{{item.openMachineNum}}</div>
<div class="table_one_con">{{item.liaoJiMachineNum}}</div>
<div :class="item.oneMorning==0?'table_one_con':'table_one_con2'" >{{item.oneMorning}}</div>
<div :class="item.oneNight==0?'table_one_con':'table_one_con2'" >{{item.oneNight}}</div>
<div :class="item.twoMorning==0?'table_one_con':'table_one_con2'" >{{item.twoMorning}}</div>
<div :class="item.twoNight==0?'table_one_con':'table_one_con2'" >{{item.twoNight}}</div>
<div :class="item.threeMorning==0?'table_one_con':'table_one_con2'" >{{item.threeMorning}}</div>
<div :class="item.threeNight==0?'table_one_con':'table_one_con2'" >{{item.threeNight}}</div>
<div :class="item.fourMorning==0?'table_one_con':'table_one_con2'" >{{item.fourMorning}}</div>
<div :class="item.fourNight==0?'table_one_con':'table_one_con2'" >{{item.fourNight}}</div>
<div :class="item.fiveMorning==0?'table_one_con':'table_one_con2'" >{{item.fiveMorning}}</div>
<div :class="item.fiveNight==0?'table_one_con':'table_one_con2'" >{{item.fiveNight}}</div>
<div :class="item.sixMorning==0?'table_one_con':'table_one_con2'" >{{item.sixMorning}}</div>
<div :class="item.sixNight==0?'table_one_con':'table_one_con2'" >{{item.sixNight}}</div>

</div>
            </div>
             <!-- <el-table border :data="tableData" style="width: 100%;height:100%" :header-cell-style="headercellstyle" :cell-style="cellstyle">
         
                <el-table-column v-for="(item,index) in daylist" :key="index" :prop="item.prop"  :label="item.name" >
                </el-table-column>





            </el-table>
              <div style="display:flex;justify-content:center;margin-top:20px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>

            </div> -->
        </div>
      </div>
 <div class="echart">
     <div class="echart_one" id="echartzz"></div>
  <div class="echart_one" id="echartzz2"></div>
    <div class="echart_one" id="echartzz3"></div>
      <div class="echart_one" id="echartzz4"></div>
      <div class="cz_table">
        <div class="cz_table_con_title">穿棕车间实际情况</div>
     <div class="cz_table_con">
          <div  v-for="(item,index) in list" :key="index" :class="item.flag">
          <span :class="item.flag1">{{item.product_name}}</span>
                    <span :class="item.flag2">{{item.num}}个</span>
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
    name: "zz",
    data() {
      return {
     timer:null,
        companyId: this.$route.params.id, //公司库表Id
        workshop_id:this.$route.params.workshopid,
  daylist:[],
  tableData:[],
  pageNum:1,
  pageSize:500,
  list:[]
  // total:null
      }
    },
    methods: {
//       cellstyle(row, column, rowIndex, columnIndex){
  
//      if(row.column.label.indexOf("白班")!=-1||(row.column.label.indexOf("夜班")!=-1)){
//        if(row.column.colSpan==0){
//          return 'background:rgb(0,11,39);padding:0 !important;'
//        }else{
//           return 'background:#00FFA7;'
//        }
//      }
//       },
//       headercellstyle(row, column, rowIndex, columnIndex){

//  if(row.column.label.indexOf("白班")!=-1){
//    return 'color:black;background:white;'
//  }else if(row.column.label.indexOf("夜班")!=-1){
//    return 'color:#FFE200;background:balck;'
//  }else{
//     return 'color:#00D8FF;background:rgb(0,11,39);'
//  }
//       },
      back(){
        ////////console.log(this.$route)
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
      fun_date(aa){
        var date1 = new Date(),
        time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
        var date2 = new Date(date1);
        date2.setDate(date1.getDate()+aa);
        let m,d;
 if(date2.getDate()<10){
   d="0"+date2.getDate()
 }else{
   d=date2.getDate()
 }
        if(date2.getMonth()+1<10){
          m="0"+(date2.getMonth()+1)
        }else{
          m=date2.getMonth()+1
        }
        var time2 = date2.getFullYear()+"-"+(m)+"-"+d;
        return time2
    },
     getrcl(){
        let url="http://106.12.219.66:8227/report/getSimpleReport"
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
           
  
    "selectFields": [
        "shiftDate",
        "WorkShopID",
        "sum(product_meter/10) as productMeter"
    ],
    "tableName": "lm_shift_his",
    "query": {},
    "groupByColumn": [
        "shiftDate,WorkShopID having shiftDate > "+"'"+this.fun_date(-8).toString()+"'"
    ]

          
            }
          })
          .then(response => {
          
              let work1list=[]
            let work2list=[]
            let work3list=[]
            let datelist=[]
            let avglist=[]

            for(let i=0;i<response.data.data.length;i++){
                response.data.data[i].shiftDate = (this.addDate(response.data.data[i].shiftDate)).substr(5, 5)
              if(datelist.indexOf(response.data.data[i].shiftDate)==-1){
                  datelist.push(response.data.data[i].shiftDate)
              }
              response.data.data[i].shiftDate=this. dateAddDays( response.data.data[i].shiftDate,1)
              if(response.data.data[i].WorkShopID==1){
                work1list.push(response.data.data[i]['productMeter'])
              }else if(response.data.data[i].WorkShopID==2){
                 work2list.push(response.data.data[i]['productMeter'])
              }else if(response.data.data[i].WorkShopID==3){
                 work3list.push(response.data.data[i]['productMeter'])
              }
            }
            for(let i=0;i<work3list.length;i++){
              avglist.push((work3list[i]+work1list[i]+work2list[i])/3)
            }

            this.echart4(datelist,work1list,work2list,work3list,avglist)
          })
    },
        addDate(time) {
        //加一天
        Date.prototype.format = function (format) {
          var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
          };
          if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
          }
          return format;
        }
        var timestamp = Date.parse(new Date(time));
        timestamp = timestamp / 1000;
        timestamp += 86400; //加一天
        var newTime = new Date(timestamp * 1000).format('yyyy-MM-dd hh:mm:ss');
        return newTime;
      },
    gettcl(){
        let url="http://106.12.219.66:8227/report/getSimpleReport"
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
           
  
    "selectFields": [
        "shiftDate",
        "WorkShopID",
        "sum(product_meter/10)/count(MachineID) as productMeter"
    ],
    "tableName": "lm_shift_his",
    "query": {},
    "groupByColumn": [
        "shiftDate,WorkShopID having shiftDate > "+"'"+this.fun_date(-8).toString()+"'"
    ]

          
            }
          })
          .then(response => {
          
              let work1list=[]
            let work2list=[]
            let work3list=[]
            let datelist=[]
            let avglist=[]

            for(let i=0;i<response.data.data.length;i++){
                response.data.data[i].shiftDate = (this.addDate(response.data.data[i].shiftDate)).substr(5, 5)
              if(datelist.indexOf(response.data.data[i].shiftDate)==-1){
                  datelist.push(response.data.data[i].shiftDate)
              }
              response.data.data[i].shiftDate=this. dateAddDays( response.data.data[i].shiftDate,1)
              if(response.data.data[i].WorkShopID==1){
                work1list.push(response.data.data[i]['productMeter'])
              }else if(response.data.data[i].WorkShopID==2){
                 work2list.push(response.data.data[i]['productMeter'])
              }else if(response.data.data[i].WorkShopID==3){
                 work3list.push(response.data.data[i]['productMeter'])
              }
            }
            for(let i=0;i<work3list.length;i++){
              avglist.push((work3list[i]+work1list[i]+work2list[i])/3)
            }

            this.echart2(datelist,work1list,work2list,work3list,avglist)
          })
    },
    
getDay(day){

　　var today = new Date();



　　var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;



　　today.setTime(targetday_milliseconds); //注意，这行是关键代码



　　var tYear = today.getFullYear();

　　var tMonth = today.getMonth();

　　var tDate = today.getDate();

　　tMonth = this.doHandleMonth(tMonth + 1);

　　tDate = this.doHandleMonth(tDate);

　　return tYear+"-"+tMonth+"-"+tDate;

},

doHandleMonth(month){

　　var m = month;

　　if(month.toString().length == 1){

　　　　m = "0" + month;

　　}

　　return m;

},
        // handleSizeChange(val) {
        //         this.pageSize = val
        //         this.pageNum = 1
        //         this.getliaoji()
        //     },
        //        handleCurrentChange(val) {
        //         ////console.log(val)
        //         this.pageNum = val
        //             this.getliaoji()
        //     },
    getliaoji(){
      console.log(this.getDay(1).substr(5,5))
      let daylist=[]
     
        daylist.push({
          name:this.getDay(1).substr(5,5)+"白班",
          style:"background:white;color:black",
          prop:"oneMorning"
        })
          daylist.push({
            style:"color:#FFE200;background:black",
            name:this.getDay(1).substr(5,5)+"夜班",
            prop:"oneNight"
          })
                 daylist.push({
          name:this.getDay(2).substr(5,5)+"白班",
          style:"background:white;color:black",
          prop:"twoMorning"
        })
          daylist.push({
            style:"color:#FFE200;background:black",
            name:this.getDay(2).substr(5,5)+"夜班",
            prop:"twoNight"
          })
                    daylist.push({
          name:this.getDay(3).substr(5,5)+"白班",
          style:"background:white;color:black",
          prop:"threeMorning"
        })
          daylist.push({
            style:"color:#FFE200;background:black",
            name:this.getDay(3).substr(5,5)+"夜班",
            prop:"threeNight"
          })
                       daylist.push({
          name:this.getDay(4).substr(5,5)+"白班",
          style:"background:white;color:black",
          prop:"fourMorning"
        })
          daylist.push({
            style:"color:#FFE200;background:black",
            name:this.getDay(4).substr(5,5)+"夜班",
            prop:"fourNight"
          })
                          daylist.push({
          name:this.getDay(5).substr(5,5)+"白班",
          style:"background:white;color:black",
          prop:"fiveMorning"
        })
          daylist.push({
            style:"color:#FFE200;background:black",
            name:this.getDay(5).substr(5,5)+"夜班",
            prop:"fiveNight"
          })
                       daylist.push({
          name:this.getDay(6).substr(5,5)+"白班",
          style:"background:white;color:black",
          prop:"sixMorning"
        })
          daylist.push({
            style:"color:#FFE200;background:black",
            name:this.getDay(6).substr(5,5)+"夜班",
            prop:"sixNight"
          })
      
      let list=[{
        name:"品种",
        style:"background:rgba(0,0,0,0);color:#00D8FF;width:8.85%;",
        prop:"styleName"
      },{
        name:"日产",
        style:"background:rgba(0,0,0,0);color:#00D8FF",
           prop:"dayProductMeter"
      },
      {
        name:"开台数",
        style:"background:rgba(0,0,0,0);color:#00D8FF",
           prop:"openMachineNum"
      },
      {
        name:"台数",
        style:"background:rgba(0,0,0,0);color:#00D8FF",
           prop:"liaoJiMachineNum"
      },
      ]
    
      this.daylist=list.concat(daylist) 
         console.log(this.daylist)
   let url="http://106.12.219.66:8227/report/getLiaoJiStatistics"
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
           
  pageNum:this.pageNum,
  pageSize:this.pageSize

          
            }
          })
          .then(response => {
            //console.log(response)
            // this.total=response.data.data.total
        
            this.tableData=response.data.data.list
          })
    },
      getspeed(){
        let url="http://106.12.219.66:8227/report/getSimpleReport"
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
           
  
    "selectFields": [
        "shiftDate",
        "WorkShopID",
        "avg(rpm) as rpm"
    ],
    "tableName": "lm_shift_his",
    "query": {},
    "groupByColumn": [
        "shiftDate,WorkShopID having shiftDate > "+"'"+this.fun_date(-8).toString()+"'"
    ]

          
            }
          })
          .then(response => {
          
              let work1list=[]
            let work2list=[]
            let work3list=[]
            let datelist=[]
            let avglist=[]
       //console.log(response)
            for(let i=0;i<response.data.data.length;i++){
                response.data.data[i].shiftDate = (this.addDate(response.data.data[i].shiftDate)).substr(5, 5)
              if(datelist.indexOf(response.data.data[i].shiftDate)==-1){
                  datelist.push(response.data.data[i].shiftDate)
              }
              response.data.data[i].shiftDate=this. dateAddDays( response.data.data[i].shiftDate,1)
              if(response.data.data[i].WorkShopID==1){
                work1list.push(response.data.data[i]['rpm'])
              }else if(response.data.data[i].WorkShopID==2){
                 work2list.push(response.data.data[i]['rpm'])
              }else if(response.data.data[i].WorkShopID==3){
                 work3list.push(response.data.data[i]['rpm'])
              }
            }
            for(let i=0;i<work3list.length;i++){
              avglist.push((work3list[i]+work1list[i]+work2list[i])/3)
            }
           
            this.echart3(datelist,work1list,work2list,work3list,avglist)
          })
    },
      getEff(){
        ////console.log(this.fun_date(-6))
        let url="http://106.12.219.66:8227/report/getSimpleReport"
        axios({
            url: url,
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
           
  
    "selectFields": [
        "shiftDate",
        "WorkShopID",
        "avg(efficiency)"
    ],
    "tableName": "lm_shift_his",
    "query": {},
    "groupByColumn": [
        "shiftDate,WorkShopID having shiftDate > "+"'"+this.fun_date(-8).toString()+"'"
    ]

          
            }
          })
          .then(response => {
       
            let work1list=[]
            let work2list=[]
            let work3list=[]
            let datelist=[]
            let avglist=[]

            for(let i=0;i<response.data.data.length;i++){
                response.data.data[i].shiftDate = (this.addDate(response.data.data[i].shiftDate)).substr(5, 5)
              if(datelist.indexOf(response.data.data[i].shiftDate)==-1){
                  datelist.push(response.data.data[i].shiftDate)
              }
              response.data.data[i].shiftDate=this. dateAddDays( response.data.data[i].shiftDate,1)
              if(response.data.data[i].WorkShopID==1){
                work1list.push(response.data.data[i]['avg(efficiency)'])
              }else if(response.data.data[i].WorkShopID==2){
                 work2list.push(response.data.data[i]['avg(efficiency)'])
              }else if(response.data.data[i].WorkShopID==3){
                 work3list.push(response.data.data[i]['avg(efficiency)'])
              }
            }
            for(let i=0;i<work3list.length;i++){
              avglist.push((work3list[i]+work1list[i]+work2list[i])/3)
            }

            this.echart(datelist,work1list,work2list,work3list,avglist)
                 ////console.log(response)
            ////console.log(work1list)
            ////console.log(datelist)
          })
      },
      dateAddDays(dataStr,dayCount) {
    var strdate=dataStr; //日期字符串
    var isdate = new Date(strdate.replace(/-/g,"/"));  //把日期字符串转换成日期格式
    isdate = new Date((isdate/1000+(86400*dayCount))*1000);  //日期加1天
           let m,d;
 if( isdate.getDate()<10){
   d="0"+ isdate.getDate()
 }else{
   d= isdate.getDate()
 }
        if( isdate.getMonth()+1<10){
          m="0"+( isdate.getMonth()+1)
        }else{
          m= isdate.getMonth()+1
        }
    var pdate = isdate.getFullYear()+"-"+(m)+"-"+d;   //把日期格式转换成字符串
 
    return pdate;
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
      echart(datelist,work1list,work2list,work3list,avglist){
         let list=work1list.concat(work2list).concat(work3list).concat(avglist)
   
         let min =Math.min(...list)-10
           let myChart1 = this.$echarts.init(document.getElementById('echartzz'));
        // 绘制图表
        myChart1.clear();
        let that = this
             let option = {
               title:{
                  text:"车间日平均效率对比",
                  textStyle:{
                    color:"#00C4FF",
                    fontSize:17
                  },
               left:"center"
               },
                   legend: {
          
            data: ['一车间', '二车间','三车间','平均效率' ],
            itemWidth: 15,
            itemHeight: 8,
            top: "12%",
            right: "3%",
            textStyle: {
              color: "white",
              fontSize: 13,
              fontStyle: "normal"
            }
          },
          grid:{
             bottom:"15%",
             top:"25%"
          },
    xAxis: {
        type: 'category',
          name: '日期',
        data: datelist,
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },
            
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
    },
    yAxis: {
        type: 'value',
          name: '效率/%',
             axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },
            
            },
            min:min.toFixed(0),
        
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            }
    },
    series: [{
        data: work1list,
        type: 'line',
        name:"一车间",
    },
    {
        data:work2list,
        type: 'line',
        name:"二车间",
    },
    {
        data: work3list,
        type: 'line',
        name:"三车间",
    },
    {
        data: avglist,
        type: 'line',
        name:"平均效率",
    },
    ]
};

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
           echart4(datelist,work1list,work2list,work3list){
           let myChart1 = this.$echarts.init(document.getElementById('echartzz4'));
        // 绘制图表
        myChart1.clear();
        let that = this
             let option = {
               title:{
                  text:"车间实际日产量对比",
                  textStyle:{
                    color:"#00C4FF",
                    fontSize:17
                  },
               left:"center"
               },
                   legend: {
          
            data: ['一车间', '二车间','三车间' ],
            itemWidth: 15,
            itemHeight: 8,
            top: "12%",
            right: "3%",
            textStyle: {
              color: "white",
              fontSize: 13,
              fontStyle: "normal"
            }
          },
             grid:{
             bottom:"15%",
             top:"25%"
          },
    xAxis: {
        type: 'category',
          name: '日期',
        data: datelist,
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },
            
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
    },
    yAxis: {
        type: 'value',
          name: '产量/kg',
             axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },
            
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
    },
    series: [{
        data: work1list,
        type: 'line',
        name:"一车间",
    },
    {
        data: work2list,
        type: 'line',
        name:"二车间",
    },
    {
        data: work3list,
        type: 'line',
        name:"三车间",
    },

    ]
};

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
           echart2(datelist,work1list,work2list,work3list,avglist){
           let myChart1 = this.$echarts.init(document.getElementById('echartzz2'));
        // 绘制图表
        myChart1.clear();
        let that = this
             let option = {
               title:{
                  text:"台日产量对比",
                  textStyle:{
                    color:"#00C4FF",
                    fontSize:17
                  },
               left:"center"
               },
                   legend: {
          
            data: ['一车间', '二车间','三车间','平均产量' ],
            itemWidth: 15,
            itemHeight: 8,
            top: "12%",
            right: "3%",
            textStyle: {
              color: "white",
              fontSize: 13,
              fontStyle: "normal"
            }
          },
           grid:{
             bottom:"15%",
             top:"25%"
          },
    xAxis: {
        type: 'category',
          name: '日期',
        data: datelist,
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },
            
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
    },
    yAxis: {
        type: 'value',
          name: '产量/kg',
             axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },
            
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
    },
    series: [{
        data: work1list,
        type: 'line',
        name:"一车间",
    },
    {
        data: work2list,
        type: 'line',
        name:"二车间",
    },
    {
        data: work3list,
        type: 'line',
        name:"三车间",
    },
    {
        data: avglist,
        type: 'line',
        name:"平均效率",
    },
    ]
};

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
           echart3(datelist,work1list,work2list,work3list,avglist){
                   let list=work1list.concat(work2list).concat(work3list).concat(avglist)
   
         let min =Math.min(...list)-50
           let myChart1 = this.$echarts.init(document.getElementById('echartzz3'));
        // 绘制图表
        myChart1.clear();
        let that = this
             let option = {
               title:{
                  text:"车间日平均车速对比",
                  textStyle:{
                    color:"#00C4FF",
                    fontSize:17
                  },
               left:"center"
               },
                   legend: {
          
            data: ['一车间', '二车间','三车间','平均车速' ],
            itemWidth: 15,
            itemHeight: 8,
            top: "12%",
            right: "3%",
            textStyle: {
              color: "white",
              fontSize: 13,
              fontStyle: "normal"
            }
          },
            grid:{
              bottom:"15%",
             top:"25%"
          },
    xAxis: {
        type: 'category',
          name: '日期',
        data: datelist,
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },
            
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
    },
    yAxis: {
        type: 'value',
          name: '车速/ms',
             axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 10
              },
            
            },
            min:min.toFixed(0),
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            }
    },
    series: [{
        data: work1list,
        type: 'line',
        name:"一车间",
    },
    {
        data:work2list,
        type: 'line',
        name:"二车间",
    },
    {
        data: work3list,
        type: 'line',
        name:"三车间",
    },
    {
        data: avglist,
        type: 'line',
        name:"平均车速",
    },
    ]
};

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      getcz(){
        let that=this
        let list=[]
             axios({
            url:  'http://47.110.242.174:10086/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "wear_weaving",
              // sort: "DESC",
              // sortColumn: "create_time",
              query: {
                status: 2
              },
              selectFields:['product_name',"count(*)"],
              groupByColumn:['product_name']

            }

          })
          .then(res => {
            console.log(res)
            for(let i=0;i<res.data.data.length;i++){
              res.data.data[i].flag="cz_table_one"//表示已穿棕
              res.data.data[i].flag1=" cz_table_one_span1"
              res.data.data[i].flag2=" cz_table_one_span2"
             res.data.data[i].num= res.data.data[i]['count(*)']
            }
            list=res.data.data
            // for (let i = 0; i < res.data.data.length; i++) {
            //   if (res.data.data[i].machine_id == -1) {
            //     res.data.data[i].machine_id = "手工穿综"
            //   }
            // }
            // that.yczList = res.data.data
            // that.yczListLength = res.data.data.length

          }).then(()=>{
          
                  axios({
            url:  'http://47.110.242.174:10086/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': that.companyId
            },
            data: {

              tableName: "wear_weaving",
              // sort: "DESC",
              // sortColumn: "create_time",
              query: {
                status: 1
              },
              selectFields:['product_name',"count(*)"],
              groupByColumn:['product_name']

            }

          })
          .then(response => {
              for(let i=0;i<response.data.data.length;i++){
               response.data.data[i].flag="cz_table_two"
              response.data.data[i].flag1=" cz_table_two_span1"
              response.data.data[i].flag2=" cz_table_two_span2"
             response.data.data[i].num= response.data.data[i]['count(*)']
            }
            list=list.concat(response.data.data)
              console.log(list)
              that.list=list
          })
            
          })
      }
    },


    filters: {
    
    },
  
    mounted() {
 



   this.getEff()
   this.gettcl()
   this.getrcl()
   this.getspeed()
   this.getliaoji()
   this.getcz()
       


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

     .img{
        position: absolute;
    left: 3.5rem;
    top: 7.5rem;
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
  .monitor_con{
      width:95%;
      height:80%;
  
          margin-top: 8rem;
    margin-left: 3.5rem;
    display: flex;
  }
.table{
  width: 50%;
  height: 100%;
  
}
.table_con{
  width: 95%;
  height: 100%;
      border:1px solid #00FFCE;
}

.table_head{
  width: 100%;
  height: 5%;
  display: flex;
   border:1px solid #00FFCE;
}
.t_con{
  width:6.25%;
  height:100%;
  border-right: 1px solid #00FFCE;
  border-bottom: 1px solid #00FFCE;
  display: flex;
  align-items: center;
  justify-content: center;
}
.table_data{
    width: 100.5%;
  height: 95%;
overflow: auto;

}
.table_one{
  width: 100%;
  height:  6.25%;
  display: flex;
}
.table_one_con{
    width:6.45%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #00FFCE;
  border-bottom: 1px solid #00FFCE;
}
.table_one_con2{
    width:6.45%;
  height:100%;
  background: rgb(0,133,103);
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #00FFCE;
  border-bottom: 1px solid #00FFCE;
}
.echart{
   width: 50%;
  height: 100%;
  position: relative;
   
}
.echart_one{
    width: 49%;
  height: 30%;
margin: 0.2rem;

   float:left;
}
.cz_table{
  width:100%;
  height: 37%;

  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cz_table_con{
 width: 89.5%;
    height: 87%;

    overflow: auto;
  border:1px dashed red;
  
}
.cz_table_con_title{
   width: 89.5%;
   height:2.3rem;
   display: flex;
   color:#00C4FF;
   font-weight: 900;
   align-items: center;
   justify-content: center;
   font-size: 19px;
}
.cz_table_one{
  width:8rem;
  height: 3rem;
        background-image: url("../static/img/cz1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    float: left;
    margin: 1rem;
    font-size: 1rem;
    color: white;
    position: relative;

}
.cz_table_one_span1{
     position: absolute;
    top: 1rem;
    font-size: 1.2rem;
    left: 2rem;
}
.cz_table_one_span2{
    position: absolute;
    top: 3rem;
    left: 3.5rem;
}
.cz_table_two_span1{
     position: absolute;
    top: -0.2rem;
    font-size: 1.2rem;
    left: 1.6rem;
}
.cz_table_two_span2{
    position: absolute;
    top: 2rem;
    left: 2.5rem;
}
.cz_table_two{
    width:6rem;
  height: 3rem;
  float: left;
      background-image: url("../static/img/cz2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  margin: 1rem;
    font-size: 1rem;
        color: white;
           position: relative;
}
</style>
