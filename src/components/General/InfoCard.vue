<template>
    <el-card shadow="hover" class="infoCard" :header="title">
            <div class="numberInfo">
                {{content}}
            </div>
    </el-card>
</template>

<script>
    export default {
        name: "InfoCard",
        props:['title','content']
    }
</script>

<style scoped>
.infoCard{
    min-height: 25vh;
}
    .numberInfo{
        text-align: center;
        justify-content: center;
        margin: 0 0 0 0;
        font-size: 80px;
    }
</style>