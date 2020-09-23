<template>
  <div class="content">
    <div class="head" id="boxFixed3" :class="{'is_fixed' : isFixed3}">

      <span>购物车</span>
    </div>
    <div v-show="isEmpty">
      <div class="car-content">
        <el-image :src="require('@/images/car.jpg')" fit="cover" class="car"></el-image>
      </div>
      <div class="like" v-show="isEmpty">
        <el-image :src="require('@/images/like.jpg')" fit="cover" class="like_img"></el-image>
      </div>
      <div class="shopList" v-show="isEmpty">
        <div class="shop" v-loading="loading">
          <div class="good" v-for="(item,index) in PicList" :key="index">
            <el-image :src="item.url" fit="cover" class="good_image"></el-image>
            <div class="good_name"><span>商品名称商品名称商品名称</span></div>
            <div class="good_price">
              <div class="price"> <span class="now_price">￥29.00</span>
                <div class="old_price">
                  <div class="line"></div>￥48.00
                </div>
              </div>
              <div class="label">
                <div class="border"><span>热门推荐</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div v-show="!isEmpty">
      <div style="margin-bottom:110px">
        <div class="good_info" v-for="(item,index) in carItemList" :key="index">
          <el-checkbox v-model="item.isChecked" @change="checkCarItem(index)" style="width:40px;"></el-checkbox>
          <div class="good_info_content">
            <div class="good_info_image">
              <el-image style="width:100%;height:100%;border-radius:8px;" :src="item.pic" fit="cover">
              </el-image>
            </div>
            <div class="drawer_goodInfo_font">
              <div class="drawer_goodInfo_font_title"><span style="font-size:13px;">{{item.title}}</span></div>
              <div class="drawer_goodInfo_font_info2" @click="openDrawer"><span>{{item.size}}</span><i
                  class="el-icon-arrow-down"></i></div>
              <div class="price"> <span class="now_price" style="font-weight:500;font-size:13px;">￥{{item.price}}</span>


              </div>
            </div>
            <div class="good_number"><span @click="deleteCarItem(item.id)">删除</span>

            </div>

          </div>
        </div>
      </div>
      <div class="car_bottom">
        <div class="car_bottom_left">
          <el-checkbox v-model="checked" style="width:40px;"></el-checkbox>
          <span style="color:red;font-size:18px;">￥{{sum}}</span>
        </div>

        <div class="car_bottom_right">

          <span @click="toSureOrder">立即结算</span>
        </div>
        <el-drawer :visible.sync="drawer" :modal-append-to-body="modalflag" size="75%" direction="btt"
          style="border-radius:8px;">
          <div class="drawer_content">
            <div class="drawer_goodInfo">
              <div class="drawer_goodInfo_img">
                <el-image style="width:100%;height:100%;border-radius:8px;" src="require('@/images/1.jpg')" fit="cover">
                </el-image>
              </div>
              <div class="drawer_goodInfo_font">
                <div class="drawer_goodInfo_font_title"><span>新款航班宽松T血小清新</span></div>
                <div class="drawer_goodInfo_font_info"><span>天依拉 m马 </span></div>
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
                  @click="colorSelectedChanges(item.label)" :key="index" :class="item.selected">{{item.label}}</span>
              </div>
            </div>
            <div class="drawer_goodColor">
              <div class="drawer_goodColor_title"><span>尺寸</span></div>
              <div class="drawer_goodColor_choose"><span v-for="(item,index) in sizeList"
                  @click="sizeSelectedChanges(item.label)" :key="index" :class="item.selected">{{item.label}}</span>
              </div>
            </div>
            <div class="drawer_goodBottom">

              <div class="buy_button"><span>立即购买</span></div>
            </div>
          </div>

        </el-drawer>
      </div>

    </div>

  </div>

</template>

