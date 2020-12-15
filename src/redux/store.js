import { createStore,applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'   //用于支持redux开发者调试工具的运行
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))
