<template>
  <div class="detailBox">
    <el-form :model="detailForm" :rules="rules" ref="detailForm" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="专业类别" prop="professionCode">
            <el-cascader v-model="detailForm.professionCode" :options="majorList" :show-all-levels="false"
                         :props=customProps
                         placeholder="" :disabled="disabled" style="width: 100%"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="人员类型" prop="userType">
            <el-select v-model="detailForm.userType" :multiple="userTypeMultiple" placeholder="" style="width: 100%"
                       :disabled="disabled">
              <el-option clearable v-for="item in userType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="margin-bottom: 1px; position: relative">
          <el-form-item label="题目数量" prop="count">
            <el-select v-model="detailForm.count" placeholder="" style="width: 100%" :disabled="disabled">
              <el-option clearable v-for="item in countList" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <span :class="{action:true, reviewTitle:true, disabledCss: !detailForm.professionCode || JSON.stringify(detailForm.professionCode)==='[]'}"
                @click="showList">
            查看题库
          </span>
        </el-col>
        <el-col :span="12">
          <el-form-item label="选择题" prop="selectCount">
            <el-input-number class="inputWidth" :min="1" v-model="detailForm.selectCount"
                             :disabled="disabled"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="判断题" prop="judgeCount">
            <el-input-number class="inputWidth" :min="1" v-model="detailForm.judgeCount"
                             :disabled="disabled"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="考试时间(分)" prop="testTime">
            <el-input-number class="inputWidth" :min="1" :precision="0" v-model="detailForm.testTime"
                             :disabled="disabled"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="总分值" prop="totalScore">
            <el-input-number class="inputWidth" :min="1" v-model="detailForm.totalScore"
                             :disabled="disabled"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单题分值" prop="singleScore">
            <el-input-number class="inputWidth" :disabled="true" v-model="singleScore"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合格分数" prop="passScore">
            <el-input-number class="inputWidth" :min="1" :precision="0" v-model="detailForm.passScore"
                             :disabled="disabled"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="必须培训时长" prop="trainTime">
            <el-input-number class="inputWidth" :min="1" v-model="detailForm.trainTime"
                             :disabled="disabled"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button @click="cancel()">取消</el-button>
        <el-button v-if="!disabled" type="primary" @click="submit('detailForm')">保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="题库"
      :visible.sync="dialogVisible"
      width="800px">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="professionCode"
          label="专业类别"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="从业人员"
          width="180"
          align="center">
          <el-table-column
            prop="cyrSelectCount"
            label="选择题"
            align="center">
          </el-table-column>
          <el-table-column
            prop="cyrJudgeCount"
            label="判断题"
            align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="address"
          label="场所卫生管理人员"
          align="center">
          <el-table-column
            prop="glySelectCount"
            label="选择题"
            align="center">
          </el-table-column>
          <el-table-column
            prop="glyJudgeCount"
            label="判断题"
            align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import commonData from "@/mixins/common"
  import {
    questionType,
    userType,
    ACTION
  } from "@/mixins/dictionary"
  import {
    Message
  } from "element-ui";
  import * as rulesApi from "@/api/trainManage/rules"

  export default {
    mixins: [commonData],
    data() {
      return {
        detailForm: {},
        ACTION: ACTION,
        chooseOption: ['A', 'B', 'C', 'D'],
        userType: userType,
        questionType: questionType,
        userTypeMultiple: true,
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
          professionCode: [{
            required: true,
            message: '请选择专业类别',
            trigger: 'blur'
          },],
          userType: [{
            required: true,
            message: '请选择人员类型',
            trigger: 'blur'
          }],
          count: [{
            required: true,
            message: '请输入题目数量',
            trigger: 'blur'
          }],
          testTime: [{
            required: true,
            message: '请输入考试时间',
            trigger: 'blur'
          }],
          totalScore: [{
            required: true,
            message: '请输入总分值',
            trigger: 'blur'
          }],
          // singleScore: [
          //   {required: true, message: '请输入单题分值', trigger: 'blur'}
          // ],
          passScore: [{
            required: true,
            message: '请输入合格分数',
            trigger: 'blur'
          }],
          trainTime: [{
            required: true,
            message: '请输入必须培训时长',
            trigger: 'blur'
          }],
          selectCount: [{
            required: true,
            message: '请输入选择题数量',
            trigger: 'blur'
          }],
          judgeCount: [{
            required: true,
            message: '请输入判断题数量',
            trigger: 'blur'
          }]
        },
        disabled: false,
        countList: [20, 40, 50, 100],
        dialogVisible: false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      };
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
      getInfo() {
        const {
          action,
          id
        } = this.$route.query;
        if (id) {
          this.customProps = {
            ...this.customProps,
            multiple: false
          };
          this.userTypeMultiple = false;
          rulesApi.getInfo({
            id
          }).then(res => {
            const {
              success,
              value
            } = res;
            if (success) {
              // const {
              //   professionCode,
              //   userType,
              //   ...rest
              // } = value;
              this.detailForm = {
                ...value,
                // professionCode: this.dealData(professionCode),
                // userType: userType ? userType.split(',') : []
                // userType:userType
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
            const {
              professionCode,
              userType,
              totalScore,
              passScore,
              count,
              selectCount,
              judgeCount
            } = this.detailForm;
            //数据校验
            if (totalScore < passScore) {
              Message.info({
                showClose: true,
                message: '合格分数不能大于总分值',
                type: 'info'
              });
              return
            }
            if (count !== selectCount + judgeCount) {
              Message.info({
                showClose: true,
                message: '选择题和判断题要等于题目数量',
                type: 'info'
              });
              return
            }
            //数据处理
            let req = {
              ...this.detailForm,
              singleScore: this.singleScore,
            };
            if (id) {
              req = {
                ...req,
                professionCode: professionCode[professionCode.length - 1]
              };
              //编辑
              rulesApi.editItem({...req, id}).then(res => {
                if (res) {
                  Message({
                    message: '保存成功',
                    type: 'success'
                  });
                  this.$router.go(-1)
                }
              })
            } else {
              //注意：新增的时候userType和professionCode是多选，编辑的时候单选
              req = {
                ...req,
                userType: userType.join(','),
                professionCode: professionCode.map(s => {
                  return s[s.length - 1]
                }).join(',')
              };
              //新增
              rulesApi.addItem(req).then(res => {
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
      showList() {
        const {professionCode} = this.detailForm;
        if(professionCode && JSON.stringify(professionCode)!=='[]'){
          const {id} = this.$route.query;
          this.dialogVisible = true;
          let professionCodeList = [];
          if (id) {
            professionCodeList = [professionCode]
          } else {
            professionCodeList = professionCode.map(s => {
              return s[s.length - 1]
            })
          }
          rulesApi.findSubjectCount({professionCodeList}).then(res => {
            const {success, value} = res;
            if (success) {
              this.tableData = value
            }
          });
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

  .reviewTitle {
    position: absolute;
    right: -64px;
    top: 6px;
  }

  .disabledCss{
    color: #C0C4CC;
    cursor:not-allowed
  }
</style>
