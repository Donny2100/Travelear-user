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
import './Login.css';
import { Actions } from '../../actions/actionCreators';
import {MOSTPOPULAR} from '../../routes';

class login extends Component {
  state = {
    errorMsg: '',
  }

  onFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    const {
      history,
    } = this.props;

    let user = {
      email: email.value,
      password: password.value,
    }
    Actions.login(user).then(() => {

    }).catch((error) => {
      console.log(error);
      this.setState({
        errorMsg: error.message,
      });
    });
  }

  render() {
    let {errorMsg} = this.state;

    return(<div>
      <Container>
        <Row>
          <Col xs="12" sm="4">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/travelear-df75e.appspot.com/o/image%2FCapture11111.JPG?alt=media&token=4d339c73-3476-4a97-bee8-bea1cd2626a1" 
              alt="login"
            />
          </Col>
          <Col xs="12" sm="8" >
            <div className="login_info">
              <h2>
                Welcome back!
              </h2>
              <Form onSubmit={this.onFormSubmit}>
                <FormGroup>
                  <Label for="loginEmail">Email</Label>
                  <InputGroup>
                  
                    <Input 
                      required
                      type="email" 
                      name="email" 
                      id="loginEmail" 
                      placeholder="" 
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="loginPassword">Password</Label>
                  <InputGroup>
                    
                    <Input 
                      required
                      type="password" 
                      name="password" 
                      id="loginPassword" 
                      placeholder="" 
                    />
                  </InputGroup>
                </FormGroup>
                <h6 className='error'>
                  {errorMsg}
                </h6>
                <Button color="danger" className='loginbutton'>
                  SUBMIT
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container> 
    </div>)
  }
}

export default login;
