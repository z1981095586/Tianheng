<template>
  <div class="content"  >
    <div class="head" id="boxFixed4" :class="{'is_fixed' : isFixed4}">
      <i class="el-icon-arrow-left" @click="back"></i>
      <span>商品详情</span>
    </div>
    <div class="swiper">
      <el-carousel indicator-position="none" style="width:100%" :autoplay="isAutoplay" trigger="click" height="200px">
        <el-carousel-item v-for="(item,index) in PicList" :key="index">
          <el-image :src="item.url" fit="cover" style="width:100%"></el-image>
          <div class="index">{{index+1}}/{{PicList.length}}</div>
        </el-carousel-item>
      </el-carousel>

    </div>
    <div class="good_info">
      <div style="width:90%;height:100%;display:flex;flex-direction:column">
        <div class="good_name"><span>新版韩版宽松女生圆领小清新</span><i class="el-icon-star-off"></i></div>
        <div class="good_introduce"><span>纯棉贴身舒适，奶昔耐孙不脱色</span></div>
        <div class="good_price">
          <div class="price"> <span class="now_price">￥29.00</span>
            <div class="old_price">
              <div class="line"></div>￥48.00
            </div>
            <div class="old_price" style="margin-left:15px">
              本月68人已买
            </div>
          </div>

        </div>
      </div>
      <div class="share">
        <div class="share_btn"><i class="el-icon-share"></i><span>分享</span></div>
      </div>
    </div>
    <div class="other_info">
      <div class="gift">
        <div class="info_content">
          <div class="info_font"><span class="font_bold">赠品</span><span class="font_thin">当前暂无赠品</span></div>
          <div class="info_icon"><i class="el-icon-arrow-right"></i></div>
        </div>
      </div>
      <div class="info_line">
        <div class="line_content"></div>
      </div>
      <div class="mail">
        <div class="info_content">
          <div class="info_font"><span class="font_bold">配送</span><span class="font_thin">快递</span></div>
          <div class="info_icon"><i class="el-icon-arrow-right"></i></div>
        </div>
      </div>
    </div>
    <div class="introduce_image">
      <div class="image_content">
        <el-image style="margin-bottom:10px;width:100%;" v-for="(item,index) in PicList" :src="item.url" :key="index"
          fit="cover"></el-image>
      </div>
    </div>
    <div class="bottom_content">
      <div class="bottom_content_left">
        <div class="bottom_content_left_icon" @click="toCar">
          <el-image style="width:20px" :src="carimg" size="mini" fit="cover"></el-image>
          <span>购物车</span>
        </div>
        <div class="bottom_content_left_icon">
          <el-image style="width:20px" :src="contactimg" size="mini" fit="cover"></el-image>
          <span>客服</span>
        </div>
      </div>
      <div class="bottom_content_right">
        <div class="car_btn" @click="addCar"><span>加入购物车</span></div>
        <div class="buy_btn" @click="buy"><span>购买</span></div>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" direction="btt" style="border-radius:8px;" size="75%">
      <div class="drawer_content">
        <div class="drawer_goodInfo">
          <div class="drawer_goodInfo_img">
            <el-image style="width:100%;height:100%;border-radius:8px;" src="require('@/images/1.jpg')" fit="cover">
            </el-image>
          </div>
          <div class="drawer_goodInfo_font">
            <div class="drawer_goodInfo_font_title"><span>新款航班宽松T血小清新</span></div>
            <div class="drawer_goodInfo_font_info"><span>天依拉 m马 库存：299</span></div>
            <div class="price"> <span class="now_price" style="font-weight:500">￥29.00</span>
              <div class="old_price">
                <div class="line"></div>￥48.00
              </div>

            </div>
          </div>
        </div>
        <div class="drawer_goodColor">
          <div class="drawer_goodColor_title"><span>颜色</span></div>
          <div class="drawer_goodColor_choose"><span v-for="(item,index) in colorList"
              @click="colorSelectedChanges(item.label)" :key="index" :class="item.selected">{{item.label}}</span></div>
        </div>
        <div class="drawer_goodColor">
          <div class="drawer_goodColor_title"><span>尺寸</span></div>
          <div class="drawer_goodColor_choose"><span v-for="(item,index) in sizeList"
              @click="sizeSelectedChanges(item.label)" :key="index" :class="item.selected">{{item.label}}</span></div>
        </div>
        <div class="drawer_goodBottom">
          <div class="count">
            <div class="count_left">
              <span style="font-size:12px">合计</span><span style="font-size:17px;color:red;">￥29.00</span><span
                style="margin-left:10px;font-size:12px">不含运费</span>
            </div>
            <div class="count_right">
              <el-input-number v-model="num" size="small" @change="handleChange" :min="1" :max="10" label="描述文字">
              </el-input-number>
            </div>
          </div>
          <div class="buy_button" @click="tosureOrder"><span>立即购买</span></div>
        </div>
      </div>

    </el-drawer>
    <el-drawer :visible.sync="drawer2" direction="btt" style="border-radius:8px;" size="75%">
      <div class="drawer_content">
        <div class="drawer_goodInfo">
          <div class="drawer_goodInfo_img">
            <el-image style="width:100%;height:100%;border-radius:8px;" src="require('@/images/1.jpg')" fit="cover">
            </el-image>
          </div>
          <div class="drawer_goodInfo_font">
            <div class="drawer_goodInfo_font_title"><span>新款航班宽松T血小清新</span></div>
            <div class="drawer_goodInfo_font_info"><span>天依拉 m马 库存：299</span></div>
            <div class="price"> <span class="now_price" style="font-weight:500">￥29.00</span>
              <div class="old_price">
                <div class="line"></div>￥48.00
              </div>

            </div>
          </div>
        </div>
        <div class="drawer_goodColor">
          <div class="drawer_goodColor_title"><span>颜色</span></div>
          <div class="drawer_goodColor_choose"><span v-for="(item,index) in colorList"
              @click="colorSelectedChanges(item.label)" :key="index" :class="item.selected">{{item.label}}</span></div>
        </div>
        <div class="drawer_goodColor">
          <div class="drawer_goodColor_title"><span>尺寸</span></div>
          <div class="drawer_goodColor_choose"><span v-for="(item,index) in sizeList"
              @click="sizeSelectedChanges(item.label)" :key="index" :class="item.selected">{{item.label}}</span></div>
        </div>
        <div class="drawer_goodBottom">
          <div class="count">
            <div class="count_left">
              <span style="font-size:12px">合计</span><span style="font-size:17px;color:red;">￥29.00</span><span
                style="margin-left:10px;font-size:12px">不含运费</span>
            </div>
            <div class="count_right">
              <el-input-number v-model="num" size="small" @change="handleChange" :min="1" :max="10" label="描述文字">
              </el-input-number>
            </div>
          </div>
          <div class="buy_button2"><span>加入购物车</span></div>
        </div>
      </div>

    </el-drawer>
  </div>

