import { IGlobalModalState } from './global'
import { ILoginModalState } from './login'

export {IGlobalModalState, ILoginModalState}


export interface IConnectState {
  global: IGlobalModalState;
  login: ILoginModalState
}

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;
