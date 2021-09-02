import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { withAuth0 } from '@auth0/auth0-react';

class BookFormModal extends React.Component {
   
  render() {
    return (
      <>
        <Modal show= {this.props.showModal}>
            <Modal.Header> 
                <Button onClick= {this.props.toggleModal}>
                    Close
                </Button>
            </Modal.Header>
         <Modal.Body>

        <Form onSubmit={this.props.handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>
              <h2>Add a new book here</h2>
            </Form.Label>
            <Form.Label>Title</Form.Label>
            <Form.Control type="title" placeholder="Enter title" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="description" placeholder="bookDescription" />
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

export default withAuth0(BookFormModal);
