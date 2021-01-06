<template>
  <div>

    <div class="body" style="height:100vh;width:100%;">
      <div style="height:7vh">
        <div class="ptqyjk" style="height:6%;width:9%;positon:relative;"><a   target="_blank" href="http://192.168.140.179:8090/erp/start.html"
            style="position: absolute;z-index: 19930710;width: 100%;height: 100%;left:0"></a></div>

        <div class="ptqyjk2" style="height:6%;width:9%;positon:relative;"><a   target="_blank" href="http://192.168.140.182:17001"
            style="position: absolute;z-index: 19930710;width: 100%;height: 100%;left:0"></a></div>
        <div class="fzgy" style="height:16%;width:90%">纺织工业互联网平台数据中心</div>
        <div class="sj" style="height:6%;width:20%">
          <span class="Date">{{nowDate}}</span>
          <span class="time">{{nowTime}}</span>
        </div>
      </div>
      <div class="left" style="height:90vh;width:27%">
        <div class="left1" style="height:29vh">
          <el-col :span="12">
            <div class="title1">各区域产值</div>
          </el-col>
          <div class="arrow">
            <select name="select1" id="select1" class='select1' @change="regionaloutputvalueChart">
              <option value="this_month" selected id="this_month" style="font-size:15px">本月</option>
              <option value="current_season" id="current_season" style="font-size:15px">本季度</option>
              <option value="this_year" id="this_year" style="font-size:15px">本年</option>
              <option value="last_year" id="last_year" style="font-size:15px">去年</option>
            </select>
          </div>
          <div id="regionaloutputvalueChart" style="height: 29vh" class="regional_output"></div>

        </div>
        <div class="left2" style="height:29vh">
          <el-col :span="12">
            <div class="title1">上云设备数</div>
          </el-col>
          <div id="userregistrationChart" style="height: 29vh" class="user_registration"></div>
        </div>
        <div class="left3" style="height:29vh">
          <el-col :span="12">
            <div class="title1">能源效率推移</div>
          </el-col>
          <div class="arrow">
            <select name="select2" id="select2" class='select2' @change="poweronefficiencyChart">
              <option value="this_year" selected1 id="this_year" style="font-size:15px">今年</option>
              <option value="last_year" id="last_year" style="font-size:15px">去年</option>
            </select>
          </div>
          <div id="poweronefficiencyChart" style="height: 29vh" class="poweron_efficiency"></div>
        </div>
      </div>
      <div class="center" style="height:90vh;width:43%">
        <div style="height:60vh">
          <div class="border">
            <div class="yield">区域年总产量 </div>
            <div class="num">
              <el-col :span="2">
                <div class="number1" v-if="total_year1">{{total_year1}}</div>
              </el-col>
              <el-col :span="2">
                <div class="number2">{{douhao[0]}}</div>
              </el-col>

              <el-col :span="2">
                <div class="number" v-if="total_year2">{{total_year2}}</div>
              </el-col>
              <el-col :span="2">
                <div class="number2">{{douhao[1]}}</div>
              </el-col>

              <el-col :span="2">
                <div class="number" v-if="total_year3">{{total_year3}}</div>
              </el-col>
              <el-col :span="2">
                <div class="number2">{{douhao[2]}}</div>
              </el-col>

              <el-col :span="2">
                <div class="number" v-if="total_year4">{{total_year4}}</div>
              </el-col>
              <el-col :span="2">
                <div class="number2">{{douhao[3]}}</div>
              </el-col>

              <el-col :span="2">
                <div class="number" v-if="total_year5">{{total_year5}}</div>
              </el-col>
              <el-col :span="2">
                <div class="number2">{{douhao[4]}}</div>
              </el-col>

              <el-col :span="2">
                <div class="number">{{total_year6}}</div>
              </el-col>
              <el-col :span="2">
                <div class="number2">{{douhao[5]}}</div>
              </el-col>

              <el-col :span="2">
                <div class="number" v-if="total_year7">{{total_year7}}</div>
              </el-col>
              <el-col :span="2">
                <div class="number2">{{douhao[6]}}</div>
              </el-col>

              <el-col :span="2">
                <div class="number" v-if="total_year8">{{total_year8}}</div>
              </el-col>
              <el-col :span="2">
                <div class="number2">{{douhao[7]}}</div>
              </el-col>

              <el-col :span="2">
                <div class="number" v-if="total_year9">{{total_year9}}</div>
              </el-col>
              <el-col :span="2">
                <div class="number2">{{douhao[8]}}</div>
              </el-col>

              <el-col :span="2">
                <div class="number" v-if="total_year10">{{total_year10}}</div>
              </el-col>
              <el-col :span="2">
                <div class="number2">{{douhao[9]}}</div>
              </el-col>

              <el-col :span="2">
                <div class="number" v-if="total_year11">{{total_year11}}</div>
              </el-col>

            </div>
          </div>
          <div style="height:60vh">
            <div @click="showChinaMap" class="map-container" id="mapEchart" style="height:55vh;width:75%"></div>
          </div>
          <div class="frame">
            <div class="frame1">
              <div class="mask" v-if="showModal" @click="showModal=false"></div>
              <el-col :span="12">
                <div class="frame_name" @click="showModal=true">在线企业</div>
              </el-col>
              <el-col :span="12">
                <div class="frame_number" @click="showModal=true">{{online_firm}} </div>
              </el-col>
              <div class="pop" v-if="showModal" style="height:40vh;width:25vw">
                <div class="name">
                  <div @click="clicklinks1">浙江瑞域纺织有限公司</div>
                  <div @click="clicklinks2"> 浙江广华纺织有限公司</div>
                  浙江鑫海纺织有限公司
                  <br>
                  浙江七星纺织有限公司
                  <br>
                  浙江万舟纺织有限公司
                  <br>
                  浙江奇锦纺织有限公司
                  <br>
                  浙江祥嘉纺织公司
                </div>
              </div>
            </div>
            <div class="frame1">
              <el-col :span="12">
                <div class="frame_name">在线设备</div>
              </el-col>
              <el-col :span="12">
                <div class="frame_number">{{online_count}}</div>
              </el-col>
            </div>
            <div class="frame1">
              <el-col :span="12">
                <div class="frame_name1">注册用户</div>
              </el-col>
              <el-col :span="12">
                <div class="frame_number1">{{register_user}}</div>
              </el-col>
            </div>
          </div>
        </div>
        <div class="szxx" style="height:30vh;width:92%">
          <div class="message_table">
            <table class="table" cellspacing="0">
              <tr class="first_tr1">
                <th class="first_th1">实政信息</th>
                <th class="second_th1">更多信息</th>
              </tr>
            </table>
            <vue-seamless-scroll :data="listData1" :class-option="optionHover" class="seamless-warp">
              <ul class="item">
                <li v-for="(item,index) in listData1" :key="index" class="itemli1">
                  <div class="item_style">

                    <span class="message" v-text="item.message" @click="clickProps($event)" :id="index"></span>
                    <span class="date" v-text="item.date"></span>
                  </div>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="bottom_font"><span>Copyright © 浙江天衡信息技术有限公司</span></div>
      </div>
      <div class="right" style="height:90vh;width:27%">
        <div class="right1" style="height:29vh">
          <div class="hyyhs" style="width:89%">活跃用户数</div>
          <div class="head1" style="width:87%">
            <div class="txrq1" style="height:2.5vh;width:10vh">{{yhdate[0]}}</div>
            <div class="txsj1" style="height:2.5vh;width:2vh">{{yhnum[0]}}</div>
            <el-row :gutter="18" style="width:95%">
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[0]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[1]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[2]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[3]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[4]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[5]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[6]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[7]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[8]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[9]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[10]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[11]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[12]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[13]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[14]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[15]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[16]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry1[17]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
            </el-row>

          </div>
          <div class="head2" style="width:87%">
            <div class="txrq1" style="height:2.5vh;width:10vh">{{yhdate[1]}}</div>
            <div class="txsj1" style="height:2.5vh;width:2vh">{{yhnum[1]}}</div>
            <el-row :gutter="18" style="width:95%">
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[0]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[1]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[2]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[3]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[4]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[5]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[6]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[7]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[8]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[9]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[10]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[11]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[12]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[13]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[14]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[15]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[16]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry2[17]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
            </el-row>

          </div>
          <div class="head3" style="width:87%">
            <div class="txrq1" style="height:2.5vh;width:10vh">{{yhdate[2]}}</div>
            <div class="txsj1" style="height:2.5vh;width:2vh">{{yhnum[2]}}</div>
            <el-row :gutter="18" style="width:95%">
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[0]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[1]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[2]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[3]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[4]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[5]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[6]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[7]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[8]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[9]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[10]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[11]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[12]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[13]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[14]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[15]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[16]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry3[17]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
            </el-row>

          </div>
          <div class="head4" style="width:87%">
            <div class="txrq1" style="height:2.5vh;width:10vh">{{yhdate[3]}}</div>
            <div class="txsj1" style="height:2.5vh;width:2vh"> {{yhnum[3]}}</div>
            <el-row :gutter="18" style="width:95%">
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[0]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[1]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[2]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[3]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[4]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[5]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[6]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[7]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[8]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[9]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[10]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[11]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[12]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[13]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[14]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[15]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[16]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry4[17]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
            </el-row>

          </div>
          <div class="head5" style="width:87%">
            <div class="txrq1" style="height:2.5vh;width:10vh">{{yhdate[4]}}</div>
            <div class="txsj1" style="height:2.5vh;width:2vh">{{yhnum[4]}}</div>
            <el-row :gutter="18" style="width:95%">
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[0]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[1]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[2]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[3]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[4]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[5]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[6]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[7]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[8]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[9]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[10]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[11]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[12]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[13]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[14]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[15]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[16]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
              <el-col :span="1">
                <div class="head_portrait" style="height:1vw;width:1vw" v-if="portraitarry5[17]"></div>
                <div class="head_portrait2" style="height:1vw;width:1vw" v-else></div>
              </el-col>
            </el-row>

          </div>
          <div class="zbz" style="width:87%">

            <el-col :span="4">
              <div style="height:1vw;width:1vw">0</div>
            </el-col>
            <el-col :span="5">
              <div style="height:1vw;width:1vw">100</div>
            </el-col>
            <el-col :span="5">
              <div style="height:1vw;width:1vw">200</div>
            </el-col>
            <el-col :span="5">
              <div style="height:1vw;width:1vw">300</div>
            </el-col>
            <el-col :span="1">
              <div style="height:1vw;width:1vw">400</div>
            </el-col>

          </div>

        </div>
        <div class="right2" style="height:29vh">
          <el-col :span="12">
            <div class="title1">机修上报维修统计</div>
          </el-col>
          <div class="statistics_table">
            <table class="table" cellspacing="0">
              <tr class="first_tr">
                <th class="first_th">区域</th>
                <th class="second_th">报修类型</th>
                <th class="third_th">设备数量</th>
                <th class="four_th">上报日期</th>
              </tr>
            </table>
            <vue-seamless-scroll :data="listData2" :class-option="optionHover" class="seamless-warp">
              <ul class="item">
                <li v-for="(item,index) in listData2" :key="index" class="itemli">
                  <span class="area" v-text="item.area"></span>
                  <span class="repair_type" v-text="item.repair_type"></span>
                  <span class="quantity_facility" v-text="item.quantity_facility"></span>
                  <span class="report_date" v-text="item.report_date"></span>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="right3" style="height:29vh">
          <el-col :span="12">
            <div class="title1">各年龄学历分布</div>
          </el-col>
          <div id="educationbackgroundChart" style="height: 25vh" class="education_background"></div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import echarts from "echarts";
  import china from '../../public/map/全国.json'
  import axios from 'axios'
  echarts.registerMap('china', china)


  var provinces = ['zhejiang'];
  var provincesText = ['浙江'];
  var cities = ['jinhua']
  var citiesText = ['金华市']
  var regions = ['lanxi']
  var regionsText = ['兰溪市']




  export default {

    name: "centerdata",
    data() {
      return {
        portraitarry1: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        portraitarry2: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        portraitarry3: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        portraitarry4: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        portraitarry5: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        map: {},
        uperlevel1: '',
        uperlevel2: '',
        provincename: '',
        cityname: '',
        timer: null,
        nowDate: '',
        nowTime: '',
        listData1: [],
        listData2: [],
        total_year1: 0,
        total_year2: 0,
        total_year3: 0,
        total_year4: 0,
        total_year5: 0,
        total_year6: 0,
        total_year7: 0,
        total_year8: 0,
        total_year9: 0,
        total_year10: 0,
        total_year11: 0,
        online_count: 0,
        online_firm: 0,
        register_user: 0,
        selected: 'this_month',
        selected1: 'this_year',
        yhdate: [],
        yhnum: [],
        douhao: [],
        urllll: [],
        showModal: false,
      }
    },

    computed: {
      optionHover() {
        return {
          hoverStop: true,
          step: 0.5,
        }
      }
    },
    methods: {
      //地图
      getMapOpt(place) {

        if (place === 'jinhua') {
          var geoCoordMap = {

            "兰溪": [119.460521, 29.210065],
          }

        } else if (place === 'lanxi') {
          var geoCoordMap = {
            "浙江鑫海纺织有限公司": [119.352975, 29.245083],
            "浙江赐源纺织有限公司": [119.340008, 29.245162],
            "浙江七星纺织有限公司": [119.39162, 29.242089],
            "浙江万舟纺织有限公司": [119.407047, 29.252733],
            "浙江兰棉纺织有限公司": [119.427474, 29.252267],
            "浙江佳而美纺织有限公司": [119.375977, 29.236103],
            "浙江鑫浪纺织有限公司": [119.422874, 29.229008],
            "浙江奇锦纺织有限公司": [119.402429, 29.252443],
            "浙江祥嘉纺织公司": [119.410914, 29.237266],
            "浙江亿骏纺织有限公司": [119.413326, 29.250999],
          }
        } else {
          var geoCoordMap = {

            "丹阳": [119.581911, 31.991459],
            "兰州": [103.841032, 36.049115],
            "兰溪": [119.460521, 29.210065],
            "新昌": [120.905665, 29.501205],
          }
        }
        var convertData = function (data) {
          var res = [];
          /*if(place==='jinhua'){
          for (var i = 0; i < (data.length-1); i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                  res.push(geoCoord.concat(data[i].value));
              }
          }}
          else{*/
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {

              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          //}
          return res;
        };
        const option = {
          //backgroundColor: '#fff',
          //以下是地图标题，我在此处设空，需要的可以自己加上
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },

          geo: {
            map: place ? place : 'china',

            regions: [{
              name: "南海诸岛",
              itemStyle: {
                // 隐藏地图
                normal: {
                  opacity: 1, // 为 0 时不绘制该图形
                }
              },
              label: {
                show: false // 隐藏文字
              }
            }],
            label: {
              emphasis: {
                show: false
              },
              // 不需要显示地名可直接删除normal此项

            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#111931', //地图颜色
                borderColor: '#3F8DAF', //地图边线颜色
                borderWidth: 1,
              },
              emphasis: {
                areaColor: '#B7DFED' //鼠标移入颜色
              }
            }
          },

          series: [{
              name: '123',
              type: 'effectScatter',
              coordinateSystem: 'geo',


              data: convertData([{
                  name: "丹阳",
                  value: 95
                },
                {
                  name: "兰州",
                  value: 95
                },
                {
                  name: "新昌",
                  value: 95
                },
              ]),
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              encode: {
                value: 2
              },
              symbolSize: function (val) {
                return val[2] / 10;
              },
              label: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color: '#fff',
                fontSize: 20,
              },
              itemStyle: {
                emphasis: {
                  borderColor: '#fff',
                  borderWidth: 1
                },
                color: '#F67F31',
                shadowBlur: 10,
                shadowColor: '#333'
              },

            },


            {
              name: '123',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData([

                {
                  name: "浙江鑫海纺织有限公司",
                  value: 95
                },
                {
                  name: "浙江赐源纺织有限公司",
                  value: 95
                },
                {
                  name: "浙江七星纺织有限公司",
                  value: 95
                },
                {
                  name: "浙江万舟纺织有限公司",
                  value: 95
                },
                {
                  name: "浙江兰棉纺织有限公司",
                  value: 95
                },
                {
                  name: "浙江佳而美纺织有限公司",
                  value: 95
                },
                {
                  name: "浙江鑫浪纺织有限公司",
                  value: 95
                },
                {
                  name: "浙江奇锦纺织有限公司",
                  value: 95
                },
                {
                  name: "浙江祥嘉纺织公司",
                  value: 95
                },
                {
                  name: "浙江亿骏纺织有限公司",
                  value: 95
                },
              ]),

              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,


              encode: {
                value: 2
              },
              symbolSize: function (val) {
                return val[2] / 10;
              },
              label: {
                formatter: '{b}',
                position: 'left',
                show: false,
                color: '#fff',

              },
              itemStyle: {
                emphasis: {
                  borderColor: '#fff',
                  borderWidth: 1
                },
                color: '#F67F31',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            {
              name: '123',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData([{
                  name: "兰溪",
                  value: 95
                },

              ]),

              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,

              encode: {
                value: 2
              },
              symbolSize: function (val) {
                return val[2] / 10;
              },
              label: {
                formatter: '{b}',
                position: 'left',
                show: true,
                color: '#fff',
                fontSize: 20,
              },
              itemStyle: {
                emphasis: {
                  borderColor: '#fff',
                  borderWidth: 1
                },
                color: '#F67F31',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            }
          ]
        }
        return option
      },
      // 显示中国地图
      showChinaMap() {
        if (this.uperlevel2 != '') {
          const option = this.getMapOpt(this.uperlevel2)

          this.uperlevel2 = ''
          this.map.setOption(option, true)
          return
        }
        if (this.uperlevel1 != '') {
          const option = this.getMapOpt(this.uperlevel1)
          this.uperlevel1 = ''
          this.map.setOption(option, true)
          return
        } else {
          const option = this.getMapOpt()
          this.map.setOption(option, true)
          return
        }
      },
      // 显示各省地图，这里使用axios请求本地文件
      getProvinceMapOpt(provinceAlphabet) {
        axios.get('map/' + provinceAlphabet + '.json').then((s) => {
          echarts.registerMap(provinceAlphabet, s.data)
          const option = this.getMapOpt(provinceAlphabet)
          this.map.setOption(option, true)
        })
      },
      // 显示市级地图，
      getCityMapOpt(cityAlphabet) {
        axios.get('map/' + cityAlphabet + '.json').then((s) => {
          echarts.registerMap(cityAlphabet, s.data)
          const option = this.getMapOpt(cityAlphabet)
          this.map.setOption(option, true)
        })
      },

      getRegionMapOpt(regionAlphabet) {
        axios.get('map/' + regionAlphabet + '.json').then((s) => {
          echarts.registerMap(regionAlphabet, s.data)
          const option = this.getMapOpt(regionAlphabet)
          this.map.setOption(option, true)
        })
      },

      initMap() {
        var dom = document.getElementById('mapEchart')




        this.map = echarts.init(dom)

        const option = this.getMapOpt()
        if (option && typeof option === 'object') {
          this.map.setOption(option, true)
        }
        this.map.on('click', (param) => {

          event.stopPropagation() // 阻止冒泡
          // 找到省份名
          const provinceIndex = provincesText.findIndex(x => {
            return param.name === x
          })

          const cityIndex = citiesText.findIndex(x => {
            return param.name === x
          })

          const regionIndex = regionsText.findIndex(x => {
            return param.name === x
          })

          //在这里判断provincesText中是否包含点击的省份名，有则渲染省级地图，无则无处理（需要可从此获得）

          if (provinceIndex != -1) {
            const provinceAlphabet = provinces[provinceIndex]

            // 重新渲染各省份地图
            this.getProvinceMapOpt(provinceAlphabet)
            this.provincename = provinceAlphabet
          }
          if (cityIndex != -1) {
            const cityAlphabet = cities[cityIndex]
            // 重新渲染各市地图
            this.getCityMapOpt(cityAlphabet)
            this.uperlevel1 = this.provincename
            this.cityname = cityAlphabet
          }
          if (regionIndex != -1) {
            const regionAlphabet = regions[regionIndex]

            // 重新渲染各区地图
            this.getRegionMapOpt(regionAlphabet)
            this.uperlevel2 = this.cityname
          } else {
            return
          }



        })
      },
      //时间
      setNowTimes() {
        let myDate = new Date()

        let wk = myDate.getDay()
        let yy = String(myDate.getFullYear())
        let mm = myDate.getMonth() + 1
        let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
        let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
        let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
        let sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
        this.nowDate = yy + '年' + mm + '月' + dd + '日'
        this.nowTime = hou + ':' + min + ':' + sec
      },
      //各区域产值图表
      regionaloutputvalueChart: function () {
        let myChart = this.$echarts.init(document.getElementById('regionaloutputvalueChart'));
        axios({
          url: 'http://120.55.124.53:14100/paltformBoard/getRegionYield',
          method: 'get',
        }).then(res => {
          //console.log(res)
          let sum = 0;
          let sum1 = 0;
          var total = [];
          var douhao = [];
          var num = 0;
          for (let i = 0; i < res.data.data.length; i++) {
            sum1 += res.data.data[i].yield_year;
          }
          axios({
            url: 'http://120.55.124.53:14100/paltformBoard/getRegionYieldRealtime',
            method: 'get',
          }).then(Response => {
            //console.log(Response)
            sum1 = sum1 + Response.data.data.realtime_product
            sum = sum1.toLocaleString();
            console.log(sum)
            for (let i = 0; i < sum.length; i++) {
              total[i] = sum.substring(i, i + 1);
            }

            for (let i = 0; i < total.length; i++) {
              if (total[i] != ",") {
                douhao[i] = null;
              } else {
                douhao[i - 1 - num] = total[i];
                num++;
              }
              this.douhao[i - 1 - num] = douhao[i - 1 - num];
            }

            var s = Math.round(sum1).toString();
            for (let i = 0; i < s.length; i++) {
              this.total_year1 = s.substring(0, 1);
              this.total_year2 = s.substring(1, 2);
              this.total_year3 = s.substring(2, 3);
              this.total_year4 = s.substring(3, 4);
              this.total_year5 = s.substring(4, 5);
              this.total_year6 = s.substring(5, 6);
              this.total_year7 = s.substring(6, 7);
              this.total_year8 = s.substring(7, 8);
              this.total_year9 = s.substring(8, 9);
              this.total_year10 = s.substring(9, 10);
              this.total_year11 = s.substring(10, 11);
              total[i] = s.substring(i, i + 1);
            }
            //console.log(total)
            let region = [];
            let month = [];
            let temp;
            let temp1;
            let temp2;
            let temp3;
            if (document.getElementById("select1").value == "this_month") {
              for (let i = 0; i < res.data.data.length; i++) {
                for (let j = i + 1; j < res.data.data.length; j++) {
                  if (res.data.data[i].yield_month < res.data.data[j].yield_month) {
                    temp = res.data.data[j].yield_month;
                    res.data.data[j].yield_month = res.data.data[i].yield_month;
                    res.data.data[i].yield_month = temp;
                    temp1 = res.data.data[j].region;
                    res.data.data[j].region = res.data.data[i].region;
                    res.data.data[i].region = temp1;
                  }
                }
                region.push(res.data.data[i].region);
                month.push(res.data.data[i].yield_month / 10000)
              };

              this.region = region;
              this.yield_month = month;
              region = [];
              month = [];
              myChart.setOption({
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    triggerTooltip: true,
                    type: 'shadow',
                  },
                  formatter: function (params) {
                    return params[0].name + "<br>" + params[0].data.toFixed(2) + '万米';
                  }
                },
                xAxis: {
                  type: 'category',
                  data: this.region,
                  axisLabel: {
                    color: '#00E1F1',
                    interval: '0',
                    showMaxLabel: true,
                    textStyle: {
                      color: '#00E1F1',
                      fontSize: "10"
                    },

                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#00E1F1',
                    }
                  },
                },
                grid: {
                  left: '10%',
                  right: '5%',
                  top: '35%',
                  bottom: '15%',
                },
                yAxis: {
                  type: 'value',
                  name: "万米",
                  nameTextStyle: {
                    color: '#00E1F1',
                    fontSize: "15",
                    padding: [0, 0, -15, 20],
                  },
                  axisLabel: {
                    margin: 5,
                    textStyle: {
                      color: '#00E1F1',
                      fontSize: "15"
                    },
                    showMaxLabel: false,
                  },
                  splitNumber: 6,
                  splitLine: {
                    show: false
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#00E1F1',
                    }
                  },
                },
                series: [{
                  data: this.yield_month,
                  type: 'bar',
                  barMaxwidth: 20,
                  itemStyle: {
                    color: '#FFA502',
                  }
                }]
              })
            } else if (document.getElementById("select1").value == "current_season") {
              for (let i = 0; i < res.data.data.length; i++) {
                for (let j = i + 1; j < res.data.data.length; j++) {
                  if (res.data.data[i].yield_quarter < res.data.data[j].yield_quarter) {
                    temp = res.data.data[j].yield_quarter;
                    res.data.data[j].yield_quarter = res.data.data[i].yield_quarter;
                    res.data.data[i].yield_quarter = temp;
                    temp2 = res.data.data[j].region;
                    res.data.data[j].region = res.data.data[i].region;
                    res.data.data[i].region = temp2;
                  }
                }
                region.push(res.data.data[i].region);
                month.push(res.data.data[i].yield_quarter / 10000)

              };

              this.region = region;
              this.yield_quarter = month;
              region = [];
              month = [];
              myChart.setOption({
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    triggerTooltip: true,
                    type: 'shadow',
                  },
                  formatter: function (params) {
                    return params[0].name + "<br>" + params[0].data.toFixed(2) + '万米';
                  }
                },
                xAxis: {
                  type: 'category',
                  data: this.region,
                  axisLabel: {
                    color: '#00E1F1',
                    interval: '0',
                    showMaxLabel: true,
                    textStyle: {
                      color: '#00E1F1',
                      fontSize: "10"
                    },

                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#00E1F1',
                    }
                  },
                },
                grid: {
                  left: '10%',
                  right: '5%',
                  top: '30%',
                  bottom: '15%',
                },
                yAxis: {
                  type: 'value',
                  name: "万米",
                  nameTextStyle: {
                    color: '#00E1F1',
                    fontSize: "18",
                    padding: [0, 0, -15, 20],
                  },
                  axisLabel: {
                    margin: 5,
                    textStyle: {
                      color: '#00E1F1',
                      fontSize: "15"
                    },
                    showMaxLabel: false,
                  },
                  splitNumber: 6,
                  splitLine: {
                    show: false
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#00E1F1',
                    }
                  },
                },
                series: [{
                  data: this.yield_quarter,
                  type: 'bar',
                  barMaxwidth: 20,
                  itemStyle: {
                    color: '#FFA502',
                  }
                }]
              })
            } else if (document.getElementById("select1").value == "last_year") {
              for (let i = 0; i < res.data.data.length; i++) {
                for (let j = i + 1; j < res.data.data.length; j++) {
                  if (res.data.data[i].yield_last_year < res.data.data[j].yield_last_year) {
                    temp = res.data.data[j].yield_last_year;
                    res.data.data[j].yield_last_year = res.data.data[i].yield_last_year;
                    res.data.data[i].yield_last_year = temp;
                    temp2 = res.data.data[j].region;
                    res.data.data[j].region = res.data.data[i].region;
                    res.data.data[i].region = temp2;
                  }
                }
                region.push(res.data.data[i].region);
                month.push(res.data.data[i].yield_last_year / 10000)

              };

              this.region = region;
              this.yield_last_year = month;
              region = [];
              month = [];
              myChart.setOption({
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    triggerTooltip: true,
                    type: 'shadow',
                  },
                  formatter: function (params) {
                    return params[0].name + "<br>" + params[0].data.toFixed(2) + '万米';
                  }
                },
                xAxis: {
                  type: 'category',
                  data: this.region,
                  axisLabel: {
                    color: '#00E1F1',
                    interval: '0',
                    showMaxLabel: true,
                    textStyle: {
                      color: '#00E1F1',
                      fontSize: "10"
                    },

                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#00E1F1',
                    }
                  },
                },
                grid: {
                  left: '10%',
                  right: '5%',
                  top: '30%',
                  bottom: '15%',
                },
                yAxis: {
                  type: 'value',
                  name: "万米",
                  nameTextStyle: {
                    color: '#00E1F1',
                    fontSize: "18",
                    padding: [0, 0, -15, 20],
                  },
                  axisLabel: {
                    margin: 5,
                    textStyle: {
                      color: '#00E1F1',
                      fontSize: "15"
                    },
                    showMaxLabel: false,
                  },
                  splitNumber: 6,
                  splitLine: {
                    show: false
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#00E1F1',
                    }
                  },
                },
                series: [{
                  data: this.yield_last_year,
                  type: 'bar',
                  barMaxwidth: 20,
                  itemStyle: {
                    color: '#FFA502',
                  }
                }]
              })
            } else {
              for (let i = 0; i < res.data.data.length; i++) {
                for (let j = i + 1; j < res.data.data.length; j++) {
                  if (res.data.data[i].yield_year < res.data.data[j].yield_year) {
                    temp = res.data.data[j].yield_year;
                    res.data.data[j].yield_year = res.data.data[i].yield_year;
                    res.data.data[i].yield_year = temp;
                    temp3 = res.data.data[j].region;
                    res.data.data[j].region = res.data.data[i].region;
                    res.data.data[i].region = temp3;
                  }
                }
                region.push(res.data.data[i].region);
                month.push(res.data.data[i].yield_year / 10000)

              };

              this.region = region;
              this.yield_year = month;
              region = [];
              month = [];
              myChart.setOption({
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    triggerTooltip: true,
                    type: 'shadow',
                  },
                  formatter: function (params) {
                    return params[0].name + "<br>" + params[0].data.toFixed(2) + '万米';
                  }
                },
                xAxis: {
                  type: 'category',
                  data: this.region,
                  axisLabel: {
                    color: '#00E1F1',
                    interval: '0',
                    showMaxLabel: true,
                    textStyle: {
                      color: '#00E1F1',
                      fontSize: "10"
                    },

                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#00E1F1',
                    }
                  },
                },
                grid: {
                  left: '10%',
                  right: '5%',
                  top: '30%',
                  bottom: '15%',
                },
                yAxis: {
                  type: 'value',
                  name: "万米",
                  nameTextStyle: {
                    color: '#00E1F1',
                    fontSize: "15",
                  },
                  axisLabel: {
                    margin: 5,
                    textStyle: {
                      color: '#00E1F1',
                      fontSize: "15",
                      padding: [0, 0, -15, 20],
                    },
                    showMaxLabel: false,
                  },
                  splitNumber: 6,
                  splitLine: {
                    show: false
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#00E1F1',
                    }
                  },
                },
                series: [{
                  data: this.yield_year,
                  type: 'bar',
                  barMaxwidth: 20,
                  itemStyle: {
                    color: '#FFA502',
                  }
                }]
              })
            }
          })

        })
        window.addEventListener('resize', function () {
          myChart.resize();
        })
      },
      //注册用户联网设备图表
      userregistrationChart: function () {
        let myChart = this.$echarts.init(document.getElementById('userregistrationChart'));
        axios({
          url: 'http://120.55.124.53:14100/paltformBoard/getOnlineInfo',
          method: 'get',
        }).then(res => {
          //console.log(res)
          let abc = [];
          let temp = [];
          let temp1 = [];
          let month = [];
          let equ = [];

          let number = [];
          abc = Object.keys(res.data.data.details_month).map(val => ({
            key: val,
            val: res.data.data.details_month[val]
          }))

          for (let i = 0; i < abc.length; i++) {
            number.push(abc[i].key)
            for (let j = i + 1; j < abc.length; j++) {
              if (abc[i].key > abc[j].key) {
                temp = abc[j].val;
                abc[j].val = abc[i].val;
                abc[i].val = temp;
                temp1 = abc[j].key;
                abc[j].key = abc[i].key;
                abc[i].key = temp1;
              }
            }

            month.push(abc[i].key);
            equ.push(abc[i].val);
          }
          this.month = number;
          this.equ = equ;
          month = [];
          equ = [];

          myChart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                triggerTooltip: true,
                type: 'shadow',
              },
              formatter: function (params) {
                return params[0].name + "<br>" + params[0].value + '个';
              }
            },
            xAxis: {
              type: 'category',
              data: this.month,
              axisLabel: {
                color: '#00E1F1',
                interval: '0',
                showMaxLabel: true,
                textStyle: {
                  color: '#00E1F1',
                  fontSize: "13"
                },

              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#00E1F1',
                }
              },
            },
            grid: {
              left: '14%',
              right: '5%',
              top: '30%',
              bottom: '15%',
            },
            yAxis: {
              type: 'value',
              name: "↑",
              nameTextStyle: {
                color: '#00E1F1',
                fontSize: "15",
                padding: [0, 0, -15, 20],
              },
              axisLabel: {
                margin: 5,
                textStyle: {
                  color: '#00E1F1',
                  fontSize: "15"
                },
                showMaxLabel: false,
              },
              splitNumber: 6,
              splitLine: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#00E1F1',
                }
              },
            },
            series: [{
              data: this.equ,
              type: 'bar',
              barMaxwidth: 20,
              itemStyle: {
                color: '#CE436B',
              }
            }]
          })
          window.addEventListener('resize', function () {
            myChart.resize();
          })
        })

      },
      //开机效率推移图表
      poweronefficiencyChart: function () {
        let myChart = this.$echarts.init(document.getElementById('poweronefficiencyChart'));
        axios({
          url: 'http://120.55.124.53:14100/paltformBoard/getStartEfficiency',
          method: 'get',
        }).then(res => {
          //console.log(res)
          let abc = [];
          let abc1 = [];
          let abc2 = [];
          let abc3 = [];
          for (var i = 0; i < res.data.data.last_year.length; i++) {
            if (res.data.data.last_year[i].efficiency != 0) {
              abc.push(res.data.data.last_year[i].date);
              abc1.push(res.data.data.last_year[i].efficiency * 100);
            }
          };

          for (var i = 0; i < res.data.data.this_year.length; i++) {
            if (res.data.data.this_year[i].efficiency != 0) {
              abc2.push(res.data.data.this_year[i].date);
              abc3.push(res.data.data.this_year[i].efficiency * 100);
            }
          };
          axios({
            url: 'http://120.55.124.53:14100/paltformBoard/getEnergyInfo',
            method: 'get',
          }).then(Response => {
            //console.log(Response.data.data.last_year)
            //console.log(Response.data.data.this_year)
            let lastList = []
            let thisList = []
            // for(let i=0;i<Response.data.data.last_year;i++){
            //     if(abc.indexOf(Response.data.data.last_year[i].date))

            // }
            let arr2 = Response.data.data.this_year
            let arr1 = res.data.data.this_year

            const combined = arr2.reduce((acc, cur) => {
              const target = acc.find(e => e.date === cur.date);

              if (target) {
                Object.assign(target, cur);
              } else {
                acc.push(cur);
              }
              return acc;
            }, arr1);
            //console.log(combined)
            let arr3 = Response.data.data.last_year
            let arr4 = res.data.data.last_year

            const combined2 = arr4.reduce((acc, cur) => {
              const target2 = acc.find(e => e.date === cur.date);

              if (target2) {
                Object.assign(target2, cur);
              } else {
                acc.push(cur);
              }
              return acc;
            }, arr3);
            //console.log(combined2)


            let xlist = []
            let ylist = []
            let ylist2 = []
            if (document.getElementById("select2").value == "last_year") {

              combined2.forEach(element => {
                xlist.push(element.date)
                ylist.push(element.efficiency * 100)
                if (isNaN(element.electric)) {
                  ylist2.push(0)
                } else {
                  ylist2.push(parseInt(element.electric))
                }
              });



            } else {

              combined.forEach(element => {
                xlist.push(element.date)
                ylist.push(element.efficiency * 100)

                if (isNaN(element.electric)) {
                  ylist2.push(0)
                } else {
                  ylist2.push(parseInt(element.electric))
                }

              });


            }
            //console.log(xlist)
            //console.log(ylist)
            //console.log(ylist2)

            //console.log(Math.min(...ylist2))
            //console.log(Math.max(...ylist2))

            myChart.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  triggerTooltip: true,
                  type: 'shadow',
                },
                formatter: function (params) {
                  return xlist[params[0].dataIndex] + "<br>" + '效率：' + params[0].data.toFixed(2) + '%' +
                    "<br>" + '能源：' + params[1].data.toFixed(2) + '';
                },
              },
              legend: {



                data: [{
                    name: "效率",
                    icon: 'image://https://s3.ax1x.com/2021/01/06/sAo7H1.png', //格式为'image://+icon文件地址'，其中image::后的//不能省略

                  },
                  {
                    name: '能源',

                    icon: 'image://https://s3.ax1x.com/2021/01/06/sAoTBR.png' //格式为'image://+icon文件地址'，其中image::后的//不能省略
                  }
                ],
                top: "8%",
                left: "center",
                itemWidth: 27,
                itemHeight: 20,
                textStyle: {

                  padding: [0, 0, 0, 4],
                  color: "white"
                }



              },
              xAxis: {
                type: 'category',
                data: xlist,
                boundaryGap: true, //设置为true
                axisLabel: {
                  color: '#00E1F1',
                  //interval: 0,
                  textStyle: {
                    color: "#00E1F1",
                    fontSize: "15",
                  },

                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#00E1F1',
                  }
                },
                axisTick: {
                  show: false,
                },

                splitLine: {
                  show: false
                }
              },
              grid: {
                left: '12%',
                right: '15%',
                top: '25%',
                bottom: '20%',
              },
              yAxis: [{
                type: 'value',
                name: "%",
                boundaryGap: [0, 0],
                nameTextStyle: {
                  color: '#00E1F1',
                  fontSize: "15",
                  padding: [0, 0, -15, 20],
                },
                axisLabel: {
                  margin: 5,
                  textStyle: {
                    color: "#00E1F1",
                    fontSize: "15"
                  },
                  splitLine: {
                    show: false
                  }
                },
                min: 0,
                max: 100,
                splitNumber: 6,
                splitLine: {
                  show: false
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#00E1F1',
                  }
                },
              }, {

                type: 'value',

                nameTextStyle: {
                  color: '#00E1F1',
                  fontSize: "15",

                },

                axisLabel: {

                  textStyle: {
                    color: "#00E1F1",
                    fontSize: "15"
                  },
                  splitLine: {
                    show: false
                  }
                },

                splitLine: {
                  show: false
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#00E1F1',
                  }
                },
              }],

              dataZoom: [{
                show: true,
                //filterMode: 'filter',
                xAxisIndex: 0,
                start: 1,
                end: 35,
                startValue: '2020-01-01',
                endValue: '2020-08-06',
                type: 'slider',
                height: 25,
                borderColor: "#fff",
                backgroundColor: "black",
                showDetail: true,
                textStyle: {
                  color: "white",
                },

              }, ],
              series: [{
                  data: ylist,

                  symbol: "none",
                  name: "效率",
                  yAxisIndex: 0,
                  type: 'line',
                  areaStyle: {},
                  itemStyle: {
                    normal: {
                      color: 'rgba(0, 150, 255,30%)', //折线点的颜色
                      lineStyle: {
                        color: "#0096FF", //折线的颜色
                      }
                    }
                  },
                },
                {
                  data: ylist2,

                  type: 'bar',
                  name: "能源",

                  yAxisIndex: 1,
                  areaStyle: {},
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [{
                            offset: 1,
                            color: 'rgba(0, 150, 255,30%)'
                          }, //柱图渐变色

                          {
                            offset: 0,
                            color: 'rgb(242,138,3)'
                          }, //柱图渐变色
                        ]
                      )
                    },
                  }
                }
              ]
            })




          })


        })

        window.addEventListener('resize', function () {
          myChart.resize();
        })


      },

      //各年龄学历分布图
      educationbackgroundChart: function () {
        let myChart = this.$echarts.init(document.getElementById('educationbackgroundChart'));
        axios({
          url: 'http://120.55.124.53:9942/getEducationalDistribution',
          method: 'get',
        }).then(res => {
          //console.log(res)    
          let nodes = [];
          let abc = [{
            'name': "初中",
            itemStyle: {
              color: '#56BBA1'
            }
          }, {
            'name': "小学"
          }, {
            'name': "高中"
          }, {
            'name': "中专"
          }, {
            'name': "大专"
          }, {
            'name': "本科",
            itemStyle: {
              color: '#8174D4'
            }
          }];
          let link = [];
          let links = [];
          let links1 = [];
          let links2 = [];
          let links3 = [];
          let links4 = [];
          let links5 = [];
          let links6 = [];
          let nodes1 = [];
          let nodes2 = [];
          let nodes3 = [];
          let nodes4 = [];
          let nodes5 = [];
          let temp = [];
          let temp1 = [];

          for (let i = 0; i < res.data.data.length; i++) {
            for (let j = i + 1; j < res.data.data.length; j++) {
              if (res.data.data[i].age_range.substring(0, 1) < res.data.data[j].age_range.substring(0, 1)) {
                temp = res.data.data[j].age_range;
                res.data.data[j].age_range = res.data.data[i].age_range;
                res.data.data[i].age_range = temp;

                temp1 = res.data.data[j].details;
                res.data.data[j].details = res.data.data[i].details;
                res.data.data[i].details = temp1;
              }
            }

            nodes.push({
              'name': res.data.data[i].age_range
            });
            if (res.data.data[i].age_range == '18-24') {
              nodes[i]['itemStyle'] = {
                'color': '#E7587C'
              }
            } else if (res.data.data[i].age_range == '25-34') {
              nodes[i]['itemStyle'] = {
                'color': '#EE7F36'
              }
            } else if (res.data.data[i].age_range == '35-44') {
              nodes[i]['itemStyle'] = {
                'color': '#FDF465'
              };
            } else {
              nodes[i]['itemStyle'] = {
                'color': '#73C9FA'
              };
            }
          }

          for (let j = 0; j < (res.data.data[0].details).length; j++) {
            links1.push(res.data.data[0].details[j])
            //改标签
            for (var i in links1) {
              for (var k in links1[i]) {
                if (k == 'num') {
                  links1[i]['value'] = links1[i][k];
                  delete links1[i]['num'];
                }
                if (k == 'educationName') {
                  links1[i]['target'] = links1[i][k];
                  delete links1[i]['educationName'];
                }
              }
            }
            //增加source
            links1.forEach((value, index) => {
              value['source'] = res.data.data[0].age_range
            })
          }

          for (let j = 0; j < (res.data.data[1].details).length; j++) {
            links2.push(res.data.data[1].details[j])
            for (var i in links2) {
              for (var k in links2[i]) {
                if (k == 'num') {
                  links2[i]['value'] = links2[i][k];
                  delete links2[i]['num'];
                }
                if (k == 'educationName') {
                  links2[i]['target'] = links2[i][k];
                  delete links2[i]['educationName'];
                }
              }
            }
            links2.forEach((value, index) => {
              value['source'] = res.data.data[1].age_range
            })
          }

          for (let j = 0; j < (res.data.data[2].details).length; j++) {
            links3.push(res.data.data[2].details[j])
            for (var i in links3) {
              for (var k in links3[i]) {
                if (k == 'num') {
                  links3[i]['value'] = links3[i][k];
                  delete links3[i]['num'];
                }
                if (k == 'educationName') {
                  links3[i]['target'] = links3[i][k];
                  delete links3[i]['educationName'];
                }
              }
            }
            links3.forEach((value, index) => {
              value['source'] = res.data.data[2].age_range
            })
          }

          for (let j = 0; j < (res.data.data[3].details).length; j++) {
            links4.push(res.data.data[3].details[j])
            for (var i in links4) {
              for (var k in links4[i]) {
                if (k == 'num') {
                  links4[i]['value'] = links4[i][k];
                  delete links4[i]['num'];
                }
                if (k == 'educationName') {
                  links4[i]['target'] = links4[i][k];
                  delete links4[i]['educationName'];
                }
              }
            }
            links4.forEach((value, index) => {
              value['source'] = res.data.data[3].age_range
            })
          }
          nodes = nodes.concat(abc);
          links = links.concat(links1).concat(links2).concat(links3).concat(links4);
          myChart.setOption({
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'

            },
            //animation:false,
            color: ['#E7587C', '#EE7F36', '#FDF465', '#73C9FA', '#8174D4', '#56BBA1'],
            series: {
              type: 'sankey',
              layout: 'none',
              top: 50,
              right: 50,
              nodeGap: 15, //节点间隔
              nodeWidth: 10, //节点宽度
              layoutIterations: 0, //节点顺序
              //focusNodeAdjacency:true,
              label: {
                fontSize: 15,
                color: 'white',
              },
              data: nodes,
              links: links,
              /*itemStyle: {
                         normal: {
                             borderWidth: 1,
                             borderColor: '#aaa'
                         }
                     },*/
              //线条样式
              lineStyle: {
                normal: {
                  curveness: 0.6,
                  color: 'source',
                },

              }

            }
          });

          window.addEventListener('resize', function () {
            myChart.resize();
          })
        })
      },
      //实政信息
      governmentinformation() {
        axios({
          url: 'http://120.55.124.53:14100/paltformBoard/getGovInfo',
          method: 'get',
        }).then(res => {
          let abc = [];
          let temp1 = [];
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].title.length > 20) {
              abc.push({
                'message': res.data.data[i].title.substring(0, 20) + "...",
                'date': res.data.data[i].date
              });
            } else {
              abc.push({
                'message': res.data.data[i].title,
                'date': res.data.data[i].date
              });
            }
            temp1.push(res.data.data[i].url);
          };

          this.listData1 = abc;
          abc = [];
          this.urllll = temp1;

        })
      },
      //在线信息
      onlineinformation() {
        axios({
          url: 'http://120.55.124.53:14100/paltformBoard/getOnlineInfo',
          method: 'get',
        }).then(res => {
          this.online_count = res.data.data.online_count;
          this.online_firm = res.data.data.online_firm;
          this.register_user = res.data.data.register_user;
        })
      },
      //机器上报维修统计
      repairstatistics() {
        axios({
          url: 'http://120.55.124.53:14100/paltformBoard/repairStatistics',
          method: 'get',
        }).then(res => {
          let temp = [];
          let temp1 = [];
          let temp2 = [];
          let temp3 = [];
          let temp4 = [];
          for (var i = 0; i < res.data.length; i++) {
            for (let j = i + 1; j < res.data.length; j++) {
              if (res.data[i].machine_num > res.data[j].machine_num) {
                temp = res.data[j].machine_num;
                res.data[j].machine_num = res.data[i].machine_num;
                res.data[i].machine_num = temp;
                temp1 = res.data[j].region;
                res.data[j].region = res.data[i].region;
                res.data[i].region = temp1;
                temp2 = res.data[j].repair_type;
                res.data[j].repair_type = res.data[i].repair_type;
                res.data[i].repair_type = temp2;
                temp3 = res.data[j].submit_date;
                res.data[j].submit_date = res.data[i].submit_date;
                res.data[i].submit_date = temp3;
              }
            }
            temp4.push({
              'area': res.data[i].region,
              'repair_type': res.data[i].repair_type,
              'quantity_facility': res.data[i].machine_num,
              'report_date': res.data[i].submit_date.substring(0, 10)
            });
          }
          this.listData2 = temp4;
          temp4 = [];
        })
      },
      //活跃用户数
      userDetails() {
        axios({
          url: 'http://120.55.124.53:14100/paltformBoard/userDetails',
          method: 'get',
        }).then(res => {
          let ttteeemp = [];
          let portraitarry = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ]
          for (let i = 0; i < res.data.data.length; i++) {
            this.yhdate[i] = (res.data.data[i].date.substring(2, 4) + res.data.data[i].date.substring(4, 7))
          }
          for (let i = 0; i < res.data.data.length; i++) {
            this.yhnum[i] = res.data.data[i].num
          }

          for (let i = 0; i < res.data.data.length; i++) {
            ttteeemp[i] = Math.round(res.data.data[i].num / (400 / 18))
          }

          for (let i = 0; i < res.data.data.length; i++) {
            for (let j = 0; j < ttteeemp[i]; j++) {
              portraitarry[i][j] = 1;
            }
          }
          this.portraitarry1 = portraitarry[0];
          this.portraitarry2 = portraitarry[1];
          this.portraitarry3 = portraitarry[2];
          this.portraitarry4 = portraitarry[3];
          this.portraitarry5 = portraitarry[4];
        })

      },
      getDataTiming: function () {
        const timer = setInterval(() => {
          this.userregistrationChart();
          this.poweronefficiencyChart();
          this.educationbackgroundChart();
          this.governmentinformation();
          this.onlineinformation();
          this.repairstatistics();
          this.userDetails();
          // this.getDataTiming();
          this.regionaloutputvalueChart()


        }, 4000);
      },
      //链接
      clickProps(e) {
        window.open(this.urllll[e.target.id], "newwin", "toolbar=no,scrollbars=" + scroll + ",menubar=no");
      },
      clicklinks1() {
        window.location.href = "http://106.12.219.66:81/TIISignBoard/dist/#/10000017";
      },
      clicklinks2() {
        window.location.href = "http://106.12.219.66:81/TIISignBoard/dist/#/10000020";
      }
    },

    mounted() {
      //console.log(this.$route)
      if (this.$route.params.user) {
        this.$nextTick(() => {
          this.regionaloutputvalueChart();
          this.poweronefficiencyChart();
        })
        this.userregistrationChart();
        this.educationbackgroundChart();
        this.governmentinformation();
        this.onlineinformation();
        this.timer = setInterval(() => {
          this.setNowTimes()
        }, 1000)
        this.$nextTick(() => {
          this.initMap()
        })
        this.repairstatistics();
        this.userDetails();
        this.getDataTiming();
      } else {
        this.$router.push({
          //跳转并传参数
          path: "/login",
          name: "login",

        });
      }

    },
  }
