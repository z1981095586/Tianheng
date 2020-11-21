<template>
    <div style="background-color:rgba(240,240,240,0.9);min-width: 724px" class="standard_border">
      <table width="100%"  cellspacing='0' cellpadding='0' height="120px" class="standard_border">
        <tr>
          <td style="width: 70%;height: 120px">
            <el-form :model="outputSubmitForm" ref="outputSubmitForm" label-width="150px" style="margin-top: 20px" :hide-required-asterisk="true">
              <el-form-item
                prop="staff_id"
                style="display: inline-block"
                :rules="[{ required: true, message: '员工号不能为空'}]"
              >
                <template slot="label">
                  <div class="blueInputTitle" style="font-size: 30px;width: 120px" >员工号</div>
                </template>
                <el-input ref="staff_id" class="standard_input" @focus="focusInput ='staff_id'" style="font-size: 20px" size="medium" v-model.number="outputSubmitForm.staff_id"></el-input>
              </el-form-item>
              <el-form-item
                prop="finished_meter"
                style="display: inline-block"
                :rules="[{ required: true, message: '当前米数不能为空'}]"
              >
                <template slot="label">
                  <div class="blueInputTitle" style="font-size: 30px;width: 120px" >当前米数</div>
                </template>
                <el-input ref="finished_meter" class="standard_input" @focus="focusInput ='finished_meter'" style="font-size: 20px" size="medium" v-model.number="outputSubmitForm.finished_meter"></el-input>
              </el-form-item>
            </el-form>
          </td>
          <td class="standard_border">
             <div style="text-align: center;width: 100%">
               <table width="100%"  cellspacing='0' cellpadding='0' height="120px">
                 <tr style="height: 40px">
                   <td><el-button type="info" plain style="width: 60%;font-size: 24px" @click="submitData('shift')">交换班</el-button></td>
                 </tr>
                 <tr style="height: 40px">
                   <td><el-button type="info" plain style="width: 60%;font-size: 24px" @click="submitData('finish')">完成</el-button></td>
                 </tr>
                 <tr style="height: 40px">
                   <td><el-button type="info" plain style="width: 60%;font-size: 24px" @click="returnMain(1,null,null)">取消</el-button></td>
                 </tr>
               </table>
             </div>
          </td>
        </tr>
      </table>
      <table width="100%"  cellspacing='0' cellpadding='0' height="300px">
           <tr v-for="indexTr in 7" >
             <td  v-for="indexTd in 6" style="text-align: center;">
                 <el-button type="primary" plain style="width: 120px" size="medium"  @click="selectTableButton((indexTr-1)*6+indexTd-1)">
                   <p :style="{'color':buttonList[(indexTr-1)*6+indexTd-1].color}" style="font-weight: bolder;font-size: 28px;width: 100%">{{buttonList[(indexTr-1)*6+indexTd-1].label}}</p>
                 </el-button>
             </td>
           </tr>
      </table>
    </div>
</template>

