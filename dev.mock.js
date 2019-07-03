
module.exports = {
  'POST /api/login': (req, res) => {
    const { username, password } = req.body
    if ( username === 'admin' && password === '000000' ) {
      res.send({
        code: 'OK'
      })
    } else {
      res.send({
        code: 'ERR'
      })
    }
  },
  'GET /api/getOrder': (req, res) => {
    const {page, num} = req.query
    let start =(page-1) * num
    let end = page * num
    let arr = []
    for ( start; start < end; start++ ) {
      let obj = {
        id: start + 1,
        name: '订单'+ (start + 1),
      }
      arr.push(obj)
    }
    res.send(arr)
  },
  'GET /api/getGoods': (req, res) => {
    const {page, num} = req.query
    let start =(page-1) * num
    let end = page * num
    let arr = []
    for ( start; start < end; start++ ) {
      let obj = {
        id: start + 1,
        name: '商品'+ (start + 1),
        img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2560458309,2660522945&fm=27&gp=0.jpg',
        desc: '这是好吃的好看的好玩的，苹果'
      }
      arr.push(obj)
    }
    res.send(arr)
  }
};
