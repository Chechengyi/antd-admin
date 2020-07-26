import { Effect } from 'dva'
import { Reducer } from 'redux'
import { login } from '../services/api'
import { routerRedux } from 'dva/router'

type LOGIN_STATUS = 'LOGIN' | 'NO_LOGIN' | 'ERROR';

export interface LoginModalState {
  loginStatus: LOGIN_STATUS;
  loading: boolean
}

export interface LoginModalType {
  namespace: 'login',
  state: LoginModalState,
  effects: {
    login: Effect;
    logout: Effect;
  },
  reducers: {
    saveLoginStatus: Reducer<LoginModalState>,
    changeLoading: Reducer<LoginModalState>,

  }
}

const loginModal: LoginModalType = {
  namespace: 'login',
  state: {
    loginStatus: 'NO_LOGIN',
    loading: false
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true
      });
      const res = yield call(login, payload);
      if (res.code === 'OK') {
        yield put({
          type: 'saveLoginStatus',
          payload: 'LOGIN'
        });
        yield put(routerRedux.replace('/cont'))
      } else {
        yield put({
          type: 'saveLoginStatus',
          payload: 'ERROR'
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false
      });
    },
    *logout(_, { call, put }) {
      yield put({
        type: 'saveLoginStatus',
        payload: 'NO_LOGIN'
      });
      yield put(routerRedux.replace('/user/login'));
    }
  },
  reducers: {
    saveLoginStatus(state, { payload }) {
      return {
        ...state,
        loginStatus: payload
      }
    },
    changeLoading(state, { payload }) {
      return {
        ...state,
        loading: payload
      }
    }
  }
};

export default loginModal;

// import {
//   login
// } from '../services/api'
// import { routerRedux } from 'dva/router'

// export default {
//   namespace: 'login',
//   state: {
//     loginStatus: 'NO_LOGIN',  // NO_LOGIN 没有登录  LOGIN 登录成功  ERROR 登录错误 一般是用户名或密码错误
//     loading: false
//   },
//   effects:{
//     *login({payload}, {call, put}){
//       yield put({
//         type: 'changeLoading',
//         payload: true
//       })
//       const res = yield call(login, payload)
//       if ( res.code === 'OK' ) {
//         yield put({
//           type: 'saveLoginStatus',
//           payload: 'LOGIN'
//         })
//         yield put(routerRedux.replace('/cont'))
//       } else {
//         yield put({
//           type: 'saveLoginStatus',
//           payload: 'ERROR'
//         })
//       }
//       yield put({
//         type: 'changeLoading',
//         payload: false
//       })
//     }
//     ,
//     *logout({payload}, {call, put}){
//       yield put({
//         type: 'saveLoginStatus',
//         payload: 'NO_LOGIN'
//       })
//       yield put(routerRedux.replace('/user/login'))
//     }
//   },
//   reducers: {
//     saveLoginStatus(state, {payload}){
//       return {
//         ...state,
//         loginStatus:payload
//       }
//     },
//     changeLoading(state, {payload}){
//       return {
//         ...state,
//         loading: payload
//       }
//     }
//   }
// }
