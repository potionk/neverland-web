import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';
import axios from "axios";
import { getLoggedInAccount } from '../../modules/auth';

class Write extends Component {
  state = {
    writer_id:getLoggedInAccount(),
    title: '',
    contents: '',
    class: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      title: '',
      contents: '',
      class: '',
    })
  }

  write = async () => {
    axios.post("http://localhost:3001/community/write_post", {
      writer_id: this.state.writer_id,
      title: this.state.title,
      contents: this.state.contents,
      class: this.state.class
    })
      .then(res => {
        let data = res.data;
        console.log(data);
        if (data.error) {
          switch (data.errorCode) {
            case 2:
              alert("제목을 입력하세요.")
              window.location.reload();
              return;
            case 3:
              alert("내용을 입력하세요.")
              window.location.reload();
              return;
            default:
              alert("잘못된 접근입니다.")
              window.location.reload();
              return
          }
        } else {
          alert("게시글이 등록되었습니다.")
          window.location.replace("/");
        }
      }).catch(error => {
        console.log('failed', error)
      })
  }
  render() {
    console.log(this.state);
    console.log(getLoggedInAccount());
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>글쓰기</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">게시판 선택</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="class" id="select" value={this.state.value} onChange={this.handleChange}>
                        <option value="자유게시판">자유게시판</option>
                        <option value="정보게시판">정보게시판</option>
                        <option value="여행게시판">여행게시판</option>
                        <option value="사진게시판">사진게시판</option>
                        <option value="게임게시판">게임게시판</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">제목</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" value={this.state.title} onChange={this.handleChange} name="title" placeholder="게시판 제목을 입력하세요." />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">글쓰기</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" value={this.state.contents} onChange={this.handleChange} name="contents" id="textarea-input" rows="9" placeholder="내용..." />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">사진 첨부</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="file-input" name="file-input" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-multiple-input">첨부 파일</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="file-multiple-input" name="file-multiple-input" multiple />
                    </Col>
                  </FormGroup>
                  <FormGroup row hidden>
                    <Col md="3">
                      <Label className="custom-file" htmlFor="custom-file-input">Custom file input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Label className="custom-file">
                        <Input className="custom-file" type="file" id="custom-file-input" name="file-input" />
                        <span className="custom-file-control"></span>
                      </Label>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" onClick={this.write} color="primary" className="mr-1"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                {/* <Button type="submit" color="primary">Save changes</Button>
                <Button color="secondary">Cancel</Button> */}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Write;
