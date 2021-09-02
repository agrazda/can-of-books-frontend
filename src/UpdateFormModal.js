import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class BookFormModal extends React.Component {
 constructor(props) {
   super(props);
   this.state= {}
 }
 handleSubmit = (e) => {
  e.preventDefault();
  this.props.handleUpdate({
    _id: e.target.bookId.value,
    title: e.target.formTitle.value,
    description: e.target.formDescription.value,
    email: e.target.formEmail.value,
  });
  this.props.toggleUpdateModal();
}
   
  render() {
    return (
      <>
        <Modal show= {this.props.showUpdateModal}>
            <Modal.Header> 
                <Button onClick= {this.props.toggleUpdateModal}>
                    Close
                </Button>
                <h2>Update Book Modal</h2>
            </Modal.Header>
         <Modal.Body>

        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Change Book Title</Form.Label>
            <Form.Control type="string" defaultValue={this.props.book? this.props.book.name: ''}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="string" defaultValue={this.props.book?this.props.book.description:''}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="string" defaultValue={this.props.book?this.props.book.email:''}/>
          </Form.Group>

          <Form.Group controlId="bookId"><Form.Control type="hidden"defaultValue={this.props.book?this.props.book._id:''}></Form.Control></Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>

            </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default BookFormModal;