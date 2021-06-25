
<template>
    <el-row type="flex" align="middle" style="min-height: 15vh">
        <el-col :span="24" style="font-size: xx-large" align="middle">
            消息中心
        </el-col>
    </el-row>

    <el-row type="flex" align="middle" style="justify-content: center">
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 75%">
            <el-table-column
                    label="Date"
                    prop="date">
            </el-table-column>
            <el-table-column
                    label="Name"
                    prop="name">
            </el-table-column>
            <el-table-column
                    align="right">
                <template #header>
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
                <template #default="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
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
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
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
            }
        },
    }
</script>

<style>

</style>
