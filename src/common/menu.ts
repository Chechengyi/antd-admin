export interface MenuDataItem {
  name: string;  // 菜单名字
  icon?: string;
  path: string;
  children?: Array<MenuDataItem>;
}

const menuData: MenuDataItem[] = [
  {
    name: '首页',
    icon: 'PieChartOutlined',
    path: 'cont/dashborad'
  },
  {
    name: '列表一',
    icon: 'OrderedListOutlined',
    path: 'cont/list',
    children: [
      {
        name: '查询表格',
        path: 'one',
        icon: 'BlockOutlined'
      },
      {
        name: '商品列表',
        path: 'two'
      },
      {
        name: '二级菜单',
        path: 'menu',
        children: [
          {
            name: '三级菜单_a',
            path: 'one'
          },
          {
            name: '三级菜单_b',
            path: 'two'
          }
        ]
      }
    ]
  },
  {
    name: '列表二',
    icon: 'UnorderedListOutlined',
    path: 'cont/two',
    children: [{
      name: '选项1',
      path: 'one'
    }, {
      name: '选项2',
      path: 'two'
    }]
  }
];

function formatter(data, parentPath = '') {
  const list = []
  data.forEach(item => {
    if (item.children) {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
        children: formatter(item.children, `${parentPath}${item.path}/`)
      })
    } else {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
      });
    }
  })

  return list
}

export const getMenuData = () => formatter(menuData)
