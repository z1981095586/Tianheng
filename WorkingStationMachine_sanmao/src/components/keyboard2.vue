<template>
  <div class="allPage">
    <el-button @click="danji(item.label)" :key="index" :style="item.style" v-for="(item,index) in list">{{item.label}}
    </el-button>

  </div>
</template>

<script>
  export default {
    //大键盘
    name: 'keyboard',

    data() {
      return {


        number: [],
        list: [{
            label: 1,
            style: "font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },
          {
            label: 2,
            style: "font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },
          {
            label: 3,
            style: "font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },

          {
            label: 0,
            style: "padding: 31px 60px;font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },
          {
            label: 4,
            style: "font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },
          {
            label: 5,
            style: "font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },
          {
            label: 6,
            style: "font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },
          {
            label: '退格',
            style: "padding: 31px 25px;font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },
          {
            label: 7,
            style: "font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },
          {
            label: 8,
            style: "font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },
          {
            label: 9,
            style: "font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },


          {
            label: '确认',
            style: "padding: 29px 25px;font-size: 3.2rem;border-radius: 4px;overflow:left;"
          },

        ]
      }
    },

    methods: {
      danji(label) {


        if (typeof label == "number") { //如果是数字就放进数组
          this.number.push(label)
          return
        }
     
        if (label == "退格") {
          if (this.number.length >= 1) {
            this.number.pop()
          }
      return
        }
        if (label == "确认") {

          this.$emit('sure', String(this.number).replace(/,/g, ""))
          this.number = []
      return
        }

      }
    },
    mounted() {

    },
    watch: {
      number(e) {
        this.$emit('change', String(e).replace(/,/g, ""))

      },

    }
  }

</script>

<style scoped>
  .allPage {
    width: 100%;
    height: 100%;


  }

  .big /deep/ .el-checkbox-button__inner {
    padding: 12px 77px;
  }

  .allPage /deep/ .el-button {
    padding: 31px 25px;
    font-size: 3rem;
    border-radius: 4px;
    margin: 0.3rem;
  }

</style>
