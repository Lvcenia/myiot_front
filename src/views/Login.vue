<template>
    <div>
        <el-row style="height: 90vh">
            <el-card class="loginCard" shadow="hover" body-style="{ margin-top: 25%;
height: 50%; }">
                <el-row id="loginTitle">
                    MyIOT-登录
                </el-row>
                <el-divider></el-divider>
                    <el-form :model="loginForm" :rules="rules" ref="loginForm"
                             label="top"
                             style="margin: 0 10% 10% 10%"
                    >
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="loginForm.username" placeholder="用户名或邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="你的密码"></el-input>
                        </el-form-item>
                        <el-form-item style="margin-top: 8vh">
                            <el-row>
                                <el-col :span="12">
                                    <el-button type="primary"
                                               @click="submitForm('loginForm')"
                                               class="loginPageButton"
                                                :disabled="waitingForLoginRes"
                                    >登录</el-button>
                                </el-col>
                                <el-col :span="12">
                                    <el-button @click="gotoRegisterPage" class="loginPageButton">注册</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-form>


            </el-card>
        </el-row>

    </div>
    

</template>

<script>
    import utils from "../Common/utils";

    export default {
        name:"Login",
        data() {
            return {
                waitingForLoginRes:false,
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入您的用户名', trigger: 'blur' },
                        { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入您的密码', trigger: 'change' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.waitingForLoginRes = true;
                        this.$axios.post(this.Server + "/api/login",
                            this.loginForm,
                            {
                            }).then((res)=>{
                            this.waitingForLoginRes = false;
                            console.log(res.data);
                            let token = res.data.data.body.token
                            let user = res.data.data.body.username
                            utils.saveUserToStorage(user,token)
                            this.$router.push('/')

                        }).catch(error => {
                            alert('账号或密码错误');
                            this.waitingForLoginRes = false;
                            console.log(error);
                        });
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
    .loginPageButton{
        width: 80%;
        min-height: 45px;
        margin: 0 10%;
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
