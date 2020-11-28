<template>
  <CustomModal :visible="accountInfoVisible" title="修改账号信息" @handCancel="closeModal">
    <div style="width: 1120px">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="110px">
        <el-row>
          <el-col span="6">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="性别：" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="民族：" prop="nation">
              <el-select v-model="form.nation" placeholder="">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="出生日期：" prop="birthday">
              <el-date-picker type="date" v-model="form.birthday"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="身份证号：" prop="idCard">
              <el-input v-model="form.idCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="政治面貌：" prop="politics">
              <el-select v-model="form.politics" placeholder="">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="学历：" prop="education">
              <el-select v-model="form.education" placeholder="">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="学位：" prop="degree">
              <el-select v-model="form.degree" placeholder="">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="毕业院校：" prop="school">
              <el-input v-model="form.school"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="所学专业：" prop="school1">
              <el-input v-model="form.school1"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="职务：" prop="school2">
              <el-input v-model="form.school2"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="职称：" prop="school3">
              <el-input v-model="form.school3"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="所在机构：" prop="school4">
              <el-input v-model="form.school4"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="所在科室：" prop="school5">
              <el-input v-model="form.school5"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="参加工作日期：">
              <el-input v-model="form.school6"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider class="mb20 mt4"></el-divider>
        <el-row>
          <el-col span="3">
            <el-form-item label-width="0" prop="school7">
              <el-checkbox label="卫生监督员"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label-width="78px" label="胸牌号：" prop="school7">
              <el-input v-model="form.school7" style="width: 155px"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="7">
            <el-form-item label-width="136px" label="行政执法证号：" prop="school8">
              <el-input v-model="form.school8" style="width: 155px"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label-width="200px" label="参加卫生监督工作日期：">
              <el-date-picker type="date" v-model="form.birthday"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="3">
            <el-form-item label-width="0" prop="school7">
              <el-checkbox label="档案管理员"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="3">
            <el-form-item label-width="0" prop="school7">
              <el-checkbox label="投诉举报专员"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="3">
            <el-form-item label-width="0" prop="school7">
              <el-checkbox label="双随机监督员"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col span="4">
            <el-form-item label-width="0" prop="school7">
              <el-checkbox label="双随机在岗"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col span="17">
            <span class="subtitle">双随机执业范围</span>
            <el-form-item label-width="0" prop="school7" class="mb0">
              <el-checkbox-group v-model="form.role">
                <el-checkbox label="item.value" v-for="item in professionList" :key="item.value">
                  <span class="professionName">{{item.label}}</span>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider class="mb20 mt4"></el-divider>
        <!--          <el-row>-->
        <!--            <el-col span="24">-->
        <!--              <el-form-item label="申请角色：" label-width="92px" prop="school7" class="mb0">-->
        <!--                <el-checkbox-group v-model="form.role">-->
        <!--                  <el-checkbox label="卫生监督员"></el-checkbox>-->
        <!--                  <el-checkbox label="档案管理员"></el-checkbox>-->
        <!--                  <el-checkbox label="投诉举报专员"></el-checkbox>-->
        <!--                  <el-checkbox label="双随机监督员"></el-checkbox>-->
        <!--                </el-checkbox-group>-->
        <!--              </el-form-item>-->
        <!--            </el-col>-->
        <!--          </el-row>-->
        <!--        <el-divider class="mt6 mb20"></el-divider>-->
        <el-row>
          <el-col span="6">
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="6">
            <el-form-item label="电子邮箱：" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="operation">
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        </div>
      </el-form>
    </div>
  </CustomModal>
</template>

