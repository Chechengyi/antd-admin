import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { Spin } from 'antd';
import dynamic from 'dva/dynamic';
import styles from './index.less';
import { getRouterData } from './common/router'

(dynamic as any).setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});


function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/cont'].component;
  return (
    <Router history={history}>
      <Switch>
        <Redirect path="/" exact to='/cont' />
        <Route path="/user" render={ props => <UserLayout routerData={routerData} {...props} />} />
        <Route path="/cont" render={ props=> <BasicLayout routerData={routerData} {...props} /> } />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
