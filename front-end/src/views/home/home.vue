<template>
  <div class="echarts-box">
    <div id="myEcharts" :style="{ width: '100%', height: '700px' }"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";
import { getUserTotal } from '@/api/index'

onMounted(() => {
  // initChart();
  getData()
});

const getData = async () => {
  const res = await getUserTotal()
  const data = res.data
  // rer.data.reduce(function (prev, cur, index, arr) {
  //   return prev + cur.total;
  // }, 0);
  const xData = [], yData = []
  for (let i = 30; i > 0; i--) {
    xData.push(data[data.length - i].day)
    yData.push(data[data.length - i].total)
  }
  initChart(xData, yData);
}

// 基础配置一下Echarts
function initChart(xData, yData) {
  let chart = echarts.init(document.getElementById("myEcharts") as HTMLElement, "dark");
  // 把配置和数据放这里
  chart.setOption({
    title: {
      text: "近30天单日用户注册数变化趋势",
      top: "0",
    },
    legend: {
      top: "20",
      data: ["当日用户注册数"],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: "15%",
      left: "1%",
      right: "2%",
      bottom: "1%",
      containLabel: true,
    },
    xAxis: [{
      type: 'category',
      data: xData,
      axisTick: {
        alignWithLabel: true
      }
    }],
    yAxis: [{
      type: 'value',
      axisTick: {
        show: false
      }
    }],
    series: [{
      name: '当日用户注册数',
      type: 'line',
      stack: 'vistors',
      label: {
        show: true,
      },
      data: yData,
      animationDuration:600
    }]
  });
  window.onresize = function () {
    chart.resize();//自适应大小
  };
}

</script>

<style scoped lang="less"></style>