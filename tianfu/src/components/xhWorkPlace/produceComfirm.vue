<template>
    <div style="width: 760px;height: 340px;background-color: #dcdcdc;">
      <el-dialog
        :visible.sync="showNumberTable"
        width="1200px"
        append-to-body
        :close-on-click-modal="false"
      >
        <p style="display: inline-block;font-size: 32px">当前米长:</p><el-input v-model="lengthFinished" ref="lengthFinished" @focus="changeLength" style="font-size: 32px;width: 400px;" class="standard_input" ></el-input>
        <br> <br>
        <table width="620px"  cellspacing='0' cellpadding='0' height="400px" style="display: inline-block">
          <tr v-for="indexTr in 2" >
            <td  v-for="indexTd in 5" style="text-align: center;">
              <el-button type="primary" plain style="width: 180px;height: 180px;margin-right:5px;margin-bottom: 5px" size="medium"  @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
                <p  style="font-weight: bolder;font-size: 80px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
              </el-button>
            </td>
            <td v-if="indexTr===1">
              <el-button type="primary" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px;font-weight: bolder" @click="showNumberTable = false">确定</el-button>
            </td>
            <td v-if="indexTr===2">
              <el-button type="info" style="width:180px;height:180px;font-size: 65px;margin-bottom: 5px" @click="selectTableButton('退格')">退格</el-button>
            </td>
          </tr>
        </table>
      </el-dialog>
      <div id="details" style="display: inline-block">
        <p>要求米长：{{lengthSupposed}}米</p>
        <div style="line-height: 60px;height: 60px"><p style="display: inline-block">当前米长：</p>
          <el-input v-model="lengthFinished"  @focus="changeLength" style="font-size: 30px;width: 150px" class="standard_input"></el-input><p  style="display: inline-block">米</p></div>
        <p>生产人员：{{$store.state.staff_name}}</p>
        <br>
        <p>选择生产完成,或中途停止</p>
      </div>
      <br>
      <el-button  style="height: 80px;display: inline-block;position: absolute;right:200px;top:360px"  type="success" @click="submitData('finish')">
        <div  style="display: inline-block;height: 50px;line-height: 25px">
          <p style="font-size: 25px">生产完成</p>
          <p style="font-size: 25px">并打印</p>
        </div>
      </el-button>
      <el-button  style="height: 80px;display: inline-block;position: absolute;left:200px;top:360px"  type="warning" @click="submitData('shift')">
        <div  style="display: inline-block;height: 50px;line-height: 50px">
          <p style="font-size: 25px">交  换  班</p>
        </div>
      </el-button>
        <!--<el-button  style="height: 80px;display: inline-block;position: absolute;right:200px;top:360px" type="warning" @click="submitData('shift')">-->
          <!--<div  style="display: inline-block;height: 50px;line-height: 50px">-->
            <!--<p  style="font-size: 25px">生产中止</p>-->
          <!--</div>-->
        <!--</el-button>-->
    </div>
</template>

<script>
    export default {
      data () {
        return {
          buttonList:"1234567890",
          lengthSupposed:2000,
          lengthFinished:"",
          staffName:null,
          ifShift:false,
          showNumberTable:false
        }
      },
      methods:{
        getData(dataSelect,order_detail_list){
         // console.log(dataSelect);
          this.lengthSupposed = dataSelect.workQty;
          this.lengthFinished = dataSelect.actualYarnLength;
          // console.log(order_detail_list);
          this.staffName = this.$store.state.staff_name;
        },
        submitData(status){
         // console.log(this.$store.state.ifShift);
          if(this.$store.state.ifShift){
            if(status === "shift"){
              this.returnMain(1,0,this.lengthFinished);
              this.lengthFinished = "";
            }else{
              this.$confirm('织轴绑定人员和报产人员不一致，是否继续报产', '提示', {
                confirmButtonText: '继续',
                cancelButtonText: '返回',
                type: 'warning',
                center: true,
                customClass: 'message-logout'
              }).then(() => {
                this.returnMain(2,1,this.lengthFinished);
                this.lengthFinished = "";
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消报产'
                });
              });
            }
          }else{
            if(status === "finish"){
              this.$store.state.showLoadingLog = true;
              //let regPos = /^\d+(\.\d+)?$/; //非负浮点数
              this.returnMain(2,1,this.lengthFinished);
              this.lengthFinished = "";
            }else{
              this.$store.state.showLoadingLog = true;
              this.returnMain(1,0,this.lengthFinished);
              this.lengthFinished = "";
            }
          }
        },
        returnMain(step,status,data){
          let emitData = {};
          emitData.step = step;
          emitData.status = status;
          emitData.data = data;
          this.$emit('closeSubmitTable',emitData)
        },
        changeLength(){
          this.showNumberTable = true;
        },
        selectTableButton(buttonName){
          this.lengthFinished+="";
          if(buttonName === "退格"){
            this.lengthFinished = this.lengthFinished.substring(0,this.lengthFinished.length-1)
          }else{
            if(this.lengthFinished === "0"){
              this.lengthFinished = "";
            }
            this.lengthFinished += buttonName;
          }
          //对焦
          this.$refs.lengthFinished.focus();
        },
      },
      mounted() {

      },
      destroyed() {

      }
    }
</script>

<style lang="less">
   #details{
     margin-left: 60px;
     padding-top: 10px;
   }
   #details p{
     font-size: 30px;
   }
</style>
