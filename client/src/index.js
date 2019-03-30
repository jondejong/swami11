import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import './index.css';

// Material Design imports
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Redux components
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'

// import createHistory from 'history/createBrowserHistory'

// import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter, connectRouter } from 'connected-react-router'

import createBrowserHistory from 'history/createBrowserHistory'

import thunk from 'redux-thunk';

import App from './App'
import swamiApp from './swami'

// const history = createHistory()
// const middleware = routerMiddleware(history)

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  swamiApp,
  router: connectRouter(history),
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

const SwamiApp = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <ConnectedRouter history={history}>
        <div>
          <Route name="home" path="/" component={App}/>
        </div>
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(<SwamiApp />, document.getElementById('root'))
serviceWorker.unregister();
