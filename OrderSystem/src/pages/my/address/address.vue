<template>
  <div class="content">
    <div class="head">
      <i class="el-icon-arrow-left" @click="back"></i>
      <span>收货地址</span>
    </div>
    <div class="address_list">
      <div class="one_address">
        <div class="name_phone"><span style="font-size:14px;font-weight:bold;">周品道</span> <span
            style="font-size:13px;">15215983305</span></div>
        <div class="address"><span style="font-size:13px;color:rgba(0,0,0,0.5)">浙江爱神的箭欧艾斯大搜ID阿搜到奇偶暗示</span></div>
        <i class="el-icon-edit-outline"></i>
      </div>
      <div class="one_address">
        <div class="name_phone"><span style="font-size:14px;font-weight:bold;">周品道</span> <span
            style="font-size:13px;">15215983305</span></div>
        <div class="address"><span style="font-size:13px;color:rgba(0,0,0,0.5)">浙江爱神的箭欧艾斯大搜ID阿搜到奇偶暗示</span></div>
        <i class="el-icon-edit-outline"></i>
      </div>
      <div class="one_address">
        <div class="name_phone"><span style="font-size:14px;font-weight:bold;">周品道</span> <span
            style="font-size:13px;">15215983305</span></div>
        <div class="address"><span style="font-size:13px;color:rgba(0,0,0,0.5)">浙江爱神的箭欧艾斯大搜ID阿搜到奇偶暗示</span></div>
        <i class="el-icon-edit-outline"></i>
      </div>
      <div class="one_address">
        <div class="name_phone"><span style="font-size:14px;font-weight:bold;">周品道</span> <span
            style="font-size:13px;">15215983305</span></div>
        <div class="address"><span style="font-size:13px;color:rgba(0,0,0,0.5)">浙江爱神的箭欧艾斯大搜ID阿搜到奇偶暗示</span></div>
        <i class="el-icon-edit-outline"></i>
      </div>
      <div class="one_address">
        <div class="name_phone"><span style="font-size:14px;font-weight:bold;">周品道</span> <span
            style="font-size:13px;">15215983305</span></div>
        <div class="address"><span style="font-size:13px;color:rgba(0,0,0,0.5)">浙江爱神的箭欧艾斯大搜ID阿搜到奇偶暗示</span></div>
        <i class="el-icon-edit-outline"></i>
      </div>

    </div>
    <div class="add_address">
      <div class="add_address_content" @click="toAddAddress">
        <i class="el-icon-circle-plus-outline"></i>
        <span>新增地址</span>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    name: "address",
    data: () => ({
      backPath: ""
    }),
    methods: {
      back() {
        console.log(this.$router.history.current.params.lastPath2)

        if (this.$router.history.current.params.lastPath2) {
          this.$router.push({
            path: "/index/sureOrder",
            name: "sureOrder",
            params: {
              lastPath2: this.$router.history.current.params.lastPath2 //告诉其他页面根路径
            }
          })
        } else {
          this.$router.push(this.backPath)
        }
        // this.$router.go(-1)
      },
      toAddAddress() {
        console.log(this.$router.history.current.params.lastPath2)

        if (this.$router.history.current.params.lastPath2) {

          console.log(this.$router.history.current.params.lastPath2)
          this.$router.push({
            path: "/my/address/add_address",
            name: "add_address",
            params: {
              lastPath2: this.$router.history.current.params.lastPath2
            }
          })
        } else if (this.$router.history.current.params.lastPath) {
          this.$router.push({
            path: "/my/address/add_address",
            name: "add_address",
            params: {
              lastPath: this.$router.history.current.params.lastPath
            }
          })
        }
      },
      getParams() {
        console.log(this.$router.history.current.params.lastPath2)
        if (this.$router.history.current.params.lastPath != null) {
          this.backPath = this.$router.history.current.params.lastPath
        }
      }
    },
    mounted() {
      this.getParams() //获取其他页面传来的数据

    },

  }

</script>

<style scoped>
  .content {
    width: 100%;
    height: 100vh;
    background: rgb(247, 248, 250);
  }

  /* 头部 */
  .head {
    width: 100%;
    height: 40px;
    color: rgba(0, 0, 0, 1);
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    position: relative;
    border-bottom: 1.8px solid rgba(0, 0, 0, 0.028);
    z-index: 999;
    position: fixed;
    top: 0;
  }

  .head i {
    position: absolute;
    left: 15px;
  }



  /* 头部 */
  /* 地址列表 */
  .address_list {
    width: 100%;
    height: 400px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
  }

  .one_address {
    width: 100%;
    height: 70px;
    background: white;
    margin-bottom: 1.5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  .one_address span {
    margin-left: 10px;
    text-align: left;
  }

  .name_phone {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;

  }

  .address {
    width: 100%;
    height: 50%;
    display: flex;

  }

  .one_address i {
    position: absolute;
    right: 20px;
    font-size: 20px;

  }

  /* 地址列表 */
  .add_address {
    width: 100%;
    height: 50px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;

  }

  .add_address_content {
    color: rgb(2, 150, 250);
  }

</style>
