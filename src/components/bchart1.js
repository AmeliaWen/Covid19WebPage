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
import styles from '../components/midbottom.less';

class bchart1 extends React.Component {
  componentDidMount() {

    let shadowColor = '#374b86';
    let value = 85;
    let myChart = echarts.init(document.getElementById('bchart1'));
    let option6 = {
      tooltip:{
        trigger: 'item'
      },
      title: {
        //text: `${value}万辆`,
        text: `新增确诊`,
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
          name: '新增确诊',
          itemStyle: {
            normal: {
              borderWidth: 8,
              borderColor: {
                colorStops: [{
                  offset: 0,
                  color: '#02df94' || '#25d6bc' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#28d3d0' || '#14dbaa' // 100% 处的颜色
                }]
              },
              color: { // 完成的圆环的颜色
                colorStops: [{
                  offset: 0,
                  color: '#02df94' || '#25d6bc' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#28d3d0' || '#14dbaa' // 100% 处的颜色
                }]
              },
              label: {
                normal: {
                  show: true,
                  position: 'center',
                  text: value
                }

              },
              labelLine: {
                show: true
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
    myChart.setOption(option6);
  }
  render() {
    return (
      <div id="bchart1" className={styles.chart1}></div>
    );
  }
}
export default bchart1;
