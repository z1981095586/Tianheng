<template>
    <div>
      <Table border  stripe :columns="warpProcessInfoColumn" :data="warpProcessInfoData"></Table>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          warpProcessInfoData:[],
          warpProcessInfoColumn:[
            {
              title: '表单号',
              key: 'gauge',
              align: 'center',
            },
            {
              title: '开单日期',
              key: 'id',
              align: 'center',
            },
            {
              title: '合同号',
              key: 'axisNo',
              align: 'center',
            },
            {
              title: '订单号',
              key: 'workQty',
              align: 'center',
            },
            {
              title: '机台号',
              key: 'startDate',
              align: 'center',
            },
            {
              title: '品种',
              key: 'empId1',
              align: 'center',
            },
            {
              title: '经排列',
              key: 'empId2',
              align: 'center',
            },
            {
              title: '经轴组合',
              key: 'empId2',
              align: 'center',
            },
            {
              title: '总头份',
              key: 'workQty1',
              align: 'center',
            },
            {
              title: '计划整经数',
              key: 'workQty2',
              align: 'center',
            },
            {
              title: '整经长度(M)',
              key: 'workQty2',
              align: 'center',
            },
            {
              title: '单位',
              key: 'userName',
              align: 'center',
            },
            {
              title: '制单日期',
              key: 'userName',
              align: 'center',
            },
            {
              title: '制单人',
              key: 'userName',
              align: 'center',
            },
            {
              title: '备注',
              key: 'userName',
              align: 'center',
            },
            {
              title: '修改人',
              key: 'userName',
              align: 'center',
            },
            {
              title: '修改日期',
              key: 'userName',
              align: 'center',
            },
          ],
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

</style>
