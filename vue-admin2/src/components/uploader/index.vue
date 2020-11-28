<template>
  <div>
    <el-upload
      ref="uploadDom"
      action="fakeaction"
      :file-list="fileList"
      :on-remove="removeFile"
      :accept="accept"
      :http-request="uploadRequest">
      <slot></slot>
    </el-upload>
  </div>
</template>

<script>
  /**
   * @parameter value, accept, change
   * @description 上传组件
   * @author Feng.xiuting
   * @date 2020-10-22
   */
  import * as commonApi from "@/api/common"

  export default {
    props: ["value", "accept", "module", "fieldName"],
    data() {
      return {
        fileList: [],
        importDataBtnText: '点击上传',
        importDataBtnIcon: 'el-icon-upload2',
        importDataDisabled: 'true',
      };
    },
    watch: {
      value: function (newVal) {
        this.fileList = newVal;
      }
    },
    created() {
      this.fileList = this.$props.value;
    },
    methods: {
      uploadRequest(params, fileList) {
        const file = params.file;
        // fileType = file.type;
        // 这里常规检验，看项目需求而定
        // const isImage = fileType.indexOf("image") !== -1,
        // isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isImage) {
        //   this.$message.error("只能上传图片格式png、jpg、gif!");
        //   return;
        // }
        // if (!isLt2M) {
        //   this.$message.error("只能上传图片大小小于2M");
        //   return;
        // }
        // 根据后台需求数据格式
        const form = new FormData();
        // 文件对象
        form.append("file", file);
        form.append('fieldName', this.$props.fieldName);
        form.append('module', this.$props.module);
        commonApi.uploadNew(form).then(res => {
          const {success, value, errorCode} = res;
          if (success) {
            this.fileList = [
              ...this.fileList,
              ...value
            ];
            this.$emit('change', this.fileList);
          } else if (errorCode === 'AUTH.RESOURCE.E0002' || errorCode === 'AUTH.RESOURCE.E0001') {
            this.fileList = fileList.filter(s => s.uid !== file.uid);
            // token失效，清cookie，退出到登录页
            // setTimeout(() => {
            //     window.location.href = `${process.env.url}#/`;
            //     common.removeAllcookie();
            //     storage.clear();
            //   }, 500);
          } else {
            this.fileList = fileList.filter(s => s.uid !== file.uid);
            this.$emit('change', this.fileList);
          }
        }).catch(() => {
          this.fileList = this.fileList.filter(s => s.uid !== file.uid);
          this.$emit('change', this.fileList);
        });
      },
      removeFile(file) {
        this.fileList = this.fileList.filter(s => s.uid !== file.uid);
        this.$emit('change', this.fileList);
      }
    }
  };
</script>

<style>
</style>
