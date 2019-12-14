import React, {Component} from 'react';
import {
  Button, 
  Container, 
  Row, 
  Col, 
  Input, 
  InputGroup, 
  InputGroupAddon,
  Form, 
  FormGroup, 
  Label
} from 'reactstrap';
import './CreatorSignup.css';
import {auth, firestore} from '../../services';

class CreatorSignup extends Component {
  state = {
    errorMsg: '',
  }

  onFormSubmit = async (e) => {
    e.preventDefault();

    const { email, firstname, lastname, phone, website, social, gear } = e.target.elements;

    try {
      //let authUser = await auth.doCreateUserWithEmailAndPassword(email.value, password.value);
      await firestore.createCreator(email.value, firstname.value, lastname.value, phone.value, website.value, social.value, gear.value, 'creator');
      this.setState({
        errorMsg: "Your account was created successfully. Please login",
      });
    } catch(error) {
      console.log(error);
      this.setState({
        errorMsg: error.message,
      });
    };
  }

  render() {
    let {errorMsg} = this.state;

    return(<div>
      <Container>
        <Row>
          <Col xs="12" sm="4">
            <img src="https://firebasestorage.googleapis.com/v0/b/travelear-df75e.appspot.com/o/image%2FCapture11112.JPG?alt=media&token=50a3d413-dae9-4b48-8908-614a43b4a40a" alt="left banner"/>
          </Col>
          <Col xs="12" sm="8" >
            <div>
              <h2 className='contentform'>
                Congrats! You are taking a big step!
              </h2>
              <Form onSubmit={this.onFormSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="creatorFirstName">
                      First Name
                    </Label>
                    <InputGroup>
                      <Input 
                      required
                      type="text" 
                      name="firstname" 
                      id="creatorFirstName"
                      />
                    </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="creatorLastName">
                      Last Name
                    </Label>
                    <InputGroup>
                      <Input 
                      required
                      type="text" 
                      name="lastname" 
                      id="creatorLastName" 
                      />
                    </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="creatorEmail">
                    Email
                  </Label>
                  <InputGroup>
                    
                    <Input 
                      required
                      type="email" 
                      name="email" 
                      id="creatorEmail"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="creatorPhone">Phone</Label>
                  <InputGroup>
                    <Input 
                    required
                    type="text" 
                    name="phone" 
                    id="creatorPhone" 
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="creatorWebsite">Web site</Label>
                  <InputGroup>
                    <Input 
                    required
                    type="text" 
                    name="website" 
                    id="creatorWebsite"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="creatorSocial">Social Media</Label>
                  <InputGroup>
                    <Input 
                    required
                    type="text" 
                    name="social" 
                    id="creatorSocial"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="creatorGear">What gear do you use?</Label>
                  <InputGroup>
                    <Input 
                    required
                    type="text" 
                    name="gear" 
                    id="creatorGear" 
                    />
                  </InputGroup>
                </FormGroup>
                <h6 className='error'>
                  {errorMsg}
                </h6>
                <Button color="danger">SUBMIT</Button>
                <br />
                <FormGroup check className="term_check">
                  <Label check>
                    <Input type="checkbox" required />
                    {' '}
                    Terms of service and privacy agreement
                  </Label>
                </FormGroup>
              </Form>
            </div>
          </Col>
        </Row>
      </Container> 
    </div>)
  }
}
export default CreatorSignup;