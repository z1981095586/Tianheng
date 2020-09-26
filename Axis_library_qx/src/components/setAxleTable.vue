
<template>
  <div v-clickoutside="hide">
    <input v-bind="$attrs"
           @focus="show"
           @blur="submit" />
    <div class="keyboard__warn-mess keyboard__warn">
      <div v-if=warnMessage
           class="">
        {{warnMessage}}
      </div>
 
    </div>
    <vue-touch-keyboard class="keyboard-nav"
                        :options="options"
                        v-if="visible"
                        :cancel="hide"
                        :layout="layout"
                        :accept="hide"
                        :input="input" />
  </div>
</template>



<script>
import VueTouchKeyboard from 'vue-touch-keyboard';
import 'vue-touch-keyboard/dist/vue-touch-keyboard.css';
import $ from 'jquery';
 
const clickoutside = {//自定义命令，功能：点击键盘以外的区域隐藏键盘
  // 初始化指令
 
  bind (el, binding, vnode) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update () { },
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};
 
export default {
  components: {
    'vue-touch-keyboard': VueTouchKeyboard.component,
  },
  directives: { clickoutside },
  data: function () {
    return {
      visible: false,
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false
      }
    };
  },
  props: {
    warnMessage: { type: String, default: null },//错误提示
    layout: { type: String, default: 'normal' },//键盘的种类：normal:全键盘/numeric：数字/compact：字母
    instanceID: String,
  },
  methods: {
    accept () {
      this.hide();
    },
 
    show (e) {
      this.input = e.target;
      if (!this.visible) { this.visible = true }
 
    },
    hide () {
      this.visible = false;
    },
    submit () {
      if (this.input === null) {
        return;
      }
      this.$emit('data-change', this.input.value);
    },
  },
  watch: {
    warnMessage: {
      handler () {
        // debugger;
        const doubleId = `#${this.instanceID}`;
        if (this.warnMessage !== '' && this.warnMessage != null) {
          $(doubleId).find('input').css('border', '1px solid rgba(255, 0, 90, 1)');
        } else {
          $(doubleId).find('input').css('border', 'none');
        }
      },
    },
  },
}
</script>

