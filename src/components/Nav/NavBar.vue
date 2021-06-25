
<template>
    <div id="navbar">
        <div id="menu">
            <el-menu
                    :default-active="1"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#222222"

                    text-color="#999999"
                    active-text-color="#6FC3AC"
            >
                <el-menu-item index="1">
                    <i class="el-icon-s-data"></i>
                    首页</el-menu-item>
                <template v-if="this.$utils.isLoggedIn()">
                    <el-menu-item index="2" >
                        <i class="el-icon-message"></i>
                        消息中心</el-menu-item>
                    <el-menu-item index="3"  >
                        <i class="el-icon-location"></i>
                        地图</el-menu-item>
                    <el-menu-item index="4" >
                        <i class="el-icon-odometer"></i>
                        设备管理</el-menu-item>
                </template>
                <div id="user">
                    <div id="userInfo" v-if="this.$utils.isLoggedIn()">
                        <el-dropdown @command="onDropdownItemClicked">
                            <el-button type="primary"
                                       icon="el-icon-user-solid"
                            >
                                用户<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="info">
                                        <i class="el-icon-s-custom"></i>
                                        用户信息</el-dropdown-item>
                                    <el-dropdown-item command="logout">
                                        <i class="el-icon-back"></i>
                                        登出</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div id="regAndLogin" v-else>
                        <el-button type="primary" @click="gotoRegisterPage">注册</el-button>
                        <el-button type="primary" @click="gotoLoginPage">登录</el-button>
                    </div>
                </div>
            </el-menu>
        </div>

    </div>


</template>

<script>
    import utils from "../../Common/utils";

    export default {
        name:"NavBar",
        data() {
            return {
                pageRouteDict:{
                    "1":"/",
                    "2":"/messages",
                    "3":"/map",
                    "4":"/devices",
                }
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$parent.Goto(this.pageRouteDict[key])
                console.log(key + keyPath);
            },
            gotoLoginPage(){
                this.$parent.Goto('/login')
            },
            gotoRegisterPage(){
                this.$parent.Goto('/register')
            },
            onDropdownItemClicked(item){
                switch (item) {
                    case "info":
                        this.gotoUserInfoPage();
                        break;
                    case "logout":
                        this.logOut();
                        break;
                    default:break;
                }
            },
            gotoUserInfoPage(){

            },
            logOut(){
                alert("??")
                utils.clearLoginInfo();
                this.$router.push('/login')
            }
        }
    }
</script>

<style>
    #user{
    position: absolute;
    right: 0;
    width: 300px;
    padding: 10px;
}
</style>
