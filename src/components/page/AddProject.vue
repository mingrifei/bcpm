<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 项目审报
                </el-breadcrumb-item>
                <el-breadcrumb-item>新增项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div style="width:80%,padd-left:20%">
                <el-steps :active="0">
                    <el-step title="填写审报材料" description="请填写完成以下表单中所需信息"></el-step>
                    <el-step title="反馈审报提交状态" description="查看审报提交状态情况"></el-step>
                    <el-step title="邮件通知相关负责人" description="将项目审报情况发送给相关人员"></el-step>
                    <el-step title="保存申请单" description="将申请文件进行下载保存，方便工作备档"></el-step>
                </el-steps>
            </div>
            <el-form ref="form" :model="form" :rules="rules" label-width="180px">
                <div class="form-box">
                    <el-form-item label="申请类型" prop="applytype">
                        <el-input style="max-width:140px" v-model="form.applytype" placeholder="立项申请" readonly></el-input>无需修改
                    </el-form-item>                    
                    <el-form-item label="申请发起人" prop="applysubmiter">
                          <el-select
                            v-model="form.applysubmiter"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            :loading="loading">
                            <el-option
                            v-for="item in submiteroptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请事项" prop="applytitle">
                        <el-input style="max-width:400px" v-model="form.applytitle" placeholder="申请对XXX项目发起第1次立项评审"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称" prop="projectname">
                        <el-input style="max-width:340px" v-model="form.projectname" placeholder="XXX证券公司数据监管报送平台V1.0软件销售"></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称" prop="customername">
                        <el-input style="max-width:340px" v-model="form.customername" placeholder="请输入客户公司全称，方便后续统计"></el-input>
                    </el-form-item>
                    <el-form-item label="客户统一社会代码" prop="customerid">
                        <el-input style="max-width:240px" v-model="form.customerid" placeholder="请输入客户统一社会信用代码，百度天眼查"></el-input>
                    </el-form-item>
                    <el-form-item label="项目类别" prop="projecttype">
                        <el-select v-model="form.projecttype" placeholder="请选择">
                            <el-option key="gc" label="B类-工程类" value="A-gc"></el-option>
                            <el-option key="yf" label="A类-研发类" value="A-yf"></el-option>
                            <el-option key="zl" label="A类-战略类" value="A-zl"></el-option>
                            <el-option key="yfgc" label="B类-研发工程类" value="B-yfgc"></el-option>
                            <el-option key="wh" label="C类-维护类" value="C-wh"></el-option>
                            <el-option key="jjfa" label="C类-解决方案类" value="C-jjfa"></el-option>
                            <el-option key="wb" label="C类-外包类" value="C-wb"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预计开始日期" prop="plannedstart">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="开始日期"
                                v-model="form.plannedstart"
                                value-format="yyyy-MM-dd"
                                 style="max-width:140px"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                     <el-form-item label="预计结束日期" prop="plannedend">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="结束日期"
                                v-model="form.plannedend"
                                value-format="yyyy-MM-dd"
                                 style="max-width:140px"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                     <el-form-item label="项目合同预算" prop="currency">
                         <el-select style="max-width:140px" v-model="form.contractcurrency" placeholder="币种">
                            <el-option key="rmb" label="人民币" value="rmb"></el-option>
                            <el-option key="hkd" label="港币" value="hkd"></el-option>
                            <el-option key="usd" label="美元" value="usd"></el-option>
                        </el-select>
                     </el-form-item>
                     <el-form-item label="项目合同预算（元）" prop="contractbudget">                        
                        <el-input-number style="max-width:140px" v-model="form.contractbudget" placeholder="项目预算"></el-input-number>
                    </el-form-item>                   
                     <el-form-item label="拟投成本预算（元）" prop="plancost">                        
                        <el-input-number style="max-width:200px" v-model="form.plancost" placeholder="项目"></el-input-number>
                    </el-form-item>                   
                    <el-form-item label="拟任项目经理" prop="projectmanagerid">
                          <el-select
                            v-model="form.projectmanagerid"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            :loading="loading">
                            <el-option
                            v-for="item in submiteroptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>                    
                    <el-form-item label="项目评审次数">
                        <el-select style="max-width:200px" v-model="form.reviewcount" placeholder="请选择">
                            <el-option key="1" label="第1次" value="1"></el-option>
                            <el-option key="2" label="第2次" value="2"></el-option>
                            <el-option key="3" label="第3次" value="3"></el-option>
                            <el-option key="4" label="第4次" value="4"></el-option>
                            <el-option key="5" label="第5次" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请评审日期" prop="applyreviewdate">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="评审日期"
                                v-model="form.applyreviewdate"
                                value-format="yyyy-MM-dd"
                                 style="max-width:140px"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>

                </div>
                    <quill-editor v-model="form.reviewdoc" ></quill-editor>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()">提交申请</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>

            </el-form>           
        </div>
    </div>
</template>

