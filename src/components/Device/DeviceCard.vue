<template>
    <el-card class="DeviceCard" shadow="hover">
        <el-row >
            <el-col class="CardTitle" :span="12">
                <i class="el-icon-odometer"></i>
                {{device.name}}
            </el-col>
            <el-col :span="12">
                <el-col :span="12">
                    <el-button class="DeviceEditButton" @click="emitModeChange">
                        {{editButtonText}}
                    </el-button>
                </el-col>
                <el-col v-if="isEditing" :span="12">
                    <el-button type="primary" @click="updateDeviceName">确认</el-button>
                </el-col>
            </el-col>
        </el-row>
            <el-form :model="curDevice" class="demo-form-inline">
                <el-form-item label="设备ID">
                    <el-row>{{curDevice.id}}</el-row>
                </el-form-item>
                <el-form-item label="设备创建时间">
                    <el-row>{{curDevice.createTime}}</el-row>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-input :disabled="!isEditing" v-model="curDevice.name" :placeholder="curDevice.name"></el-input>
                </el-form-item>
            </el-form>

    </el-card>
</template>

<script>
    export default {
        name: "DeviceCard",
        props:['device'],
        emits:[
            'modeChanged'
        ],
        data(){
            return{
                curDevice:{
                    id:"d",
                    name:"d",
                    createTime:"d"
                },
                isEditing:false,
                editButtonText:"编辑"
            }
        },
        methods:{
            emitModeChange(){
                this.isEditing = !this.isEditing;
                this.onModeChanged(this.isEditing);
            },
            onModeChanged(cur){
                if(cur){
                    this.editButtonText = '取消'
                }
                else{
                    this.editButtonText = '编辑'
                }
            },
            updateDeviceName(){
                if(this.isEditing){
                    this.emitModeChange();
                }

            }
        }
    }
</script>

<style scoped>
.DeviceCard{
    margin: 5%;

}
</style>