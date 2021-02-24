import React from 'react';
import styles from '../components/myMap.less';
import { Button } from 'antd';
import { connect } from 'dva';
@connect(({  maps}) => ({
  maps
}))

class Button1 extends React.Component {
  componentDidMount() {

  }
  test(){
    //window.location.reload();
    let { dispatch } = this.props;
    dispatch({
      type: 'maps/save',
      payload: {
        code: 13000,
      },
    });
  }
  render() {
    return (
      <Button className={styles.button} onClick={this.test.bind(this)}></Button>
    );
  }
}
export default Button1;
