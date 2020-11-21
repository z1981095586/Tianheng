<template>
    <div>
      <!--浆纱加工新增-->
      <div style="height: 250px">
        <mainProcessOrderJS></mainProcessOrderJS>
      </div>
      <!--中部详细信息-->
      <div style="height: 200px">
        <div style="height: 100%;width: 65%;display: inline-block;margin-left: 3px">
          <Tabs type="card" class="Tab">
            <TabPane label="经纬纱" class="TabPane">
              <div style="height: 170px">
                <Table border  stripe :columns="processDetailsColumn" :data="processDetailsData" height="170"></Table>
              </div>
            </TabPane>
            <TabPane label="织轴信息" class="TabPane">
              <Table border  stripe :columns="beamMessageColumn" :data="beamMessageData" height="170"></Table>
            </TabPane>
          </Tabs>
        </div>
        <div style="height: 100%;width: 33%;display: inline-block;margin-left: 1%">
          <Tabs type="card" class="Tab">
            <TabPane label="经纱信息" class="TabPane">
              <div style="height: 170px">
                <Table border  stripe :columns="warpMessageColumn" :data="warpMessageData" height="170"></Table>
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
    import mainProcessOrderJS from './mainProcessOrderJS.vue';
    import searchModule from './searchModule.vue';
    export default {
      components: {mainProcessOrderJS,searchModule},
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
