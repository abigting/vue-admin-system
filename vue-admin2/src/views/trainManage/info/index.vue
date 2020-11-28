<template>
  <div>
    <!-- 共二级嵌套 -->
    <router-view v-if="$route.meta.level===2"></router-view>
    <div v-else-if="$route.meta.level===1">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="培训名称">
          <el-input v-model="queryForm.trainName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="培训类别">
          <el-select v-model="queryForm.trainType" placeholder="请选择" clearable>
            <el-option
              clearable
              v-for="item in trainType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员类型">
          <el-select v-model="queryForm.userType" placeholder="请选择" clearable>
            <el-option
              clearable
              v-for="item in userType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业类别">
          <el-cascader v-model="queryForm.professionCode"
                       :options="majorList"
                       :show-all-levels="false"
                       :props=customProps
                       collapse-tags></el-cascader>
        </el-form-item>
        <el-button @click="toRest">重置</el-button>
        <el-button type="primary" @click="toQuery">查询</el-button>
      </el-form>
      <el-col :span="24">
        <div style="text-align: right;padding-bottom: 10px;">
          <el-button type="primary" @click="addItem(ACTION.ADD)">新增</el-button>
        </div>
      </el-col>
      <div>
        <el-table
          :data="data"
          style="width: 100%"
          v-loading="loading"
          :element-loading-text="loadingText"
          :element-loading-spinner="loadingType"
          :element-loading-background="loadingBg"
          align="center"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column prop="num" label="序号" fixed min-width="60" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1+(params.page-1)*params.size}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="trainName" label="培训名称" min-width="100" align="center"></el-table-column>
          <el-table-column prop="trainType" label="培训类别" min-width="140" align="center"></el-table-column>
          <el-table-column prop="professionCode" label="专业类别" min-width="100" align="center"></el-table-column>
          <el-table-column prop="userType" label="人员类型" min-width="100" align="center"></el-table-column>
          <el-table-column prop="peopleCount" label="参与人数" min-width="100" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" min-width="100" align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" min-width="120" align="center" fixed="right">
            <template slot-scope="scope">
              <span class="action" @click="showDetail(ACTION.REVIEW, scope.row)">查看</span>
              <span class="action" @click="showDetail(ACTION.EDIT, scope.row)">编辑</span>
              <el-popconfirm title="确认删除？" @onConfirm="deleteItem(scope.row)">
                <span class="del" slot="reference">删除</span>
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
            :current-page="queryForm.page"
            style="margin-top: 0;"
            layout="total,  sizes, prev, pager,next,jumper"
            @size-change="sizeChange"
            @current-change="pageChange" :page-size="queryForm.size" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import initData from "@/mixins/initData";
  import commonData from "@/mixins/common"
  import { userType, ACTION, trainType}  from "@/mixins/dictionary"
  import * as infoApi from "@/api/trainManage/info"
  import {Message} from "element-ui";

  export default{
    mixins: [initData, commonData],
    data(){
      return{
        data:[],
        ACTION:ACTION,
        userType: userType,
        trainType: trainType,
        total: 0,
        loading: false,
        queryForm:{
          page: 1,
          size: 10
        },
        customProps: {
          expandTrigger: 'hover',
          label: 'professionName',
          value: 'professionCode',
          children: 'childList',
          // checkStrictly: true,
          multiple: true
        },
      }
    },
    watch: {
      $route(to,from){
        const {name} = from;
        if(name === 'info/detail'){
          this.getList();
        }
      }
    },
    created() {
      this.getList();
      this.getMajorList();
    },
    methods:{
      async getList() {
        this.loading = true;
        const {professionCode} = this.queryForm;
        let code = '';
        if (professionCode) {
          code = professionCode.map(s => {
            return s[s.length - 1]
          }).join(',');
        }
        const res = await infoApi.getList({...this.queryForm, professionCode: code});
        const {success, value} = res;
        if (success) {
          const {totalRecords, datas} = value;
          this.total = totalRecords;
          this.data = datas;
          setTimeout(() => {
            this.loading = false;
          }, 280)
        }
      },
      toQuery(){
        this.getList()
      },
      toRest(){
        this.queryForm = {
          page: 1,
          size: 10
        };
        this.getList();
      },
      sizeChange(val) {
        this.queryForm = {
          ...this.queryForm,
          size: val
        };
        this.getList();
      },
      pageChange(val) {
        this.queryForm = {
          ...this.queryForm,
          page: val
        };
        this.getList();
      },
      addItem(action){
        this.$router.push(`/trainmanage/info/detail?action=${action}`)
      },
      showDetail(action, item) {
        this.$router.push(`/trainmanage/info/detail?action=${action}&id=${item.id}`)
      },
      deleteItem(item) {
        infoApi.deleteItem({id: item.id}).then(res => {
          if (res) {
            this.getList();
            Message({
              message: '删除成功',
              type: 'success'
            });
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.look {
  width: 28px;
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(42, 152, 245, 1);
  line-height: 20px;
  cursor: pointer;
}
.del {
  width: 28px;
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(235, 107, 72, 1);
  line-height: 20px;
  margin-left: 10px;
  cursor: pointer;
}
.paging {
  width: 100%;
  padding-top: 16px;
  padding-bottom: 36px;
  position: relative;
  .el-pagination {
    position: absolute;
    right: 0;
  }
}

.el-col{
  padding-top: 4px;
  padding-bottom: 4px;
}

</style>
