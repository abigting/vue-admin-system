<template>
  <div class="detailBox">
    <el-form :model="detailForm" :rules="rules" ref="detailForm" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input class="inputWidth"
                  :min="1"
                  v-model="detailForm.title"
                  :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea"
                  placeholder="最多200字"
                  maxlength="200"
                  show-word-limit
                  v-model="detailForm.content"
                  :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="接收人所在专业" prop="professionCode">
        <el-cascader v-model="detailForm.professionCode"
                     :options="majorList"
                     :show-all-levels="false"
                     :props=customProps
                     placeholder=""
                     :disabled="disabled"
                     style="width: 100%"></el-cascader>
      </el-form-item>
      <el-form-item label="接收人员类型" prop="userType">
        <el-checkbox style="width:120px" :label="1" v-model="healthManager" @change="(value)=>linkFn(value, 'healthManager')">卫生管理员</el-checkbox>
        <el-checkbox :label="11" v-model="healthManagerDx" :disabled="!healthManager">短信通知</el-checkbox>
        <br/>
        <el-checkbox style="width:120px" :label="2" v-model="employee" @change="(value)=>linkFn(value, 'employee')">从业人员</el-checkbox>
        <el-checkbox :label="22" v-model="employeeDx" :disabled="!employee">短信通知</el-checkbox>
      </el-form-item>
      <el-form-item label="通知时间" prop="noticeTime">
        <el-date-picker
          v-model="detailForm.noticeTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          :disabled="disabled"
          placeholder="选择日期时间">
        </el-date-picker>
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
  import {questionType, trainType, trainContent, ACTION} from "@/mixins/dictionary"
  import {Message} from "element-ui";
  import * as noticManageApi from "@/api/noticManage"

  export default {
    mixins: [commonData],
    data() {
      return {
        detailForm: {},
        ACTION: ACTION,
        chooseOption: ['A', 'B', 'C', 'D'],
        healthManager:false,
        employee:false,
        healthManagerDx:false,
        employeeDx:false,
        userType: [
          {
            label:'卫生管理员',
            value:'1'
          },
          {
            label:'短信通知',
            value:'11'
          },
          {
            label:'从业人员',
            value:'2'
          },
          {
            label:'短信通知',
            value:'22'
          }
        ],
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
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          professionCode: [
            {required: true, message: '请选择专业类别', trigger: 'blur'}
          ],
          // userType: [
          //   {required: true, message: '请选择人员类型', trigger: 'blur'}
          // ],
          messageUserType: [
            {required: true, message: '请选择短信接收人员', trigger: 'blur'}
          ],
          noticeTime: [
            {required: true, message: '请选择通知时间', trigger: 'blur'}
          ],
        },
        disabled: false,
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
        const {action, id} = this.$route.query;
        if (id) {
          noticManageApi.getInfo({id}).then(res => {
            const {success, value} = res;
            if (success) {
              const {professionCode, userType, messageUserType, ...rest} = value;
              //处理接收人员类型和短信通知数据
              this.healthManager = userType? userType.indexOf('1')!==-1: false;
              this.employee = userType? userType.indexOf('2')!==-1: false;
              this.healthManagerDx = messageUserType? messageUserType.indexOf('1')!==-1: false;
              this.employeeDx = messageUserType? messageUserType.indexOf('2')!==-1: false;
              //数据处理
              this.detailForm = {
                ...rest,
                professionCode: professionCode?JSON.parse(professionCode):[],
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
            const {professionCode} = this.detailForm;
            let userType=[];
            let messageUserType=[];
            if(!this.healthManager&&!this.employee){
              this.$message({
                message: '接收人员类型至少选择一个！',
                type: 'warning'
              });
              return
            }
            //处理接收人员类型和短信通知数据
            if(this.healthManager){
              userType=[...userType, '1']
            }
            if(this.employee){
              userType=[...userType, '2']
            }
            if(this.healthManagerDx){
              messageUserType=[...messageUserType, '1']
            }
            if(this.employeeDx){
              messageUserType=[...messageUserType, '2']
            }
            //数据处理
            const req = {
              ...this.detailForm,
              userType: userType.join(','),
              messageUserType: messageUserType.join(','),
              professionCode: professionCode.map(s => {
                return s[s.length - 1]
              }).join(',')
            };
            if (id) {
              //编辑
              noticManageApi.editItem({...req, id}).then(res => {
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
              noticManageApi.addItem(req).then(res => {
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
          case 'healthManager':
            this.healthManagerDx = false;
            return;
          case 'employee':
            this.employeeDx = false;
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
