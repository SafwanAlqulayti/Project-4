
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getALLRequests, getUserRequests } from '../actions/requestActions'
import moment from 'moment'



class RequestsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            buttonLink: '',
            elist: ''
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isAdmin: PropTypes.bool,
        getALLRequests: PropTypes.func.isRequired,
        getUserRequests: PropTypes.func.isRequired,
        requests: PropTypes.object.isRequired,
    }

    onClickGetRequest = id => {
      //  this.props.getEnquiry(id);
    }


    componentDidMount() {
        var user = JSON.parse(localStorage.getItem('useru'))
        if(this.props.isAdmin){
            this.props.getALLRequests()

        }

        else if (this.props.isAuthenticated) 
        console.log('found' + user.id)
        {
        this.props.getUserRequests(user.id)

            }
        }

    render() {
        const { requests } = this.props
        console.log(requests)
        var user = JSON.parse(localStorage.getItem('useru'))

        if (requests) {
            const listToDisplay= requests.map((request, index) =>
            (
                <tr key={index}>
                    <th scope="row"><p onClick={this.onClickGetRequest.bind(this, request.id)}><Link to={{pathname:'/DisplayRequest', selected:request}}>{request.requestID}</Link></p></th>
                    <td>{request.bookTitle}</td>
                    <td>{request.status}</td>
                    <td>{moment(request.date).format('LLL')}</td>
                </tr>
            )
        )
            
            

            // <h4>List will be here</h4>
            // const listToDisplay = enquiries.map((enquiry, index) =>
            //     (
            //         <tr key={index}>
            //             <th scope="row"><p onClick={this.onClickGetEnquiry.bind(this, enquiry.id)}><Link to={{pathname:'/DisplayEnquiry', selected:enquiry,postedBy:user}}>{enquiry.enquiryID}</Link></p></th>
            //             <td>{enquiry.enquiry_title}</td>
            //             <td>{enquiry.status}</td>
            //         </tr>
            //     )
            // )
            return (
                <div>
                    {!this.props.isAuthenticated ? <Alert color='danger'>Sorry, You're not authorized to view this page</Alert>
                        : <div>
                            <h4>Requests</h4>

                            <table class="table table-striped" width='50%'>
                                <thead>

                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Book Title</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Last Updated</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {listToDisplay}

                                </tbody>
                            </table>

                        </div>}
                </div>
            )

        }


        else {
            return (null)
        }

    }
}



const mapStateToProps = state => ({
    request: state.request,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    //user: state.auth.user,
    requests: state.request.requests,

})
export default connect(mapStateToProps, { getALLRequests, getUserRequests})(RequestsList)