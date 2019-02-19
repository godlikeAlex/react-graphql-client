import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import './header.css';

import { logOut } from '../../actions';

class Header extends React.Component {    
    
    logout = () => {
        logOut();
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    render() {
        const {currentUser} = this.props;
        return (
            <header>
                <div>
                    Logo
                </div>
                <nav>
                    {
                        currentUser !== null ? (
                            <div className='user-header'>
                                <span>{currentUser.name}</span>
                                <div><span onClick={this.logout}> Sign Out</span> </div>
                            </div>
                        ) : <Link to="/login"> Login </Link>
                        
                    }
                </nav>
            </header>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
};

export default connect(mapStateToProps, {logOut})(Header);
