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
import { addBook } from '../actions/bookActions';
import { clearErrors } from '../actions/errorActions';
import { Redirect } from "react-router-dom"

class NewBookForm extends Component {
    state = {
        title: ''
        , author: ''
        , ISBN: ''
        , description: ''
        //  , img_src: ''
        , publish_year: ''
        , language: ''
        , publisher: ''
        , category: ''
        , quantity: ''
        , message: null,
        addStatus: ''
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addBook: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        // const { error, isAuthenticated } = this.props;
        // if (error !== prevProps.error) {
        //     // Check for register error
        //     if (error.id === 'LOGIN_FAIL') {
        //         this.setState({ message: error.message.message });
        //     } else {
        //         this.setState({ message: null });
        //     }
        // }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { title, author, ISBN, description, publish_year, language, publisher, category, quantity } = this.state;

        const book = {
            title, author, ISBN, description, publish_year, language, publisher, category, quantity
        }
        //attempt top login
        this.props.addBook(book)

        this.setState({
            addStatus: 'added'

        })
        window.location.reload();

        
    };

    render() {
        return (
            <div>
                {this.state.message ? (
                    <Alert color='danger'>{this.state.message}</Alert>
                ) : null}
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for='title'>Title</Label>
                        <Input
                            type='title'
                            name='title'
                            id='title'
                            placeholder='Book Title'
                            className='mb-3'
                            onChange={this.onChange}
                        />

                        <Label for='author'>Author</Label>
                        <Input
                            type='author'
                            name='author'
                            id='author'
                            placeholder='Book Author'
                            className='mb-3'
                            onChange={this.onChange}
                        />

                        <Label for='ISBN'>ISBN</Label>
                        <Input
                            type='number'
                            name='ISBN'
                            id='ISBN'
                            placeholder="Book's ISBN"
                            className='mb-3'
                            onChange={this.onChange}
                        />

                        <Label for='description'>Description</Label>
                        <Input
                            type='description'
                            name='description'
                            id='Description'
                            placeholder="About the Book"
                            className='mb-3'
                            onChange={this.onChange}
                        />
                        <Label for='publish_year'>Publish Year</Label>

                        <Input
                            type='publish_year'
                            name='publish_year'
                            id='publish_year'
                            placeholder="Year"
                            className='mb-3'
                            onChange={this.onChange}
                        />
                        <Label for='language'>Language</Label>

                        <Input
                            type='language'
                            name='language'
                            id='language'
                            placeholder="Language"
                            className='mb-3'
                            onChange={this.onChange}
                        />

                        <Label for='publisher'>Publisher</Label>

                        <Input
                            type='publisher'
                            name='publisher'
                            id='publisher'
                            placeholder="Book Publisher"
                            className='mb-3'
                            onChange={this.onChange}
                        />

                        <Label for='category'>Category</Label>

                        <Input
                            type='category'
                            name='category'
                            id='category'
                            placeholder="Category"
                            className='mb-3'
                            onChange={this.onChange}
                        />

                        <Label for='quantity'>Quantity</Label>

                        <Input
                            type='number'
                            name='quantity'
                            id='quantity'
                            placeholder="Quantity"
                            className='mb-3'
                            onChange={this.onChange}
                        />


                        <Button color='dark' style={{ marginTop: '2rem' }} block>
                            Submit
                </Button>
                    </FormGroup>
                </Form>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { addBook, clearErrors }
)(NewBookForm);