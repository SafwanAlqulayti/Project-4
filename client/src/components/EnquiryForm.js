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
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

import SweetAlert from 'react-bootstrap-sweetalert'

class EnquiryForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            enquiry_title: '',
            enquiry_body: '',
            additional_info: '',
            addStatus: '',
            alert: null,
            redirect: false
        };
        this.showAlert = this.showAlert.bind(this);
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        submitANewEnqiry: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,

    };

    showAlert() {
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                timeout={1800}
                showConfirm={false}
                onConfirm={() => this.hideAlert()}
            > Your question has been submitted
          </SweetAlert>
        );

        this.setState({
            alert: getAlert()
        });
    }

    hideAlert() {
        console.log('Hiding alert...');
        this.setState({
            alert: null
        });
    }





    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        var user = JSON.parse(localStorage.getItem('useru'))
        const { enquiry_title, enquiry_body, additional_info } = this.state
        const userID = user.id
        const newEnquiry = { enquiry_title, enquiry_body, additional_info, userID }
        console.log(newEnquiry)
        this.props.submitANewEnqiry(newEnquiry)
        this.showAlert();

        this.setState({
            addStatus: 'added',
            redirect: true

        })


    };

    componentDidUpdate() {
    }

    render() {
        if (this.props.isAdmin) {
            console.log("Hello Admin")
        }
        if (this.props.location.type === undefined) {
            return <Alert color='danger'>Sorry, something went wrong</Alert>



        }

        if (this.state.redirect && this.state.alert == null) {


            return <Redirect to='/enquiries' push={true} />
        }
        return (

            <div>

                {this.state.alert}

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

});

export default connect(
    mapStateToProps,
    { submitANewEnqiry, clearErrors }
)(EnquiryForm);