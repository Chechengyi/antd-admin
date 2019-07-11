import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Row,
  Col,
  Spin
} from 'antd'
import TableHoc from '../../hoc/table'
import { RouteComponentProps } from 'react-router-dom'
import { IConnectState, IGoodsModalState } from '../../models/connect'

interface IGoodsListProps extends RouteComponentProps, IGoodsModalState{
  dispatch: (e)=>void;
  routerData: []
}

@connect((state: IConnectState) => ({
  list: state.goods.list,
  loading: state.goods.loading
}))
// @ts-ignore
@TableHoc<IGoodsListProps>({
  type: 'goods/getData'
})

export default class GoodsList extends React.Component<IGoodsListProps> {

  render() {
    return (
      <div>
        <Spin spinning={this.props.loading}>
          <div style={{ minHeight: 200, margin: 16 }}>
            <Row gutter={25}>
              {
                this.props.list.map((item: any) => (
                  <Col span={6} style={{ marginBottom: 10 }} key={item.id}>
                    <Card>
                      <img src={item.img} alt="" style={{ width: '100%' }} />
                      <p>商品名称：{item.name}</p>
                      <p>{item.desc}</p>
                    </Card>
                  </Col>
                ))
              }
            </Row>
          </div>
        </Spin>
      </div>
    )
  }
}
