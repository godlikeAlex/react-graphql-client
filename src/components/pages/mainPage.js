import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser} from '../../actions';
import { withRouter } from 'react-router-dom';

import {NavLink} from 'react-router-dom';

import './main.css';

import Header from '../header';

class MainPage extends React.Component {    
    state = {
        loading: true
    }
    
    componentWillReceiveProps(prevProps) {
        if(prevProps.currentUser !== this.props.currentUser) {
            this.setState({loading: false});
        }
    }
    
    render() {
        const { location } = this.props;
        if(!this.state.loading) {
            return <div>Loading!</div>
        }
        return (
        <div>
            <Header location={location}  />
            Welcome
        </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
};

export default withRouter(connect(mapStateToProps, {setCurrentUser})(MainPage));