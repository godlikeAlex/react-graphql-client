import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import './header.css';

import { logOut } from '../../actions';

const Header = ({currentUser, logOut}) => {    
    
    const logout = () => {
        logOut();
        localStorage.removeItem('token');
    }
    
    return (
        <header>
            <div>
                Logo
            </div>
            <nav>
                <Link to="/">
                    Home
                </Link>
                <span onClick={logout}>Sign Out</span> : 
                <Link to="/login"> Login </Link>
                <Link to="/signout">1</Link>
            </nav>
        </header>
    )
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
};

export default Header;
