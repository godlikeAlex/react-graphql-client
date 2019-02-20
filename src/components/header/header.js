import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import './header.css';

import { logOut, setLoading } from '../../actions';

class Header extends React.Component {    
    
    logout = () => {
        logOut();
        this.props.setLoading(true);
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    componentDidMount() {
        console.log(this.props.currentUser);
    }

    render() {
        const {currentUser, isLoading} = this.props;
        console.log(isLoading)
        if(currentUser === undefined) {
            return <div>loading</div>
        }
        return (
            <header>
                <div>
                    Logo
                </div>
                <nav>
                    {
                        currentUser !== undefined  ? (
                            <div className='user-header'>
                                <span>{currentUser.name}</span>
                                <div><span onClick={this.logout}> Sign Out</span> </div>
                            </div>
                        ) : <Link to="/login"> Loading </Link>
                        
                    }
                </nav>
            </header>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        isLoading: state.user.isLoading
    }
};

export default connect(mapStateToProps, {logOut, setLoading})(Header);
