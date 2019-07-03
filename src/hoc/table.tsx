import * as React from 'react'

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

export interface IHocTableComponentProps {
  resetData: Function;
  searchData: Function;
  handlePageChange: Function
}

export default ({type, page, num}) => WrapComponent => {
  return class extends React.Component<any> {
    readonly state: ITableState = {
      formValues: {},
      page: page || 1,
      num: num || 10
    };

    warpCom;

    constructor(props){
      super(props);
      // this.state = {
      //   formValues: {},
      //   page: page || 1,
      //   num: num || 10
      // }
    }

    componentDidMount(){
      this.getData()
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
      let elseSearchParams
      if (this.warpCom.getSearchParams) {
        elseSearchParams = this.warpCom.getSearchParams()
      } else {
        elseSearchParams = {}
      }
      const { page, num, formValues } = this.state;
      this.props.dispatch({
        type,
        payload: {
          page,
          num,
          ...formValues,
          ...elseSearchParams
        }
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
                {...this.props}
                {...this.state}
                resetData={this.resetData}
                searchData={this.searchData}
                handlePageChange={this.handlePageChange}
              />
    }
  }
}