<script>
  import CustomModal from '@/components/customModal'
  import initData from "@/mixins/initData";

  export default {
    name: "accountInfo",
    mixins: [initData],
    props: ['accountInfoVisible'],
    components: {
      CustomModal
    },
    data() {
      const idCardValidator = (rule, value, callback) => {
        const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
        if (!reg.test(value)) {
          callback('请输入正确的身份证号');
        }
        callback();
      };
      const phoneValidator = (rule, value, callback) => {
        const phoneReg = /^1[3-578]\d{9}$/;
        if (value && !phoneReg.test(value)) {
          callback('请填写正确的手机号码');
        }
      };
      const emailValidator = (rule, value, callback) => {
        const emailReg = "\\w+@\\w{2,6}(\\.\\w{2,3})+";
        if (value && !emailReg.test(value)) {
          callback('请填写正确的电子邮件');
        }
      };
      return {
        visible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          role: [],
        },
        professionList: [{
          label: '生活饮用水卫生专业',
          value: '0'
        }, {
          label: '职业卫生专业',
          value: '1'
        }, {
          label: '公共场所卫生专业',
          value: '2'
        }, {
          label: '放射卫生专业',
          value: '3'
        }, {
          label: '传染病管理专业',
          value: '4'
        }, {
          label: '医疗服务监督专业',
          value: '5'
        }, {
          label: '采供血监督专业',
          value: '6'
        }, {
          label: '学校卫生专业',
          value: '7'
        }, {
          label: '计划生育专业',
          value: '8'
        }, {
          label: '消毒产品专业',
          value: '9'
        }, {
          label: '餐饮具消毒专业',
          value: '10'
        }, {
          label: '病媒生物预防控制专业',
          value: '11'
        }, {
          label: '其他专业',
          value: '12'
        }],
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'blur'},
          ],
          nation: [
            {required: true, message: '请选择民族', trigger: 'blur'},
          ],
          birthday: [
            {required: true, message: '请选择出生日期', trigger: 'blur'},
          ],
          idCard: [
            {required: true, message: '请填写身份证号', trigger: 'blur'},
            {validator: idCardValidator, trigger: 'blur'},
          ],
          politics: [
            {required: true, message: '请选择政治面貌', trigger: 'blur'},
          ],
          education: [
            {required: true, message: '请选择学历', trigger: 'blur'},
          ],
          degree: [
            {required: true, message: '请选择学位', trigger: 'blur'},
          ],
          school: [
            {required: true, message: '请输入毕业院校', trigger: 'blur'},
          ],
          school1: [
            {required: true, message: '请选择所学专业', trigger: 'blur'},
          ],
          school2: [
            {required: true, message: '请输入职务', trigger: 'blur'},
          ],
          school3: [
            {required: true, message: '请输入职称', trigger: 'blur'},
          ],
          school4: [
            {required: true, message: '请选择所在机构', trigger: 'blur'},
          ],
          school5: [
            {required: true, message: '请选择所在科室', trigger: 'blur'},
          ],
          school6: [
            {required: true, message: '请选择参加工作日期', trigger: 'blur'},
          ],
          school7: [
            {required: true, message: '请输入胸牌号', trigger: 'blur'},
          ],
          school8: [
            {required: true, message: '请输入行政执法证号', trigger: 'blur'},
          ],
          school9: [
            {required: true, message: '请选择参加卫生监督工作日期', trigger: 'blur'},
          ],
          email: [
            {required: true, message: '请输入电子邮箱', trigger: 'blur'},
            {validator: emailValidator, trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: phoneValidator, trigger: 'blur'},
          ],
          verificationCode: [
            {required: true, message: '请输入手机验证码', trigger: 'blur'},
          ]
        }
      }
    },
    created() {
      // this.getDictionary("01");
    },
    methods: {
      closeModal() {
        this.$emit('handCancel')
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            // registerApi.register(this.form).then((res) => {
            //   if(res){
            //     this.$message({
            //       message: "注册成功",
            //       type: "success",
            //     });
            //   }
            // });
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .title {
    font-size: 20px;
    font-weight: 600;
    color: #4A7BED;
    height: 60px;
    line-height: 60px;
    box-shadow: 0 5px 13px 0 rgba(219, 219, 219, 0.5);
    border-radius: 6px 6px 0 0;
    margin: 0 0 30px 0;
    padding: 0 40px 0;
  }

  .subtitle {
    font-size: 14px;
    margin: 6px 0;
    display: block;
    color: #606266;
  }

  .registerWrapper {
    /*background: url("../../assets/img/bg.png") bottom;*/
    width: 100%;
    background-size: cover;
    text-align: center;
    min-height: 100vh;

    .header {
      width: 100%;
      height: 74px;
      position: fixed;
      z-index: 2;
      background-size: cover;
      box-shadow: 0 5px 13px 0px rgba(219, 219, 219, 0.5);
      background-position: center;
    }
  }

  .registerForm {
    width: 1120px;
    height: 800px;
    display: inline-block;
    margin-top: 100px;
    text-align: left;
    background: #ffffff;
    box-shadow: 0 5px 13px 0px rgba(219, 219, 219, 0.5);
    border-radius: 6px;
  }

  .operation {
    text-align: center;
    margin-top: 32px;
  }

  .hint {
    color: #B7BAC8;
    margin-bottom: 10px;
    font-size: 14px;
  }

  .professionName {
    display: inline-block;
    width: 140px;
  }

  @media screen and (max-width: 1600px) {
    .registerForm {
      margin-bottom: 40px;
    }
  }
</style>