<script>
    import { rs_addproject } from '../../api/index';
    import { rs_userlist } from '../../api/index';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'addproject',
    data() {
        return {  
            form: {
                applytype: '立项申请',
                applysubmiter: '刘松',
                applytitle:'申请对长江证券投资者报送产品销售项目立项评审',
                projectname:'长江证券投保基金报送平台V2.0',
                customername:'长江证券股份有限公司',
                customerid:'GD098889989898',
                projecttype:'A-gc',
                contractcurrency:'rmb',
                contractbudget:'1000000',
                plancost:'10000',
                projectmanager:'张三',
                reviewcount:'1',
                reviewdoc:'<table width="869"> <tbody> <tr> <td colspan="4" width="624">工作量估算表</td> <td width="244">人员预估</td> </tr> <tr> <td rowspan="2">里程碑</td> <td colspan="2" rowspan="2">工作描述</td> <td>工作量估算（人/日）</td> <td>&nbsp;</td> </tr> <tr> <td>最小工作量</td> <td>&nbsp;</td> </tr> <tr> <td rowspan="5">项目管理</td> <td colspan="2">软件开发计划</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">配置管理计划</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">软件测试计划</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">质量保证计划</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">项目实施计划</td> <td>1.5</td> <td>&nbsp;</td> </tr> <tr> <td rowspan="4">需求分析</td> <td colspan="2">需求调查</td> <td>2</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">需求分析</td> <td>1</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">需求文档</td> <td>5</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">需求确认</td> <td>1</td> <td>&nbsp;</td> </tr> <tr> <td rowspan="5">系统设计</td> <td colspan="2">体系结构设计</td> <td>5</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">数据模型设计</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">系统原型设计</td> <td>1</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">模块详细设计</td> <td>17.5</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">设计评审</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td rowspan="5">项目开发</td> <td colspan="2" width="287">效果设计</td> <td>1</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2" width="287">UI功能开发</td> <td>44</td> <td>2人*1月</td> </tr> <tr> <td colspan="2" width="287">服务层开发</td> <td>110</td> <td>前期开发5人*1月&nbsp;+开源改造数据库需求未确定，需求明确后再评估</td> </tr> <tr> <td colspan="2" width="287">系统整合</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2" width="287">代码评审</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td rowspan="8">系统测试</td> <td colspan="2">准备测试用例</td> <td>15</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">测试用例评审</td> <td>5</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">系统集成测试</td> <td>30</td> <td>系统测试 3人*2周</td> </tr> <tr> <td colspan="2">测试结果修改</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">测试方案</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">性能测试</td> <td>1</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">安全测试</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">测试报告</td> <td>0.5</td> <td>&nbsp;</td> </tr> <tr> <td rowspan="10">工程实施</td> <td colspan="2">系统部署</td> <td>10</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">取数口径确认</td> <td>30</td> <td>3人*2周</td> </tr> <tr> <td colspan="2">现场开发</td> <td>&nbsp;</td> <td>开源改造数据库需求未确定，需求明确后再评估</td> </tr> <tr> <td colspan="2">现场测试</td> <td>&nbsp;</td> <td>开源改造数据库需求未确定，需求明确后再评估</td> </tr> <tr> <td colspan="2">工程实施方案</td> <td>1</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">工程上线方案</td> <td>1</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">运维方案</td> <td>0.5</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">应急方案</td> <td>0.5</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">培训</td> <td>3</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2">实施人员驻场</td> <td>264</td> <td>12月16日正常运维一年</td> </tr> <tr> <td>一年维护</td> <td colspan="2">&nbsp;</td> <td>&nbsp;</td> <td>1人月</td> </tr> <tr> <td colspan="3">工作量总计（人/日）</td> <td>550.5</td> <td>&nbsp;</td> </tr> <tr> <td colspan="3">工作量总计（人/月）</td> <td>25</td> <td>&nbsp;</td> </tr> <tr> <td colspan="3">人力成本单价(元)</td> <td>￥25,000.00&nbsp;</td> <td>&nbsp;</td> </tr> <tr> <td colspan="3">人力总成本(元)</td> <td>￥625,000.00&nbsp;</td> <td>&nbsp;</td> </tr> <tr> <td colspan="2" rowspan="4">其它投入估算（元）</td> <td>交通费用</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td>会务费+商务费</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td>差旅费用</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td>其它费用</td> <td>0</td> <td>&nbsp;</td> </tr> <tr> <td colspan="3">成本预估（元）</td> <td>￥625,000.00&nbsp;</td> <td>&nbsp;</td> </tr> </tbody> </table>',
            },
            submiteroptions:[],
            projectmanageroption:[],
            options: [],
            value: [],
            list: [],
            allOrds:["Alabama", "Alaska"],
            loading: false,
            rules: {
                applytype: [{ required: true, message: '请输入申请类型', trigger: 'blur' }],
                applytitle: [{ required: true, message: '请输入申请标题', trigger: 'blur' }],
                applysubmiter: [{ required: true, message: '请输入申请发起人姓名', trigger: 'blur' }], 
            }                      
        };
    },
    components: {
        quillEditor
    },    
    mounted() {
          //this.initData();
          //远程搜索机构
          rs_userlist().then(resp => {
          //设置机构的选择项
          this.allOrds = resp.data;
          this.list = this.allOrds.map(item => { //组装，只需要id和name
              return {value: item[0], label: item[1]};
             });
          });

    },  
    methods: {

        onEditorChange({ editor, html, text }) {
                this.content = html;
            },
        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    rs_addproject(JSON.stringify(this.form)).then(res => {
                        console.log(res);
                        this.code = res.code;
                        if(res.code=='0'){
                            this.$message.success('申请提交成功');                       
                            this.$router.push({path:'/applyprojectdetail/',query:{appsno:res.appsno}});
                        }else if(res.code=='-4'){
                            this.$message.error(res.msg)
                        }else{
                            this.$message.error('系统错误')                           
                        }                       
                    });                    
                    
                } else {
                    this.$message.error('请完善立项申请相关材料再次提交');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        remoteMethod(query) {
            if (query !== '') {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.submiteroptions = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
                this.projectmanageroption=this.submiteroptions
                console.log(this.submiteroptions)
            }, 200);
            } else {
            this.options = [];
            }
        },
    },
};
</script>