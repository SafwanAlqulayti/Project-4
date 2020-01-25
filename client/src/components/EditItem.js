import React, {Component} from 'react'
import {Button, Modal, ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap'
import {connect} from 'react-redux'
import {updateItem,setItemsLoading} from '../actions/itemActions'



class ItemModal extends Component{
    state={
        modal: false,
        name: ''
    }

    //same as navbar we'll need a toggle

    toggle=()=>{
        this.setState({
            modal:!this.state.modal
        })
    }

    onChange=(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit=(e)=>{
       // e.preventDefault()
        const updatedItem={
            name: this.state.name

        }
       //Add item via addItem Action
       this.props.updateItem(this.props.clickedItemID,updatedItem)
       console.log(this.props.clickedItemID)


     

        this.props.setItemsLoading();
           //close modal
           this.toggle()
                    
    }

    render(){

        return(
            <div>
                <Button
                color='dark'
                onClick={this.toggle}>Edit</Button>

                <Modal isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Edit Name</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="item">Item</Label>
                        <Input type='text'
                        name='name'
                        id='item'
                        placeholder='Edit Name'
                        onChange={this.onChange}>
                        </Input>
                        <Button
                        color='dark'
                        style={{marginTop: '2rem'}}
                        block>Edit</Button>
                    </FormGroup>
                </Form>

                </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    item: state.item
})
export default connect(mapStateToProps,{updateItem,setItemsLoading})(ItemModal)