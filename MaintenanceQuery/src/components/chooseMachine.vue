<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">选择机台</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>

    <!--出库单详细-->
    <div class="all-page">
      <div class="select" > <span style="margin-left:2rem">共{{total_data_num}}台</span>
        <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>
 <span style="margin-right:2rem">{{page}}/{{pageNum}}</span>

       </div>
          <!-- <scroller height="100%" :onRefresh="refresh" :onInfinite="inf" ref="my_scroller"> -->
          <div style="height:72%;overflow:auto;">
  <el-checkbox-group v-model="checkboxGroup1">
      <el-checkbox-button v-for="(item,index) in machineList" style="magin:1rem;" :label="item" :key="index">{{item}}</el-checkbox-button>
    </el-checkbox-group>
          </div>
          <!-- </scroller> -->
           <div class="btn2"> <el-pagination
    layout="prev, pager, next" 
    :total="total_data_num" :page-size="pageSize"  background @current-change="currentChange" @prev-click="prevClick" @next-click="nextClick" >
  </el-pagination></div>
     <div class="btn"><span @click="sure">选择完毕</span></div>

    </div>

  </div>

</template>

<script>
  import axios from 'axios'
  import VueScroller from "vue-scroller"
  export default {
    name: 'chooseMachine',
    data() {
      return {
        isClickIn: true,
        menu:[],
        mac_type:[],
        macRelation: {
          machine_id: "",
          workshop_id: '',
          
        },
         staff_id: this.$route.params.staff_id,
        mac_type_id:"",
        workshop_id:"",
        maintain_type_id: "",
        selectInfo: {
          company_id: ''
        },
        page:1,
        pageSize:32,
        pageNum:null,
        flag: "",//保养类别
        operator: '', //操作人
        checkboxGroup1:[],
        machineList: [],
          isIndeterminate: true,
          checkAll: false,
          total_data_num:null,
         
      }
    },
    methods: {
      currentChange(page){
       console.log("current")
      this.page=page
        this.machineList=[]
      this.getMachineList(this.workshop_id,this.mac_type_id)
      },
      prevClick(){
     
                console.log("prev")
this.page--;


      },
       nextClick(){
         console.log("next")
this.page++;

      },
   
      getMachineList(workshop_id,mac_type_id){
            
let url="http://120.55.124.53:8211/machine/getMachineList"
    let that = this

        axios.post(url, {
          "workShopId":workshop_id,
    "machineType": mac_type_id,
    "page": that.page,
    "pageSize": that.pageSize,
"orderType":"asc",
    "groupId": ""
        }, {
          headers: {
            companyId: that.selectInfo.company_id
          }
        }).then(function (res) {

          if (res.data.data.length == 0) {
      
           return
          } else {
            that.total_data_num = res.data.totalDataNum //设置数据总条数
            that.pageNum=(Math.ceil(res.data.totalDataNum/that.pageSize))
                
                 
            for (let i = 0; i < res.data.data.length; i++) {
              if(String(res.data.data[i].machineId).indexOf("-")==-1){
   that.machineList.push( String(res.data.data[i].machineId))
              }
         

            }
          
        
         

      
           
    
    
          
          }
      
       

        })
//         console.log(this.workshop_id)
// let url="http://120.55.124.53:8211/machine/getMachineList"
//     let that = this
//         axios.post(url, {
//           "workShopId":workshop_id,
//     "machineType": mac_type_id,
//     "page": that.page,
//     "pageSize": that.pageSize,
//     "groupId": ""
//         }, {
//           headers: {
//             companyId: that.selectInfo.company_id
//           }
//         }).then(function (res) {

//           if (res.data.data.length == 0) {
//             // that.$message({
//             //   message: '没有数据！',
//             //   center: true,
//             //   duration: 2000
//             // });
//             that.$refs.my_scroller.finishInfinite(true)
//             return
//           } else {
//             that.total_data_num = res.data.totalDataNum //设置数据总条数
//                  that.$refs.my_scroller.finishPullToRefresh(true) ////下拉获取数据回调函数停止使用
                
                 
//             for (let i = 0; i < res.data.data.length; i++) {
//               if(String(res.data.data[i].machineId).indexOf("-")==-1){
//    that.machineList.push( String(res.data.data[i].machineId))
//               }
         

//             }
               
//         //  that.machineList.sort()
           
//           if(that.machineList.length==that.total_data_num){
//              that.$refs.my_scroller.finishInfinite(true) //上拉获取数据回调函数停止使用
//           }else{
//              that.$refs.my_scroller.finishInfinite(false) //上拉获取数据回调函数停止使用
//           }
      
           
    
    
          
//           }
      
       

//         })

      },
      sortList(arry){
let blnCheck = false;
      let i = arry.length,j;		
      let tmpLen;
      let k;
      let tempExchangVal;
			while(i>0){	
					for(j=0;j<i-1;j++){
						tmpLen = Math.min(arry[j].length,arry[j+1].length);
						//当j+1为空时，交换（即将其排在最前），反之正常排序
						if(tmpLen===0&&arry[j+1].length === 0){							
								blnCheck = true;								
						}else{
							for(k=0;k<tmpLen;k++){
								//若arry[j][K]不为数字，j+1为数字   直接跳出，不需要交换
								if((arry[j][k].charCodeAt()<48||arry[j][k].charCodeAt()>57)
									&&(48<=arry[j+1][k].charCodeAt()&&arry[j+1][k].charCodeAt()<=57)){							
											break;
								}
								//若arry[j][K]为数字，j+1不为数字 交换顺序
								/*若arry[j][K]为数字，j+1为数字
								 *或arry[j][K]不为数字，i+1不为数字
								 * j>j+1 交换并跳出  j<j+1不交换并跳出
								 */ 
								if((48<=arry[j][k].charCodeAt()&&arry[j][k].charCodeAt()<=57)
								    &&(arry[j+1][k].charCodeAt()<47||arry[j+1][k].charCodeAt()>57)){
									blnCheck = true;                     	
									break;
								}else if(
									((48<=arry[j][k].charCodeAt()&&arry[j][k].charCodeAt()<=57)
										&&(48<=arry[j+1][k].charCodeAt()&&arry[j+1][k].charCodeAt()<=57))
									||((arry[j][k].charCodeAt()<48||arry[j][k].charCodeAt()>57)
										&&(arry[j+1][k].charCodeAt()<48||arry[j+1][k].charCodeAt()>57))){
									 if(arry[j][k]<arry[j+1][k]){ 
										break;
									 }
									 if(arry[j][k]>arry[j+1][k]){
										blnCheck = true;
										break;							 
									 }else  if((k==tmpLen-1&&arry[j][k]==arry[j+1][k])&&(arry[j].length>tmpLen)){
										blnCheck = true;
										break;
									 }		 
								} 								
							}
						}																		
						if (blnCheck) {
							tempExchangVal = arry[j];
							arry[j] = arry[j + 1];
							arry[j + 1] = tempExchangVal;
						}
						blnCheck = false;
					}					
					i--;
        }
        return arry
      },
    
      // handleCheckAllChange(val){
      //    this.checkboxGroup1 = val ? this.machineList : [];
      //   this.isIndeterminate = false;
      // },
      back() {
        // nativeMethod.closeActivity();
        this.$router.push({ //跳转并传参数
          path: '/Maintenance_list',
          name: 'Maintenance_list',
          params: {
            company_id: this.selectInfo.company_id,
            operator: this.operator,
             staff_id: this.staff_id
          }
        })
      },
      sure() { //确认按钮
      //console.log(this.checkboxGroup1)
if(this.checkboxGroup1.length<1){
        this.$message({
              message: '请选择至少一台设备！',
              center: true,
              duration: 1000
            });
}else{
       this.$router.push({ //跳转并传参数
          path: '/Maintenance',
          name: 'Maintenance',
          params: {
            company_id: this.selectInfo.company_id,
             machine_id_list: this.checkboxGroup1,
            operator: this.operator,
            workshop_id: this.macRelation.workshop_id,
            flag: this.flag,
        staff_id: this.staff_id,
            maintain_type_id: this.maintain_type_id,
            isClickIn: true,
                mac_type_id:this.mac_type_id,
     
          }
        })
}
 
      }
    },
    mounted() {
console.log(this.$route.params)
this.mac_type_id= this.$route.params.mac_type_id
this.workshop_id= this.$route.params.workshop_id

            this.mac_type= this.$route.params.mac_type
            this.menu= this.$route.params.menu
      this.operator = this.$route.params.operator
      this.macRelation.workshop_id = this.$route.params.workshop_id;
      this.selectInfo.company_id = this.$route.params.company_id;
      this.flag = this.$route.params.flag
    
      this.maintain_type_id = this.$route.params.maintain_type_id
      this.isClickIn = this.$route.params.isClickIn

      if(this.$route.params.machine_id_list){
      this.checkboxGroup1=this.$route.params.machine_id_list
      }
  this.getMachineList(this.workshop_id,this.mac_type_id)
      history.pushState(null, null, window.location.href); //禁止手势返回
      window.addEventListener('popstate', function () {
        history.pushState(null, null, window.location.href);
      });
    }
  }

</script>

<style scoped>
 .all-page /deep/ ._v-container {
    position: absolute;
    top: 10%;


  }
  .select {
    width: 100%;
    height: 7%;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;


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
.el-checkbox-button, .el-checkbox-button__inner{
  margin: 0.5rem;
}
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
  .btn{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
    .btn2{
    position: fixed;
    bottom: 3rem;
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

    .btn2 span{
    width: 100%;
    height: 3rem;
    background: #f5f5f5;
       display: flex;
    justify-content: center;
    align-items: center;
    
   
  }
  .btn span{
    width: 100%;
    height: 3rem;
       display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(49, 153, 102);
    color: white;
  }

</style>
