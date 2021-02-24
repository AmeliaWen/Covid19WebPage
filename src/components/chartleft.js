import React from 'react';
//import styles from '@/pages/map.css';
import styles from '../components/chartleft.less';
import stylec from '../components/common.less';

class chartleft extends React.Component{
  componentWillMount() {
  }
  render(){
    return(
      <div className={styles.chartleft}>
        <div className={stylec.title}>
          <span className={stylec.font}>重点省份疫情</span>
          <img style={{width: 340}} src="/img/ksh33.png"/>
        </div>
        <div className={styles.visualchart}>
          <a>省份</a>
          <a>新增确诊</a>
          <a>现有确诊</a>
          <div className={styles.pos_box}>
            <div className={styles.box}>
              <label>
                <img src="/img/ksh35.png"/>
                上海
              </label>
              <div className={styles.smallbox}>
                <div className={styles.ygl}>
                  5
                </div>
              </div>
              <div className={styles.smallbox}>
                <div className={styles.ygh}>
                  16
                </div>
              </div>
            </div>
            <div className={styles.box}>
              <label>
                <img src="/img/ksh35.png"/>
                北京
              </label>
              <div className={styles.smallbox}>
                <div className={styles.ygl}>
                  1
                </div>
              </div>
              <div className={styles.smallbox}>
                <div className={styles.ygh}>
                  2
                </div>
              </div>
            </div>
            <div className={styles.box}>
              <label>
                <img src="/img/ksh35.png"/>
                福建
              </label>
              <div className={styles.smallbox}>
                <div className={styles.ygl}>
                  1
                </div>
              </div>
              <div className={styles.smallbox}>
                <div className={styles.ygh}>
                  4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }



}
export default chartleft;
