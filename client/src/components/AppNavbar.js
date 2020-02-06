import React, { Component, Fragment } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'
import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout'
import LoginModal from './auth/LoginModal'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MJ_Icon from '../images/MJ_Icon.png'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';




class AppNavbar extends Component {


    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }


    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })

    }
    render() {
        //from the props mapped from the state
        const { isAuthenticated, user, isAdmin } = this.props.auth


        const authLinks = (
            <Fragment>
                <NavItem className='navbar-text mr-3'>
                    <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                </NavItem>

                <NavItem><Logout></Logout></NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem><RegisterModal></RegisterModal></NavItem>
                <NavItem><LoginModal></LoginModal></NavItem>

            </Fragment>
        )


        return (




            <div>

                <Navbar color="dark" dark expand="sm" >
                    <Container>
                        <img src={MJ_Icon} width="60" height="50" />
                        <Link to='/'> <NavbarBrand>Majeed's Library</NavbarBrand></Link>

                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar></Collapse>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}




                        </Nav>


                    </Container>

                </Navbar>
            </div>


        )

    }

}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(AppNavbar)