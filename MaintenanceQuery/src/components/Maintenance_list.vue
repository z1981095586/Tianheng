<template>
  <div class="content" style="padding-top: 10px">
    <span style="font-size: 1rem; font-weight: bold; margin-bottom: -1rem"
      >待保养记录</span
    >
    <img
      :src="require('@/images/saoma.png')"
      style="width: 2rem; position: fixed; right: 17px; top: 5px"
      @click="scan()"
    />

    <!--出库单详细-->
    <div class="all-page">
      <div class="select">
        <select name="bbxb" id="selecte" class="shortselect3" @change="change3">
          <option :value="item.id" v-for="item in mac_type">{{ item.type_name }}</option>
        </select>
        <i
          class="el-icon-arrow-left"
          style="position: fixed; left: 17px; top: 13px"
          @click="back"
        ></i>
        <!-- <select name="bbxb" id="selecte" class="shortselect2" @change="change2">
          <option :value="item.id" v-for="item in menu2">{{item.name}}</option>

        </select> -->

        <select name="bbxb" id="selecte" class="shortselect" @change="change">
          <option :value="item.id" v-for="item in menu">{{ item.name }}</option>
        </select>
      </div>
      <div
        class="select"
        style="background: rgb(245, 245, 245); height: 5%; font-size: 0.9rem"
      >
        <span>确认保养项目</span><i class="el-icon-right"></i><span>选择机台</span
        ><i class="el-icon-right"></i><span>保养提交</span><i class="el-icon-right"></i
        ><span>完成</span>
      </div>
      <!-- <scroller height="100%" :onRefresh="refresh" :onInfinite="inf" ref="my_scroller"> -->
      <div style="height: 75%; overflow: auto">
        <div class="contain" style="margin-top: 8px" v-for="item in datalist">
          <!-- <div class="card"
              @click="toDetail(item.mac_type_id,item.mac_type_name,item.maintain_type_name,item.machine_id,item.workshop_id,item.maintain_type_id)"> -->
          <div
            class="card"
            @click="
              toDetail(
                item.mac_type_id,
                item.mac_type_name,
                item.name,
                item.workshop_id,
                item.id
              )
            "
          >
            <div class="card-head">
              <!-- <div><span>{{workshop_name}}</span><span>上次提交时间：{{item.maintain_time}}</span></div> -->
              <div>
                <span>{{ workshop_name }}</span
                ><span>保养周期：{{ item.intervals }}天</span>
              </div>
              <span class="no-deal">待处理</span>
            </div>
            <div class="line">
              <div class="line-con"></div>
            </div>
            <!-- <div class="card-content2" style="margin-top:5px;">
                <div class="content-two" style="   justify-content: space-between;">
                  <span>设备编号：{{item.machine_id}}</span>
                  <span>设备类型：{{item.mac_type_name}}</span>
                </div>

              </div> -->
            <div class="card-content2">
              <div class="content-two">
                <span>保养类别：{{ item.name }}</span>
              </div>
            </div>

            <div class="card-content2">
              <div class="content-two">
                <span>备注：{{ item.remarks }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </scroller> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueScroller from "vue-scroller";
export default {
  name: "Maintenance_list",
  data() {
    return {
      workshop_name: "", //存放车间名称
      macRelation: {
        machine_id: "",
        mac_type_id: "",
        workshop_id: "",
      },
      page_size: 7,
      page_num: 1,
      total_data_num: 0,
      mac_type: [],
      staff_id: this.$route.params.staff_id,
      selectInfo: {
        company_id: "",
      },
      days_to_expire: 99999, //近几日
      operator: "", //操作人
      menu: [
        // {id:1,name:"1号车间"},
        //   {id:2,name:"2号车间"}
      ], //存放车间id
      menu2: [
        {
          id: 0,
          name: "今日",
        },
        {
          id: 2,
          name: "近三日",
        },
        {
          id: 6,
          name: "近一周",
        },
      ], //存放车间id
      datalist: [], //存放列表数据
    };
  },
  methods: {
    scan() {
      nativeMethod.scan1(
        null,
        null,
        this.macRelation.workshop_id,
        this.macRelation.mac_type_id,
        this.selectInfo.company_id,
        this.days_to_expire,
        null
      );
      // this.$router.push({
      //   path: '/choose',
      //   name: 'choose',
      //   params: {

      //       machine_id:"1200",
      //       operator:"admin",
      //       staff_id:"1",
      //       mac_type_id:"021001",
      //       workshop_id:"1",
      //     company_id: this.selectInfo.company_id,
      //     days_to_expire:this.days_to_expire
      //   }
      // }).catch(data => {})
    },
    getMacTypeCategoryList() {
      //获取mactypeid
      let url = "http://106.12.219.66:8227/report/getSimpleReport";
      let headers = {
        "Content-Type": "application/json",
        companyID: this.selectInfo.company_id,
      };
      let method = "post";
      let data = {
        tableName: "mac_type",
        pageNum: 1,
        pageSize: 1000,
        selectFields: ["id", "type_name"],
      };
      let that = this;
      axios({
        url: url,
        method: method,
        data: data,
        headers: headers,
      }).then((response) => {
        console.log(response.data.data);
        this.macRelation.mac_type_id = response.data.data[0].id;
        for (let i = 0; i < response.data.data.length; i++) {
          that.mac_type.push(response.data.data[i]);
        }
        this.getWorkShopList(); //获取车间id列表
      });
    },

    back() {
      console.log(this.operator);
      console.log(this.selectInfo);
      console.log(this.staff_id);
      this.$router.push({
        //跳转并传参数
        path: "/ToMaintenance_list",
        name: "ToMaintenance_list",
        params: {
          //  machine_id:this.macRelation.machine_id,
          operator: this.operator,
          // workshop_id:this.macRelation.workshop_id,
          company_id: this.selectInfo.company_id,
          staff_id: this.staff_id,
        },
      });
    },
    change(e) {
      //workshop下拉选择框值改变重新获取数据
      this.datalist = [];
      this.page_num = 1;
      this.macRelation.workshop_id = e.target.value;
      this.getMachine_id();
    },
    change2(e) {
      //day下拉选择框值改变重新获取数据
      this.datalist = [];
      this.page_num = 1;
      this.days_to_expire = Number(e.target.value);
      this.getMachine_id();
    },
    change3(e) {
      //mactype下拉选择框值改变重新获取数据

      this.datalist = [];
      this.page_num = 1;
      this.macRelation.mac_type_id = e.target.value;
      this.getMachine_id();
    },

    toDetail(mac_type_id, type_name, flag, workshop_id, maintain_type_id) {
      //跳转到选择机台页面，传递参数

      this.$router.push({
        //跳转并传参数
        path: "/chooseMachine",
        name: "chooseMachine",
        params: {
          company_id: this.selectInfo.company_id,
          operator: this.operator,
          workshop_id: workshop_id,
          mac_type_id: this.macRelation.mac_type_id,
          workshop_id: this.macRelation.workshop_id,
          flag: flag,
          staff_id: this.staff_id,

          maintain_type_id: maintain_type_id,
          isClickIn: true,
        },
      });

      // nativeMethod.scan2(machine_id,flag,workshop_id,mac_type_id,this.selectInfo.company_id,this.days_to_expire,maintain_type_id)
    },
    getWorkShopList() {
      //获取车间列表数据
      let url = " http://120.55.124.53:8211/workShop/getWorkShopList";
      let that = this;
      axios
        .post(
          url,
          {
            page: 1,
            pageSize: 10000,
          },
          {
            headers: {
              companyId: that.selectInfo.company_id,
            },
          }
        )
        .then(function (res) {
          //console.log(res)
          that.menu = res.data.data; //设置下拉菜单选项列表
          that.macRelation.workshop_id = that.menu[0].id;
          that.getMachine_id(); //先获取第一个选项的车间数据
        });
    },

    getMachine_id() {
      // 获取设备编号
      let url = "http://120.55.124.53:8206/api/maintain/getMaintainType";
      let maintainType = {
        mac_type_id: this.macRelation.mac_type_id,
      };
      let selectInfo = {
        company_id: this.selectInfo.company_id,
      };

      let that = this;
      console.log(that.staff_id);
      axios
        .post(url, {
          maintainType,
          selectInfo,
        })
        .then(function (res) {
          console.log(res);

          if (res.data.result.length == 0) {
            // that.$message({
            //   message: '没有数据！',
            //   center: true,
            //   duration: 2000
            // });
            // that.$refs.my_scroller.finishInfinite(true)
            return;
          } else {
            // that.total_data_num = res.data.result.total_data_num //设置数据总条数
            for (let i = 0; i < res.data.result.length; i++) {
              if (
                res.data.result[i].intervals == null ||
                res.data.result[i].intervals < 0
              ) {
                res.data.result[i].intervals = 0;
              }
              if (
                res.data.result[i].remarks == null ||
                res.data.result[i].remarks == ""
              ) {
                res.data.result[i].remarks = "暂无填写";
              }
              that.datalist.push(res.data.result[i]);

              // res.data.result.machine_list[i].big_maintain.flag = "大保养" //判断保养类型
              // res.data.result.machine_list[i].small_maintain.flag = "小保养"
              // that.datalist.push(res.data.result.machine_list[i].big_maintain) //将处理完成的数据push到数据列表
              // that.datalist.push(res.data.result.machine_list[i].small_maintain)
            }
          }
        });

      // let url = 'http://120.55.124.53:8206/api/maintain/getRecentMaintainRecord'
      // let macRelation = {
      //   mac_type_id: this.macRelation.mac_type_id,
      //   workshop_id: this.macRelation.workshop_id
      // }
      // let selectInfo = {
      //   company_id: this.selectInfo.company_id,
      //   page_size: this.page_size,
      //   page_num: this.page_num
      // }

      // let that = this
      // console.log(that.staff_id)
      // axios.post(url, {
      //   macRelation,
      //   selectInfo,
      //   // "staff_id":that.staff_id,
      //   days_to_expire: that.days_to_expire
      // }).then(function (res) {

      //   console.log(res)

      //   if (res.data.result.machine_list.length == 0) {
      //     // that.$message({
      //     //   message: '没有数据！',
      //     //   center: true,
      //     //   duration: 2000
      //     // });
      //     that.$refs.my_scroller.finishInfinite(true)
      //     return
      //   } else {
      //     that.total_data_num = res.data.result.total_data_num //设置数据总条数
      //     for (let i = 0; i < res.data.result.machine_list.length; i++) {
      //       for (let j = 0; j < res.data.result.machine_list[i].maintain.length; j++) {
      //         that.datalist.push(res.data.result.machine_list[i].maintain[j])
      //       }
      //       // res.data.result.machine_list[i].big_maintain.flag = "大保养" //判断保养类型
      //       // res.data.result.machine_list[i].small_maintain.flag = "小保养"
      //       // that.datalist.push(res.data.result.machine_list[i].big_maintain) //将处理完成的数据push到数据列表
      //       // that.datalist.push(res.data.result.machine_list[i].small_maintain)

      //     }
      //          if(that.datalist.length==that.total_data_num){
      //      that.$refs.my_scroller.finishInfinite(true) //上拉获取数据回调函数停止使用
      //   }else{
      //      that.$refs.my_scroller.finishInfinite(false) //上拉获取数据回调函数停止使用
      //   }

      //   }

      // })
    },
    inf() {
      setTimeout(() => {
        if (this.datalist.length == this.total_data_num) {
          //如果数据总条数等于当前数据列表长度了，那就关闭上拉加载了
          this.$refs.my_scroller.finishInfinite(true);
          return;
        } else if (this.datalist.length == 0) {
          //如果查到没数据了，那就关闭上拉加载了
          this.$refs.my_scroller.finishInfinite(true);
          return;
        } else {
          //否则就++，获取下一页数据
          this.page_num++;
          this.getMachine_id();
        }
      }, 500);
    },
    refresh() {
      //下拉刷新函数
      //console.log("refresh");
      this.page_num = 1;
      this.datalist = [];
      setTimeout(() => {
        //不设置定时器会出现bug
        this.getMachine_id(); //获取数据列表
        this.$refs.my_scroller.finishPullToRefresh(); //关闭下拉刷新函数
      }, 500);
    },
    getTime(date) {
      //获取当前时间
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (strDate < 10) {
        strDate = "0" + strDate;
      }
      var currentdate = year + "-" + month + "-" + strDate;
      return currentdate;
    },
  },
  mounted() {
    //  this.macRelation.machine_id = this.$route.params.machine_id;
    this.operator = this.$route.params.operator;
    //  this.macRelation.workshop_id = this.$route.params.workshop_id;
    this.selectInfo.company_id = this.$route.params.company_id;
    this.staff_id = this.$route.params.staff_id;
    this.getMacTypeCategoryList();
    history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", function () {
      history.pushState(null, null, window.location.href);
    });
  },
};
</script>

