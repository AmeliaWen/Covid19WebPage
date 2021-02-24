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
import {connect} from 'dva';
import stylec from '../components/common.less';
//import styles from '../pages/map.css';
@connect(({  maps }) => ({
  maps
}))
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.chart= null;
    this.data=[];
    for (let i =0;i<6;i++){
      this.data[i]= new Array();
    }
    //this.defaultHeadTab = [];
  }
  refreshData(data,myChart) {
    //刷新数据
    let option = myChart.getOption();
    option.series[0].data = data;
    myChart.setOption(option);
  }
  componentDidMount() {
    // 初始化
    //let data1 = new Array();
    //let data2 = new Array();
    let myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    //let data= this.props;
    //console.log(data);
    fetch('/data.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.data[0].push(data.china[0].already);
        this.data[1].push(data.china[0].almost);
        this.data[2].push(data.heilongjiang[0].already);
        this.data[3].push(data.heilongjiang[0].almost);
        this.data[4].push(data.harbin[0].already);
        this.data[5].push(data.harbin[0].almost);
        console.log(this.data[0]);
        myChart.setOption({
          //title: { text: '蒸发量与降水量' },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['确诊','疑似'],
            textStyle:{
              color: "#fff",
            }
          },
          toolbox: {
            show : true,
            feature : {
              dataView : {show: true, readOnly: true},
              magicType : {show: true, type: ['line', 'bar']},
              //restore : {show: true},
              saveAsImage : {
                show: true,
                type: 'jpg'
              }
            }
          },
          xAxis : [
            {
              type : 'category',
              data : ['4.15','4.23','5.1','5.9','5.17','5.25','6.2','6.10'],
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
            }
          ],
          yAxis : [
            {
              type : 'value',
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
            }
          ],
          series : [
            {
              name:'确诊',
              type:'bar',


              barGap: 0.5, //柱子之间间距 //柱图宽度      两种情况都要设置，设置series 中对应数据柱形的itemStyle属性下的emphasis和normal的barBorderRadius属性初始化时候圆角  鼠标移上去圆角

              itemStyle: {

                normal: {
                  barBorderRadius: 50,
                  color: "#446ACF",

                }

              },
              data: this.data[0][0],
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name: '平均值'}
                ]
              }
            },
            {
              name:'疑似',
              type:'bar',
              barGap: 0.5,
              itemStyle: {

                normal: { //设置颜色的渐变
                  barBorderRadius: 50,
                  color: "#4fb69d",

                }

              },
              data: this.data[1][0],
              markPoint : {
                data : [
                  {type : 'max', name: '最大值'},
                  {type : 'min', name: '最小值'}
                ]
              },
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            },
          ]
        });
        this.chart=myChart;
      })
    //console.log(data1[0]);
    //console.log(data2[0]);
  }
  componentDidUpdate(prevProps, prevState){
    let {maps:{data}} = this.props;
    if(prevProps.maps.data == data){
      //this.refreshData([2, 8, 3, 4, 10, 7, 7, 4],this.chart);
    }
    if(data == 13000){
      let data= this.data[2][0];
      this.refreshData(data,this.chart);
    }else if (data== 23010){
      let data= this.data[4][0];
      this.refreshData(data,this.chart);
    }
  }
  render() {
    return (
      <div className={styles.echart1}>
        <div className={stylec.title}>
          <span className={stylec.font}>全国新增确诊和疑似</span>
          <img style={{width: 340}} src="/img/ksh33.png"/>
        </div>
        <div id="main" className={styles.chart1} >
        </div>
      </div>
    );
  }
}

export default Test;


