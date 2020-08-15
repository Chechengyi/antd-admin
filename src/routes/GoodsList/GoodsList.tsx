import React from 'react'
import { connect } from 'dva'
import {
  Card,
  Row,
  Col,
  Spin,
  Input,
  Form,
  Button
} from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import { ConnectState, IGoodsModalState } from '@models/connect'
import useTable from '@hooks/useTable'

interface GoodsListProps extends RouteComponentProps, IGoodsModalState {
  dispatch: (e) => void;
  routerData: [];
}

const FormItem = Form.Item

const GoodsList: React.FC<GoodsListProps> = (props) => {
  const [formInstance] = Form.useForm()
  const [tableInstanve] = useTable({
    type: 'goods/getData'
  }, props.dispatch, formInstance)


  return (
    <div>
      <Spin spinning={props.loading}>
        <div style={{ minHeight: 200, margin: 16 }}>
          <Form form={formInstance} onFinish={tableInstanve.searchData} layout='inline'>
            <FormItem label='商品名称' name='goodsName'>
              <Input placeholder='商品名称' />
            </FormItem>
            <FormItem>
              <Button type='primary' htmlType='submit'>确认</Button>
              <Button style={{ marginLeft: 10 }} onClick={tableInstanve.resetData}>重置</Button>
            </FormItem>
          </Form>
          <Row gutter={25} style={{ marginTop: 24 }}>
            {
              props.list.map((item: any) => (
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


export default connect((state: ConnectState) => ({
  list: state.goods.list,
  loading: state.goods.loading
}))(GoodsList)

// class GoodsList extends React.Component<GoodsListProps> {

//   render() {
//     return (
//       <div>
//         <Spin spinning={this.props.loading}>
//           <div style={{ minHeight: 200, margin: 16 }}>
//             <Row gutter={25}>
//               {
//                 this.props.list.map((item: any) => (
//                   <Col span={6} style={{ marginBottom: 10 }} key={item.id}>
//                     <Card>
//                       <img src={item.img} alt="" style={{ width: '100%' }} />
//                       <p>商品名称：{item.name}</p>
//                       <p>{item.desc}</p>
//                     </Card>
//                   </Col>
//                 ))
//               }
//             </Row>
//           </div>
//         </Spin>
//       </div>
//     )
//   }
// }
// export default connect((state: ConnectState) => ({
//   list: state.goods.list,
//   loading: state.goods.loading
// }))(
//   TableHoc<GoodsListProps>({
//     type: 'goods/getData'
//   })(GoodsList)
// )
