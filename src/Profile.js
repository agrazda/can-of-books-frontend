import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';

class Profile extends React.Component {


  render() {
    return (
      <>
        <Card style={{ width: '18rem', marginBottom: '10px' }} text="white" bg="dark">
          <Card.Body>
            <Card.Title>Username: {this.props.auth0.user.nickname}</Card.Title>
            <Card.Img variant="top" src={this.props.auth0.user.picture} />
            <Card.Text>Email address: {this.props.auth0.user.email}</Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  }
}
export default withAuth0(Profile)
