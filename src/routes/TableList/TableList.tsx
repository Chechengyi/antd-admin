import * as React from 'react'
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Button
} from 'antd'
import TableHoc, { IHocTableComponentProps, ITableProps } from '../../hoc/table'
import { connect } from 'dva'
import MyTable  from './MyTable'
import { FormComponentProps } from 'antd/lib/form/Form'
import { IConnectState } from '../../models/connect'
import { RouteComponentProps } from 'react-router-dom'

const FormItem = Form.Item;

interface ITableListProps extends FormComponentProps, RouteComponentProps {
  dispatch: (e)=>void;
  routerData: []
}

@connect((state: IConnectState)=>({
  list: state.order.list
}))
// @ts-ignore
@Form.create<ITableListProps>()
// @ts-ignore
@TableHoc<ITableListProps>({
  type: 'order/getData'
})
export default class TableList extends React.Component<ITableListProps & IHocTableComponentProps> {

  componentDidMount(): void {
    console.log(this.props)
  }

  getSearchParams = (): object => {
    return {}
  };

  handleSearch =e=> {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields( (err, values)=> {
      if (err) return;
      this.props.searchData(values)
    })
  };

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout='inline'>
        <Row gutter={10}>
          <Col span={10}>
            <FormItem label='订单编号'>
              {getFieldDecorator('orderId')(
                <Input placeholder='订单编号' />
              )}
            </FormItem>
          </Col>
          <Col md={4} sm={10}>
            <FormItem>
              <Button type='primary' htmlType='submit'>确认</Button>
              <Button style={{ marginLeft: 10 }} onClick={this.props.resetData}>重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  };

  render() {
    return (
      <Card style={{margin: 16}}>
        <div>
          {this.renderForm()}
        </div>
        <div style={{marginTop: 20}}>
          <MyTable 
            page={this.props.page}
            handlePageChange={this.props.handlePageChange}
          />
        </div>
      </Card>
    )
  }
}

