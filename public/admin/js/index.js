var myChart = echarts.init(document.getElementById('table-left'))

var option = {
  title: {
    text: '2019年注册人数'
  },
  tooltip: {},
  legend: {
    data: ['注册人数']
  },
  xAxis: {
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {},
  series: [
    {
      name: '注册人数',
      type: 'bar',
      data: [50, 200, 360, 100, 100, 200]
    }
  ]
}

myChart.setOption(option)

echarts.init(document.getElementById('table-right')).setOption({
  title: {
    text: '热门品牌销售情况',
    subtext: '2019年5月',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['阿迪王', '回力', '邦威', '361', '新百伦']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '阿迪王' },
        { value: 310, name: '回力' },
        { value: 234, name: '邦威' },
        { value: 135, name: '361' },
        { value: 1548, name: '新百伦' }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