</template>

<script>
  export default {
    name: "good_Detail",
    data: () => ({
      isAutoplay: true,
      backPath:"",
      num: 1,
      carimg: require('@/images/shopcar.png'),
      contactimg: require('@/images/contact.png'),
      isFixed4: null,
      PicList: [{
          url: require('@/images/1.jpg')
        },
        {
          url: require('@/images/2.jpg')
        },
        {
          url: require('@/images/3.jpg')
        },
        {
          url: require('@/images/4.jpg')
        },
      ],
    
      drawer: false,
      drawer2: false,
      colorList: [{
          label: "天蓝色",
          selected: "colorSelected"
        },
        {
          label: "粉红色",
          selected: "NocolorSelected"
        },
        {
          label: "赤红色",
          selected: "NocolorSelected"
        },
        {
          label: "淡蓝色",
          selected: "NocolorSelected"
        }
      ],
      sizeList: [{
          label: "大码",
          selected: "colorSelected"
        },
        {
          label: "中码",
          selected: "NocolorSelected"
        },
        {
          label: "小码",
          selected: "NocolorSelected"
        },

      ]
    }),
    methods: {
      tosureOrder() { //跳转到确认订单
      
        this.$router.push({
  path:'/index/sureOrder',
  name:'sureOrder',
  params:{
    lastPath:"/index/good_Detail"
  }
})
      },
      handleChange(value) {
        console.log(value);
      },
      colorSelectedChanges(label) { //颜色选择改变事件
        for (let i = 0; i < this.colorList.length; i++) {//所有选项样式改为未选中
          this.colorList[i].selected = "NocolorSelected"
        }
        for (let i = 0; i < this.colorList.length; i++) {//点击的样式改为选中
          if (this.colorList[i].label == label) {
            this.colorList[i].selected = "colorSelected"
          }
        }
      },
      sizeSelectedChanges(label) { //尺寸选择改变事件
        for (let i = 0; i < this.sizeList.length; i++) {
          this.sizeList[i].selected = "NocolorSelected"
        }
        for (let i = 0; i < this.sizeList.length; i++) {
          if (this.sizeList[i].label == label) {
            this.sizeList[i].selected = "colorSelected"
          }
        }
      },
      toCar() {
        this.$router.push("/ShoppingCart")
      },
      addCar() {
    
      
       
          this.drawer2 = true
      
      },
      buy() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
     
         
          this.drawer = true
      
      },
      back() {//返回上一页
        this.$router.push("/index")
      },
    getParams(){//获取其他页面传递的数据
        console.log(this.$router.history.current.params.lastPath)
        if(this.$router.history.current.params.lastPath!=null){
          this.backPath=this.$router.history.current.params.lastPath
        }
     },
      handleScroll() { //头栏监听事件
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
        let offsetTop = document.querySelector('#boxFixed4').offsetTop; // 要滚动到顶部吸附的元素的偏移量
        this.isFixed4 = scrollTop > offsetTop ? true : false; // 如果滚动到顶部了，this.isFixed就为true
      },

    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理

    },
    beforeDestroy() { //在组件生命周期结束的时候销毁。
      window.removeEventListener('scroll', this.handleScroll);
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0 //全部初始化
      document.body.scrollTop = 0 // 滚动条偏移量
    },
  }

