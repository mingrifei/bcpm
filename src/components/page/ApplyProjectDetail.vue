<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 项目审报
                </el-breadcrumb-item>
                <el-breadcrumb-item>项目详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div style="width:80%,padd-left:20%">
                <el-steps :active="2">
                    <el-step title="填写审报材料" description="请填写完成以下表单中所需信息"></el-step>
                    <el-step title="反馈审报提交状态" description="查看审报提交状态情况"></el-step>
                    <el-step title="邮件通知相关负责人" description="将项目审报情况发送给相关人员"></el-step>
                    <el-step title="保存申请单" description="将申请文件进行下载保存，方便工作备档"></el-step>
                </el-steps>
            </div>
            <div class="form-box" ref="projectdetail" v-if="hiddenkey">
            <el-form ref="data" :model="tableData" label-width="280px">
                <el-form-item label="申请状态：">
                    <el-tag type="$tableData.status==='-1'?'success':($tableData.status==='0'?'danger':'')">{{tableData.status}}</el-tag>
                </el-form-item>                                      
                <el-form-item label="申请编号：">
                    <el-col>{{this.$route.query.appsno}}</el-col>
                </el-form-item>                                      
                    <el-form-item label="申请发起人：">
                    <el-col>{{tableData.apply_submiter}}</el-col>
                </el-form-item>    
                    <el-form-item label="申请事项：">
                    <el-col>{{tableData.apply_title}}</el-col>
                </el-form-item>    
                    <el-form-item label="申请类型：">
                    <el-col>{{tableData.apply_type}}</el-col>
                </el-form-item>    
                    <el-form-item label="项目名称：">
                    <el-col>{{tableData.apply_data.projectname}}</el-col>
                </el-form-item>    
                    <el-form-item label="客户名称：">
                    <el-col>{{tableData.apply_data.customername}}</el-col>
                </el-form-item>    
                    <el-form-item label="客户统一社会代码：">
                    <el-col>{{tableData.apply_data.customerid}}</el-col>
                </el-form-item>    
                    <el-form-item label="项目类型：">
                    <el-col>{{tableData.apply_data.projecttype}}</el-col>
                </el-form-item>    
                    <el-form-item label="预计开始日期：">
                    <el-col>{{tableData.apply_data.plannedstart}}</el-col>
                </el-form-item>    
                    <el-form-item label="预计结束日期：">
                    <el-col>{{tableData.apply_data.plannedend}}</el-col>
                </el-form-item>    
                    <el-form-item label="项目合同预算：">
                    <el-col>{{tableData.apply_data.contractcurrency}}</el-col><el-col>{{tableData.contractbudget}}</el-col>
                </el-form-item>    
                    <el-form-item label="拟投成本预算（元）：">
                    <el-col>{{tableData.apply_data.plancost}}</el-col>
                </el-form-item>  
                    <el-form-item label="拟任项目经理：">
                    <el-col>{{tableData.apply_data.projectmanager}}</el-col>
                </el-form-item>  
                    <el-form-item label="项目评审次数：">
                    <el-col>{{tableData.apply_data.reviewcount}}</el-col>
                </el-form-item>  
                    <el-form-item label="申请评审日期：">
                    <el-col>{{tableData.apply_data.applyreviewdate}}</el-col>
                </el-form-item>  
                    <el-form-item label="评审材料">
                    <p v-html="tableData.apply_data.reviewdoc" style="boder:1px">{{tableData.reviewdoc}}</p>
                </el-form-item>

            </el-form>
             </div>     
                    <el-button type="primary" @click="openSendEmail()">邮件通知相关负责人</el-button>
                    <el-button type="primary" @click="onDownload()">下载立项文件</el-button>
                    <el-button>取消</el-button>
                           
            

            <!-- 编辑弹出框 -->
            <el-dialog title="发送邮件" :visible.sync="sendEmailVisible" width="50%">
                <el-form ref="sendmailform" :model="sendmail" label-width="70px">
                    <el-form-item label="收件人：">
                        <el-input v-model="sendmail.emailaddress"></el-input>
                    </el-form-item>
                    <el-form-item label="抄送：">
                        <el-input v-model="sendmail.ccaddress"></el-input>
                    </el-form-item>
                    <el-form-item label="邮件标题">
                        <el-input v-model="sendmail.emailtitle"></el-input>
                    </el-form-item>
                    <el-form-item label="邮件正文">
                        <el-input hidden v-model="sendmail.emailcontent"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="sendEmailVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onsendEmail">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { rs_projectdetail } from '../../api/index';
    import { rs_sendprojectemail} from '../../api/index';
export default {
    name: 'applyprojectdetail',
    data() {
        return { 
            active:3,            
            tableData:{
                applytype:[],
                applysno:'',
                applysubmiter:[],
                applytitle:[],
                apply_data:{
                    projectname:'',
                    customername:'',
                    customerid:''
                    }
            },
            sendEmailVisible:false,
            hiddenkey:true,
            sendmail:
                {emailaddress:'grkjxmgl@163.com',emailtitle:'',emailcontent:''}
            
        };
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            rs_projectdetail(this.$route.query.appsno).then(res => {
                console.log(res);
                this.tableData = res.data;
                this.sendmail.emailtitle=res.data.apply_title;
            });
        },
        openSendEmail(){
            this.sendEmailVisible=true
            this.sendmail.emailcontent=this.$refs.projectdetail.outerHTML;
        },
        onsendEmail(){
            this.$refs.sendmailform.validate(valid => {
                if (valid) {
                    rs_sendprojectemail(JSON.stringify(this.sendmail)).then(res => {
                        console.log(res);
                        this.code = res.code;
                        if(res.code=='0'){
                            this.$message.success(res.msg);   
                            
                            this.sendEmailVisible=false
                            this.$parent.steps=3                
                            //this.$router.push({path:'/applyprojectdetail/',query:{appsno:res.appsno}});
                        }else if(res.code=='-1'){
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
        }

    },
    created(){
        this.getData()
    }
};
</script>