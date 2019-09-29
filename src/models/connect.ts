import { IGlobalModalState } from './global'
import { ILoginModalState } from './login'
import { IOrderModalState } from './order'
import { IGoodsModalState } from './goods'

export {
  IGlobalModalState,
  ILoginModalState,
  IOrderModalState,
  IGoodsModalState
}


export interface ConnectState {
  global: IGlobalModalState;
  login: ILoginModalState;
  order: IOrderModalState;
  goods: IGoodsModalState;
}

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;
