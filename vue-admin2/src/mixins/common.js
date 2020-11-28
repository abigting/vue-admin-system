/**
 * @parameter
 * @description 通用方法
 * @author Feng.xiuting
 * @date 2020-10-21
 */
import * as commonApi from "@/api/common"

export default {
  data() {
    return {
      majorList:[] /*专业*/
    }
  },
  created() {

  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    //获取专业
    getMajorList() {
      commonApi.queryProfessionDataList({}).then(res => {
        if(res.value){
          res.value.forEach(s=>{
            if(s.childList.length===0){
              delete s.childList
            }
          });
          this.majorList = res.value
        }
      })
    },
  }
}
