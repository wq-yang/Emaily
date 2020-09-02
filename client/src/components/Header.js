import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Payments from './Payments';
class Header extends Component {
    renderContent() { // helper to decide what to show depend on logged in or not
        switch (this.props.auth) {
            case null:
                return 'deciding';
            case false:
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                );
            default:
                return [
                    <li key="1"><Payments/></li>,
                    <li key="3" style={{ margin: '0px 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? "/surveys" : "/"} 
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}
function mapStateToProps({auth}) {
    return { auth }; // == return { auth: auth }
}
export default connect(mapStateToProps)(Header);