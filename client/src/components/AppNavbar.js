import React, {component, Component} from 'react'
import{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'

class AppNavbar extends Component{
  

       state={
            isOpen:false
        }

toggle=()=>{
    this.setState({
        isOpen:!this.state.isOpen
    })

}
render(){
    return(
<div>

    <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
            <NavbarBrand href="/">Shopping List</NavbarBrand>
            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar></Collapse>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="https://google.com"> Google IT</NavLink>
                </NavItem>

                </Nav>
        </Container>

    </Navbar>
</div>
    )

    //return()
}

}

export default AppNavbar