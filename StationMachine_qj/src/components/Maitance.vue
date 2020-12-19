<template>
  <div class="operationPane">
    <!-- 我的机台部分操作栏组件-->
    <!-- 首页-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: space-around; align-items: center"
      v-show="IndexShow"
    >
      <div class="main_btn" @click="toMaintance(0)">每日保养</div>
      <div class="main_btn" @click="toMaintance(1)">每周保养</div>
      <div class="main_btn" @click="toMaintance(2)">每月保养</div>
      <div class="main_btn" @click="toMaintance(3)">每年保养</div>
      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div>
    <!-- 首页-->
    <!-- 我的机台选机台-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: center; align-items: flex-start"
      v-show="MachineShow"
    >
      <div class="operationPane_con_machineList">
        <el-checkbox-group
          @change="checkedMachine"
          v-model="checkMachine"
          style="width: 100%; height: 100%"
        >
          <el-checkbox-button
            size="medium"
            v-for="(item, index) in machineList"
            style="magin: 1rem; font-size: 2rem"
            :label="item.machineId"
            :key="index"
            >{{ item.machineId }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureMachine()">
            确认
          </div>
          <div class="operationPane_con_machineList_btn_leftBtn" @click="cancel()">
            取消
          </div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination
            background
            small
            :pager-count="4"
            @current-change="CurrentChange"
            layout="prev, pager, next"
            :total="total_num"
          >
          </el-pagination>
        </div>
      </div>
      <!-- <div class="leftLabel"><span>选机台</span></div> -->
      <div class="search" style="left: 4rem; width: 95%; top: 18px">
        <span style="font-size: 1.7rem; color: red" v-show="isWaitMaintance == 0"
          >待保养机台:{{ total_num }}</span
        >
        <span style="font-size: 1.7rem; color: red" v-show="isWaitMaintance == 1"
          >保养逾期机台:{{ total_num }}</span
        >
        <span style="font-size: 1.7rem; color: red" v-show="isWaitMaintance == 2"
          >待维修机台:{{ total_num }}</span
        >
        <!--<input placeholder="输入机台号" v-model="search_machine" />
        <div class="checked_machine_btn_one" style="height: 3rem" @click="search()">
          确认
        </div> -->
        <span style="color: red; margin-left: 1rem"
          >选中机台：{{ this.checkedMachineNum }}</span
        >
      </div>
      <img src="../../static/img/close.png" @click="cancel()" />
    </div>
    <!-- 我的机台选机台-->
    <!-- 保养界面-->
    <div
      class="operationPane_con"
      style="
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
      "
      v-show="MaintanceShow"
    >
      <div class="Maintance_machine">保养机台:{{ String(checkMachine) }}</div>
      <div class="Maintance_object">
        <span style="font-size: 1.5rem; float: left; margin-right: 1rem">项次:</span>
        <div
          class="Maintance_object_con"
          style="width: auto"
          v-for="(item, index) in objList"
          :key="index"
        >
          <span style="margin-right: 1rem; width: 1.2rem">{{ index + 1 }}.</span>
          <el-checkbox
            style="margin-right: 2rem"
            v-model="item.isChecked"
            :label="item.name"
            >{{ item.name }}</el-checkbox
          >
        </div>
      </div>
      <div class="Maintance_materials" style="justify-content: flex-start">
        <div
          class="Maintance_materials_con"
          style="margin-left: 1rem"
          v-for="(item, index) in checkedMaterialsList"
          v-show="index <= 5"
          :key="index"
        >
          <span>{{ item.product_name }}</span>
          <span>{{ item.num }}{{ item.unit_name }}</span>
        </div>
      </div>
      <div class="Maintance_btn">
        <div class="btns" style="margin: 0" @click="sureMaitance()">确认保养</div>
        <div class="btns" @click="addMaterial">新增零配件</div>
        <div
          class="btns"
          style="background: #808080; color: white"
          @click="
            MaintanceShow = false;
            IndexShow = true;
          "
        >
          取消
        </div>
        <div
          class="btns"
          style="background: #808080; color: white; margin-left: 5rem"
          @click="
            MaintanceShow = false;
            peijianShow = true;
          "
        >
          零配件详情
        </div>
        <div
          class="btns"
          style="background: #808080; color: white; margin-left: 1rem"
          @click="
            MaintanceShow = false;
            xiangciShow = true;
          "
        >
          项次详情
        </div>
      </div>
      <img
        src="../../static/img/close.png"
        @click="
          MaintanceShow = false;
          IndexShow = true;
        "
      />
    </div>
    <!-- 保养界面-->
    <!--选零配件种类-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: center; align-items: flex-start"
      v-show="MaterialsTypeShow"
    >
      <div class="operationPane_con_machineList">
        <el-checkbox-group
          :max="1"
          @change="checkedType"
          v-model="checkType"
          style="width: 100%; height: 100%"
        >
          <el-checkbox-button
            size="medium"
            v-for="(item, index) in typeList"
            style="magin: 1rem; font-size: 2rem"
            :label="item.label"
            :key="index"
            >{{ item.label }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div class="operationPane_con_machineList_btn_leftBtn" @click="sureType">
            确认
          </div>
          <div class="operationPane_con_machineList_btn_leftBtn" @click="cancel2">
            取消
          </div>
        </div>
        <div class="operationPane_con_machineList_btn_right">
          <el-pagination
            background
            small
            :pager-count="4"
            @current-change="CurrentTypeChange"
            layout="prev, pager, next"
            :total="TypeTotal_num"
          >
          </el-pagination>
        </div>
      </div>
      <!-- <div class="leftLabel"><span>选机台</span></div> -->
      <div class="search" style="left: 3rem; width: 95%; top: 18px">
        <!-- <span style="font-size: 1.7rem">搜索：</span
        ><input placeholder="输入机台号" v-model="search_machine" />
        <div class="checked_machine_btn_one" style="height: 3rem" @click="search()">
          确认
        </div> -->
        <span style="color: red">保养机台：{{ this.checkedMachineNum }}</span>
      </div>
      <img src="../../static/img/close.png" @click="cancel2" />
    </div>
    <!-- 选零配件种类-->
    <!-- 配件列表-->
    <div
      class="operationPane_con"
      style="display: flex; justify-content: center; align-items: flex-start"
      v-show="MaterialsShow"
    >
      <div style="width: 93%; height: 64%; margin-top: 9%">
        <div
          :class="item.ischecked ? 'material_one_checked' : 'material_one'"
          @click="checkMaterial(item.id)"
          v-for="(item, index) in materialsList"
          :key="index"
        >
          <span>{{ item.product_name }}</span
          ><span> {{ item.num }}{{ item.unit_name }}</span>
        </div>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="btns" style="margin: 0" @click="sureMaterial">确认</div>
        <div class="btns" @click="use()">使用</div>
        <div class="btns" style="background: #808080; color: white" @click="cancel3">
          取消
        </div>
        <div
          class="btns"
          style="margin-left: 16rem"
          @click="
            drawer = true;
            drawerFlag = true;
          "
        >
          查看零配件
        </div>
      </div>

      <!-- <div class="leftLabel"><span>选机台</span></div> -->
      <div class="search" style="left: 3rem; width: 95%; top: 18px">
        <span style="color: red; margin-right: 1rem"
          >保养机台：{{ this.checkedMachineNum }}</span
        >
        <span style="font-size: 1.7rem">搜索：</span
        ><input placeholder="" v-model="search_material" />
        <div
          class="checked_machine_btn_one"
          style="height: 3rem"
          @click="getInventory(search_material)"
        >
          确认
        </div>
      </div>
      <img src="../../static/img/close.png" @click="cancel3" />
    </div>
    <!-- 配件列表-->
    <!-- 零配件详情-->
    <div
      class="operationPane_con"
      style="
        display: flex;

        align-items: center;
        flex-direction: column;
      "
      v-show="peijianShow"
    >
      <span style="font-size: 1.5rem; margin: 1rem">零配件详情</span>
      <div style="width: 93%; height: 78%">
        <div
          class="material_ones"
          v-for="(item, index) in checkedMaterialsList"
          :key="index"
          style="background: grey; color: white"
        >
          <span>{{ item.product_name }}</span>
          <span>{{ item.num }}{{ item.unit_name }}</span>
        </div>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div
            class="operationPane_con_machineList_btn_leftBtn"
            @click="
              peijianShow = false;
              MaintanceShow = true;
            "
          >
            返回
          </div>
        </div>
      </div>

      <img
        src="../../static/img/close.png"
        @click="
          peijianShow = false;
          MaintanceShow = true;
        "
      />
    </div>
    <!-- 零配件详情-->
    <!--项次详情-->
    <div
      class="operationPane_con"
      style="
        display: flex;

        align-items: center;
        flex-direction: column;
      "
      v-show="xiangciShow"
    >
      <span style="font-size: 1.5rem; margin: 1rem">项次详情</span>
      <div style="width: 93%; height: 78%">
        <div class="material_ones" v-for="(item, index) in objList" :key="index">
          <el-checkbox v-model="item.isChecked" :label="item.name">{{
            item.name
          }}</el-checkbox>
        </div>
      </div>
      <div class="operationPane_con_machineList_btn">
        <div class="operationPane_con_machineList_btn_left">
          <div
            class="operationPane_con_machineList_btn_leftBtn"
            @click="
              xiangciShow = false;
              MaintanceShow = true;
            "
          >
            返回
          </div>
        </div>
      </div>

      <img src="../../static/img/close.png" @click="closeCurrentPage()" />
    </div>
    <!-- 项次详情-->
    <!-- 上轴部分操作栏组件-->
    <el-dialog title="修改数量" width="400" :visible.sync="materialNumDialog">
      <div style="display: flex; flex-direction: column; align-items: center">
        <span style="font-size: 1.5rem">配件名称</span>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 67%;
            margin-top: 1rem;
          "
        >
          <button
            style="width: 5.5rem; height: 5.5rem; background: #a3d897; border: none"
            @click="subNum"
          >
            <i class="el-icon-minus" style="font-size: 1.5rem"></i>
          </button>
          <input
            style="
              width: 7.5rem;
              height: 5rem;
              font-size: 3.5rem;
              border: 1px solid black;
            "
            v-model="materialNum"
          />
          <button
            @click="addNum"
            style="width: 5.5rem; height: 5.5rem; background: #a3d897; border: none"
          >
            <i class="el-icon-plus" style="font-size: 1.5rem"></i>
          </button>
        </div>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 94%;
            height: 6rem;
            margin-top: 3rem;
          "
        >
          <div class="btns" @click="choosedMaterial">选好了</div>
          <div
            class="btns"
            style="background: #808080; color: white"
            @click="materialNumDialog = false"
          >
            取消
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="警告" width="400" :visible.sync="noSaveDialog">
      <div style="display: flex; flex-direction: column; align-items: center">
        <span style="font-size: 1.5rem">本页面数据不会保存</span>

        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 94%;
            height: 6rem;
            margin-top: 3rem;
          "
        >
          <div
            class="btns"
            @click="
              noSaveDialog = false;
              MaterialsShow = false;
              MaterialsTypeShow = true;
              materialsList = [];
            "
          >
            确定
          </div>
          <div
            class="btns"
            style="background: #808080; color: white"
            @click="noSaveDialog = false"
          >
            取消
          </div>
        </div>
      </div>
    </el-dialog>
    <el-drawer
      title="查看零配件"
      :with-header="false"
      :visible.sync="drawer"
      direction="rtl"
    >
      <div
        style="
          width: 20rem;
          display: flex;
          flex-direction: column;
          position: relative;
          height: 100%;
        "
      >
        <div style="width: 20rem">
          <div
            class="select_material"
            v-for="(item, index) in materialsList2"
            :key="index"
          >
            <span>{{ item.product_name }}</span>
          </div>
        </div>

        <div style="width: 20rem; position: absolute; bottom: 0">
          <img
            src="../../static/img/page-left.png"
            style="width: 7rem; margin: 1rem; height: 7rem"
            @click="lastPage()"
          />
          <img
            src="../../static/img/page-right.png"
            style="width: 7rem; margin: 1rem; height: 7rem"
            @click="nextPage()"
          />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
var host = "http://120.55.124.53:12140";
export default {
  name: "Maitance",
  props: ["staff_name", "staff_id"],
  data() {
    return {
      IndexShow: true,
      MachineShow: false, //选择机台显示隐藏
      MaintanceShow: false, //
      MaterialsTypeShow: false, //选零配件种类
      MaterialsShow: false, //物料界面
      repairShow: false, //维修界面
      xiangciShow: false,
      peijianShow: false,
      drawer: false, //查看零配件抽屉
      drawerFlag: null, //查看零配件抽屉是否需要根据配件种类参数获取
      noSaveDialog: false,
      checkedCities: ["上海", "北京"],
      cities: ["上海", "北京", "广州", "深圳"],
      checkAll: false,
      isIndeterminate: true,

      search_machine: "",
      checkMachine: [], //选中机台列表
      checkedMachineNum: "",
      machineList: [],
      checkedMaterialsList: [],
      machineListCon: [],
      total_num: 100,
      page_num: 1,
      page_size: 9,

      typeList: [],
      checkType: [], //选中机台列表
      checkedTypeName: "", //选中种类名称
      checkedTypeId: "", //选中种类id
      materialsList: [],
      materialsList2: [], //零配件列表
      total_num2: 100,
      page_num2: 1,
      page_size2: 14,
      search_material: "", //输入框搜索零配件名称
      materialId: null,
      materialNum: null,
      materialNumDialog: false,

      company_id: 10000015,

      isWaitMaintance: null, //是否待保养，0带保养，1保养预期，2待维修
      reasonlist: [
        {
          label: "经停",
          value: "经停",
        },
        {
          label: "纬停",
          value: "纬停",
        },
        {
          label: "疵点",
          value: "疵点",
        },
        {
          label: "设备",
          value: "设备",
        },
      ],
      checkedRepair: [],
      checkedRepairName: "",
      repairReason: "",
      objList: [],
      TypeTotal_num: null,
      typeListCon: [],
      typePageSize: 8,
      typePageNum: 1,
      mac_type_id: "030100",
      workshop_id: "",
      maintain_type_id: "",
    };
  },
  methods: {
    sureMaitance() {
      //确认保养
      console.log(this.checkMachine);
      console.log(this.objList);
      console.log(this.checkedMaterialsList);
      console.log(this.workshop_id);
      let maintainList = [];
      let maintainMaterial = [];
      let json = {};
      let json2 = {};
      this.objList.forEach((element) => {
        if (element.isChecked == true) {
          json.tick = 1;
        } else {
          json.tick = 0;
        }

        json.maintain_item_id = element.id;

        maintainList.push(json);
        json = {};
      });
      console.log(maintainList);
      this.checkedMaterialsList.forEach((element) => {
        json2.product_id = element.product_id;
        json2.product_name = element.product_name;
        json2.specification = element.specification;
        json2.quantity = element.num;
        maintainMaterial.push(json2);
        json2 = {};
      });
      console.log(maintainMaterial);
      let url = "http://120.55.124.53:8206/api/maintain/submitMaintainBatch";
      let that = this;
      that.machineList = [];
      axios
        .post(
          url,
          {
            maintainMainRecord: {
              operator: that.staff_name,
              machine_id_list: that.checkMachine,

              mac_type_id: that.mac_type_id,
              maintain_type_id: that.maintain_type_id,
              workshop_id: that.workshop_id,
            },
            selectInfo: {
              company_id: that.company_id,
            },
            maintainList: maintainList,
            maintainMaterial: maintainMaterial,
          },
          {
            // headers: {
            //   companyId: that.company_id,
            // },
          }
        )
        .then(function (res) {
          console.log(res);
          if (res.data.message == "成功") {
            that.$message({
              message: "保养成功！",
              type: "success",
            });
          } else {
            that.$message.error("保养失败！");
          }
          that.MaintanceShow = false;
          that.IndexShow = true;
        });
    },
    CurrentTypeChange(e) {
      //零配件类型分页
      this.typePageNum = e;

      this.typeList = this.pagination(
        this.typePageNum,
        this.typePageSize,
        this.typeListCon
      );
    },
    pagination(pageNo, pageSize, array) {
      var offset = (pageNo - 1) * pageSize;
      return offset + pageSize >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + pageSize);
    },
    getMachineList() {
      //获取机台列表
      let url = "http://120.55.124.53:8206/api/maintain/getMyMachine";
      let that = this;
      that.machineList = [];
      that.machineListCon = [];
      axios
        .post(
          url,
          {
            selectInfo: {
              company_id: that.company_id,
            },
            staff_id: that.staff_id,
          },
          {
            // headers: {
            //   companyId: that.company_id,
            // },
          }
        )
        .then(function (res) {
          console.log(res);
          if (res.data.result.length == 0) {
            that.total_num = 0;
            return;
          } else {
            that.total_num = res.data.result.length; //设置数据总条数

            for (let i = 0; i < res.data.result.length; i++) {
              res.data.result[i].machineId = res.data.result[i].machine_id;
              that.machineListCon.push(res.data.result[i]);
            }
            that.workshop_id = that.machineListCon[0].workshop_id;
            that.machineList = that.pagination(1, that.page_size, that.machineListCon);
            console.log(that.machineList);
          }
        });
    },
    getRootCategories() {
      //获取物料分类
      //获取分类根目录
      let url = "http://120.55.124.53:8206/api/product/getFullCategories";
      let that = this;
      that.typeListCon = [];
      axios
        .post(
          url,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              companyID: that.company_id,
            },
          }
        )
        .then(function (res) {
          console.log(res);

          for (let i = 0; i < res.data.data.children.length; i++) {
            if (res.data.data.children[i].categories_id == 8) {
              that.typeListCon = res.data.data.children[i].children;
            }
          }
          that.TypeTotal_num = that.typeListCon.length;
          that.typeList = that.pagination(1, that.typePageSize, that.typeListCon);
          console.log(that.typeListCon);
        });
    },
    addMaterial() {
      //显示物料分类选择界面
      if (this.isWaitMaintance == 2) {
        this.repairShow = false;
        this.MaterialsTypeShow = true;
      } else {
        this.MaintanceShow = false;
        this.MaterialsTypeShow = true;
      }
    },
    toMaintance(isWaitMaintance) {
      //显示保养界面
      this.IndexShow = false;
      this.MachineShow = true;
      this.isWaitMaintance = isWaitMaintance;
      console.log(this.isWaitMaintance);
    },

    choosedMaterial() {
      //选择物料
      console.log(this.materialsList);
      this.materialNumDialog = false;
    },

    use() {
      //显示加减数量的窗口
      console.log(this.materialId);
      if (this.materialId != null) {
        this.materialNumDialog = true;
      } else {
        this.$message({
          message: "请先选一个配件！",
          type: "warning",
        });
      }
    },
    addNum() {
      //加物料数量
      this.materialNum = this.materialNum + 1;
      for (let i = 0; i < this.materialsList.length; i++) {
        if (this.materialsList[i].id == this.materialId) {
          this.materialsList[i].num = this.materialNum;
        }
      }
    },
    subNum() {
      //减物料数量
      if (this.materialNum > 1) {
        this.materialNum = this.materialNum - 1;
      }
      for (let i = 0; i < this.materialsList.length; i++) {
        if (this.materialsList[i].id == this.materialId) {
          this.materialsList[i].num = this.materialNum;
        }
      }
    },
    checkMaterial(id) {
      //选中物料，切换状态
      for (let i = 0; i < this.materialsList.length; i++) {
        if (this.materialsList[i].id == id) {
          if (this.materialsList[i].ischecked == false) {
            this.materialId = id;
            this.materialNum = this.materialsList[i].num;
          } else {
            this.materialId = null;
            this.materialNum = null;
          }
          this.materialsList[i].ischecked = !this.materialsList[i].ischecked;
        }
      }
      console.log(this.materialId);
    },
    handleCheckAllChange(val) {
      //全选保养项次
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    closeCurrentPage() {},
    search() {
      //搜索机台
      if (this.search_machine != "") {
        let url = "http://106.12.219.66:8763/com-machine-info/selectAMachineRelation";
        let that = this;
        axios
          .post(
            url,
            {
              machineId: this.search_machine,
            },
            {
              //开始查询
              headers: {
                "Content-Type": "application/json",
                companyID: this.company_id,
              },
            }
          )
          .then(function (res) {
            console.log(res);
            that.machineList = [];
            if (res.data.data[0]) {
              that.machineList.push(res.data.data[0]);
            }
          });
      } else {
        this.page_num = 1;
        this.getMachineList();
      }
    },
    CurrentChange(e) {
      //机台分页
      //console.log(e);
      this.page_num = e;
      this.machineList = this.pagination(
        this.page_num,
        this.page_size,
        this.machineListCon
      );
    },

    checkedMachine(e) {
      //选择机台事件
      this.checkedMachineNum = e[0];
    },
    checkRepair(e) {
      //选择机台事件
      console.log(e);
      if (e[0]) {
        this.checkedRepairName = e[0];
      } else {
        this.checkedRepairName = "";
      }
    },
    checkedType(e) {
      //选择物料种类

      console.log(e);
      if (e.length > 0) {
        this.checkedTypeName = e[0];
        this.typeList.forEach((element) => {
          if (element.label == e[0]) {
            this.checkedTypeId = element.categories_id;
          }
        });
      } else {
        this.checkedTypeName = "";
        this.checkedTypeId = "";
      }
      console.log(this.checkedTypeId);
    },
    sureMachine() {
      //确定机台
      console.log(this.checkedMachineNum);
      if (this.checkedMachineNum != "") {
        if (this.isWaitMaintance == 2) {
          //待维修界面显示

          this.MachineShow = false;
          this.repairShow = true;
        } else {
          this.MachineShow = false;
          this.MaintanceShow = true;
        }
      } else {
        this.$message({
          message: "先选一台机器!",
          type: "warning",
        });
      }
    },
    cancel() {
      this.MachineShow = false;
      this.IndexShow = true;
    },
    sureType() {
      //确定种类
      console.log(this.checkedTypeName);
      if (this.checkedTypeName != "") {
        this.MaterialsTypeShow = false;
        this.MaterialsShow = true;
      } else {
        this.$message({
          message: "先选一个种类!",
          type: "warning",
        });
      }
    },
    cancel2() {
      if (this.isWaitMaintance == 2) {
        this.MaterialsTypeShow = false;
        this.repairShow = true;
      } else {
        this.MaterialsTypeShow = false;
        this.MaintanceShow = true;
      }
    },
    sureMaterial() {
      //确定物料
      console.log(this.materialsList);
      this.checkedMaterialsList = [];
      this.materialsList.forEach((element) => {
        if (element.ischecked == true) {
          this.checkedMaterialsList.push(element);
        }
      });
      this.materialsList2 = this.pagination(
        1,
        this.page_size2,
        this.checkedMaterialsList
      );
      this.total_num2 = this.materialsList2.length;
      let flag; //是否有选中的

      for (let i = 0; i < this.materialsList.length; i++) {
        if (this.materialsList[i].ischecked == true && this.materialsList[i].num > 0) {
          flag = true;
          break;
        } else {
          flag = false;
        }
      }
      if (flag == true) {
        if (this.isWaitMaintance == 2) {
          this.MaterialsShow = false;
          this.repairShow = true;
        } else {
          this.MaterialsShow = false;
          this.MaintanceShow = true;
        }
      } else {
        this.$message({
          message: "先选一个配件添加数量!",
          type: "warning",
        });
      }
    },
    getInventory(searchinfo) {
      //获取物料
      //获取保养物料数据
      //  this.$refs.myscroller.finishPullToRefresh();
      let that = this;
      that.materialsList = [];
      let url = "http://120.55.124.53:8206/api/product/getProductListByCategories"; //获取库存数量
      var datas; //存放json数据

      if (searchinfo) {
        let datas = {
          page: 1,
          pageNum: 20,

          categories_id: 8,
          product_name: searchinfo,
        };
      } else {
        datas = {
          page: 1,
          pageNum: 20,

          categories_id: this.checkedTypeId,
        };
      }

      axios
        .post(url, datas, {
          //开始查询
          headers: {
            "Content-Type": "application/json",
            companyID: that.company_id,
          },
        })
        .then(function (res) {
          console.log(res);

          // that.totalDataNum = res.data.totalDataNum; //设置数据总条数

          for (let i = 0; i < res.data.data.productModel.length; i++) {
            //push消耗物料数据
            // res.data.data.productModel[i].stockQuantitydata = res.data.data.product[i].stockQuantity
            res.data.data.productModel[i].isinputShow = false;
            res.data.data.productModel[i].stockQuantityShow = 0;
            res.data.data.productModel[i].id = res.data.data.productModel[i].product_id;
            res.data.data.productModel[i].num = 0;
            res.data.data.productModel[i].ischecked = false;
            that.materialsList.push(res.data.data.productModel[i]);
          }
        });
    },
    lastPage() {
      //物料上一页
      if (this.page_num2 > 1) {
        this.page_num2 = this.page_num2 - 1;
        this.getInventory2();
      } else {
        this.$message({
          message: "没有上一页了",
          type: "warning",
        });
      }
    },
    nextPage() {
      //物料下一页
      if (this.total_num2 <= this.page_num2 * this.page_size2) {
        this.$message({
          message: "没有下一页了",
          type: "warning",
        });
      } else {
        this.page_num2 = this.page_num2 + 1;
        this.getInventory2();
      }
    },
    getInventory2() {
      //获取物料列表分页版
      let that = this;
      that.materialsList2 = [];
      let url = "http://120.55.124.53:8206/api/product/getProductListByCategories"; //获取库存数量
      var datas; //存放json数据

      //查询当前选择的下拉选项下的数据

      if (that.drawerFlag == true) {
        datas = {
          page: that.page_num2,
          pageNum: that.page_size2,

          categories_id: this.checkedTypeId,
        };
      } else {
        datas = {
          page: that.page_num2,
          pageNum: that.page_size2,
        };
      }

      axios
        .post(url, datas, {
          //开始查询
          headers: {
            "Content-Type": "application/json",
            companyID: that.company_id,
          },
        })
        .then(function (res) {
          console.log(res);

          that.total_num2 = res.data.totalDataNum; //设置数据总条数

          for (let i = 0; i < res.data.data.productModel.length; i++) {
            //push消耗物料数据
            // res.data.data.productModel[i].stockQuantitydata = res.data.data.product[i].stockQuantity
            res.data.data.productModel[i].isinputShow = false;
            res.data.data.productModel[i].stockQuantityShow = 0;
            res.data.data.productModel[i].id = res.data.data.productModel[i].product_id;
            res.data.data.productModel[i].num = 0;
            res.data.data.productModel[i].ischecked = false;
            that.materialsList2.push(res.data.data.productModel[i]);
          }
        });
    },
    cancel3() {
      this.noSaveDialog = true;
    },
  },
  mounted() {
    for (let i = 0; i < 20; i++) {
      this.materialsList.push({
        num: 0,
        id: i,
        name: "螺杆机" + i,
        ischecked: false,
      });
    }
  },
  watch: {
    //监听页面显示执行相应的获取数据函数
    isWaitMaintance(val) {
      let maintain_type_id;
      if (val == 0) {
        maintain_type_id = 39;
      } else if (val == 1) {
        maintain_type_id = 40;
      } else if (val == 2) {
        maintain_type_id = 41;
      } else if (val == 3) {
        maintain_type_id = 42;
      }
      this.maintain_type_id = maintain_type_id;
      let url = "http://120.55.124.53:8206/api/maintain/getMaintain";
      let that = this;
      that.objList = [];
      axios
        .post(
          url,
          {
            mac_type_id: that.mac_type_id,
            maintain_type_id: maintain_type_id,
          },
          {
            headers: {
              companyID: that.company_id,
            },
          }
        )
        .then(function (res) {
          console.log(res);
          for (let i = 0; i < res.data.data[0].maintainItemList.length; i++) {
            if (res.data.data[0].maintainItemList[i].confirm == 1) {
              res.data.data[0].maintainItemList[i].isChecked = true;
              that.objList.push(res.data.data[0].maintainItemList[i]);
            }
          }
        });
    },
    MaterialsTypeShow(val) {
      if (val == true) {
        this.getRootCategories();
      }
    },
    MaterialsShow(val) {
      if (val == true) {
        this.getInventory();
      }
    },

    drawer(val) {
      //查看零配件
      if (val == true) {
        this.page_num2 = 1;
        this.getInventory2();
      }
    },

    MachineShow(val) {
      if (val == true) {
        this.page_num = 1;
        this.getMachineList();
      }
    },
  },
};
</script>

