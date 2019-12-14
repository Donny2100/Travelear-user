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
import './signup.css';
import {auth, firestore} from '../../services';

class signup extends Component {
  state = {
    errorMsg: '',
  }

  onFormSubmit = async (e) => {
    this.setState({
      errorMsg: "",
    });
  
    e.preventDefault();

    const { email, password, passwordConfirm, firstname, lastname, location } = e.target.elements;
    if (password.value !== passwordConfirm.value)
    {
      this.setState({
        errorMsg: "The passwords don't match",
      });
      return;
    }

    try {
      let authUser = await auth.doCreateUserWithEmailAndPassword(email.value, password.value);
      await firestore.createUser(authUser.uid, email.value, firstname.value, lastname.value, location.value, 'user');
      auth.doSignOut();
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
            <img src="https://firebasestorage.googleapis.com/v0/b/travelear-df75e.appspot.com/o/image%2FCapture11112.JPG?alt=media&token=50a3d413-dae9-4b48-8908-614a43b4a40a" alt="signup"/>
          </Col>
          <Col xs="12" sm="8">
            <div className='contentform'>
              <h2>Lets Get Some Information.</h2>
              <Form onSubmit={this.onFormSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="signupFirstName">First Name</Label>
                      <InputGroup>
                        <Input 
                          required
                          type="text" 
                          name="firstname" 
                          id="signupFirstName" 
                          placeholder="" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="signupLastName">Last Name</Label>
                      <InputGroup>
                        <Input 
                          required
                          type="text" 
                          name="lastname" 
                          id="signupLastName" 
                          placeholder="" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                
                <FormGroup>
                  <Label for="signupLocation">Location</Label>
                  <InputGroup>
                 
                    <Input 
                      required
                      type="text" 
                      name="location" 
                      id="signupLocation" 
                      placeholder="" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="signupEmail">Email</Label>
                  <InputGroup>
                 
                    <Input 
                      required
                      type="email" 
                      name="email" 
                      id="signupEmail" 
                      placeholder="" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="signupPassword">Password</Label>
                  <InputGroup>
                    
                    <Input 
                      required
                      type="password" 
                      name="password" 
                      id="signupPassword" 
                      placeholder="" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="signupPasswordConfirm">Confirm password</Label>
                  <InputGroup>
                    
                    <Input 
                      required
                      type="password" 
                      name="passwordConfirm" 
                      id="signupPasswordConfirm" 
                      placeholder="" />
                  </InputGroup>
                </FormGroup>
                <h6 className='error'>
                  {errorMsg}
                </h6>
                <Button className='signup_button' color="danger"> 
                  SUBMIT
                </Button><br />
                <FormGroup check className="term_check">
                  <Label check>
                    <Input type="checkbox" required />{' '}
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

export default signup;
