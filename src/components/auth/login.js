import React from 'react';
import { Mutation } from "react-apollo";
import {LOGIN} from '../../queries';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './auth.css';
import Header from '../header/index';


class Login extends React.Component {
    state = {
        email: '',
        password: ''
    };

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
                this.props.history.push('/');
            })
            .catch(err => this.setState({error: err.message}));
    };

    render() {
        const {email, password} = this.state;
        return (
            <div>
             <Header />
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
                <a href="/signup">SignUp free!</a>
            </div>
            </div>            
        )
    }
};

const mapStateToProps = ({user}) => {
    return {
        currentUser: user.currentUser
    }
};


export default withRouter(connect(mapStateToProps)(Login));