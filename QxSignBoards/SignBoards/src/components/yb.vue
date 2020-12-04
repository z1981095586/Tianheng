<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="content4">

    <header>
      <div class="title">七星智能纺织-验布机</div>
      <h1 class="tip">




      </h1>
    </header>
    <div class="monitor">
      <div class="monitor_left">

        <div class="monitor_left_top">
          <div class="img">
            <div class="img_con"><a @click="back()"
                style="   font-size: 1rem;color: #5D7091;text-decoration:none">七星智能纺织</a>
              <div class="jiantou"></div><span style="margin-right:1rem">验布机</span>
            </div>
          </div>

        </div>
        <div class="ecahrt_zlfx" id="echart_zlfx"></div>
        <div class="ecahrt_qsfx" id="echart_qsfx"></div>
      </div>
      <div class="monitor_middle">
        <div class="circle_con">
          <div class="circles">
            <div class="card5">
              <div class="card5_con">
                <span class="jin">今</span>
                <span class="zong">今日疵点总数</span>

                <span class="num">18</span>
              </div>
            </div>
            <div class="card4">
              <div class="card4_con">
                <span class="jin">总</span>
                <span class="zong">验布机总数</span>
                <span class="num" style="color:#00FF08;right:3.2rem">26</span>
              </div>
            </div>
            <div class="font"><span style="font-size:1.2rem">今日验布米数
              </span><span style="font-size:2.3rem;color:#EEFF00">{{daysum}}</span></div>
          </div>
        </div>
        <div class="machine">
          <div class="machine_img"></div>
        </div>
      </div>
      <div class="monitor_right">
        <div class="monitor_left_top"></div>
        <div class="ecahrt_zlfx" id="echart_pzfx"></div>
        <div class="ecahrt_qsfx" id="echart_qsfx2"></div>
      </div>
      <!-- <div class="monitor_right">
        <div class="circle_con">
          <div class="circles">
            <div class="card5">
              <div class="card5_con">
                <span class="jin">今</span>
                <span class="zong">今日疵点总数</span>
           
                <span class="num">234</span>
              </div>
            </div>
            <div class="card4">
              <div class="card4_con">
                <span class="jin">昨</span>
                <span class="zong">昨日验布米数</span>
                <span class="num" style="color:#00FF08;right:3.2rem">{{yersum}}</span>
              </div>
            </div>
            <div class="font"><span style="font-size:1.2rem">今日验布米数
              </span><span style="font-size:2.3rem;color:#EEFF00">{{daysum}}</span></div>
          </div>
        </div>
        <div class="echart2" id="echart10"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "yb",
    data() {
      return {
        timer: null,
        companyId: this.$route.params.id, //公司库表Id
        workshopId: this.$route.params.workshopid,

        daysum: null,

      }
    },
    methods: {
      back() {
        this.$router.push({ //跳转并传参数
          path: '/productMonitor2',
          name: 'productMonitor2',
          params: {

            id: this.companyId,
            workshop_id: this.workshopId

          }
          /** 
           *
           */

        })
      },
      echart() {
        let myChart1 = this.$echarts.init(document.getElementById('echart_pzfx'));
        // 绘制图表
        myChart1.clear();
        let ylist, ylist2;
        if (this.workshopId == 1) {
          ylist = [2058, 751, 749, 744, 678, 636]
          ylist2 = [41.2, 53.6, 66.0, 78.3, 89.5, 100]
        } else if (this.workshopId == 2) {
          ylist = [61, 49, 47, 40, 31, 30]
          ylist2 = [23.6, 42.6, 60.9, 76.4, 88.4, 100]
        }
        let option = {
          // tooltip: {
          //     trigger: 'axis',
          //     axisPointer: {
          //         type: 'cross',
          //         crossStyle: {
          //             color: '#999'
          //         }
          //     }
          // },
          title: {
            text: "12月疵点品种分析",
            textStyle: {
              color: "#00C4FF",
              fontSize: 15
            },
            left: "45%"
          },
          grid: {
            left: "20%",
            right: "15%"
          },
          xAxis: [{
            type: 'category',
            data: ['SF2598', 'SA2640', 'SF8300', 'SA41420', 'SA1418', 'SF6992', ],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 12
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
          }],
          yAxis: [{
              type: 'value',
              name: '数量/个',
              axisLabel: {
                show: true,
                textStyle: {
                  color: "rgba(238,219,219,1)",
                  fontSize: 12
                },

              },
              splitLine: {
                show: false
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
            {
              type: 'value',
              name: '占比/%',
              splitLine: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "rgba(238,219,219,1)",
                  fontSize: 12
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
            }
          ],
          series: [{
              name: '数量',
              type: 'bar',
              yAxisIndex: 0,
              color: "#01ACF4",
              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },

                ],
                label: {
                  show: true,
                  position: ['0%', '30%'],
                  color: 'white', //气泡中字体颜色
                  fontWeight: "bold",
                },




              },
              data: ylist
            },

            {
              name: '占比',
              type: 'line',
              yAxisIndex: 1,
              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },

                ],
                label: {
                  show: true,
                  position: ['10%', '30%'],
                  color: 'white', //气泡中字体颜色
                  fontWeight: "bold",
                },




              },
              data: ylist2
            }
          ]
        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })

      },
      echart2() {
        let myChart1 = this.$echarts.init(document.getElementById('echart_qsfx'));
        // 绘制图表
        myChart1.clear();
        let ylist, ylist2;
        ylist = [931, 894, 1124, 925, 774, 1141, 1243, 895]
        ylist2 = [1184, 1243, 1092, 1146, 979, 1035, 941, 703]
        // if(this.workshopId==1){
        //   ylist=[2058,1791,1698,1640,1547,1281]
        //   ylist2=[20.5,38.4,55.4,71.8,87.2,100]
        // }else if(this.workshopId==2){
        //    ylist=[1900,1159,1064,853,705,592]
        //   ylist2=[30.3,1159,65.7,79.3,90.6,100]
        // }
        let option = {
          // tooltip: {
          //     trigger: 'axis',
          //     axisPointer: {
          //         type: 'cross',
          //         crossStyle: {
          //             color: '#999'
          //         }
          //     }
          // },
          color: ['#07F7C8', '#FF7501'],
          legend: {
            data: ['二车间', '三车间'],
            textStyle: {
              color: "#00C4FF",
              fontSize: 15
            },
            right: "10%",
            top: "10%"
          },
          title: {
            text: "一车间新旧机型每月疵点趋势分析",
            textStyle: {
              color: "#00C4FF",
              fontSize: 15
            },
            left: "35%"
          },
          grid: {
            left: "20%",
            right: "15%",
            top: "25%"
          },
          xAxis: [{
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, ],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 12
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
          }],
          yAxis: [{
              type: 'value',
              name: '个数/个',
              axisLabel: {
                show: true,
                textStyle: {
                  color: "rgba(238,219,219,1)",
                  fontSize: 12
                },

              },
              splitLine: {
                show: false
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

          ],
          series: [{
              name: '二车间',
              type: 'line',
              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },

                ],
                label: {
                  show: true,
                  position: ['0%', '30%'],
                  color: 'white', //气泡中字体颜色
                  fontWeight: "bold",
                },




              },

              data: ylist
            },

            {
              name: '三车间',
              type: 'line',
              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },

                ],
                label: {
                  show: true,
                  position: ['0%', '30%'],
                  color: 'white', //气泡中字体颜色
                  fontWeight: "bold",
                },




              },
              data: ylist2
            }
          ]
        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })

      },
      echart3() {
        let myChart1 = this.$echarts.init(document.getElementById('echart_zlfx'));
        // 绘制图表
        myChart1.clear();
        let ylist, ylist2;
        if (this.workshopId == 1) {
          ylist = [2058, 1791, 1698, 1640, 1547, 1281]
          ylist2 = [20.5, 38.4, 55.4, 71.8, 87.2, 100]
        } else if (this.workshopId == 2) {
          ylist = [1900, 1159, 1064, 853, 705, 592]
          ylist2 = [30.3, 48.8, 65.7, 79.3, 90.6, 100]
        }
        let option = {
          // tooltip: {
          //     trigger: 'axis',
          //     axisPointer: {
          //         type: 'cross',
          //         crossStyle: {
          //             color: '#999'
          //         }
          //     }
          // },

          title: {
            text: "12月疵点种类分析",
            textStyle: {
              color: "#00C4FF",
              fontSize: 15
            },
            left: "45%"
          },
          grid: {
            left: "25%",
            right: "10%"
          },
          xAxis: [{
            type: 'category',
            data: ['断经(有)', '断经', '双经(有)', '双经', '分散性纬缩', '纬缩降等', ],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 12
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
          }],
          yAxis: [{
              type: 'value',
              name: '数量/个',
              axisLabel: {
                show: true,
                textStyle: {
                  color: "rgba(238,219,219,1)",
                  fontSize: 12
                },

              },
              splitLine: {
                show: false
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
            {
              type: 'value',
              name: '占比/%',
              splitLine: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "rgba(238,219,219,1)",
                  fontSize: 12
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
            }
          ],
          series: [{
              name: '数量',
              type: 'bar',
              yAxisIndex: 0,
              color: "#01ACF4",
              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },

                ],
                label: {
                  show: true,
                  position: ['0%', '30%'],
                  color: 'white', //气泡中字体颜色
                  fontWeight: "bold",
                },




              },
              data: ylist
            },

            {
              name: '占比',
              type: 'line',
              yAxisIndex: 1,
              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },

                ],
                label: {
                  show: true,
                  position: ['10%', '30%'],
                  color: 'white', //气泡中字体颜色
                  fontWeight: "bold",
                },




              },
              data: ylist2
            }
          ]
        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })

      },
      echart4() {
        let myChart1 = this.$echarts.init(document.getElementById('echart_qsfx2'));
        // 绘制图表
        myChart1.clear();
        let ylist, ylist2;
        ylist2 = [1117, 1317, 1609, 1442, 1554, 1678, 1624, 1328]
        ylist = [638,721,623,301,563,367,388,402]
        // if(this.workshopId==1){
        //   ylist=[2058,1791,1698,1640,1547,1281]
        //   ylist2=[20.5,38.4,55.4,71.8,87.2,100]
        // }else if(this.workshopId==2){
        //    ylist=[1900,1159,1064,853,705,592]
        //   ylist2=[30.3,1159,65.7,79.3,90.6,100]
        // }
        let option = {
          // tooltip: {
          //     trigger: 'axis',
          //     axisPointer: {
          //         type: 'cross',
          //         crossStyle: {
          //             color: '#999'
          //         }
          //     }
          // },
          color: ['#FF4A7B', '#01ACF4'],
          legend: {
            data: ['新机', '旧机'],
            textStyle: {
              color: "#00C4FF",
              fontSize: 15
            },
            right: "10%",
            top: "10%"
          },
          title: {
            text: "每月疵点数量分布趋势分析",
            textStyle: {
              color: "#00C4FF",
              fontSize: 15
            },
            left: "45%"
          },
          grid: {
            left: "25%",
            right: "10%",
            top: "25%"
          },
          xAxis: [{
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, ],
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(238,219,219,1)",
                fontSize: 12
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
          }],
          yAxis: [{
              type: 'value',
              name: '个数/个',
              axisLabel: {
                show: true,
                textStyle: {
                  color: "rgba(238,219,219,1)",
                  fontSize: 12
                },

              },
              splitLine: {
                show: false
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

          ],
          series: [{
              name: '新机',
              type: 'line',

              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },

                ],
                label: {
                  show: true,
                  position: ['10%', '30%'],
                  color: 'white', //气泡中字体颜色
                  fontWeight: "bold",
                },




              },
              data: ylist
            },

            {
              name: '旧机',
              type: 'line',
              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },

                ],
                label: {
                  show: true,
                  position: ['0%', '30%'],
                  color: 'white', //气泡中字体颜色
                  fontWeight: "bold",
                },




              },
              data: ylist2
            }
          ]
        };
        myChart1.setOption(
          option);
        window.addEventListener('resize', function () {
          myChart1.resize();
        })

      },


    },


    filters: {

    },
    mounted() {
      let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致

      // this.getWarningPushDataTiming()
      console.log(this.$route.params.jsumyb)
      this.daysum = this.$route.params.jsumyb
      this.echart()
      this.echart2()
      this.echart3()
      this.echart4()
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

  .monitor {
    width: 100%;
    height: 60.5rem;

    display: flex;
  }

  .monitor_left {
    width: 35%;
    height: 100%;

  }

  .ecahrt_zlfx {
    width: 100%;
    height: 40%;
  }

  .ecahrt_qsfx {
    width: 100%;
    height: 40%;
  }

  .monitor_middle {
    width: 29%;
    margin-left: 4%;
    height: 100%;

  }

  .monitor_right {
    width: 33%;
    height: 100%;

  }

  .monitor_left_top {
    width: 100%;
    height: 10%;

    position: relative;
  }

  .img {
    position: absolute;
    left: 7rem;
    top: 1rem;
    width: 14rem;
    height: 4rem;
    background-image: url("../static/img/card4.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .img_con {
    display: flex;
    font-size: 1rem;
    color: #5D7091;
    align-items: center;
    margin-top: 0.5rem;
  }

  .jiantou {
    width: 1rem;
    height: 1rem;
    background-image: url("../static/img/jiantou.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }





  .card5 {
    width: 13rem;
    height: 6rem;
    background-image: url("../static/img/card5.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: -9rem;
    top: 1rem;
  }

  .card5_con {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .card4 {
    width: 13rem;
    height: 6rem;
    background-image: url("../static/img/card5.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: -7rem;
    bottom: -1rem;
  }

  .card6_con {
    width: 27rem;
    height: 10rem;
    position: absolute;

    left: -1rem;
    top: 0.5rem;
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
  }

  .card4_con {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .jin {
    position: absolute;
    font-size: 2rem;
    color: #FFBB00;
    top: 1.6rem;
    left: 1.6rem;
  }

  .zong {
    position: absolute;
    font-size: 1.3rem;
    top: 1.3rem;
    right: 1.2rem;
  }

  .num {
    position: absolute;
    font-size: 1.7rem;
    color: #FF0000;
    top: 3.7rem;
    right: 4.2rem;
  }

  .circle_con {
    width: 100%;
    height: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .machine {
    width: 100%;
    height: 50%;

    position: relative;
  }

  .machine_img {
    position: absolute;
    width: 35rem;
    height: 21rem;
    top: 4rem;
    background-image: url("../static/img/card2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .circles {
    width: 28rem;
    height: 28rem;
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

  .echart2 {
    width: 100%;
    height: 45%;

  }

</style>
