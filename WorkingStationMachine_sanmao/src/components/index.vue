<template>
  <div class="allPage">
    <div class="header">
      <div class="header_left">
        <el-avatar :size="60" src="https://empty" @error="errorHandler">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
        <span>天衡织机工位操作系统</span>
      </div>
      <div class="header_right"></div>
    </div>
    <div class="tabPane">
      <div class="tabPane_con">
        <div class="oneTab">上轴</div>
        <div class="oneTab">插片</div>
        <div class="oneTab">挡车</div>
        <div class="oneTab">下轴</div>
        <div class="oneTab">机修</div>
      </div>
    </div>
    <div class="operationPane">
      <div class="operationPane_con">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {

      }
    }
  }

</script>

<style scoped>
  .allPage {
    width: 100%;
    height: 100vh;


  }

  .header {
    width: 100%;
    height: 8%;
    background: #29374B;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header_left {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    border: 1px solid black;
    color: white;
    font-size: 1.5rem;
  }

  .header_left span {
    margin-left: 1.5rem;
  }

  .header_right {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    border: 1px solid black;
  }

  .tabPane {
    width: 100%;
    height: 26%;
    background: #E2E7ED;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tabPane_con {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 99%;
    height: 100%;
  }

  .oneTab {
    width: 19%;
    height: 80%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    border-radius: 16px;
    font-weight: 600;
  }

  .oneTab_Choosed {
    width: 19%;
    height: 80%;
    font-weight: 600;
    background: #3296FA;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    border-radius: 16px;
  }

  .operationPane {
    width: 100%;
    height: 66%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: #E2E7ED;
  }

  .operationPane_con {
    width: 98%;
    height: 96%;
    background: white;
    border-radius: 16px;
  }

</style>
