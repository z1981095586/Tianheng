<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="content4">
    <div class="hide_btn" ></div>
    <header>
      <div class="title"></div>
      <h1 class="tip">
        <a style="margin-left: 23%;cursor: pointer" @click="dialogFormVisible2=true">电力空压</a>
                <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible2">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="toSubstation('变电所图')">变电所图
          </el-button>
              <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
               @click="toSubstation('电力空压')" >电力空压
          </el-button>
        </el-dialog>
        <el-dialog id="dialog" center width="22%" :modal="false" :visible.sync="dialogFormVisible">
          <el-button
            style="height: 4rem;width: 100%;margin: 0;font-weight: bolder;font-size: 1.8rem;border-radius: 10px;background-color: #61abeb;color: white;"
            @click="choseFactory(item.name)" v-for="item in dayList"  :key="item.name">{{item.name}}
          </el-button>
        </el-dialog>
        <span @click="showbox()" style="float: right;margin-right: 19.5%">{{date | formatDate}} </span>
      </h1>
    </header>
    <div class="main_content " v-show="showboxes">

      <div class="boxes" >
        <div class="left_box">
       <div class="machine_img">
         <div style="width:100%;display:flex;justify-content: flex-start;height:40px;">
            <div class="workshop" @click="show2(item.id);" v-for="(item,index) in workshoplist" :key="'work'+index" :style="item.style">{{item.name}}</div>
        
         </div>
           <div class="lengganji box">
              <div class="lengganji_con" v-for="(item,index) in lgjList" :key="'lgj'+index" >
                    <div class="lengganji_con_tem">
                   <div style="display:flex;align-items:center;width:50%;justify-content: flex-end;"><div class="tem"></div><span>露点温度</span></div>
                   <span style="width:50%">{{item.dew_point_temperature}}℃</span>
              </div>
                 <div class="lengganji_con_mac">
                   <div style="display:flex;align-items:center;width:50%;justify-content: flex-end;"><div class="mac"></div><span>冷干机设备</span></div>
                   <span style="width:50%;">{{item.machine_id}}</span>
                
              </div>
           
              </div>
          
          
            
         </div>
         </div> 
            
        
       
          <div class="label" @click="show('e',true);" :style="style1">电流图</div>
          <div class="label2" @click="show('g',false); " :style="style2">排气压力图</div>
          <div class="label3"><a style="margin-left: 23%;cursor: pointer" @click="dialogFormVisible = true" id="xinhai"
              v-for="item in dayList" v-if="item.name==currentDay">{{item.name}}</a></div>
          <div class="e-chart-card box" id="echart1">

          </div>

          <div class="card">
            <div class="card_title">当日超标记录</div>
            <div class="card_content">
              <div class="card_content_one" v-for="(item,index) in WarningMessagesList" :key="index">
                <div class="card_content_one_con">{{item.createTime}}</div><div class="card_content_one_con">{{item.machineId}}</div><div class="card_content_one_con">
                  {{item.columnName}}</div><div class="card_content_one_con"> {{item.columnValue}}</div>
              </div>

            </div>
          </div>
        </div>
        <div class="right_box">
          <div style="display:flex">
          <div style="display: flex;width:25%;flex-direction: column;margin-right:1.25rem">
                 <div class="card_three"  v-for="(item,index) in jem" :key="'fun150'+index" @click="chart(item.machine_id)">
            <div class="cards_title">{{item.name}}</div>
                <div class="cards_workshop">{{item.workshop}}</div>
       <div class="cards_content" v-show="item.tname==='samsung'">
              <div class="cards_content_con">系统压力：{{item.system_pressure}}barG</div>
              <div class="cards_content_con">排放压力：{{item.stage_2_discharge_pressure}}barG</div>
              <div class="cards_content_con">油压：{{item.oil_supply_pressure}}barG</div>
              <div class="cards_content_con">电机电流：{{item.motor_current}}A</div>
                    <div class="cards_content_con">卸载阀：{{item.igv_position_open}}%</div>
                          <div class="cards_content_con">进气阀：{{item.bov_position_closed}}%</div>
        
              <div class="cards_content_con">一级震动：{{item.stage_1_vibration}}um</div>
              <div class="cards_content_con">二级震动：{{item.  stage_2_vibration}}um</div>
              <div class="cards_content_con">供油温度：{{item.oil_supply_temperature}}℃</div>
              <div class="cards_content_con">二级进气温度：{{item.stage_2_inlet_temperature}}℃</div>
              <div class="cards_content_con">电机绕组R温度：{{item.motor_winding_r_teperature}}℃</div>
              <div class="cards_content_con">电机轴承DE温度：{{item.motor_bearing_de_temperature}}℃</div>
              <div class="cards_content_con">电机轴承NDE温度：{{item.motor_bearing_nde_temperature}}℃</div>
              </div>
       <div class="cards_content"  v-show="item.tname==='fun150'">
              <div class="cards_content_con">系统压力 {{item.system_pressure}}K/C2</div>
              <div class="cards_content_con">排气压力 {{item.discharge_pressure}}K/C2</div>
              <div class="cards_content_con">油压 {{item.oil_pressure}}K/C2</div>
              <div class="cards_content_con">电机电流 {{item.motor_amps}}A</div>
              <div class="cards_content_con">卸载阀 {{item.unloading_valve}}%</div>
              <div class="cards_content_con"> 进气阀 {{item.inlet_valve}}%</div>
              <div class="cards_content_con">低速齿轮震动 {{item. low_speed_vibration}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item. high_speed_vibration}}um</div>
              <div class="cards_content_con">进油温度 {{item. inlet_oil_temperature}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.final_interstage_air_temperature}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.motor_stator_temperature}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.inboard_motor_bearing_temperature}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.outboard_motor_bearing_temperature}}℃</div>

            </div>
     <div class="cards_content" v-show="item.tname==='fun200'">
              <div class="cards_content_con">系统压力 {{item.SPT}}kg/cm2</div>
              <div class="cards_content_con">出口压力 {{item.DPT}}kg/cm2</div>
              <div class="cards_content_con">油压 {{item.OPT}}kg/cm2</div>
              <div class="cards_content_con">电机电流 {{item.MAT}}A</div>
                     <div class="cards_content_con">卸载阀{{item.unloading_valve_position}}%</div>
               <div class="cards_content_con">进气阀{{item.valve_position}%</div>
              <div class="cards_content_con">低速齿轮震动 {{item.LVT}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item.HVT}}um</div>
              <div class="cards_content_con">进油温度 {{item. IOT}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.IAT}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.SMt1}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.IMT}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.OMT}}℃</div>

            </div>
               <div class="cards_content" v-show="item.tname==='luogan'">
              <div class="cards_content_con">排气压力 {{item. discharge_pressure}}KC2</div>
              <div class="cards_content_con">排气温度 {{item.  discharge_temperature}}℃</div>
              <div class="cards_content_con">运行时间 {{item.runtime}}H</div>
              <div class="cards_content_con">加载时间 {{item.loading_time}}H</div>
              <div class="cards_content_con">电机电流{{item.motor_amps}}A </div>
              <div class="cards_content_con">油气桶压力 {{item.  oil_gas_barrel_pressure}}Mpa</div>
              <div class="cards_content_con">油气桶温度 {{item.  oil_gas_barrel_temperature}}℃</div>

            </div>
          </div>
          </div>
              <div style="display: flex;width:25%;flex-direction: column;margin-right:1.25rem">
                 <div class="card_two"  v-for="(item,index) in lm" @click="chart(item.machine_id)">
            <div class="cards_title">{{item.name}}</div>
                <div class="cards_workshop">{{item.workshop}}</div>
       <div class="cards_content" v-show="item.tname==='samsung'">
              <div class="cards_content_con">系统压力：{{item.system_pressure}}barG</div>
              <div class="cards_content_con">排放压力：{{item.stage_2_discharge_pressure}}barG</div>
              <div class="cards_content_con">油压：{{item.oil_supply_pressure}}barG</div>
              <div class="cards_content_con">电机电流：{{item.motor_current}}A</div>
                    <div class="cards_content_con">卸载阀：{{item.igv_position_open}}%</div>
                          <div class="cards_content_con">进气阀：{{item.bov_position_closed}}%</div>
              <div class="cards_content_con">一级震动：{{item.stage_1_vibration}}um</div>
              <div class="cards_content_con">二级震动：{{item.  stage_2_vibration}}um</div>
              <div class="cards_content_con">供油温度：{{item.oil_supply_temperature}}℃</div>
              <div class="cards_content_con">二级进气温度：{{item.stage_2_inlet_temperature}}℃</div>
              <div class="cards_content_con">电机绕组R温度：{{item.motor_winding_r_teperature}}℃</div>
              <div class="cards_content_con">电机轴承DE温度：{{item.motor_bearing_de_temperature}}℃</div>
              <div class="cards_content_con">电机轴承NDE温度：{{item.motor_bearing_nde_temperature}}℃</div>
              </div>
       <div class="cards_content"  v-show="item.tname==='fun150'">
              <div class="cards_content_con">系统压力 {{item.system_pressure}}K/C2</div>
              <div class="cards_content_con">排气压力 {{item.discharge_pressure}}K/C2</div>
              <div class="cards_content_con">油压 {{item.oil_pressure}}K/C2</div>
              <div class="cards_content_con">电机电流 {{item.motor_amps}}A</div>
                  <div class="cards_content_con">卸载阀 {{item.unloading_valve}}%</div>
              <div class="cards_content_con"> 进气阀 {{item.inlet_valve}}%</div>
              <div class="cards_content_con">低速齿轮震动 {{item. low_speed_vibration}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item. high_speed_vibration}}um</div>
              <div class="cards_content_con">进油温度 {{item. inlet_oil_temperature}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.final_interstage_air_temperature}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.motor_stator_temperature}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.inboard_motor_bearing_temperature}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.outboard_motor_bearing_temperature}}℃</div>

            </div>
     <div class="cards_content" v-show="item.tname==='fun200'">
              <div class="cards_content_con">系统压力 {{item.SPT}}kg/cm2</div>
              <div class="cards_content_con">出口压力 {{item.DPT}}kg/cm2</div>
              <div class="cards_content_con">油压 {{item.OPT}}kg/cm2</div>
              <div class="cards_content_con">电机电流 {{item.MAT}}A</div>
                   
            <div class="cards_content_con">卸载阀 {{item.unloading_valve_position}}%</div>
                 <div class="cards_content_con">进气阀 {{item.valve_position}}%</div>
            
              <div class="cards_content_con">低速齿轮震动 {{item.LVT}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item.HVT}}um</div>
              <div class="cards_content_con">进油温度 {{item. IOT}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.IAT}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.SMt1}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.IMT}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.OMT}}℃</div>

            </div>
               <div class="cards_content" v-show="item.tname==='luogan'">
              <div class="cards_content_con">排气压力 {{item. discharge_pressure}}Mpa</div>
              <div class="cards_content_con">排气温度 {{item.  discharge_temperature}}℃</div>
              <div class="cards_content_con">运行时间 {{item.runtime}}H</div>
              <div class="cards_content_con">加载时间 {{item.loading_time}}H</div>
              <div class="cards_content_con">电机电流{{item.motor_amps}}A </div>
              <div class="cards_content_con">油气桶压力 {{item.  oil_gas_barrel_pressure}}Mpa</div>
              <div class="cards_content_con">油气桶温度 {{item.  oil_gas_barrel_temperature}}℃</div>

            </div>
          </div>
          </div>
              <div style="display: flex;width:25%;flex-direction: column;margin-right:1.25rem">
                 <div class="card_one"  v-for="(item,index) in wzzz_one" @click="chart(item.machine_id)" >
            <div class="cards_title">{{item.name}}</div>
                <div class="cards_workshop">{{item.workshop}}</div>
       <div class="cards_content" v-show="item.tname==='samsung'">
              <div class="cards_content_con">系统压力：{{item.system_pressure}}barG</div>
              <div class="cards_content_con">排放压力：{{item.stage_2_discharge_pressure}}barG</div>
              <div class="cards_content_con">油压：{{item.oil_supply_pressure}}barG</div>
              <div class="cards_content_con">电机电流：{{item.motor_current}}A</div>
                    <div class="cards_content_con">卸载阀：{{item.igv_position_open}}%</div>
                          <div class="cards_content_con">进气阀：{{item.bov_position_closed}}%</div>
              <div class="cards_content_con">一级震动：{{item.stage_1_vibration}}um</div>
              <div class="cards_content_con">二级震动：{{item.  stage_2_vibration}}um</div>
              <div class="cards_content_con">供油温度：{{item.oil_supply_temperature}}℃</div>
              <div class="cards_content_con">二级进气温度：{{item.stage_2_inlet_temperature}}℃</div>
              <div class="cards_content_con">电机绕组R温度：{{item.motor_winding_r_teperature}}℃</div>
              <div class="cards_content_con">电机轴承DE温度：{{item.motor_bearing_de_temperature}}℃</div>
              <div class="cards_content_con">电机轴承NDE温度：{{item.motor_bearing_nde_temperature}}℃</div>
              </div>
       <div class="cards_content"  v-show="item.tname==='fun150'">
              <div class="cards_content_con">系统压力 {{item.system_pressure}}K/C2</div>
              <div class="cards_content_con">排气压力 {{item.discharge_pressure}}K/C2</div>
              <div class="cards_content_con">油压 {{item.oil_pressure}}K/C2</div>
              <div class="cards_content_con">电机电流 {{item.motor_amps}}A</div>
                  <div class="cards_content_con">卸载阀 {{item.unloading_valve}}%</div>
              <div class="cards_content_con"> 进气阀 {{item.inlet_valve}}%</div>
              <div class="cards_content_con">低速齿轮震动 {{item. low_speed_vibration}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item. high_speed_vibration}}um</div>
              <div class="cards_content_con">进油温度 {{item. inlet_oil_temperature}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.final_interstage_air_temperature}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.motor_stator_temperature}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.inboard_motor_bearing_temperature}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.outboard_motor_bearing_temperature}}℃</div>

            </div>
     <div class="cards_content" v-show="item.tname==='fun200'">
              <div class="cards_content_con">系统压力 {{item.SPT}}kg/cm2</div>
              <div class="cards_content_con">出口压力 {{item.DPT}}kg/cm2</div>
              <div class="cards_content_con">油压 {{item.OPT}}kg/cm2</div>
              <div class="cards_content_con">电机电流 {{item.MAT}}A</div>
                     <div class="cards_content_con">卸载阀 {{item.unloading_valve_position}}%</div>
               <div class="cards_content_con">进气阀 {{item.valve_position}%</div>
              <div class="cards_content_con">低速齿轮震动 {{item.LVT}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item.HVT}}um</div>
              <div class="cards_content_con">进油温度 {{item. IOT}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.IAT}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.SMt1}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.IMT}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.OMT}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.OMT}}℃</div>
               <div class="cards_content_con">进气阀{{item.valve_position}%</div>
            <div class="cards_content_con">卸载阀{{item.unloading_valve_position}}%</div>
             

            </div>
               <div class="cards_content" v-show="item.tname==='luogan'">
              <div class="cards_content_con">排气压力 {{item. discharge_pressure}}Mpa</div>
              <div class="cards_content_con">排气温度 {{item.  discharge_temperature}}℃</div>
              <div class="cards_content_con">运行时间 {{item.runtime}}H</div>
              <div class="cards_content_con">加载时间 {{item.loading_time}}H</div>
              <div class="cards_content_con">电机电流{{item.motor_amps}}A </div>
              <div class="cards_content_con">油气桶压力 {{item.  oil_gas_barrel_pressure}}Mpa</div>
              <div class="cards_content_con">油气桶温度 {{item.  oil_gas_barrel_temperature}}℃</div>

            </div>
          </div>
          </div>
            <div style="display: flex;width:25%;flex-direction: column;margin-right:1.25rem">
                 <div class="card_two"  v-for="(item,index) in wzzz_two" @click="chart(item.machine_id)">
            <div class="cards_title">{{item.name}}</div>
                <div class="cards_workshop">{{item.workshop}}</div>
       <div class="cards_content" v-show="item.tname==='samsung'">
              <div class="cards_content_con">系统压力：{{item.system_pressure}}barG</div>
              <div class="cards_content_con">排放压力：{{item.stage_2_discharge_pressure}}barG</div>
              <div class="cards_content_con">油压：{{item.oil_supply_pressure}}barG</div>
              <div class="cards_content_con">电机电流：{{item.motor_current}}A</div>
                    <div class="cards_content_con">卸载阀：{{item.igv_position_open}}%</div>
                          <div class="cards_content_con">进气阀：{{item.bov_position_closed}}%</div>
              <div class="cards_content_con">一级震动：{{item.stage_1_vibration}}um</div>
              <div class="cards_content_con">二级震动：{{item.  stage_2_vibration}}um</div>
              <div class="cards_content_con">供油温度：{{item.oil_supply_temperature}}℃</div>
              <div class="cards_content_con">二级进气温度：{{item.stage_2_inlet_temperature}}℃</div>
              <div class="cards_content_con">电机绕组R温度：{{item.motor_winding_r_teperature}}℃</div>
              <div class="cards_content_con">电机轴承DE温度：{{item.motor_bearing_de_temperature}}℃</div>
              <div class="cards_content_con">电机轴承NDE温度：{{item.motor_bearing_nde_temperature}}℃</div>
              </div>
       <div class="cards_content"  v-show="item.tname==='fun150'">
              <div class="cards_content_con">系统压力 {{item.system_pressure}}K/C2</div>
              <div class="cards_content_con">排气压力 {{item.discharge_pressure}}K/C2</div>
              <div class="cards_content_con">油压 {{item.oil_pressure}}K/C2</div>
              <div class="cards_content_con">电机电流 {{item.motor_amps}}A</div>
                  <div class="cards_content_con">卸载阀 {{item.unloading_valve}}%</div>
              <div class="cards_content_con"> 进气阀 {{item.inlet_valve}}%</div>
              <div class="cards_content_con">低速齿轮震动 {{item. low_speed_vibration}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item. high_speed_vibration}}um</div>
              <div class="cards_content_con">进油温度 {{item. inlet_oil_temperature}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.final_interstage_air_temperature}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.motor_stator_temperature}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.inboard_motor_bearing_temperature}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.outboard_motor_bearing_temperature}}℃</div>

            </div>
     <div class="cards_content" v-show="item.tname==='fun200'">
              <div class="cards_content_con">系统压力 {{item.SPT}}kg/cm2</div>
              <div class="cards_content_con">出口压力 {{item.DPT}}kg/cm2</div>
              <div class="cards_content_con">油压 {{item.OPT}}kg/cm2</div>
              <div class="cards_content_con">电机电流 {{item.MAT}}A</div>
                   
            <div class="cards_content_con">卸载阀 {{item.unloading_valve_position}}%</div>
                 <div class="cards_content_con">进气阀 {{item.valve_position}}%</div>
            
              <div class="cards_content_con">低速齿轮震动 {{item.LVT}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item.HVT}}um</div>
              <div class="cards_content_con">进油温度 {{item. IOT}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.IAT}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.SMt1}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.IMT}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.OMT}}℃</div>

            </div>
               <div class="cards_content" v-show="item.tname==='luogan'">
              <div class="cards_content_con">排气压力 {{item. discharge_pressure}}Mpa</div>
              <div class="cards_content_con">排气温度 {{item.  discharge_temperature}}℃</div>
              <div class="cards_content_con">运行时间 {{item.runtime}}H</div>
              <div class="cards_content_con">加载时间 {{item.loading_time}}H</div>
              <div class="cards_content_con">电机电流{{item.motor_amps}}A </div>
              <div class="cards_content_con">油气桶压力 {{item.  oil_gas_barrel_pressure}}Mpa</div>
              <div class="cards_content_con">油气桶温度 {{item.  oil_gas_barrel_temperature}}℃</div>

            </div>
          </div>
          </div>
          </div>
          <!-- <div :class="item.cardClass"  v-for="(item,index) in listCon" :key="'samsung'+index">
            <div class="cards_title">{{item.name}}</div>
             <div class="cards_workshop">{{item.workshop}}</div>
            <div class="cards_content" v-show="item.tname==='samsung'">
              <div class="cards_content_con">系统压力：{{item.system_pressure}}barG</div>
              <div class="cards_content_con">排放压力：{{item.stage_2_discharge_pressure}}barG</div>
              <div class="cards_content_con">油压：{{item.oil_supply_pressure}}barG</div>
              <div class="cards_content_con">电机电流：{{item.motor_current}}A</div>
                    <div class="cards_content_con">卸载阀：{{item.igv_position_open}}%</div>
                          <div class="cards_content_con">进气阀：{{item.bov_position_closed}}%</div>
              <div class="cards_content_con">一级震动：{{item.stage_1_vibration}}um</div>
              <div class="cards_content_con">二级震动：{{item.  stage_2_vibration}}um</div>
              <div class="cards_content_con">供油温度：{{item.oil_supply_temperature}}℃</div>
              <div class="cards_content_con">二级进气温度：{{item.stage_2_inlet_temperature}}℃</div>
              <div class="cards_content_con">电机绕组R温度：{{item.motor_winding_r_teperature}}℃</div>
              <div class="cards_content_con">电机轴承DE温度：{{item.motor_bearing_de_temperature}}℃</div>
              <div class="cards_content_con">电机轴承NDE温度：{{item.motor_bearing_nde_temperature}}℃</div>
              </div>
       <div class="cards_content"  v-show="item.tname==='fun150'">
              <div class="cards_content_con">系统压力 {{item.system_pressure}}K/C2</div>
              <div class="cards_content_con">排气压力 {{item.discharge_pressure}}K/C2</div>
              <div class="cards_content_con">油压 {{item.oil_pressure}}K/C2</div>
              <div class="cards_content_con">电机电流 {{item.motor_amps}}A</div>
                  <div class="cards_content_con">卸载阀 {{item.unloading_valve}}%</div>
              <div class="cards_content_con"> 进气阀 {{item.inlet_valve}}%</div>
              <div class="cards_content_con">低速齿轮震动 {{item. low_speed_vibration}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item. high_speed_vibration}}um</div>
              <div class="cards_content_con">进油温度 {{item. inlet_oil_temperature}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.final_interstage_air_temperature}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.motor_stator_temperature}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.inboard_motor_bearing_temperature}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.outboard_motor_bearing_temperature}}℃</div>

            </div>
     <div class="cards_content" v-show="item.tname==='fun200'">
              <div class="cards_content_con">系统压力 {{item.SPT}}kg/cm2</div>
              <div class="cards_content_con">出口压力 {{item.DPT}}kg/cm2</div>
              <div class="cards_content_con">油压 {{item.OPT}}kg/cm2</div>
              <div class="cards_content_con">电机电流 {{item.MAT}}A</div>
                     <div class="cards_content_con">卸载阀{{item.unloading_valve_position}}%</div>
               <div class="cards_content_con">进气阀{{item.valve_position}%</div>
              <div class="cards_content_con">低速齿轮震动 {{item.LVT}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item.HVT}}um</div>
              <div class="cards_content_con">进油温度 {{item. IOT}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.IAT}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.SMt1}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.IMT}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.OMT}}℃</div>

            </div>
               <div class="cards_content" v-show="item.tname==='luogan'">
              <div class="cards_content_con">排气压力 {{item. discharge_pressure}}Mpa</div>
              <div class="cards_content_con">排气温度 {{item.  discharge_temperature}}℃</div>
              <div class="cards_content_con">运行时间 {{item.runtime}}H</div>
              <div class="cards_content_con">加载时间 {{item.loading_time}}H</div>
              <div class="cards_content_con">电机电流{{item.motor_amps}}A </div>
              <div class="cards_content_con">油气桶压力 {{item.  oil_gas_barrel_pressure}}Mpa</div>
              <div class="cards_content_con">油气桶温度 {{item.  oil_gas_barrel_temperature}}℃</div>

            </div>
            </div> -->
          </div>

          <!-- <div class="card_three" v-if="isfun" v-for="(item,index) in fun150_tdata" :key="'fun150'+index">
            <div class="cards_title">{{item.name}}</div>
                <div class="cards_workshop">{{item.workshop}}</div>
            <div class="cards_content">
              <div class="cards_content_con">系统压力 {{item.system_pressure}}K/C2</div>
              <div class="cards_content_con">排气压力 {{item.discharge_pressure}}K/C2</div>
              <div class="cards_content_con">油压 {{item.oil_pressure}}K/C2</div>
              <div class="cards_content_con">电机电流 {{item.motor_amps}}A</div>
              
              <div class="cards_content_con">低速齿轮震动 {{item. low_speed_vibration}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item. high_speed_vibration}}um</div>
              <div class="cards_content_con">进油温度 {{item. inlet_oil_temperature}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.final_interstage_air_temperature}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.motor_stator_temperature}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.inboard_motor_bearing_temperature}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.outboard_motor_bearing_temperature}}℃</div>

            </div>
          </div>
          <div class="card_two" v-if="isfun" v-for="(item,index) in fun200_tdata" :key="'fun200'+index">
            <div class="cards_title">{{item.name}}</div>
                <div class="cards_workshop">{{item.workshop}}</div>
            <div class="cards_content">
              <div class="cards_content_con">系统压力 {{item.SPT}}kg/cm2</div>
              <div class="cards_content_con">出口压力 {{item.DPT}}kg/cm2</div>
              <div class="cards_content_con">油压 {{item.OPT}}kg/cm2</div>
              <div class="cards_content_con">电机电流 {{item.MAT}}A</div>
                      
              <div class="cards_content_con">低速齿轮震动 {{item.LVT}}um</div>
              <div class="cards_content_con">高速齿轮震动 {{item.HVT}}um</div>
              <div class="cards_content_con">进油温度 {{item. IOT}}℃</div>
              <div class="cards_content_con">末级级间温度 {{item.IAT}}℃</div>
              <div class="cards_content_con">电机定子温度 {{item.SMt1}}℃</div>
              <div class="cards_content_con">电机前轴承温度 {{item.IMT}}℃</div>
              <div class="cards_content_con">电机后轴承温度 {{item.OMT}}℃</div>

            </div>
          </div>

          <div class="card_one" v-if="isluogan" v-for="(item,index) in luogan_tdata" :key="'luogan'+index">
            <div class="cards_title">{{item.name}}</div>
                <div class="cards_workshop">{{item.workshop}}</div>
            <div class="cards_content">
              <div class="cards_content_con">排气压力 {{item. discharge_pressure}}Mpa</div>
              <div class="cards_content_con">排气温度 {{item.  discharge_temperature}}℃</div>
              <div class="cards_content_con">运行时间 {{item.runtime}}H</div>
              <div class="cards_content_con">加载时间 {{item.loading_time}}H</div>
              <div class="cards_content_con">电机电流{{item.motor_amps}}A </div>
              <div class="cards_content_con">油气桶压力 {{item.  oil_gas_barrel_pressure}}Mpa</div>
              <div class="cards_content_con">油气桶温度 {{item.  oil_gas_barrel_temperature}}℃</div>

            </div>
          </div> -->
        </div>
      </div>
      <div class="boxes2" v-show="!showboxes">
        <div class="boxes2_title">空压机警戒设置</div>
        <div class="boxes2_content">
          <div class="main_table">
            <div class="main_table_con" v-if="allshow">
              <!-- 三星数据表 -->
              <div class="t-head" v-if="issamsung">
                <div class="t-con" v-for="(item,index) in samsung_thead" :key="'samsungHead'+index">
                  <span>{{item.text}}</span></div>

              </div>
              <div style="height:45%;margin-bottom:5%;" v-if="issamsung" v-for="(item,index) in samsung_tdata"
                :key="'samsung'+index">
                <div class="t-one" style="height:33%">
                  <div class="t-con"><span>{{item.name}}</span></div>
                  <div class="t-con"><span>{{item.system_pressure}}</span></div>
                  <div class="t-con"><span>{{item.stage_2_discharge_pressure}}</span></div>
                  <div class="t-con"><span>{{item.oil_supply_pressure}}</span></div>
                  <div class="t-con"><span>{{item.motor_current}}</span></div>
