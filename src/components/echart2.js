import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import styles from '../components/echart.less';
import stylec from '../components/common.less';
//import styles from '../pages/map.css';
class Test2 extends React.Component {
  constructor(props) {
    super(props);

  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {

  }
  //let myChart=null;
  componentDidMount() {
    // 初始化
    let myChart = echarts.init(document.getElementById('main2'));
    // 绘制图表
    myChart.setOption({
      tooltip: {//鼠标指上时的标线
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['确诊', '中型车', '大型车'],
        right: '10px',
        top: '0px',
        textStyle: {
          fontSize: 12,
          color: '#fff'
        }
      },
      grid: {
        x: 35,
        y: 21,
        x2: 8,
        y2: 25,
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#57617B'
          }
        },
        axisLabel: {
          textStyle: {
            color:'#fff',
          },
        },
        data: ['4.16', '4.24', '5.2', '5.10', '5.18', '5.26', '6.3', '6.11']
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#57617B',

          }
        },
        axisLabel: {
          //margin: 10,
          textStyle: {
            color:'#fff',
            fontSize: 14
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.2)',
            type:'dotted',
          }
        }
      }],
      series: [{
        name: '确诊',
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(137, 189, 27, 0.3)'
            }, {
              offset: 0.8,
              color: 'rgba(137, 189, 27, 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(137,189,27)'
          }
        },
        data: [15,11,1,7,3,1,1,6]
      }, {
        name: '中型车',
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0, 136, 212, 0.3)'
            }, {
              offset: 0.8,
              color: 'rgba(0, 136, 212, 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(0,136,212)'
          }
        },
        data: [97.3,99.2,99.3,100.0,99.6,90.6,80.0,91.5,69.8,67.5,90.4,84.9]
      }, {
        name: '大型车',
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(219, 50, 51, 0.3)'
            }, {
              offset: 0.8,
              color: 'rgba(219, 50, 51, 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(219,50,51)'
          }
        },
        data: [84.2,81.0,67.5,62.1,43.7,68.5,51.9,71.8,76.7,67.6,62.9,0]
      }, ]
    });
      //title: { text: '某地区蒸发量和降水量' },

  }
  render() {
    return (
      <div className={styles.echart2}>
        <div className={stylec.title}>
          <span className={stylec.font}>境外输入病例</span>
          <img style={{width: 340}} src="/img/ksh33.png"/>
        </div>
        <div>
          <div id="main2" className={styles.chart2} ></div>
        </div>
      </div>

    );
  }
}

export default Test2;


