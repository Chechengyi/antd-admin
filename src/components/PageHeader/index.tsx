import * as React from 'react'
import {
  Card,
  Breadcrumb
} from 'antd'
import { getMenuData } from '@common/menu'

export default class PageHeader extends React.Component<any> {

  componentDidMount(){
    this.getBreadcrumbList()
  }

  getBreadcrumbList =()=> {
    var arr = []
    const menu = getMenuData()
    const pathname = this.props.location.pathname
    function getBreadcrumb(menu){
      menu.forEach( item=> {
        if ( pathname.indexOf(item.path) > -1 ) {
          arr.push({
            name: item.name,
            path: item.path
          })
          if ( item.children ) {
            getBreadcrumb(item.children)
          }
        }
      })
    }
    getBreadcrumb(menu)
    return arr
  }

  render(){
    return (
      <Card>
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          {
            this.getBreadcrumbList().map( item=>(
              <Breadcrumb.Item key={item.path}>{item.name}</Breadcrumb.Item>
            ))
          }
        </Breadcrumb>
      </Card>
    )
  }
}