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
                    token:true
                },
                rules: {
                    username: [
                        { required: true, message: '请输入您的用户名', trigger: 'blur' },
                        { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入您的密码', trigger: 'change' },
                        { min: 8, max: 40, message: '长度在 8 到 40 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.waitingForLoginRes = true;
                        this.$axios.post(this.Server + "/api/user/login",
                            this.loginForm,
                            {
                            }).then((res)=>{
                            this.waitingForLoginRes = false;
                            console.log(res.data);
                            if(res.data["code"] === 0){
                                let token = res.data.data.token
                                let user = res.data.data["user_name"]
                                utils.saveUserToStorage(user,token)
                                alert("登陆成功！")
                                this.$router.go(0)

                            }else{
                                alert("用户名或密码错误，请重试")
                            }


                        }).catch(error => {
                            alert('出现错误，请重试\n' + error);
                            this.waitingForLoginRes = false;

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
