import * as React from 'react'
import {
  Layout
} from 'antd';
import GlobalHeader from '../components/GlobalHeader'
import { connect } from 'dva'
import { getRoutes } from '../utils/utils'
import { getMenuData } from '../common/menu'
import { Route, Redirect, Switch } from 'dva/router'
import SideMenu from '../components/SideMenu'
import NotFound from '../routes/Exception/404'
import DocumentTitle from 'react-document-title'
import { ConnectState, IGlobalModalState } from '../models/connect'
import { RouteComponentProps  } from 'react-router-dom'

const {
  Content, Footer
} = Layout;

/* 获取菜单重定向地址 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

interface IBasicLayoutProps extends RouteComponentProps, IGlobalModalState{
  dispatch: Promise<void>;
  routerData: [];
}

@connect( (state: ConnectState)=>({
  collapsed: state.global.collapsed
}))

class BasicLayout extends React.Component<IBasicLayoutProps> {
  state = {
    collapsed: false,
  };

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'antd';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - antd`;
    }
    return title;
  }

  render() {
    const { collapsed, routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu
            collapsed={collapsed}
            menuData={getMenuData()}
            history={this.props.history}
            location={this.props.location}
          />
          <Layout>
            <GlobalHeader collapsed={this.props.collapsed} location={this.props.location} />
            <Content>
              <div style={{ minHeight: 'calc(100vh - 260px)', minWidth: '900px' }}>
                <Switch>
                  {/* <Redirect exact form='/cont' to='/cont/dashborad' /> */}
                  {
                    redirectData.map(item =>
                      <Redirect key={item.from} exact from={item.from} to={item.to} />
                    )
                  }
                  <Route exact path='/cont' render={() => (
                    <Redirect to='/cont/dashborad' />
                  )} />
                  {
                    getRoutes(match.path, routerData).map(item => (
                      <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                    ))
                  }
                  <Route render={NotFound} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design 中后台管理系统 ©2019 Created by Chechengyi
          </Footer>
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default BasicLayout
