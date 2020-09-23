<template>
  <div class="content" >
    <div class="head">
      <i class="el-icon-arrow-left" @click="back"></i>
      <span>订单列表</span>
    </div>
    <div class="tab" id="boxFixed2">
      <div class="tab-son" @click="tabChange" v-for="(item,index) in tabList" :key="index">
        <div :class="item.class" :id="item.id">{{item.label}}</div>
      </div>


    </div>
    <div class="order_list" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <div class="one_order">
        <div class="order_head">
          <div class="order_head_content">
            <div class="order_num"><span>编号：OC123456789</span></div>
            <div class="order_state"><span>等待付款</span></div>
          </div>
        </div>
        <div class="order_content">
          <div class="order_image">
            <el-image style="height:80%;width:80%;" :src="carimg" size="mini" fit="cover"></el-image>
          </div>
          <div class="orderGood_info">
            <span style="font-size:15px;font-weight:700;margin:15px;margin-bottom:10px;">新版韩版宽松女生圆领毛衣</span>
            <span style="font-size:12px;margin-left:15px;color:rgba(0,0,0,0.5)">天蓝色M码</span>
            <div class="orderGood_price">
              <div class="price"> <span class="now_price">￥29.00</span>
                <div class="old_price">
                  <div class="line"></div>￥48.00
                </div>
              </div>
              <span>x2</span>
            </div>
          </div>
        </div>

        <div class="order_bottom">
          <div class="order_bottom_content"><span>合计：￥58.00</span></div>
        </div>
        <div class="order_btn">
          <div class="order_btn_content">
            <div class="order_button">取消订单</div>
            <div class="order_button_red">付款</div>
          </div>
        </div>
      </div>
            <div class="one_order">
        <div class="order_head">
          <div class="order_head_content">
            <div class="order_num"><span>编号：OC123456789</span></div>
            <div class="order_state"><span>等待付款</span></div>
          </div>
        </div>
        <div class="order_content">
          <div class="order_image">
            <el-image style="height:80%;width:80%;" :src="carimg" size="mini" fit="cover"></el-image>
          </div>
          <div class="orderGood_info">
            <span style="font-size:15px;font-weight:700;margin:15px;margin-bottom:10px;">新版韩版宽松女生圆领毛衣</span>
            <span style="font-size:12px;margin-left:15px;color:rgba(0,0,0,0.5)">天蓝色M码</span>
            <div class="orderGood_price">
              <div class="price"> <span class="now_price">￥29.00</span>
                <div class="old_price">
                  <div class="line"></div>￥48.00
                </div>
              </div>
              <span>x2</span>
            </div>
          </div>
        </div>

        <div class="order_bottom">
          <div class="order_bottom_content"><span>合计：￥58.00</span></div>
        </div>
        <div class="order_btn">
          <div class="order_btn_content">
            <div class="order_button">取消订单</div>
            <div class="order_button_red">付款</div>
          </div>
        </div>
      </div>
            <div class="one_order">
        <div class="order_head">
          <div class="order_head_content">
            <div class="order_num"><span>编号：OC123456789</span></div>
            <div class="order_state"><span>等待付款</span></div>
          </div>
        </div>
        <div class="order_content">
          <div class="order_image">
            <el-image style="height:80%;width:80%;" :src="carimg" size="mini" fit="cover"></el-image>
          </div>
          <div class="orderGood_info">
            <span style="font-size:15px;font-weight:700;margin:15px;margin-bottom:10px;">新版韩版宽松女生圆领毛衣</span>
            <span style="font-size:12px;margin-left:15px;color:rgba(0,0,0,0.5)">天蓝色M码</span>
            <div class="orderGood_price">
              <div class="price"> <span class="now_price">￥29.00</span>
                <div class="old_price">
                  <div class="line"></div>￥48.00
                </div>
              </div>
              <span>x2</span>
            </div>
          </div>
        </div>

        <div class="order_bottom">
          <div class="order_bottom_content"><span>合计：￥58.00</span></div>
        </div>
        <div class="order_btn">
          <div class="order_btn_content">
            <div class="order_button">取消订单</div>
            <div class="order_button_red">付款</div>
          </div>
        </div>
      </div>
        <div class="one_order">
        <div class="order_head">
          <div class="order_head_content">
            <div class="order_num"><span>编号：OC123456789</span></div>
            <div class="order_state"><span>等待付款</span></div>
          </div>
        </div>
        <div class="order_content">
          <div class="order_image">
            <el-image style="height:80%;width:80%;" :src="carimg" size="mini" fit="cover"></el-image>
          </div>
          <div class="orderGood_info">
            <span style="font-size:15px;font-weight:700;margin:15px;margin-bottom:10px;">新版韩版宽松女生圆领毛衣</span>
            <span style="font-size:12px;margin-left:15px;color:rgba(0,0,0,0.5)">天蓝色M码</span>
            <div class="orderGood_price">
              <div class="price"> <span class="now_price">￥29.00</span>
                <div class="old_price">
                  <div class="line"></div>￥48.00
                </div>
              </div>
              <span>x2</span>
            </div>
          </div>
        </div>

        <div class="order_bottom">
          <div class="order_bottom_content"><span>合计：￥58.00</span></div>
        </div>
        <div class="order_btn">
          <div class="order_btn_content">
            <div class="order_button">取消订单</div>
            <div class="order_button_red">确认收货</div>
          </div>
        </div>
      </div>
    </div>
  
  </div>

