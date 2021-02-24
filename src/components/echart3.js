import React, { Component } from 'react'
import { Card } from 'antd'
//import styles from '../pages/map.css';
// import echarts from 'echarts'
//按需导入
// import echartTheme from '../echartTheme'
import echarts from 'echarts/lib/echarts'
//导入饼图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
//import ReactEcharts from 'echarts-for-react'
//引入样式
//import '../common.less'
import styles from '../components/echart.less';
import stylec from '../components/common.less';
export default class PieB extends Component {
  componentDidMount() {
    //环形图百分比
    let color = ['#e9df3d', '#f79c19', '#21fcd6', '#08c8ff', '#df4131'];
    let data = [{
      "name": "亚洲",
      "value": 30
    },
      {
        "name": "非洲",
        "value": 30
      },
      {
        "name": "欧洲",
        "value": 42
      },
      {
        "name": "美洲",
        "value": 50
      },
      {
        "name": "澳洲",
        "value": 34
      }
    ];

   let max = data[0].value;
    data.forEach(function(d) {
      max = d.value > max ? d.value : max;
    });

    let renderData = [{
      value: [],
      name: "告警类型TOP5",
      symbol: 'none',
      lineStyle: {
        normal: {
          color: '#ecc03e',
          width: 2
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
            [{
              offset: 0,
              color: 'rgba(203, 158, 24, 0.8)'
            }, {
              offset: 1,
              color: 'rgba(190, 96, 20, 0.8)'
            }],
            false)
        }
      }
    }];


    data.forEach(function(d, i) {
      let value = ['', '', '', '', ''];
      value[i] = max ;
        renderData[0].value[i] = d.value;
      renderData.push({
        value: value,
        symbol: 'circle',
        symbolSize: 12,
        lineStyle: {
          normal: {
            color: 'transparent'
          }
        },
        itemStyle: {
          normal: {
            color: color[i],
          }
        }
      })
    })
    let indicator = [];

    data.forEach(function(d) {
      indicator.push({
        name: d.name,
        max: max,
        color: '#fff'
      })
    })


    let option3 = {
      tooltip: {
        show: true,
        trigger: "item"
      },
      radar: {
        center: ["50%", "50%"],//偏移位置
        radius: "70%",
        startAngle: 40, // 起始角度
        splitNumber: 4,
        shape: "circle",
        splitArea: {
          areaStyle: {
            color: 'transparent'
          }
        },
        axisLabel: {
          show: false,
          fontSize: 20,
          color: "#000",
          fontStyle: "normal",
          fontWeight: "normal"
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255, 255, 255, 0.5)"
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255, 255, 255, 0.5)"
          }
        },
        indicator: indicator
      },
      series: [{
        type: "radar",
        data: renderData
      }]
    }
    let huan_val = document.getElementById("main3");
    let chart = echarts.init(huan_val);
    chart.setOption(option3);
  }

  render(){
  return(
    <div className={styles.echart3}>
      <div className={stylec.title}>
        <span className={stylec.font}>各洲确诊</span>
        <img style={{width: 340}} src="/img/ksh33.png"/>
      </div>
      <div>
        <div id="main3" className={styles.chart3}></div>
      </div>
    </div>

  )
  }


}
//export default PieB;
