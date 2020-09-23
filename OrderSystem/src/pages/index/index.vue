<template>

  <div class="content">
    <div class="head" id="boxFixed" :class="{'is_fixed' : isFixed}">
      <i class="el-icon-search search" @click="tosearch"></i>
      <span>首页</span>
    </div>
    <div class="swiper">
      <el-carousel :interval="2000" trigger="click" height="180px">
        <el-carousel-item v-for="(item,index) in PicList" :key="index">
          <el-image :src="item.url" fit="cover" style="width:100%" ></el-image>
        </el-carousel-item>
      </el-carousel>

    </div>
    <div class="tab" id="boxFixed2" :class="{'is_fixed2' : isFixed2}">
      <div class="tab-son" @click="tabChange" v-for="(item,index) in tab" :key="index">
        <div :class="item.class" :id="item.id">{{item.label}}</div>
      </div>


    </div>
    <div class="shopList">
      <div class="shop" v-loading="loading">
        <div class="good" v-for="(item,index) in PicList" @click="toGoodDetail" :key="index">
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

</template>

<script>
  export default {
    name: "index",
    data: () => ({

      tab: [{
          id: 1,
          label: "精品推荐",
          class: "changeed"
        },
        {
          id: 2,
          label: "拼团抢购",
          class: "change"
        },
        {
          id: 3,
          label: "最新上架",
          class: "change"
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
      isFixed: null,
      isFixed2: null,
      loading: true
    }),

    methods: {
      toGoodDetail() {
        this.$router.push("/index/good_Detail")
      },
      tosearch() {

        this.$router.push("/index/search")
      },
      tabChange(e) {
        //  console.log(e.target.id)
        for (let i = 0; i < this.tab.length; i++) {
          if (e.target.id == this.tab[i].id) {
            this.tab[i].class = "changeed" //改变点击tab样式
            this.loading = true
            setTimeout(() => {
              this.loading = false
            }, 1000)
          } else {
            this.tab[i].class = "change"
          }
        }
      },
      handleScroll() { //头栏监听事件
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
        let offsetTop = document.querySelector('#boxFixed').offsetTop; // 要滚动到顶部吸附的元素的偏移量
        this.isFixed = scrollTop > offsetTop ? true : false; // 如果滚动到顶部了，this.isFixed就为true
      },
      handleScroll2() { //tab栏监听事件
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
        let offsetTop = document.querySelector('#boxFixed2').offsetTop ; // 要滚动到顶部吸附的元素的偏移量

        this.isFixed2 = (scrollTop + 40) > offsetTop ? true : false; // 如果滚动到顶部了，this.isFixed就为true （scrolltop需要加头的高度40）
      }
    },
    mounted() {

      window.addEventListener('scroll', this.handleScroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
      window.addEventListener('scroll', this.handleScroll2) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    beforeDestroy() { //在组件生命周期结束的之前销毁。
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('scroll', this.handleScroll2);
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
  .search {
    position: absolute;
    left: 14px;
    font-size: 19px;
  }

  /* 轮播图 */
  .swiper {
    width: 100%;
    height: 180px;
  }

  /* 轮播图 */
  /* tab栏 */
  .is_fixed2 {
    position: fixed;

    top: 40px;
  }

  .tab {

    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 1000;
    background: white;
  }

  .tab-son {
    width: 20%;
    height: 50%;
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.65);
  }

  .changeed {
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
/deep/ .el-carousel__button{
      width: 8px;height: 8px;border-radius: 8px;margin: 8px;
}
</style>
