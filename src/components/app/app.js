import React, {Component} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import WithApolloClient from '../hoc/WithApolloClient';

import { ME } from '../../queries';
import {connect} from 'react-redux';
import {setCurrentUser, setLoading} from '../../actions';

import './app.css';

import {Login, SignUp} from '../auth';
import { MainPage } from '../pages';
import Spinner from '../spinner';


 
class App extends Component {

    state = {
        loading: true
    }

    componentWillMount() {
        this.props.client.query({ query: ME })
        .then(({data, loading}) => {
            this.props.setCurrentUser(data.me);
            this.props.history.push('/');
        })
        .catch(err => {
            this.props.history.push('/login');
            this.props.setLoading(false);
        });
    }

    render() {
        console.log(this.props.isLoading)
        return this.props.isLoading ? <Spinner /> : (
            <Switch>
                <Route path='/' exact component={MainPage} />
                <Route path='/login' component={Login}  />
                <Route path='/signup' component={SignUp} />
            </Switch>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        isLoading: state.user.isLoading
    }
};


export default withRouter(connect(mapStateToProps, {setCurrentUser, setLoading})(WithApolloClient()(App)));