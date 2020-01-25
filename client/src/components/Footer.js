import React, {Component} from "react";
import{
    Navbar,
    NavbarBrand,

    Container
} from 'reactstrap'

class Footer extends Component{
    render() {
        return(
            <div class="footer">
            {/* <p>Footer</p> */}
          &copy; {new Date().getFullYear()} Copyright: Sarah MA
          </div>
        )
    }
}

export default Footer;