<template>
    <div style="width: 800px;height: 500px;margin-left: 5px">
      <div style="display: inline-block;height: 50px;line-height: 50px;margin-bottom: 5px">
        <p style="display: inline-block;font-size: 25px"  v-if="isJs">输入第几缸和第几轴:</p>
        <el-input ref="cylindersNumber" style="width: 200px;display: inline-block;font-size: 25px" @focus="focusInput ='cylindersNumber'" v-model="cylindersNumber"  v-if="isJs"></el-input>
        <p style="display:inline-block;font-size: 25px" v-if="isJs">-</p>
        <el-input ref="axisNumber" style="width: 200px;display: inline-block;font-size: 25px" @focus="focusInput ='axisNumber'" v-model="axisNumber"  v-if="isJs"></el-input>
        <p style="display: inline-block;font-size: 25px">输入需要绑定的经轴号:</p>
        <el-input ref="axleNumber" style="width: 500px;display: inline-block;font-size: 25px" @focus="focusInput ='axleNumber'" v-model="axleNumber"></el-input>
      </div><br><br>
      <table width="800px"  cellspacing='0' cellpadding='0' height="300px">
        <tr v-for="indexTr in 3" >
          <td  v-for="indexTd in 5" style="text-align: center; margin-right:-5px">
            <el-button type="primary" plain style="width:120px; height:120px;margin-bottom:5px" size="medium"  @click="selectTableButton(buttonList[(indexTr-1)*5+indexTd-1])">
              <p  style="font-weight: bolder;font-size: 60px;width: 100%">{{buttonList[(indexTr-1)*5+indexTd-1]}}</p>
            </el-button>
          </td>
          <td v-if="indexTr===1">
            <el-button type="primary" style="width:120px; height:120px;font-size: 30px;margin-bottom: 5px;font-weight: bolder" @click="submitData('finish')">提交</el-button>
          </td>
          <td v-if="indexTr===2">
            <el-button type="danger" style="width:120px;height:120px;font-size: 30px;margin-bottom: 5px;font-weight: bolder;" @click="returnMain(1,null,null)" >取消</el-button>
          </td>
          <td v-if="indexTr===3">
            <el-button type="info" style="width:120px;height:120px;font-size: 30px;margin-bottom: 5px;" @click="selectTableButton('退格')">退格</el-button>
          </td>
        </tr>
      </table>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          buttonList:"123JX456AH7890B",
          focusInput:null,
          axleNumber:"",
          cylindersNumber:'',
          axisNumber:"",
          companyId:null,
          isJs:false
        }
      },
      methods:{
        getIfIsJs(isJs){
          this.isJs = isJs;
        },
        getButtonList(buttonList){
          this.buttonList = buttonList;
        },
        returnMain(step,status,data1,data2,data3){
          let emitData = {};
          emitData.step = step;
          emitData.status = status;
          emitData.axleNumber = data1;
          emitData.cylindersNumber = data2;
          emitData.axisNumber = data3;
          this.$emit('closeSetAxleTable',emitData);
          this.axleNumber = "";
          this.cylindersNumber = "";
          this.axisNumber = "";
        },
        submitData(status){
          this.$store.state.showLoadingLog = true;
          if(this.isJs){
            this.returnMain(1,status,this.axleNumber,this.cylindersNumber,this.axisNumber);
          }else{
            this.returnMain(1,status,this.axleNumber)
          }
        },
        selectTableButton(buttonName){
         if(buttonName === "退格"){
           switch (this.focusInput) {
             case "axleNumber":
               this.axleNumber = this.axleNumber.substring(0,this.axleNumber.length-1);
               break;
             case "cylindersNumber":
               this.cylindersNumber = this.cylindersNumber.substring(0,this.cylindersNumber.length-1);
               break;
             case "axisNumber":
               this.axisNumber = this.axisNumber.substring(0,this.axisNumber.length-1);
               break;
           }
          }else{
           switch (this.focusInput) {
             case "axleNumber":
               this.axleNumber += buttonName;
               break;
             case "cylindersNumber":
               this.cylindersNumber += buttonName;
               break;
             case "axisNumber":
               this.axisNumber += buttonName;
               break;
           }
          }
          //对焦
          switch (this.focusInput) {
            case "axleNumber":
              this.$refs.axleNumber.focus();
              break;
            case "cylindersNumber":
              this.$refs.cylindersNumber.focus();
              break;
            case "axisNumber":
              this.$refs.axisNumber.focus();
              break;
          }
        },
      },
      mounted() {
        this.companyId = this.$route.params.params.split(",")[1];
      },
      destroyed() {

      }
    }
</script>

<style lang="less">

</style>
