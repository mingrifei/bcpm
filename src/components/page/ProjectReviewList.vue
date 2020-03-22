<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 项目评审
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!--
                <el-select v-model="query.applytype" placeholder="申请类型" class="handle-select mr10">
                        <el-option key="lxsq" label="立项申请" value="立项申请"></el-option>                  
                </el-select>
                <el-select v-model="query.projecttype" placeholder="项目类型" class="handle-select mr10">
                        <el-option key="gc" label="B类-工程类" value="A-gc"></el-option>
                        <el-option key="yf" label="A类-研发类" value="A-yf"></el-option>
                        <el-option key="yfgc" label="B类-研发工程类" value="B-yfgc"></el-option>
                        <el-option key="fw" label="C类-服务类" value="C-fw"></el-option>
                        <el-option key="zl" label="A类-战略类" value="A-zl"></el-option>                   
                </el-select>
                -->
                <el-input
                    style="max-width:200px"
                    v-model="query.applytitle"
                    placeholder="申请事项"
                    class="handle-input mr10"
                ></el-input>
                <el-input
                    v-model="query.applysubmiter"
                    placeholder="申请发起人"
                    style="max-width:140px"
                    class="handle-input mr10"
                ></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button
                    :loading="downloadLoading"
                    style="margin:0 0 20px 20px;"
                    type="primary"
                    icon="el-icon-document"
                    @click="handleDownload"
                >导出Excel</el-button>
            </div>
            <el-table
                :data="tableData"
                stripe
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                show-summary
                :summary-method="getSummaries"
                :default-sort="{prop: 'projectid', order: 'ascending'}"
            >
                <el-table-column type="selection" width="80" align="center"></el-table-column>
                <el-table-column sortable prop="projectid" label="序号" width="80">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <!--el-table-column label="申请时间" width="160">
                    <template slot-scope="scope">{{scope.row.applytime}}</template>
                </el-table-column>

                <el-table-column label="申请流水号" width="140">
                    <template slot-scope="scope">{{scope.row.apply_sno}}</template>
                </el-table-column>
                <el-table-column label="申请发起人" width="105">
                    <template slot-scope="scope">{{scope.row.nickname}}</template>
                </el-table-column-->

                <el-table-column sortable prop="projectsno" label="项目号" width="120">
                    <template style="max-width:120px" slot-scope="scope">{{scope.row.projectsno}}</template>
                </el-table-column>

                <el-table-column sortable label="项目名称">
                    <template slot-scope="scope">
                        <router-link
                            v-bind:to="'./applyprojectdetail/?appsno='+scope.row.applysno"
                        >{{scope.row.applytitle}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="projectmanager" label="项目经理" width="140">
                    <template slot-scope="scope">{{scope.row.projectmanager}}</template>
                </el-table-column>
                <el-table-column sortable prop="projectprogress" label="项目进度" width="160">
                    <template slot-scope="scope"><el-progress :percentage='scope.row.projectprogress*100' color="blue"></el-progress></template>
                </el-table-column>

                <el-table-column
                    prop="projecttype"
                    :filters="[{text: '工程', value: 'A-gc'},{text: '解决方案类',value:'C-jjfa'},{text: '外包', value: 'C-wb'},{text: '维护', value: 'C-wh'},{text: '研发', value: 'A-yf'},{text: '研发工程',value:'B-yfgc'},{text: '战略', value: 'A-zl'}]"
                    :filter-method="filterHandler"
                    :formatter="projecttypeformatter"
                    label="项目类型"
                    width="80"
                ></el-table-column>
                <el-table-column
                    sortable
                    prop="status"
                    :filters="[{text: '初始状态', value: '0'},{text: '立项通过',value:'1'},{text: '未启动', value: '5'},{text: '研发', value: '10'},{text: '实施', value: '15'},{text: '上线',value:'20'},{text: '运维',value:'25'},{text: '暂停', value: '50'},{text: '已结项', value: '100'}]"
                    :filter-method="filterHandler"
                    :formatter="statusformatter"
                    label="状态"
                    align="center"
                    width="95"
                ></el-table-column>
                <el-table-column
                    sortable
                    prop="contractbudget"
                    label="合同金额"
                    width="140"
                    align="right"
                >
                    <template slot-scope="scope">{{scope.row.contractbudget}}</template>
                </el-table-column>

                <el-table-column label="操作" width="90" align="left">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >评审结果</el-button>
                        <br />
                        <el-button
                            type="text"
                            icon="el-icon-lx-friendadd"
                            class="green"
                            @click="handlemembersmanage(scope.$index, scope.row)"
                        >成员管理</el-button>
                        <br />
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >取消评审</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"
                    :current-page="query.pageIndex"
                    :page-sizes="[10,25,50,100, 200, 300, 400]"
                    :page-size="50"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageTotal"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="评审结果记录" :visible.sync="editVisible" width="70%">
            <el-form ref="reviewrecord" :model="form" label-width="150px">
                <el-form-item label="项目编号">
                    <el-input style="max-width:320px" disabled v-model="reviewrecord.applysno"></el-input>
                </el-form-item>
                <el-form-item label="申请事项">
                    <el-input style="max-width:320px" disabled v-model="reviewrecord.applytitle"></el-input>
                </el-form-item>
                <el-form-item label="立项评审日期">
                    <el-col style="max-width:140px" :span="11">
                        <el-date-picker
                            type="date"
                            v-model="reviewrecord.reviewrecorddate"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;"
                        ></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="立项评审时间">
                    <el-input
                        style="max-width:320px"
                        v-model="reviewrecord.reviewrecordtime"
                        placeholder="现场会议2019/12/31 下午13:00-16:00/微信/邮件评审"
                    ></el-input>
                </el-form-item>
                <el-form-item label="立项评审项目名称">
                    <el-input
                        style="max-width:320px"
                        v-model="reviewrecord.reviewprojectname"
                        placeholder="XXXX基金报送平台V2.0"
                    ></el-input>
                </el-form-item>
                <el-form-item label="立项评审组成员">
                    <el-input
                        style="max-width:320px"
                        v-model="reviewrecord.reviewpanel"
                        placeholder="填写立项评审参者成员"
                    ></el-input>
                </el-form-item>

                <el-form-item label="立项评审结论">
                    <el-select v-model="reviewrecord.reviewstatus" placeholder="请选择">
                        <el-option key="1" label="立项通过" value="1"></el-option>
                        <el-option key="-1" label="未通过立项" value="-1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评审通过项目号">
                    <el-input
                        style="max-width:320px"
                        v-model="reviewrecord.reviewprojectno"
                        placeholder="例B2019123102"
                    ></el-input>
                </el-form-item>
                <el-form-item label="评审后项目负责人">
                    <el-input
                        style="max-width:320px"
                        v-model="reviewrecord.reviewprojectmanage"
                        placeholder="请填写项目核心负责人"
                    ></el-input>
                </el-form-item>
                <el-form-item label="预计投入人力">
                    <el-input-number
                        style="max-width:120px"
                        v-model="reviewrecord.reviewmanday"
                        placeholder="请填写评审后预计人力投入"
                    ></el-input-number>人日
                </el-form-item>
                <el-form-item label="预计开始时间">
                    <el-date-picker
                        type="date"
                        v-model="reviewrecord.reviewprojectstart"
                        value-format="yyyy-MM-dd"
                        style="max-width:140px"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="预计结束时间">
                    <el-date-picker
                        type="date"
                        v-model="reviewrecord.reviewprojectend"
                        value-format="yyyy-MM-dd"
                        style="max-width:140px"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="预计总成本(元)">
                    <el-input-number v-model="reviewrecord.reviewprojectcost"></el-input-number>
                </el-form-item>
                <el-form-item label="立项评审过程记录">
                    <el-input type="textarea" :rows="10" v-model="reviewrecord.reviewprojectrecord"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { rs_projectreviewlist } from '../../api/index';
import { rs_updateprojectreview } from '../../api/index';
import { rs_projectreviewdetail } from '../../api/index';
import { rs_deleteproject } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                projecttype: '',
                applytype: '',
                applytitle: '',
                applysubmiter: '',
                pageIndex: 1,
                pageSize: 50
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            currentPage: 1,
            form: {},
            idx: -1,
            id: -1,
            reviewrecord: {
                reviewrecorddata: ''
            },
            downloadLoading: false,
            list: null
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            rs_projectreviewlist(this.query).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.pageTotal = res.pageTotal || 400;
            });
        },
        //项目状态

        statusformatter(row, column) {
            let status = row.status;
            if (status === '0') {
                return '初始状态';
            } else if (status === '1') {
                return '立项通过';
            } else if (status === '5') {
                return '未启动';
            } else if (status === '10') {
                return '研发';
            } else if (status === '15') {
                return '实施';
            } else if (status === '20') {
                return '上线';
            } else if (status === '25') {
                return '运维';
            } else if (status === '50') {
                return '暂停';
            } else if (status === '100') {
                return '已结项';
            } else {
                return '未知';
            }
        },
        //项目类型
        //[{text: '工程', value: 'A-gc'},{text: '解决方案类',value:'C-jjfa'},{text: '外包', value: 'C-wb'},{text: '维护', value: 'C-wh'},
        //{text: '研发', value: 'A-yf'},{text: '研发工程',value:'B-yfgc'},{text: '战略', value: 'A-zl'}]

        projecttypeformatter(row, column) {
            let projecttype = row.projecttype;
            if (projecttype === 'A-gc') {
                return '工程';
            } else if (projecttype === 'C-jjfa') {
                return '解决方案类';
            } else if (projecttype === 'C-wb') {
                return '外包';
            } else if (projecttype === 'C-wh') {
                return '维护';
            } else if (projecttype === 'A-yf') {
                return '研发';
            } else if (projecttype === 'B-yfgc') {
                return '研发工程';
            } else if (projecttype === 'A-zl') {
                return '战略';
            } else {
                return '未知';
            }
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        handleSizeChange(val) {
            this.$set(this.query, 'pageSize', val);
            this.getData();
            console.log(`每页 ${val} 条`);
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要将此立项信息删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    rs_deleteproject(JSON.stringify(row.applysno)).then(res => {
                        console.log(res);
                        this.code = res.code;
                        if (res.code == '0') {
                            this.getData();
                            this.$message.success('删除' + row.applytitle + '项目成功');
                        } else if (res.code == '-4') {
                            this.$message.error(res.msg);
                        } else {
                            this.$message.error('系统错误');
                        }
                    });
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.reviewrecord = row;
            this.editVisible = true;
            this.reviewrecord.applytitle=row.applytitle
            rs_projectreviewdetail(row.applysno).then(res => {
                console.log(res);
                this.code = res.code;
                if (res.code == '0') {
                    if (res.data.id != undefined) {
                        this.reviewrecord = res.data;
                    }
                } else if (res.code == '-4') {
                    this.reviewrecord = row;
                } else {
                    this.reviewrecord = row;
                }
            });
        },
        // 项目成员管理
        handlemembersmanage(index, row) {
            this.idx = index;
            this.reviewrecord = row;
            this.editVisible = true;
            this.reviewrecord.applytitle=row.applytitle
            rs_projectreviewdetail(row.applysno).then(res => {
                console.log(res);
                this.code = res.code;
                if (res.code == '0') {
                    if (res.data.id != undefined) {
                        this.reviewrecord = res.data;
                    }
                } else if (res.code == '-4') {
                    this.reviewrecord = row;
                } else {
                    this.reviewrecord = row;
                }
            });
        },


        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$refs.reviewrecord.validate(valid => {
                if (valid) {
                    rs_updateprojectreview(JSON.stringify(this.reviewrecord)).then(res => {
                        console.log(res);
                        this.code = res.code;
                        if (res.code == '0') {
                            this.getData();
                            this.$message.success('申请' + res.apply_title + '评审提交成功');
                        } else if (res.code == '-4') {
                            this.$message.error(res.msg);
                        } else {
                            this.$message.error('系统错误');
                        }
                    });
                } else {
                    this.$message.error('请完善立项申请相关材料再次提交');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //导出excel
        handleDownload() {
            this.downloadLoading = true;
            import('../../vendor/Export2Excel').then(excel => {
                const tHeader = ['编号', '项目立项号', '项目名称', '客户名称', '合同预算', '项目经理'];
                const filterVal = ['applysno', 'projectsno', 'applytitle', 'customername', 'contractbudget', 'projectmanager'];
                const list = this.tableData;
                const data = this.formatJson(filterVal,list);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: '项目情况表',
                    autoWidth: true,
                    bookType: 'xlsx'
                });
                this.downloadLoading = false;
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j]);
                    } else {
                        return v[j];
                    }
                })
            );
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //筛选
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        //合计
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    var intPart = Number(sums[index]).toFixed(0); // 获取整数部分
                    sums[index] = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                    sums[index] += '';
                } else {
                    sums[index] = '-';
                }
            });

            return sums;
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
