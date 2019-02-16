import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/app';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'https://damp-wildwood-52429.herokuapp.com/',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    },
    onError({ networkError }) {
        console.log(networkError);
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ApolloProvider>
, document.getElementById('root'));
