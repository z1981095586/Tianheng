<template>
  <div class="content" v-loading="good_loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
    <div class="head">
      <i class="el-icon-arrow-left" @click="back"></i>
      <span>确认订单</span>
    </div>
    <div class="address_info" @click="toAddress">
      <div class="address_info_content">
        <i class="el-icon-location"></i>
        <div class="address_info_font">
          <div class="contact_people"><span>联系人:周品道</span><span>10086110000</span></div>
          <div class="contact_address"><span>收货地址：浙江省山下湖镇打开村2号位旁的小地铺</span></div>

        </div>
        <i class="el-icon-arrow-right" style="  margin-left: 15px;margin-right:0;   position: absolute;
    right: 0;"></i>
      </div>
    </div>
    <div class="good_info">
      <div class="good_info_content">
        <div class="good_info_image">
          <el-image style="width:100%;height:100%;border-radius:8px;" src="require('@/images/1.jpg')" fit="cover">
          </el-image>
        </div>
        <div class="drawer_goodInfo_font">
          <div class="drawer_goodInfo_font_title"><span>新款航班宽松T血小清新</span></div>
          <div class="drawer_goodInfo_font_info"><span>天依拉 M码</span></div>
          <div class="price"> <span class="now_price" style="font-weight:500">￥29.00</span>
            <div class="old_price">
              <div class="line"></div>￥48.00
            </div>

          </div>
        </div>
        <div class="good_number"><span>x2</span></div>
      </div>
    </div>
    <div class="other_info">
      <div class="other_info_content"><span style="font-weight:600;">优惠</span>
        <div><span>无可用优惠</span><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
    <div class="other_info">
      <div class="other_info_content"><span style="font-weight:600;">配送</span>
        <div><span>快递包邮</span></div>
      </div>
    </div>
    <div class="other_info " style="margin:0;border-top:1px solid rgba(0,0,0,0.05)">
      <div class="other_info_content2"><span style="font-weight:600;">买家留言</span>
        <div style="width:75%;margin-left:10px;height:100%;display:flex;align-items:center;"><input placeholder="30字以内"
            style="border:none;width:100%;height:80%;" /></div>
      </div>
    </div>
    <div class="other_info">
      <div class="other_info_content"><span style="font-weight:600;">商品总价</span>
        <div><span>￥48</span></div>
      </div>
    </div>
    <div class="other_info" style="margin:0;border-top:1px solid rgba(0,0,0,0.05)">
      <div class="other_info_content"><span style="font-weight:600;">运费</span>
        <div><span>￥0.00</span></div>
      </div>
    </div>
    <div class="bottom_btn">
      <div class="bottom_btn_content">
        <div class="count_price"><span>合计：￥58.00</span></div>
        <div class="submit_btn"> <span>提交订单</span></div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: "sureOrder",
    data: () => ({
      backPath: "",
      good_loading: false
    }),
    methods: {

      back() {
        if (this.$router.history.current.params.lastPath2) {
          this.$router.push({
            path: this.$router.history.current.params.lastPath2,

          })
        } else {
          this.$router.push({
            path: this.backPath,

          })
        }

        // this.$router.go(-1)
      },
      getParams() {
        console.log(this.$router.history.current)
        if (this.$router.history.current.params.lastPath != null) {
          this.backPath = this.$router.history.current.params.lastPath
        } else {
          this.backPath = "/index/good_Detail"
        }
      },
      toAddress() { //跳转到选择地址
        this.$router.push({
          path: '/my/address',
          name: 'address',
          params: {
            lastPath: "/index/sureOrder",
            lastPath2: this.$router.history.current.params.lastPath //根路径
          }
        })
      },


    },
    mounted() {
      this.getParams()

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
  }

  .head i {
    position: absolute;
    left: 15px;
  }



  /* 头部 */
  /* 地址栏 */
  .address_info {
    margin-top: 15px;
    width: 100%;
    height: 100px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .address_info_content {
    width: 90%;
    height: 100px;

    display: flex;
    align-items: center;
    position: relative;
  }

  .address_info i {
    font-size: 25px;
    margin-right: 15px;
 
  }

  .address_info_font {
    width: 100%;

    height: 80%;
    display: flex;
    flex-direction: column;
  }

  .contact_people {
    width: 100%;
    display: flex;
    justify-content: space-between;


  }

  .contact_address {
    width: 84%;
    display: flex;
    margin-top: 12px;
    font-size: 13.5px;
    text-align: left;
  }

  /* 地址栏 */
  /* 商品信息栏 */
  .good_info {
    margin-top: 15px;
    width: 100%;
    height: 130px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .good_info_content {
    width: 90%;
    height: 90%;

    display: flex;
    align-items: center;
  }

  .good_info_image {
    width: 30%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .drawer_goodInfo_font {
    width: 50%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-left: 20px;
  }

  .drawer_goodInfo_font_title {
    font-size: 15px;
    text-align: left;
    margin-top: 10px;
  }

  .drawer_goodInfo_font_title span {


    font-family: "\9ED1\4F53";
    font-weight: 600;
    width: 80%;
    font-size: 13px;

    text-align: left;
  }

  .drawer_goodInfo_font_info {
    display: flex;
    justify-content: flex-start;

  }

  .drawer_goodInfo_font_info span {
    font-size: 13px;
    font-family: "\9ED1\4F53";
    color: rgba(0, 0, 0, 0.3);
    width: 80%;
    text-align: left;
    margin: 5px;
    margin-top: 10px;

  }

  .price {
    width: 70%;
    height: 100%;

    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }



  .now_price {
    font-weight: 600;
    color: rgba(255, 0, 0, 0.8);
    font-size: 18px;
    margin-right: 10px;
    margin-bottom: 5px;

  }

  .old_price {
    position: relative;
    color: gray;
    font-size: 10px;

  }

  .line {
    width: 100%;
    height: 1.5px;
    background: gray;
    position: absolute;
    top: 50%;
  }

  .good_number {
    height: 100%;
    display: flex;
    align-items: flex-end;

  }

  .good_number span {
    margin: 10px;
  }

  /* 商品信息栏 */
  /* 其他信息栏 */
  .other_info {
    margin-top: 15px;
    width: 100%;
    height: 50px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }

  .other_info_content {
    width: 90%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .other_info_content2 {
    width: 90%;
    height: 100%;

    display: flex;
    align-items: center;

  }

  .other_info_content i {
    margin-left: 10px;
  }

  /* 其他信息栏 */

  /*底部操作栏 */
  .bottom_btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: white;
    display: flex;
    justify-content: flex-end;
  }

  .bottom_btn_content {
    width: 66%;
    height: 100%;
    display: flex;
  }

  .count_price {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: red;
  }

  .submit_btn {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
    color: white;
  }

  /*底部操作栏 */

</style>
