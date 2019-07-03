import dva from 'dva';
import './index.less';
import { createBrowserHistory, createHashHistory } from 'history'
// import global from './models/global'
import routerConfig from './router'

// 1. Initialize
const app = dva({
  history: createBrowserHistory({basename: '/'})
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
