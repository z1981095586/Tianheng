<template>
  <div class="content">
    <!-- <span style="font-size: 1rem; font-weight: bold; margin-bottom: -1rem">绕线机</span> -->

    <div class="all-page">
      <div class="headTitle">
        <span style="font-size: 1rem; font-weight: bold; margin-bottom: -1rem"
          >绕线机</span
        >
      </div>
      <div class="scr">
        <el-card class="card_one" v-for="(item, index) in dataList" :key="index">
          <div class="ip" @click="toDetail(item.machine_ip, item.machine_id)">
            <div class="ipNum">
              <img src="../../static/img/ip.png" /><span>{{ item.machine_ip }}</span>
            </div>
            <div class="ds">锭数：{{ item.spindle }}</div>
          </div>

          <div class="class" @click="toDetail(item.machine_ip, item.machine_id)">
            <div
              class="class_con"
              :class="item.current_shift == 1 ? 'classBlack' : 'class_con'"
            >
              <img :src="item.current_shift == 1 ? url1 : url2" /><span
                >班产量：{{ item.class_A_production }}</span
              ><span>月产量：{{ item.class_A_production_month }}</span>
              <img
                src="../../static/img/class.png"
                style="width: 1.2rem; height: 1.2rem; position: absolute; right: 1rem"
                v-show="item.current_shift == 1"
              />
            </div>
          </div>
          <div class="class" @click="toDetail(item.machine_ip, item.machine_id)">
            <div
              class="class_con"
              :class="item.current_shift == 2 ? 'classBlack' : 'class_con'"
            >
              <img :src="item.current_shift == 2 ? url3 : url4" /><span
                >班产量：{{ item.class_B_production }}</span
              ><span>月产量：{{ item.class_B_production_month }}</span>
              <img
                src="../../static/img/class.png"
                style="width: 1.2rem; height: 1.2rem; position: absolute; right: 1rem"
                v-show="item.current_shift == 2"
              />
            </div>
          </div>
          <div class="class" @click="toDetail(item.machine_ip, item.machine_id)">
            <div
              class="class_con"
              :class="item.current_shift == 3 ? 'classBlack' : 'class_con'"
            >
              <img :src="item.current_shift == 3 ? url5 : url6" /><span
                >班产量：{{ item.class_C_production }}</span
              ><span>月产量：{{ item.class_C_production_month }}</span>
              <img
                src="../../static/img/class.png"
                style="width: 1.2rem; height: 1.2rem; position: absolute; right: 1rem"
                v-show="item.current_shift == 3"
              />
            </div>
          </div>

          <div class="class" @click="toDetail(item.machine_ip, item.machine_id)">
            <div
              class="class_con"
              :class="item.current_shift == 4 ? 'classBlack' : 'class_con'"
            >
              <img :src="item.current_shift == 4 ? url7 : url8" /><span
                >班产量：{{ item.class_D_production }}</span
              ><span>月产量：{{ item.class_D_production_month }}</span>
              <img
                src="../../static/img/class.png"
                style="width: 1.2rem; height: 1.2rem; position: absolute; right: 1rem"
                v-show="item.current_shift == 4"
              />
            </div>
          </div>

          <div class="line" @click="toDetail(item.machine_ip, item.machine_id)"></div>
          <div class="machine" @click="toDetail(item.machine_ip, item.machine_id)">
            <div class="machine_left">
              <img src="../../static/img/machineNum.png" />设备编号：{{ item.machine_id }}
            </div>
            <div class="machine_right">记录：{{ item.record_time }}</div>
          </div>
          <div
            class="machine"
            style="bottom: 2vh"
            @click="toDetail(item.machine_ip, item.machine_id)"
          >
            <div class="machine_left">
              <img src="../../static/img/machineType.png" />设备类型：{{
                item.machine_type
              }}
            </div>
            <div class="machine_right">更新：{{ item.update_time }}</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "rxj",
  data() {
    return {
      company_id: this.$route.params.company_id,
      dataList: [],

      url1: require("@/images/hasA.png"),
      url2: require("@/images/hasnoA.png"),
      url3: require("@/images/hasB.png"),
      url4: require("@/images/hasnoB.png"),
      url5: require("@/images/hasC.png"),
      url6: require("@/images/hasnoC.png"),
      url7: require("@/images/hasD.png"),
      url8: require("@/images/hasnoD.png"),
    };
  },
  methods: {
    getData() {
      console.log(12);
      let url = "http://106.12.219.66:8227/report/getSimpleReport";
      let headers = {
        "Content-Type": "application/json",
        companyID: this.company_id,
      };
      let method = "post";
      let data = {
        tableName: "winding",
        pageNum: 1,
        pageSize: 1000,
      };
      let that = this;
      axios({
        url: url,
        method: method,
        data: data,
        headers: headers,
      }).then((response) => {
        console.log(response);
        let arr = [];
        for (let i = 0; i < response.data.data.length; i++) {
          arr.push(response.data.data[i]);
        }
        that.dataList = arr;
      });
    },
    toDetail(machine_ip, machine_id) {
      sessionStorage.setItem("jsonIp", machine_ip); //防止详情页刷新之后数据丢失
      sessionStorage.setItem("jsonCom", this.company_id);
      sessionStorage.setItem("jsonId", machine_id);
      this.$router.push({
        //跳转并传参数
        path: "/rxjDetail",
        name: "rxjDetail",
        params: {
          machine_ip: machine_ip,
          company_id: this.company_id,
          machine_id: machine_id,
        },
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.headTitle {
  width: 100%;
  height: 2.8rem;
  background: white;
  position: fixed;
  left: 0;
  line-height: 3rem;
  top: 0;
}

.all-page /deep/ ._v-container {
  position: absolute;
  top: 10%;
}

.all-page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
}

.scr {
  width: 100%;
  height: 100%;
  margin-top: 2.8rem;
  overflow: auto;
}

.card_one {
  width: 90%;
  height: 47vh;
  display: flex;
  flex-direction: column;

  position: relative;
  margin: 0 auto;
  margin-top: 10px;
}

.all-page /deep/ .el-card__body {
  padding: 10px;
}

.ip {
  width: 100%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ipNum {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 700;
}

.ds {
  width: 4rem;
  height: 70%;
  background: rgb(61, 65, 69);
  color: white;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.ipNum img {
  width: 1.4rem;
  height: 1.2rem;
  margin-right: 3px;
}

.class {
  width: 100%;
  height: 6.5vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.classBlack {
  width: 100%;
  height: 80%;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  position: relative;

  color: white;

  border-radius: 4px;
  background: rgb(61, 65, 69);
}

.class_con {
  width: 100%;
  height: 80%;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  position: relative;
}

.class_con span {
  margin-left: 1rem;
  margin-right: 0.7rem;
}

.class_con img {
  width: 2.2rem;
  margin-left: 1rem;
}

.line {
  width: 100%;
  height: 0.5px;
  position: absolute;
  left: 0;
  bottom: 10.5vh;
  background: rgba(0, 0, 0, 0.1);
}

.machine {
  width: 93%;
  height: 1.2rem;
  position: absolute;
  bottom: 6vh;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  justify-content: space-between;
}

.machine_left {
  width: 40%;
  height: 1rem;
  display: flex;

  align-items: center;
}

.machine img {
  width: 1rem;
  height: 1rem;
  margin-right: 3px;
}
</style>
