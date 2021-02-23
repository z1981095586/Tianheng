<template>
  <div class="content">
    <!-- <span style="font-size: 1rem; font-weight: bold; margin-bottom: -1rem"
      >{{ machineId }}号绕线机</span
    >
    <i
      class="el-icon-arrow-left"
      style="position: fixed; left: 17px; top: 13px"
      @click="back"
    ></i> -->

    <div class="all-page">
      <div>
        <h2 v-show="noMachine" style="color: #d8d8d8">暂无数据</h2>
      </div>
      <div class="headTitle">
        <i
          class="el-icon-arrow-left"
          style="position: fixed; left: 17px; top: 1rem"
          @click="back"
        ></i>
        <span style="font-size: 1rem; font-weight: bold; margin-bottom: -1rem"
          >{{ machineId }}号绕线机</span
        >
      </div>
      <el-collapse
        accordion
        v-for="(item, index) in dataList"
        :key="index"
        style="margin-top: 8px"
      >
        <el-collapse-item name="1">
          <template slot="title" style="background: black; width: 100%">
            <h1 class="header">
              <div style="width: 89vw">锭编号：{{ item.spindle_id }}</div>
            </h1>
          </template>
          <el-row :gutter="5">
            <el-col :span="8" :xs="24">
              <div class="machineInformation">
                <div class="title"><strong>基础信息</strong></div>
                <div class="table">
                  <el-row>
                    <el-col :span="12">
                      <div class="th">工作状态码</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">
                        <span
                          style="height: 1.2rem; width: 1.2rem; vertical-align: middle"
                          >{{ item.work_status_code }}</span
                        >
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <div class="th">设备IP</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">{{ item.machine_ip }}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <div class="th">设备类型</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">{{ item.machine_type }}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <div class="th">车间编号</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">{{ item.workshop }}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <div class="th">版本号</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">{{ item.version }}</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="8" :xs="24">
              <div class="machineInformation">
                <div class="title"><strong>sc信息</strong></div>
                <div class="table">
                  <el-row>
                    <el-col :span="12">
                      <div class="th">sc当前速度</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">{{ item.current_speed }}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <div class="th">sc当前线长</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">{{ item.current_wire_length }}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <div class="th">sc纱筒直径</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">{{ item.spool_diameter }}</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="8" :xs="24">
              <div class="machineInformation">
                <div class="title"><strong>产量|工艺</strong></div>
                <div class="table">
                  <el-row>
                    <el-col :span="12">
                      <div class="th">板编号</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">{{ item.board_id }}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <div class="th">锭班产量</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">{{ item.spindle_class_production }}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <div class="th">锭总产量</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">{{ item.spindle_total_production }}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <div class="th">锭工艺</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="td">{{ item.spindle_technology }}</div>
                    </el-col>
                  </el-row>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      font-size: 0.8rem;
                    "
                  >
                    <span>记录:{{ item.record_time }}</span>
                    <span>更新:{{ item.update_time }}</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "rxjDetail",
  data() {
    return {
      company_id: this.$route.params.company_id, //公司编号
      machineIp: this.$route.params.machine_ip,
      machineId: this.$route.params.machine_id, //机器编号
      dataList: [],
      noMachine: false,
    };
  },
  methods: {
    back() {
      this.$router.push({
        //跳转并传参数
        path: "/rxj",
        name: "rxj",
        params: {
          company_id: this.company_id,
        },
      });
    },
    getData() {
      let url = "http://106.12.219.66:8227/report/getSimpleReport";
      let headers = {
        "Content-Type": "application/json",
        companyID: this.company_id,
      };
      let method = "post";
      let data = {
        tableName: "winding_spindle",
        pageNum: 1,
        pageSize: 1000,
        query: {
          machine_ip: this.machineIp,
        },
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
        if (arr.length == 0) {
          that.noMachine = true;
        }
        that.dataList = arr;
        console.log(arr);
      });
    },
  },
  mounted() {
    this.machineIp = sessionStorage.getItem("jsonIp");
    this.machineId = sessionStorage.getItem("jsonId");
    this.company_id = sessionStorage.getItem("jsonCom");
    this.getData();
  },
};
</script>

<style scoped>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
}

.content {
  margin: auto 0.5rem;
}

.headTitle {
  width: 100%;
  height: 2.8rem;
  background: white;
  position: fixed;
  left: 0;
  line-height: 3rem;
  top: 0;
}

.header {
  color: #dce3e7;
  font-weight: bolder;
  white-space: nowrap;
  font-style: normal;
  font-size: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding-left: 1rem;
  border-radius: 5px;
}

.machineInformation {
  margin-bottom: 1rem;
}

.title {
  color: #3a87ad;
  background-color: #d9edf7;
  border-radius: 4px;
  font-size: 0.8rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: left;
  padding-left: 1rem;
  border: 1px solid #d9edf7;
}

.table {
  margin-top: 1rem;
}

.th {
  background-color: #3b4145;
  color: #dce3e7;
  padding: 0.5rem;
  font-size: 0.8rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.71);
  padding-bottom: 1.6rem;
  height: 1.4rem;
}

.td {
  background-color: #c81716;
  color: #dce3e7;
  padding: 0.5rem;
  font-size: 0.8rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.71);
  padding-bottom: 1.6rem;
  height: 1.4rem;
}

.all-page {
  width: 100%;
  margin-top: 2.8rem;
  height: 100vh;
  overflow: scroll;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
}

/*折叠框头部样式*/
.all-page /deep/ .el-collapse-item__header {
  line-height: 1.8rem !important;
  height: 2.5rem !important;
  border: none;
  background-color: #3b4145;
  border-radius: 5px;
  -webkit-box-shadow: 1px 1px 1px rgba(87, 87, 87, 0.4);
  -moz-box-shadow: 1px 1px 1px rgba(87, 87, 87, 0.4);
  box-shadow: 0 0 10px rgba(87, 87, 87, 0.4);
}

/*折叠框箭头样式*/
.all-page /deep/ .el-collapse-item__arrow {
  color: #3b4145;
  background-color: white;
  font-style: inherit;
  border-radius: 3px;
  font-size: 1rem;
}

/*折叠框内容样式*/
.all-page /deep/ .el-collapse-item__wrap {
  border: 0;
  padding: 0.8rem;
  -webkit-box-shadow: 1px 1px 1px rgba(87, 87, 87, 0.4);
  -moz-box-shadow: 1px 1px 1px rgba(87, 87, 87, 0.4);
  box-shadow: 0 0 10px rgba(87, 87, 87, 0.4);
  height: auto;
}

/*折叠框整体样式*/
.all-page /deep/ .el-collapse-item__content {
  height: auto;
  padding-bottom: 0 !important;
}
</style>
