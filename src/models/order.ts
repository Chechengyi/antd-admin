import { Effect } from 'dva'
import { Reducer } from 'redux'
import {getOrder} from "../services/api";

export interface IOrderModalState {
  list: [];
  loading: boolean
}

export interface IOrderModalType {
  namespace: 'order';
  state: IOrderModalState;
  effects: {
    getData: Effect;
  };
  reducers: {
    saveData: Reducer<IOrderModalState>;
    changeLoading: Reducer<IOrderModalState>
  }
}

const orderModal: IOrderModalType = {
  namespace: 'order',
  state: {
    list: [],
    loading: false
  },
  effects: {
    *getData({payload}, {call, put}){
      yield put({
        type: 'changeLoading',
        payload:true
      });
      const res = yield call(getOrder, payload);
      yield put({
        type: 'saveData',
        payload: res
      });
      yield put({
        type: 'changeLoading',
        payload:false
      })
    }
  },
  reducers: {
    saveData(state, {payload}) {
      return {
        ...state,
        list: payload
      }
    },
    changeLoading(state, {payload}) {
      return {
        ...state,
        loading: payload
      }
    }
  }
};

export default orderModal;
