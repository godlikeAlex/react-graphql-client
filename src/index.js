import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux';
import store from './store';
import 'semantic-ui-css/semantic.min.css';

import App from './components/app';
import { ApolloProvider } from 'react-apollo';

const authClient = (token) => {
    if(token !== null) {
        return new ApolloClient({
            uri: 'https://damp-wildwood-52429.herokuapp.com/',
            fetchOptions: {
                credentials: 'include'
            },
            request: operation => {
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
    } else {
        return new ApolloClient({
            uri: 'https://damp-wildwood-52429.herokuapp.com/',
            fetchOptions: {
                credentials: 'include'
            }
        });
    }
};

const client = authClient(localStorage.getItem('token'));

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ApolloProvider>
, document.getElementById('root'));