</script>

<style scoped>
  .content {
    width: 100%;
    height: 100%;
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

  .is_fixed {
    position: fixed;

    top: 0;
  }

  /* 头部 */
  /* 轮播图 */
  .swiper {
    width: 100%;

  }

  .index {
    position: fixed;
    bottom: 15%;
    right: 25px;
    width: 35px;
    height: 15px;
    background: rgba(136, 138, 137, 1);
    border-radius: 8px;
    font-size: 12px;
    color: white;
  }



  /* 轮播图 */
  /* 商品详情 */
  .good_info {
    margin-top: 5px;
    width: 100%;
    height: 93px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    position: relative;
    padding-bottom: 15px;
  }

  .good_name {
    width: 100%;
    height: 40%;

    display: flex;
    align-items: center;
    justify-content: space-between;

  }

  .good_name span {
    font-size: 14.5px;
    font-family: "黑体";
    font-weight: 600;
    width: 80%;
    text-align: left;
  }

  .good_introduce {
    width: 100%;
    height: 10%;
    margin-bottom: 15px;
    display: flex;
    align-items: center;

  }

  .good_introduce span {
    font-size: 12px;
    font-family: "黑体";
    color: rgba(0, 0, 0, 0.3);
    width: 80%;
    text-align: left;
  }

  .good_price {
    width: 100%;
    height: 40%;

    display: flex;
    align-items: center;
    justify-content: space-between;

  }

  .price {
    width: 70%;
    height: 100%;
    margin: 5px;
    margin-top: 10px;
    display: flex;
    align-items: flex-end;
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
    margin-bottom: 6px;
  }

  .line {
    width: 100%;
    height: 1.5px;
    background: gray;
    position: absolute;
    top: 50%;
  }

  .share {
    position: absolute;
    right: 0;
    bottom: 15px;
    width: 30%;
    height: 25px;
    align-items: center;
    display: flex;
    justify-content: flex-end;

  }

  .share_btn {
    width: 60px;
    height: 100%;
    background: rgb(255, 197, 31);
    border-radius: 12px 0px 0 12px;
    display: flex;
    font-size: 10px;
    color: white;

    align-items: center;
  }

  .share_btn i {
    margin-left: 10px;
  }

  .share_btn span {
    margin-left: 10px;
  }

  .other_info {
    width: 100%;
    height: 100px;
    background: white;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
  }

  .gift {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .email {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info_content {
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .font_bold {
    font-size: 14.5px;
    font-family: "\9ED1\4F53";
    font-weight: 600;
    width: 80%;
    text-align: left;
  }

  .font_thin {
    font-size: 12px;
    font-family: "\9ED1\4F53";
    color: rgba(0, 0, 0, 0.3);
    width: 80%;
    text-align: center;
    margin-left: 12px;
  }

  .info_line {
    width: 100%;
    height: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .line_content {
    width: 85%;
    height: 1px;
    background: rgba(0, 0, 0, 0.03);
  }

  .mail {

    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .introduce_image {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image_content {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* 商品详情 */

  .bottom_content {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    display: flex;
    background: white;

  }

  .bottom_content_left {
    width: 34%;
    height: 100%;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

  }

  .bottom_content_left_icon {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
    margin-left: 15px;
  }

  .bottom_content_right {
    width: 66%;
    height: 100%;
    display: flex;
  }

  .car_btn {
    width: 50%;
    height: 100%;
    background: rgb(255, 199, 28);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: white;
  }

  .buy_btn {
    width: 50%;
    height: 100%;
    background: rgb(238, 49, 67);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: white;
  }
/* 抽屉样式 */
  /deep/ .el-drawer__header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #72767b;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 0;
    /* margin-bottom: 7px; */
    padding: 6px 7px 0;
  }

  .drawer_content {
    width: 100%;
    height: 100%;
    display: flex;

    align-items: center;
    flex-direction: column;

  }

  .drawer_goodInfo {
    width: 90%;
    height: 30%;
    display: flex;
    align-items: center;

  }

  .drawer_goodInfo_img {

    width: 110px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  
  
  .drawer_goodColor {
    width: 90%;
    height: 17%;
    display: flex;
    flex-direction: column;

  }

  .drawer_goodColor_title {
    width: 100%;
    height: 34%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 13.5px;
    font-family: "\9ED1\4F53";
    font-weight: 600;

    text-align: left;
  }

  .drawer_goodColor_choose {
    width: 100%;
    height: 50%;
    display: flex;

    font-size: 13.5px;

  }

  .NocolorSelected {
    width: 20%;
    height: 30px;
    float: left;
    background: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0);
    margin: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13.5px;
    font-family: "宋体";
  }

  .colorSelected {
    width: 20%;
    height: 30px;
    float: left;
    background: rgb(250, 220, 222);
    margin: 10px;
    border-radius: 8px;
    border: 1px solid red;
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13.5px;
    font-family: "宋体";
  }

  .drawer_goodSize {
    width: 90%;
    height: 20%;

  }

  .drawer_goodInfo_font_title {

    margin-top: 10px;
  }

  .drawer_goodInfo_font_title span {


    font-family: "\9ED1\4F53";
    font-weight: 600;
    width: 80%;

    text-align: left;
  }

  .drawer_goodInfo_font_info {
    display: flex;
    justify-content: flex-start;

  }

  .drawer_goodInfo_font_info span {
    font-size: 12px;
    font-family: "\9ED1\4F53";
    color: rgba(0, 0, 0, 0.3);
    width: 80%;
    text-align: left;
    margin: 5px;
    margin-top: 10px;

  }

  .drawer_goodBottom {
    width: 100%;
    height: 38%;
    border-top: 1.5px solid rgba(0, 0, 0, 0.028);
    background: rgb(249, 249, 249);
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .count {
    width: 90%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count_left {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .count_right {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .buy_button {
    width: 95%;
    height: 45px;
    background: rgb(238, 49, 67);
    border-radius: 25px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buy_button2 {
    width: 95%;
    height: 45px;
    background: rgb(255, 199, 28);
    border-radius: 25px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /deep/ .el-drawer__open .el-drawer.btt {
    border-radius: 6px;
  }
/* 抽屉样式 */
/deep/ .el-carousel__button{
      width: 8px;height: 8px;border-radius: 8px;margin: 8px;
}
</style>
