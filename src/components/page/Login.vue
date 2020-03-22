<template>
    <div class="login-wrap">
        <div class="ms-leftbgdiv"></div>
        <div class="logoDiv">
            <img src="../../assets/img/logo.png"/>
        </div>
        <div class="ms-login">
            <div class="ms-title">项目管理系统</div>
            <el-form :model="data" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="data.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="data.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 您可以使用公司邮件直接登录</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { rs_login } from '../../api/index';

export default {
    data: function() {
        return {
            data: {
                username: 'admin',
                password: 'admin',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                { type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    rs_login(JSON.stringify(this.data)).then(res => {
                        console.log(res);
                        this.code = res.code;
                        if(res.code=='0'){
                            this.$message.success('登录成功');
                            localStorage.setItem('ms_username', res.username);
                            localStorage.setItem('ms_nickname', res.nickname);
                            localStorage.setItem('ms_lastip', res.lastip);
                            localStorage.setItem('ms_lastlogin', res.lastlogin);                           
                            this.$router.push('/dashboard');
                            this.nickname = res.nickname;  
                        }else if(res.code=='-4'){
                            this.$message.error(res.msg)
                        }else{
                            this.$message.error('系统错误')
                            
                        }
                        
                    });                    
                    
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    /*background-image: url(../../assets/img/login-bg.jpg);*/
    background: #2d75af;
    background-size: 100%;
}
.logoDiv {
    position: absolute;
        left: 25%;
        top: 50%;
        width: 315px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        overflow: hidden;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-leftbgdiv{
    position: absolute;
    left: -10%;
    width: 60%;
    height: 100%;
    background-color: #d7eaf4;
    transform: skew(10deg);
}
.ms-login {
    position: absolute;
    left: 70%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>