<style scoped>
span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.all-page /deep/ ._v-container {
  position: absolute;
  top: 11%;
}

.select {
  width: 100%;
  height: 7%;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.shortselect {
  border: 0;
  display: block;
  position: relative;
  min-height: 1.146667rem;
  line-height: 1.146667rem;
  white-space: nowrap;
  font-size: 12px;
  color: rgb(21, 153, 204);
  overflow: hidden;
  background-color: #eee;
  background: transparent;
  appearance: none;
  -moz-appearance: none;
  /* Firefox */
  -webkit-appearance: none;
  /* Safari 和 Chrome */
}

.scroller {
  height: 80%;
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shortselect2 {
  border: 0;
  display: block;
  position: relative;
  min-height: 1.146667rem;
  line-height: 1.146667rem;
  white-space: nowrap;
  font-size: 12px;
  color: rgb(21, 153, 204);
  overflow: hidden;
  background-color: #eee;
  background: transparent;
  appearance: none;
  -moz-appearance: none;
  /* Firefox */
  -webkit-appearance: none;
  /* Safari 和 Chrome */
}

.shortselect3 {
  border: 0;
  display: block;
  position: relative;
  min-height: 1.146667rem;
  line-height: 1.146667rem;
  white-space: nowrap;
  font-size: 12px;
  color: rgb(21, 153, 204);
  overflow: hidden;
  background-color: #eee;
  background: transparent;
  appearance: none;
  -moz-appearance: none;
  /* Firefox */
  -webkit-appearance: none;
  /* Safari 和 Chrome */
}

.no-deal {
  margin-right: 5px;
  background: rgb(220, 164, 80);
  border-radius: 8px;
  padding-left: 4px;
  padding-right: 4px;
  color: white;
}

.has-deal {
  margin-right: 5px;
  background: green;
  border-radius: 8px;
  padding-left: 4px;
  padding-right: 4px;
  color: white;
}

.contain {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.all-page {
  margin-top: 12px;
  width: 100%;

  height: 100vh;

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
  height: 120px;
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
  height: 30%;
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
  height: 20%;
  margin-top: 0.9rem;
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
  width: 95%;
  display: flex;
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
