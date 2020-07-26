import { Effect } from 'dva'
import { Reducer } from 'redux'
import { getGoods } from '../services/api'

export interface IGoodsModalState {
  list: [];
  loading: boolean;
}

export interface IGoodsModalType {
  namespace: 'goods'
  state: IGoodsModalState;
  effects: {
    getData: Effect
  };
  reducers: {
    saveData: Reducer<IGoodsModalState>;
    changeLoading: Reducer<IGoodsModalState>
  }
}

const goodsModal: IGoodsModalType = {
  namespace: 'goods',
  state: {
    list: [],
    loading: false
  },
  effects: {
    *getData({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true
      });
      const res = yield call(getGoods, payload)
      yield put({
        type: 'saveData',
        payload: res
      });
      console.log('res', res)
      yield put({
        type: 'changeLoading',
        payload: false
      })
    }
  },
  reducers: {
    saveData(state, { payload }) {
      return {
        ...state,
        list: payload
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

export default goodsModal;

// export default {
//   namespace: 'goods',
//   state:{
//     list: [],
//     loading: false
//   },
//   effects: {
//     *getData({payload}, {call, put}){
//       yield put({
//         type: 'changeLoading',
//         payload: true
//       })
//       const res = yield call(getGoods, payload)
//       yield put({
//         type: 'saveData',
//         payload: res
//       })
//       yield put({
//         type: 'changeLoading',
//         payload: false
//       })
//     }
//   },
//   reducers: {
//     saveData(state, {payload}){
//       return {
//         ...state,
//         list: payload
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
