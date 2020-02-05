import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getBorrower } from '../actions/authActions';


class Home extends Component{

    static propTypes={
        isAuthenticated: PropTypes.bool,
        isAdmin:PropTypes.bool,
        user:PropTypes.object.isRequired
    }

    componentDidUpdate(){

    }

    render() {
        if(this.props.isAuthenticated){
    //    console.log(this.props.user)
      //  this.props.getBorrower(this.props.user.id)
        }
        return(
           <div className='homeComponent coolHeader'>
               {/* <h4>Welcome to Our Library</h4> */}
            
          </div>
        )
    }
}

//export default Home;

const mapStateToProps=state=>({
    
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    user:state.auth.user

})
export default connect(mapStateToProps,{getBorrower})(Home)