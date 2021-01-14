<template>
    <div>
        <!-- 共二级嵌套 -->
        <router-view v-if="$route.meta.level===2"></router-view>
        <div v-else-if="$route.meta.level===1">
            <div class="search-bar pb16">
                <el-form label-width="100px">
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
                            <el-form-item label="所属子系统：">
                                <el-select v-model="queryForm.systemId" placeholder="请选择所属子系统" clearable>
                                    <el-option :label="item.value" :value="item.code" v-for="item in systemTypeList"
                                               :key="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
                            <el-form-item label="角色名称：">
                                <el-input v-model="queryForm.roleName" placeholder="请输入角色名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
                            <el-button type="primary" class="ml24" @click="toQuery">查询</el-button>
                            <el-button type="success" class="ml24 add-btn" @click="addItem(ACTION.ADD)">新增</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="table-wrapper">
                <el-table :data="data"
                          v-loading="loading"
                          :element-loading-text="loadingText"
                          :element-loading-spinner="loadingType"
                          :element-loading-background="loadingBg"
                          :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                    <el-table-column prop="roleName" label="角色名称" min-width="100" align="center">
                        <!--            <template slot-scope="scope">-->
                        <!--              {{scope.row.systemName}}-{{scope.row.roleName}}-->
                        <!--            </template>-->
                    </el-table-column>
                    <el-table-column prop="systemName" label="所属子系统" min-width="100" align="center"></el-table-column>
                    <el-table-column prop="needCheck" label="是否需要监督员审核" min-width="100" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.needCheck===1">是</span>
                            <span v-else>否</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="roleDescribe" label="说明" min-width="100"   show-overflow-tooltip align="center"></el-table-column>
<!--                    <el-table-column prop="operation" label="操作" width="160" align="center" fixed="right">-->
<!--                        <template slot-scope="scope">-->
<!--                            <span class="action" v-permission="'38010100020'" @click="showDetail(ACTION.REVIEW, scope.row)">查看</span>-->
<!--                            <span class="action" v-permission="'38010100030'" @click="showDetail(ACTION.EDIT, scope.row)">修改</span>-->
<!--                            <span class="delete" v-permission="'38010100040'" slot="reference" @click="deleteItem(scope.row)">删除</span>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                </el-table>
            </div>
            <!--分页组件-->
            <div style="margin-top: 15px;
        text-align: right;">
                <el-pagination :total="total" background :current-page="queryForm.page" style="margin-top: 0;"
                               layout="total,  sizes, prev, pager,next,jumper"
                               @size-change="sizeChange" @current-change="pageChange" :page-size="queryForm.size"/>
            </div>
        </div>
    </div>
</template>

<script>
    import initData from "../../../mixins/initData"
    import common from "../../../mixins/common"
    import * as roleApi from "../../../api/system/role";
    import {
        ACTION
    } from "../../../mixins/dictionary"
    import {
        Message
    } from "element-ui";

    export default {
        mixins: [initData, common],
        data() {
            return {
                data: [],
                total: 0,
                ACTION: ACTION,
                loading: false,
                queryForm: {
                    page: 1,
                    size: 10
                },
            }
        },
        created() {
            this.getList();
            // this.getSystemType();
        },
        watch: {
            $route(to, from) {
                const {name} = from;
                if (name === 'role/detail') {
                    this.getList();
                }
            }
        },
        methods: {
            async getList() {
                this.loading = true;
                const {
                    professionCode
                } = this.queryForm;
                let code = '';
                if (professionCode) {
                    code = professionCode.map(s => {
                        return s[s.length - 1]
                    }).join(',');
                }
                const res = await roleApi.getList({
                    ...this.queryForm,
                    professionCode: code
                });
                if (res) {
                    const {totalRecords, datas} = res;
                    this.total = totalRecords;
                    this.data = datas;
                    setTimeout(() => {
                        this.loading = false;
                    }, 280)
                }
            },
            toQuery() {
                this.queryForm = {
                    ...this.queryForm,
                    page: 1
                };
                this.getList()
            },
            toRest() {
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
            addItem(action) {
                this.$router.push(`/system/role/detail?action=${action}`)
            },
            showDetail(action, item) {
                this.$router.push(`/system/role/detail?action=${action}&id=${item.roleId}&systemId=${item.systemId}`)
            },
            deleteItem(item) {
                this.$confirm('删除该信息不可逆，是否确定将该信息删除?', '确定要删除吗', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    roleApi.deleteItem({
                        roleId: item.roleId,
                        systemId: item.systemId
                    }).then(res => {
                        if (res) {
                            this.getList();
                            Message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }
                    })
                }).catch(() => {

                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
