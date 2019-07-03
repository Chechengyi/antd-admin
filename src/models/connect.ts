import { IGlobalModalState } from './global'
import { ILoginModalState } from './login'
import { IOrderModalState } from './order'

export {
  IGlobalModalState,
  ILoginModalState,
  IOrderModalState
}


export interface IConnectState {
  global: IGlobalModalState;
  login: ILoginModalState;
  order: IOrderModalState
}

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;
