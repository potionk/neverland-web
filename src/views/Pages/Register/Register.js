import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from "axios";

class Register extends Component {
  state = {
    username: '',
    password: '',
    repeate_password: '',
    phone_num: '',
    email: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.onCreate(this.state);
    this.setState({
      username: '',
      password: '',
      repeate_password: '',
      phone_num: '',
      email: ''
    })
  }

  register = async () => {
    var pwd = this.state.password;
    var pwd_con = this.state.repeate_password;
    if (pwd !== pwd_con) {
      console.log("this2")
      alert("비밀번호가 일치하지 않습니다.")
      window.location.reload();
      return;
    } 
    axios.post("http://localhost:3001/account/register", {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      phone_num: this.state.phone_num
    })
      .then(res => {
        let data = res.data;
        console.log(data);
        if (data.error) {
          console.log("this1")
          switch (data.errorCode) {
            case 6:
              alert("아이디를 입력해주세요.");
              window.location.reload();
              return;
            case 7:
              alert("비밀번호를 입력해주세요.");
              window.location.reload();
              return;
            case 8:
              alert("이메일을 입력해주세요.");
              window.location.reload();
              return;
            case 9:
              alert("전화번호를 입력해주세요.");
              window.location.reload();
              return;
            case 10:
              alert("존재하는 아이디 입니다.");
              window.location.reload();
              return;
            case 11:
              alert("DB연결 에러.");
              window.location.reload();
              return;
            default:
              alert("잘못된 접근입니다.")
              window.location.reload();
              return
          }
        }else {
          console.log("this3")
          alert("회원가입이 완료되었습니다.")
          window.location.replace("/");
        }
      }).catch(error => {
        console.log('failed', error)
      })
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.username} onChange={this.handleChange} placeholder="Username" autoComplete="username" name="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="pwd1" value={this.state.password} onChange={this.handleChange} placeholder="Password" autoComplete="new-password" name="password" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-check"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="pwd2" value={this.state.repeate_password} onChange={this.handleChange} placeholder="Repeat password" autoComplete="new-password" name="repeate_password" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email" autoComplete="email" name="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={this.state.phone_num} onChange={this.handleChange} placeholder="Phone_num" autoComplete="phone_num" name="phone_num" />
                    </InputGroup>
                    <Button type="submit" color="success" onClick={this.register}>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
