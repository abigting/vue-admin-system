<template>
  <div class="detailBox">
    <el-form :model="detailForm" :rules="rules" ref="detailForm" label-width="100px">
      <el-form-item label="题库类型" prop="professionCode">
        <el-cascader v-model="detailForm.professionCode"
                     :options="majorList"
                     :show-all-levels="false"
                     :props=customProps
                     placeholder=""
                     :disabled="disabled"
                     style="width: 100%"></el-cascader>
      </el-form-item>
      <el-form-item label="人员类型" prop="userType">
        <el-select v-model="detailForm.userType" :multiple="true" placeholder="" style="width: 100%" :disabled="disabled">
          <el-option
            clearable
            v-for="item in userType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型" prop="type">
        <el-radio v-model="detailForm.type"
                  :label="item.value"
                  v-for="item in questionType"
                  :key="item.value"
                  @change="handleChangeType">
          {{item.label}}
        </el-radio>
      </el-form-item>
      <el-form-item label="题目名称" prop="name">
        <el-input v-model="detailForm.name" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="选项A" prop="optionA">
        <el-input v-model="detailForm.optionA" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="选项B" prop="optionB">
        <el-input v-model="detailForm.optionB" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="选项C" prop="optionC">
        <el-input v-model="detailForm.optionC" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="选项D" prop="optionD">
        <el-input v-model="detailForm.optionD" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="正确答案" prop="correctOption">
        <el-radio-group v-model="detailForm.correctOption" :disabled="disabled">
          <el-radio :label="item" v-for="item in chooseOption" :key="item"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="解析" prop="subjectAnalyze">
        <el-input type="textarea"
                  placeholder="最多200字"
                  maxlength="200"
                  show-word-limit
                  v-model="detailForm.subjectAnalyze" :disabled="disabled"></el-input>
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
  import {questionType, userType, ACTION} from "@/mixins/dictionary"
  import {Message} from "element-ui";
  import * as questionBankApi from "@/api/trainManage/questionBank"

  export default {
    mixins: [commonData],
    data() {
      return {
        detailForm: {
          professionCode: []
        },
        ACTION: ACTION,
        chooseOption: ['A', 'B', 'C', 'D'],
        userType: userType,
        questionType: questionType,
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
          professionCode: [
            {required: true, message: '请选择题库类型', trigger: 'blur'},
          ],
          userType: [
            {required: true, message: '请选择人员类型', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择题型', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入题目名称', trigger: 'blur'}
          ],
          optionA: [
            {required: true, message: '请输入选项A', trigger: 'blur'}
          ],
          optionB: [
            {required: true, message: '请输入选项B', trigger: 'blur'}
          ],
          optionC: [
            {required: true, message: '请输入选项C', trigger: 'blur'}
          ],
          correctOption: [
            {required: true, message: '请选择正确答案', trigger: 'blur'}
          ],
          subjectAnalyze: [
            {required: true, message: '请输入解析', trigger: 'blur'}
          ]
        },
        disabled: false
      };
    },
    created() {
      this.getMajorList();
      this.getInfo();
    },
    methods: {
      getInfo() {
        const {action, id} = this.$route.query;
        if (id) {
          questionBankApi.getInfo({id}).then(res => {
            const {success, value} = res;
            if (success) {
              const {professionCode, userType, ...rest} = value;
              this.handleChangeType(value.type);
              this.detailForm = {
                ...rest,
                professionCode: professionCode?JSON.parse(professionCode):[],
                userType: userType ? userType.split(',') : []}
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
            const {professionCode, userType} = this.detailForm;
            const req = {
              ...this.detailForm,
              userType: userType.join(','),
              professionCode: professionCode.map(s => {
                return s[s.length - 1]
              }).join(',')
            };
            if (id) {
              //编辑
              questionBankApi.editItem({...req, id}).then(res => {
                if (res) {
                  Message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.$router.go(-1)
                }
              })
            } else {
              //新增
              questionBankApi.addItem(req).then(res => {
                if (res) {
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
      handleChangeType(value) {
        //选择题
        if (value === '1') {
          this.rules = {
            ...this.rules,
            optionC: [
              {required: true, message: '请输入选项C', trigger: 'blur'}
            ]
          }
        } else {
          //判断题
          this.rules = {
            ...this.rules,
            optionC: [
              {required: false}
            ]
          }
        }
      }
    }
  }
</script>

<style scoped>
  .detailBox {
    width: 680px;
  }
</style>
