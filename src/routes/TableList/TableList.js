import React from 'react'
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Button
} from 'antd'
import TableHoc from '../../hoc/table'
import { connect } from 'dva'
import MyTable from './MyTable'

const FormItem = Form.Item

@connect()
@Form.create()
@TableHoc({
  type: 'order/getData'
})
class TableList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: 'ccy'
    }
  }

  getSearchParams = () => {
    return {}
  }

  handleSearch =e=> {
    e.preventDefault()
    const { form } = this.props
    form.validateFields( (err, values)=> {
      if (err) return
      this.props.searchData(values)
    })
  }

  renderForm = () => {
    const { getFieldDecorator } = this.props.form
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
  }

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

export default TableList