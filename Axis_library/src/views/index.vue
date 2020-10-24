<template>

  <div class="content">
    <div class="box">
      <div class="head"><span>欢迎您，xxx管理员</span><span>2020-09-12 08:32</span></div>
      <div class="top">
        <div class="top_card">
          <div class="top_card_con">
            <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              style="width:5rem;height:5rem"></el-image>
            <div class="font"><span style="color:#FF9A44">3600.00元</span><span
                style="color:#A1A1A1;font-weight:500;font-size:1rem">今日销售额</span></div>
          </div>
        </div>
        <div class="top_card">
          <div class="top_card_con">
            <el-image src="" style="width:5rem;height:5rem"></el-image>
            <div class="font"><span style="color:#DC3943">600.00元</span><span
                style="color:#A1A1A1;font-weight:500;font-size:1rem">昨日销售额</span></div>
          </div>
        </div>
        <div class="top_card">
          <div class="top_card_con">
            <el-image src="" style="width:5rem;height:5rem"></el-image>
            <div class="font"><span style="color:#1CC18B">85723.00元</span><span
                style="color:#A1A1A1;font-weight:500;font-size:1rem">青叶库存总额</span></div>
          </div>
        </div>
        <div class="top_card">
          <div class="top_card_con">
            <el-image src="" style="width:5rem;height:5rem"></el-image>
            <div class="font"><span style="color:#2877F9">680721.00元</span><span
                style="color:#A1A1A1;font-weight:500;font-size:1rem">商品库存总额</span></div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle_card">
          <div class="middle_card_con">
            <div class="middle_card_con_title">
              快捷新增操作
            </div>
            <div class="line">
              <div class="line_con"></div>
            </div>
            <div class="middle_card_con_body">
              <div class="middle_card_con_body_one">
                <el-image
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  style="width：3rem;height;3rem"></el-image>
                <span>仓库管理</span>
              </div>

            </div>
          </div>
        </div>
        <div class="middle_card">
          <div class="middle_card_con">
            <div class="middle_card_con_title">
              青叶出库记录
            </div>
            <div class="line">
              <div class="line_con"></div>
            </div>
            <div class="middle_card_con_body">
              <div class="middle_card_con_row"><span>品种</span><span>出库数量</span><span>操作员</span></div>
              <div class="line" style="margin-top:0;">
                <div class="line_con"></div>
              </div>
              <div class="middle_card_con_row"><span>大佛龙井</span><span>105.00斤</span><span>陈光明</span></div>
              <div class="line" style="margin-top:0;">
                <div class="line_con"></div>
              </div>
              <div class="middle_card_con_row"><span>清河龙井</span><span>135.00斤</span><span>陈光明</span></div>
              <div class="line" style="margin-top:0;">
                <div class="line_con"></div>
              </div>
              <div class="middle_card_con_row"><span>清河龙井</span><span>125.00斤</span><span>陈光明</span></div>
              <div class="line" style="margin-top:0;">
                <div class="line_con"></div>
              </div>

            </div>
          </div>
        </div>
        <div class="middle_card">
          <div class="middle_card_con">
            <div class="middle_card_con_title">
              商品总览
            </div>
            <div class="line">
              <div class="line_con"></div>
            </div>
            <div class="middle_card_con_body" style="overflow-x:hidden">
              <div class="middle_card_con_row2">
                <div style="display:flex;align-items:center;">
                  <el-image src="" style="width:1.5rem;height:1.5rem;"></el-image><span
                    style="margin-left:10px">大佛龙井</span>
                </div><span>400斤</span>
              </div>
              <el-progress :percentage="80" style="width:100%;"></el-progress>
              <div class="middle_card_con_row2">
                <div style="display:flex;align-items:center;">
                  <el-image src="" style="width:1.5rem;height:1.5rem;"></el-image><span
                    style="margin-left:10px">大佛龙井</span>
                </div><span>400斤</span>
              </div>
              <el-progress :percentage="80" style="width:100%;"></el-progress>
              <div class="middle_card_con_row2">
                <div style="display:flex;align-items:center;">
                  <el-image src="" style="width:1.5rem;height:1.5rem;"></el-image><span
                    style="margin-left:10px">大佛龙井</span>
                </div><span>400斤</span>
              </div>
              <el-progress :percentage="80" style="width:100%;"></el-progress>
              <div class="middle_card_con_row2">
                <div style="display:flex;align-items:center;">
                  <el-image src="" style="width:1.5rem;height:1.5rem;"></el-image><span
                    style="margin-left:10px">大佛龙井</span>
                </div><span>400斤</span>
              </div>
              <el-progress :percentage="80" style="width:100%;"></el-progress>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom_card">
          <div class="bottom_card_con">
            <div class="middle_card_con_title">
              销售统计
            </div>
            <div class="line">
              <div class="line_con"></div>
            </div>
            <div class="middle_card_con_body" style="overflow:hidden">
              <div class="sale">
                <div class="sale_con" style="font-size: 0.8rem;color:#A8A9AE">
                  <span>本月销售总额</span>
                  <div style="width:45%;height:100%;display:flex;align-items:center;  justify-content: space-around;">
                    <div>
                      <el-image src="" style="width:0.8rem;height:0.8rem;"></el-image><span>上月</span>
                    </div>
                    <div>
                      <el-image src="" style="width:0.8rem;height:0.8rem;"></el-image><span>本月</span>
                    </div>
                  </div>
                </div>
                <div class="sale_con" style="font-size: 1.2rem;"><span>54703.00元</span>
                  <el-progress :percentage="80" :stroke-width="15" color="red" :show-text="false"
                    style="width:35%;margin-right:1rem;"></el-progress>
                </div>
                <div class="sale_con" style="font-size:0.8rem;">
                  <div style="width:45%;height:100%;display:flex;align-items:center;  justify-content: space-around;">
                    <el-image src="" style="width:0.8rem;height:0.8rem;"></el-image><span
                      style="color:red">30%</span><span>（同比上月）</span>
                  </div>
                  <el-progress :percentage="80" :stroke-width="15" color="#6FA0F6" :show-text="false"
                    style="width:35%;margin-right:1rem;"></el-progress>
                </div>
              </div>
              <div class="sale">
                <div class="sale_con" style="font-size: 0.8rem;color:#A8A9AE">
                  <span>本月销售总额</span>
                  <div style="width:45%;height:100%;display:flex;align-items:center;  justify-content: space-around;">
                    <div>
                      <el-image src="" style="width:0.8rem;height:0.8rem;"></el-image><span>上月</span>
                    </div>
                    <div>
                      <el-image src="" style="width:0.8rem;height:0.8rem;"></el-image><span>本月</span>
                    </div>
                  </div>
                </div>
                <div class="sale_con" style="font-size: 1.2rem;"><span>54703.00元</span>
                  <el-progress :percentage="80" :stroke-width="15" color="red" :show-text="false"
                    style="width:35%;margin-right:1rem;"></el-progress>
                </div>
                <div class="sale_con" style="font-size:0.8rem;">
                  <div style="width:45%;height:100%;display:flex;align-items:center;  justify-content: space-around;">
                    <el-image src="" style="width:0.8rem;height:0.8rem;"></el-image><span
                      style="color:red">30%</span><span>（同比上月）</span>
                  </div>
                  <el-progress :percentage="80" :stroke-width="15" color="#6FA0F6" :show-text="false"
                    style="width:35%;margin-right:1rem;"></el-progress>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_card2">
          <div class="bottom_card2_con">
            <div class="bottom_card2_head">
              <span>近一周订单统计</span>
              <div style="width:41%;"><span v-html="item.text" :style="item.style" v-for="(item,index) in spanList"
                  :key="index" @click="change(item.text)"></span>
                <el-date-picker size="mini" style="width:52%;margin-left:10px;" v-model="time" type="daterange"
                  range-separator="-">
                </el-date-picker>
              </div>
            </div>
            <div class="echart" id="echart">
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>



