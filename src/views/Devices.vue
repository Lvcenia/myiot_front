<template>
    <el-row type="flex" align="middle" style="min-height: 15vh">
        <el-col :span="20" style="font-size: xx-large" align="middle">
            <i class="el-icon-odometer"></i>
                查看和管理所有设备
        </el-col>
        <el-col :span="4">
            <el-button id="newDeviceButton" type="primary" @click="dialogVisible = true">新增设备</el-button>
        </el-col>
    </el-row>

    <div class="cardList">
        <el-row v-for="row of reformattedDeviceList()" v-bind:key="row">
            <el-col v-for="device of row" v-bind:key="device"  :span="8">
                <DeviceCard :device="device"></DeviceCard>
            </el-col>
        </el-row>
    </div>

    <el-dialog
            title="提示"
            v-model="dialogVisible"
            width="30%"
            :before-close="handleClose">
<span>?</span>
        <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
        </template>
    </el-dialog>




</template>

<script>
    import DeviceCard from "../components/Device/DeviceCard";
    export default {
        name:"Devices",
        components: {DeviceCard},
        data() {
            return {
                dialogVisible: false,
                colNum:3,
                allDevices:[
                    {
                        id:"6554",
                        name:"65544"
                    },
                    {
                        id:"6554",
                        name:"65544"
                    },
                    {
                        id:"6554",
                        name:"65544"
                    },
                    {
                        id:"6554",
                        name:"65544"
                    },                    {
                        id:"6554",
                        name:"65544"
                    },
                    {
                        id:"6554",
                        name:"65544"
                    },
                ]
            };
        },
        mounted() {
            this.requestDeviceList();
        },
        methods: {
            requestDeviceList(){
                this.$axios.get(this.Server + "/api/device/list",{
                    }
                    ).then((res)=>{
                    console.log(res.data);
                    if(res.data["code"] === 0){
                        this.allDevices = res.data.data;
                    }else{
                        alert("获取设备列表失败")
                    }
                }).catch(error => {
                    alert('出现错误，请重试\n' + error);
                    this.waitingForLoginRes = false;

                });

            },
            reformattedDeviceList(){
                let res = [];
                for(let i = 0;i< this.allDevices.length;++i){
                    if(i % this.colNum !== 0){
                        res[res.length-1].push(this.allDevices[i])
                    }else {
                        res.push([]);
                        res[res.length-1].push(this.allDevices[i])
                    }
                }
                return res;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        console.log(_)
                        done();
                    })
                    .catch(_ => {
                        console.log(_)});
            }
        }
    };
</script>

<style scoped>
    #newDeviceButton{
        right: 50px;
    }
    .cardList{
        margin: auto;
        width: 80%;
    }
</style>