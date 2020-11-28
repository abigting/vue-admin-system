<template>
  <div class="detailBox">
    <el-form :model="detailForm" :rules="rules" ref="detailForm" label-width="120px">
      <el-form-item label="培训名称" prop="trainName">
        <el-input class="inputWidth"
                  :min="1"
                  maxlength="20"
                  placeholder="最多20字"
                  v-model="detailForm.trainName"
                  :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="introduction">
        <el-input type="textarea"
                  placeholder="最多100字"
                  maxlength="100"
                  show-word-limit
                  v-model="detailForm.introduction"
                  :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="专业类别" prop="professionCode">
        <el-cascader v-model="detailForm.professionCode"
                     :options="majorList"
                     :show-all-levels="false"
                     :props=customProps
                     placeholder=""
                     :disabled="disabled"
                     style="width: 100%"></el-cascader>
      </el-form-item>
      <el-form-item label="人员类型" prop="userType">
        <el-select v-model="detailForm.userType"
                   :multiple="true"
                   placeholder=""
                   style="width: 100%"
                   :disabled="disabled">
          <el-option
            clearable
            v-for="item in userType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最长学习时长" prop="maxLearingTime">
        <el-input-number class="inputWidth"
                         :min="1"
                         v-model="detailForm.maxLearingTime"
                         placeholder="该资料可供人员学习的有效时长"
                         :disabled="disabled"></el-input-number>
      </el-form-item>
      <el-form-item label="培训类别" prop="trainType">
        <el-radio v-model="detailForm.trainType"
                  :label="item.value"
                  v-for="item in trainType"
                  @change="(value)=>linkFn(value, 'trainType')"
                  :disabled="disabled"
                  :key="item.value">
          {{item.label}}
        </el-radio>
      </el-form-item>
      <el-form-item v-if="detailForm.trainType ==='1' "
                    label="培训内容"
                    prop="trainContent"
                    @change="(value)=>linkFn(value, 'trainContent')">
        <el-radio v-model="detailForm.trainContent"
                  :label="item.value"
                  v-for="item in trainContent"
                  :disabled="disabled"
                  :key="item.value">
          {{item.label}}
        </el-radio>
      </el-form-item>
      <el-form-item v-if="detailForm.trainType==='2'" label="内容" prop="file">
        <Uploader :value="detailForm.file"  module='moduleDataVideo' fieldName="file" @change="uploadFn" accept=".avi, .rm, .mp4">
          <div>
            <div style="text-align: left"><el-button size="small" type="primary">上传视频文件</el-button></div>
            <div slot="tip" class="el-upload__tip">支持AVI、mov、rmvb、rm、FLV、mp4、MP3、3GP</div>
          </div>
          <!--          <video v-if="detailForm.file"-->
          <!--                 v-for="item in detailForm.file"-->
          <!--                 v-bind:src="item.url"-->
          <!--                 class="avatar videoAvatar"-->
          <!--                 controls="controls">-->
          <!--            您的浏览器不支持视频播放-->
          <!--          </video>-->

        </Uploader>
      </el-form-item>
      <el-form-item v-if="detailForm.trainType==='1' && detailForm.trainContent==='2'" label="内容" prop="file">
        <Uploader :value="detailForm.file" module='moduleDataDoc' fieldName="file" @change="uploadFn" accept=".pdf,.pptx,.xls,.xlsx,.doc,.docx,.txt">
          <div>
            <div style="text-align: left"><el-button size="small" type="primary">点击上传</el-button></div>
            <div slot="tip" class="el-upload__tip">支持.pdf,.pptx,.xls,.xlsx,.doc,.docx,.txt扩展名</div>
          </div>
        </Uploader>
      </el-form-item>

      <el-form-item v-show="detailForm.trainContent==='1'" label="内容" prop="contentDetail">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel()">取消</el-button>
        <el-button v-if="!disabled" type="primary" @click="submit('detailForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import commonData from "@/mixins/common"
  import {questionType, userType, trainType, trainContent, ACTION} from "@/mixins/dictionary"
  import {Message} from "element-ui";
  import * as infoApi from "@/api/trainManage/info"
  import E from "wangeditor";
  import Uploader from '@/components/uploader'

  export default {
    mixins: [commonData],
    components: {Uploader},
    data() {
      return {
        detail: '',
        detailForm: {
          // professionCode:[['01','0109'], ['01', '0118']]
        },
        ACTION: ACTION,
        chooseOption: ['A', 'B', 'C', 'D'],
        userType: userType,
        questionType: questionType,
        trainType: trainType,
        trainContent: trainContent,
        current: {},
        customProps: {
          expandTrigger: 'hover',
          label: 'professionName',
          value: 'professionCode',
          children: 'childList',
          // checkStrictly: true,
          multiple: true
        },
        rules: {
          trainName: [
            {required: true, message: '请输入培训名称', trigger: 'blur'},
          ],
          introduction: [
            {required: true, message: '请输入简介', trigger: 'blur'}
          ],
          professionCode: [
            {required: true, message: '请选择专业类别', trigger: 'blur'}
          ],
          userType: [
            {required: true, message: '请选择人员类型', trigger: 'blur'}
          ],
          trainType: [
            {required: true, message: '请选择培训类别', trigger: 'blur'}
          ],
          trainContent: [
            {required: true, message: '请输入培训内容', trigger: 'blur'}
          ],
          maxLearingTime: [
            {required: true, message: '请输入该资料最长学习时长', trigger: 'blur'}
          ],
          file: [
            {required: true, message: '请上传', trigger: 'change'}
          ]
        },
        disabled: false,
        editor: null,
        uploadData: {
          module: 'data',
          fieldName: 'file'
        }
      };
    },
    mounted() {
      this.editor = new E('#editor');
      this.editor.create();
    },
    created() {
      this.getMajorList();
      this.getInfo();
    },
    computed: {
      singleScore: {
        get() {
          const {totalScore, count} = this.detailForm;
          return totalScore / Number(count)
        },
        set() {
        }
      }
    },
    methods: {
      uploadFn(files) {
        this.detailForm = {
          ...this.detailForm,
          file: files
        };
      },
      getInfo() {
        const {action, id} = this.$route.query;
        if (id) {
          infoApi.getInfo({id}).then(res => {
            const {success, value} = res;
            if (success) {
              const {professionCode, userType, contentDetail, ...rest} = value;
              if (contentDetail) {
                this.editor.txt.html(contentDetail);
              }
              this.detailForm = {
                ...rest,
                professionCode: professionCode?JSON.parse(professionCode):[],
                userType: userType ? userType.split(',') : []
              }
            }
          })
        }
        if (action === ACTION.REVIEW) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      },
      submit(formName) {
        const {id} = this.$route.query;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const {professionCode, userType, trainContent} = this.detailForm;
            if (trainContent === '1') {
              if (!this.editor.txt.html()) {
                Message({
                  message: '请填写内容',
                  type: 'info'
                });
                return
              }
            }
            //数据处理
            const req = {
              ...this.detailForm,
              contentDetail: trainContent === '1' ? this.editor.txt.html() : null,
              userType: userType.join(','),
              professionCode: professionCode.map(s => {
                return s[s.length - 1]
              }).join(',')
            };
            if (id) {
              //编辑
              infoApi.editItem({...req, id}).then(res => {
                if (res.success) {
                  Message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.$router.go(-1)
                }
              })
            } else {
              //新增
              infoApi.addItem(req).then(res => {
                if (res.success) {
                  Message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.$router.go(-1)
                }
              })
            }
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.$router.go(-1)
      },
      dealData(value) {
        if (value) {
          let list = value.split(',');
          list = list.map(s => s.length > 2 ? [s.substring(0, 2), s] : s);
          return list
        } else {
          return []
        }
      },
      //联动，清空相关数据
      linkFn(value, type) {
        switch (type) {
          case 'trainType':
            this.detailForm = {
              ...this.detailForm,
              file: [],
              trainContent: null
            };
            return;
          case 'trainContent':
            this.detailForm = {
              ...this.detailForm,
              file: [],
            };
            return;
          default:
            return;
        }
      }
    }
  }
</script>

<style scoped>
  .detailBox {
    width: 680px;
  }

  .inputWidth {
    width: 100%;
  }
</style>
