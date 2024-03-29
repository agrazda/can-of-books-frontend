import React from "react";
import { Carousel, Button } from "react-bootstrap";
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';
import BookFormModal from "./BookFormModal";
import UpdateFormModal from "./UpdateFormModal";

const server = process.env.REACT_APP_BACKEND || 'http://localhost:3001'

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
  getConfig = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: { "Authorization": `Bearer ${jwt}` }
    };
    return config;
  }


  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  async componentDidMount() {
    let bookUrl = `${server}/books`;
    console.log("test");
    let config = await this.getConfig();
    try {
      const response = await axios.get(bookUrl, config);
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

  handleSubmit = async (e) => {
    e.preventDefault();
    let bookData= {
      title: e.target.formTitle.value,
      description: e.target.formDescription.value,
    }
    let bookUrl = `${server}/books`;
    let config = await this.getConfig();
    try {
      console.log("test");
      const response = await axios.post(bookUrl, bookData, config);
      console.log(response.data);
      this.setState({ books: [...this.state.books,response.data] });
      this.toggleModal();
     
    } catch (err) {
      console.log(err + "Error Message Here");
    }
  }

  handleDelete = async (id) => {
    console.log(id);
    let bookUrl = `${server}/books/${id}`;
    let config = await this.getConfig();
    let response = await axios.delete(bookUrl, config);
    let updatedArray = this.state.books.filter(book => book._id !== id);
    this.setState({ books: updatedArray});
    console.log(response);
    console.log("bookDeleted")
  }

  handleUpdate = async (bookToUpdate) => {
    let bookUrl = `${server}/books/${bookToUpdate._id}`;
    let config = await this.getConfig();
    console.log("test");
    try {
      const response = await axios.put(bookUrl, bookToUpdate, config);
      const updatedBook = response.data;
      console.log(updatedBook);
      const updateBookArray = this.state.books.map(outdatedBook => outdatedBook._id === updatedBook._id ? updatedBook : outdatedBook);
      console.log(updateBookArray);
      this.setState({books: updateBookArray})
      this.toggleUpdateModal();

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
                  <Button variant="danger" onClick={() => this.handleDelete(book._id)}>Delete ME!!!</Button>
                  <Button onClick={() => this.toggleUpdateModal(i)}>Update This Book!</Button>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
        <BookFormModal showModal= {this.state.showModal} toggleModal={this.toggleModal} handleSubmit={this.handleSubmit}/>
        <UpdateFormModal 
        showUpdateModal={this.state.showUpdateModal} toggleUpdateModal={this.toggleUpdateModal} 
        book={this.state.books[this.state.indexOfMap]}
        handleUpdate={this.handleUpdate}
        />
        <Button onClick={this.toggleModal}>Add Book</Button>
      </>
    );
  }
}

export default withAuth0(BestBooks);
