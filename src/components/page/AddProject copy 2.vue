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
            <el-form ref="form" :model="form" :rules="rules" abel-width="180px">
                <div class="form-box">
                    <el-form-item label="申请类型" prop="applytype">
                        <el-input v-model="form.applytype" placeholder="立项申请" hidden='true' readonly></el-input>
                    </el-form-item>                    
                    <el-form-item label="申请发起人" prop="applysubmiter">
                        <el-input v-model="form.applysubmiter" placeholder="请输入申请发起人全称"></el-input>
                    </el-form-item>
                    <el-form-item label="申请事项" prop="applytitle">
                        <el-input v-model="form.applytitle" placeholder="申请对XXX项目发起第1次立项评审"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称" prop="projectname">
                        <el-input v-model="form.projectname" placeholder="XXX证券公司数据监管报送平台V1.0软件销售"></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称" prop="customername">
                        <el-input v-model="form.customername" placeholder="请输入客户公司全称，方便后续统计"></el-input>
                    </el-form-item>
                    <el-form-item label="客户统一社会代码" prop="customerid">
                        <el-input v-model="form.customerid" placeholder="请输入客户统一社会信用代码，百度天眼查"></el-input>
                    </el-form-item>
                    <el-form-item label="项目类型" prop="projecttype">
                        <el-select v-model="form.projecttype" placeholder="请选择">
                            <el-option key="gc" label="工程类" value="gc"></el-option>
                            <el-option key="yf" label="研发类" value="yf"></el-option>
                            <el-option key="yfgc" label="研发工程类" value="yfgc"></el-option>
                            <el-option key="fw" label="服务类" value="fw"></el-option>
                            <el-option key="zl" label="战略类" value="zl"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预计开始日期" prop="plannedstart">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="开始日期"
                                v-model="form.plannedstart"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
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
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>
                     <el-form-item label="项目合同预算" prop="currency">
                         <el-select v-model="form.agreementcurrency" placeholder="币种">
                            <el-option key="rmb" label="人民币" value="rmb"></el-option>
                            <el-option key="hkd" label="港币" value="hkd"></el-option>
                            <el-option key="usd" label="美元" value="usd"></el-option>
                        </el-select>
                     </el-form-item>
                     <el-form-item label="项目合同预算（元）" prop="projectcost">                        
                        <el-input v-model="form.projectcost" placeholder="项目"></el-input>
                    </el-form-item>                   
                     <el-form-item label="拟投成本预算（元）" prop="plancost">                        
                        <el-input v-model="form.plancost" placeholder="项目"></el-input>
                    </el-form-item>                   
                     <el-form-item label="拟任项目经理" prop="projectmanager">
                        <el-input v-model="form.projectmanager" placeholder="请输入拟备项目经理或负责人"></el-input>
                    </el-form-item>
                    <el-form-item label="项目评审次数">
                        <el-select v-model="form.projecttype" placeholder="请选择">
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
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                    </el-form-item>

                </div>
                
                    <!--quill-editor v-model="form.reviewdoc" ></quill-editor-->
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
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'addproject',
    data() {
        return {  
            form: {
                applysno: '',
               //reviewdoc:'评审材料'
            },
            rules: {
                applytitle: [{ required: true, message: '请输入申请标题', trigger: 'blur' }],
                applysubmiter: [{ required: true, message: '请输入申请发起人姓名', trigger: 'blur' }], 
            }                      
        };
    },
    components: {
        quillEditor
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    rs_addproject(this.form).then(res => {
                        console.log(res);
                        this.code = res.code;
                        if(res.code=='0'){
                            this.$message.success('申请提交成功');                       
                            this.$router.push('/');
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
    }
};
</script>