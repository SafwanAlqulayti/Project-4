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

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import ShoppingList from './ShoppingList'



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


        // const borrowerLinks = (<Fragment>
        //     <Link to="/"> <NavItem><NavLink> My Services</NavLink> </NavItem></Link>

        // </Fragment>)

        // const adminLinks = (<Fragment>
        //     <Link to="/"> <NavItem><NavLink> Admin Dashboard</NavLink> </NavItem></Link>
        // </Fragment>)


        const authLinks = (
            <Fragment>
                <NavItem className='navbar-text mr-3'>
                    <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                </NavItem>
               
                {/* {isAdmin ? adminLinks : borrowerLinks} */}
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

                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                       <Link to='/'> <NavbarBrand>LMS</NavbarBrand></Link>

                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar></Collapse>
                        <Nav className="ml-auto" navbar>
                        {isAuthenticated ? authLinks : guestLinks}

                        {/* <Link to="/"> <NavItem><NavLink> Home</NavLink> </NavItem></Link> */}


                            {/* {isAuthenticated ? {authLinks,(isAdmin? adminLinks:borrowerLinks )} : guestLinks} */}

                            {/* {isAdmin? adminLinks:borrowerLinks} */}
                            <Link to="/contact"><NavItem><NavLink>About</NavLink></NavItem></Link>



                        </Nav>


                    </Container>

                </Navbar>
            </div>


        )

        //return()
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(AppNavbar)