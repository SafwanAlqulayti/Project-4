import React, {Component} from "react";

class Footer extends Component{
    render() {
        return(
            <div class="footer">
            {/* <p>Footer</p> */}
          &copy; {new Date().getFullYear()}
          </div>
        )
    }
}

export default Footer;