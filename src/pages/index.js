import styles from './index.css';
import map from './map.js'
import {connect} from 'dva';
import React from 'react';
const Products = ({ dispatch, products }) => {

 return(
   <div>
     <map/>
   </div>
   )

};
//export default Products;
export default connect(({ maps }) => ({
  maps,
}))(Products);

//export default function()
//{
 // return(
 //   <div className={styles.normal}>
 //    <h1>Page map</h1>
 //    <map />
 //   </div>
 // )
//};
/*export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            Getting Started
          </a>
        </li>
      </ul>
    </div>
  );
}
*/

