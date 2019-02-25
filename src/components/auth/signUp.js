import React, {Component} from 'react';
import {Form, Segment, Message} from 'semantic-ui-react';
import {setCurrentUser, setLoading} from '../../actions';
import './auth.css';
import { Link, withRouter } from 'react-router-dom';
import WithApolloClient from '../hoc/WithApolloClient';
import { connect } from 'react-redux';

import {CREATE_USER} from '../../queries'

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        error: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };


    signUp = () => {
       const { client, setCurrentUser, history } = this.props;
       client.mutate({mutation: CREATE_USER, variables: this.state})
       .then(({data}) => {
           localStorage.setItem('token', data.createUser.token);
           setCurrentUser(data.createUser.user);
           history.push('/');
       })
       .catch(e=> this.setState({error:e.graphQLErrors[0].message}));
    };
    
    render() {
        const { name, email, password, error } = this.state;
        return (
            <div className="signup">
                <div className='title-signup'>Create a new account for free!</div>
                <Segment>
                    { error ? 
                    <Message className={error ? 'error' : ''}>
                        {error}
                    </Message>
                    : 
                    ''}
                    <Form size="large" onSubmit={this.signUp}>
                        <Form.Input required value={name} name='name' fluid icon='user' onChange={this.handleChange} iconPosition='left' placeholder='User Name' />
                        <Form.Input required type='email' value={email} name='email' fluid icon='mail' onChange={this.handleChange} iconPosition='left' placeholder='E-mail address' />
                        <Form.Input required value={password} name='password' type='password' onChange={this.handleChange} fluid icon='lock' iconPosition='left' placeholder='Password' />
                        <Form.Button color='purple' fluid size='large'>
                            Sign Up
                        </Form.Button>
                    </Form>
                </Segment>
                <Segment className="redirect">
                    Allready exists user? <Link to='/login'>Login</Link>
                </Segment>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        isLoading: state.user.isLoading
    }
};

export default withRouter(connect(mapStateToProps, {setCurrentUser, setLoading})(WithApolloClient()(SignUp)));