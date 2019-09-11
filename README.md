# antd-admin
基于antd的中后台管理系统模板

```
git clone https://github.com/Chechengyi/antd-admin.git
```
```bash
npm install
```
```bash
npm start
```

## 简介
参照`ant design pro`，基于 `ant design` UI组件库，以及 `dva` 的中后台管理系统模板。网络请求使用`axios`封装，项目使用 `webpack4` 构建，
配置随心所欲。模板内容少，只提供了一个两个表格搜索列表的列子。后续开发无包袱，不用为了删文件却不知道哪使用了这个文件而头痛。
项目增加了 `typescript`支持。

## 权限菜单建议
做中后台管理系统绕不开的一点就是权限菜单控制。这里说一下我的做法。

给资源表中的菜单权限加上一个菜单标识，对应到本项目中 `menu.ts` 文件夹下的菜单那里。既要做权限控制，肯定要向后端询问一个查询用户权限信息的接口。我会将这组权限分为 `菜单权限` 和 `按钮权限` 用 `redux` 管理。然后在 `SideMenu` 就是渲染左侧菜单那里更改一下渲染逻辑。如果渲染的菜单项具有权限标识的话就看看当前用户的菜单权限中是否具有该菜单权限，如果当前菜单没有权限标识就直接渲染。

当然这样做只控制了左侧菜单的渲染，当用户直接输入地址进入一个他本该访问不了的页面时，还是能访问。所以为了更好的做到权限控制，还需要从路由处下手。内容页路由逻辑是在 `layouts` 文件夹下的 `BasicLayout.tsx` 中的。同样在这个文件夹中获取用户的菜单权限，然后在渲染的时候使用 `Route` 的 `render` 属性去渲染， 这里我是单独写了一个权限认证组件。

 

```jsx
{
                      getRoutes(match.path, routerData).map(item => (
                        <Route
                          key={item.key}
                          path={item.path}
                          // component={item.component}
                          exact={true}
                          render={props=>{
                            if ( !this.pathAuto[item.path] ) {
                              return <item.component {...props} />
                            }
                            return (
                              <PermissionPage permission={this.pathAuto[item.path]}>
                                <item.component {...props} />
                              </PermissionPage>
                            )
                          }}
                        />
                      ))
                    }


const PermissionPage: React.FC<IPermissionPageProps> = props=> {
  return (
    <React.Fragment>
      {props.menuMap[props.permission]? props.children : props.reNull? null: <NoAuto />}
    </React.Fragment>
  )
};
```



其实权限控制这一块做起来很简单。。。  实现方法也绝不止这一种，这里只是说说的我的做法，如果有人使用了我的这个模板，然后刚好权限控制这块有疑问的话，可以问我。