<template>
    <div>
      <!--整经加工新增-->
      <div style="height: 150px">
        <mainProcessOrder></mainProcessOrder>
      </div>
      <!--中部详细信息-->
      <div style="height: 300px">
        <div style="height: 100%;width: 65%;display: inline-block;margin-left: 3px">
          <Tabs type="card" class="Tab">
            <TabPane label="加工明细信息" class="TabPane">
              <div style="height: 270px">
                <Table border  stripe :columns="processDetailsColumn" :data="processDetailsData" height="270"></Table>
              </div>
            </TabPane>
            <TabPane label="加工要求信息" class="TabPane">
              <table  cellspacing='0' cellpadding='0' style="width: 100%;height: 100%;border-collapse: collapse;">
                <tr>
                  <td style="width: 20%;">
                    <div style="text-align: center;height: 50px;min-width: 200px;overflow:hidden;">
                      <!--width过小会换行-->
                        <el-button type="info" style="margin-top: 5px">读取默认</el-button>
                        <el-button type="info">查询历史</el-button>
                    </div>
                    <div style="height: 220px" class="standard_border">
                         <el-tree
                           :props="props"
                           :load="loadNode"
                           lazy
                           show-checkbox
                           @check-change="handleCheckChange">
                         </el-tree>
                    </div>
                  </td>
                  <td style="width: 70%">
                    <Table border  stripe :columns="processDemandColumn" :data="processDemandData" height="270"></Table>
                  </td>
                </tr>
              </table>
            </TabPane>
            <TabPane label="织轴信息" class="TabPane">
              <Table border  stripe :columns="beamMessageColumn" :data="beamMessageData" height="270"></Table>
            </TabPane>
          </Tabs>
        </div>
        <div style="height: 100%;width: 33%;display: inline-block;margin-left: 1%">
          <Tabs type="card" class="Tab">
            <TabPane label="经纱信息" class="TabPane">
              <div style="height: 270px">
                <Table border  stripe :columns="warpMessageColumn" :data="warpMessageData" height="270"></Table>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <!--底部详细信息-->
      <div style="height: 480px;margin-top: 10px;width: 100%">
        <searchModule></searchModule>
      </div>
    </div>
</template>

<script>
    import mainProcessOrder from './mainProcessOrder.vue';
    import searchModule from './searchModule.vue';
    export default {
      components: {mainProcessOrder,searchModule},
      data () {
        return {
          processDetailsColumn:[
            {
              title: '订单号',
              key: 'order_code',
              align: 'center',
            },
            {
              title: '品名',
              key: 'userName',
              align: 'center',
            },
            {
              title: '计划整经数',
              key: 'gauge',
              align: 'center',
            },
            {
              title: '单位',
              key: 'userName',
              align: 'center',
            },
            {
              title: '整经长度(M)',
              key: 'gauge',
              align: 'center',
            },
            {
              title: '总头份',
              key: 'userName',
              align: 'center',
            },
            {
              title: '经轴组合',
              key: 'userName',
              align: 'center',
            },
            {
              title: '备注',
              key: 'userName',
              align: 'center',
            },
            {
              title: '浆染消耗',
              key: 'userName',
              align: 'center',
            }],
          processDetailsData:[],
          warpMessageColumn:[
            {
              title: '经纱序号',
              key: 'order_code',
              width:'90',
              align: 'center',
            },
            {
              title: '编码',
              key: 'userName',
              align: 'center',
            },
            {
              title: '纱线名称',
              key: 'gauge',
              width:'120',
              align: 'center',
            },
            {
              title: '产地',
              key: 'userName',
              align: 'center',
            },
            {
              title: '批号',
              key: 'gauge',
              width:'100',
              align: 'center',
            },
            {
              title: '根数',
              key: 'userName',
              align: 'center',
            },
            {
              title: '重量',
              key: 'userName',
              align: 'center',
            },
            {
              title: '备注',
              key: 'userName',
              fixed: 'right',
              align: 'center',
            }],
          warpMessageData:[],
          processDemandColumn:[
            {
              title: '事项内容',
              key: 'order_code',
              width:'90',
              align: 'center',
            },
            {
              title: '描述',
              key: 'userName',
              align: 'center',
            }],
          processDemandData:[],
          beamMessageColumn:[
            {
              title: '序号',
              key: 'order_code',
              width:'90',
              align: 'center',
            },
            {
              title: '轴号',
              key: 'userName',
              align: 'center',
            },
            {
              title: '长度',
              key: 'gauge',
              width:'120',
              align: 'center',
            },
            {
              title: '织轴定长',
              key: 'userName',
              align: 'center',
            }],
          beamMessageData:[],
          props: {
            label: 'name',
            children: 'zones'
          },
          moduleSelect:"试样"
        }
      },
      methods:{
        handleCheckChange(data, checked, indeterminate) {
          console.log(data, checked, indeterminate);
        },
        loadNode(node, resolve) {
          if (node.level === 0) {
            return resolve([{ name: '浆染加工要求' }]);
          }
          if (node.level > 3) return resolve([]);

          let hasChild;
          if (node.data.name === 'region1') {
            hasChild = true;
          } else if (node.data.name === 'region2') {
            hasChild = false;
          } else {
            hasChild = Math.random() > 0.5;
          }

          setTimeout(() => {
            let data;
            if (hasChild) {
              data = [{
                name: 'zone'
              }, {
                name: 'zone'
              }];
            } else {
              data = [];
            }
            resolve(data);
          }, 500);
        }
      },
      mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:rgba(240,240,240,0.9)');//设置背景色
      },
      destroyed() {

      }
    }
</script>

<style lang="less">
  .Tab{
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .36), 0 0 6px rgba(0, 0, 0, .12);
  }
  .TabPane{
    background-color: #FFFFFF;
    margin-top: -20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .36), 0 0 6px rgba(0, 0, 0, .12);
  }
</style>
