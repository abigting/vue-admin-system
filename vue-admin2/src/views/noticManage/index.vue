<template>
  <div>
    <!-- 共二级嵌套 -->
    <router-view v-if="$route.meta.level===2"></router-view>
    <div v-else-if="$route.meta.level===1">
      <el-row>
        <el-col :span="24">
          <div style="text-align: right;padding-bottom: 10px;">
            <el-button type="primary" @click="addItem(ACTION.ADD)">新增</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="data"
        style="width: 100%"
        v-loading="loading"
        :element-loading-text="loadingText"
        :element-loading-spinner="loadingType"
        :element-loading-background="loadingBg"
        align="center"
        :header-cell-style="{color:'#333'}"
      >
        <el-table-column prop="title" label="通知标题" min-width="100" align="center"></el-table-column>
        <el-table-column prop="professionCode" label="接收人所在专业" min-width="100" align="center"></el-table-column>
        <el-table-column prop="userType" label="接收人"  min-width="100" align="center"></el-table-column>
        <el-table-column prop="messageUserType" label="短信通知人员"  min-width="100" align="center"></el-table-column>
        <el-table-column prop="noticeTime" label="通知时间"  min-width="100" align="center"></el-table-column>
        <el-table-column prop="operation" label="操作" min-width="120" align="center" fixed ="right">
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
</template>

<script>
  import initData from "@/mixins/initData"
  import * as noticmanageApi from "@/api/noticManage"
  import { ACTION}  from "@/mixins/dictionary"
  import {Message} from "element-ui";

  export default{
    mixins: [initData],
    data(){
      return{
        data:[],
        total: 0,
        ACTION:ACTION,
        loading: false,
        queryForm:{
          page: 1,
          size: 10
        },
      }
    },
    created() {
      this.getList();
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
        const res = await noticmanageApi.getList({...this.queryForm, professionCode: code});
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
        this.$router.push(`/noticmanage/detail?action=${action}`)
      },
      showDetail(action, item) {
        this.$router.push(`/noticmanage/detail?action=${action}&id=${item.id}`)
      },
      deleteItem(item) {
        noticmanageApi.deleteItem({id: item.id}).then(res => {
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
.data-block-inline{
  display: inline-block;
}
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