<script>
  export default {
    name: "ShoppingCart",
    data: () => ({
      isEmpty: false, //判断购物车有没有物品
      isFixed3: null,
      checked: false,
      loading: true,
      num: 0,
      modalflag: false,
      drawer: false,
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

      ],
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
      carItemList: [{
          id: 0,
          title: "夏季新款男士短袖",
          size: "XXL 天蓝色",
          pic: require('@/images/1.jpg'),
          price: 0,
          isChecked: false
        },
        {
          id: 1,
          title: "夏季新款男士短袖",
          size: "XXL 天蓝色",
          pic: require('@/images/2.jpg'),
          price: 1,
          isChecked: false
        },
        {
          id: 2,
          title: "夏季新款男士短袖",
          size: "XXL 天蓝色",
          pic: require('@/images/3.jpg'),
          price: 2,
          isChecked: false
        },
        {
          id: 3,
          title: "夏季新款男士短袖",
          size: "XXL 天蓝色",
          pic: require('@/images/4.jpg'),
          price: 3,
          isChecked: false
        },
      ],
      sum: 0, //总结算金额
    }),
    methods: {
      deleteCarItem(id) { //删除购物车中的一个物品
        console.log(id)

        //  for(let i=0;i<this.carItemList.length;i++){
        //    if(this.carItemList[i].id==id){


        //    }
        //  }
      },
      checkCarItem(index) { //购物车选项发生改变


        if (this.carItemList[index].isChecked == true) {
          this.sum += this.carItemList[index].price
        } else {
          this.sum -= this.carItemList[index].price   //如果是取消，那就从总金额减
        }



      },
      colorSelectedChanges(label) { //颜色选择改变事件
        for (let i = 0; i < this.colorList.length; i++) {
          this.colorList[i].selected = "NocolorSelected"
        }
        for (let i = 0; i < this.colorList.length; i++) {
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
      toSureOrder() {
        this.$router.push({
          path: "/index/sureOrder",
          name: 'sureOrder',
          params: {
            lastPath: "/ShoppingCart", //上一个页面
            lastPath2: "/ShoppingCart" //告诉其他页面根路径
          }
        })
      },
      openDrawer() { //打开抽屉
        this.drawer = true
      },
      handleChange(value) {
        console.log(value);
      },
      handleScroll() { //头栏监听事件
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
        let offsetTop = document.querySelector('#boxFixed3').offsetTop; // 要滚动到顶部吸附的元素的偏移量
        this.isFixed3 = scrollTop > offsetTop ? true : false; // 如果滚动到顶部了，this.isFixed就为true
      },

    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    beforeDestroy() { //在组件生命周期结束的时候销毁。[data-v-512a9a27] .v-modal
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
    height: 100vh;
    background: rgb(242, 242, 242);
  }

  /deep/ .v-modal {
    z-index: 300;
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

  .is_fixed {
    position: fixed;
    top: 0;
  }

  /* 头部 */
  .car-content {
    width: 100%;
    height: 300px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .car {
    width: 130px;

  }

  .like {
    width: 100%;
    height: 40px;
    display: flex;
    background: white;
    justify-content: center;
    align-items: center;
  }

  .like_img {
    width: 120px;

  }

  /* 商品列表 */
  .shopList {

    width: 100%;
    height: 800px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shop {
    width: 100%;
    height: 100%;

    overflow: hidden;
    zoom: 1
  }

  .good {
    width: 45%;
    height: 200px;
    float: left;
    margin: 2.5%;
    margin-left: 2.5%;

  }

  .good_image {
    width: 100%;
    height: 150px;
  }

  .good_name {
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    text-align: center;
  }

  .good_name span {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .good_price {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  .price {
    display: flex;
    height: 100%;
  }

  .now_price {
    font-weight: 600;
    color: red;
    font-size: 12px;
  }

  .old_price {
    position: relative;
    color: gray;
    font-size: 12px;
  }

  .line {
    width: 100%;
    height: 1.5px;
    background: gray;
    position: absolute;
    top: 42%;
  }

  .label {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .border {
    width: 88%;
    height: 100%;
    border: 1.2px solid red;
    border-radius: 8px;
    color: red;
    font-size: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  /deep/ .el-loading-spinner {
    top: 11%;
  }

  /* 商品列表 */
  /* 购物车中的商品 */
  .good_info {
    margin-top: 15px;
    width: 100%;
    height: 130px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-left: 3%;
  }

  .drawer_goodInfo_font_title {
    text-align: left;
    margin-top: 10px;
  }

  .drawer_goodInfo_font_title span {
    font-family: "\9ED1\4F53";
    font-weight: 600;
    width: 80%;
    text-align: left;
  }

  .drawer_goodInfo_font_info2 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: rgb(242, 242, 242);
    height: 25px;
    width: 120px;
    font-size: 13px;
    margin-top: 10px;
    height: 100px;
    margin-bottom: 10px;
  }

  .drawer_goodInfo_font_info {
    display: flex;
    justify-content: flex-start;
  }

  .drawer_goodInfo_font_info span {
    font-size: 14px;
    font-family: "\9ED1\4F53";
    color: rgba(0, 0, 0, 0.3);
    text-align: left;
    margin: 5px;
    margin-top: 10px;
    padding: 5px;

  }


  .drawer_goodInfo_font_info2 i {
    color: rgba(0, 0, 0, 0.3);
    margin-left: 15px;
  }

  .price {
    width: 70%;
    height: 100%;
    margin: 5px;
    margin-top: 10px;
    display: flex;
    align-items: flex-end;
  }




  .line {
    width: 100%;
    height: 1.5px;
    background: gray;
    position: absolute;
    top: 50%;
  }

  .good_number {

    position: absolute;
    right: 0;
    top: 18px;
    color: rgba(0, 0, 0, 0.4);


  }

  .add_device {
    position: absolute;
    right: 0px;
    bottom: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .good_number span {
    margin: 10px;
    font-size: 13px;

  }

  /* 购物车中的商品 */
  /* 重写多选框样式 */
  /deep/ .el-checkbox__inner:hover {
    border-color: rgba(0, 0, 0, 0.5);
  }

  /deep/ .el-input-number__decrease {
    z-index: 1;
  }

  /deep/ .el-input-number__increase {
    z-index: 1;
  }

  /deep/ .el-input::-webkit-scrollbar {
    z-index: -1;
  }

  /deep/ .el-checkbox__inner {
    z-index: 0;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 8px;
  }

  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: red;
    border-color: rgba(0, 0, 0, 0.5);
    color: red;
    border-radius: 8px;
  }

  /deep/ .el-checkbox__inner {
    width: 17px;
    height: 17px;
  }

  /deep/ .el-checkbox__inner::after {

    box-sizing: content-box;
    content: "";
    border: 1.5px solid #FFF;
    border-left: 0;
    border-top: 0;
    height: 8px;
    left: 5px;
    position: absolute;
    top: 1px;


  }

  /* 重写多选框样式 */
  /* 底部结算样式 */
  .car_bottom {
    position: fixed;
    bottom: 55px;
    width: 100%;
    height: 50px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .car_bottom_left {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .car_bottom_right {
    width: 40%;
    height: 100%;
    color: white;
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 底部结算样式 */
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
    margin-top: 25px;
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

</style>
