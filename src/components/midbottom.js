//import styles from '@/pages/map.css';
import Bchart1 from '@/components/bchart1';
import Bchart2 from '@/components/bchart2';
import Bchart3 from '@/components/bchart3';
import React from 'react';
import styles from '../components/midbottom.less';
class midbottom extends React.Component{
  componentDidMount() {
  }
  render() {
    return(
      <div className={styles.bottom}>
        <div className={styles.bottomleft}>
          <h3>当日新增</h3>
          <a style={{display: 'block'}}></a>
          <a>世界</a>
        </div>
        <div className={styles.bottomright}>
          <div className={styles.onechart}>
            <Bchart1/>
          </div>
          <div className={styles.onechart}>
            <Bchart2/>
          </div>
          <div className={styles.onechart}>
            <Bchart3/>
          </div>
        </div>
      </div>
    )
  }
}
export default midbottom;
