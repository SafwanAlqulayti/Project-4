
import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Button, Alert} from 'reactstrap';
import {Link} from 'react-router-dom';
import {getALLEnquiries,getUserEnquiries} from '../actions/enquiryActions'
  


class List extends Component {

    constructor(props){
        super(props)
        this.state={
            //ListType:this.props.listType,
            heading:'',
            buttonLink:'',
            type:'',
            tableHeader:'',
            elist:''
        }
    }

    static propTypes={
        isAuthenticated: PropTypes.bool,
        isAdmin:PropTypes.bool,
        borrower:PropTypes.object.isRequired,
        getALLEnquiries:PropTypes.func.isRequired,
        getUserEnquiries:PropTypes.func.isRequired,
        enquiries:PropTypes.object.isRequired

    }



    componentDidMount(){
        const enquiriesByThisUser=this.props.user.enquiries
        console.log(enquiriesByThisUser)
        //this.props.getUserEnquiries(userID)
       // console.log(this.props.enquiries)

        var heading;
        var type;
        var path;
        var listHeader;
        var displayList;
        if(this.props.listType==="request"){
            heading=<h4>Requests</h4>
            type='Request'
            path=''
            //call getRequests function, but first check who's logged in
            if(this.props.isAdmin){
                //call getAllRequests
                

            }
            else if (this.props.isAuthenticated){
                //call getUserRequests

            }
        }
        
        else if(this.props.listType==="enquiry"){
            if(this.props.isAdmin){
                this.props.getALLEnquiries()
            }
            else if(this.props.isAuthenticated){
                const userID=this.props.user.id
                this.props.getUserEnquiries(userID)
                console.log(this.props.user.enquiries)
            }

            heading=<h4>Enquiries</h4>
            type='Enquiry'
            path='/newEnquiry'
            listHeader=
            <tr> 
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            </tr> 


            //call getEnquiries function, but first check who's logged in

        }
        const { enquiries } = this.props.user.enquiries;
     //   console.log(this.state.elist)

      //  const userID=this.props.user.id
       // this.props.getUserEnquiries(userID)
        console.log(this.props.enquiries)



              this.setState({
              heading: heading,
              type: type,
              path: path,
              tableHeader:listHeader,
              elist:enquiries


        })
    }
  


    render() {
        const { enquiries } = this.props.user;
        var hello=this.state.elist
        const listToDisplay=enquiries.map((enquiry,index)=>
          (
                <tr key={index}>
                                <th scope="row">{enquiry.enquiryID}</th>
                                <td>{enquiry.enquiry_title}</td>
                                <td>{enquiry.status}</td>
                            </tr>
          )
        )
       // console.log(enquiries)
    
        return (
            <div>
            {!this.props.isAuthenticated?<Alert color='danger'>Sorry, You're not authorized to view this page</Alert>
            :<div>
                {this.state.heading}
               {!this.props.isAdmin? <Link to={ {pathname:this.state.path, type:'Edit'}} >    <Button className='remove-btn' color='info'size='sm'> New {this.state.type}</Button></Link>:''} 

                <table class="table table-striped" width='50%'>
                    <thead>
                        
                            {/* insert table header status */}
                            {this.state.tableHeader}
 
                        
                    </thead>
                    <tbody>
                    {listToDisplay}

                    </tbody>
                </table>

            </div>}
            </div>
        )
    }
}


const mapStateToProps=state=>({
    enquiry:state.enquiry,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    user:state.auth.user

})
export default connect(mapStateToProps,{getALLEnquiries,getUserEnquiries})(List)

//export default List;


