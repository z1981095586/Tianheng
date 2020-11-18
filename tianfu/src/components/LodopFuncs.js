//==本JS是加载Lodop插件及CLodop服务的综合示例，可直接使用，建议看懂后融进自己页面程序==
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

var CreatedOKLodopObject, CLodopIsLocal, CLodopJsState;


//==判断是否需要CLodop(那些不支持插件的浏览器):==
function needCLodop() {
  try {
    var ua = navigator.userAgent;
    if (ua.match(/Windows\sPhone/i))
      return true;
    if (ua.match(/iPhone|iPod|iPad/i))
      return true;
    if (ua.match(/Android/i))
      return true;
    if (ua.match(/Edge\D?\d+/i))
      return true;

    var verTrident = ua.match(/Trident\D?\d+/i);
    var verIE = ua.match(/MSIE\D?\d+/i);
    var verOPR = ua.match(/OPR\D?\d+/i);
    var verFF = ua.match(/Firefox\D?\d+/i);
    var x64 = ua.match(/x64/i);
    if ((!verTrident) && (!verIE) && (x64))
      return true;
    else if (verFF) {
      verFF = verFF[0].match(/\d+/);
      if ((verFF[0] >= 41) || (x64))
        return true;
    } else if (verOPR) {
      verOPR = verOPR[0].match(/\d+/);
      if (verOPR[0] >= 32)
        return true;
    } else if ((!verTrident) && (!verIE)) {
      var verChrome = ua.match(/Chrome\D?\d+/i);
      if (verChrome) {
        verChrome = verChrome[0].match(/\d+/);
        if (verChrome[0] >= 41)
          return true;
      }
    }
    return false;
  } catch (err) {
    return true;
  }
}

//==引用CLodop的主JS,用双端口8000和18000(以防其中一个被占):==
if (needCLodop()) {
  var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;

  var JS1 = document.createElement("script");
  JS1.src = "http://localhost:8000/CLodopfuncs.js?priority=1";
  head.insertBefore(JS1, head.firstChild);

  var JS2 = document.createElement("script");
  JS2.src = "http://localhost:18000/CLodopfuncs.js?priority=0";
  head.insertBefore(JS2, head.firstChild);

  CLodopIsLocal = !!((JS1.src + JS2.src).match(/\/\/localho|\/\/127.0.0./i));

  if (JS1.attachEvent) {
    CLodopJsState = "loading";
    var onChange = function(){
      if (window.event.srcElement.readyState == 'loaded')
        CLodopJsState = "complete";
    };
    JS1.attachEvent('onreadystatechange',onChange);
    JS2.attachEvent('onreadystatechange',onChange);
  }
}

//==获取LODOP对象主过程,判断是否安装、需否升级:==
export function getLodop(oOBJECT, oEMBED) {
  var strHtmInstall = "<br><div color='#FF00FF'>打印控件未安装!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</div>";
  var strHtmUpdate = "<br><div color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</div>";
  var strHtm64_Install = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
  var strHtm64_Update = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
  var strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
  var strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
  var strCLodopInstall_1 = "<br><div color='#FF00FF'>Web打印服务CLodop未安装启动，点击这里<a href='http://www.lodop.net/download/Lodop6.226_Clodop3.093.zip' target='_self'>下载并安装CLodop_Setup_for_Win32NT.exe</a>";
  var strCLodopInstall_2 = "<br>（若此前已安装过，可<a href='CLodop.protocol:setup' target='_self'>点这里直接再次启动</a>）";
  var strCLodopInstall_3 = "，成功后请刷新本页面。</font>";
  var strCLodopUpdate = "<br><font color='#FF00FF'>Web打印服务CLodop需升级!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font>";
  var LODOP;
  try {
    var ua = navigator.userAgent;
    var isIE = !!(ua.match(/MSIE/i)) || !!(ua.match(/Trident/i));
    if (needCLodop()) {
      try {
        LODOP = getCLodop();
      } catch (err) {}
      if (!LODOP && (document.readyState !== "complete" || (isIE  && CLodopJsState == "loading")) ) {
        alert("网页还没下载完毕，请稍等一下再操作.");
        return;
      }
      if (!LODOP) {
        // document.body.innerHTML = strCLodopInstall_1 + (CLodopIsLocal ? strCLodopInstall_2 : "") + strCLodopInstall_3 + document.body.innerHTML;
        // document.body.innerHTML = strCLodopInstall_1 + strCLodopInstall_3 + document.body.innerHTML;
        // let r =  alert("打印插件未安装，是否下载此插件?");
        // if(r){
        //     window.open("http://106.12.219.66:8080/CLodop.exe");
        // }
        let vm = new Vue();
        vm.$confirm('未安装打印插件，是否下载Lodop插件？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.open("http://106.12.219.66:8080/CLodop.exe");
        });

        return;
      } else {
        if (CLODOP.CVERSION < "3.0.9.3") {
          document.body.innerHTML = strCLodopUpdate + document.body.innerHTML;
        }
        if (oEMBED && oEMBED.parentNode)
          oEMBED.parentNode.removeChild(oEMBED);
        if (oOBJECT && oOBJECT.parentNode)
          oOBJECT.parentNode.removeChild(oOBJECT);
      }
    } else {
      var is64IE = isIE && !!(ua.match(/x64/i));
      //==如果页面有Lodop就直接使用,否则新建:==
      if (oOBJECT || oEMBED) {
        if (isIE)
          LODOP = oOBJECT;
        else
          LODOP = oEMBED;
      } else if (!CreatedOKLodopObject) {
        LODOP = document.createElement("object");
        LODOP.setAttribute("width", 0);
        LODOP.setAttribute("height", 0);
        LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
        if (isIE)
          LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
        else
          LODOP.setAttribute("type", "application/x-print-lodop");
        document.documentElement.appendChild(LODOP);
        CreatedOKLodopObject = LODOP;
      } else
        LODOP = CreatedOKLodopObject;
      //==Lodop插件未安装时提示下载地址:==
      if ((!LODOP) || (!LODOP.VERSION)) {
        if (ua.indexOf('Chrome') >= 0)
          document.body.innerHTML = strHtmChrome + document.body.innerHTML;
        if (ua.indexOf('Firefox') >= 0)
          document.body.innerHTML = strHtmFireFox + document.body.innerHTML;
        document.body.innerHTML = (is64IE ? strHtm64_Install : strHtmInstall) + document.body.innerHTML;
        return LODOP;
      }
    }
    if (LODOP.VERSION < "6.2.2.6") {
      if (!needCLodop())
        document.body.innerHTML = (is64IE ? strHtm64_Update : strHtmUpdate) + document.body.innerHTML;
    }
    //===如下空白位置适合调用统一功能(如注册语句、语言选择等):==
    LODOP.SET_LICENSES("","A8B258E11F1AC98443ECF6783889DEAB","","");//百度云服务器
    //LODOP.SET_LICENSES("","756DFBB94E41CD7090F1514857D17B51","","");//祥嘉服务器
    //=======================================================
    return LODOP;
  } catch (err) {
    alert("getLodop出错:" + err);
  }
}
