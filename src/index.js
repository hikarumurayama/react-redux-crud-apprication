import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from "react-router-dom"; //ルーティングするために必要
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css';
import reducer from './reducers'
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new';
import EventsShow from './components/events_show';
import reportWebVitals from './reportWebVitals';

// 開発環境のときだけデバッグツールを適用する
const enhancer = process.env.NODE_ENV === 'development' ?
  composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk) // thunkを利用するために、apllyMiddlewareに引数として渡し、その返り値をcreateStoreに渡す

const store = createStore( reducer, enhancer)

ReactDOM.render(
  <Provider store={store}>
    {/* 以下はルーター実装に必要なおまじない（BrowserRouter、Switch,Route) */}
    <BrowserRouter>
      <Switch>
        {/*exact はURLが完全マッチするときだけヒットするようにしたもの*/}
        <Route path="/events/new" component={EventsNew} />  
        <Route path="/events/:id" component={EventsShow} />
        <Route exact path="/" component={EventsIndex} />
        <Route exact path="/events" component={EventsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