<style scoped>
.operationPane_con_machineList /deep/ .el-checkbox-button__inner {
  font-size: 2rem;
  padding: 20px 27px;
  margin: 1rem 0.5rem;
}
.repair_object /deep/ .el-checkbox-button__inner {
  font-size: 2rem;
  padding: 20px 27px;
  margin: 1rem 0.5rem;
}
.el-message {
  font-size: 3rem;
}

.el-message__content {
  font-size: 3rem;
}

.main_btn {
  width: 22%;
  height: 39%;

  background: #a3d897;
  display: flex;

  align-items: center;
  justify-content: center;
  color: black;
  font-size: 3rem;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
}

.operationPane {
  width: 100%;
  height: 66%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #e2e7ed;
}

.operationPane_con {
  width: 98%;
  height: 96%;
  background: white;
  border-radius: 16px;
  position: relative;
}

.operationPane_con img {
  position: absolute;
  right: 0;
  top: -8px;
  width: 63px;
  height: 63px;
}

.search {
  position: absolute;
  left: 4rem;
  width: 95%;
  top: 18px;

  font-size: 1.7rem;

  height: 100px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.search input {
  border: 1px solid #000;
  height: 3rem;
  font-size: 1.7rem;
}

.leftLabel {
  position: absolute;
  left: 0;
  top: 0px;
  border-top-left-radius: 16px;
  font-size: 1.7rem;
  width: 200px;
  height: 70px;
  background: #d4d4d4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.operationPane_con_uppershaft {
  width: 85%;

  height: 70%;
  margin-bottom: 3%;

  display: flex;
  justify-content: space-between;
  position: relative;
}

.text {
  position: absolute;
  top: -20%;
  left: 0%;
  width: 60%;
  height: 20%;
  display: flex;
  flex-direction: column;
}

.text_con {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
}

.text_con span {
  margin-left: 15px;
  margin-right: 15px;
  font-size: 1.5rem;
}

.shift {
  width: 28%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
}

.shift_con {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 15px;
}

.shift_con span {
  font-size: 2rem;
}

.shift_con select {
  font-size: 2rem;
  width: 50%;
  height: 100%;
  border: 1px solid black;
}

.staffCheck {
  font-size: 2rem;
  width: 50%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.staffCheck2 {
  font-size: 2rem;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
}

.shift_con input {
  font-size: 2rem;
  width: 50%;
  height: 100%;
  border: 1px solid black;
}

.operationPane_con_machineList {
  width: 93%;

  height: 60%;
  margin-top: 9%;

  display: flex;
  justify-content: space-between;
  position: relative;
}

.operationPane_con_machineList /deep/ .el-pagination--small .btn-next,
.el-pagination--small .btn-prev,
.el-pagination--small .el-pager li,
.el-pagination--small .el-pager li.btn-quicknext,
.el-pagination--small .el-pager li.btn-quickprev,
.el-pagination--small .el-pager li:last-child {
  font-size: 2rem;
  line-height: 1rem;
  height: 5rem;
}

.operationPane_con_machineList /deep/ .el-checkbox-button,
.el-checkbox-button__inner {
  float: left;
}

.operationPane_con_machineList_btn_right /deep/ .el-pagination .btn-prev .el-icon {
  font-size: 2rem;
}

.checked_machine_btn_one {
  width: 18%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  background: #a3d897;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
}

.operationPane_con_machineList_btn {
  width: 93%;

  height: 20%;
  position: absolute;
  bottom: -7px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.operationPane_con_machineList_btn_left {
  width: 40%;
  height: 60%;
  display: flex;

  align-items: center;
}

.operationPane_con_machineList_btn_leftBtn {
  width: 40%;
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #a3d897;
  margin-left: 15px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #000;
  border-color: #fff #717171 #717171 #fff;
  border-style: solid;
  border-width: 3px;
  font-size: 1.5rem;
}

.operationPane_con_machineList_btn_right /deep/ .el-pager li {
  padding: 2rem 2rem;
  font-size: 2rem;
  min-width: 35.5px;
  height: 5rem;
  line-height: 1rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
}

.operationPane_con_machineList_btn_right /deep/ .el-pagination button {
  display: inline-block;
  font-size: 3rem;
  min-width: 35.5px;
  height: 5rem;
  width: 5rem;
  line-height: 28px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.operationPane_con_machineList_btn_right /deep/ .el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
  font-size: 2rem;
}

.operationPane_con_machineList_btn_right
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background: #ffc100;
}

.operationPane_con_machineList_btn_right
  /deep/
  .el-pagination.is-background.el-pagination--small
  .btn-next,
.el-pagination.is-background.el-pagination--small .btn-prev,
.el-pagination.is-background.el-pagination--small .el-pager li {
  font-size: 2rem;
  line-height: 2rem;
  height: 4.5rem;
}

.operationPane_con_machineList_btn_right {
  width: 54%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.chooseBtn {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chooseBtn_con {
  width: 100%;
  height: 40%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.chooseBtn_con_label {
  width: 50%;
  height: 4rem;
  background: #317ccd;
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chooseBtn_con_btn {
  width: 50%;
  height: 5rem;
  background: #a3d897;
  color: black;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
}

.pane {
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.pane_title {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #808080;
  font-size: 1.5rem;
}

.pane_con {
  width: 99.8%;
  height: 55%;
  border-left: 1px solid #a0a0a0;
  border-bottom: 1px solid #a0a0a0;
  border-right: 1px solid #a0a0a0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pane_con textarea {
  width: 95%;
  height: 80%;
  color: #6c6c6c;
  border: none;
  font-size: 2rem;
}

textarea[class="textarea"]::-moz-placeholder {
  color: #6c6c6c;
  font-size: 1.5rem;
}

.pane_btn {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}

.pane_btn_one {
  width: 40%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #808080;
  color: white;
  font-size: 2.5rem;

  margin-bottom: 10px;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #717171;
  border-right: 3px solid #717171;
}

.operationPane_con_machineList /deep/ .el-checkbox-button__inner {
  font-size: 2rem;
  padding: 20px 27px;
  margin: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  /* background: #8C8C8C; */
}

.el-pagination--small .btn-next,
.el-pagination--small .btn-prev,
.el-pagination--small .el-pager li,
.el-pagination--small .el-pager li.btn-quicknext,
.el-pagination--small .el-pager li.btn-quickprev,
.el-pagination--small .el-pager li:last-child {
  font-size: 3rem;
  line-height: 2rem;
  height: 4.5rem;
}

.operationPane_con_machineList /deep/ .el-checkbox-button,
.el-checkbox-button__inner {
  float: left;
}

.operationPane_con_machineList_btn_right /deep/ .el-pagination .btn-prev .el-icon {
  font-size: 2rem;
}

.operationPane_con_machineList_btn_right /deep/ .el-pager li {
  padding: 1.5rem 1.5rem;
  font-size: 3rem;
  min-width: 38px;
  height: 4.5rem;
  line-height: 2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
}

.operationPane_con_machineList_btn_right /deep/ .el-pagination button {
  display: inline-block;
  font-size: 3rem;
  min-width: 35.5px;
  height: 4.5rem;
  width: 4.5rem;
  line-height: 28px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.operationPane_con_machineList_btn_right /deep/ .el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
  font-size: 2rem;
}

.Maintance_machine {
  width: 95%;
  height: 15%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.5rem;
  color: red;
}

.Maintance_object {
  width: 95%;
  height: 35%;
}

.Maintance_object_con {
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.5);
}

.Maintance_object_con /deep/ .el-checkbox {
  font-size: 1.5rem;
}

.Maintance_object_con /deep/ .el-checkbox__inner {
  width: 1.5rem;
  height: 1.5rem;
}

.Maintance_object_con /deep/ .el-checkbox__inner::after {
  height: 8px;
  left: 9px;
  position: absolute;
  top: 4px;
}

.Maintance_object_con /deep/ .el-checkbox__label {
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.5);
}

.Maintance_materials {
  width: 95%;
  height: 30%;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.Maintance_materials_con {
  width: 15%;
  height: 80%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: grey;
  color: white;
}

.Maintance_materials_con span {
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.Maintance_btn {
  width: 95%;
  height: 20%;

  display: flex;
  align-items: center;
}

.btns {
  width: 10rem;
  background: #a3d897;
  border-color: #fff #717171 #717171 #fff;
  border-style: solid;
  border-width: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
  margin-left: 1rem;
  font-size: 1.5rem;
}

.select_material {
  width: 8rem;
  height: 4rem;
  background: #a3d897;
  border-color: #fff #717171 #717171 #fff;
  border-style: solid;
  border-width: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  float: left;
  margin-left: 1rem;
  font-size: 1.5rem;
  margin-top: 1rem;
}

.material_one {
  width: 18%;
  height: 22%;
  background: grey;
  margin-left: 1%;
  margin-top: 1%;
  float: left;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.material_one_checked {
  width: 18%;
  height: 22%;
  background: rgb(50, 150, 250);
  margin-left: 1%;
  margin-top: 1%;
  float: left;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.repair_object {
  width: 100%;
  height: 20%;
  display: flex;
  position: relative;
}
.material_ones {
  width: 13%;
  margin-left: 0.5rem;

  float: left;
  height: 16%;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.material_ones /deep/ .el-checkbox {
  font-size: 1.2rem;
}

.material_ones /deep/ .el-checkbox__inner {
  width: 1.2rem;
  height: 1.2rem;
}

.material_ones /deep/ .el-checkbox__inner::after {
  height: 8px;
  left: 7px;
  position: absolute;
  top: 4px;
}

.material_ones /deep/ .el-checkbox__label {
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.5);
}
</style>
