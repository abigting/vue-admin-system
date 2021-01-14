import {getUserInfo} from '@/utils/auth';
import {pickerOptions} from './dictionary'; //自定义
export default {
  data() {
    return {
      info: {},
      data: [],
      params: {
        page: 1,
        size: 10
      },
      total: 0,
      loadingBg: "",
      loadingType: "",
      loadingText: '载入中...',
      loading: false, //页面加载
      blockLoading:false, //局部加载
      step: 0, //导出进度条
      tipShow: false, //导出控制
      stepType: 'success', //导出成功/失败
      timer: null, //导出定时器
      pickerOptions: pickerOptions, //时间快捷
      preClick:0,//上一次点击
    }
  },
  created() {
    // this.info = getUserInfo() || {};
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    //表单验证
    checkForm(el) {
      let result = null
      this.$refs[el].validate((valid) => {
        if (!valid) {
          result = false
          return false;
        } else {
          result = true
        }
      });
      return result
    },
    //清除表单验证
    restCheckForm(el) {
      this.$nextTick(() => {
        this.$refs[el].resetFields();
      })
    },
    //切换页码
    pageChange(e) {
      this.params.page = e;
      this.init()
    },
    //切换 条/页
    sizeChange(e) {
      this.params.size = e
      this.init()
    },
    //导出exel提示
    stepStart() {
      if(this.step>0){
        return //防止用户连续点击
      }else{
        clearInterval(this.timer);
      }
      this.stepType = 'success';
      this.tipShow = true;
      this.timer = setInterval(() => {
        this.step += 10;
        if (this.step >= 100) {
          clearInterval(this.timer);
          this.$message({
            message: '导出请求成功',
            type: 'success'
          });
          this.tipShow = false;
          this.step = 0;
        }
      }, 100)
    },
    //导出失败提示
    stepErr() {
      clearInterval(this.timer)
      this.step = 0;
      this.stepType = 'exception';
      this.timer = setTimeout(() => {
        this.tipShow = false;
        this.stepType = 'success';
        this.$message({
          message: '导出请求失败',
          type: 'error'
        });
      }, 1000)
    },
    //点击事件节流
    clickThrottle(type){
      const obj = {
        cx:1000, //查询
        bc:3000, //保存
        dc:3000, //导出
        sc:2000, //删除
      }
      const thisClick = new Date().getTime();
      if(thisClick-this.preClick>obj[type]){
        this.preClick = thisClick;
        return false
      }else{
        return true
      }
    }
  }
}