</template>
<script>
  import axios from 'axios'
  export default {
    name: "index",
    data: () => ({
      time: "",
      spanList: [{
          text: "本日",
          style: "color:#6FA0F6"
        },
        {
          text: "&nbsp;&nbsp;|&nbsp;&nbsp;"
        },
        {
          text: "本周",
          style: "color:#9A9A9A"
        },
        {
          text: "&nbsp;&nbsp;|&nbsp;&nbsp;"
        },
        {
          text: "本月",
          style: "color:#9A9A9A"
        },


      ]
    }),

    methods: {
      echart() {
        let myChart1 = this.$echarts.init(document.getElementById('echart'));
        // 绘制图表

        myChart1.clear();

        let option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              show: false
            },
            axisTick: {
              lineStyle: {
                color: '#9A9A9A'
              }

            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#9A9A9A'
              }
            },
            data: ['01-30', '01-31', '02-01', '02-02', '02-03', '02-04', '02-05']
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              lineStyle: {
                color: '#9A9A9A'
              }

            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#9A9A9A'
              }
            }
          },
          grid: {
            left: "5%",
            right: "3%",
            bottom: "10%",
            top: "10%"
          },
          series: [{
            data: [420, 132, 301, 234, 190, 430, 320],
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#A993E6',
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#A993E6'
                }, {
                  offset: 1,
                  color: 'white'
                }])
              }
            }
          }]
        };

        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })
      },
      change(e) {

        for (let i = 0; i < this.spanList.length; i++) {
          if (this.spanList[i].text == e) {
            for (let i = 0; i < this.spanList.length; i++) {
              this.spanList[i].style = "color:#9A9A9A"
            }
            this.spanList[i].style = "color:#6FA0F6"
          }
        }
      }

    },
    mounted() {
      this.echart()
    },
    beforeDestroy() {

    },


  }