<script>

    export default {
      data () {
        return {
          companyId:10000015,
          buttonList:[
            {
              label:"A",
              color:"#000000",
            }, {
              label:"B",
              color:"#000000",
            }, {
              label:"C",
              color:"#000000",
            },{
              label:"D",
              color:"#000000",
            },{
              label:"E",
              color:"#000000",
            },{
              label:"F",
              color:"#000000",
            },{
              label:"G",
              color:"#000000",
            },{
              label:"H",
              color:"#000000",
            },{
              label:"I",
              color:"#000000",
            },{
              label:"J",
              color:"#000000",
            },{
              label:"K",
              color:"#000000",
            },{
              label:"L",
              color:"#000000",
            },{
              label:"M",
              color:"#000000",
            },{
              label:"N",
              color:"#000000",
            },{
              label:"O",
              color:"#000000",
            },{
              label:"P",
              color:"#000000",
            },{
              label:"Q",
              color:"#000000",
            },{
              label:"R",
              color:"#000000",
            },{
              label:"S",
              color:"#000000",
            },{
              label:"T",
              color:"#000000",
            },{
              label:"U",
              color:"#000000",
            },{
              label:"1",
              color:"red",
            },{
              label:"2",
              color:"red",
            },{
              label:"3",
              color:"red",
            },{
              label:"V",
              color:"#000000",
            },{
              label:"W",
              color:"#000000",
            },{
              label:"X",
              color:"#000000",
            },{
              label:"4",
              color:"red",
            },{
              label:"5",
              color:"red",
            },{
              label:"6",
              color:"red",
            },{
              label:"Y",
              color:"#000000",
            },{
              label:"Z",
              color:"#000000",
            },{
              label:".",
              color:"#000000",
            },{
              label:"7",
              color:"red",
            },{
              label:"8",
              color:"red",
            },{
              label:"9",
              color:"red",
            },{
              label:"#",
              color:"#000000",
            },{
              label:"_",
              color:"#000000",
            },{
              label:"-",
              color:"#000000",
            },{
              label:"小写",
              color:"#000000",
            },{
              label:"0",
              color:"red",
            },{
              label:"退格",
              color:"#000000",
            }
          ],
          buttonListB:[
            {
              label:"A",
              color:"#000000",
            }, {
              label:"B",
              color:"#000000",
            }, {
              label:"C",
              color:"#000000",
            },{
              label:"D",
              color:"#000000",
            },{
              label:"E",
              color:"#000000",
            },{
              label:"F",
              color:"#000000",
            },{
              label:"G",
              color:"#000000",
            },{
              label:"H",
              color:"#000000",
            },{
              label:"I",
              color:"#000000",
            },{
              label:"J",
              color:"#000000",
            },{
              label:"K",
              color:"#000000",
            },{
              label:"L",
              color:"#000000",
            },{
              label:"M",
              color:"#000000",
            },{
              label:"N",
              color:"#000000",
            },{
              label:"O",
              color:"#000000",
            },{
              label:"P",
              color:"#000000",
            },{
              label:"Q",
              color:"#000000",
            },{
              label:"R",
              color:"#000000",
            },{
              label:"S",
              color:"#000000",
            },{
              label:"T",
              color:"#000000",
            },{
              label:"U",
              color:"#000000",
            },{
              label:"1",
              color:"red",
            },{
              label:"2",
              color:"red",
            },{
              label:"3",
              color:"red",
            },{
              label:"V",
              color:"#000000",
            },{
              label:"W",
              color:"#000000",
            },{
              label:"X",
              color:"#000000",
            },{
              label:"4",
              color:"red",
            },{
              label:"5",
              color:"red",
            },{
              label:"6",
              color:"red",
            },{
              label:"Y",
              color:"#000000",
            },{
              label:"Z",
              color:"#000000",
            },{
              label:".",
              color:"#000000",
            },{
              label:"7",
              color:"red",
            },{
              label:"8",
              color:"red",
            },{
              label:"9",
              color:"red",
            },{
              label:"#",
              color:"#000000",
            },{
              label:"_",
              color:"#000000",
            },{
              label:"-",
              color:"#000000",
            },{
              label:"小写",
              color:"#000000",
            },{
              label:"0",
              color:"red",
            },{
              label:"退格",
              color:"#000000",
            }
          ],
          buttonListS:[
            {
              label:"a",
              color:"#000000",
            }, {
              label:"b",
              color:"#000000",
            }, {
              label:"c",
              color:"#000000",
            },{
              label:"d",
              color:"#000000",
            },{
              label:"e",
              color:"#000000",
            },{
              label:"f",
              color:"#000000",
            },{
              label:"g",
              color:"#000000",
            },{
              label:"h",
              color:"#000000",
            },{
              label:"i",
              color:"#000000",
            },{
              label:"j",
              color:"#000000",
            },{
              label:"k",
              color:"#000000",
            },{
              label:"l",
              color:"#000000",
            },{
              label:"m",
              color:"#000000",
            },{
              label:"n",
              color:"#000000",
            },{
              label:"o",
              color:"#000000",
            },{
              label:"p",
              color:"#000000",
            },{
              label:"q",
              color:"#000000",
            },{
              label:"r",
              color:"#000000",
            },{
              label:"s",
              color:"#000000",
            },{
              label:"t",
              color:"#000000",
            },{
              label:"u",
              color:"#000000",
            },{
              label:"1",
              color:"red",
            },{
              label:"2",
              color:"red",
            },{
              label:"3",
              color:"red",
            },{
              label:"v",
              color:"#000000",
            },{
              label:"w",
              color:"#000000",
            },{
              label:"x",
              color:"#000000",
            },{
              label:"4",
              color:"red",
            },{
              label:"5",
              color:"red",
            },{
              label:"6",
              color:"red",
            },{
              label:"y",
              color:"#000000",
            },{
              label:"z",
              color:"#000000",
            },{
              label:".",
              color:"#000000",
            },{
              label:"7",
              color:"red",
            },{
              label:"8",
              color:"red",
            },{
              label:"9",
              color:"red",
            },{
              label:"#",
              color:"#000000",
            },{
              label:"_",
              color:"#000000",
            },{
              label:"-",
              color:"#000000",
            },{
              label:"大写",
              color:"#000000",
            },{
              label:"0",
              color:"red",
            },{
              label:"退格",
              color:"#000000",
            }
          ],
          focusInput:null,
          outputSubmitForm:{
            staff_id:"",
            finished_meter:"",
          }
        }
      },
      methods:{
        selectTableButton(index){
         let buttonName =   this.buttonList[index].label;
         if(buttonName === "小写"){
           this.buttonList=this.buttonListS;
         }else if(buttonName === "大写"){
           this.buttonList=this.buttonListB;
         }else if(buttonName === "退格"){
           if(this.focusInput === "staff_id"){
             this.outputSubmitForm.staff_id = this.outputSubmitForm.staff_id.substring(0,this.outputSubmitForm.staff_id.length-1)
           }else if(this.focusInput === "finished_meter"){
             this.outputSubmitForm.finished_meter = this.outputSubmitForm.finished_meter.substring(0,this.outputSubmitForm.finished_meter.length-1)
           }
         }else{
           if(this.focusInput === "staff_id"){
             this.outputSubmitForm.staff_id += buttonName;
           }else if(this.focusInput === "finished_meter"){
             this.outputSubmitForm.finished_meter += buttonName;
           }
         }
         //对焦
         if(this.focusInput === "staff_id"){
           this.$refs.staff_id.focus()
         }else if(this.focusInput === "finished_meter"){
           this.$refs.finished_meter.focus()
         }
        },
        returnMain(step,status,data){
          let emitData = {};
          emitData.step = step;
          emitData.status = status;
          emitData.data = data;
          this.$emit('closeSubmitTable',emitData)
        },
        submitData(status){
          let regPos = /^\d+(\.\d+)?$/; //非负浮点数
          if(regPos.test(this.outputSubmitForm.finished_meter)){
            if(status === "finish"){
              this.returnMain(2,1,this.outputSubmitForm);
              this.outputSubmitForm.staff_id = "";
              this.outputSubmitForm.finished_meter = "";
            } else{
              this.returnMain(1,0,this.outputSubmitForm);
              this.outputSubmitForm.staff_id = "";
              this.outputSubmitForm.finished_meter = "";
            }
          }else{
            this.outputSubmitForm.finished_meter="";
            this.$message.error('请输入正确的当前米数');
          }
        }
      },
      mounted() {

      },
      destroyed() {

      }
    }
</script>

<style lang="less">

</style>
