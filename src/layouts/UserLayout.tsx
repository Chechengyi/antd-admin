import * as React from 'react'
import DocumentTitle from 'react-document-title'
import styles from './UserLayout.less'
import { Route, Redirect } from 'dva/router'
import { getRoutes } from '../utils/utils'
import { RouteComponentProps } from 'react-router-dom'

interface IUserLayout extends RouteComponentProps{
  routerData: [];
}

class UserLayout extends React.Component<IUserLayout> {

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'antd';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - antd`;
    }
    return title;
  }

  render(){
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <h1 className={styles.title}>管理员系统</h1>
          <Route exact path='/user' render={()=><Redirect to='/user/login' />} />
          {
            getRoutes(match.path, routerData).map( item=> (
              <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
            ))
          }
        </div>
      </DocumentTitle>  
    )    
  }
}

export default UserLayout
