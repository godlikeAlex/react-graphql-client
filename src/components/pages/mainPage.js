import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser, setLoading} from '../../actions';
import { withRouter } from 'react-router-dom';

import './main.css';

import Header from '../header';

class MainPage extends React.Component {     
    render() {
        const { currentUser, isLoading } = this.props;
        if(isLoading) {
            return <div>Loading!</div>
        }
        return (
        <div>
            <Header key={currentUser && currentUser.id} user={currentUser} />
            Welcome {currentUser.name}
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

export default withRouter(connect(mapStateToProps, {setCurrentUser, setLoading})(MainPage));