</script>
<style>
  @font-face {
    font-family: "digital-7 (italic)";
    src: url("../digital-7 (italic)/digital-7 (italic).woff2") format("woff2"),
      url("../digital-7 (italic)/digital-7 (italic).woff") format("woff"),
      url("../digital-7 (italic)/digital-7 (italic).ttf") format("truetype"),
      url("../digital-7 (italic)/digital-7 (italic).eot") format("embedded-opentype"),
      url("../digital-7 (italic)/digital-7 (italic).svg") format("svg");
  }

  body {
    margin: 0;
    padding: 0;
  }

  .body {
    background: #111931;
    background-image: url("../icon/背景.png");
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .ptqyjk {
    background-image: url("../icon/ERP.png");
    background-size: 100% 100%;
    font-size: 3vh;
    text-align: center;
    line-height: 200%;
    position: absolute;
    top: 2%;
    left: 3%;
    color: white;
  }

  .ptqyjk2 {
    background-image: url("../icon/MES.png");
    background-size: 100% 100%;
    font-size: 3vh;
    text-align: center;
    line-height: 200%;
    position: absolute;
    top: 2%;
    left: 13%;
    color: white;
  }

  .fzgy {
    background-image: url("../icon/织造工业互联网平台数据中心.png");
    background-size: 100% 100%;
    position: absolute;
    top: 1%;
    left: 5%;
    color: white;
    text-align: center;
    font-size: 4vh;


  }

  .sj {
    background-image: url("../icon/当前时间.png");
    background-size: 100% 100%;
    position: absolute;
    top: 2%;
    right: 3%;
  }

  .left {
    position: absolute;
    left: 0.7%;
    top: 9%;

  }

  .center {
    position: absolute;
    left: 28%;

  }

  .right {
    position: absolute;
    right: 0.7%;
    top: 9%;
  }

  .left1 {
    background-image: url("../icon/各区域产值背景.png");
    background-size: 100% 100%;
    position: relative;

  }

  .left2 {
    background-image: url("../icon/各区域产值背景.png");
    background-size: 100% 100%;
    position: relative;
    top: 1.5vh;
  }

  .left3 {
    background-image: url("../icon/各区域产值背景.png");
    background-size: 100% 100%;
    position: relative;
    top: 3.5vh;
    z-index: 101;
  }

  .szxx {
    background-image: url("../icon/实政信息.png");
    background-size: 100% 100%;
    position: relative;
    top: -1%;
    left: 4%;
  }

  .right1 {
    background-image: url("../icon/各区域产值背景.png");
    background-size: 100% 100%;
    position: relative;
  }

  .right2 {
    background-image: url("../icon/机修上报维修统计-背景.png");
    background-size: 100% 100%;
    position: relative;
    top: 2%;
  }

  .right3 {
    background-image: url("../icon/各年龄学历分布.png");
    background-size: 100% 100%;
    position: relative;
    top: 4%;
  }

  .bottom_font {
    position: absolute;
    bottom: -2%;
    right: -65%;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.8vh;
    z-index: 100;
  }

  .Date {
    font-family: "digital-7 (italic)";
    font-size: 3.3vh;
    color: #00C8DF;
    top: 10%;
    left: 4%;
    position: absolute;
  }

  .time {
    font-family: "digital-7 (italic)";
    font-size: 3.4vh;
    color: #00C8DF;
    top: 22%;
    right: 4%;
    position: absolute;
  }

  .title1 {
    color: white;
    font-size: 2.5vh;
    left: 3%;
    top: 8%;
    position: absolute;
  }

  .choose {
    border: none;
    background-color: #111931;
    font-size: 2vh;
    right: 7%;
    top: 8%;
    position: absolute;
    z-index: 999;
    color: white;
  }

  .message_table {
    width: 100%;
    height: 28vh;
    overflow: hidden;
    display: inline-block;
    font-size: 2.2vh;
  }

  .first_tr1 {
    display: flex;
  }

  .first_th1 {
    color: white;
    font-size: 2.4vh;
    margin-left: 2.2vh;
    margin-top: 2vh;
  }

  .second_th1 {
    color: orange;
    font-size: 2vh;
    right: 5%;
    top: 8%;
    position: absolute;
  }

  .message {
    left: 4%;
    position: relative;
    float: left;
  }

  .date {
    right: 5%;
    position: absolute;
  }

  .item {
    margin-left: -5.6%;
  }

  .itemli1 {
    width: 100%;
    display: flex;
    color: white;
    margin-bottom: 1.5vh;
  }

  .item_style {
    width: 100%;
    float: left;
  }

  /* 奇数行的样式 */
  .itemli1:nth-child(odd)>.item_style {
    background-color: #005B71;
    width: 99.5%;
  }

  /* 偶数行的样式 */
  .itemli1:nth-child(even)>.item_style {
    background: none;
  }

  .border {
    border-left: 3px solid #FF7400;
    position: relative;
    top: 5%;
    margin-left: 3vh;
    width: 100%;
    height: 16.5%;
  }

  .yield {
    color: white;
    font-size: 2.5vh;
    margin-left: 1vh;
  }

  .num {
    color: white;
    font-size: 5vh;
    font-family: "digital-7 (italic)";
  }

  .number1 {
    background: rgb(0, 228, 251, 30%);
    border-radius: 2px;
    text-align: center;
    width: 50%;
    height: 100%;
    margin-top: 1.5vh;
    margin-left: 0.5vh;
    padding: 5%;
  }

  .number {
    background: rgb(0, 228, 251, 30%);
    border-radius: 2px;
    text-align: center;
    width: 50%;
    height: 100%;
    margin-top: 1.5vh;
    padding: 5%;
  }

  .number2 {
    margin-top: 0.5vh;
    margin-left: -1vw;
    position: absolute;
    font-size: 7vh;
  }

  .frame {
    border: 2px solid #00C7EE;
    font-size: 2.5vh;
    color: white;
    width: 25vh;
    height: 9vw;
    text-align: center;
    position: absolute;
    top: 20%;
    right: 0%;
  }

  .frame1 {
    border-bottom: 2px solid #00C7EE;
    height: 5vh;
  }

  .frame_name {
    height: 5vh;
    background: #00617E;
    line-height: 5vh;
  }

  .frame_number {
    height: 5vh;
    line-height: 5vh;
    font-size: 4vh;
    font-family: "digital-7 (italic)";
    text-align: left;
    margin-left: 1vw;
  }

  .frame_name1 {
    background: #00617E;
    height: 5vh;
    line-height: 5vh;
  }

  .frame_number1 {
    line-height: 5vh;
    height: 5vh;
    font-size: 4vh;
    line-height: 5vh;
    font-family: "digital-7 (italic)";
    text-align: left;
    margin-left: 1vw;
  }

  .regional_output {
    font-size: 2vh;
    top: -2%;
    left: 2%;
  }

  .statistics_table {
    font-size: 2vh;
    width: 100%;
    height: 31vh;
    overflow: hidden;
    display: inline-block;
    position: relative;
    top: -50%;
  }

  .table {
    widows: 100%;
    height: 2vh;
    margin-top: 5px;
  }

  .seamless-warp {
    height: 80%;
    overflow: hidden;
    width: 100%;
    text-align: center;
  }

  .first_tr {
    display: flex;
    font-size: 2.2vh;
    color: orange;
    margin-top: 10vh;
  }

  .first_th {
    margin-left: 1.4vw;
  }

  .second_th {
    margin-left: 2.6vw;
  }

  .third_th {
    margin-left: 1.5vw;
  }

  .four_th {
    margin-left: 1.5vw;
  }

  .itemli {
    width: 100%;
    height: 100%;
    display: flex;
    color: white;
    margin-left: -1.3vw;
    margin-bottom: 0.5vh;
    margin-top: 1vh;
    font-size: 2vh;
  }

  .itemli span {
    flex: 1;
  }

  .map-container {
    position: absolute;
    top: 10%;
    left: -5%;
  }

  .select1 {
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: rgb(17, 25, 49, 1);
    font-size: 2vh;
    right: 5%;
    position: absolute;
    z-index: 999;
    color: white;
    height: 4vh;
    padding: 1vh;
    border: 0;
    outline: none;
    width: 4.5vw;
  }

  .arrow {
    border: 1px solid#111931;
    border-radius: 3px;
    color: #00E8FF;
    overflow: hidden;
    height: 4vh;
    width: 5vw;
    font-size: 2vh;
    position: absolute;
    left: 78%;
    top: 5%;
    display: block;

  }

  .arrow:after {
    content: "▼";
    position: absolute;
    right: 1.7vh;
    top: 0.6vh;
    z-index: 9999;
    text-align: center;
    width: 10%;
    height: 10%;
    pointer-events: none;
    box-sizing: border-box;
    transform: scale(1.6, 0.9)
  }

  .select2 {
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: rgb(17, 25, 49, 1);
    font-size: 2vh;
    right: 5%;
    position: absolute;
    z-index: 999;
    color: white;
    height: 4vh;
    padding: 1vh;
    border: 0;
    outline: none;
    width: 4.5vw;
  }

  .head_portrait {
    background-image: url("../icon/头像.png");
    background-size: 100% 100%;
    font-size: 3vh;
    text-align: center;
    position: relative;
    top: 0;
    left: 0;
  }

  .head_portrait2 {
    background-image: url("../icon/头像.png");
    background-size: 100% 100%;
    opacity: 0.3;
    font-size: 3vh;
    text-align: center;
    position: relative;
    top: 0;
    left: 0;
  }

  .head1 {
    position: relative;
    top: 0%;
    left: 14%;
  }

  .head2 {
    position: relative;
    top: -14%;
    left: 14%;
  }

  .head3 {
    position: relative;
    top: -28%;
    left: 14%;
  }

  .head4 {
    position: relative;
    top: -42%;
    left: 14%;
  }

  .head5 {
    position: relative;
    top: -55%;
    left: 14%;
  }

  .txrq1 {
    font-size: 1vw;
    position: relative;
    top: 4.6vh;
    left: -13%;
    color: white;
  }

  .txsj1 {
    font-size: 1vw;
    position: relative;
    top: 2.4vh;
    left: 87%;
    color: #FF9F00;

  }

  .hyyhs {
    font-size: 2.5vh;
    position: relative;
    left: 3%;
    top: 8%;
    color: white;
  }

  .zbz {
    font-size: 2vh;
    position: relative;
    top: -54%;
    left: 14%;
    color: white;
  }

  .education_background {
    top: 8%;
    position: relative;
  }

  .mask {
    background-color: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1
  }

  .pop {
    background-image: url("../icon/弹出框.png");
    background-size: 100% 100%;
    position: absolute;
    z-index: 2;
    right: 110%;
    top: 30%;
  }

  .name {
    top: 25%;
    left: 20%;
    position: absolute;
    color: #008BB0;
    text-align: left;
  }
</style>