import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppData from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { offline } from 'redux-offline';
import config from 'redux-offline/lib/defaults';
import RehydrateReducer from './reducers/RehydrateReducer'
import {REHYDRATE_STORE} from './actions/constants';
import {Rehydrate} from './components'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import WiadomosciSingle from './components/WiadomosciSingle';
import GwiazdySingle from './components/GwiazdySingle';
import TechSingle from './components/TechSingle';

const networkInterface = createNetworkInterface({
   uri: 'https://cors-anywhere.herokuapp.com/https://mobileapi.wp.pl/v1/graphql'
});


const client = new ApolloClient({
       networkInterface,
       connectToDevTools: false
   });

const store = createStore(
    combineReducers({
      rehydrate: RehydrateReducer,
      apollo: client.reducer()
     }),
    undefined,
    compose(
        applyMiddleware(client.middleware()),
        offline({
            ...config,
            persistCallback: () => {
                store.dispatch({ type: REHYDRATE_STORE });
            },
            persistOptions: {
                blacklist: ['rehydrate']
            }
        })
    )
  );



ReactDOM.render(
  <ApolloProvider client={client} store={store}>
      <Rehydrate>
        <Router history={browserHistory}>
          <Route path={`${process.env.PUBLIC_URL}/`} component={() => (<AppData client={client} />)} />
            <Route path={`${process.env.PUBLIC_URL}/wiadomosci`} component={() => (<WiadomosciSingle />)} />
            <Route path={`${process.env.PUBLIC_URL}/gwiazdy`} component={() => (<GwiazdySingle />)} />
            <Route path={`${process.env.PUBLIC_URL}/tech`} component={() => (<TechSingle />)} />
        </Router>
      </Rehydrate>
  </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
