//import styles from '@/pages/map.css';
import React from 'react';
import styles from '../components/midtop.less';
import stylec from '../components/common.less';
class midtop extends React.Component {
  componentWillMount() {
  }
  render(){
    return(
      <div className={styles.top}>
        <div className={styles.top1}>
          <h3 className={stylec.font}>世界现有确诊</h3>
          <p>3341013</p>
          <div className={styles.top_smil}>
            +0.1%
          </div>
        </div>
        <div className={styles.top2}>
          <h3 className={stylec.font}>世界累计确诊</h3>
          <p>7541747</p>
          <div className={styles.top_smil}>
            +1%
          </div>
        </div>
        <div className={styles.top3}>
          <h4 className={stylec.font}>世界累计治愈</h4>
          <p>3781741</p>
          <div className={styles.top_smil}>+1% </div>
        </div>
        <div className={styles.top4}>
          <h4 className={stylec.font}>世界累计死亡</h4>
          <p>418993</p>
          <div className={styles.top_smil}>+1% </div>
        </div>
      </div>
    )
  }

}
export default midtop;
