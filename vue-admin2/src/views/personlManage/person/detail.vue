<template>
  <div class="person-detail-pages">
    <div class="input-wrap">
      <div class="block-title t_left_line">基本信息</div>
      <div class="change-width">
        <el-form :inline="true" :model="queryFrom" label-width="140px">
          <el-form-item label="姓名">
            <el-input v-model="queryFrom.test"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="queryFrom.test"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="queryFrom.test"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="queryFrom.test"></el-input>
          </el-form-item>
          <el-form-item label="健康证号">
            <el-input v-model="queryFrom.test"></el-input>
          </el-form-item>
          <el-form-item label="有效期">
            <el-date-picker
                  v-model="queryFrom.test"
                  type="daterange"
                  range-separator="至"
                  format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="职称">
            <el-input v-model="queryFrom.test"></el-input>
          </el-form-item>
          <el-form-item label="职务">
           <el-select v-model="queryFrom.test" placeholder="请选择">
             <el-option label="区域一" value="shanghai"></el-option>
             <el-option label="区域二" value="beijing"></el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="所学专业">
           <el-select v-model="queryFrom.test" placeholder="请选择">
             <el-option label="区域一" value="shanghai"></el-option>
             <el-option label="区域二" value="beijing"></el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="从事相关工作年份">
             <el-date-picker
                  v-model="queryFrom.test"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="queryFrom.test"></el-input>
          </el-form-item>
          <el-form-item label="qq号">
            <el-input v-model="queryFrom.test"></el-input>
          </el-form-item>
          <div class="block-title t_left_line">单位信息</div>
          <el-form-item label="单位名称">
            <el-input v-model="queryFrom.test"></el-input>
          </el-form-item>
          <el-form-item label="单位地址">
            <el-select v-model="queryFrom.test" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员类型">
            <el-select v-model="queryFrom.test" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业类别">
            <el-select v-model="queryFrom.test" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="bottom-btn-block">
        <el-button size="mini" @click='$router.back()'>取消</el-button>
        <el-button size="mini" type="primary">完成</el-button>
      </div>
    </el-col>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        queryFrom: {
          test: ""
        }
      }
    }
  }
</script>

<style lang="scss">
  .person-detail-pages {
    .block-title {
      padding-left: 10px;
      margin-bottom: 12px;
    }

    .bottom-btn-block {
      margin-top: 60px;
      text-align: center;
    }

    .input-wrap {
      background-color: #fff;
      padding: 32px 20px;
    }
  }
</style>