</template>

<script>
  export default {
    name: "order",
    data: () => ({
     loading: false,
      carimg: require('@/images/1.jpg'),
      tabList: [{
          id: 0,
          label: "全部",
          class: "changes"
        },
        {
          id: 1,
          label: "待付款",
          class: "change"
        },
        {
          id: 2,
          label: "待收货",
          class: "change"
        },
        {
          id: 3,
          label: "退款/售后",
          class: "change"
        },
        {
          id: 4,
          label: "待评价",
          class: "change"
        },

      ],
    }),
    methods: {
      tabChange(e) {
        //  console.log(e.target.id)
        for (let i = 0; i < this.tabList.length; i++) {
          if (e.target.id == this.tabList[i].id) {
            this.tabList[i].class = "changes" //改变点击tab样式
            this.loading = true
            setTimeout(() => {
              this.loading = false
            }, 1000)
          } else {
            this.tabList[i].class = "change"
          }
        }
      },
      back() {
        this.$router.push("/my")
      },
      getParams(){
          let that=this
              that.loading = true
      
          for(let i=0;i<that.tabList.length;i++){
              if(that.tabList[i].label==that.$router.history.current.params.tabName){
                    for(let j=0;j<that.tabList.length;j++){
                        that.tabList[j].class="change"
                    }
                  that.tabList[i].class="changes"
              }
          }
                setTimeout(() => {
              that.loading = false
            }, 1000)
      }


    },
    mounted() {
  this.getParams()
        console.log(this.$router.history.current.params.tabName)

    },

  }

</script>

<style scoped>
  .content {
    width: 100%;
    height: 100vh;
    background: rgb(247, 248, 250);
  }

  /* 头部 */
  .head {
    width: 100%;
    height: 40px;
    color: rgba(0, 0, 0, 1);
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    position: relative;
    border-bottom: 1.8px solid rgba(0, 0, 0, 0.028);
    z-index: 999;
    position: fixed;
    top: 0;
  }

  .head i {
    position: absolute;
    left: 15px;
  }



  /* 头部 */
  /* tab栏 */
  .tab {
   position: fixed;
    top: 40px;
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 1000;
    background: white;
  }

  .tab-son {
    width: 18%;
    height: 50%;
    font-size: 13px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.65);
  }

  .changes {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid red;
  }

  .change {
    width: 100%;
    height: 100%;

  }

  .font2 {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid red;
  }

  /* tab栏 */
  /* 订单列表 */
  .order_list {
    width: 100%;
    display: flex;
    background: rgb(247, 248, 250);
      margin-top: 80px;
    flex-direction: column;
  }

  .one_order {
    width: 100%;
    height: 280px;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    margin-bottom: 15px;
    background: white;
  }

  .order_head {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .order_head_content {
    width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .order_num {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 15px;
  }

  .order_state {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 15px;
    color: red;
  }

  .order_content {
    width: 100%;
    height: 110px;
    display: flex;
    background: rgb(252, 252, 252);
  }

  .order_image {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .orderGood_info {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

  }

  .orderGood_price {
    width: 80%;
    height: 40px;
    margin-left: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .now_price {
    font-weight: 700;
    color: red;
    font-size: 15px;
  }

  .old_price {
    position: relative;
    color: gray;
    font-size: 12px;
    margin-left: 10px;
  }

  .line {
    width: 100%;
    height: 1.5px;
    background: gray;
    position: absolute;
    top: 42%;
  }

  .order_bottom {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .order_bottom_content {
    width: 90%;
    height: 40px;
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 17px;
    font-weight: 600;
    color: red;
  }

  .order_btn {
    width: 100%;
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .order_btn_content {
    width: 60%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .order_button {
    width: 40%;
    margin: 5px;
     height: 35px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.65);
  }

  .order_button_red {
    width: 40%;
    height: 35px;
     margin: 5px;
    background: red;
    color: white;
    font-weight: 600;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  /deep/ .el-loading-spinner {
    top: 11%;
  }

  /* 订单列表 */

</style>
