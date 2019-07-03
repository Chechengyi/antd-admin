
const menuData = [
  {
    name:'首页',
    icon: 'pie-chart',
    path: 'cont/dashborad'
  },
  {
    name: '列表一',
    icon: 'ordered-list',
    path: 'cont/list',
    children: [
      {
        name: '查询表格',
        path: 'one'
      },
      {
        name: '商品列表',
        path: 'two'
      }
    ]
  }
]

function formatter(data, parentPath=''){
  const list = []
  data.forEach( item=> {
    if(item.children){
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

export const getMenuData = ()=>formatter(menuData)