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
import styles from './midbottom.less';

class bchart2 extends React.Component {
  componentDidMount() {
    let shadowColor = '#374b86';
    let value = 80;
    let myChart = echarts.init(document.getElementById('bchart2'));
    let option5 = {
      tooltip:{
        trigger: 'item'
      },
      title: {
        //text: `${value}万辆`,
        text: `新增治愈`,
        subtext: '',
        left: 'center',
        top: 'center',//top待调整
        textStyle: {
          color: '#fff',
          fontSize: 16,
          fontFamily: 'PingFangSC-Regular'
        },
        subtextStyle: {
          color: '#ff',
          fontSize: 14,
          fontFamily: 'PingFangSC-Regular',
          top: 'center'
        },
        itemGap: -1//主副标题间距
      },

      series: [{
        name: 'pie1',
        type: 'pie',
        clockWise: true,
        radius: ['65%', '70%'],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        hoverAnimation: false,
        data: [{
          value: value,
          name: '新增治愈',
          itemStyle: {
            normal: {
              borderWidth: 8,
              borderColor: {
                colorStops: [{
                  offset: 0,
                  color: '#1d54f7' || '#00cefc' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#68eaf9' || '#367bec' // 100% 处的颜色
                }]
              },
              color: { // 完成的圆环的颜色
                colorStops: [{
                  offset: 0,
                  color: '#1d54f7' || '#00cefc' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#68eaf9' || '#367bec' // 100% 处的颜色
                }]
              },
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          }
        }, {
          name: 'gap',
          value: 100 - value,
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0
            }
          }
        }]
      }]
    }

    myChart.setOption(option5);
  }
  render() {
    return (
      <div id="bchart2" className={styles.chart1}></div>
    );
  }
}
export default bchart2;
