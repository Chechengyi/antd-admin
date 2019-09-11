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

interface ISideMenuState {
  openKeys: string [];
  selectKeys: string [];
}

type State = Readonly<ISideMenuState>

class SideMenu extends React.Component<ISideMenuProps, State> {

  rootSubmenuKeys: string[] = [];

  state: State = {
    openKeys: [],
    selectKeys: []
  };

  componentDidMount(): void {
    const menuKeys = this.getMenuKeys(this.props.location.pathname);
    this.setState({
      openKeys: menuKeys
    });
    this.setState({
      // 如果没有selectKeys 就跳到菜单列表的第一个页面
      selectKeys: menuKeys.length === 0? [this.props.menuData[0].path] : menuKeys
    });
  }

  componentWillReceiveProps(nextProps: Readonly<ISideMenuProps>, nextContext: any): void {
    if ( nextProps.location.pathname !== this.props.location.pathname ) {
      const menuKeys = this.getMenuKeys(nextProps.location.pathname);
      this.setState({
        openKeys: menuKeys
      });
      this.setState({
        // 如果没有selectKeys 就跳到菜单列表的第一个页面
        selectKeys: menuKeys.length === 0? [this.props.menuData[0].path] : menuKeys
      });
    }
  }

  menuItemClick =(path: string) => {
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

  getNavMenuItems = (menuData, level=1)=> {
    if ( !menuData ) {
      return []
    }
    if (level===1) {
      this.rootSubmenuKeys = [];
    }
    return menuData.map( item=> {
      if (!item.name) return null;
      if (item.children) {
        level===1 &&　this.rootSubmenuKeys.push(item.path);
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
              this.getNavMenuItems(item.children, level+1)
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

  handSelect = (e)=> {
    this.setState({
      selectKeys: e.selectedKeys
    })
  };

  handMenuChange = openKeys=> {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render(){
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
          selectedKeys={this.state.selectKeys}
          openKeys={this.state.openKeys}
          mode="inline"
          onSelect={this.handSelect}
          onOpenChange={this.handMenuChange}
        >
          {this.getNavMenuItems(this.props.menuData)}
        </Menu>
      </Sider>
    )
  }
}

export default SideMenu
