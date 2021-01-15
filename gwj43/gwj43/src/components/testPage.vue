<template>
    <div>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
      data () {
        return {

        }
      },
      methods:{
        testGet(){
          axios({
            url:"http://120.55.124.53:16022/sizing/showInfos",
            method: 'get',
            data: {
              "pageNum":1,
              "pageSize":8,
              "machineId":"0101"
            },
            timeout: 15000,
            headers: {
              'Content-Type': 'text/plain',
              'companyId' : 10000013
            }
          })
            .then(response => {
              console.log(response);
            });
        }
      },
      mounted() {
         this.testGet()
      },
      destroyed() {

      }
    }
</script>

<style lang="less">

</style>
