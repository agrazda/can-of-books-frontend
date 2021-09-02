import React from "react";
import { Carousel, Button } from "react-bootstrap";
import axios from "axios";
import BookFormModal from "./BookFormModal";
import UpdateFormModal from "./UpdateFormModal";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isEmpty: false,
      showModal: false,
      showUpdateModal: false,
      indexOfMap: 0,
    };
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  async componentDidMount() {
    let bookUrl = `http://localhost:3001/books?email=littlejohn@aol.com`;
    console.log("test");
    try {
      const response = await axios.get(bookUrl);
      this.setState({ books: response.data });
      this.isEmpty();
      console.log(response.data);
      console.log("test");
      console.log(this.state.isEmpty);
    } catch (err) {
      console.log(err + "Error Message Here");
    }
  }

  isEmpty() {
    if (this.state.books.length === 0) {
      this.setState({
        isEmpty: true,
      });
    }
  }
    //alternates the state of the Modal between true and false
    //! in this context means "the oposite of"
  toggleModal = () => {
    this.setState({showModal: !this.state.showModal});
    console.log(this.state.showModal);
  }

  async handleSubmit(e) {
    e.preventDefault();
    let bookData= {
      title: e.target.formTitle.value,
      description: e.target.formDescription.value,
      email: e.target.formEmail.value,
    }
    let bookUrl = `http://localhost:3001/books?email=littlejohn@aol.com`;
    console.log("test");
    try {
      const response = await axios.post(bookUrl, bookData);
      this.setState({ books: response.data });
     
    } catch (err) {
      console.log(err + "Error Message Here");
    }
  }

  async handleDelete(id) {
    console.log(id);
    let bookUrl = `http://localhost:3001/books/${id}`;
    let response = await axios.delete(bookUrl);
    let updatedArray = this.state.books.filter(book => book._id !== id);
    this.setState({ books: updatedArray});
    console.log(response);

  }

  async handleUpdate(bookToUpdate) {
    let bookUrl = `http://localhost:3001/books/${bookToUpdate._id}`;
    console.log("test");
    try {
      const response = await axios.put(bookUrl, bookToUpdate);
      const updatedBook = response.data;
      const updateBookArray = this.state.books.map(outdatedBook => outdatedBook._id === updatedBook._id ? updatedBook : outdatedBook);
      this.setState({updateBookArray})

    } catch (err) {
      console.log(err + "Error Message Here");
    }
  }
  toggleUpdateModal = (i) => {
    this.setState({
      showUpdateModal: !this.state.showUpdateModal,
      indexOfMap: i,
    });
    console.log(this.state.showUpdateModal);
  }


  render() {
    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>Your Personal Book Collection</h2>
        {this.state.isEmpty ? <alert>No books for you!</alert> : ""}
        <Carousel>
          {this.state.books.length &&
            this.state.books.map((book, i) => {
              return (
                <Carousel.Item key={book._id}>
                  <img
                    className="d-block w-100"
                    src={`https://via.placeholder.com/800x400/000000/FFFFFF/?text=${book.title}`}
                    alt={book.status}
                  />
                  <Carousel.Caption>
                    <h3>{book.email}</h3>
                    <p>{book.description}</p>
                  </Carousel.Caption>
                  <Button variant="danger" onClick={this.handleDelete(book._id)}>Delete ME!!!</Button>
                  <Button onClick={() => this.toggleUpdateModal(i)}>Update This Book!</Button>
                </Carousel.Item>
              );
            })}
        </Carousel>
        <BookFormModal showModal= {this.state.showModal} toggleModal={this.toggleModal} handleSubmit={this.handleSubmit}/>
        <UpdateFormModal showUpdateModal={this.state.showUpdateModal} toggleUpdateModal={this.toggleUpdateModal}/>
        <Button onClick={this.toggleModal}>Add Book</Button>
      </>
    );
  }
}

export default BestBooks;
