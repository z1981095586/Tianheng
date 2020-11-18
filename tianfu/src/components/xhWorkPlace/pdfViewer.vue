<template>
    <div class="wrap">
      <iframe :src="pSrc" width="100%" height="100%"></iframe>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          pSrc:''
        }
      },
      methods:{
        loadPDF () {
          //baseurl ：pdf存放的文件路径，可以是本地的，也可以是远程，这个是远程的，亲测可以用
          let baseurl = '../../../static/pdf/web/help.pdf';
          //ie有缓存加个随机数解决 + '?r=' + new Date()
          //let pSrc = baseurl + '?r=' + new Date();
          //this.pSrc = '../../../static/pdf/web/viewer.html?file=' + encodeURIComponent(pSrc) + '.pdf';
          this.pSrc = 'http://106.12.219.66:81/gwj/static/pdf/web/viewer.html?file=help.pdf';
        },
      },
      mounted() {
        this.loadPDF()
      },
      destroyed() {

      }
    }
</script>

<style lang="less">
  .wrap{
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    bottom: 0;
  }
</style>
