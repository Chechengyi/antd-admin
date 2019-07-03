import React from 'react'
import { connect } from 'dva'
import {
  Table
} from 'antd'

@connect( state=>({
  list: state.order.list,
  loading: state.order.loading
}))
export default class MyTable extends React.Component {
  render(){
    const columns = [
      {
        title:'订单编号',
        dataIndex: 'id'
      },
      {
        title: '订单名称',
        dataIndex: 'name'
      }
    ]
    return (
      <div>
        <Table
          loading={this.props.loading}
          columns={columns}
          dataSource={this.props.list}
          rowKey={record=>record.id}
          pagination={
            {
              total: 200,
              defaultCurrent:1,
              current: this.props.page,
              onChange: this.props.handlePageChange
            }
          }
        />
      </div>
    )
  }
}
