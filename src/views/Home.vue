<template>
  <div class="home">
    <el-row type="flex" align="middle" style="min-height: 15vh">
      <el-col :span="24" style="font-size: xx-large" align="middle">
        <i class="el-icon-s-data"></i>
        首页
      </el-col>
    </el-row>
    <el-row :gutter="12" id="infoCards">
      <el-col :span="8">
        <InfoCard title="设备总数" content="65"></InfoCard>
      </el-col>
      <el-col :span="8">
        <InfoCard title="在线设备数" content="955"></InfoCard>
      </el-col>
      <el-col :span="8">
        <InfoCard title="总消息数" content="65"></InfoCard>
      </el-col>
    </el-row>
    <div id="myChart"
         :style="{ width: '300px', height: '300px' }">
    </div>

  </div>

</template>

<script>
// @ is an alias to /src
import * as echarts from 'echarts'
import InfoCard from "../components/General/InfoCard";

export default {
  name: 'Home',
  components: {
    InfoCard

  },

  mounted() {
    //this.$root => app
    let myChart = echarts.init(
            document.getElementById("myChart")
    );
    // 绘制图表
    myChart.setOption({
      title: { text: "总用户量" },
      tooltip: {},
      xAxis: {
        data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
      },
      yAxis: {},
      series: [
        {
          name: "用户量",
          type: "line",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  },

}
</script>

<style>
  .home{
    margin: auto;
    width: 80%;
  }
</style>