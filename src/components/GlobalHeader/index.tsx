import * as React from 'react'
import {
  Layout,
  Avatar,
  Dropdown,
  Menu,
  Breadcrumb
} from 'antd'
import { LoginOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import styles from './index.less'
import { connect } from 'dva'
import { getMenuData } from '../../common/menu'

const MenuItem = Menu.Item;
const { Header } = Layout;

interface IGlobalHeader {
  collapsed: boolean;
  dispatch?: Function;
  location: any;
}

@connect()
class GlobalHeader extends React.Component<IGlobalHeader> {

  changeCollapsed = () => {
    const { collapsed } = this.props;
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed
    })
  };

  logout = () => {
    this.props.dispatch({
      type: 'login/logout'
    })
  };

  getBreadcrumbList = () => {
    var arr = []
    const menu = getMenuData()
    const pathname = this.props.location.pathname
    function getBreadcrumb(menu) {
      menu.forEach(item => {
        if (pathname.indexOf(item.path) > -1) {
          arr.push({
            name: item.name,
            path: item.path
          })
          if (item.children) {
            getBreadcrumb(item.children)
          }
        }
      })
    }
    getBreadcrumb(menu);
    return arr
  };

  render() {
    const menu = (
      <Menu>
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
        <Menu.Divider />
        <MenuItem>
          <div onClick={this.logout}> <LoginOutlined />  退出登录</div>
        </MenuItem>
      </Menu>
    );
    return (
      <Header className={styles.headerWarp}>
        <div className={styles.locationInfo}>
         <div className={styles.collapsedBtnBox} onClick={this.changeCollapsed}>
           {this.props.collapsed?
            <MenuUnfoldOutlined style={{fontSize: 24}} /> :
            <MenuFoldOutlined style={{fontSize: 24}} />
          }
         </div>
          <Breadcrumb>
            {/* <Breadcrumb.Item>首页</Breadcrumb.Item> */}
            {
              this.getBreadcrumbList().map(item => (
                <Breadcrumb.Item key={item.path}>{item.name}</Breadcrumb.Item>
              ))
            }
          </Breadcrumb>
        </div>
        <ul className={styles.rightMenu}>
          <Dropdown overlay={menu}>
            <li className={styles.menuItem}>
              <Avatar icon={<UserOutlined />} />
              <span className={styles.username}>Chechengyi</span>
            </li>
          </Dropdown>
        </ul>
      </Header>
    )
  }
}

export default GlobalHeader
