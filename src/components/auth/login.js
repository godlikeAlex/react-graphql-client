import React from 'react';
import { Mutation } from "react-apollo";
import {LOGIN} from '../../queries';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import './auth.css';
import { setCurrentUser, setLoading } from '../../actions/index';


class Login extends React.Component {
    state = {
        email: '',
        password: ''
    };

    componentDidMount() {
        this.props.setLoading(true);
    }

    handlerChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event, signUpUser) => {
        event.preventDefault();
        signUpUser()
            .then(({data}) => {
                localStorage.setItem('token', data.login.token);
                this.props.setCurrentUser(data.login.user);
                this.props.history.push('/');
            })
            .catch(err => this.setState({error: err.message}));
    };

    render() {
        const {email, password} = this.state;
        return (
            <div>
                <div className='login'>
                    <div> Login </div>
                    <Mutation mutation={LOGIN} variables={{email, password}}>
                        {(signUpUser, {data, loading, error}) =>{
                            return (
                            <form onSubmit={event => this.handleSubmit(event, signUpUser) }>
                                <div className="login-input">
                                    <input placeholder="Email" type='text' name="email" value={email} onChange={this.handlerChange} />
                                </div>
                                <div className="login-input">
                                    <input placeholder="Password" type='password' name='password' onChange={this.handlerChange} value={password} />
                                </div>
                                <input type="submit" value="Login" />
                            </form>
                            )
                        }}
                    </Mutation>
                    <Link to="/signup">SignUp free!</Link>
                </div>
            </div>            
        )
    }
};


export default withRouter(connect(null, {setCurrentUser, setLoading}) (Login));