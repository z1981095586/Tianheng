<template>
  <div class="content" style="padding-top:10px;">

    <span style="font-size: 1rem;font-weight: bold;margin-bottom: -1rem">部品消耗详情</span>
    <i class="el-icon-arrow-left" style="position:fixed;left:17px;top:13px;" @click="back"></i>
    <!--出库单详细-->
    <div class="all-page">
      <scroller height="100%" :onRefresh="refresh" :onInfinite="inf" ref="my_scroller">
        <div class="contain" style="margin-top:8px;">
          <div class="card">
            <div class="card-head"><span>部品消耗</span></div>
            <div class="line">
              <div class="line-con"></div>
            </div>

            <div class="card-content2" style="margin-top:5px;" v-for="item in datalist">
              <div class="content-two">
                <span>{{item.consume_time}}</span>
                <span>{{item.product_name}}部品</span>
                <span>{{item.quantity}}个</span>
              </div>

            </div>


          </div>

        </div>

      </scroller>
    </div>

  </div>

</template>

<script>
  import axios from 'axios'
  import VueScroller from "vue-scroller"
  export default {
    name: 'Component_consumption_details',
    data() {
      return {
        machine_id: '',
        company_id: '',
        mac_type_id: '',
        page_size: 10,
        page_num: 1,
        total_data_num: 0,
        datalist: []
      }
    },
    methods: {
      getConsumeMaterialPage() { //获取某台设备保养记录(分页)
        let url = "http://47.110.242.174:8206/api/maintain/getConsumeMaterialPage"
        let that = this
        axios.post(url, {
          maintainMainRecord: {
            mac_type_id: that.mac_type_id,
            machine_id: that.machine_id
          },
          selectInfo: {
            company_id: that.company_id,
            page_size: that.page_size,
            page_num: that.page_num
          }
        }, {
          headers: {
            'Content-Type': 'application/json',

          }
        }).then(function (res) {

          //console.log(res)
          if (res.data.result.consumeMaterial.length == 0) {
       
            that.$refs.my_scroller.finishInfinite(true)
            return
          } else {
            that.total_data_num = res.data.result.total_data_num
            that.$refs.my_scroller.finishPullToRefresh(true) ////下拉获取数据回调函数停止使用
            for (let i = 0; i < res.data.result.consumeMaterial.length; i++) {
   
              that.datalist.push(res.data.result.consumeMaterial[i])

              that.$refs.my_scroller.finishInfinite(true) //上拉获取数据回调函数停止使用
            }
          }



        })
      },
      refresh() {
    

        this.datalist = []
        this.page_num = 1
        setTimeout(() => { //不设置定时器会出现bug
          this.getConsumeMaterialPage() //获取数据列表
          this.$message({
            message: '刷新成功！',
            center: true,
            duration: 1000
          });
          this.$refs.my_scroller.finishPullToRefresh(false) //关闭下拉刷新函数
        }, 500);
      },

      /**
       * 上拉获取
       */
      inf() {

 
        setTimeout(() => {

          if (this.datalist.length == this.total_data_num) { //如果数据总条数等于当前数据列表长度了，那就关闭上拉加载了
       
            this.$refs.my_scroller.finishInfinite(true)
            return
          } else if (this.datalist.length == 0) { //如果查到没数据了，那就关闭上拉加载了
            this.$refs.my_scroller.finishInfinite(true)
            return
          } else { //否则就++，获取下一页数据
       this.page_num++;
            this.getConsumeMaterialPage()
          }

        }, 500);
      },
      back() {
        this.$router.push({
          path: '/select',
                name:"select",
            params:{
              mac_type_id:this.mac_type_id,
              company_id: this.company_id ,
              machine_id:this.machine_id
            }


        })
      },
      getParams() { //获取其他页面传过来的参数

        //console.log(this.$route.params)
        this.mac_type_id = this.$route.params.mac_type_id
        this.company_id = this.$route.params.company_id
        this.machine_id = this.$route.params.machine_id
        // this.machine_id ="1234"
        this.getConsumeMaterialPage()


      },
    },
    mounted() {
         console.log(this.$route.params)
      this.getParams()
history.pushState(null, null, window.location.href);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, window.location.href);
        });
    }
  }

</script>

<style scoped>
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .contain {
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;



  }

  .all-page {
    margin-top: 12px;
    width: 100%;
    overflow: auto;
    height: 100%;

    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;

  }

  .head {
    width: 95%;
    height: 30px;
    display: flex;
    justify-content: space-around;

  }

  .line {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .line-con {
    width: 95%;
    height: 1.5px;
    background: rgb(242, 242, 245);
  }

  .card {
    width: 95%;
    height: 90%;
    display: flex;
    flex-direction: column;
    background: white;
    font-size: 0.9rem;

    font-weight: 400;
  }

  .card2 {
    width: 95%;
    height: 100px;
    display: flex;
    flex-direction: column;
    background: white;
    font-size: 0.9rem;

    font-weight: 400;
  }

  .card-head {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-head span {
    margin-left: 5px;
  }

  .card-content {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-content2 {
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-one {
    width: 90%;
    display: flex;

  }

  .content-one span {
    width: 50%;
    text-align: left;

  }

  .content-two {
    width: 90%;
    display: flex;
    justify-content: space-around;
  }

  .content-two span {
    margin-right: 10px;
    text-align: left;

  }

  .con {
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.9rem;

    font-weight: 400;
  }

  .con span {
    margin-left: 5px;
  }

</style>
