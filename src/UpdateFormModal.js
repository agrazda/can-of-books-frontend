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
    _id: this.props.book._id,
    title: e.target.formTitle.value,
    description: e.target.formDescription.value,
    email: e.target.formEmail.value,
  });
}
   
  render() {
    return (
      <>
        <Modal show= {this.props.showUpdateModal}>
            <Modal.Header> 
                <Button onClick= {this.props.toggleUpdateModal}>
                    Close
                </Button>
            </Modal.Header>
         <Modal.Body>

        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>
              <h2>Update book here</h2>
            </Form.Label>
            <Form.Label>Title</Form.Label>
            <Form.Control type="title" placeholder="Enter title" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="description" placeholder="bookDescription" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="Email" placeholder="Email" />
          </Form.Group>
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