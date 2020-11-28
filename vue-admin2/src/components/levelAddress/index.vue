<template>
  <!-- 跟用户等级匹配的地址 -->
  <div class="elm-adress-component">
    <el-cascader clearable :placeholder="name" v-model="Code" ref="elcascader" @change="handChange"
      @visible-change="elCascaderOnlick" @expand-change="elCascaderOnlick" :props="areaprop" :show-all-levels="showAll">
    </el-cascader>
  </div>
</template>

<script>
  import {getUserInfo} from '@/utils/auth';
  import {
    ProvinceListQuery,
    getNextListQuery
  } from '@/api/global.js'
  export default {
    data() {
      return {
        Code:this.adressCode,
        areaprop: {
          expandTrigger: 'hover',
          checkStrictly: true,
          lazy: true,
          lazyLoad(node, resolve) {
            const info = getUserInfo()||{};
            setTimeout(() => {
              if(info.level==="1"){
                //level==1 市级
                if (node.level == 0) {
                   resolve([{
                      value:info.addressCode,
                      label:info.addressName
                   }]);
                }
                if (node.level == 1) {
                  getNextListQuery({
                    regioncode: node.value
                  }).then(res => {
                    const cities = res.value.map(i => ({
                      value: i.regioncode,
                      label: i.regionname,
                      leaf: node.level >= 2
                    }));
                    resolve(cities);
                  });
                  }
                  if (node.level == 2) {
                    getNextListQuery({
                      regioncode: node.value
                    }).then(res => {
                      const cities = res.value.map(i => ({
                        value: i.regioncode,
                        label: i.regionname,
                        leaf: node.level >= 2
                      }));
                      resolve(cities);
                    });
                    }
                if (node.level > 2) {
                  resolve([]);
                }
              }
              else if(info.level==="2"){
                //level==2 区县级
                if (node.level == 0) {
                   resolve([{
                      value:info.addressCode,
                     label:info.addressName
                   }]);
                }
                if (node.level == 1) {
                  getNextListQuery({
                    regioncode: node.value
                  }).then(res => {
                    const cities = res.value.map(i => ({
                      value: i.regioncode,
                      label: i.regionname,
                      leaf: node.level >= 0
                    }));
                    resolve(cities);
                  });
                  }
                if (node.level >= 1) {
                  resolve([]);
                }
              }
              else{
                //level==3/4/5 定点/基层/其他  暂时定到宁波
                if (node.level == 0) {
                  resolve([{
                     value:"33020000",
                     label:"宁波市"
                  }]);
                }
                if (node.level == 1) {
                  getNextListQuery({
                    regioncode: node.value
                  }).then(response => {
                    const areas = response.value.map((value, i) => ({
                      value: value.regioncode,
                      label: value.regionname,
                      leaf: node.level >= 2
                    }));
                    resolve(areas);
                  });
                }
                if (node.level == 2) {
                  getNextListQuery({
                    regioncode: node.value
                  }).then(response => {
                    const areas = response.value.map((value, i) => ({
                      value: value.regioncode,
                      label: value.regionname,
                      leaf: node.level >= 2
                    }));
                    resolve(areas);
                  });
                }
                if (node.level > 2) {
                  resolve([]);
                }
              }
            }, 100);
          }
        }
      }
    },
    props: {
      adressCode: {
        type: Array,
      },
      name: {
        type: [String],
        value: '请选择'
      },
      showAll:{
        type:Boolean,
        default:true,
      },
    },
    watch:{
      adressCode(){
        this.$refs.elcascader.dropDownVisible = false;
      }
    },
    methods: {
      handChange(e) {
        this.$emit('handAddress', e)
      },
      elCascaderOnlick() {
        let that = this;
        setTimeout(function() {
          document.querySelectorAll(".el-cascader-node__label").forEach(el => {
            el.onclick = function() {
              this.previousElementSibling.click();
            };
          });
        }, 100);
      },
    },
  }
</script>
