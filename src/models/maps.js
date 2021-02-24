import { routerRedux } from 'dva/router';
import queryString from 'querystring';
export default {
  namespace: 'maps',
  state: [],
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    add(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *pagejump({payload:{pageRouter,module}}, { call, put }) {
      yield put({
        type: 'save',
        payload: {module},
      });
      yield put(routerRedux.push(pageRouter));
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 监听路由的变化，请求页面数据
      return history.listen(({ pathname, search }) => {
        history.listen(location => {
          if (location.pathname.includes('app')) {
            dispatch({
              type: 'pagejump',
            });
          }
        });
      })
    }
  },
};
