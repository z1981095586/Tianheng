<template>
  <div class="content">
    <div class="all-page">
      <div class="input" v-show="selectInfo.company_id == '10000012'">
        <!-- <select
          name="bbxb"
          id="selecte"
          style="width: 97%"
          class="shortselect3"
          @change="change"
        >
          <option :value="item.workshop_id" v-for="item in QxWorkShop">
            {{ item.workshop_name }}
          </option>
        </select> -->
        <el-select
          style="width: 97%"
          v-model="workshop"
          @change="change"
          placeholder="请选择"
        >
          <el-option
            :value="item.workshop_id"
            v-for="item in QxWorkShop"
            :key="item.value"
            :label="item.workshop_name"
          >
          </el-option>
        </el-select>
        <!-- <div style="width: 47%; height: 36px"></div> -->
      </div>
      <div class="input">
        <!-- <input
          @keyup.13="search(true)"
          type="search"
          ref="input1"
          placeholder="输入机台号"
          v-model="machineId"
        /> -->
        <!-- <input
          @keyup.13="search(true)"
          type="search"
          ref="input1"
          placeholder="输入人员"
          v-model="staff_name"
        /> -->
        <el-input
          @keyup.13="search(true)"
          type="search"
          style="width: 47%"
          ref="input1"
          placeholder="输入机台号"
          prefix-icon="el-icon-search"
          v-model="machineId"
        ></el-input>
        <el-input
          @keyup.13="search(true)"
          type="search"
          style="width: 47%"
          ref="input1"
          placeholder="输入人员"
          v-model="staff_name"
          prefix-icon="el-icon-search"
        ></el-input>
      </div>
      <div class="input" v-show="selectInfo.company_id == '10000012'">
        <!-- <input
          @keyup.13="search(true)"
          type="search"
          ref="input1"
          placeholder="输入故障"
          v-model="problem"
        />
        <input
          @keyup.13="search(true)"
          type="search"
          ref="input1"
          placeholder="输入零配件"
          v-model="parts"
        />
        <i class="el-icon-search" style="font-size: 1.3rem; right: 20px"></i>
        <i class="el-icon-search" style="font-size: 1.3rem"></i> -->
        <el-input
          @keyup.13="search(true)"
          type="search"
          ref="input1"
          style="width: 47%"
          placeholder="输入故障"
          v-model="problem"
          prefix-icon="el-icon-search"
        ></el-input>
        <el-input
          @keyup.13="search(true)"
          type="search"
          ref="input1"
          style="width: 47%"
          placeholder="输入零配件"
          v-model="parts"
          prefix-icon="el-icon-search"
        ></el-input>
      </div>
      <div class="input" v-show="selectInfo.company_id == '10000012'">
        <el-date-picker
          style="width: 47%; height: 36px; border-radius: 4px"
          v-model="start_date"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择开始日期"
          @change="search(true)"
        >
        </el-date-picker>
        <el-date-picker
          style="width: 47%; height: 36px; border-radius: 4px"
          v-model="end_date"
          type="date"
          placeholder="选择结束日期"
          value-format="yyyy-MM-dd"
          @change="search(true)"
        >
        </el-date-picker>
      </div>

      <scroller
        height="100%"
        :onRefresh="refresh"
        :style="selectInfo.company_id == '10000012' ? 'top: 191px' : 'top: 50px'"
        :onInfinite="inf"
        ref="my_scroller"
      >
        <div class="scroller">
          <div v-for="(item, index) in tableData" :key="'data_' + index" class="cardBox">
            <div class="cardBox_con">
              <div class="line"></div>
              <div class="cardBox_con_con" @click="toDetail(item)">
                <span style="width: 100%; text-align: left; margin-bottom: 0.5rem"
                  >机台号：{{ item.machineId }}</span
                >
                <div
                  style="
                    width: 100%;
                    text-align: left;
                    display: flex;
                    font-size: 0.8rem;
                    color: rgba(0, 0, 0, 0.5);
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                  "
                >
                  <span style="wdith: 50%">故障类型：{{ item.errorReason }}</span
                  ><span style="width: 50%">描述：{{ item.remark }}</span>
                </div>
                <span
                  style="
                    width: 100%;
                    text-align: left;
                    font-size: 0.8rem;
                    color: rgba(0, 0, 0, 0.5);
                    margin-bottom: 0.5rem;
                  "
                  >处理方式：{{ item.solve }}</span
                >
                <span
                  style="
                    width: 100%;
                    text-align: left;
                    font-size: 0.8rem;
                    color: rgba(0, 0, 0, 0.5);
                    margin-bottom: 1rem;
                  "
                  >使用配件：{{ item.parts }}</span
                >
                <div
                  style="
                    width: 100%;
                    text-align: left;
                    display: flex;
                    font-size: 0.8rem;
                    color: rgba(0, 0, 0, 0.8);
                    justify-content: space-between;
                    margin-bottom: 0rem;
                  "
                >
                  <span>维修人：{{ item.repairPerson }}</span
                  ><span>完成时间：{{ item.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueScroller from "vue-scroller"; //引入vue-scroller，用来做上拉加载下拉刷新
export default {
  name: "repairHistory",
  data() {
    return {
      tableData: [],
      selectInfo: {
        company_id: "",
      },
      staff_name: "",
      machineId: "",
      pageNum: 1,
      pageSize: 4,
      total: null,
      IsSearch: false,
      QxWorkShop: [
        {
          workshop_name: "七星总分厂",
          workshop_id: "",
        },
        {
          workshop_name: "七星一分厂",
          workshop_id: 1,
        },
        {
          workshop_name: "七星二分厂",
          workshop_id: 2,
        },
        {
          workshop_name: "七星三分厂",
          workshop_id: 3,
        },
      ],
      workshop: "七星总分厂",
      parts: "",
      workshop_id: "",
      problem: "",
      start_date: "",
      end_date: "",
    };
  },
  methods: {
    change(e) {
      console.log(e);
      this.workshop_id = e;
      this.search(true);
    },
    search() {
      this.IsSearch = true;
      this.tableData = [];
      this.getData();
    },
    toDetail(data) {
      this.$router.push({
        //跳转并传参数
        path: "/repairHistoryDetail",
        name: "repairHistoryDetail",
        params: {
          data: data,
          company_id: this.selectInfo.company_id,
        },
      });
    },
    back() {
      nativeMethod.closeActivity();
    },
    refresh() {
      //下拉刷新函数
      this.pageNum = 1;
      this.tableData = [];
      setTimeout(() => {
        //不设置定时器会出现bug
        this.getData(); //获取数据列表
        this.$refs.my_scroller.finishPullToRefresh(); //关闭下拉刷新函数
      }, 500);
    },
    inf() {
      setTimeout(() => {
        if (this.tableData.length == this.total) {
          //如果数据总条数等于当前数据列表长度了，那就关闭上拉加载了
          this.$refs.my_scroller.finishInfinite(true);
          return;
        } else if (this.tableData.length == 0) {
          //如果查到没数据了，那就关闭上拉加载了
          this.$refs.my_scroller.finishInfinite(true);
          return;
        } else {
          //否则就++，获取下一页数据
          this.pageNum++;
          this.IsSearch = false;
          this.getData();
        }
      }, 500);
    },

    getData() {
      //获取数据
      let url = "http://106.12.219.66:8227/report/getRepairSubmit";
      let that = this;
      if (this.IsSearch == true) {
        that.pageNum = 1;
      }
      console.log(this.IsSearch);
      console.log(that.pageNum);
      let jsonData;
      if (that.selectInfo.company_id == "10000012") {
        //七星
        jsonData = {
          workshopId: that.workshop_id,
          parts: that.parts,
          errorReason: that.problem,
          startDate: that.start_date,
          endDate: that.end_date,
          machineId: that.machineId,
          repairPerson: that.staff_name,
          pageNum: that.pageNum,
          pageSize: that.pageSize,
        };
      } else {
        jsonData = {
          machineId: that.machineId,

          repairPerson: that.staff_name,
          pageNum: that.pageNum,
          pageSize: that.pageSize,
        };
      }

      axios({
        url: url,
        method: "post",
        data: jsonData,
        headers: {
          companyId: that.selectInfo.company_id,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.data.list.length == 0) {
          that.$refs.my_scroller.finishInfinite(true);
          return;
        } else {
          that.total = res.data.data.total; //设置数据总条数
          that.$refs.my_scroller.finishPullToRefresh(true); ////下拉获取数据回调函数停止使用
          for (let i = 0; i < res.data.data.list.length; i++) {
            if (res.data.data.list[i].parts) {
              res.data.data.list[i].parts = res.data.data.list[i].parts.replace(/,/g, ""); //取消字符串中出现的所有逗号
            }
            that.tableData.push(res.data.data.list[i]);
          }

          if (that.tableData.length == that.total) {
            that.$refs.my_scroller.finishInfinite(true); //上拉获取数据回调函数停止使用
          } else {
            that.$refs.my_scroller.finishInfinite(false); //上拉获取数据回调函数停止使用
          }
        }
      });
    },
  },
  mounted() {
    history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", function () {
      history.pushState(null, null, window.location.href);
    });
    this.selectInfo.company_id = this.$route.params.company_id;
    this.tableData = [];
    this.getData();
    nativeMethod.flag("true");
  },
  watch: {
    machineId(val) {
      if (val == "") {
        this.search(true);
      }
    },
    staff_name(val) {
      if (val == "") {
        this.search(true);
      }
    },
    problem(val) {
      if (val == "") {
        this.search(true);
      }
    },
    parts(val) {
      if (val == "") {
        this.search(true);
      }
    },
  },
};
</script>

