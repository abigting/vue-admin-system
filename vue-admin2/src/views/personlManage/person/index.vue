<template>
  <div class="rygl-pages">
    <div class="top-from-block change-width">
      <el-form :inline="true" :model="queryForm" label-width="120px" class="left-input">
        <el-form-item label="姓名">
          <el-input v-model="queryForm.test" ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="queryForm.test" ></el-input>
        </el-form-item>
        <el-form-item label="审身份证号">
          <el-input v-model="queryForm.test"></el-input>
        </el-form-item>
        <el-form-item label="单位名称">
          <el-select v-model="queryForm.test" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员类型">
          <el-select v-model="queryForm.test" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业类别">
          <el-select v-model="queryForm.test" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="健康证状态">
          <el-select v-model="queryForm.test" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="queryForm.test" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="right-button">
        <el-button @click="toRest">重置</el-button>
        <el-button type="primary" @click="toQuery">查询</el-button>
      </div>
    </div>
    <div class="table-block">
     <el-table
        :data="data"
        style="width: 100%"
        v-loading="loading"
        :element-loading-text="loadingText"
        :element-loading-spinner="loadingType"
        :element-loading-background="loadingBg"
        align="center"
        :header-cell-style="{background:'#F5F7FB',color:'#606266'}"
      >
       <el-table-column prop="num" label="序号" fixed min-width="60" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+1+(params.page-1)*params.size}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardStatus" label="单位名称" min-width="100" align="center"></el-table-column>
       <el-table-column prop="cardNumber" label="专业" min-width="140" align="center"></el-table-column>
       <el-table-column prop="patientName" label="人员类型" min-width="100" align="center"></el-table-column>
       <el-table-column prop="patientName" label="姓名" min-width="100" align="center"></el-table-column>
       <el-table-column prop="patientName" label="手机号" min-width="100" align="center"></el-table-column>
       <el-table-column prop="patientName" label="身份证号" min-width="100" align="center"></el-table-column>
       <el-table-column prop="patientName" label="健康证" min-width="100" align="center"></el-table-column>
       <el-table-column prop="patientName" label="健康证有效期" min-width="100" align="center"></el-table-column>
       <el-table-column prop="patientName" label="是否审核" min-width="100" align="center"></el-table-column>
       <el-table-column prop="patientName" label="当前状态" min-width="100" align="center"></el-table-column>
       <el-table-column prop="operation" label="操作" min-width="120" align="center" fixed="right">
          <template slot-scope="scope">
           <span class="read-btn" @click="navTo('/personmanage/detail')">查看</span>
           <span>审核</span>
           <span>启用</span>
            <el-popconfirm title="确认撤销该病例？" @onConfirm="jy(scope.row)">
              <span class="del" slot="reference">禁用</span>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
     <!--分页组件-->
     <div style="margin-top: 15px;
        text-align: right;">
        <el-pagination
        :total="total"
        background
        :current-page="params.page"
        style="margin-top: 0px;"
        layout="total,  sizes, prev, pager,next,jumper"
        @size-change="sizeChange"
        @current-change="pageChange" :page-size="params.size" />
      </div>
    </div>
  </div>
</template>

<script>
  import initData from "@/mixins/initData";
  export default{
    mixins: [initData],
    data(){
      return{
        data:[{}],
        queryForm:{
          test:''
        },
      }
    },
    methods:{
      toQuery(){},
      toRest(){},
      navTo(path){
        if(path){
          this.$router.push(path)
        }
      }
    }
  }
</script>

<style lang="scss">
  .rygl-pages{
    .read-btn{
      color: dodgerblue;
      cursor: pointer;
    }
    .top-from-block{
      background-color: #fff;
      margin-bottom: 10px;
      padding: 12px 0;
      display: flex;
      .left-input{
        width: 90%;
      }
      .right-button{
        width: 10%;
        min-width: 160px;
      }
    }
    .table-block{
      background: #fff;
      padding: 10px;
    }
  }
</style>
