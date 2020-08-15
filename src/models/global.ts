import { Effect } from 'dva'
import { Reducer } from 'redux'

export interface IGlobalModalState {
  collapsed: boolean;
}

export interface IGlobalModalType {
  namespace: 'global';
  state: IGlobalModalState;
  effects: {
  };
  reducers: {
    changeLayoutCollapsed: Reducer<IGlobalModalState>
  }
}

const globalModal: IGlobalModalType = {
  namespace: 'global',
  state: {
    collapsed: false
  },
  effects: {
   
  },
  reducers: {
    changeLayoutCollapsed(state, {payload}) {
      return {
        ...state,
        collapsed: payload
      }
    }
  }
};

export default globalModal;


