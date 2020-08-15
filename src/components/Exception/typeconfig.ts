type TypeConfig = {
  [name: string]: {
    img: string;
    desc: string;
    title: string
  }
}

export const typeConfig: TypeConfig = {
  404: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
    desc: '404，抱歉，你访问的页面不存在',
    title: '404'
  },
  403: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
    desc: '403, 您没有权限访问此页面',
    title: '403'
  }
};
