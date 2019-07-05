import * as React from 'react'
import { getRequest } from '../utils/utils'
import {ReactElement} from "react";

/* 
  将表格或列表中搜索和分页的功能提取出来，
  搜索字段和分页的参数都被提到了本高阶组件当中，
  type  代表获取数据后需要 dispatch 的model的type
*/

interface ITableState {
  formValues: Object;
  page: number;
  num: number;
}

interface ITableParams {
  type?: string;
  page?: number;
  num?: number
}

export interface ITableProps {
  dispatch: Function;
  form?: any
}

export interface IHocTableComponentProps {
  resetData: (e: React.MouseEvent<HTMLElement>)=>void;
  searchData: (e)=>void;
  handlePageChange: (page: number, num: number)=>void;
  page: number
}

interface IParams {
  [propsName: string]: any
}

type State = Readonly<ITableState>;

export default <P extends object>(setting: ITableParams) => (WrapComponent: React.ComponentType<P & ITableProps>) => {
  return class TableHoc extends React.Component<P & ITableProps , State> {
    state: State;
    constructor(props){
      super(props);
      const params: IParams = getRequest();
      this.state = {
        formValues: {},
        page: setting.page || (params.page? parseInt(params.page) : 1 ),
        num: setting.num ||10
      }
    }

    warpCom;

    componentDidMount(){
      this.getData();
    }

    static displayName = WrapComponent.displayName || WrapComponent.name || 'Component';

    resetData = () => {
      this.props.form && this.props.form.resetFields();
      this.setState({
        page: 1,
        formValues: {}
      }, this.getData)
    };

    getData = ()=> {
      let elseSearchParams;
      if (this.warpCom.getSearchParams) {
        elseSearchParams = this.warpCom.getSearchParams()
      } else {
        elseSearchParams = {}
      }
      const { page, num, formValues } = this.state;
      this.props.dispatch({
        type: setting.type,
        payload: {
          page,
          num,
          ...formValues,
          ...elseSearchParams
        }
      })
        .then( ()=> {
          // 改变地址栏参数，加上page页码
          window.history.replaceState(null, null, `?page=${page}`)
        })
    };

    searchData = formValues=> {
      this.setState({
        page: 1,
        formValues
      }, this.getData)
    };

    handlePageChange = (page, num) => {
      this.setState({
        page,
        num
      }, this.getData)
    };

    render() {
      return <WrapComponent
              ref={com => this.warpCom = com}
                {...this.props }
                {...this.state}
                resetData={this.resetData}
                searchData={this.searchData}
                handlePageChange={this.handlePageChange}
              />
    }
  }
}
