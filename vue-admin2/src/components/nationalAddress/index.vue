<template>
  <!-- 全国地区 -->
  <div class="elm-adress-component">
    <el-cascader clearable :placeholder="name" v-model="Code" ref="elcascader" @change="handChange"
      @visible-change="elCascaderOnlick" @expand-change="elCascaderOnlick" :props="areaprop">
    </el-cascader>
  </div>
</template>

<script>
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
            setTimeout(() => {
              if (node.level == 0) {
                ProvinceListQuery({}).then(res => {
                  const cities = res.value.map((value, i) => ({
                    value: value.regioncode,
                    label: value.regionname,
                    leaf: node.level >= 3
                  }));
                  resolve(cities);
                });
              }
              if (node.level == 1 && node.hasChildren) {
                getNextListQuery({
                  regioncode: node.value
                }).then(res => {
                  const cities = res.value.map(i => ({
                    value: i.regioncode,
                    label: i.regionname,
                    leaf: node.level >= 3
                  }));
                  resolve(cities);
                });
              }
              if (node.level == 2 && node.hasChildren) {
                getNextListQuery({
                  regioncode: node.value
                }).then(response => {
                  const areas = response.value.map((value, i) => ({
                    value: value.regioncode,
                    label: value.regionname,
                    leaf: node.level >= 3
                  }));
                  resolve(areas);
                });
              }
              if (node.level == 3 && node.hasChildren) {
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
              if (node.level >= 4) {
                resolve([]);
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
    },
    watch:{
      Code(){
        this.$refs.elcascader.dropDownVisible = false;
      }
    },
    methods: {
      handChange(e) {
        if (e) {
          this.$emit('handAddress', e)
        }
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
