import * as React from 'react'
import {
  Card,
  Form,
  Input,
  Button
} from 'antd'
import TableHoc, { HocTableComponentProps } from '@hoc/table'
import { connect } from 'dva'
import MyTable from './MyTable'
import { ConnectState } from '@models/connect'
import { RouteComponentProps } from 'react-router-dom'
import { FormInstance } from 'antd/lib/form'

const FormItem = Form.Item;

interface TableListProps extends RouteComponentProps, HocTableComponentProps {
  dispatch: (e) => void;
  routerData: [];
}

class TableList extends React.Component<TableListProps> {

  getSearchParams = (): object => {
    return {}
  };

  form: FormInstance

  handleSearch = values => {
    this.props.searchData(values)
  };

  renderForm = () => {
    return (
      <Form onFinish={this.handleSearch} layout='inline'>
        <FormItem label='订单编号' name='orderID'>
          <Input placeholder='订单编号' />
        </FormItem>
        <Button type='primary' htmlType='submit'>确认</Button>
        <Button style={{ marginLeft: 10 }} onClick={this.props.resetData}>重置</Button>
      </Form>
    )
  };

  render() {
    return (
      <Card style={{ margin: 16 }}>
        <div>
          {this.renderForm()}
        </div>
        <div style={{ marginTop: 20 }}>
          <MyTable
            page={this.props.page}
            handlePageChange={this.props.handlePageChange}
          />
        </div>
      </Card>
    )
  }
}

export default connect((state: ConnectState) => ({
  list: state.order.list
}))(
  TableHoc<TableListProps>({
    type: 'order/getData'
  })(TableList)
)
