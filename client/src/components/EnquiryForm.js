import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitANewEnqiry } from '../actions/enquiryActions';
import { clearErrors } from '../actions/errorActions';
import axios from 'axios'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

class NewBookForm extends Component {
    state = {
        enquiry_title:'',
        enquiry_body:'',
        additional_info:'',
        addStatus: '',
    };

    componentDidMount() {

    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        submitANewEnqiry: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        user:PropTypes.object.isRequired,

    };



    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'ADD_FAILED') {
                this.setState({ message: error.message.message });
                console.log(error)
            } else {
                this.setState({ message: null });
            }
        }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        var user=JSON.parse(localStorage.getItem('useru'))
        const {enquiry_title,enquiry_body,additional_info}=this.state
        const userID=user.id
        const newEnquiry={enquiry_title,enquiry_body,additional_info,userID}
        console.log(newEnquiry)
        this.props.submitANewEnqiry(newEnquiry)

       // window.location.href = "/"


        this.setState({
            addStatus: 'added'

        })
        return <Redirect to='/enquiries' push={true}/>



      //  window.location.href = "/enquiries"

       // return <Redirect to='/enquiries' push={true}/>

    };

    componentDidUpdate() {
        return <Alert color='success'>Successfully Added a new book!</Alert>
    }

    render() {
        if (this.props.isAdmin) {
            console.log("Hello Admin")
        }
        if (this.props.location.type === undefined) {
            return <Alert color='danger'>Sorry, something went wrong</Alert>
            // window.location.href = "/"



        }
        return (

            <div>
                {this.props.isAuthenticated ?
                    <div>

                        {this.state.message ? (
                            <Alert color='danger'>{this.state.message}</Alert>
                        ) : null}


                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>


                                <Label for='enquiry_title'>Title</Label>
                                <Input
                                    type='text'
                                    name='enquiry_title'
                                    id='enquiry_title'
                                    placeholder='Enquiry Title'
                                    className='mb-3'
                                    value={this.state.title}
                                    onChange={this.onChange}


                                    required
                                />


                                <Label for='enquiry_body'>Enquiry</Label>
                                <Input
                                    type='textarea'
                                   name='enquiry_body'
                                  // id='enquirybody'
                                    placeholder='Please write your question here'
                                    className='mb-3'
                                    value={this.state.body}
                                    onChange={this.onChange}
                                    required
                                />

                                <Label for='additional_info'>Additional Resources</Label>
                                <Input
                                    type='text'
                                    name='additional_info'
                                    placeholder='Any supporting links'
                                    className='mb-3'
                                    value={this.state.additional_info}
                                    onChange={this.onChange}
                                    
                                />

                                
                               
                                <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Submit
                                </Button>
                            </FormGroup>
                        </Form>

                    </div>
                    : <Alert color='danger'>Sorry, you're not authorized to view this page</Alert>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    error: state.error,
    user:state.auth.user,

});

export default connect(
    mapStateToProps,
    { submitANewEnqiry, clearErrors }
)(NewBookForm);