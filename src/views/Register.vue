<template>
    <div>
        <el-row style="height: 110vh">
            <el-card class="loginCard" shadow="hover" body-style="{ margin-top: 25%;
height: 50%; }">
                <el-row id="loginTitle">
                    MyIOT-注册
                </el-row>
                <el-divider></el-divider>
                <el-form :model="registerForm" :rules="rules" ref="ruleForm"
                         label="top"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="registerForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="passAgain">
                        <el-input type="password" v-model="registerForm.passAgain" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮件" prop="email">
                        <el-input type="email" v-model="registerForm.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 6vh">
                        <el-row>
                            <el-col :span="5">
                            </el-col>
                            <el-col :span="14">
                                <el-button type="primary" @click="submitForm" class="regPageButton">注册</el-button>
                            </el-col>
                            <el-col :span="5">
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    export default {
        name:"Register",
        data() {
            let checkEmail = (rule, value, callback) => {
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (!value) {
                    return callback(new Error('邮箱不能为空'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的邮箱格式'))
                    }
                }, 100)
            }
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                registerForm: {
                    username: '',
                    password: '',
                    passAgain:'',
                    email:'',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入您的用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入您的密码', trigger: 'change' }
                    ],
                    passAgain: [
                        { validator:validatePass2,required: true, message: '确认密码与密码不一致！', trigger: 'change' }
                    ],
                    email: [
                        { validator:checkEmail,required: true, message: '请输入合法的电子邮件地址', trigger: 'change' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        alert('您填写的用户名和密码不符合规范')
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            gotoRegisterPage() {
                this.$router.push('/register')
            }
        }
    }
</script>

<style scoped>
    .loginCard{
        margin-top: 2%;
        margin-bottom: 8%;
        margin-left: auto;
        margin-right: auto;
        width: 45%;
        min-height: 80%;
    }
    .regPageButton{
        width: 100%;
        min-height: 45px;
        margin: 0 auto;
    }
    #loginTitle{
        font-family: "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        align-items: center;
        justify-content: center;
        line-height: 1.5;
        font-size: 45px;
        margin-bottom: 2%;
        text-align: center;
        color: #445e59;
    }
</style>
