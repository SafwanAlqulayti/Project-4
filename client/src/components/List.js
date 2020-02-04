
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getALLEnquiries, getUserEnquiries, getEnquiry } from '../actions/enquiryActions'



class List extends Component {

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
        getALLEnquiries: PropTypes.func.isRequired,
        getUserEnquiries: PropTypes.func.isRequired,
        getEnquiry: PropTypes.func.isRequired,
        enquiries: PropTypes.object.isRequired,
    }

    onClickGetEnquiry = id => {
        this.props.getEnquiry(id);
    }


    componentDidMount() {
        var user = JSON.parse(localStorage.getItem('useru'))
        if(this.props.isAdmin){
            this.props.getALLEnquiries()

        }

        else if (this.props.isAuthenticated) {
        this.props.getUserEnquiries(user.id)
        console.log('found' + user.id)

            }
        }

    render() {
        const { enquiries } = this.props
        var user = JSON.parse(localStorage.getItem('useru'))

        if (enquiries) {
            const listToDisplay = enquiries.map((enquiry, index) =>
                (
                    <tr key={index}>
                        <th scope="row"><p onClick={this.onClickGetEnquiry.bind(this, enquiry.id)}><Link to={{pathname:'/DisplayEnquiry', selected:enquiry,postedBy:user}}>{enquiry.enquiryID}</Link></p></th>
                        <td>{enquiry.enquiry_title}</td>
                        <td>{enquiry.status}</td>
                    </tr>
                )
            )
            return (
                <div>
                    {!this.props.isAuthenticated ? <Alert color='danger'>Sorry, You're not authorized to view this page</Alert>
                        : <div>
                            <h4>Enquiries</h4>
                          {!this.props.isAdmin?  <Link to='/newEnquiry'> <Button className='remove-btn' color='info' size='sm'> New Enquiry </Button></Link>:''}

                            <table class="table table-striped" width='50%'>
                                <thead>

                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Status</th>
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
    enquiry: state.enquiry,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    user: state.auth.user,
    enquiries: state.enquiry.enquiries,

})
export default connect(mapStateToProps, { getALLEnquiries, getUserEnquiries, getEnquiry })(List)