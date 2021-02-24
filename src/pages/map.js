import {connect} from 'dva';
import styles from './map.css';
import MyMap from '../components/myMap';
import Test from '../components/echart1';
import React from 'react';
import Test2 from '@/components/echart2';
import PieB from '@/components/echart3';
import Test4 from '@/components/echartmap';
import Bchart1 from '@/components/bchart1';
import Bchart2 from '../components/bchart2';
import Bchart3 from '../components/bchart3';
//import Fchart from '../components/chartright';
import Chartleft from '../components/chartleft';
import Midtop from '../components/midtop';
import Midbottom from '../components/midbottom';
import Chartright from '../components/chartright';
import Button1 from '../components/Button1';
//import Test from '../components/echart.js';






const Products = ({products })=>{
  return(
    <div className={styles.bkg}>
      <div className={styles.header}>
        <span className={styles.fonth}>全世界新冠肺炎疫情数据显示模版</span>
      </div>
      <div className={styles.left}>
        <Test/>
        <Test2/>
        <Chartleft/>
      </div>
      <div className={styles.mid}>
        <Midtop/>
        <MyMap/>

        <Midbottom/>
      </div>
      <div className={styles.right}>
        <PieB/>
        <Test4/>
        <Chartright/>
      </div>
    </div>
  )
}

export default connect(({ products }) => ({
  products,
}))(Products);