<div class="t-con"><span>{{item.igv_position_open}}</span></div>
<div class="t-con"><span>{{item.bov_position_closed}}</span></div>
                  <div class="t-con"><span>{{item.stage_1_vibration}}</span></div>
                  <div class="t-con"><span>{{item.stage_2_vibration}}</span></div>
                  <div class="t-con"><span>{{item.oil_supply_temperature}}</span></div>
                  <div class="t-con"><span>{{item.stage_2_inlet_temperature}}</span></div>
                  <div class="t-con"><span>{{item.motor_winding_r_teperature}}</span></div>
                  <div class="t-con"><span>{{item.motor_bearing_de_temperature}}</span></div>
                  <div class="t-con"><span>{{item.motor_bearing_nde_temperature}}</span></div>
                  <div class="t-con"><span>{{item.gh}}</span></div>

                </div>
                <div class="t-one" style="height:33%">
                  <div class="t-con"><span>最大值</span></div>
                  <div class="t-con2"><span @click=" showinput(item.name,'system_pressure','big')"
                      v-show="!item.system_pressure_showInput">{{item.Big_system_pressure}}</span><input
                      autofocus="autofocus" v-show="item.system_pressure_showInput" v-model="item.Big_system_pressure"
                      @keyup.enter="subMit(item.name,'system_pressure',item.Big_system_pressure,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'stage_2_discharge_pressure','big')"
                      v-show="!item.stage_2_discharge_pressure_showInput">{{item.Big_stage_2_discharge_pressure}}</span><input
                      autofocus="autofocus" v-show="item.stage_2_discharge_pressure_showInput"
                      v-model="item.Big_stage_2_discharge_pressure"
                      @keyup.enter="subMit(item.name,'stage_2_discharge_pressure',item.Big_stage_2_discharge_pressure,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'oil_supply_pressure','big')"
                      v-show="!item.oil_supply_pressure_showInput">{{item.Big_oil_supply_pressure}}</span><input
                      autofocus="autofocus" v-show="item.oil_supply_pressure_showInput"
                      v-model="item.Big_oil_supply_pressure"
                      @keyup.enter="subMit(item.name,'oil_supply_pressure',item.Big_oil_supply_pressure,'big',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'motor_current','big')"
                      v-show="!item.motor_current_showInput">{{item.Big_motor_current}}</span><input
                      autofocus="autofocus" v-show="item.motor_current_showInput" v-model="item.Big_motor_current"
                      @keyup.enter="subMit(item.name,'motor_current',item.Big_motor_current,'big',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'stage_1_vibration','big')"
                      v-show="!item.stage_1_vibration_showInput">{{item.Big_stage_1_vibration}}</span><input
                      autofocus="autofocus" v-show="item.stage_1_vibration_showInput"
                      v-model="item.Big_stage_1_vibration"
                      @keyup.enter="subMit(item.name,'stage_1_vibration',item.Big_stage_1_vibration,'big',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'stage_2_vibration','big')"
                      v-show="!item.stage_2_vibration_showInput">{{item.Big_stage_2_vibration}}</span><input
                      autofocus="autofocus" v-show="item.stage_2_vibration_showInput"
                      v-model="item.Big_stage_2_vibration"
                      @keyup.enter="subMit(item.name,'stage_2_vibration',item.Big_stage_2_vibration,'big',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'oil_supply_temperature','big')"
                      v-show="!item.oil_supply_temperature_showInput">{{item.Big_oil_supply_temperature}}</span><input
                      autofocus="autofocus" v-show="item.oil_supply_temperature_showInput"
                      v-model="item.Big_oil_supply_temperature"
                      @keyup.enter="subMit(item.name,'oil_supply_temperature',item.Big_oil_supply_temperature,'big',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'stage_2_inlet_temperature','big')"
                      v-show="!item.stage_2_inlet_temperature_showInput">{{item.Big_stage_2_inlet_temperature}}</span><input
                      autofocus="autofocus" v-show="item.stage_2_inlet_temperature_showInput"
                      v-model="item.Big_stage_2_inlet_temperature"
                      @keyup.enter="subMit(item.name,'stage_2_inlet_temperature',item.Big_stage_2_inlet_temperature,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'motor_winding_r_teperature','big')"
                      v-show="!item.motor_winding_r_teperature_showInput">{{item.Big_motor_winding_r_teperature}}</span><input
                      autofocus="autofocus" v-show="item.motor_winding_r_teperature_showInput"
                      v-model="item.Big_motor_winding_r_teperature"
                      @keyup.enter="subMit(item.name,'motor_winding_r_teperature',item.Big_motor_winding_r_teperature,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'motor_bearing_de_temperature','big')"
                      v-show="!item.motor_bearing_de_temperature_showInput">{{item.Big_motor_bearing_de_temperature}}</span><input
                      autofocus="autofocus" v-show="item.motor_bearing_de_temperature_showInput"
                      v-model="item.Big_motor_bearing_de_temperature"
                      @keyup.enter="subMit(item.name,'motor_bearing_de_temperature',item.Big_motor_bearing_de_temperature,'big',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'motor_bearing_nde_temperature','big')"
                      v-show="!item.motor_bearing_nde_temperature_showInput">{{item.Big_motor_bearing_nde_temperature}}</span><input
                      autofocus="autofocus" v-show="item.motor_bearing_nde_temperature_showInput"
                      v-model="item.Big_motor_bearing_nde_temperature"
                      @keyup.enter="subMit(item.name,'motor_bearing_nde_temperature',item.Big_motor_bearing_nde_temperature,'big',item.machine_id)" />
                  </div>
                  <div class="t-con2"><span @click=" showinput(item.name,'gh','big')"
                      v-show="!item.gh_showInput">{{item.Big_gh}}</span><input autofocus="autofocus"
                      v-show="item.gh_showInput" v-model="item.Big_gh"
                      @keyup.enter="subMit(item.name,'gh',item.Big_gh,'big',item.machine_id)" />
                  </div>

                </div>
                <div class="t-one" style="height:33%">
                  <div class="t-con"><span>最小值</span></div>
                  <div class="t-con2"><span @click=" showinput(item.name,'system_pressure','small')"
                      v-show="!item.system_pressure_showInput2">{{item.Small_system_pressure}}</span><input
                      autofocus="autofocus" v-show="item.system_pressure_showInput2"
                      v-model="item.Small_system_pressure"
                      @keyup.enter="subMit(item.name,'system_pressure',item.Small_system_pressure,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'stage_2_discharge_pressure','small')"
                      v-show="!item.stage_2_discharge_pressure_showInput2">{{item.Small_stage_2_discharge_pressure}}</span><input
                      autofocus="autofocus" v-show="item.stage_2_discharge_pressure_showInput2"
                      v-model="item.Small_stage_2_discharge_pressure"
                      @keyup.enter="subMit(item.name,'stage_2_discharge_pressure',item.Small_stage_2_discharge_pressure,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'oil_supply_pressure','small')"
                      v-show="!item.oil_supply_pressure_showInput2">{{item.Small_oil_supply_pressure}}</span><input
                      autofocus="autofocus" v-show="item.oil_supply_pressure_showInput2"
                      v-model="item.Small_oil_supply_pressure"
                      @keyup.enter="subMit(item.name,'oil_supply_pressure',item.Small_oil_supply_pressure,'small',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'motor_current','small')"
                      v-show="!item.motor_current_showInput2">{{item.Small_motor_current}}</span><input
                      autofocus="autofocus" v-show="item.motor_current_showInput2" v-model="item.Small_motor_current"
                      @keyup.enter="subMit(item.name,'motor_current',item.Small_motor_current,'small',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'stage_1_vibration','small')"
                      v-show="!item.stage_1_vibration_showInput2">{{item.Small_stage_1_vibration}}</span><input
                      autofocus="autofocus" v-show="item.stage_1_vibration_showInput2"
                      v-model="item.Small_stage_1_vibration"
                      @keyup.enter="subMit(item.name,'stage_1_vibration',item.Small_stage_1_vibration,'small',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'stage_2_vibration','small')"
                      v-show="!item.stage_2_vibration_showInput2">{{item.Small_stage_2_vibration}}</span><input
                      autofocus="autofocus" v-show="item.stage_2_vibration_showInput2"
                      v-model="item.Small_stage_2_vibration"
                      @keyup.enter="subMit(item.name,'stage_2_vibration',item.Small_stage_2_vibration,'small',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'oil_supply_temperature','small')"
                      v-show="!item.oil_supply_temperature_showInput2">{{item.Small_oil_supply_temperature}}</span><input
                      autofocus="autofocus" v-show="item.oil_supply_temperature_showInput2"
                      v-model="item.Small_oil_supply_temperature"
                      @keyup.enter="subMit(item.name,'oil_supply_temperature',item.Small_oil_supply_temperature,'small',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'stage_2_inlet_temperature','small')"
                      v-show="!item.stage_2_inlet_temperature_showInput2">{{item.Small_stage_2_inlet_temperature}}</span><input
                      autofocus="autofocus" v-show="item.stage_2_inlet_temperature_showInput2"
                      v-model="item.Small_stage_2_inlet_temperature"
                      @keyup.enter="subMit(item.name,'stage_2_inlet_temperature',item.Small_stage_2_inlet_temperature,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'motor_winding_r_teperature','small')"
                      v-show="!item.motor_winding_r_teperature_showInput2">{{item.Small_motor_winding_r_teperature}}</span><input
                      autofocus="autofocus" v-show="item.motor_winding_r_teperature_showInput2"
                      v-model="item.Small_motor_winding_r_teperature"
                      @keyup.enter="subMit(item.name,'motor_winding_r_teperature',item.Small_motor_winding_r_teperature,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'motor_bearing_de_temperature','small')"
                      v-show="!item.motor_bearing_de_temperature_showInput2">{{item.Small_motor_bearing_de_temperature}}</span><input
                      autofocus="autofocus" v-show="item.motor_bearing_de_temperature_showInput2"
                      v-model="item.Small_motor_bearing_de_temperature"
                      @keyup.enter="subMit(item.name,'motor_bearing_de_temperature',item.Small_motor_bearing_de_temperature,'small',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'motor_bearing_nde_temperature','small')"
                      v-show="!item.motor_bearing_nde_temperature_showInput2">{{item.Small_motor_bearing_nde_temperature}}</span><input
                      autofocus="autofocus" v-show="item.motor_bearing_nde_temperature_showInput2"
                      v-model="item.Small_motor_bearing_nde_temperature"
                      @keyup.enter="subMit(item.name,'motor_bearing_nde_temperature',item.Small_motor_bearing_nde_temperature,'small',item.machine_id)" />
                  </div>
                  <div class="t-con2"><span @click=" showinput(item.name,'gh','small')"
                      v-show="!item.gh_showInput2">{{item.Small_gh}}</span><input autofocus="autofocus"
                      v-show="item.gh_showInput2" v-model="item.Small_gh"
                      @keyup.enter="subMit(item.name,'gh',item.Small_gh,'small',item.machine_id)" />
                  </div>

                </div>
              </div>
              <!-- 三星数据表 -->
              <!-- fun数据表 -->


              <div style="height:45%;margin-bottom:5%;" v-if="isfun" v-for="(item,index) in fun150_tdata"
                :key="'fun150'+index">
                <div class="t-head" v-if="isfun" style="height:26%">
                  <div class="t-con" style="border-top:1px solid white;" v-for="(item,index) in fun_thead"
                    :key="'funHead'+index"><span>{{item.text}}</span></div>

                </div>
                <div class="t-one" style="height:25%">
                  <div class="t-con"><span>{{item.name}}</span></div>
                  <div class="t-con"><span>{{item.system_pressure}}</span></div>
                  <div class="t-con"><span>{{item.discharge_pressure}}</span></div>
                  <div class="t-con"><span>{{item.oil_pressure}}</span></div>
                  <div class="t-con"><span>{{item.motor_amps}}</span></div>

                  <div class="t-con"><span>{{item.low_speed_vibration}}</span></div>
                  <div class="t-con"><span>{{item.high_speed_vibration}}</span></div>
                  <div class="t-con"><span>{{item.inlet_oil_temperature}}</span></div>
                  <div class="t-con"><span>{{item.final_interstage_air_temperature}}</span></div>
                  <div class="t-con"><span>{{item.motor_stator_temperature}}</span></div>
                  <div class="t-con"><span>{{item.inboard_motor_bearing_temperature}}</span></div>
                  <div class="t-con"><span>{{item.outboard_motor_bearing_temperature}}</span></div>
                     <div class="t-con"><span>{{item.gh}}</span></div>
                </div>
                <div class="t-one" style="height:25%">
                  <div class="t-con"><span>最大值</span></div>
                  <div class="t-con2"><span @click=" showinput(item.name,'system_pressure','big')"
                      v-show="!item.system_pressure_showInput">{{item.Big_system_pressure}}</span><input
                      autofocus="autofocus" v-show="item.system_pressure_showInput" v-model="item.Big_system_pressure"
                      @keyup.enter="subMit(item.name,'system_pressure',item.Big_system_pressure,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'discharge_pressure','big')"
                      v-show="!item.discharge_pressure_showInput">{{item.Big_discharge_pressure}}</span><input
                      autofocus="autofocus" v-show="item.discharge_pressure_showInput"
                      v-model="item.Big_discharge_pressure"
                      @keyup.enter="subMit(item.name,'discharge_pressure',item.Big_discharge_pressure ,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'oil_pressure','big')"
                      v-show="!item.oil_pressure_showInput">{{item.Big_oil_pressure}}</span><input autofocus="autofocus"
                      v-show="item.oil_pressure_showInput" v-model="item.Big_oil_pressure"
                      @keyup.enter="subMit(item.name,'oil_pressure',item.Big_oil_pressure ,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'motor_amps','big')"
                      v-show="!item.motor_amps_showInput">{{item.Big_motor_amps}}</span><input autofocus="autofocus"
                      v-show="item.motor_amps_showInput" v-model="item.Big_motor_amps"
                      @keyup.enter="subMit(item.name,'motor_amps',item.Big_motor_amps ,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'low_speed_vibration','big')"
                      v-show="!item.low_speed_vibration_showInput">{{item.Big_low_speed_vibration}}</span><input
                      autofocus="autofocus" v-show="item.low_speed_vibration_showInput"
                      v-model="item.Big_low_speed_vibration"
                      @keyup.enter="subMit(item.name,'low_speed_vibration',item.Big_low_speed_vibration ,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'high_speed_vibration','big')"
                      v-show="!item.high_speed_vibration_showInput">{{item.Big_high_speed_vibration}}</span><input
                      autofocus="autofocus" v-show="item.high_speed_vibration_showInput"
                      v-model="item.Big_high_speed_vibration"
                      @keyup.enter="subMit(item.name,'high_speed_vibration',item.Big_high_speed_vibration ,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'inlet_oil_temperature','big')"
                      v-show="!item.inlet_oil_temperature_showInput">{{item.Big_inlet_oil_temperature}}</span><input
                      autofocus="autofocus" v-show="item.inlet_oil_temperature_showInput"
                      v-model="item.Big_inlet_oil_temperature"
                      @keyup.enter="subMit(item.name,'inlet_oil_temperature',item.Big_inlet_oil_temperature ,'big',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'final_interstage_air_temperature','big')"
                      v-show="!item.final_interstage_air_temperature_showInput">{{item.Big_final_interstage_air_temperature}}</span><input
                      autofocus="autofocus" v-show="item.final_interstage_air_temperature_showInput"
                      v-model="item.Big_final_interstage_air_temperature"
                      @keyup.enter="subMit(item.name,'final_interstage_air_temperature',item.Big_final_interstage_air_temperature ,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'motor_stator_temperature','big')"
                      v-show="!item.motor_stator_temperature_showInput">{{item.Big_motor_stator_temperature}}</span><input
                      autofocus="autofocus" v-show="item.motor_stator_temperature_showInput"
                      v-model="item.Big_motor_stator_temperature"
                      @keyup.enter="subMit(item.name,'motor_stator_temperature',item.Big_motor_stator_temperature ,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'inboard_motor_bearing_temperature','big')"
                      v-show="!item.inboard_motor_bearing_temperature_showInput">{{item.Big_inboard_motor_bearing_temperature}}</span><input
                      autofocus="autofocus" v-show="item.inboard_motor_bearing_temperature_showInput"
                      v-model="item.Big_inboard_motor_bearing_temperature"
                      @keyup.enter="subMit(item.name,'inboard_motor_bearing_temperature',item.Big_inboard_motor_bearing_temperature ,'big',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'outboard_motor_bearing_temperature','big')"
                      v-show="!item.outboard_motor_bearing_temperature_showInput">{{item.Big_outboard_motor_bearing_temperature}}</span><input
                      autofocus="autofocus" v-show="item.outboard_motor_bearing_temperature_showInput"
                      v-model="item.Big_outboard_motor_bearing_temperature"
                      @keyup.enter="subMit(item.name,'outboard_motor_bearing_temperature',item.Big_outboard_motor_bearing_temperature ,'big',item.machine_id)" />
                  </div>
                  <div class="t-con2"><span @click=" showinput(item.name,'gh','big')"
                      v-show="!item.gh_showInput">{{item.Big_gh}}</span><input autofocus="autofocus"
                      v-show="item.gh_showInput" v-model="item.Big_gh"
                      @keyup.enter="subMit(item.name,'gh',item.Big_gh,'big',item.machine_id)" />
                  </div>


                </div>
                <div class="t-one" style="height:25%">
                  <div class="t-con"><span>最小值</span></div>
                  <div class="t-con2"><span @click=" showinput(item.name,'system_pressure','small')"
                      v-show="!item.system_pressure_showInput2">{{item.Small_system_pressure}}</span><input
                      autofocus="autofocus" v-show="item.system_pressure_showInput2"
                      v-model="item.Small_system_pressure"
                      @keyup.enter="subMit(item.name,'system_pressure',item.Small_system_pressure,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'discharge_pressure','small')"
                      v-show="!item.discharge_pressure_showInput2">{{item.Small_discharge_pressure}}</span><input
                      autofocus="autofocus" v-show="item.discharge_pressure_showInput2"
                      v-model="item.Small_discharge_pressure"
                      @keyup.enter="subMit(item.name,'discharge_pressure',item.Small_discharge_pressure ,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'oil_pressure','small')"
                      v-show="!item.oil_pressure_showInput2">{{item.Small_oil_pressure}}</span><input
                      autofocus="autofocus" v-show="item.oil_pressure_showInput2" v-model="item.Small_oil_pressure"
                      @keyup.enter="subMit(item.name,'oil_pressure',item.Small_oil_pressure ,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'motor_amps','small')"
                      v-show="!item.motor_amps_showInput2">{{item.Small_motor_amps}}</span><input autofocus="autofocus"
                      v-show="item.motor_amps_showInput2" v-model="item.Small_motor_amps"
                      @keyup.enter="subMit(item.name,'motor_amps',item.Small_motor_amps ,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'low_speed_vibration','small')"
                      v-show="!item.low_speed_vibration_showInput2">{{item.Small_low_speed_vibration}}</span><input
                      autofocus="autofocus" v-show="item.low_speed_vibration_showInput2"
                      v-model="item.Small_low_speed_vibration"
                      @keyup.enter="subMit(item.name,'low_speed_vibration',item.Small_low_speed_vibration ,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'high_speed_vibration','small')"
                      v-show="!item.high_speed_vibration_showInput2">{{item.Small_high_speed_vibration}}</span><input
                      autofocus="autofocus" v-show="item.high_speed_vibration_showInput2"
                      v-model="item.Small_high_speed_vibration"
                      @keyup.enter="subMit(item.name,'high_speed_vibration',item.Small_high_speed_vibration ,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'inlet_oil_temperature','small')"
                      v-show="!item.inlet_oil_temperature_showInput2">{{item.Small_inlet_oil_temperature}}</span><input
                      autofocus="autofocus" v-show="item.inlet_oil_temperature_showInput2"
                      v-model="item.Small_inlet_oil_temperature"
                      @keyup.enter="subMit(item.name,'inlet_oil_temperature',item.Small_inlet_oil_temperature ,'small',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'final_interstage_air_temperature','small')"
                      v-show="!item.final_interstage_air_temperature_showInput2">{{item.Small_final_interstage_air_temperature}}</span><input
                      autofocus="autofocus" v-show="item.final_interstage_air_temperature_showInput2"
                      v-model="item.Small_final_interstage_air_temperature"
                      @keyup.enter="subMit(item.name,'final_interstage_air_temperature',item.Small_final_interstage_air_temperature ,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'motor_stator_temperature','small')"
                      v-show="!item.motor_stator_temperature_showInput2">{{item.Small_motor_stator_temperature}}</span><input
                      autofocus="autofocus" v-show="item.motor_stator_temperature_showInput2"
                      v-model="item.Small_motor_stator_temperature"
                      @keyup.enter="subMit(item.name,'motor_stator_temperature',item.Small_motor_stator_temperature ,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'inboard_motor_bearing_temperature','small')"
                      v-show="!item.inboard_motor_bearing_temperature_showInput2">{{item.Small_inboard_motor_bearing_temperature}}</span><input
                      autofocus="autofocus" v-show="item.inboard_motor_bearing_temperature_showInput2"
                      v-model="item.Small_inboard_motor_bearing_temperature"
                      @keyup.enter="subMit(item.name,'inboard_motor_bearing_temperature',item.Small_inboard_motor_bearing_temperature ,'small',item.machine_id)" />
                  </div>


                  <div class="t-con2"><span @click=" showinput(item.name,'outboard_motor_bearing_temperature','small')"
                      v-show="!item.outboard_motor_bearing_temperature_showInput2">{{item.Small_outboard_motor_bearing_temperature}}</span><input
                      autofocus="autofocus" v-show="item.outboard_motor_bearing_temperature_showInput2"
                      v-model="item.Small_outboard_motor_bearing_temperature"
                      @keyup.enter="subMit(item.name,'outboard_motor_bearing_temperature',item.Small_outboard_motor_bearing_temperature ,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'gh','small')"
                      v-show="!item.gh_showInput2">{{item.Small_gh}}</span><input autofocus="autofocus"
                      v-show="item.gh_showInput2" v-model="item.Small_gh"
                      @keyup.enter="subMit(item.name,'gh',item.Small_gh,'small',item.machine_id)" />
                  </div>


                </div>
              </div>

              <div style="height:45%;margin-bottom:5%" v-if="isfun" v-for="(item,index) in fun200_tdata"
                :key="'fun200'+index">
                <div class="t-head" style="height:25%" v-if="isfun">
                  <div class="t-con" style="border-top:1px solid white;" v-for="(item,index) in fun_thead"
                    :key="'funHead'+index"><span>{{item.text}}</span></div>

                </div>
                <div class="t-one" style="height:25%">
                  <div class="t-con"><span>{{item.name}}</span></div>
                  <div class="t-con"><span>{{item.SPT}}</span></div>
                  <div class="t-con"><span>{{item.DPT}}</span></div>
                  <div class="t-con"><span>{{item.OPT}}</span></div>
                  <div class="t-con"><span>{{item.MAT}}</span></div>

                  <div class="t-con"><span>{{item.LVT}}</span></div>
                  <div class="t-con"><span>{{item.HVT}}</span></div>
                  <div class="t-con"><span>{{item.IOT}}</span></div>
                  <div class="t-con"><span>{{item.IAT}}</span></div>
                  <div class="t-con"><span>{{item.SMt1}}</span></div>
                  <div class="t-con"><span>{{item.IMT}}</span></div>
                  <div class="t-con"><span>{{item.OMT}}</span></div>
                     <div class="t-con"><span>{{item.gh}}</span></div>

                </div>
                <div class="t-one" style="height:25%">
                  <div class="t-con"><span>最大值</span></div>
                  <div class="t-con2"><span @click=" showinput(item.name,'SPT','big')"
                      v-show="!item.SPT_showInput">{{item.Big_SPT}}</span><input autofocus="autofocus"
                      v-show="item.SPT_showInput" v-model="item.Big_SPT"
                      @keyup.enter="subMit(item.name,'SPT',item.Big_SPT,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'DPT','big')"
                      v-show="!item.DPT_showInput">{{item.Big_DPT}}</span><input autofocus="autofocus"
                      v-show="item.DPT_showInput" v-model="item.Big_DPT"
                      @keyup.enter="subMit(item.name,'DPT',item.Big_DPT,'big',item.machine_id)" /></div>


                  <div class="t-con2"><span @click=" showinput(item.name,'OPT','big')"
                      v-show="!item.OPT_showInput">{{item.Big_OPT}}</span><input autofocus="autofocus"
                      v-show="item.OPT_showInput" v-model="item.Big_OPT"
                      @keyup.enter="subMit(item.name,'OPT',item.Big_OPT,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'MAT','big')"
                      v-show="!item.MAT_showInput">{{item.Big_MAT}}</span><input autofocus="autofocus"
                      v-show="item.MAT_showInput" v-model="item.Big_MAT"
                      @keyup.enter="subMit(item.name,'MAT',item.Big_MAT,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'LVT','big')"
                      v-show="!item.LVT_showInput">{{item.Big_LVT}}</span><input autofocus="autofocus"
                      v-show="item.LVT_showInput" v-model="item.Big_LVT"
                      @keyup.enter="subMit(item.name,'LVT',item.Big_LVT,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'HVT','big')"
                      v-show="!item.HVT_showInput">{{item.Big_HVT}}</span><input autofocus="autofocus"
                      v-show="item.HVT_showInput" v-model="item.Big_HVT"
                      @keyup.enter="subMit(item.name,'HVT',item.Big_HVT,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'IOT','big')"
                      v-show="!item.IOT_showInput">{{item.Big_IOT}}</span><input autofocus="autofocus"
                      v-show="item.IOT_showInput" v-model="item.Big_IOT"
                      @keyup.enter="subMit(item.name,'IOT',item.Big_IOT,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'IAT','big')"
                      v-show="!item.IAT_showInput">{{item.Big_IAT}}</span><input autofocus="autofocus"
                      v-show="item.IAT_showInput" v-model="item.Big_IAT"
                      @keyup.enter="subMit(item.name,'IAT',item.Big_IAT,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'SMt1','big')"
                      v-show="!item.SMt1_showInput">{{item.Big_SMt1}}</span><input autofocus="autofocus"
                      v-show="item.SMt1_showInput" v-model="item.Big_SMt1"
                      @keyup.enter="subMit(item.name,'SMt1',item.Big_SMt1,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'IMT','big')"
                      v-show="!item.IMT_showInput">{{item.Big_IMT}}</span><input autofocus="autofocus"
                      v-show="item.IMT_showInput" v-model="item.Big_IMT"
                      @keyup.enter="subMit(item.name,'IMT',item.Big_IMT,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'OMT','big')"
                      v-show="!item.OMT_showInput">{{item.Big_OMT}}</span><input autofocus="autofocus"
                      v-show="item.OMT_showInput" v-model="item.Big_OMT"
                      @keyup.enter="subMit(item.name,'OMT',item.Big_OMT,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'gh','big')"
                      v-show="!item.gh_showInput">{{item.Big_gh}}</span><input autofocus="autofocus"
                      v-show="item.gh_showInput" v-model="item.Big_gh"
                      @keyup.enter="subMit(item.name,'gh',item.Big_gh,'big',item.machine_id)" />
                  </div>

                </div>
                <div class="t-one" style="height:25%">
                  <div class="t-con"><span>最小值</span></div>
                  <div class="t-con2"><span @click=" showinput(item.name,'SPT','small')"
                      v-show="!item.SPT_showInput2">{{item.Small_SPT}}</span><input autofocus="autofocus"
                      v-show="item.SPT_showInput2" v-model="item.Small_SPT"
                      @keyup.enter="subMit(item.name,'SPT',item.Small_SPT,'small',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'DPT','small')"
                      v-show="!item.DPT_showInput2">{{item.Small_DPT}}</span><input autofocus="autofocus"
                      v-show="item.DPT_showInput2" v-model="item.Small_DPT"
                      @keyup.enter="subMit(item.name,'DPT',item.Small_DPT,'small',item.machine_id)" /></div>


                  <div class="t-con2"><span @click=" showinput(item.name,'OPT','small')"
                      v-show="!item.OPT_showInput2">{{item.Small_OPT}}</span><input autofocus="autofocus"
                      v-show="item.OPT_showInput2" v-model="item.Small_OPT"
                      @keyup.enter="subMit(item.name,'OPT',item.Small_OPT,'small',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'MAT','small')"
                      v-show="!item.MAT_showInput2">{{item.Small_MAT}}</span><input autofocus="autofocus"
                      v-show="item.MAT_showInput2" v-model="item.Small_MAT"
                      @keyup.enter="subMit(item.name,'MAT',item.Small_MAT,'small',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'LVT','small')"
                      v-show="!item.LVT_showInput2">{{item.Small_LVT}}</span><input autofocus="autofocus"
                      v-show="item.LVT_showInput2" v-model="item.Small_LVT"
                      @keyup.enter="subMit(item.name,'LVT',item.Small_LVT,'small',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'HVT','small')"
                      v-show="!item.HVT_showInput2">{{item.Small_HVT}}</span><input autofocus="autofocus"
                      v-show="item.HVT_showInput2" v-model="item.Small_HVT"
                      @keyup.enter="subMit(item.name,'HVT',item.Small_HVT,'small',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'IOT','small')"
                      v-show="!item.IOT_showInput2">{{item.Small_IOT}}</span><input autofocus="autofocus"
                      v-show="item.IOT_showInput2" v-model="item.Small_IOT"
                      @keyup.enter="subMit(item.name,'IOT',item.Small_IOT,'small',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'IAT','small')"
                      v-show="!item.IAT_showInput2">{{item.Small_IAT}}</span><input autofocus="autofocus"
                      v-show="item.IAT_showInput2" v-model="item.Small_IAT"
                      @keyup.enter="subMit(item.name,'IAT',item.Small_IAT,'small',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'SMt1','small')"
                      v-show="!item.SMt1_showInput2">{{item.Small_SMt1}}</span><input autofocus="autofocus"
                      v-show="item.SMt1_showInput2" v-model="item.Small_SMt1"
                      @keyup.enter="subMit(item.name,'SMt1',item.Small_SMt1,'small',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'IMT','small')"
                      v-show="!item.IMT_showInput2">{{item.Small_IMT}}</span><input autofocus="autofocus"
                      v-show="item.IMT_showInput2" v-model="item.Small_IMT"
                      @keyup.enter="subMit(item.name,'IMT',item.Small_IMT,'small',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'OMT','small')"
                      v-show="!item.OMT_showInput2">{{item.Small_OMT}}</span><input autofocus="autofocus"
                      v-show="item.OMT_showInput2" v-model="item.Small_OMT"
                      @keyup.enter="subMit(item.name,'OMT',item.Small_OMT,'small',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'gh','small')"
                      v-show="!item.gh_showInput2">{{item.Small_gh}}</span><input autofocus="autofocus"
                      v-show="item.gh_showInput2" v-model="item.Small_gh"
                      @keyup.enter="subMit(item.name,'gh',item.Small_gh,'small',item.machine_id)" />
                  </div>

                </div>
              </div>
              <!-- fun数据表 -->
              <!-- 螺杆数据表 -->
              <div class="t-head" v-if="isluogan">
                <div class="t-con3" style="border-top:1px solid white;" v-for="(item,index) in luogan_thead"
                  :key="'luoganHead'+index">
                  <span>{{item.text}}</span></div>

              </div>
              <div style="height:45%;margin-bottom:5%" v-if="isluogan" v-for="(item,index) in luogan_tdata"
                :key="'luogan'+index">
                <div class="t-one2" style="height:33%">
                  <div class="t-con3"><span>{{item.name}}</span></div>
                  <div class="t-con3"><span>{{item. discharge_pressure}}</span></div>
                  <div class="t-con3"><span>{{item.  discharge_temperature}}</span></div>
                  <div class="t-con3"><span>{{item.runtime}}</span></div>
                  <div class="t-con3"><span>{{item.loading_time}}</span></div>

                  <div class="t-con3"><span>{{item.motor_amps}}</span></div>
                  <div class="t-con3"><span>{{item.  oil_gas_barrel_pressure}}</span></div>
                  <div class="t-con3"><span>{{item.  oil_gas_barrel_temperature}}</span></div>
                    <div class="t-con3"><span>{{item.gh}}</span></div>
                </div>
                <div class="t-one2" style="height:33%">
                  <div class="t-con"><span>最大值</span></div>
                  <div class="t-con2"><span @click=" showinput(item.name,'discharge_pressure','big')"
                      v-show="!item.discharge_pressure_showInput">{{item.Big_discharge_pressure}}</span><input
                      autofocus="autofocus" v-show="item.discharge_pressure_showInput"
                      v-model="item.Big_discharge_pressure"
                      @keyup.enter="subMit(item.name,'discharge_pressure',item.Big_discharge_pressure,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'discharge_temperature','big')"
                      v-show="!item.discharge_temperature_showInput">{{item.Big_discharge_temperature}}</span><input
                      autofocus="autofocus" v-show="item.discharge_temperature_showInput"
                      v-model="item.Big_discharge_temperature"
                      @keyup.enter="subMit(item.name,'discharge_temperature',item.Big_discharge_temperature,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'runtime','big')"
                      v-show="!item.runtime_showInput">{{item.Big_runtime}}</span><input autofocus="autofocus"
                      v-show="item.runtime_showInput" v-model="item.Big_runtime"
                      @keyup.enter="subMit(item.name,'runtime',item.Big_runtime,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'loading_time','big')"
                      v-show="!item.loading_time_showInput">{{item.Big_loading_time}}</span><input autofocus="autofocus"
                      v-show="item.loading_time_showInput" v-model="item.Big_loading_time"
                      @keyup.enter="subMit(item.name,'loading_time',item.Big_loading_time,'big',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'motor_amps','big')"
                      v-show="!item.motor_amps_showInput">{{item.Big_motor_amps}}</span><input autofocus="autofocus"
                      v-show="item.motor_amps_showInput" v-model="item.Big_motor_amps"
                      @keyup.enter="subMit(item.name,'motor_amps',item.Big_motor_amps,'big',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'oil_gas_barrel_pressure','big')"
                      v-show="!item.oil_gas_barrel_pressure_showInput">{{item.Big_oil_gas_barrel_pressure}}</span><input
                      autofocus="autofocus" v-show="item.oil_gas_barrel_pressure_showInput"
                      v-model="item.Big_oil_gas_barrel_pressure"
                      @keyup.enter="subMit(item.name,'oil_gas_barrel_pressure',item.Big_oil_gas_barrel_pressure,'big')" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'oil_gas_barrel_temperature','big')"
                      v-show="!item. oil_gas_barrel_temperature_showInput">{{item.Big_oil_gas_barrel_temperature}}</span><input
                      autofocus="autofocus" v-show="item. oil_gas_barrel_temperature_showInput"
                      v-model="item.Big_oil_gas_barrel_temperature"
                      @keyup.enter="subMit(item.name,'oil_gas_barrel_temperature',item.Big_oil_gas_barrel_temperature,'big',item.machine_id)" />
                  </div>
                  <div class="t-con2"><span @click=" showinput(item.name,'gh','big')"
                      v-show="!item.gh_showInput">{{item.Big_gh}}</span><input autofocus="autofocus"
                      v-show="item.gh_showInput" v-model="item.Big_gh"
                      @keyup.enter="subMit(item.name,'gh',item.Big_gh,'big',item.machine_id)" />
                  </div>

                </div>
                <div class="t-one2" style="height:33%">
                  <div class="t-con"><span>最小值</span></div>
                  <div class="t-con2"><span @click=" showinput(item.name,'discharge_pressure','small')"
                      v-show="!item.discharge_pressure_showInput2">{{item.Small_discharge_pressure}}</span><input
                      autofocus="autofocus" v-show="item.discharge_pressure_showInput2"
                      v-model="item.Small_discharge_pressure"
                      @keyup.enter="subMit(item.name,'discharge_pressure',item.Small_discharge_pressure,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'discharge_temperature','small')"
                      v-show="!item.discharge_temperature_showInput2">{{item.Small_discharge_temperature}}</span><input
                      autofocus="autofocus" v-show="item.discharge_temperature_showInput2"
                      v-model="item.Small_discharge_temperature"
                      @keyup.enter="subMit(item.name,'discharge_temperature',item.Small_discharge_temperature,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'runtime','small')"
                      v-show="!item.runtime_showInput2">{{item.Small_runtime}}</span><input autofocus="autofocus"
                      v-show="item.runtime_showInput2" v-model="item.Small_runtime"
                      @keyup.enter="subMit(item.name,'runtime',item.Small_runtime,'small',item.machine_id)" /></div>

                  <div class="t-con2"><span @click=" showinput(item.name,'loading_time','small')"
                      v-show="!item.loading_time_showInput2">{{item.Small_loading_time}}</span><input
                      autofocus="autofocus" v-show="item.loading_time_showInput2" v-model="item.Small_loading_time"
                      @keyup.enter="subMit(item.name,'loading_time',item.Small_loading_time,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'motor_amps','small')"
                      v-show="!item.motor_amps_showInput2">{{item.Small_motor_amps}}</span><input autofocus="autofocus"
                      v-show="item.motor_amps_showInput2" v-model="item.Small_motor_amps"
                      @keyup.enter="subMit(item.name,'motor_amps',item.Small_motor_amps,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'oil_gas_barrel_pressure','small')"
                      v-show="!item.oil_gas_barrel_pressure_showInput2">{{item.Small_oil_gas_barrel_pressure}}</span><input
                      autofocus="autofocus" v-show="item.oil_gas_barrel_pressure_showInput2"
                      v-model="item.Small_oil_gas_barrel_pressure"
                      @keyup.enter="subMit(item.name,'oil_gas_barrel_pressure',item.Small_oil_gas_barrel_pressure,'small',item.machine_id)" />
                  </div>

                  <div class="t-con2"><span @click=" showinput(item.name,'oil_gas_barrel_temperature','small')"
                      v-show="!item.oil_gas_barrel_temperature_showInput2">{{item.Small_oil_gas_barrel_temperature}}</span><input
                      autofocus="autofocus" v-show="item.oil_gas_barrel_temperature_showInput2"
                      v-model="item.Small_oil_gas_barrel_temperature"
                      @keyup.enter="subMit(item.name,'oil_gas_barrel_temperature',item.Small_oil_gas_barrel_temperature,'small',item.machine_id)" />
                  </div>
                  <div class="t-con2"><span @click=" showinput(item.name,'gh','small')"
                      v-show="!item.gh_showInput2">{{item.Small_gh}}</span><input autofocus="autofocus"
                      v-show="item.gh_showInput2" v-model="item.Small_gh"
                      @keyup.enter="subMit(item.name,'gh',item.Small_gh,'small',item.machine_id)" />
                  </div>
                </div>
              </div>
              <!-- 螺杆数据表 -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let host1 = "http://120.55.124.53";
  let host2 = "http://106.12.219.66"
  import axios from 'axios';
  import {
    formatDate
  } from "../static/js/date"; //引入时间格式化js

  export default {
    name: "productMonitor",
    data() {
      return {
        // zjList: [],
        // jsList: [],
        // zxt_data: [],
        // zxt_data2: [],
        wzzz_one:[],
        wzzz_two:[],
        lm:[],
        jem:[],
        style1:"background:rgb(234,127,23)",
        style2:"",
        chooseItem:"电力空压",
        dialogFormVisible2:false,
        Maxampshis: 0,
        Minampshis: 0,

        Maxpowerhis: 0,
        Minpowerhis: 0,
        autofocus: true,
        showboxes: true,
        ampsHisX: [],
        powerHisX: [],
        list2: [], //电流图series数据
        list3: [], //功耗图series数据
        legend: { //统计图参数
          textStyle: {
            fontSize: 18, //字体大小
            color: '#ffffff' //字体颜色
          },
          bottom: 30,
          right: 0,
          data: []
        },

        maxAmps: null, //最大电流值
        maxPower: null, //最大功耗值
        issamsung: false,
        isfun: false,
        isluogan: false,
        allshow: false,
        samsung_thead: [{
            text: "设备",
          },
          {
            text: "系统压力kg/cm2",
          },
          {
            text: "出口压力kg/cm2",
          },
          {
            text: "油压kg/cm2",
          },
          {
            text: "电机电流A",
          },
            {
            text: "卸载阀",
          },
            {
            text: "进气阀",
          },
          {
            text: "一级震动ym",
          },
          {
            text: "二级震动um",
          },
          {
            text: "供油温度℃",
          },
          {
            text: "二级进气温度℃",
          },
          {
            text: "电机绕组R温度℃",
          },
          {
            text: "电机轴承DE温度℃",
          },
          {
            text: "电机轴承NDE温度℃",
          },
          {
            text: "功耗",
          },
        ],
        samsung_tdata: [{
          name: "三星440方",
          system_pressure: "3.74", //系统压力
          stage_2_discharge_pressure: 3.88, //出口压力
          oil_supply_pressure: 3.88, //油压
          motor_current: 3.88, //电机电流
          stage_1_vibration: 3.88, //一级震动
          stage_2_vibration: 3.88, //二级震动
          oil_supply_temperature: 3.88, //供油温度
          stage_2_inlet_temperature: 3.88, //二级进气温度
          motor_winding_r_teperature: 3.88, //电机绕组R温度
          motor_bearing_de_temperature: 21, //电机轴承DE温度
          motor_bearing_nde_temperature: 21, //电机轴承NDE温度
          igv_position_open: 21, //进气调节阀
          bov_position_closed: 21, //进气阀
        }],
        fun_thead: [{
            text: "设备",
          },
          {
            text: "系统压力kg/cm2",
          },
          {
            text: "排气压力kg/cm2",
          },
          {
            text: "油压kg/cm2",
          },
          {
            text: "电机电流A",
          },
          {
            text: "低俗齿轮震动ym",
          },
          {
            text: "高速齿轮震动um",
          },
          {
            text: "进油温度℃",
          },
          {
            text: "末级级间温度℃",
          },
          {
            text: "电机定子温度℃",
          },
          {
            text: "电机前轴承温度℃",
          },
          {
            text: "电机后轴承温度℃",
          },
          {
            text: "功耗",
          },
        ],
        fun150_tdata: [{
          name: "复盛430方",
          system_pressure: "3.74", //系统压力
          discharge_pressure: 3.88, //排气压力
          oil_pressure: 3.88, //油压
          motor_current: 3.88, //电机电流
          low_speed_vibration: 3.88, //低速震动
          high_speed_vibration: 3.88, //高速震动
          inlet_oil_temperature: 3.88, //进油温度
          final_interstage_air_temperature: 3.88, //末级级间温度
          motor_stator_temperature: 3.88, //电机定子温度
          inboard_motor_bearing_temperature: 21, //电机前轴承温度
          outboard_motor_bearing_temperature: 21, //电机后轴承温度
          inlet_valve: 21, //调节阀开度%
          unloading_valve: 21, //卸荷阀开度%
        }],
        fun200_tdata: [{
          name: "复盛430方",
          system_pressure: "3.74", //系统压力
          discharge_pressure: 3.88, //排气压力
          oil_pressure: 3.88, //油压
          motor_current: 3.88, //电机电流
          low_speed_vibration: 3.88, //低速震动
          high_speed_vibration: 3.88, //高速震动
          inlet_oil_temperature: 3.88, //进油温度
          final_interstage_air_temperature: 3.88, //末级级间温度
          motor_stator_temperature: 3.88, //电机定子温度
          inboard_motor_bearing_temperature: 21, //电机前轴承温度
          outboard_motor_bearing_temperature: 21, //电机后轴承温度
          inlet_valve: 21, //调节阀开度%
          unloading_valve: 21, //卸荷阀开度%
        }],
        luogan_thead: [{
            text: "设备",
          },
          {
            text: "排气压力MAP",
          },
          {
            text: "排气温度℃",
          },
          {
            text: "运行时间H",
          },
          {
            text: "加载时间H",
          },
          {
            text: "电机电流A",
          },
          {
            text: "油气桶压力kg/cm2",
          },
          {
            text: "油气桶温度℃",
          },
          {
            text: "功耗",
          },
        ],
        luogan_tdata: [{
          name: "螺杆机",
          discharge_pressure: "3.74", //排气压力
          discharge_temperature: 3.88, //排气温度
          runtime: 3.88, //运行时间
          loading_time: 3.88, //加载时间
          motor_amps: 3.88, //电机电流
          oil_gas_barrel_pressure: 3.88, //油气桶压力
          oil_gas_barrel_temperature: 3.88, //油气桶温度
        }],
        maxValue: "",
        minValue: "",
        maxValue2: "",
        minValue2: "",
        lang: 'zh',
        workshopId: '',
        // src2: '',//设备状态图
        workshopList: [], // 车间编号
        // chartWorkshopList: [],// 图表车间数组
        dialogFormVisible: false, //对话框
        deviceHeight: '', //iframe外层div高度
        deviceWidth: '', //iframe外层div宽度
        date: new Date(),
        // url: window.apiRoot.api_board,
        companyId: this.$route.params.id, //公司库表Id
        buttonName: 'zh-CN',
        // zongchanlaingduibi: true,//总产量推移界面
        // chanliangtuyi: true,//产量对比界面
        // warp_page: true,//整经监控界面
        // sizing_page: false,//浆纱监控界面
        // warpDetail_page: false,//整经详细界面
        // sizingDetail_page: false,//浆纱详细界面
        // currentLength: 2900,//当前长度
        // totalLength: 4500,//总共长度
        // tableData: [],  //预警表
        // lioajiData: [],//了机数据
        // lioajiIngData: [],//当前了机
        // activeName: 'first',//预警区域选项
        //===================整经浆纱数据===========================
        // warp: [],
        // warp1: {},
        // warp2: {},
        // warp3: {},
        // warp4: {},
        // sizing: [],
        // sizing1: {},
        // sizing2: {},
        // sizingDetail: {},
        // machineId: '',

        //===================整经浆纱数据===========================

        //===================产量推移数据===========================
        // productMonths: [],
        // totalProductSeries: [],
        //===================产量推移数据结束===========================


        //===================问题聚焦===========================
        // problemOptions: [{value: '4', label: '效率优秀设备'}, {value: '5', label: '产量优秀设备'}, {
        //   value: '1',
        //   label: '效率落后设备'
        // }, {value: '2', label: '产量落后设备'}, {value: '3', label: '断头落后设备'}],//问题种类选项
        // problemDefaultValue: '4',//问题默认值
        // maxEfficiency: '95',//最高效率
        // avgEfficiency: '89',//平均效率
        // machineEfficiency: [//机器号 开机效率
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},
        //   {machineNum: '', openEfficiency: ''},

        // ],//效率落后设备
        // machineChanliangb: [
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        //   {machineNum: '', chanliangb: ''},
        // ],//产量落后设备

        // //===================问题聚焦===========================


        // //===================报警设备===========================
        // unusualStop: [],
        // //===================报警设备===========================

        // //===================总产量对比===========================
        // yesProducton: [],//昨日总产量
        // yesProductonXs: [],//昨日折标总产量
        // todProduction: [],//今日总产量
        // todProductionXs: [],//今日折标总产量
        // sumTodProduction: '',//今日四个车间总产量
        // sumTodProductionXs: '',//今日四个车间总产量折标
        // //===================总产量对比===========================
        // maxChartEfficiency:'',
        // minChartEfficiency:'',/
        WarningMessagesList: [],
        showEle:true,
        currentMachine:"JEMKYJ01",
        dayList:[
    

        ],
        currentDay:"",
        workshoplist:[
          {
            name:'佳而美',
            id:1,
            style:"background:rgb(234,127,23)"
          },
           {
            name:'兰棉',
            id:2,
            style:""
          },
           {
            name:'万舟织造一部',
            id:4,
            style:""
          },
           {
            name:'万舟织造二部',
            id:5,
            style:""
          }
        ],
        lgjList:[]
      }
    },
    methods: {
      show2(id){
        console.log(id) //车间id
        for(let i=0;i<this.workshoplist.length;i++){ //切换样式
          if(this.workshoplist[i].id==id){
               for(let j=0;j<this.workshoplist.length;j++){
         
            
            this.workshoplist[j].style=""
          
        }
            this.workshoplist[i].style="background:rgb(234,127,23)"
          }
        }
        let that=this
            axios({
            url: window.apiRoot.get_table+':8227/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
companyId:"10000005"
            },
            data: {
              tableName:"freezing_dryer",
             query:{
             
               workshop:id
             },
     
             
            }

          })
          .then(response => {
            for(let i=0;i<response.data.data.length;i++){
              response.data.data[i].dew_point_temperature=(response.data.data[i].dew_point_temperature*0.1).toFixed(1)
            }
            that.lgjList=response.data.data
          })

      },
      getWarningMessages() {
        let that = this
        axios({
            url: window.apiRoot.api_board + ":7070/wanzhou/getWarningMessages",
            method: 'post',
            data: {
              "limit": 20
            },
            headers: {
              'Content-Type': 'application/json',

            },

          })
          .then(response => {

            for (let i = 0; i < response.data.data.length; i++) {
              response.data.data[i].createTime = new Date(response.data.data[i].createTime)
              response.data.data[i].createTime = (response.data.data[i].createTime.getMonth() + 1) + "-" + response
                .data.data[i].createTime.getDate() + " " + response.data.data[i].createTime.getHours() + ":" +
                response.data.data[i].createTime.getMinutes()
              that.WarningMessagesList.push(response.data.data[i])
            }
            //////console.log(that.WarningMessagesList)
          })
          .then(() => {


          })
      },
      chart(machine_id){
        this.currentMachine=machine_id
      this.getStartRatesYMD(this.showEle,this.currentMachine,this.currentDay)
      },
      showbox() {
          ////console.log("dsa")
        this.showboxes = !this.showboxes
        this.getKongyaji(this.workshopId) //获取表格数据
      
        this.getWarningRange(this.workshopId) //获取电流最大最小警戒值
      },
      toSubstation(value) {
        this.chooseItem=value
        if(value=="变电所图"){
 this.$router.push({
          path: '/Substation/' + this.companyId
        })
        }else{
      this.dialogFormVisible2=false
        }
       
      },
      showinput(tableName, data, isbig) {
        let that = this
        //////console.log(tableName)
        //////console.log(data)
        //////console.log(isbig)
        let input = data + "_showInput"
        let input2 = data + "_showInput2"
        //////console.log(input2)
        for (let i = 0; i < that.samsung_tdata.length; i++) {
          if (that.samsung_tdata[i].name == tableName) {
            if (isbig == "big") {
              that.samsung_tdata[i][input] = true
            } else {
              that.samsung_tdata[i][input2] = true
            }

            return
          }
        }
        for (let i = 0; i < that.fun150_tdata.length; i++) {
          if (that.fun150_tdata[i].name == tableName) {
            if (isbig == "big") {
              that.fun150_tdata[i][input] = true
            } else {
              that.fun150_tdata[i][input2] = true
            }
            return
          }
        }
        for (let i = 0; i < that.fun200_tdata.length; i++) {
          if (that.fun200_tdata[i].name == tableName) {
            if (isbig == "big") {
              that.fun200_tdata[i][input] = true
            } else {
              that.fun200_tdata[i][input2] = true
            }
            return
          }
        }
        for (let i = 0; i < that.luogan_tdata.length; i++) {
          if (that.luogan_tdata[i].name == tableName) {
            //////console.log(isbig)
            if (isbig == "big") {
              that.luogan_tdata[i][input] = true
            } else {
              that.luogan_tdata[i][input2] = true
            }
            //////console.log(that.luogan_tdata)
            return
          }
        }
      },
      subMit(tableName, data, value, isbig, machineId) {
        let that = this
        //////console.log(tableName)
        //////console.log(data)
        //////console.log(value)
        //////console.log(isbig)

        //////console.log(machineId)
        let json;
        let columnName = data
        if (isbig == "big") {
          json = { //最大值
            // workshopid: workshopId
            "machineId": machineId,
            "columnName": columnName,
            "warningType": 0,
            "warningValue": value,
            "machineType": 0
          }
        } else {
          json = { //最小值
            // workshopid: workshopId
            "machineId": machineId,
            "columnName": columnName,
            "warningType": 1,
            "warningValue": value,
            "machineType": 0
          }
        }
        let url = window.apiRoot.api_board + ":7070/wanzhou/setWarningRange"

        axios({
            url: url,
            method: 'post',
            data: json,
            headers: {
              'Content-Type': 'application/json',

            },

          })
          .then(response => {
            //////console.log(response)
            if (response.data.successMessage == "success") {
              this.$message({
                showClose: true,
                message: '设置成功！',
                type: 'success'
              });
            }
          })
          .then(() => {


          })
        let input = data + "_showInput"
        let input2 = data + "_showInput2"
        for (let i = 0; i < that.samsung_tdata.length; i++) {
          if (that.samsung_tdata[i].name == tableName) {

            if (isbig == "big") {

              that.samsung_tdata[i][input] = false
            } else {
              that.samsung_tdata[i][input2] = false
            }
            //////console.log(that.samsung_tdata[i])
            return
          }
        }
        for (let i = 0; i < that.fun150_tdata.length; i++) {
          if (that.fun150_tdata[i].name == tableName) {
            if (isbig == "big") {

              that.fun150_tdata[i][input] = false
            } else {
              that.fun150_tdata[i][input2] = false
            }
            //////console.log(that.fun150_tdata[i].Big_system_pressure)
            return
          }
        }
        for (let i = 0; i < that.fun200_tdata.length; i++) {
          if (that.fun200_tdata[i].name == tableName) {
            if (isbig == "big") {

              that.fun200_tdata[i][input] = false
            } else {
              that.fun200_tdata[i][input2] = false
            }
            //////console.log(that.fun200_tdata[i].Big_system_pressure)
            return
          }
        }
        for (let i = 0; i < that.luogan_tdata.length; i++) {
          if (that.luogan_tdata[i].name == tableName) {
            if (isbig == "big") {

              that.luogan_tdata[i][input] = false
            } else {
              that.luogan_tdata[i][input2] = false
            }
            //////console.log(that.luogan_tdata)
            return
          }
        }
      },

      show(e, flag) {
          this.showEle=flag
        if (flag == true) {
          this.getStartRatesYMD(this.showEle,this.currentMachine,this.currentDay) //电流图显示
          this.style1="background:rgb(234,127,23)"
          this.style2=""
        } else {
          this.getStartRatesYMD(this.showEle,this.currentMachine,this.currentDay) //排气压力图显示
              this.style2="background:rgb(234,127,23)"
              this.style1=""
        }
      },
      getKongyaji(workshopId) {
        let that = this
        that.samsung_tdata = [] //表格数据清空
        that.fun150_tdata = []
        that.fun200_tdata = []
        that.luogan_tdata = []
        let url = host1 + ":7070/wanzhou//getKongyaji"
        axios({
            url: url,
            method: 'post',
            data: {
              // workshopid: workshopId
            },
            headers: {
              'Content-Type': 'application/json',

            },

          })
          .then(response => {
           console.log(response)
            let result = response.data.data
            let flag = null
            //三星数据处理
            if (result.samsung.length > 0) {
              for (let i = 0; i < result.samsung.length; i++) {
                if (result.samsung[i].machine_id == undefined) { //machineid非undefined处理
                  result.samsung[i].machine_id = ""
                }
                result.samsung[i].name = "三星" + result.samsung[i].machine_id //设备名字拼接
                result.samsung[i].machineId = result.samsung[i].machine_id
                result.samsung[i].showInput = false
                   
               console.log(that.workshopList)
               for(let j=0;j<that.workshopList.length;j++){
                 if(that.workshopList[j].value==result.samsung[i].workshop){
                   result.samsung[i].workshop=that.workshopList[j].label
                 }
               }
               if(result.samsung[i].workshop==3){
                  result.samsung[i].name = "寿力" + result.samsung[i].machine_id //设备名字拼接
                 result.samsung[i].workshop="万舟纺纱事业部"
               }
                that.samsung_tdata.push(result.samsung[i])
              }
              that.issamsung = true
            }

            //螺杆数据处理
            if (result.luogan.length > 0) {
              for (let i = 0; i < result.luogan.length; i++) {
                if (result.luogan[i].machine_id == undefined) {
                  result.luogan[i].machine_id = ""
                }
                // result.luogan[i].discharge_pressure=(result.luogan[i].discharge_pressure/100).toFixed(1)
                //  result.luogan[i].discharge_temperature=( result.luogan[i].discharge_temperature/10).toFixed(1)
                //  result.luogan[i].motor_amps=(  result.luogan[i].motor_amps/10).toFixed(1)
                //  result.luogan[i].oil_gas_barrel_pressure=(result.luogan[i].oil_gas_barrel_pressure/100).toFixed(1)
                //  result.luogan[i].oil_gas_barrel_temperature=(result.luogan[i].oil_gas_barrel_temperature/10).toFixed(1)
                result.luogan[i].name = "螺杆" + result.luogan[i].machine_id
                result.luogan[i].showInput = false
                for(let j=0;j<that.workshopList.length;j++){
                 if(that.workshopList[j].value==result.luogan[i].workshop){
                 result.luogan[i].workshop=that.workshopList[j].label
                 }
               }
                that.luogan_tdata.push(result.luogan[i])
              }
              that.isluogan = true
            }
            //复盛数据处理
            for (var key in result) { //如果fun的数组都为空，则隐藏这些表

              if (key.indexOf("fun") != -1) {
                //////console.log(key)
                if (result[key].length > 0) {
                  flag = true
                } else {
                  flag = false;
                  return
                }

              }

            }
            let con = [] //存储fun3的调节阀开度%，卸荷阀开度%字段
            if (flag == true) {
              for (var key in result) {

                if (key.indexOf("fun") != -1) { //检测的是fun表的

                  for (let i = 0; i < result[key].length; i++) {
                    //////console.log(key)
                    if (key.indexOf("r150fun3") != -1) { //检测的是r150型号fun3表的,将字段都放入fun150_tdata显示，因为150型号的显示字段都在fun3表
                      if (result[key][i].machine_id == undefined) {
                        result[key][i].machine_id = ""
                      }
                             for(let j=0;j<that.workshopList.length;j++){
                 if(that.workshopList[j].value==result[key][i].workshop){
                result[key][i].workshop=that.workshopList[j].label
                 }
               }
                      result[key][i].name = "复盛" + result[key][i].machine_id
                      result[key][i].showInput = false
                  //  result[key][i].system_pressure =  (result[key][i].system_pressure/14.2698).toFixed(1)
                  //        result[key][i].discharge_pressure =  (result[key][i].discharge_pressure/14.2698).toFixed(1)
                  //              result[key][i].oil_pressure =  (result[key][i].oil_pressure/14.2698).toFixed(1)
                      that.fun150_tdata.push(result[key][i])
                    } else if (key.indexOf("r200fun3") != -1) { //检测的是r200型号fun3表的，调节阀开度%，卸荷阀开度%字段都在这个表，所以取出来放在con暂存
                      result[key][i].valve_position = result[key][i].valve_position / 100
                      result[key][i].unloading_valve_position = result[key][i].unloading_valve_position / 100
                      result[key][i].showInput = false
                          //  result[key][i].MAT=(result[key][i].MAT/50).toFixed(1)
                      con.push(result[key][i])
                    } else if (key.indexOf("r200fun4") != -1) {
                      if (result[key][i].machine_id ==
                        undefined) { //检测的是r200型号fun4表的，其他需要显示都在fun4表，取出来放到fun200_tdata里
                        result[key][i].machine_id = ""
                      }
              //  result[key][i].MAT=(result[key][i].MAT/50).toFixed(1)-0
                      result[key][i].showInput = false
                      // result[key][i].DPT = (result[key][i].DPT / 715).toFixed(1)
                      // result[key][i].OPT = (result[key][i].OPT / 1450).toFixed(1)
                      // result[key][i].LVT = (result[key][i].LVT / 100).toFixed(1)
                      // result[key][i].HVT = (result[key][i].HVT / 100).toFixed(1)
                      // result[key][i].IOT = (result[key][i].IOT / 50).toFixed(1)
                      // result[key][i].IAT = (result[key][i].IAT / 60).toFixed(1)
                      // if (result[key][i].machine_ip == "192.168.88.108") {
                      //   result[key][i].MAT = (result[key][i].MAT / 100).toFixed(1)
                      // } else if (result[key][i].machine_ip == "192.168.88.110") {
                      //   result[key][i].MAT = (result[key][i].MAT / 50).toFixed(1)
                      // }
                      result[key][i].name = "复盛" + result[key][i].machine_id
                      that.fun200_tdata.push(result[key][i])
                    }

                  }


                }

              }
            }
            //////console.log(con)

            for (let j = 0; j < that.fun200_tdata.length; j++) {
              for (let i = 0; i < con.length; i++) {
                if (con[i].machine_id == that.fun200_tdata[j].machine_id) {
                  that.fun200_tdata[j].valve_position = con[i].valve_position
   that.fun200_tdata[j].workshop = con[i].workshop_id
 
                  that.fun200_tdata[j].unloading_valve_position = con[i].unloading_valve_position
                }
              }
            }
            for(let i=0;i<that.fun200_tdata.length;i++){
                          for(let j=0;j<that.workshopList.length;j++){
                 if(that.workshopList[j].value==that.fun200_tdata[i].workshop){
               that.fun200_tdata[i].workshop=that.workshopList[j].label
                 }
               }
            }

            // ////console.log(that.samsung_tdata)
            // ////console.log(that.fun150_tdata)
            // ////console.log(that.fun200_tdata)
            // ////console.log(that.luogan_tdata)
            let listCon=[]
            let jem=[]
            let lm=[]
            let wzzz_one=[]
            let wzzz_two=[]
               console.log(listCon)
            for(let i=0;i<that.samsung_tdata.length;i++){
              that.samsung_tdata[i].cardClass="card_four"
                  that.samsung_tdata[i].tname="samsung"
                
              listCon.push(that.samsung_tdata[i])
            }
                 for(let i=0;i<that.fun150_tdata.length;i++){
              that.fun150_tdata[i].cardClass="card_three"
                  that.fun150_tdata[i].tname="fun150"
              listCon.push(that.fun150_tdata[i])
            }
                  for(let i=0;i<that.fun200_tdata.length;i++){
              that.fun200_tdata[i].cardClass="card_two"
                 that.fun200_tdata[i].tname="fun200"
              listCon.push(that.fun200_tdata[i])
            }
                 for(let i=0;i<that.luogan_tdata.length;i++){
              that.luogan_tdata[i].cardClass="card_one"
                 that.luogan_tdata[i].tname="luogan"
              listCon.push(that.luogan_tdata[i])
            }
          
        
           for(let i=0;i<listCon.length;i++){
              if(listCon[i].workshop=="万舟织造二部"){
 
  wzzz_two.push(listCon[i])
              }
             if(listCon[i].workshop=="佳而美"){
               jem.push(listCon[i])
             }else if(listCon[i].workshop=="万舟纺纱事业部"){
   jem.push(listCon[i])
             }else if(listCon[i].workshop=="兰棉"){
   lm.push(listCon[i])
             }else if(listCon[i].workshop=="万舟织造一部"){
   wzzz_one.push(listCon[i])
             }
           }
           
        
            that.jem=jem.reverse()
         
            that.lm=lm
            that.wzzz_one=wzzz_one
            console.log(wzzz_two)
           that.wzzz_two=wzzz_two
               
            that.isfun = flag
           
    
       if(that.showEle==true){ //定时器判断时判断时哪个统计图，不改变统计图tab状态
              that.style1="background:rgb(234,127,23)"
          that.style2=""
       }else{
              that.style2="background:rgb(234,127,23)"
          that.style1=""
       }
          that.getStartRatesYMD(that.showEle,that.currentMachine,that.currentDay)
            
     
          })
          .then(() => {
            if (that.issamsung == false && that.isfun == false && that.isluogan == false) { //如果表格没数据都隐藏则整个div隐藏
              that.allshow = false
            } else {
              that.allshow = true
            }

          })
      },
      renderTime(date) {
        var dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      },
      toDate(time) {

        time = time.replace(/-/g, "/");
        let date = new Date(time);
        return date
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
// getDay(flag){
//   var day1 = new Date();
//   let m=""
//   let d=""
// if(flag=="今天"){
//   day1.setTime(day1.getTime());

// }else if(flag=="昨天"){
// day1.setTime(day1.getTime()-24*60*60*1000);

// }else if(flag=="明天"){
//   day1.setTime(day1.getTime()+24*60*60*1000);
// }
//   if((day1.getMonth()+1)<10){
//     m="0"+(day1.getMonth()+1)
//   }else{
//     m=(day1.getMonth()+1)
//   }
//     if((day1.getDate())<10){
//     d="0"+(day1.getDate())
//   }else{
//     d=(day1.getDate())
//   }

// return(day1.getFullYear()+"-" + (m) + "-" + d) ;
// },
      getStartRatesYMD( fla,machine_id,d) {//哪个统计图（true表示电流，false表示排气压力），machineid，哪一天
        let _this = this;
     
      // let day=_this.getDay(d)
      // //console.log(day)
    
        ////console.log(_this.jem[0].machine_id)
           axios({
            url: window.apiRoot.get_table+':8227/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
companyId:"10000005"
            },
            data: {
              tableName:"air_compressor_his",
             query:{
             
                machine_id:machine_id
             },
             selectLikeFields:{
               update_time:d
             }
             
            }

          })
          .then(response => {
             //console.log(response.config)
            let legend=[]
            let ampsHisX=[]
            let series1=[
              {
        data: [],
        type: 'line',
        smooth: true,
        name:machine_id
    }
            ]
             let series2=[
              {
        data: [],
        type: 'line',
        smooth: true,
        name:machine_id
    }
            ]
            legend.push(machine_id)
            for(let i=0;i<response.data.data.length;i++){
                series1[0].data.push(response.data.data[i].motor_amps)
                 series2[0].data.push(response.data.data[i].discharge_pressure)
                 ampsHisX.push(response.data.data[i].update_time.substr(11,2))
            }
         
            if(fla==true){
              _this.zhexian(legend,ampsHisX,series1,fla)
            }else{
              _this.zhexian(legend,ampsHisX,series2,fla)
            }
          })
        // axios({
        //     url: host1 + ':7070/wanzhou/getLineChart',
        //     method: 'post',
        //     headers: {
        //       'Content-Type': 'application/json',

        //     },
        //     data: {
        //       workshopid: workshopId
        //     }

        //   })
        //   .then(response => {
        //     //////console.log(response);
        //     //////console.log(_this.maxValue)
        //     //////console.log(_this.maxValue2)

        //     let list = response.data.data;
        //     /* 数据处理代码 */
        //     let list2 = [] //ampsHis
        //     let list3 = [] //powerHis

        //     for (let i = 0; i < list.length; i++) { //machineid图例数据数组

        //       for (let key in list[i]) {

        //         if (list[i][key].ampsHis.length > 0 || list[i][key].powerHis.length > 0) { //有数据才显示lengend
        //           _this.legend.data[i] = key
        //         }
        //       }

        //     }

        //     for (let i = 0; i < list.length; i++) {



        //       for (let key in list[i]) {
        //         //////console.log(key + ":" + list[i][key])

        //         let json, json2;
        //         if (i == 0) { //第一条线加上警戒线
        //           json = {
        //             name: "",
        //             type: 'line', // 设置数据显示类型,分为line,bar,pie

        //             markPoint: {
        //               symbolSize: [68, 58],
        //               data: [{
        //                 type: 'max',
        //                 name: '最大值'
        //               }],
        //               label: {
        //                 normal: {
        //                   formatter: '{c}%'
        //                 }
        //               }
        //             },
        //             markLine: {
        //               symbol: ['none', 'none'], //去掉箭头
        //               itemStyle: {
        //                 normal: {
        //                   lineStyle: { //全局的样式
        //                     type: 'solid',
        //                     width: 2 // 线条高度
        //                   },
        //                 }
        //               },
        //               data: [{
        //                   yAxis: _this.maxValue,
        //                   itemStyle: {
        //                     normal: {
        //                       color: 'red'
        //                     }
        //                   },
        //                   label: { // 线条提示字体
        //                     show: true,
        //                     position: 'end',
        //                     formatter: '越限上线',
        //                     color: '#ff3040'
        //                   }
        //                 },
        //                 {
        //                   yAxis: _this.minValue,
        //                   itemStyle: {
        //                     normal: {
        //                       color: 'blue'
        //                     }
        //                   },
        //                   label: {
        //                     show: true,
        //                     position: 'end',
        //                     formatter: '越限下线',
        //                     color: '#ff3040'
        //                   }
        //                 }
        //               ]
        //             },
        //             data: []
        //           }
        //           json2 = {
        //             name: "",
        //             type: 'line', // 设置数据显示类型,分为line,bar,pie

        //             markPoint: {
        //               symbolSize: [68, 58],
        //               data: [{
        //                 type: 'max',
        //                 name: '最大值'
        //               }],
        //               label: {
        //                 normal: {
        //                   formatter: '{c}%'
        //                 }
        //               }
        //             },
        //             markLine: {
        //               symbol: ['none', 'none'], //去掉箭头
        //               itemStyle: {
        //                 normal: {
        //                   lineStyle: { //全局的样式
        //                     type: 'solid',
        //                     width: 2 // 线条高度
        //                   },
        //                 }
        //               },
        //               data: [{
        //                   yAxis: _this.maxValue2,
        //                   itemStyle: {
        //                     normal: {
        //                       color: 'red'
        //                     }
        //                   },
        //                   label: { // 线条提示字体
        //                     show: true,
        //                     position: 'end',
        //                     formatter: '越限上线',
        //                     color: '#ff3040'
        //                   }
        //                 },
        //                 {
        //                   yAxis: _this.minValue2,
        //                   itemStyle: {
        //                     normal: {
        //                       color: 'blue'
        //                     }
        //                   },
        //                   label: {
        //                     show: true,
        //                     position: 'end',
        //                     formatter: '越限下线',
        //                     color: '#ff3040'
        //                   }
        //                 }
        //               ]
        //             },
        //             data: []
        //           }
        //         } else {
        //           json = {
        //             name: "",
        //             type: 'line', // 设置数据显示类型,分为line,bar,pie

        //             markPoint: {
        //               symbolSize: [68, 58],
        //               data: [{
        //                 type: 'max',
        //                 name: '最大值'
        //               }],
        //               label: {
        //                 normal: {
        //                   formatter: '{c}%'
        //                 }
        //               }
        //             },
        //             data: []
        //           }
        //           json2 = {
        //             name: "",
        //             type: 'line', // 设置数据显示类型,分为line,bar,pie

        //             markPoint: {
        //               symbolSize: [68, 58],
        //               data: [{
        //                 type: 'max',
        //                 name: '最大值'
        //               }],
        //               label: {
        //                 normal: {
        //                   formatter: '{c}%'
        //                 }
        //               }
        //             },
        //             markLine: { // 警戒线
        //               symbol: ['none', 'none'], //去掉箭头
        //               itemStyle: {
        //                 normal: {
        //                   lineStyle: { //全局的样式
        //                     type: 'solid',
        //                     width: 2 // 线条高度
        //                   },
        //                 }
        //               },
        //               data: [{
        //                   yAxis: _this.maxValue2,
        //                   itemStyle: {
        //                     normal: {
        //                       color: 'red'
        //                     }
        //                   },
        //                   label: { // 线条提示字体
        //                     show: true,
        //                     position: 'end',
        //                     formatter: '越限上线',
        //                     color: '#ff3040'
        //                   }
        //                 },
        //                 {
        //                   yAxis: _this.minValue2,
        //                   itemStyle: {
        //                     normal: {
        //                       color: 'blue'
        //                     }
        //                   },
        //                   label: {
        //                     show: true,
        //                     position: 'end',
        //                     formatter: '越限下线',
        //                     color: '#ff3040'
        //                   }
        //                 }
        //               ]
        //             },
        //             data: []
        //           }
        //         }

        //         json.name = key
        //         for (let j = 0; j < list[i][key].ampsHis.length; j++) { //电流数据处理

        //           list[i][key].ampsHis[j].create_time = _this.toDate(_this.renderTime(list[i][key].ampsHis[j]
        //               .create_time))
        //             .getHours()
        //           if (list[i][key].ampsHis[j].create_time == 0) { //如果小时数是0就转为24
        //             list[i][key].ampsHis[j].create_time = 24
        //           }
        //           // json.time[j] = list[i][key].ampsHis[j].create_time
        //           // json.data[j] = list[i][key].ampsHis[j].motor_amps
        //           json.data[j] = [list[i][key].ampsHis[j].create_time - 1, list[i][key].ampsHis[j]
        //             .motor_amps
        //           ] //第一个为时间的对应下标，第二个为数值
        //         }

        //         list2.push(json)


        //         json2.name = key
        //         for (let j = 0; j < list[i][key].powerHis.length; j++) { //功耗数据处理

        //           list[i][key].powerHis[j].create_time = _this.toDate(_this.renderTime(list[i][key].powerHis[j]
        //               .create_time))
        //             .getMinutes()
        //           if (list[i][key].powerHis[j].create_time == 0) {
        //             list[i][key].powerHis[j].create_time = 60
        //           }
        //           // json2.time[j] = list[i][key].powerHis[j].create_time
        //           // json2.data[j] = list[i][key].powerHis[j].power_consumption
        //           json2.data[j] = [list[i][key].powerHis[j].create_time - 1, list[i][key].powerHis[j]
        //             .power_consumption
        //           ]
        //         }
        //         list3.push(json2)
        //       }

        //     }

        //     /* 数据处理代码 */
        //     //////console.log(list)
        //     //////console.log(list2) //ampshis的统计图数据]
        //     let bigList = []
        //     let bigList2 = []
        //     for (let j = 0; j < list2.length; j++) {
        //       for (let i = 0; i < list2[j].data.length; i++) {
        //         bigList.push(list2[j].data[i][1])
        //       }
        //     }
        //     let Maxampshis = Math.max(...bigList)
        //     let Minampshis = Math.min(...bigList)
        //     //////console.log(Maxampshis)
        //     //////console.log(Minampshis)
        //     for (let j = 0; j < list3.length; j++) {
        //       for (let i = 0; i < list3[j].data.length; i++) {
        //         bigList2.push(list3[j].data[i][1])
        //       }
        //     }
        //     let Maxpowerhis = Math.max(...bigList2)
        //     let Minpowerhis = Math.min(...bigList2)

        //     _this.Maxampshis = Maxampshis
        //     _this.Minampshis = Minampshis

        //     _this.Maxpowerhis = Maxpowerhis
        //     _this.Minpowerhis = Minpowerhis

        //     //////console.log(list3) //powerhis的统计图数据
        //     _this.list2 = list2
        //     _this.list3 = list3
        //     if (fla == true) { //如果传e，e-charts就画电流的option
        //       _this.zhexian("e")
        //     } else {
        //       _this.zhexian("g") //如果传g，e-charts就画功耗的option
        //     }


        



          // })
          // .then(() => {

          // })
      },
      // change() { //电流最大值最小值输入框改变事件
      //   //////console.log(this.maxValue)
      //   //////console.log(this.maxAmps)
      //   this.setWarningRange(this.workshopId)

      //   // if (this.maxValue > this.maxAmps) {
      //   //   this.$message({
      //   //     showClose: true,
      //   //     message: '警戒值过大，请重新输入！',
      //   //     type: 'warning'
      //   //   });
      //   //   this.maxValue = ""
      //   // } else {
      //   //   this.zhexian()
      //   // }
      //   this.getStartRatesYMD(this.workshopId) //获取统计图数据


      // },
      getWarningRange(workshopId) { //电流取最大最小警戒值
        let that = this
        axios({
            url: window.apiRoot.api_board + ':7070/wanzhou/getWarningRange',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              // workshopid: workshopId
              "machineType": 0
            }

          })
          .then(response => {

            setTimeout(() => {
              let Biglist = []
              let Smalllist = []

              let Biglist2 = []
              let Smalllist2 = []
              for (let i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].columnName == "MAT" || response.data.data[i].columnName ==
                  "motor_amps" || response.data.data[i].columnName == "motor_current") { //电流最大最小值列表
                  if (response.data.data[i].warningType == 0) {
                    if (response.data.data[i].warningValue != null) {
                      Biglist.push(response.data.data[i].warningValue)
                    }

                  } else if (response.data.data[i].warningType == 1) {
                    if (response.data.data[i].warningValue != null) {
                      Smalllist.push(response.data.data[i].warningValue)
                    }


                  }
                }
                if (response.data.data[i].columnName == "gh") { //功耗最大最小值列表
                  if (response.data.data[i].warningType == 0) {
                    if (response.data.data[i].warningValue != null) {
                      Biglist2.push(response.data.data[i].warningValue)
                    }
                  } else if (response.data.data[i].warningType == 1) {
                    if (response.data.data[i].warningValue != null) {
                      Smalllist2.push(response.data.data[i].warningValue)
                    }
                  }
                }

                for (let j = 0; j < that.samsung_tdata.length; j++) {


                  if (that.samsung_tdata[j].machine_id == response.data.data[i].machineId) {
                    if (response.data.data[i].warningType == 0 && (response.data.data[i].columnName != null)) {
                      that.samsung_tdata[j]["Big_" + response.data.data[i].columnName] = response.data.data[i]
                        .warningValue
                    } else if (response.data.data[i].warningType == 1 && (response.data.data[i].columnName !=
                        null)) {
                      that.samsung_tdata[j]["Small_" + response.data.data[i].columnName] = response.data.data[i]
                        .warningValue
                    }


                  }
                }
                for (let k = 0; k < that.fun150_tdata.length; k++) {
                  if (that.fun150_tdata[k].machine_id == response.data.data[i].machineId) {
                    if (response.data.data[i].warningType == 0 && (response.data.data[i].columnName != null)) {
                      that.fun150_tdata[k]["Big_" + response.data.data[i].columnName] = response.data.data[i]
                        .warningValue
                    } else if (response.data.data[i].warningType == 1 && (response.data.data[i].columnName !=
                        null)) {
                      that.fun150_tdata[k]["Small_" + response.data.data[i].columnName] = response.data.data[i]
                        .warningValue
                    }


                  }

                }
                for (let l = 0; l < that.fun200_tdata.length; l++) {
                  if (that.fun200_tdata[l].machine_id == response.data.data[i].machineId) {
                    if (response.data.data[i].warningType == 0 && (response.data.data[i].columnName != null)) {
                      that.fun200_tdata[l]["Big_" + response.data.data[i].columnName] = response.data.data[i]
                        .warningValue
                    } else if (response.data.data[i].warningType == 1 && (response.data.data[i].columnName !=
                        null)) {
                      that.fun200_tdata[l]["Small_" + response.data.data[i].columnName] = response.data.data[i]
                        .warningValue
                    }


                  }
                }
                for (let m = 0; m < that.luogan_tdata.length; m++) {
                  if (that.luogan_tdata[m].machine_id == response.data.data[i].machineId) {
                    if (response.data.data[i].warningType == 0 && (response.data.data[i].columnName != null)) {
                      that.luogan_tdata[m]["Big_" + response.data.data[i].columnName] = response.data.data[i]
                        .warningValue
                    } else if (response.data.data[i].warningType == 1 && (response.data.data[i].columnName !=
                        null)) {
                      that.luogan_tdata[m]["Small_" + response.data.data[i].columnName] = response.data.data[i]
                        .warningValue
                    }


                  }
                }
              }



              that.maxValue = Math.max(...Biglist)
              that.minValue = Math.min(...Smalllist)
              that.maxValue2 = Math.max(...Biglist2)
              that.minValue2 = Math.min(...Smalllist2)

              if (that.maxValue == Infinity) {
                that.maxValue = 0
              }
              if (that.minValue == Infinity) {
                that.minValue = 0
              }
              if (that.maxValue2 == Infinity) {
                that.maxValue2 = 0
              }
              if (that.minValue2 == Infinity) {
                that.minValue2 = 0
              }



              // that.getStartRatesYMD(that.workshopId, true) //获取统计图数据
            }, 1000);


            //////console.log(that.samsung_tdata)
            //////console.log(that.fun150_tdata)
            //////console.log(that.fun200_tdata)
            //////console.log(that.luogan_tdata)
            // if (response.data.data.highWarning) {
            //   that.maxValue = response.data.data.highWarning
            // } else {
            //   that.maxValue = 0
            // }
            // if (response.data.data.lowWarning) {
            //   that.minValue = response.data.data.lowWarning
            // } else {
            //   that.minValue = 0
            // }

          })
          .then(() => {

          })
      },

      setWarningRange(workshopId) { //电流设置最大最小警戒值
        let that = this


        axios({
            url: host1 + ':7070/wanzhou/setWarningRange',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',

            },
            data: {
              highWarning: that.maxValue,
              lowWarning: that.minValue,
              workshopid: workshopId
            }

          })
          .then(response => {
            //////console.log(response)
            if (response.data.successMessage == "success") {
              this.$message({
                showClose: true,
                message: '设置成功！',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '设置失败！',
                type: '  warning'
              });

            }

          })
          .then(() => {

          })
      },

      // change2() { //功耗最大值最小值输入框改变事件
      //   //////console.log(this.maxValue2)
      //   //////console.log(this.minValue2)
      //   this.setWarningRange1(this.workshopId)
      //   // if (this.maxValue2 > this.maxPower) {
      //   //   this.$message({
      //   //     showClose: true,
      //   //     message: '警戒值过大，请重新输入！',
      //   //     type: 'warning'
      //   //   });
      //   //   this.maxValue2 = ""
      //   // } else {
      //   //   this.zhexian2()
      //   // }
      //   this.getStartRatesYMD(this.workshopId) //获取统计图数据
      //   // this.zhexian2()
      // },
      // getWarningRange1(workshopId) { //电流取最大最小警戒值
      //   let that = this
      //   axios({
      //       url: host1 + ':7070/wanzhou/getWarningRange1',
      //       method: 'post',
      //       headers: {
      //         'Content-Type': 'application/json',

      //       },
      //       data: {
      //         workshopid: workshopId
      //       }

      //     })
      //     .then(response => {
      //       //////console.log(response)

      //       if (response.data.data.highWarning) {
      //         that.maxValue2 = response.data.data.highWarning
      //       } else {
      //         that.maxValue2 = 0
      //       }
      //       if (response.data.data.lowWarning) {
      //         that.minValue2 = response.data.data.lowWarning
      //       } else {
      //         that.minValue2 = 0
      //       }

      //     })
      //     .then(() => {

      //     })
      // },
      // setWarningRange1(workshopId) { //电流设置最大最小警戒值
      //   let that = this
      //   let json = {
      //     highWarning: that.maxValue2,
      //     lowWarning: that.minValue2,
      //     workshopid: workshopId
      //   }

      //   axios({
      //       url: host1 + ':7070/wanzhou/setWarningRange1',
      //       method: 'post',
      //       headers: {
      //         'Content-Type': 'application/json',

      //       },
      //       data: json

      //     })
      //     .then(response => {
      //       //////console.log(response)
      //       if (response.data.successMessage == "success") {
      //         this.$message({
      //           showClose: true,
      //           message: '设置成功！',
      //           type: 'success'
      //         });
      //       } else {
      //         this.$message({
      //           showClose: true,
      //           message: '设置失败！',
      //           type: '  warning'
      //         });

      //       }

      //     })
      //     .then(() => {

      //     })
      // },
      zhexian(legend,ampsHisX,series1,fla) {
        let myChart1 = this.$echarts.init(document.getElementById('echart1'));
        // 绘制图表
        myChart1.clear();
        let that = this;
        //////console.log(that.maxValue)

        let option;
        // //console.log(e)
        // //console.log(legend)
        // //console.log(ampsHisX)
        // //console.log(series1)
    if(fla==true){
              option = {
    
            legend: {
                   textStyle: {
            fontSize: 18, //字体大小
            color: '#ffffff' //字体颜色
          },
          bottom: 30,
          right: 0,
              data:legend
            },
            tooltip: {
              trigger: 'axis',
              show: true,
              confine: true,

            },
animation:false,
            grid: {
              top: '20%',
              left: '3%',
              right: '14%',
              bottom: '28%',
              containLabel: true,
              show: false
            },

            xAxis: {
              type: 'category',
              axisLine: { //这是x轴文字颜色
                lineStyle: {
                  color: "#fff",
                }
              },
              axisTick: {
                show: false
              },
 name: '小时/H',

              boundaryGap: false,
              data: ampsHisX
            },
            yAxis: {
              type: 'value',
              show: true,
               name: '电流/A',
              // max: that.Maxampshis,
              // min: that.Minampshis,


              axisLine: { //这是x轴文字颜色
                lineStyle: {
                  color: "#fff",
                }
              },
            },
            series: series1

          };
    }else{
                  option = {
    animation:false,
            legend: {
                   textStyle: {
            fontSize: 18, //字体大小
            color: '#ffffff' //字体颜色
          },
          bottom: 30,
          right: 0,
              data:legend
            },
            tooltip: {
              trigger: 'axis',
              show: true,
              confine: true,

            },

            grid: {
              top: '20%',
              left: '3%',
              right: '14%',
              bottom: '28%',
              containLabel: true,
              show: false
            },

            xAxis: {
              type: 'category',
              axisLine: { //这是x轴文字颜色
                lineStyle: {
                  color: "#fff",
                }
              },
              axisTick: {
                show: false
              },
 name: '小时/H',

              boundaryGap: false,
              data: ampsHisX
            },
            yAxis: {
              type: 'value',
              show: true,
               name: '压力K/C2',
              // max: that.Maxampshis,
              // min: that.Minampshis,


              axisLine: { //这是x轴文字颜色
                lineStyle: {
                  color: "#fff",
                }
              },
            },
            series: series1

          };
    }

        //////console.log(option)
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },


      //============iframe宽高设置================
      // getIframe1: function () {
      //   // this.src2='http://47.110.95.57/mulanTP2.3/index.php/home/index?CompanyId='+this.companyId+'&workshopId='+this.workshopId+'&language='+this.lang;
      //   this.src2 = 'http://47.110.95.57/mulanTP2.3/index.php/home/index/wzTV?CompanyId=' + this.companyId +
      //     '&workshopId=' + this.workshopId + '&language=' + this.lang;
      //   /*//////console.log(height);
      //   //////console.log(width);*/
      // },
      //============iframe宽高设置================




      //============后台数据获取================

      // 对象排序
      sortByKey(array, key) {
        return array.sort(function (a, b) {
          let x = a[key];
          let y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },
      // 数组排序
      sortArr(array) {
        return array.sort(function (a, b) {
          let x = a;
          let y = b;
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      },


      //车间编号
      getWorkShopList: function () {


        axios({
            url: host1 + ':8211/workShop/getWorkShopList',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'companyId': this.companyId
            },
            data: {
              "page": 1,
              "pageSize": 100
            }
          })
          .then(response => {
            // ==========总产量对比数据表格显示============
            this.workshopList = response.data.data.map(x => {
              return {
                label: x.name,
                value: x.id,
              }
            });
            this.workshopId = this.workshopList[0].value;
          })
          .then(() => {
            // this.getIframe1();

            this.getKongyaji(this.workshopId) //获取表格数据
            
             this.getWarningRange(this.workshopId) //获取电流最大最小警戒值
            this.getWarningMessages()
            this.getlengganji()

            // this.getWarningRange1(this.workshopId) //获取功耗最大最小警戒值


          })
      },
getlengganji(){
  let that=this
      axios({
            url: window.apiRoot.get_table+':8227/report/getSimpleReport',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
companyId:"10000005"
            },
            data: {
              tableName:"freezing_dryer",
             query:{
             
               workshop:1
             },
     
             
            }

          })
          .then(response => {
                 for(let i=0;i<response.data.data.length;i++){
              response.data.data[i].dew_point_temperature=(response.data.data[i].dew_point_temperature*0.1).toFixed(1)
            }
            that.lgjList=response.data.data
          })
},


      //============后台数据获取================




      //============选择车间================
      choseFactory: function (name) {
        // this.workshopId = workshopId; //改变当前车间
        window.document.getElementById('dialog').click('dialogFormVisible = false'); //关闭对话框
        //////console.log('当前车间id' + this.workshopId);
        //this.getKongyaji(this.workshopId)
        this.currentDay=name
        this.dialogFormVisible=false
         this.getStartRatesYMD(this.showEle,this.currentMachine,this.currentDay) //获取统计图数据
      },
      //============选择车间================



      //时间格式化
      dateFormatForMMdd: function (time) {
        let t = new Date(time); //row表示一行数据, updateTime 表示要格式化的字段名称
        return (t.getMonth() + 1).toString().padStart(2, '0') + "-" + t.getDate().toString().padStart(2, '0');
        // return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+"."+t.getMilliseconds();
      },
      /**

       */

      //定时刷新预警推送
      getWarningPushDataTiming: function () {
        const timer = setInterval(() => {
          let list=[]
    
      for(let i=-4;i<=0;i++){
       list.push({
         name:this.getDay(i)
       })
      }
      

      this.dayList=list
      // this.currentDay=list[4].name
            this.getKongyaji(this.workshopId) //获取表格数据
            // this.getWarningRange(this.workshopId) //获取电流最大最小警戒值
            // this.getWarningMessages()
          // this.getStartRatesYMD(this.workshopId);
        }, 5000);
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
      // for (let i = 1; i <= 60; i++) {
      //   _this.powerHisX.push(i)
      // }
      // for (let i = 1; i <= 24; i++) {
      //   _this.ampsHisX.push(i)
      // }
      this.timer = setInterval(() => {
        _this.date = new Date(); // 修改数据date
      }, 1000);
  let list=[]
    
      for(let i=-4;i<=0;i++){ //近五天的日期列表
       list.push({
         name:_this.getDay(i)
       })
      }
      _this.dayList=list
      _this.currentDay=list[4].name //今天的日期
    
      //  const timer = setInterval(() => {
      //         this.getKongyaji(this.workshopId) //获取表格数据
           // this.getWarningMessages()

      //     }, 5000);
      //     // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      //     this.$once('hook:beforeDestroy', () => {w
      //       clearInterval(timer);
      //     })

      //数据获取

      this.getWorkShopList();
      this. getWarningPushDataTiming()

    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  }

</script>
<style scoped>
  .main_content {
    width: 100%;
    height: 93%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
  }

  .hide_btn {
    width: 17%;
    height: 83px;

    position: absolute;
    right: 0;
    top: -1%;
  }

  .boxes {
    width: 95%;
    height: 96%;
    display: flex;
  }

  .boxes2 {
    width: 95%;
    height: 92%;
    display: flex;
    flex-direction: column;

  }

  .boxes2_title {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 27px;
  }

  .boxes2_content {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;

  }

  .left_box {
    width: 30%;
    height: 100%;

    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
  }

  .machine_img {
    /* background-image: url("../static/img/machine.png");
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    width: 100%;
    height: 31.2%;
    margin-bottom: 8%;
    margin-top: 7px;
     margin-left: 9px;
  }

  .card {
    background-image: url("../static/img/card.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 33%;
    position: relative;

  }

  .card_title {
    position: absolute;
    top: 9%;
    left: 35%;
    font-size: 27px;
    color: white;


  }

  .card_content {
    position: absolute;
    top: 38%;
    left: 5%;
    font-size: 24px;
    color: white;
    width: 89%;
    height: 55%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
  }

  .card_content_one {
    width: 97%;
    height: 20%;
    margin: 1.5%;
 display: flex;
 justify-content: space-around;
 align-items: center;


  }

 

  .right_box {
    width: 70%;
    height: 100%;
    overflow: auto;

    

  }

  .card_one {
    background-image: url("../static/img/card_one.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-left: 1%;
    margin-top: 2%;


    width: 100%;
    height: 18rem;
   
    position: relative;
  }

  .card_two {
    background-image: url("../static/img/card_two.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-left: 1%;
    margin-top: 2%;

    width: 100%;
    height: 18rem;
    /* width: 24%;
    height: 30%; */
    
    position: relative;
  }

  .card_three {
    background-image: url("../static/img/card_three.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-left: 1%;
    margin-top: 2%;


    width: 100%;
    height: 18rem;
   
    position: relative;
  }

  .card_four {
    background-image: url("../static/img/card_four.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-left: 1%;
    margin-top: 2%;


       width: 100%;
    height: 18rem;
    
    position: relative;
  }

  .cards_title {
    position: absolute;
    left: 4%;
    top: 3%;
    font-size: 12px;
    color: white;
  }
  .cards_workshop {
    position: absolute;
    right: 4%;
    top: 3%;
    font-size: 12px;
    color: white;
  }
  .cards_content {
   position: absolute;
    left: 6%;
    top: 18%;
    font-size: 10px;
    color: white;
    width: 90%;
    height: 85%;

  }

  .cards_content_con {
 
    width: 45%;
    height: 10%;
    margin: 1.5%;
    float: left;
    text-align: left;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .main_input {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .t-head {
    width: 100%;
    height: 13%;
    display: flex;
  }

  .t-one {
    width: 100%;
    height: 15%;
    display: flex;
    border-top: 1px solid white;
  }

  .t-one2 {
    width: 100%;
    height: 15%;
    display: flex;

  }

  .t-con {
    width: 7.59%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    border-left: 1px solid white;
  }

  .t-con span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

  }

  .t-con2 {
    width: 7.59%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    border-left: 1px solid white;
  }

  .t-con2 span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .t-con2 input {
    width: 95%;
    height: 95%;
    background: rgb(0, 11, 40);
    border: none;
    color: white;
    font-size: 18px;
  }

  .t-con3 span {
    overflow: hidden;

    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 2;

    -webkit-box-orient: vertical;

  }

  .t-con3 {
    width: 7.59%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    border-left: 1px solid white;
  }

  .main_input_con {
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 25px;
  }

  .main_input_con /deep/ .el-input--medium .el-input__inner {
    height: 50px;
    line-height: 50px;
    width: 100%;
  }

  .main_table {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main_table_con {
    width: 80%;
    height: 90%;
    border-top: 1px solid white;
    color: white;
    font-size: 18px;
    overflow: auto;
  }

  .main_echart {
    width: 100%;
    height: 30%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .all-card {
    width: 100%;
    overflow: auto;
    height: 368px;
  }

  .e-chart-card {
    width: 97%;
    margin-bottom: 3%;
    margin-left: 5%;
    margin-right: 5%;
    height: 260px;

  }

  .label {
    width: 22%;
    height: 40px;
    border: 1px solid white;
    position: absolute;
    left: 1%;
    top: 32%;
    margin-top: 2px;
    background: transparent;
    filter: Alpha(opacity=60);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;

    text-align: center;
    border: 2px rgba(255, 255, 255, 0.41) solid;
    -webkit-box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.2) inset;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.2) inset;

  }
  .lengganji{
    width: 97%;
    height: 220px;
    margin-top: 4px;
    overflow: auto;

  }
  .lengganji_con{
    width: 48%;
    height: 50%;
    float: left;
  
    font-size: 1rem;
  }
    .lengganji_con_mac{
    width: 100%;
   
    display: flex;
    align-items: center;
   
    
  }
     .lengganji_con_tem{
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
 
  }
  .mac{
     background-image: url("../static/img/mac.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    margin-right: 9px;
  }
   .tem{
     background-image: url("../static/img/tem.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    margin-right: 9px;
  }
  .label2 {
    width: 22%;

    height: 40px;
    border: 1px solid white;
    position: absolute;
    left: 23%;
    top: 32%;
    margin-top: 2px;
    background: transparent;
    filter: Alpha(opacity=60);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    text-align: center;
    border: 2px rgba(255, 255, 255, 0.41) solid;
    -webkit-box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.2) inset;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.2) inset;

  }
  .workshop {
    width: 22%;
    height: 40px;
    border: 1px solid white;
 

    background: transparent;
    filter: Alpha(opacity=60);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;

    text-align: center;
    border: 2px rgba(255, 255, 255, 0.41) solid;
    -webkit-box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.2) inset;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.2) inset;

  }
  .label3 {
    width: 35%;
    height: 40px;

    position: absolute;
    left: 64%;
    top: 32%;
    margin-top: 2px;


    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    text-align: center;


  }

  .head {
    width: 100%;
    height: 20px;
    text-align: center;
    font-size: 26px;
    color: white;
    padding-bottom: 10px;
  }

  .one-card-green {
    width: 100%;
    height: 100%;
    margin: 1%;

    margin-left: 1%;
    margin-right: 7%;
    margin-top: 2%;

    float: left;
    background-image: url("../static/img/zj_green.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .one-card-orange {
    width: 100%;
    margin: 1%;

    margin-left: 1%;
    margin-right: 7%;
    margin-top: 2%;
    height: 100%;
    float: left;
    background-image: url("../static/img/zj_orange.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .con {
    width: 50%;
    text-align: left;

  }

  .one-card-name {
    position: absolute;
    top: 8%;
    left: 21%;
    font-size: 20px;
    font-weight: bold;
  }

  .one-card-cl {
    position: absolute;
    top: 36%;
    left: 18%;
  }

  .one-card-xl {
    position: absolute;
    top: 51%;
    left: 18%;
  }

  .one-card-dt {
    position: absolute;
    top: 65%;
    left: 18%;
  }

  .one-card-wcd {
    position: absolute;
    top: 80%;
    left: 18%;
  }

  .one-card2 {
    width: 45%;
    margin: 1.5%;
    height: 44%;
    float: left;
    background-image: url("../static/img/js_green.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .one-card2-name {
    position: absolute;
    left: 8%;
    top: 3%;
    font-size: 18px;
    font-weight: bold;
  }

  .one-card2-clxl {
    position: absolute;
    left: 8%;
    top: 30%;
    width: 100%;
    display: flex;
  }

  .one-card2-tjwcd {
    position: absolute;
    left: 8%;
    top: 46%;
    width: 100%;
    display: flex;
  }

  .one-card2-zlhsl {
    position: absolute;
    left: 8%;
    width: 100%;
    display: flex;
    top: 62%;
  }

  .one-card2-cstf {
    position: absolute;
    left: 8%;
    top: 78%;
    width: 100%;
    display: flex;
  }

  .content4 {
    height: 100%;
    margin-top: 10px;
    position: relative;
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

  .jingsha {
    color: #E60012 !important;
  }

  .weisha {
    color: #238F3B !important;

  }

  .qita {
    color: #956132 !important;
  }

  .tip {
    position: absolute;
    z-index: 2;
    top: 0.4rem;
    font-size: 1.6rem;
    font-weight: bolder;
    line-height: 5rem;
    width: 100%;
    text-align: left;
    height: 5rem;
  }

  .choose {
    color: #00ffff !important;
    font-size: 1.2rem !important;
  }

  .tbTitle {
    font-weight: bolder;
    font-size: 1.2rem;
    color: #00ffff;
  }

  .unChoosetbTitle {
    font-weight: bolder;
    font-size: 1rem;
    color: #00b7b7;
    cursor: pointer;
  }

  .warpStop {
    background-image: url("../static/img/chart3.png") !important;
  }

  .sizingStop {
    background-image: url("../static/img/chart2.png") !important;
  }

  .tbText {
    font-weight: bolder;
    font-size: 1.2rem;
    color: lightblue;
  }

  .deviceState {
    margin-top: 2rem;
    width: 100%;
    height: 58rem;
  }

  .deviceStateCharts {
    width: 98%;
    height: 100%;
  }

  .monitor {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 57rem;
    padding-top: 1rem;
    margin: 0;
  }

  .failureEquipment {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }

  .factoryProduction {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }

  .productionTime {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }

  .problemsFocus {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }

  .warningPush {
    background-image: url("../static/img/bk4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 23rem;
    margin: 0;
  }

  .totalProductionImg {
    background-image: url("../static/img/circle.png");
    background-repeat: no-repeat;
    background-size: 85% 100%;
    width: 100%;
    height: 9.5rem;
    text-align: center;
    vertical-align: middle;
  }

  .sizingImg {
    background-image: url("../static/img/chart1.png");
    background-repeat: no-repeat;
    background-size: 100% 50%;
    width: 80%;
    height: 10rem;
    margin-left: 1rem;
    margin-top: 1rem;
  }

  .warpImg {
    width: 100%;
  }

  .warpMachine {
    background-image: url("../static/img/chart4.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 65%;
    height: 6rem;
  }

  .progress {
    width: 100%;
    height: 1.2rem;
    background: rgba(66, 125, 177, 0.63);
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-weight: lighter;
  }

  .progressing {
    position: relative;
    float: left;
    margin: 0 auto;
    height: 1.2rem;
    background: #427db1;
    border-radius: 5px;

  }

  .percentage {
    position: absolute;
    z-index: 4;
  }

  .zjProgress {
    margin-top: -2.8rem;
    width: 80%;
    height: 1.2rem;
    background: rgba(215, 248, 135, 0.39);
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-weight: lighter;
    margin-left: 0.8rem;
  }

  .zjProgressing {
    position: relative;
    float: left;
    margin: 0 auto;
    height: 1.2rem;
    background: #d7f886;
    border-radius: 5px;

  }

  .zjPercentage {
    position: absolute;
    z-index: 4;
    color: black;
    font-weight: bold;
  }

  .sizingDetail {
    background: rgba(122, 121, 121, 0.63);

  }

  .sizingDetailTitle {
    text-align: center;
    height: 2rem;
    padding: 0.5rem 0;
    border: 1px solid rgba(121, 121, 121, 0.63);
    color: white;
  }

  .eltabs {
    width: 33rem;
  }

  .dataTable {
    background-color: transparent !important;
    margin-left: 0.1rem;
    width: 95%;
  }

  .el-table::before {
    height: 0;
  }

  .el-table::after {
    height: 0;
  }

  /* 使表格背景透明 */
  .el-table th,
  .el-table tr {
    background-color: transparent !important;
  }

  /*修改element-ui的table 在鼠标悬停hover时的高亮颜色*/
  .el-table tbody tr:hover>td {
    background-color: rgba(48, 162, 211, 0.9) !important
  }

  /*table表格控件表头与内容列不对齐问题*/
  body .el-table th.gutter {
    display: table-cell !important;
  }

</style>
<style>
  .el-input__inner {
    background-color: rgb(1, 4, 42) !important;
    font-size: 1rem;
    border-radius: 5px;
    width: 11rem;
    font-weight: bolder;
    color: #00ffff;
  }

  .el-select-dropdown__item.selected {
    background-color: lightblue;
  }

  .el-dialog--center {
    background-color: rgb(0, 111, 175) !important;
    -webkit-box-shadow: 1px 1px 1px rgba(190, 190, 190, 0.9);
    -moz-box-shadow: 1px 1px 1px rgba(190, 190, 190, 0.9);
    box-shadow: 2px 2px 10px rgba(190, 190, 190, 0.9);
    border-radius: 10px;
  }

  .el-dialog__title {
    font-size: 1.8rem !important;
    font-weight: bolder !important;
    color: #ffffff;
  }

  .el-tabs__nav {
    background-color: transparent;

  }

  .el-tabs__item {
    font-size: 1rem;
    color: lightblue;
    font-weight: bolder;
  }

  .el-tabs__item.is-active {
    color: #00ffff;
  }

  .sizingDetail .el-popover {
    padding: 0;
    background: rgba(121, 120, 121, 0.99);
  }

</style>
