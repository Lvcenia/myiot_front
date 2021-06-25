
<template>
    <el-row type="flex" align="middle" style="min-height: 15vh">
        <el-col :span="24" style="font-size: xx-large" align="middle">
            <i class="el-icon-message"></i>
            消息中心
        </el-col>
    </el-row>
    <el-row type="flex" align="middle" style="justify-content: center">
            <el-input
                    style="width: 60%"
                    v-model="search"
                    placeholder="输入关键字搜索"/>
    </el-row>

    <el-row type="flex" align="middle" style="justify-content: center;margin-top: 8vh">
        <el-table
                border
                :row-class-name="tableRowClassName"
                :data="getFilteredData()"
                style="width: 75%">
            <el-table-column
                    label="时间"
                    sortable
                    prop="timestamp">
            </el-table-column>
            <el-table-column
                    label="设备id"
                    sortable
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="设备名称"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="经度"
                    prop="lng">
            </el-table-column>
            <el-table-column
                    label="纬度"
                    prop="lat">
            </el-table-column>
            <el-table-column
                    label="消息值"
                    prop="value">
            </el-table-column>
            <el-table-column
                    label="告警状态"
                    prop="isAlert">
            </el-table-column>
            <el-table-column
                    allign="right">
                <template #header>
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
                <template #default="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>


</template>

<script>
    export default {
        name:"Messages",
        data() {
            return {
                tableData: [{
                    timestamp: '2016-05-02',
                    name: '王小虎',
                    id: 'device 1',
                    lng:117.654124,
                    lat:32.5541541,
                    value:65,
                    isAlert:false
                },{
                    timestamp: '2016-05-02',
                    name: '王小虎',
                    id: 'device 1',
                    lng:117.654124,
                    lat:32.5541541,
                    value:65,
                    isAlert:true
                },{
                    timestamp: '2016-05-02',
                    name: '王小虎',
                    id: 'device 1',
                    lng:117.654124,
                    lat:32.5541541,
                    value:65,
                    isAlert:false
                }],
                search: ''
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            tableRowClassName({row, rowIndex}) {
                console.log(rowIndex)
                if (row.isAlert) {
                    return 'alertRow';
                } else  {
                    return '';
                }
            },
            getFilteredData(){
                return this.tableData.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
            }
        },
    }
</script>

<style>
    .el-table .alertRow{
        color: #ffffff;
    background-color: #ea7978;
}
</style>
