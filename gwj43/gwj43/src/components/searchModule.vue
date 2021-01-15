<template>
    <div>
      <table style="height: 480px;margin-top: 10px;width: 100%">
        <tr>
          <td style="margin-left: 3px;width: 20%;display: inline-block;height: 480px" >
            <div style="height: 40px">
              <el-radio-group v-model="moduleSelect">
                <el-radio-button label="试样"></el-radio-button>
                <el-radio-button label="订单"></el-radio-button>
                <el-radio-button label="色号库"></el-radio-button>
              </el-radio-group>
            </div>
            <div style="height: 440px;width: 100%" class="shadow">
              <div style="height: 40px;background-color: rgb(240,240,240)">
                <div style="display: inline-block;width: 20%;text-align: center"><p style="font-size: 16px">查询条件</p></div>
                <el-select v-model="value" placeholder="请选择" style="width: 53%;display: inline-block">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <div style="width: 25%;display: inline-block;text-align: right">
                  <el-button type="primary">查 询</el-button>
                </div>
              </div>
              <div style="height: 400px">
                <Table border  stripe :columns="searchKeyColumn" :data="searchKeyData" height="400"></Table>
              </div>
            </div>
          </td>
          <td style="width: 78.5%;margin-left: 0.5%;display: inline-block;height: 480px" class="shadow">
            <div v-if="moduleSelect === '试样'">
              <Table border  stripe :columns="sampleInfoColumn" :data="sampleInfoData" height="480"></Table>
            </div>
            <div v-if="moduleSelect === '订单'">
              <Table border  stripe :columns="orderInfoColumn" :data="orderInfoData" height="480"></Table>
            </div>
            <div v-if="moduleSelect === '色号库'">
              <Table border  stripe :columns="colorBaseColumn" :data="colorBaseData" height="480"></Table>
            </div>
          </td>
        </tr>
      </table>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          moduleSelect:"试样",
          searchKeyColumn: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '参数名称',
              key: 'userName',
              align: 'center',
            },
            {
              title: '参数值',
              key: 'userName',
              align: 'center',
            }],
          searchKeyData:[],
          sampleInfoColumn: [
            {
              title: '试样编号',
              key: 'order_code',
              width:'90',
              align: 'center',
            },
            {
              title: '布号',
              key: 'userName',
              align: 'center',
            },
            {
              title: '颜色',
              key: 'gauge',
              width:'120',
              align: 'center',
            },
            {
              title: '成分',
              key: 'userName',
              align: 'center',
            },
            {
              title: '经纬规格',
              key: 'userName',
              align: 'center',
            },
            {
              title: '门幅下线',
              key: 'userName',
              align: 'center',
            },
            {
              title: '门幅上线',
              key: 'userName',
              align: 'center',
            }],
          sampleInfoData:[],
          orderInfoColumn: [
            {
            title: '合同号',
            key: 'order_code',
            width:'90',
            align: 'center',
          },
            {
              title: '订单号',
              key: 'userName',
              align: 'center',
            },
            {
              title: '品名',
              key: 'gauge',
              width:'120',
              align: 'center',
            },
            {
              title: '颜色',
              key: 'userName',
              align: 'center',
            },
            {
              title: '订单数量',
              key: 'userName',
              align: 'center',
            },
            {
              title: '需生产数量',
              key: 'userName',
              align: 'center',
            },
            {
              title: '订单单位',
              key: 'userName',
              align: 'center',
            },
            {
              title: '理论整经长度',
              key: 'userName',
              align: 'center',
            },
            {
              title: '已整经长度',
              key: 'userName',
              align: 'center',
            },
            {
              title: '剩余整经长度',
              key: 'userName',
              align: 'center',
            },
            {
              title: '下单日期',
              key: 'userName',
              align: 'center',
            }],
          orderInfoData:[],
          colorBaseColumn: [
            {
              title: '浆染厂',
              key: 'order_code',
              width:'90',
              align: 'center',
            },
            {
              title: '浆染缸号',
              key: 'userName',
              align: 'center',
            },
            {
              title: '颜色',
              key: 'userName',
              align: 'center',
            },
            {
              title: '色号',
              key: 'userName',
              align: 'center',
            },
            {
              title: '原始缸号',
              key: 'userName',
              align: 'center',
            },
            {
              title: '订单单位',
              key: 'userName',
              align: 'center',
            },
            {
              title: '理论整经长度',
              key: 'userName',
              align: 'center',
            },
            {
              title: '已整经长度',
              key: 'userName',
              align: 'center',
            },
            {
              title: '剩余整经长度',
              key: 'userName',
              align: 'center',
            },
            {
              title: '下单日期',
              key: 'userName',
              align: 'center',
            }],
          colorBaseData:[],
        }
      },
      methods:{

      },
      mounted() {

      },
      destroyed() {

      }
    }
</script>

<style lang="less">
  .shadow{
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .36), 0 0 6px rgba(0, 0, 0, .12);
  }
</style>