<style scoped>
.el-select /deep/ input {
  text-align: center;
}
.el-select /deep/ .el-input__suffix {
  right: 30%;
}
.shortselect3 {
  width: 47%;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.cardBox {
  height: 11rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardBox_con {
  width: 90%;
  height: 90%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
}

.cardBox_con_con {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.line {
  position: absolute;
  bottom: 2.5rem;
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 0.5rem;
}

.scroller {
  height: 80%;
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.shortselect {
  border: 0;
  display: block;
  position: relative;
  min-height: 1.146667rem;
  line-height: 1.146667rem;
  white-space: nowrap;
  position: fixed;
  right: 15px;
  top: 12px;
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

.all-page /deep/ ._v-container {
  position: absolute;
  top: 50px;
  left: 0;
}

.select span {
  margin-top: 0px;
  font-size: 12px;
  outline: none;
  color: rgb(21, 153, 204);
  border-radius: 4px;
  width: 80px;
  position: fixed;
  top: 10px;
  right: 0px;
}

.text {
  height: 20px;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  font-size: 12px;

  padding: 0px 10px;

  display: block;

  width: 100%;

  -webkit-box-sizing: border-box;

  box-sizing: border-box;

  background-color: #ffffff;

  color: rgb(65, 152, 199);

  border-radius: 4px;
}

.el-dropdown {
  color: #606266;
  font-size: 17px;
  /* float: right; */
  /* position: absolute; */
  width: 100px;
  position: fixed;
  right: 0px;
  top: 10px;
}

.bottom {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
}

.content {
  position: relative;
  overflow: auto;
  padding-top: 10px;
}

.submit {
  width: 49%;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(49, 153, 102);
  color: white;
}

.cancel {
  width: 49%;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(255, 153, 102);
  color: white;
}

.add {
  width: 90%;
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

.input-number {
  width: 29%;
  display: flex;

  justify-content: space-around;
  align-items: center;
}

.input {
  width: 100%;
  height: 42px;

  padding-bottom: 5px;
  background: white;

  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.input input {
  width: 47%;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.input input:focus {
  outline: none;
}

.input i {
  position: absolute;
  left: 35px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;
}

.input input::-webkit-input-placeholder {
  font-size: 0.7rem;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
}

.contain {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.all-page {
  width: 100%;

  height: 100vh;

  background-color: rgb(242, 242, 242);
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
  height: 80px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  background: white;
  font-size: 0.9rem;
  position: relative;
  font-weight: 400;
  border-radius: 4px;
}

.card_border {
  width: 95%;
  height: 80px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  background: white;
  font-size: 0.9rem;
  position: relative;
  font-weight: 400;
  border: 1px solid red;
  border-radius: 4px;
}

.check {
  position: absolute;
  right: 15px;
  top: 23px;
}

.el-checkbox__inner {
  border-radius: 8px;
}

.check .el-checkbox .el-checkbox__input .el-checkbox__inner {
  border-radius: 8px;
}

.check /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: red;
  border-color: red;
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
  height: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-content2 {
  width: 100%;
  height: 20%;
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
