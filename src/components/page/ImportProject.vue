<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 项目管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>上传项目管理文件</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="content-title">项目文件导入说明：</div>
            <div class="plugins-tips">
                导入项目管理文件，参考样例：
                <a
                    href="http://element.eleme.io/#/zh-CN/component/upload"
                    target="_blank"
                >项目文件模板</a>
            </div>
            <div class="plugins-tips">
                导入文件必须是.xlsx格式，非此格式将无法正常运行程序
            </div>
            <div class="plugins-tips">
                使用过程中注意选择类型：项目库全部删除并重新增加或项目只根据项目立项号作为条件进行更新；
            </div>
            <ele-import
                :fields="fields"
                :filepath="filepath"
                :append="append"
                :formatter="formatter"
                :requestFn="requestFn"
                :rules="rules"
                :tips="tips"
                :title="title"
                :visible.sync="visible"
                @close="handleCloseImport"
                @finish="handleFinishImport"
            />
            <el-button @click="handleOpen" type="primary">开始导入项目数据</el-button>
        </div>
    </div>
</template>

<script>
// 局部引入
// 局部引入
import EleImport from 'vue-ele-import';
import { rs_importproject } from '../../api/index';
export default {
    name: 'App',
    components: {
        EleImport
    },
    data() {
        return {
            // 弹窗的标题
            title: '导入项目信息',
            // 提示信息
            tips: ['项目名称必填', '客户名称必填', '项目号、合同号需尽可能完善'],
            // 假如数据库中是`name`字段, 而Excel模板列是`名字`, 就需要写成 name: '名字'
            // ele-import 内部会抛弃非定义在fields里的列
            fields: {
                projectsno: '项目号',
                contract_sno: '合同号',
                projectname: '项目名称',
                applytitle: '项目名称', //申请事项
                customername: '客户名称',
                customerid: '客户统一社会代码',
                projecttype: '项目类别',
                plannedstart: '开始日期',
                plannedend: '预计结束日期',
                contractcurrency: '币种',
                contractbudget: '合同总额',
                plancost: '项目成本预算',
                projectmanager: '项目负责人',
                status: '项目状态',
                projectprogress:'项目负责人确认的项目交付进度'
            },
            // formatter起到替换数据的作用
            formatter: {
                // 可以是对象, 在发送请求时, '深圳' 将被替换成 1, '广州' 被替换成 2
                projecttype: {
                    'A-gc': '工程',
                    'C-jjfa': '解决方案类',
                    'C-wb': '外包',
                    'C-wh': '维护',
                    'A-yf': '研发',
                    'B-yfgc': '研发工程',
                    'A-zl': '战略'
                },
                status: {
                    '5': '未启动',
                    '10': '研发',
                    '15': '实施',
                    '20': '上线',
                    '25': '运维',
                    '50': '暂停',
                    '100': '已结项'
                }
            },
            // 附加数据, 在每条记录上都会加这两个字段和值
            append: {
                company: '港融科技'
            },
            // 参数校检, 和 element-ui 中 form表单中传递的rules一样, 都是使用的 async-validator 库
            // https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng
            rules: {
                projectname: { type: 'string', required: true, message: '项目名称必填' },
                contractbudget: [
                    { type: 'number', message: '合同金额必须为数字' },
                    { required: true, message: '合同金额必须填写' }
                ],
                
                plancost: [
                    { type: 'number', message: '项目成本必须为数字' },
                    { required: true, message: '项目成本必须填写' }
                ],
                projectprogress: [
                    { type: 'number', message: '项目进度必须为数字' },
                    { required: true, message: '项目进度必须填写' }
                ],
            },
            // Excel模板下载地址
            // 注意, 只能是.xlsx的文件, .xls或者.cvs都会报错
            filepath: 'https://raw.githubusercontent.com/dream2023/vue-ele-import/master/public/user.xlsx',
            // 控制弹窗, 和dialog的visible一样
            // https://element.eleme.cn/#/zh-CN/component/dialog
            visible: false
        };
    },
    methods: {
        // requestFn函数会被注入请求的数据
        // 需要返回一个Promise对象
        async requestFn(data) {
            console.log(data);
            rs_importproject(JSON.stringify(data)).then(res => {
                console.log(res);
                this.code = res.code;
                if (res.code == '0') {
                    this.$message.success('申请提交成功');
                    this.$router.push({ path: '/applyprojectdetail/', query: { appsno: res.appsno } });
                } else if (res.code == '-4') {
                    this.$message.error(res.msg);
                } else {
                    this.$message.error('系统错误');
                }
            });
            // 演示代码
            // 1、如果没有针对ele-import做过接口约定, 可以采用如下形式:
            // try {
            //   const res = await axios.post('/user', data)
            //   return Promise.resolve()
            // } catch (error) {
            //   // error经过一系列转化, 转为
            //   const errorData = this.getErrorMessage(error)
            //   {0:{ age: '年龄为数字', city: '城市必填'}, 2:{ age: '年龄为数字'} } // 0 和 2 分别是行号
            //   return Promise.reject(errorData)
            // }
            // 2、如果针对ele-import做过接口约定, 当校检错误时, 后端返回的 error 就是上述错误形式, 则可直接
            // return axios.post('/user', data)
            // 总结: 无论如何总要返回一个Promise对象
        },
        handleCloseImport() {
            console.log('弹窗关闭了~');
        },
        handleFinishImport() {
            console.log('导入完毕了~');
        },
        handleOpen() {
            this.visible = true;
        }
    },
    mounted() {}
};
</script>