<template>
  <div class="content">
    <div class="head">
      <i class="el-icon-close close" @click="closePage"></i>
      <span>搜索</span>
    </div>
    <div class="search_input">
      <div class="input">
        <el-input placeholder="请输入内容" v-model="searchInfo" @change="SearchChange" clearable>
        </el-input>
      </div>
      <div @click="closePage"><span>取消</span></div>
    </div>
    <div class="hot_search" v-show="!isSearch">
      <div class="search_content">
        <div class="search_title"><span>热门搜索</span></div>
        <div class="search_label">
          <div class="son" v-for="(item,index) in hotSearchData" @click="toSearchResult(item.label)" :key="index">
            <span>{{item.label}}</span></div>

        </div>
      </div>
    </div>
    <div class="history_search" v-show="!isSearch&&ishistory">
      <div class="search_content">
        <div class="search_title2"><span>历史搜索</span><i class="el-icon-delete" @click="hideHistory"></i></div>
        <div class="search_label">
          <div class="son" v-for="(item,index) in historySearchData" @click="toSearchResult(item.label)" :key="index">
            <span>{{item.label}}</span></div>

        </div>
      </div>
    </div>
    <div class="searchGood_content" v-show="isSearch">
      <div class="tab" id="tabFixed" :class="{'is_fixed' : isFixed}">
        <div class="tab-son" @click="tabChange" v-for="(item,index) in tab" :key="index">
          <div :class="item.class" :id="item.id">{{item.label}}</div>
        </div>



      </div>
      <div class="shopList">
        <div class="shop" v-loading="loading">
       <div class="shop_content">
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
    </div>
  </div>

</template>

<script>
  export default {
    name: "search",
    data: () => ({
      isSearch: false,
      ishistory: false,
      tab: [{
          id: 1,
          label: "综合",
          class: "changes"
        },
        {
          id: 2,
          label: "价格",
          class: "change"
        },
        {
          id: 3,
          label: "销量",
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
      hotSearchData: [{
          label: "新款毛衣"
        },
        {
          label: "冰箱"
        },
        {
          label: "毛衣"
        },
        {
          label: "新款毛衣"
        },
        {
          label: "新款毛衣"
        },
        {
          label: "新款毛衣"
        },

      ],
      historySearchData: [

      ],
      isFixed: null,
      loading: false,
      searchInfo: "" //搜索框输入内容
    }),
    methods: {
      handleScroll() { //选项栏监听事件
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
        let offsetTop = document.querySelector('#tabFixed').offsetTop; // 要滚动到顶部吸附的元素的偏移量
        this.isFixed = scrollTop > offsetTop ? true : false; // 如果滚动到顶部了，this.isFixed就为true
      },
      getHistorySearchData() {
        if (this.$store.state.historySearchData.length > 0) {
          this.ishistory = true
          this.historySearchData = this.$store.state.historySearchData
        }
      },
      hideHistory() {
        this.ishistory = false
        this.$store.commit('clearHistorySearchData', '删除历史记录')
      },
      toGoodDetail() {
        this.$router.push("/index/good_Detail")
      },
      tabChange(e) {
        //  console.log(e.target.id)
        for (let i = 0; i < this.tab.length; i++) {
          if (e.target.id == this.tab[i].id) {
            this.tab[i].class = "changes" //改变点击tab样式
            this.loading = true
            setTimeout(() => {
              this.loading = false
            }, 1000)
          } else {
            this.tab[i].class = "change"
          }
        }
      },
      toSearchResult(val) {
        console.log(val)
        this.$store.commit('setHistorySearchData', val)
        this.isSearch = true
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1000)

      },
      SearchChange(value) {

        console.log(value)
        this.$store.commit('setHistorySearchData', value)
        console.log(this.$store.state.historySearchData)
        if (value == "") {

          this.isSearch = false
        } else {
          this.isSearch = true
          this.loading = true
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }
      },
      closePage() {
        this.$router.push("/index")
      }

    },
    mounted() {
      this.getHistorySearchData() //获取历史搜索数据
      window.addEventListener('scroll', this.handleScroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
    },
    beforeDestroy() { //在组件生命周期结束的时候销毁。
      window.removeEventListener('scroll', this.handleScroll); //移除监听事件

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
    background: rgb(247, 248, 250);
  }

  .is_fixed {
    position: fixed;

    top: 0px;
  }

  span {}

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

    z-index: 999;
  }

  .close {
    position: absolute;
    left: 14px;
    font-size: 19px;
    color: black;
  }

  /* 头部 */
  /* 搜索框 */
  .search_input {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
    padding-bottom: 10px;

  }

  .input {
    width: 80%;
    height: 85%;


  }


  /deep/ .el-input__inner {
    border-radius: 22px;
    border: none;
    background: rgb(247, 248, 250);
  }

  .input input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #aab2bd;
    /* placeholder字体大小  */
    font-size: 12px;
    /* placeholder位置  */
    text-align: start;
    padding-left: 10px;
  }

  /* 搜索框 */
  /* 热门搜索 */
  .hot_search {
    width: 100%;
    margin-top: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search_content {
    width: 90%;

    background: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  .search_title {
    width: 100%;
    height: 40px;
    display: flex;
  }

  .search_title span {
    margin-left: 15px;
    margin-top: 10px;
    font-size: 15px;
  }

  .search_label {
    width: 100%;
    padding-bottom: 10px;
  }

  .search_label .son {
    float: left;
    max-width: 80%;
    min-width: 20%;
    margin: 2.5%;
  }

  .son span {
    min-height: 30px;
    background: rgb(247, 248, 250);
    border-radius: 12px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 热门搜索*/
  /*  历史搜素*/
  .history_search {
    width: 100%;
    margin-top: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search_title2 {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .search_title2 i {
    margin-right: 15px;
    margin-top: 10px;
    font-size: 15px;

  }

  .search_title2 span {
    margin-left: 15px;
    margin-top: 10px;
    font-size: 15px;
  }

  /* 历史搜素*/
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

  /* 商品列表 */
  .shopList {
    width: 100%;
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(247, 248, 250);
  }

  .shop {
    width: 100%;
    height: 100%;
    overflow: hidden;
    zoom: 1;
    position: relative;
    
  }
  .shop_content{
    position:absolute;
    top:-5%;
  }

  .good {
    width: 45%;
    height: 200px;
    float: left;
    margin: 2.5%;
    margin-top: 15%;
    margin-left: 2.5%;
  }

  .good_image {
    width: 100%;
    height: 200px;
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

</style>
