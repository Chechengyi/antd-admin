/* 侧边菜单 */

import React from 'react'
import { Menu, Layout, Icon } from 'antd'
import styles from './index.less'
import { RouteComponentProps } from 'react-router-dom'
import { IGlobalModalState } from '../../models/connect'

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

interface ISideMenuProps {
  menuData: any[];
  location: RouteComponentProps['location'];
  history: RouteComponentProps['history'];
  collapsed: IGlobalModalState['collapsed']
}

class SideMenu extends React.Component<ISideMenuProps> {

  menuItemClick =(path: string)=> {
    path = '/' + path;
    if (path === this.props.location.pathname) return;
    this.props.history.push(path);
  };

  getMenuKeys = (path: string): Array<string> => {
    const flatMenuKeys = this.getFlatMenuKeys(this.props.menuData);
    path = path.replace(/^\//, '');
    let arr: Array<string> = path.split('/');
    let back_arr: Array<string>;
    back_arr = arr.reduce( (ret, item)=> {
      if (ret.length===0) {
        return [item]
      } else {
        return [...ret, ret[ret.length-1] + '/' +item];
      }
    }, []);
    back_arr.shift();
    return back_arr.filter( item=> {
      return flatMenuKeys.indexOf(item) > -1;
    })
  };

  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach((item) => {
      if (item.children) {
        keys.push(item.path);
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      } else {
        keys.push(item.path);
      }
    });
    return keys;
  }

  getNavMenuItems = (menuData)=> {
    if ( !menuData ) {
      return []
    }
    return menuData.map( item=> {
      if (!item.name) return null;
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
            <span>
              {item.icon&&<Icon type={item.icon} />} 
              <span>{item.name}</span>
              </span>
            }
          >
            {
              this.getNavMenuItems(item.children)
            }
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.path} onClick={()=>this.menuItemClick(item.path)}>
            {item.icon && <Icon type={item.icon} />} <span>{item.name}</span>
          </Menu.Item>
        )
      }
    })
  };

  render(){
    const { location } = this.props;
    return (
      <Sider
        trigger={null}
        collapsed={this.props.collapsed}
        className={styles.menu}
        width={250}
      >
        <div className={styles.logo}>
          <h1>Chechengyi</h1>
        </div>
        <Menu 
          theme="dark"
          selectedKeys={this.getMenuKeys(location.pathname)}
          // selectedKeys={['cont/list', 'cont/list/one']}
          mode="inline"
          defaultOpenKeys={this.getMenuKeys(location.pathname)}
        >
          {this.getNavMenuItems(this.props.menuData)}
        </Menu>
      </Sider>
    )
  }
}

export default SideMenu
