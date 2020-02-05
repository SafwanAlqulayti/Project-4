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
import { addBook, updateBook } from '../actions/bookActions';
import { clearErrors } from '../actions/errorActions';
import { Redirect } from "react-router-dom"
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert'


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
        addStatus: '',
        selectedFile: null,
        redirect: false,
        redirectPath: '',
        alert: null

    };

    showAlert() {
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                timeout={1800}
                showConfirm={false}
                onConfirm={() => this.hideAlert()}
            > Added {this.state.title} to the list!
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
        //this.submitRequest
    }

    componentDidMount() {
        console.log(this.props.location.type)
        if (this.props.location.type === 'Edit') {
            const currentBook = this.props.location.currentBook
            console.log(currentBook.title)

            this.setState({
                title: currentBook.title
                , author: currentBook.author
                , ISBN: currentBook.ISBN
                , description: currentBook.description
                , img_src: ''
                , publish_year: currentBook.publish_year
                , language: currentBook.language
                , publisher: currentBook.publisher
                , category: currentBook.category
                , quantity: currentBook.quantity
            })
        }
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isAdmin: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addBook: PropTypes.func.isRequired,
        updateBook: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    fileSelectedHandler = event => {
        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData()
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
        axios.post(' https://us-central1-majeed-s-library.cloudfunctions.net/uploadFile', fd)
            .then(res => {
                console.log(res)
            })
    }

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
        const { title, author, ISBN, description, publish_year, language, publisher, category, quantity,img_src } = this.state;

        const book = {
            title, author, ISBN, description, publish_year, language, publisher, category, quantity,img_src
        }
        console.log(book)

        //attempt top login
        if (this.props.location.type === 'Edit') {
            this.props.updateBook(this.props.location.currentBook._id, book)
            this.setState({
                redirect: true
            })
            //return <Redirect to={{pathname:'/DisplayBook', selected:(this.props.location.currentBook)}}/>

        }

        else {
            this.props.addBook(book)
            this.showAlert();

            this.setState({
                redirect: true
            })

        }




        //   window.location.href = "/"


    };

    componentDidUpdate() {
        return <Alert color='success'>Successfully Added a new book!</Alert>
    }

    render() {
        if (this.state.redirect && this.state.alert == null) {

            return <Redirect to='/BookList' push={true} />

        }

        if (this.props.isAdmin) {
            console.log("Hello Admin")
        }
        if (this.props.location.type === undefined) {
            return <Alert color='danger'>Sorry, something went wrong</Alert>
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
                                {/* <input type="file" onChange={this.fileSelectedHandler}/> */}
                                {/* <button onClick={this.fileUploadHandler}>Upload</button> */}
                                <Label for='title'>Title</Label>
                                <Input
                                    type='title'
                                    name='title'
                                    id='title'
                                    placeholder='Book Title'
                                    value={this.state.title}
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
                                />

                                <Label for='author'>Author</Label>
                                <Input
                                    type='author'
                                    name='author'
                                    id='author'
                                    placeholder='Book Author'
                                    value={this.state.author}
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
                                />

                                <Label for='img_src'>Book Cover</Label>
                                <Input
                                    type='text'
                                    name='img_src'
                                    id='author'
                                    placeholder='Url containing the book cover'
                                    value={this.state.img_src}
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
                                />

                                <Label for='ISBN'>ISBN</Label>
                                <Input
                                    type='number'
                                    name='ISBN'
                                    id='ISBN'
                                    placeholder="Book's ISBN"
                                    value={this.state.ISBN}
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
                                />

                                <Label for='description'>Description</Label>
                                <Input
                                    type='description'
                                    name='description'
                                    id='Description'
                                    placeholder="About the Book"
                                    value={this.state.description}
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
                                />
                                <Label for='publish_year'>Publish Year</Label>

                                <Input
                                    type='publish_year'
                                    name='publish_year'
                                    id='publish_year'
                                    placeholder="Year"
                                    value={this.state.publish_year}
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
                                />
                                <Label for='language'>Language</Label>

                                <Input
                                    type='language'
                                    name='language'
                                    id='language'
                                    placeholder="Language"
                                    value={this.state.language}
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
                                />

                                <Label for='publisher'>Publisher</Label>

                                <Input
                                    type='publisher'
                                    name='publisher'
                                    id='publisher'
                                    placeholder="Book Publisher"
                                    value={this.state.publisher}
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
                                />

                                <Label for='category'>Category</Label>

                                <Input
                                    type='category'
                                    name='category'
                                    id='category'
                                    placeholder="Category"
                                    value={this.state.category}
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
                                />

                                <Label for='quantity'>Quantity</Label>

                                <Input
                                    type='number'
                                    name='quantity'
                                    id='quantity'
                                    placeholder="Quantity"
                                    value={this.state.quantity}
                                    className='mb-3'
                                    onChange={this.onChange}
                                    required
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
    error: state.error
});

export default connect(
    mapStateToProps,
    { addBook, updateBook, clearErrors }
)(NewBookForm);