import { IGlobalModalState } from './global'
import { LoginModalState } from './login'
import { IOrderModalState } from './order'
import { IGoodsModalState } from './goods'

export {
  IGlobalModalState,
  LoginModalState,
  IOrderModalState,
  IGoodsModalState
}


export interface ConnectState {
  global: IGlobalModalState;
  login: LoginModalState;
  order: IOrderModalState;
  goods: IGoodsModalState;
}

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;