</script>
<style scoped>
  .content {
    width: 100%;
    height: 100vh;
    background: #F9F9F9;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    width: 92%;
    height: 97%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .head {
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 600;
    /* border: 1px solid black; */
  }

  .top {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid black; */
  }

  .top_card {
    width: 18%;
    height: 80%;
    border-radius: 15px;
    background: white;
    box-shadow: 1.2px 1.2px 1.2px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid rgba(0,0,0,0.3);
      border-radius: 15px; */
  }

  .top_card_con {
    width: 80%;
    height: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;

  }

  .font {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .font span {
    width: 100%;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .middle {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid black; */
  }

  .middle_card {
    width: 25%;
    height: 100%;
    border-radius: 15px;
    box-shadow: 1.2px 1.2px 1.2px rgba(0, 0, 0, 0.1);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid rgba(0,0,0,0.3);
      border-radius: 15px; */
  }

  .middle_card_con {
    width: 85%;
    height: 90%;
    display: flex;
    flex-direction: column;

  }

  .middle_card_con_title {
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;

  }

  .line {
    width: 100%;
    height: 1.5px;
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .line_con {
    width: 100%;
    height: 2px;
    background: rgba(0, 0, 0, 0.2);
  }

  .middle_card_con_body {
    width: 100%;
    height: 80%;

    overflow: auto;


  }

  .middle_card_con_body_one {
    width: 19%;
    height: 42%;
    display: flex;

    flex-direction: column;
    justify-content: space-between;
    margin-left: 2.5%;
    margin-top: 2%;
    margin-right: 2.5%;
    float: left;
  }

  .middle_card_con_body_one span {
    font-size: 0.8rem;
    color: #A1A1A1;
  }

  .middle_card_con_row {
    width: 100%;
    height: 24%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .middle_card_con_row span {
    color: #A8A9AE;
    width: 6rem;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .middle_card_con_row2 {
    width: 100%;
    height: 16%;
    color: #A1A1A1;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bottom {
    width: 100%;
    height: 45%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid black; */
  }

  .bottom_card {
    width: 20%;
    height: 80%;
    border-radius: 15px;
    box-shadow: 1.2px 1.2px 1.2px rgba(0, 0, 0, 0.1);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bottom_card_con {
    width: 85%;
    height: 90%;
    display: flex;
    flex-direction: column;

  }

  .sale {
    width: 100%;
    height: 45%;
    margin-top: 1rem;


  }

  .sale_con {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  .bottom_card2 {
    width: 73%;
    background: white;
    height: 80%;
    box-shadow: 1.2px 1.2px 1.2px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom_card2_con {
    width: 95%;
    height: 90%;
    display: flex;
    flex-direction: column;
  }

  .bottom_card2_head {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 0.8rem;
    color: #9A9A9A;

  }

  .echart {
    width: 100%;
    height: 90%;

  }

</style>
